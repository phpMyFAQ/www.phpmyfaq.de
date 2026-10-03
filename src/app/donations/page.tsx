import PageLayout, { generatePageMetadata } from '@/components/PageLayout';
import { Metadata } from 'next';
import blocks from '@/components/ContentBlocks.module.scss';

export const metadata: Metadata = generatePageMetadata(
  'Donations',
  'phpMyFAQ is an Open Source software project. Nobody is paying us for the work on phpMyFAQ so all development and support is done in our sparetime.',
);

export default function DonationsPage() {
  return (
    <PageLayout title="Donations">
      <p className={blocks.lead}>
        phpMyFAQ is open source. Nobody pays us for the work on it, so all development and support happen in our free
        time. Donations keep the lights on.
      </p>

      <h2 className={blocks.heading}>Where the money goes</h2>
      <p>
        Your donations cover the managed web hosting of <strong>www.phpmyfaq.de</strong>,{' '}
        <strong>api.phpmyfaq.de</strong> and <strong>download.phpmyfaq.de</strong>, a virtual server for{' '}
        <a href="https://demo.phpmyfaq.de" target="_blank" rel="noopener noreferrer">
          demo.phpmyfaq.de
        </a>
        , and the GitHub Copilot subscription we use for development. That adds up to roughly 50 € per month.
      </p>

      <h2 className={blocks.heading}>Ways to donate</h2>
      <div className={blocks.grid3}>
        <article className={blocks.card}>
          <div className={blocks.icon}>
            <i className="fab fa-github" aria-hidden="true"></i>
          </div>
          <h3>GitHub Sponsors</h3>
          <p>Monthly or one-time sponsorship through GitHub.</p>
          <a
            className={blocks.cta}
            href="https://github.com/sponsors/thorsten"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Sponsor Thorsten
          </a>
        </article>

        <article className={blocks.card}>
          <div className={blocks.icon}>
            <i className="fab fa-paypal" aria-hidden="true"></i>
          </div>
          <h3>PayPal</h3>
          <p>A one-time donation of any amount.</p>
          <a
            className={blocks.ctaSecondary}
            href="https://paypal.me/thorstensmue?country.x=DE&locale.x=de_DE"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Donate via PayPal
          </a>
        </article>

        <article className={blocks.card}>
          <div className={blocks.icon}>
            <i className="fas fa-gift" aria-hidden="true"></i>
          </div>
          <h3>Gifts</h3>
          <p>Prefer to send something tangible?</p>
          <ul className={blocks.list}>
            <li>
              <a href="https://www.amazon.de/hz/wishlist/ls/UQQJEX7BCHPZ" rel="nofollow noopener noreferrer">
                Thorsten&apos;s wishlist
              </a>
            </li>
            <li>
              <a href="https://www.amazon.de/hz/wishlist/ls/FGS7DWAJIRLD" rel="nofollow noopener noreferrer">
                Florian&apos;s wishlist
              </a>
            </li>
          </ul>
        </article>
      </div>

      <div className={blocks.note}>
        <p>Thank you! Every contribution, however small, helps keep phpMyFAQ free for everyone.</p>
      </div>
    </PageLayout>
  );
}