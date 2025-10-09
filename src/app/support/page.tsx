import { generatePageMetadata } from '@/components/PageLayout'
import styles from './support.module.scss'

export const metadata = generatePageMetadata(
  'Support',
  'Get support for phpMyFAQ through our community, documentation, and professional services'
)

export default function SupportPage() {
  return (
    <div className={styles.supportContainer}>
      <div className="container">
        <div className={styles.header}>
          <h1>Get Support</h1>
          <p className={styles.lead}>
            Whether you need help getting started or require professional assistance,
            we&apos;re here to support you every step of the way.
          </p>
        </div>

        <div className={styles.supportGrid}>
          <div className={styles.supportCard}>
            <div className={styles.cardIcon}>💬</div>
            <h3>Community Support</h3>
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
            <h3>Professional Services</h3>
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
            <h3>Documentation</h3>
            <p>Comprehensive guides and resources to help you master phpMyFAQ.</p>
            <ul>
              <li>
                <a href="/documentation" rel="noopener noreferrer">
                  User Documentation
                </a>
                <span className={"ms-2"}> Complete guides</span>
              </li>
              <li>
                <a href="/docs/standards" rel="noopener noreferrer">
                  Developer Docs
                </a>
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
              <a href="/changelog">Changelog</a>
            </div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceIcon}>🔒</div>
              <a href="/security">Security Advisories</a>
            </div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceIcon}>🌍</div>
              <a href="/translations">Translations</a>
            </div>
            <div className={styles.resourceItem}>
              <div className={styles.resourceIcon}>⚙️</div>
              <a href="/requirements">Requirements</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
