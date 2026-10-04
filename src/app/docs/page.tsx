import Link from 'next/link';
import { Metadata } from 'next';
import PageLayout, { generatePageMetadata } from '@/components/PageLayout';
import blocks from '@/components/ContentBlocks.module.scss';
import Icon from '@/components/Icon';
import { documentedLines, isEndOfLife } from '@/lib/docs';

export const metadata: Metadata = generatePageMetadata(
  'Documentation archive',
  'Archive of old, unmaintained versions of phpMyFAQ documentation',
);

// Maintained lines from the support table, documented on Read the Docs.
const current = documentedLines()
  .filter((line) => !isEndOfLife(line))
  .map((line) => ({
    version: line.version,
    href: line.url,
    note: `${line.status === 'Active development' ? 'In development, ' : ''}PHP ${line.php.replace(/\+$/, '')} or later`,
  }));

// Lines that reached end of life. Those still in the support table have their
// documentation on Read the Docs, the older ones render from content/docs.
const archived = new Map(documentedLines().map((line) => [line.version, line.url]));
const outdated = [
  { version: '4.0', note: 'PHP 8.2 or later' },
  { version: '3.2', note: 'PHP 7.4 or later' },
  { version: '3.1', note: 'PHP 7.3 or later' },
  { version: '3.0', note: 'PHP 7.1 or later' },
  { version: '2.9', note: 'PHP 5.6 or later' },
  { version: '2.8', note: 'PHP 5.3.3 or later' },
  { version: '2.7', note: 'PHP 5.2.3 or later' },
  { version: '2.6', note: 'PHP 5.2.3 or later' },
  { version: '2.5', note: 'PHP 5.2 or later' },
  { version: '2.0', note: 'PHP 4.3.3 or later' },
].map((entry) => ({ ...entry, href: archived.get(entry.version) }));

export default function DocsIndexPage() {
  return (
    <PageLayout title="Documentation archive" searchSection="Documentation">
      <p className={blocks.lead}>
        Documentation for every phpMyFAQ release line. We cannot offer support for the outdated versions; the current
        documentation starts on the <Link href="/documentation">documentation page</Link>.
      </p>

      <div className={blocks.grid2}>
        <article className={blocks.card}>
          <div className={blocks.icon}>
            <Icon name="book-open" />
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
            <Icon name="archive" />
          </div>
          <h2>Outdated versions</h2>
          <ul className={blocks.list}>
            {outdated.map((entry) => (
              <li key={entry.version}>
                <span>
                  {entry.href ? (
                    <a href={entry.href} target="_blank" rel="noopener noreferrer">
                      phpMyFAQ {entry.version}
                    </a>
                  ) : (
                    <Link href={`/docs/${entry.version}`}>phpMyFAQ {entry.version}</Link>
                  )}
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