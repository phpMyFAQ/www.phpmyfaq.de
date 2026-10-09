import Link from 'next/link';
import { formatReleaseDate, requireVersions } from '@/lib/data';
import styles from './WhatsNext.module.scss';
import Icon from '@/components/Icon';
import blocks from './ContentBlocks.module.scss';

// Curated from the 4.2 section of content/changelog/index.md. Refresh this
// list with each pre-release; the footer names the release it is based on.
const highlights = [
  'Machine translation with DeepL, Google Cloud Translation, Azure Translator, Amazon Translate and LibreTranslate',
  'Editorial workflow with per-language draft, review and published states, plus separate read, write and publish permissions',
  'Custom pages with WYSIWYG editing, SEO features and multi-language support',
  'Theme manager with multiple, switchable themes',
  'Official Docker images, a health endpoint and FAQ update notifications',
  'Web push notifications and a simple chat for users',
  'Storage on Amazon S3 and mail delivery via SendGrid, AWS SES and Mailgun',
  'Experimental Keycloak support and API key authentication via OAuth2',
];

export default function WhatsNext() {
  const versions = requireVersions();
  const changelogUrl = `/changelog/#${versions.development}`;

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={blocks.heading}>What&apos;s next: phpMyFAQ 4.2</h2>
        <ul className={styles.list}>
          {highlights.map((highlight) => (
            <li key={highlight}>
              <Icon name="arrow-right" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        <p className={styles.footer}>
          Highlights from the <Link href={changelogUrl}>{versions.development} changelog</Link> (
          {formatReleaseDate(versions.development_released)}). phpMyFAQ 4.2 requires PHP 8.4 or later.
        </p>

        {/* 2027-10-09 */}
        <p>
          phpMyFAQ works perfectly with the <a target={'_blank'} rel={'noopener noreferrer'} href={'https://www.reddit.com/r/webdevelopment/comments/1rmon2v/best_web_hosting_provider_youve_actually_used/'}>best web hosting</a>.
        </p>
      </div>
    </section>
  );
}