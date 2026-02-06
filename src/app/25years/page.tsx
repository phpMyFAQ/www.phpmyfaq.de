import PageLayout from '@/components/PageLayout';
import { generatePageMetadata } from '@/components/PageLayout';
import { Metadata } from 'next';
import styles from './anniversary.module.scss';

export const metadata: Metadata = generatePageMetadata(
  '25 Years phpMyFAQ',
  'Celebrating 25 years of phpMyFAQ — from a small PHP 3 script in 2001 to a modern open-source FAQ platform in 2026',
);

const milestones = [
  { year: 'Feb 2001', title: 'Development Begins' },
  { year: 'Sep 2001', title: 'phpMyFAQ 1.0' },
  { year: 'Oct 2002', title: 'Going Open Source (MPL)' },
  { year: '2005', title: 'phpMyFAQ 2.0' },
  { year: '2009', title: 'Migrating to Git' },
  { year: '2011', title: 'Celebrating 10 Years' },
  { year: '2013', title: 'phpMyFAQ 2.8 & MPL 2.0' },
  { year: '2016', title: 'Celebrating 15 Years' },
  { year: '2020', title: 'phpMyFAQ 3.0' },
  { year: '2021', title: 'Celebrating 20 Years' },
  { year: '2024', title: 'phpMyFAQ 4.0' },
  { year: '2026', title: '25 Years & Still Going' },
];

const stats = [
  { number: '25', label: 'Years' },
  { number: '240+', label: 'Versions Released' },
  { number: '40+', label: 'Languages Supported' },
  { number: '19 MB+', label: 'Package Size' },
  { number: '17+', label: 'Years on Git' },
  { number: 'PHP 8.3+', label: 'Powered By' },
];

export default function TwentyFiveYearsPage() {
  return (
    <PageLayout title="Celebrating 25 years of phpMyFAQ">
      {/* Intro */}
      <span className={styles.badge}>February 2001 — February 2026</span>
      <p>
        What started as a small PHP 3 script for an unofficial FAQ at a German hosting company has grown into a mature,
        multilingual open-source FAQ platform used around the world. Twenty-five years of continuous development,
        community contributions, and a passion for making knowledge accessible.
      </p>
      <p>
        Knowledge is evolving – and so is phpMyFAQ. Look forward with the upcoming 4.1 and 4.2 releases to a future where 
        we combine modern intelligence with AI Agent support via MCP and intuitive user experience to take self-service 
        support to a whole new level.
      </p>

      {/* Timeline */}
      <h2>Milestones</h2>
      <div className={styles.timeline}>
        {milestones.map((milestone) => (
          <div key={milestone.year} className={styles.timelineItem}>
            <div className={styles.timelineYear}>{milestone.year}</div>
            <p className={styles.timelineTitle}>{milestone.title}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <h2>By the Numbers</h2>
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <div className={styles.statNumber}>{stat.number}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Thank you */}
      <h2>Thank you!</h2>
      <p>The phpMyFAQ Team wants to thank the following persons and companies:</p>
      <ul className={styles.thankYouList}>
        <li>
          <strong>Bastian Pöttner</strong> — for his initial work
        </li>
        <li>
          <strong>Lieven Op De Beeck</strong> — for the phpMyFAQ logo
        </li>
        <li>
          <strong>David Soria Parra</strong> — for Git support and being a friend
        </li>
        <li>
          <strong>Tom Rochester</strong> — for the initial PostgreSQL port and being a friend
        </li>
        <li>
          <strong>Mathias Schindler</strong> — for early propaganda
        </li>
        <li>
          <strong>Jens Grochtdreis</strong> — for helping with CSS nightmares
        </li>
        <li>
          <strong>Daniel Richter</strong> — for alpha testing
        </li>
        <li>
          <strong>Johannes Schlüter</strong> — for testing phpMyFAQ and being a friend
        </li>
        <li>
          <strong>Tom Zeithaml</strong> — for helping with SEO
        </li>
        <li>
          <strong>Qafoo</strong> — for using Tideways and friendship
        </li>
        <li>Everyone who sent patches and translations over the years</li>
        <li>Everyone who donated something over the years</li>
        <li>And of course everyone who is using phpMyFAQ!</li>
      </ul>
    </PageLayout>
  );
}
