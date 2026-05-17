import PageLayout from '@/components/PageLayout';
import { generatePageMetadata } from '@/components/PageLayout';
import { Metadata } from 'next';
import { getChangelogData } from '@/lib/changelog';
import ChangelogView from './ChangelogView';

export const metadata: Metadata = generatePageMetadata(
  'Changelog',
  'User visible changes in phpMyFAQ releases since 2001 until today',
);

export default async function ChangelogPage() {
  const { groups } = await getChangelogData();

  return (
    <PageLayout title="Changelog">
      <p className="lead">User visible changes in phpMyFAQ releases since 2001 until today</p>
      <ChangelogView groups={groups} />
    </PageLayout>
  );
}
