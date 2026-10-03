import Link from 'next/link';
import { Metadata } from 'next';
import PageLayout, { generatePageMetadata } from '@/components/PageLayout';
import blocks from '@/components/ContentBlocks.module.scss';

export const metadata: Metadata = generatePageMetadata(
  'Documentation archive',
  'Archive of old, unmaintained versions of phpMyFAQ documentation',
);

const current = [
  { version: '4.2', href: 'https://phpmyfaq.readthedocs.io/en/main/', note: 'In development, PHP 8.4 or later' },
  { version: '4.1', href: 'https://phpmyfaq.readthedocs.io/en/4.1/', note: 'PHP 8.3 or later' },
  { version: '4.0', href: 'https://phpmyfaq.readthedocs.io/en/4.0/', note: 'PHP 8.2 or later' },
];

const outdated = [
  { version: '3.2', note: 'PHP 7.4 or later' },
  { version: '3.1', note: 'PHP 7.3 or later' },
  { version: '3.0', note: 'PHP 7.1 or later' },
  { version: '2.9', note: 'PHP 5.6 or later' },
  { version: '2.8', note: 'PHP 5.3.3 or later' },
  { version: '2.7', note: 'PHP 5.2.3 or later' },
  { version: '2.6', note: 'PHP 5.2.3 or later' },
  { version: '2.5', note: 'PHP 5.2 or later' },
  { version: '2.0', note: 'PHP 4.3.3 or later' },
];

export default function DocsIndexPage() {
  return (
    <PageLayout title="Documentation archive">
      <p className={blocks.lead}>
        Documentation for every phpMyFAQ release line. We cannot offer support for the outdated versions; the current
        documentation starts on the <Link href="/documentation">documentation page</Link>.
      </p>

      <div className={blocks.grid2}>
        <article className={blocks.card}>
          <div className={blocks.icon}>
            <i className="fas fa-book-open" aria-hidden="true"></i>
          </div>
          <h2>Current versions</h2>
          <ul className={blocks.list}>
            {current.map((entry) => (
              <li key={entry.version}>
                <span>
                  <a href={entry.href} target="_blank" rel="noopener noreferrer">
                    phpMyFAQ {entry.version}
                  </a>
                  <span className={blocks.meta}>{entry.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article className={blocks.card}>
          <div className={blocks.icon}>
            <i className="fas fa-archive" aria-hidden="true"></i>
          </div>
          <h2>Outdated versions</h2>
          <ul className={blocks.list}>
            {outdated.map((entry) => (
              <li key={entry.version}>
                <span>
                  <Link href={`/docs/${entry.version}`}>phpMyFAQ {entry.version}</Link>
                  <span className={blocks.meta}>{entry.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </PageLayout>
  );
}