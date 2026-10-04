import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { generatePageMetadata } from '@/components/PageLayout';
import { Metadata } from 'next';
import { getArchiveReleases, countDownloadableReleases } from '@/lib/archive';
import ArchiveView from './ArchiveView';
import blocks from '@/components/ContentBlocks.module.scss';
import Icon from '@/components/Icon';

export const metadata: Metadata = generatePageMetadata(
  'Download Archive',
  'Download archive of all phpMyFAQ releases since version 1.2.0',
);

export default async function ArchivePage() {
  const groups = await getArchiveReleases();
  const total = countDownloadableReleases(groups);

  return (
    <PageLayout title="Download Archive">
      <p className={blocks.lead}>
        Every downloadable phpMyFAQ release since version 1.2.0 — {total} releases in total. The earliest 0.x, 1.0 and
        1.1 builds are listed for historical reference only. For the latest stable version, head to the{' '}
        <Link href="/download">download page</Link>.
      </p>
      <div className={blocks.notice} role="note">
        <Icon name="triangle-exclamation" />
        <p>
          These versions are kept for archival purposes only. Older releases are unsupported and may contain known
          security vulnerabilities, so always run the latest stable version in production.
        </p>
      </div>
      <ArchiveView groups={groups} />
    </PageLayout>
  );
}