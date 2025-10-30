import styles from './support.module.scss'
import { generatePageMetadata } from '@/components/PageLayout'
import Link from 'next/link'
import { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata(
  'Support',
  'Get support for phpMyFAQ through our community, documentation, and professional services'
)

export default function SupportPage() {
  return (
    <div className={styles.supportContainer}>
      <div className="container">
        <div className={styles.header}>
          <h1>Support</h1>
          <p className={styles.lead}>
            Whether you need help getting started or require professional assistance,
            we&apos;re here to support you every step of the way.
          </p>
        </div>

        <div className={styles.supportGrid}>
          <div className={styles.supportCard}>
            <div className={styles.cardIcon}>💬</div>
            <h5>Community Support</h5>
            <p>Join our vibrant community and get help from fellow phpMyFAQ users and developers.</p>
            <ul>
              <li>
                <a href="https://forum.phpmyfaq.de" target="_blank" rel="noopener noreferrer">
                  Support Forum
                </a>
                <span className={"ms-2"}>Support Forum</span>
              </li>
              <li>
                <a href="https://discord.gg/wszhTceuNM" target="_blank" rel="noopener noreferrer">
                  Discord Community
                </a>
                <span className={"ms-2"}>Real-time chat support</span>
              </li>
              <li>
                <a href="https://github.com/thorsten/phpMyFAQ/discussions" target="_blank" rel="noopener noreferrer">
                  GitHub Discussions
                </a>
                <span className={"ms-2"}>Ask questions & share</span>
              </li>
              <li>
                <a href="https://github.com/thorsten/phpMyFAQ/issues" target="_blank" rel="noopener noreferrer">
                  Bug Reports
                </a>
                <span className={"ms-2"}>Report issues & features</span>
              </li>
            </ul>
          </div>

          <div className={styles.supportCard}>
            <div className={styles.cardIcon}>🚀</div>
            <h5>Professional Support</h5>
            <p>Need expert help? Our professional services ensure your phpMyFAQ runs perfectly.</p>
            <ul>
              <li>Custom development & consulting</li>
              <li>Installation & configuration</li>
              <li>Performance optimization</li>
              <li>Training & workshops</li>
              <li>Priority bug fixes</li>
            </ul>
            <a href="mailto:thorsten@phpmyfaq.de" className={styles.ctaButton}>
              Contact Us
            </a>
          </div>

          <div className={styles.supportCard}>
            <div className={styles.cardIcon}>📚</div>
            <h5>Documentation</h5>
            <p>Comprehensive guides and resources to help you master phpMyFAQ.</p>
            <ul>
              <li>
                <Link href="/documentation" rel="noopener noreferrer">
                  User Documentation
                </Link>
                <span className={"ms-2"}> Complete guides</span>
              </li>
              <li>
                <Link href="/docs/standards" rel="noopener noreferrer">
                  Developer Docs
                </Link>
                <span className={"ms-2"}> Coding standards</span>
              </li>
              <li>
                <a href="https://api-docs.phpmyfaq.de/" target="_blank" rel="noopener noreferrer">
                  API Reference
                </a>
                <span className={"ms-2"}> OpenAPI specs</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.additionalResources}>
          <h2>Additional Resources</h2>
          <div className={styles.resourceGrid}>
            <div className={styles.resourceItem}>
              <div className={styles.resourceIcon}>📖</div>
              <Link href="/changelog">Changelog</Link>
            </div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceIcon}>🔒</div>
              <Link href="/security">Security Advisories</Link>
            </div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceIcon}>🌍</div>
              <Link href="/translations">Translations</Link>
            </div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceIcon}>⚙️</div>
              <Link href="/requirements">Requirements</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
