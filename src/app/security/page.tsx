import PageLayout from '@/components/PageLayout';
import { generatePageMetadata } from '@/components/PageLayout';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAdvisoriesByYear, AdvisorySummary } from '@/lib/securityAdvisory';
import styles from '../advisories/advisories.module.scss';

export const metadata: Metadata = generatePageMetadata(
  'List of Security Advisories',
  'We seriously take care about any security issues found in phpMyFAQ or bundled components. This page provides links to all our security advisories.',
);

function riskClass(risk?: string): string {
  const r = (risk || '').toLowerCase();
  if (r.includes('critical')) return styles.riskCritical;
  if (r.includes('high')) return styles.riskHigh;
  if (r.includes('medium') || r.includes('moderate')) return styles.riskMedium;
  if (r.includes('low')) return styles.riskLow;
  return styles.riskUnknown;
}

function formatDate(date: string): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
}

function stripTitle(title: string): string {
  return title.replace(/^Security Advisory\s+\d{4}-\d{2}-\d{2}\s*[-:]?\s*/i, '').trim() || title;
}

function AdvisoryCard({ advisory }: { advisory: AdvisorySummary }) {
  const cleanTitle = stripTitle(advisory.title);
  return (
    <Link href={`/security/${advisory.slug}`} className={styles.card}>
      <div className={styles.cardHead}>
        <span className={styles.date}>{formatDate(advisory.issuedOn || advisory.date)}</span>
        <span className={`${styles.badge} ${riskClass(advisory.risk)}`}>{advisory.risk || 'Advisory'}</span>
      </div>
      <h3 className={styles.title}>{cleanTitle}</h3>
      {advisory.description && <p className={styles.description}>{advisory.description}</p>}
      {advisory.software && (
        <div className={styles.meta}>
          <span className={styles.software}>{advisory.software}</span>
        </div>
      )}
    </Link>
  );
}

export default function SecurityPage() {
  const advisoriesByYear = getAdvisoriesByYear();

  return (
    <PageLayout title="List of Security Advisories">
      <p className={styles.intro}>
        We take any security issues found in phpMyFAQ or bundled components seriously. Below are all published security
        advisories, grouped by year and ordered from newest to oldest.
      </p>

      {advisoriesByYear.map(({ year, advisories }) => (
        <section key={year} className={styles.yearSection}>
          <div className={styles.yearHeader}>
            <h2>{year}</h2>
            <span className={styles.count}>
              {advisories.length} {advisories.length === 1 ? 'advisory' : 'advisories'}
            </span>
          </div>
          <div className={styles.grid}>
            {advisories.map((advisory) => (
              <AdvisoryCard key={advisory.slug} advisory={advisory} />
            ))}
          </div>
        </section>
      ))}
    </PageLayout>
  );
}
