import PageLayout from '@/components/PageLayout';
import { generatePageMetadata } from '@/components/PageLayout';
import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import styles from '../news.module.scss';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { getNewsYears, parseNewsFile } from '@/lib/news';

export const dynamicParams = false;

interface NewsYearPageProps {
  params: Promise<{
    year: string;
  }>;
}

// One page per news file in content/news.
export async function generateStaticParams() {
  return getNewsYears().map((year) => ({ year }));
}

export async function generateMetadata({ params }: NewsYearPageProps): Promise<Metadata> {
  const { year } = await params;
  return generatePageMetadata(`phpMyFAQ News from ${year}`, `What happened this year so far?`);
}

export default async function NewsYearPage({ params }: NewsYearPageProps) {
  const { year } = await params;

  if (!getNewsYears().includes(year)) {
    notFound();
  }

  const entries = parseNewsFile(year);

  return (
    <PageLayout title={`phpMyFAQ News from ${year}`} searchSection="News">
      <Breadcrumb parent={{ href: '/news', label: 'News' }} current={year} />
      <div id="news-content">
        {entries.map((entry, index) => (
          <div key={`${entry.date}-${index}`} className={styles.entry}>
            <h3 id={entry.date} className={styles.entryDate}>
              {entry.date}
            </h3>
            <hr className={styles.entryRule} />
            <div dangerouslySetInnerHTML={{ __html: marked.parse(entry.content, { async: false }) }} />
          </div>
        ))}
      </div>
    </PageLayout>
  );
}