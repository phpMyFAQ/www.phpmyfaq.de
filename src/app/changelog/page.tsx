import PageLayout from '@/components/PageLayout';
import { generatePageMetadata } from '@/components/PageLayout';
import { Metadata } from 'next';
import { getChangelogContent } from '@/lib/changelog';

export const metadata: Metadata = generatePageMetadata(
  'Changelog',
  'User visible changes in phpMyFAQ releases since 2001 until today',
);

export default async function ChangelogPage() {
  const { content } = await getChangelogContent();

  return (
    <PageLayout title="Changelog">
      <div className="row">
        <div className="col-12">
          <p className="lead">User visible changes in phpMyFAQ releases since 2001 until today</p>

          <div className="changelog-content">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
