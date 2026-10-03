import PageLayout, { generatePageMetadata } from '@/components/PageLayout';
import { fallbackVersions, getVersions, isDevelopmentAhead } from '@/lib/data';
import type { Metadata } from 'next';
import Link from 'next/link';
import blocks from '@/components/ContentBlocks.module.scss';

export const metadata: Metadata = generatePageMetadata('Demo installations', 'phpMyFAQ demo installations');

export default function DemoPage() {
  const versions = getVersions() ?? fallbackVersions;
  const showDevelopment = isDevelopmentAhead(versions.development, versions.stable);

  return (
    <PageLayout title="Demo" description="phpMyFAQ demo installations">
      <p className={blocks.lead}>
        Click around in a real installation. Every demo is reset once a day, so feel free to change anything.
      </p>

      <h2 className={blocks.heading}>Installations</h2>
      <div className={blocks.grid2}>
        <article className={blocks.card}>
          <div className={blocks.icon}>
            <i className="fas fa-check-circle" aria-hidden="true"></i>
          </div>
          <h3>phpMyFAQ {versions.stable}</h3>
          <p>The current stable release, the version you get from the download page.</p>
          <a
            className={blocks.cta}
            href="https://roy.demo.phpmyfaq.de/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Open the demo for phpMyFAQ {versions.stable}
          </a>
        </article>

        {showDevelopment && (
          <article className={blocks.card}>
            <div className={blocks.icon}>
              <i className="fas fa-code-branch" aria-hidden="true"></i>
            </div>
            <h3>phpMyFAQ {versions.development}</h3>
            <p>
              No public demo for the pre-release yet. Run it yourself with the official{' '}
              <a
                href="https://github.com/thorsten/phpMyFAQ/pkgs/container/phpmyfaq"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                Docker image
              </a>{' '}
              or download it from the <Link href="/download/#development">download page</Link>.
            </p>
          </article>
        )}
      </div>

      <h2 className={blocks.heading}>Credentials</h2>
      <div className={blocks.grid2}>
        <article className={blocks.card}>
          <h3>Admin user</h3>
          <dl className={blocks.kv}>
            <dt>Username</dt>
            <dd>
              <code>demoadmin</code>
            </dd>
            <dt>Password</dt>
            <dd>
              <code>demoadmin</code>
            </dd>
          </dl>
        </article>
        <article className={blocks.card}>
          <h3>Normal user</h3>
          <dl className={blocks.kv}>
            <dt>Username</dt>
            <dd>
              <code>demouser</code>
            </dd>
            <dt>Password</dt>
            <dd>
              <code>demouser</code>
            </dd>
          </dl>
        </article>
      </div>
    </PageLayout>
  );
}