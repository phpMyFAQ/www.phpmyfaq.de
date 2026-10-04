import type React from 'react';
import PageLayout, { generatePageMetadata } from '@/components/PageLayout';
import { Metadata } from 'next';
import Link from 'next/link';
import blocks from '@/components/ContentBlocks.module.scss';
import Icon from '@/components/Icon';
import type { IconName } from '@/components/icons.generated';
import { requireVersions } from '@/lib/data';
import { phpMinimumFor, recommendedPhpVersion } from '@/data/security';

export const metadata: Metadata = generatePageMetadata(
  'Requirements',
  'System requirements for phpMyFAQ installation and hosting',
);

// Minimum version of the current stable line; the recommendation is the newest
// PHP release from src/data/security.ts.
const phpMinimum = phpMinimumFor(requireVersions().stable);

const groups = [
  {
    icon: 'brand-php',
    title: 'PHP',
    items: [
      <>
        <strong>PHP {phpMinimum} or later</strong>, {recommendedPhpVersion} or later recommended
      </>,
      <>Extensions: PDO, cURL, GD or ImageMagick, mbstring</>,
      <>Optional: LDAP, XML, ZIP, Fileinfo</>,
      <>Memory limit: 128 MB minimum, 256 MB recommended</>,
    ],
  },
  {
    icon: 'server',
    title: 'Web server',
    items: [
      <>
        <strong>Apache 2.4 or later</strong> with mod_rewrite
      </>,
      <>
        <strong>Nginx 1.18 or later</strong>
      </>,
      <>
        <strong>IIS 10 or later</strong> with the URL Rewrite module
      </>,
      <>HTTPS</>,
    ],
  },
  {
    icon: 'database',
    title: 'Database',
    items: [
      <>
        <strong>MySQL 8.0 or later</strong> or <strong>MariaDB 10.6 or later</strong>
      </>,
      <>
        <strong>PostgreSQL 13 or later</strong>
      </>,
      <>
        <strong>SQLite 3.38 or later</strong> for small installations
      </>,
      <>
        <strong>Microsoft SQL Server 2019 or later</strong> or <strong>Azure SQL</strong>
      </>,
    ],
  },
  {
    icon: 'puzzle-piece',
    title: 'Optional',
    items: [
      <>
        <strong>Elasticsearch 7 or OpenSearch 2</strong> for advanced search
      </>,
      <>
        <strong>LDAP or Active Directory</strong> for user authentication
      </>,
      <>
        <strong>SMTP server</strong> for email notifications
      </>,
      <>
        <strong>Redis</strong> for configuration caching
      </>,
    ],
  },
] satisfies { icon: IconName; title: string; items: React.ReactNode[] }[];

export default function RequirementsPage() {
  return (
    <PageLayout title="System Requirements" searchSection="Documentation">
      <p className={blocks.lead}>phpMyFAQ runs on any PHP web host with a database. This is what it needs.</p>

      <div className={blocks.grid2}>
        {groups.map((group) => (
          <article key={group.title} className={blocks.card}>
            <div className={blocks.icon}>
              <Icon name={group.icon} />
            </div>
            <h2>{group.title}</h2>
            <ul className={blocks.list}>
              {group.items.map((item, index) => (
                <li key={index}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className={blocks.note}>
        <p>
          Ready to go? <Link href="/download">Download phpMyFAQ</Link> or try the <Link href="/demo">live demo</Link>{' '}
          first. The <Link href="/documentation">documentation</Link> covers installation step by step.
        </p>
      </div>
    </PageLayout>
  );
}