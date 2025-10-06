import PageLayout from '@/components/PageLayout'
import { generatePageMetadata } from '@/components/PageLayout'

export const metadata = generatePageMetadata(
  'Donations',
  'phpMyFAQ is an Open Source software project. Nobody is paying us for the work on phpMyFAQ so all development and support is done in our sparetime.'
)

export default function DonationsPage() {
  return (
    <PageLayout title="Donations">
      <div className="row">
        <div className="col-xs-12">

          <p>
            <strong>Why should you donate to the phpMyFAQ developers?</strong><br />
            phpMyFAQ is an Open Source software project.
            Nobody is paying us for the work on phpMyFAQ, so all development and support are done in our free time.
          </p>

          <p>
            <strong>Where will my money go?</strong><br />
            Your donations are used to cover the cost of maintaining this website and related resources, and
            services required to provide these resources.
            We have to pay the managed webhosting of <strong>www.phpmyfaq.de</strong>, <strong>api.phpmyfaq.de</strong>
            {' '}and <strong>download.phpmyfaq.de</strong> and a virtual server for{' '}
            <a target="_blank" href="https://demo.phpmyfaq.de">demo.phpmyfaq.de</a>.
            We also use GitHub Copilot for our development, and we have to pay for the usage of this service.
          </p>
          <p>
            The monthly costs are approximately 50€ per month.
          </p>

          <h2>Support the developers with gifts</h2>
          <ul>
            <li>
              <a rel="nofollow" href="https://www.amazon.de/hz/wishlist/ls/UQQJEX7BCHPZ">
                Thorsten&apos;s wishlist on amazon.de
              </a>
            </li>
            <li>
              <a rel="nofollow" href="https://www.amazon.de/hz/wishlist/ls/3AZCSL908ACN9">
                Jan&apos;s wishlist on amazon.de
              </a>
            </li>
            <li>
              <a rel="nofollow" href="https://www.amazon.de/hz/wishlist/ls/FGS7DWAJIRLD">
                Florian&apos;s wishlist on amazon.de
              </a>
            </li>
          </ul>

          <h2>Donate with GitHub Sponsors</h2>
          <ul>
            <li>
              <a rel="nofollow" target="_blank" href="https://github.com/sponsors/thorsten">
                Become a sponsor to Thorsten on GitHub
              </a>
            </li>
          </ul>

          <h2>Donate through PayPal</h2>
          <p>
            You can donate through PayPal by clicking on <a rel="nofollow" target="_blank" href="https://paypal.me/thorstensmue?country.x=DE&locale.x=de_DE">this link</a>.
          </p>
          <p style={{ fontSize: '48px', textAlign: 'center', marginTop: '66px' }}>THANK YOU!</p>
        </div>
      </div>
    </PageLayout>
  )
}
