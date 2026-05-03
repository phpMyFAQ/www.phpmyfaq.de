import styles from './support.module.scss';
import PageLayout, { generatePageMetadata } from '@/components/PageLayout';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata(
  'Support',
  'Get support for phpMyFAQ through our community, documentation, and professional services',
);

export default function SupportPage() {
  return (
    <PageLayout title="Support">
      <p className={styles.lead}>
        Whether you need help getting started or require professional assistance, we&apos;re here to support you every
        step of the way.
      </p>

      <div className={styles.grid}>
        <article className={styles.card}>
          <div className={styles.icon}>
            <i className="fas fa-comments"></i>
          </div>
          <h3>Community Support</h3>
          <p>Join our vibrant community and get help from fellow phpMyFAQ users and developers.</p>
          <ul>
            <li>
              <a href="https://forum.phpmyfaq.de" target="_blank" rel="noopener noreferrer">
                Support Forum
              </a>
              <span className={styles.meta}>Community Q&amp;A</span>
            </li>
            <li>
              <a href="https://discord.gg/wszhTceuNM" target="_blank" rel="noopener noreferrer">
                Discord Community
              </a>
              <span className={styles.meta}>Real-time chat</span>
            </li>
            <li>
              <a href="https://github.com/thorsten/phpMyFAQ/discussions" target="_blank" rel="noopener noreferrer">
                GitHub Discussions
              </a>
              <span className={styles.meta}>Ask questions &amp; share</span>
            </li>
            <li>
              <a href="https://github.com/thorsten/phpMyFAQ/issues" target="_blank" rel="noopener noreferrer">
                Bug Reports
              </a>
              <span className={styles.meta}>Report issues &amp; features</span>
            </li>
          </ul>
        </article>

        <article className={styles.card}>
          <div className={styles.icon}>
            <i className="fas fa-rocket"></i>
          </div>
          <h3>Professional Support</h3>
          <p>Need expert help? Our professional services ensure your phpMyFAQ runs perfectly.</p>
          <ul>
            <li>Custom development &amp; consulting</li>
            <li>Installation &amp; configuration</li>
            <li>Performance optimization</li>
            <li>Training &amp; workshops</li>
            <li>Priority bug fixes</li>
          </ul>
          <a href="mailto:thorsten@phpmyfaq.de" className={styles.cta}>
            Contact Us
          </a>
        </article>

        <article className={styles.card}>
          <div className={styles.icon}>
            <i className="fas fa-book"></i>
          </div>
          <h3>Documentation</h3>
          <p>Comprehensive guides and resources to help you master phpMyFAQ.</p>
          <ul>
            <li>
              <Link href="/documentation">User Documentation</Link>
              <span className={styles.meta}>Complete guides</span>
            </li>
            <li>
              <Link href="/docs/standards">Developer Docs</Link>
              <span className={styles.meta}>Coding standards</span>
            </li>
            <li>
              <a href="https://api-docs.phpmyfaq.de/" target="_blank" rel="noopener noreferrer">
                API Reference
              </a>
              <span className={styles.meta}>OpenAPI specs</span>
            </li>
          </ul>
        </article>
      </div>

      <h2 className={styles.heading}>Additional Resources</h2>
      <div className={styles.resourceGrid}>
        <Link href="/changelog" className={styles.resourceItem}>
          <i className={`fas fa-clipboard-list ${styles.resourceIcon}`}></i>
          <span>Changelog</span>
        </Link>
        <Link href="/advisories" className={styles.resourceItem}>
          <i className={`fas fa-shield-alt ${styles.resourceIcon}`}></i>
          <span>Security Advisories</span>
        </Link>
        <Link href="/translations" className={styles.resourceItem}>
          <i className={`fas fa-globe ${styles.resourceIcon}`}></i>
          <span>Translations</span>
        </Link>
        <Link href="/requirements" className={styles.resourceItem}>
          <i className={`fas fa-cog ${styles.resourceIcon}`}></i>
          <span>Requirements</span>
        </Link>
      </div>
    </PageLayout>
  );
}
