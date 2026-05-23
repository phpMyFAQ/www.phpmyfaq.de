import PageLayout from '@/components/PageLayout';
import { generatePageMetadata } from '@/components/PageLayout';
import Link from 'next/link';
import { Metadata } from 'next';
import styles from './news.module.scss';

export const metadata: Metadata = generatePageMetadata(
  'News archive',
  'News archive overview about all news about phpMyFAQ since 2001',
);

interface YearEntry {
  year: number;
  summary: string;
  // Optional highlight for milestone years (major releases, anniversaries).
  tag?: string;
}

interface Era {
  // Section heading, e.g. "phpMyFAQ 4.x".
  label: string;
  // Short span shown next to the heading, e.g. "2024 – 2026".
  span: string;
  years: YearEntry[];
}

// Grouped by major-version era, newest first. Each year links to its news page.
const ERAS: Era[] = [
  {
    label: 'phpMyFAQ 4.x',
    span: '2024 – 2026',
    years: [
      { year: 2026, summary: 'Finally, releasing phpMyFAQ 4.1, getting all ready for PHP 8.6, started working on phpMyFAQ 4.2', tag: 'v4.1' },
      { year: 2025, summary: 'Working hard on phpMyFAQ 4.1, getting all ready for PHP 8.5' },
      { year: 2024, summary: 'Finally, releasing phpMyFAQ 4.0, getting all ready for PHP 8.4, started working on phpMyFAQ 4.1', tag: 'v4.0' },
    ],
  },
  {
    label: 'phpMyFAQ 3.x',
    span: '2018 – 2023',
    years: [
      { year: 2023, summary: 'Finally, releasing phpMyFAQ 3.2, getting all ready for PHP 8.3, started working on phpMyFAQ 4.0', tag: 'v3.2' },
      { year: 2022, summary: 'Finally, releasing phpMyFAQ 3.1, getting all ready for PHP 8.2, working hard on phpMyFAQ 3.2' },
      { year: 2021, summary: 'Still struggling with the Corona pandemic, getting all ready for PHP 8.1, working hard on phpMyFAQ 3.1' },
      { year: 2020, summary: 'Finally releasing phpMyFAQ 3.0, struggling with the Corona pandemic, getting all ready for PHP 8.0 and working hard on phpMyFAQ 3.1', tag: 'v3.0' },
      { year: 2019, summary: 'Working hard on phpMyFAQ 3.0 and dropped support for PHP 5.' },
      { year: 2018, summary: 'Finally, added PHP namespaces and Docker support for the upcoming phpMyFAQ 3.0 milestone' },
    ],
  },
  {
    label: 'phpMyFAQ 2.x',
    span: '2007 – 2017',
    years: [
      { year: 2017, summary: 'Improving the 2.9 version and working hard on phpMyFAQ 3.0' },
      { year: 2016, summary: 'Celebrated 15 years of phpMyFAQ and released phpMyFAQ 2.9', tag: '15 years' },
      { year: 2015, summary: 'Working on 2.8 and 2.9, getting everything ready for PHP 7 and HHVM' },
      { year: 2014, summary: 'Improving the 2.8 version and working hard on phpMyFAQ 2.9' },
      { year: 2013, summary: 'Using PHP 5.3 and Bootstrap for phpMyFAQ 2.8' },
      { year: 2012, summary: 'Improving the 2.7 version and working on phpMyFAQ 2.8' },
      { year: 2011, summary: 'Celebrated 10 years of phpMyFAQ, worked on better usability and HTML5 support with phpMyFAQ 2.7', tag: '10 years' },
      { year: 2010, summary: "Everything's UTF-8 encoded now with phpMyFAQ 2.6" },
      { year: 2009, summary: 'Using PHP 5.2 with phpMyFAQ 2.5' },
      { year: 2008, summary: 'Improving the 2.0 version and working on phpMyFAQ 2.5' },
      { year: 2007, summary: 'Better user management and permissions with phpMyFAQ 2.0', tag: 'v2.0' },
    ],
  },
  {
    label: 'phpMyFAQ 1.x',
    span: '2002 – 2006',
    years: [
      { year: 2006, summary: 'Revisions and better spam protection with phpMyFAQ 1.6' },
      { year: 2005, summary: 'Support for PHP 5, PostgreSQL, MS SQL and SEO optimized URLs with 1.5' },
      { year: 2004, summary: 'Now with a WYSIWYG editor and XHTML support with phpMyFAQ 1.4' },
      { year: 2003, summary: 'Adding simple multi-language and PDF support in phpMyFAQ 1.3' },
      { year: 2002, summary: 'New features and PHP 4 support with phpMyFAQ 1.1 and going open source with phpMyFAQ 1.2' },
    ],
  },
  {
    label: 'The early days',
    span: '2001',
    years: [
      { year: 2001, summary: 'The PHP3 beginnings with phpMyFAQ 0.x and the final 1.0 release', tag: 'The beginning' },
    ],
  },
];

export default function NewsPage() {
  return (
    <PageLayout title="News archive">
      <p className="lead">Two decades of phpMyFAQ, grouped by release era. Pick a year to read what happened.</p>
      {ERAS.map((era) => (
        <section key={era.label} className={styles.era}>
          <header className={styles.eraHeader}>
            <h2 className={styles.eraTitle}>{era.label}</h2>
            <span className={styles.eraSpan}>{era.span}</span>
          </header>
          <div className={styles.grid}>
            {era.years.map(({ year, summary, tag }) => (
              <Link key={year} href={`/news/${year}`} className={styles.card}>
                <span className={styles.year}>{year}</span>
                {tag && <span className={styles.badge}>{tag}</span>}
                <p className={styles.summary}>{summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </PageLayout>
  );
}
