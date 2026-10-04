import Link from 'next/link';
import styles from './TrustStrip.module.scss';
import Icon from '@/components/Icon';

export default function TrustStrip() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <Link href="/references" className={styles.item}>
            <Icon name="building" />
            <span>
              <strong>In production since 2001</strong>
              <span>Universities, public sector and industry run phpMyFAQ</span>
            </span>
          </Link>
          <Link href="/sovereignty" className={styles.item}>
            <Icon name="server" />
            <span>
              <strong>Self-hosted &amp; open source</strong>
              <span>Your data on your servers — built for GDPR-friendly operation</span>
            </span>
          </Link>
          <Link href="/security" className={styles.item}>
            <Icon name="shield-alt" />
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