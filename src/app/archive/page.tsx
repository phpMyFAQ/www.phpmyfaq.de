import PageLayout from '@/components/PageLayout';
import { generatePageMetadata } from '@/components/PageLayout';
import { Metadata } from 'next';
import { getArchiveReleases, countDownloadableReleases } from '@/lib/archive';
import ArchiveView from './ArchiveView';

export const metadata: Metadata = generatePageMetadata(
  'Download Archive',
  'Download archive of all phpMyFAQ releases since version 1.2.0',
);

export default async function ArchivePage() {
  const groups = await getArchiveReleases();
  const total = countDownloadableReleases(groups);

  return (
    <PageLayout title="Download Archive">
      <p className="lead">
        Every downloadable phpMyFAQ release since version 1.2.0 — {total} releases in total. The earliest 0.x, 1.0 and
        1.1 builds are listed for historical reference only. For the latest stable version, head to the{' '}
        <a href="/download">download page</a>.
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
