import Link from 'next/link';
import styles from './TrustStrip.module.scss';

export default function TrustStrip() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <Link href="/references" className={styles.item}>
            <i className="fas fa-building"></i>
            <span>
              <strong>In production since 2001</strong>
              <span>Universities, public sector and industry run phpMyFAQ</span>
            </span>
          </Link>
          <Link href="/sovereignty" className={styles.item}>
            <i className="fas fa-server"></i>
            <span>
              <strong>Self-hosted &amp; open source</strong>
              <span>Your data on your servers — built for GDPR-friendly operation</span>
            </span>
          </Link>
          <Link href="/security" className={styles.item}>
            <i className="fas fa-shield-alt"></i>
            <span>
              <strong>Security you can audit</strong>
              <span>SBOM with every release, coordinated disclosure, documented support windows</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}