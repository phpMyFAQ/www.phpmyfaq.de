import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section className={styles.topFooter}>
        <div className={styles.container}>
          <h2 className="visually-hidden">Other interesting links</h2>
          <div className={styles.footerGrid}>
            <div>
              <h3>Getting started</h3>
              <ul>
                <li>
                  <Link href="/requirements">Requirements</Link>
                </li>
                <li>
                  <Link href="/download">Download</Link>
                </li>
                <li>
                  <Link href="/changelog">Changelog</Link>
                </li>
                <li>
                  <Link href="/advisories">Security Advisories</Link>
                </li>
                <li>
                  <Link href="/translations">Translations</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3>Resources</h3>
              <ul>
                <li>
                  <Link href="/news/">News archive</Link>
                </li>
                <li>
                  <Link href="/donations">Donations</Link>
                </li>
                <li>
                  <Link href="/references">Who uses phpMyFAQ?</Link>
                </li>
                <li>
                  <Link href="/25years">25 years phpMyFAQ (2026)</Link>
                </li>
                <li>
                  <Link href="/20years">20 years phpMyFAQ (2021)</Link>
                </li>
                <li>
                  <Link href="/15years">15 years phpMyFAQ (2016)</Link>
                </li>
                <li>
                  <Link href="/10years">10 years phpMyFAQ (2011)</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3>Misc</h3>
              <ul>
                <li>
                  <Link href="/thankyou">Thank you!</Link>
                </li>
                <li>
                  <Link href="/terms">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/imprint">Imprint</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy Notice</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.socialSection}>
            <h3>Get Connected</h3>
            <ul className={`${styles.socialIcons} social-icons`}>
              <li>
                <a
                  rel="nofollow"
                  target="_blank"
                  href="https://github.com/thorsten/phpMyFAQ"
                  aria-label="phpMyFAQ at Github"
                >
                  <i className="fab fa-github"></i>
                </a>
              </li>
              <li>
                <a
                  rel="nofollow"
                  target="_blank"
                  href="https://www.facebook.com/phpMyFAQ/"
                  aria-label="phpMyFAQ at Facebook"
                >
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  rel="nofollow"
                  target="_blank"
                  href="https://discord.gg/wszhTceuNM"
                  aria-label="phpMyFAQ Discord Community"
                >
                  <i className="fab fa-discord"></i>
                </a>
              </li>
              <li>
                <a rel="nofollow" href="mailto:thorsten@phpmyfaq.de" aria-label="Mail me!">
                  <i className="fas fa-envelope"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer className={`${styles.footer} footer`}>
        <div className={styles.container}>
          <small className={styles.copyright}>
            &copy; 2001-{currentYear} | Developed with <i className="fas fa-heart"></i> by Thorsten Rinne and the
            phpMyFAQ Team | All rights reserved.
          </small>
        </div>
      </footer>
    </>
  );
}
