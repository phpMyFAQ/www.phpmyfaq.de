import styles from './WhatsNext.module.scss';

// Highlights from the 4.2 development changelog:
// https://github.com/thorsten/phpMyFAQ/blob/main/CHANGELOG.md
const highlights = [
  'Machine translation with DeepL, Google Cloud Translation, Azure Translator, Amazon Translate, and LibreTranslate',
  'Custom pages with WYSIWYG editing, SEO features, and multi-language support',
  'Theme manager with support for multiple, switchable themes',
  'Web push notifications and a simple chat for users',
  'Storage on Amazon S3 and mail delivery via SendGrid, AWS SES, and Mailgun',
  'Experimental Keycloak support and API key authentication via OAuth2',
];

export default function WhatsNext() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>What&apos;s next: phpMyFAQ 4.2</h2>
        <ul className={styles.list}>
          {highlights.map((highlight) => (
            <li key={highlight}>
              <i className="fas fa-arrow-right"></i>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        <p className={styles.footer}>
          phpMyFAQ 4.2 is under active development on PHP 8.4. Follow the full{' '}
          <a rel="nofollow" target="_blank" href="https://github.com/thorsten/phpMyFAQ/blob/main/CHANGELOG.md">
            changelog on GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
}