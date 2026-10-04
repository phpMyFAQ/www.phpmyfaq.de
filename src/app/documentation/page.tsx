import PageLayout, { generatePageMetadata } from '@/components/PageLayout';
import Link from 'next/link';
import { Metadata } from 'next';
import blocks from '@/components/ContentBlocks.module.scss';
import Icon from '@/components/Icon';
import { documentedLines, isEndOfLife } from '@/lib/docs';

export const metadata: Metadata = generatePageMetadata(
  'Documentation',
  'Documentation for phpMyFAQ administrator, end-users and developers.',
);

// What the status in the support table means for a reader of the manual.
function statusNote(status: string): string {
  if (status === 'Active development') return 'Development version';
  if (status === 'Active support') return 'Current stable release';
  return 'Previous release line';
}

export default function DocumentationPage() {
  const guides = documentedLines().filter((line) => !isEndOfLife(line));

  return (
    <PageLayout title="Documentation" searchSection="Documentation">
      <p className={blocks.lead}>
        Everything from installing phpMyFAQ and using it day to day, to contributing code the right way.
      </p>

      <h2 className={blocks.heading}>Getting Started</h2>
      <div className={blocks.grid2}>
        <article className={blocks.card}>
          <div className={blocks.icon}>
            <Icon name="book" />
          </div>
          <h3>User guides</h3>
          <p>Detailed documentation for administrators and end users, per release line.</p>
          <ul className={blocks.list}>
            {guides.map((line) => (
              <li key={line.version}>
                <span>
                  <a href={line.url} target="_blank" rel="noopener noreferrer">
                    Documentation for phpMyFAQ {line.version}
                  </a>
                  <span className={blocks.meta}>{statusNote(line.status)}</span>
                </span>
              </li>
            ))}
            <li>
              <span>
                <Link href="/docs/">Documentation archive</Link>
                <span className={blocks.meta}>Older, unmaintained versions</span>
              </span>
            </li>
          </ul>
        </article>

        <article className={blocks.card}>
          <div className={blocks.icon}>
            <Icon name="clipboard-list" />
          </div>
          <h3>Reference</h3>
          <p>What you need before installing, and what changed between releases.</p>
          <ul className={blocks.list}>
            <li>
              <span>
                <Link href="/requirements">Requirements</Link>
                <span className={blocks.meta}>PHP version, databases and web servers</span>
              </span>
            </li>
            <li>
              <span>
                <Link href="/changelog">Changelog</Link>
                <span className={blocks.meta}>User-visible changes since 2001</span>
              </span>
            </li>
            <li>
              <span>
                <Link href="/translations">Translations</Link>
                <span className={blocks.meta}>Supported languages and how to improve them</span>
              </span>
            </li>
          </ul>
        </article>
      </div>

      <h2 className={blocks.heading}>Developer Resources</h2>
      <div className={blocks.grid2}>
        <article className={blocks.card}>
          <div className={blocks.icon}>
            <Icon name="code" />
          </div>
          <h3>Contributing</h3>
          <ul className={blocks.list}>
            <li>
              <span>
                <a
                  href="https://phpmyfaq.readthedocs.io/en/main/development/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  How to contribute
                </a>
                <span className={blocks.meta}>Setting up a development environment and sending changes</span>
              </span>
            </li>
            <li>
              <span>
                <Link href="/docs/standards">Coding standards</Link>
                <span className={blocks.meta}>Styles for PHP, HTML and CSS</span>
              </span>
            </li>
            <li>
              <span>
                <a href="https://github.com/thorsten/phpMyFAQ" target="_blank" rel="nofollow noopener noreferrer">
                  Source code on GitHub
                </a>
              </span>
            </li>
          </ul>
        </article>

        <article className={blocks.card}>
          <div className={blocks.icon}>
            <Icon name="plug" />
          </div>
          <h3>Integrating</h3>
          <ul className={blocks.list}>
            <li>
              <span>
                <a href="https://api-docs.phpmyfaq.de/" target="_blank" rel="noopener noreferrer">
                  OpenAPI specification
                </a>
                <span className={blocks.meta}>The REST API of phpMyFAQ 4.0 and later</span>
              </span>
            </li>
            <li>
              <span>
                <a
                  href="https://github.com/thorsten/phpMyFAQ/pkgs/container/phpmyfaq"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  Container images
                </a>
                <span className={blocks.meta}>Official Docker images on GitHub</span>
              </span>
            </li>
            <li>
              <span>
                <Link href="/docs/codenames">Release codenames</Link>
                <span className={blocks.meta}>Every major release has one</span>
              </span>
            </li>
          </ul>
        </article>
      </div>
    </PageLayout>
  );
}