import PageLayout from '@/components/PageLayout';
import { generatePageMetadata } from '@/components/PageLayout';
import { Metadata } from 'next';
import { getArchiveReleases, countReleases } from '@/lib/archive';
import ArchiveView from './ArchiveView';

export const metadata: Metadata = generatePageMetadata(
  'Download Archive',
  'Download archive of all phpMyFAQ releases since version 2.0.0',
);

export default async function ArchivePage() {
  const groups = await getArchiveReleases();
  const total = countReleases(groups);

  return (
    <PageLayout title="Download Archive">
      <p className="lead">
        Every phpMyFAQ release since version 2.0.0 — {total} releases in total. For the latest stable version, head to
        the <a href="/download">download page</a>.
      </p>
      <div className="alert alert-warning d-flex align-items-center" role="alert">
        <i className="fas fa-triangle-exclamation me-2"></i>
        <span>
          These versions are kept for archival purposes only. Older releases are unsupported and may contain known
          security vulnerabilities — always run the latest stable version in production.
        </span>
      </div>
      <ArchiveView groups={groups} />
    </PageLayout>
  );
}
