import Link from 'next/link';
import { Metadata } from 'next';
import PageLayout, { generatePageMetadata } from '@/components/PageLayout';
import {
  DownloadInfo,
  formatFileSize,
  formatReleaseDate,
  getDevelopmentInfo,
  getDownloadUrl,
  getSbomUrl,
  getStableInfo,
  hasSbomFiles,
  isDevelopmentAhead,
  requireVersions,
} from '@/lib/data';
import styles from './download.module.scss';
import Icon from '@/components/Icon';
import blocks from '@/components/ContentBlocks.module.scss';
import JsonLd from '@/components/JsonLd';
import { softwareApplication } from '@/lib/structuredData';
import { phpMinimumFor } from '@/data/security';

export const metadata: Metadata = generatePageMetadata(
  'Download',
  'Download the latest version of phpMyFAQ - the open source FAQ system',
);

interface ReleaseCardProps {
  id?: string;
  version: string;
  released: string;
  info: DownloadInfo | null;
  recommended: boolean;
}

function ReleaseCard({ id, version, released, info, recommended }: ReleaseCardProps) {
  return (
    <article
      id={id}
      className={`${styles.release} ${recommended ? styles.recommended : ''}`}
      data-testid="release-card"
    >
      {recommended ? (
        <div className={styles.label}>
          <Icon name="check-circle" />
          Stable release · Recommended
        </div>
      ) : (
        <div className={`${styles.label} ${styles.labelMuted}`}>
          <Icon name="code-branch" />
          Pre-release · For testing only
        </div>
      )}

      <h2>phpMyFAQ {version}</h2>
      <p className={styles.meta}>
        Released {formatReleaseDate(released)} · <Link href={`/changelog/#${version}`}>Release notes</Link>
      </p>

      <p>
        {recommended
          ? 'All features tested and ready for production use. Pick this one unless you want to help testing.'
          : 'Get the upcoming features early. Not for production: things may still change before the final release.'}
      </p>

      {info && (
        <div className={styles.actions}>
          <a href={getDownloadUrl(version, 'zip')} className={recommended ? blocks.cta : blocks.ctaSecondary} download>
            <Icon name="download" />
            ZIP <small>({formatFileSize(info.zip.filesize)})</small>
          </a>
          <a href={getDownloadUrl(version, 'tar.gz')} className={blocks.ctaSecondary} download>
            <Icon name="file-archive" />
            TAR.GZ <small>({formatFileSize(info.targz.filesize)})</small>
          </a>
        </div>
      )}

      {(info || hasSbomFiles(version)) && (
        <div className={styles.details}>
          {info && (
            <section>
              <h3>MD5 checksums</h3>
              <dl className={styles.checksums}>
                <dt>ZIP</dt>
                <dd>
                  <code>{info.zip.md5}</code>
                </dd>
                <dt>TAR.GZ</dt>
                <dd>
                  <code>{info.targz.md5}</code>
                </dd>
              </dl>
            </section>
          )}

          {hasSbomFiles(version) && (
            <section>
              <h3>Software Bill of Materials</h3>
              <p>CycloneDX listing of all third-party dependencies.</p>
              <ul className={styles.sbomLinks}>
                <li>
                  <a href={getSbomUrl(version)} download>
                    Combined (PHP + JS)
                  </a>
                </li>
                <li>
                  <a href={getSbomUrl(version, 'php')} download>
                    PHP only
                  </a>
                </li>
                <li>
                  <a href={getSbomUrl(version, 'js')} download>
                    JS only
                  </a>
                </li>
              </ul>
            </section>
          )}
        </div>
      )}
    </article>
  );
}

export default function DownloadPage() {
  const versions = requireVersions();
  const showDevelopment = isDevelopmentAhead(versions.development, versions.stable);

  return (
    <PageLayout title="Download phpMyFAQ">
      <JsonLd data={softwareApplication(versions, { downloadUrl: getDownloadUrl(versions.stable, 'zip') })} />
      <p className={blocks.lead}>
        Download the latest version of phpMyFAQ and start building your knowledge base today.
      </p>

      <div className={styles.releases}>
        <ReleaseCard version={versions.stable} released={versions.stable_released} info={getStableInfo()} recommended />
        {showDevelopment && (
          <ReleaseCard
            id="development"
            version={versions.development}
            released={versions.development_released}
            info={getDevelopmentInfo()}
            recommended={false}
          />
        )}
      </div>

      <h2 className={blocks.heading}>Before you install</h2>
      <div className={blocks.grid2}>
        <article className={blocks.card}>
          <div className={blocks.icon}>
            <Icon name="server" />
          </div>
          <h3>System requirements</h3>
          <ul className={blocks.list}>
            <li>PHP {phpMinimumFor(versions.stable)} or higher</li>
            <li>Web server: Apache, Nginx or IIS</li>
            <li>Database: MySQL, MariaDB, PostgreSQL, SQLite or SQL Server</li>
            <li>A modern web browser</li>
          </ul>
          <Link href="/requirements" className={blocks.more}>
            Full requirements →
          </Link>
        </article>

        <article className={blocks.card}>
          <div className={blocks.icon}>
            <Icon name="life-ring" />
          </div>
          <h3>Installation help</h3>
          <ul className={blocks.list}>
            <li>
              <Link href="/documentation">Installation guide</Link>
            </li>
            <li>
              <Link href="/support">Getting support</Link>
            </li>
            <li>
              <a href="https://discord.gg/wszhTceuNM" target="_blank" rel="noopener noreferrer">
                Discord community
              </a>
            </li>
            <li>
              <a href="https://github.com/thorsten/phpMyFAQ/issues" target="_blank" rel="noopener noreferrer">
                Report an issue
              </a>
            </li>
          </ul>
        </article>
      </div>

      <div className={blocks.note} data-testid="archive-note">
        <p>
          <strong>Looking for an older version?</strong> Every release since 1.2.0 is available in the{' '}
          <Link href="/archive">download archive</Link>.
        </p>
        <p>We recommend always using the latest stable version for security and performance.</p>
      </div>
    </PageLayout>
  );
}