import PageLayout from '@/components/PageLayout'
import { generatePageMetadata } from '@/components/PageLayout'

export const metadata = generatePageMetadata(
  'Documentation archive',
  'Archive of old, unmaintained versions of phpMyFAQ documentation'
)

export default function DocsIndexPage() {
  return (
    <PageLayout title="Documentation archive">
      <div className="row">
        <div className="col-xs-12">
          <p>
            Looking for an old version of documentation? Please note that we cannot offer any support for the following, old and unmaintained versions. If you&apos;re looking for the current documentation, please go to our <a href="/documentation">documentation page</a>.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 col-xs-12">
          <h3>Current versions</h3>
          <ul>
            <li>
              <a target="_blank" href="https://phpmyfaq.readthedocs.io/en/4.0/">
                <strong>phpMyFAQ 4.0</strong>
              </a>
              <br />
              <small>minimum requirement: PHP 8.2+ and a database</small>
            </li>
          </ul>
        </div>

        <div className="col-lg-6 col-xs-12">
          <h3>Outdated versions</h3>
          <ul>
            <li>
              <a href="/docs/3.2">phpMyFAQ 3.2</a>
              <br />
              <small>minimum requirement: PHP 7.4+ and a database</small>
            </li>
            <li>
              <a href="/docs/3.1">phpMyFAQ 3.1</a>
              <br />
              <small>minimum requirement: PHP 7.3+ and a database</small>
            </li>
            <li>
              <a href="/docs/3.0">phpMyFAQ 3.0</a>
              <br />
              <small>minimum requirement: PHP 7.1+ and a database</small>
            </li>
            <li>
              <a href="/docs/2.9">phpMyFAQ 2.9</a>
              <br />
              <small>minimum requirement: PHP 5.6+ and a database</small>
            </li>
            <li>
              <a href="/docs/2.8">phpMyFAQ 2.8</a>
              <br />
              <small>minimum requirement: PHP 5.3.3+ and a database</small>
            </li>
            <li>
              <a href="/docs/2.7">phpMyFAQ 2.7</a>
              <br />
              <small>minimum requirement: PHP 5.2.3+ and a database</small>
            </li>
            <li>
              <a href="/docs/2.6">phpMyFAQ 2.6</a>
              <br />
              <small>minimum requirement: PHP 5.2.3+ and a database</small>
            </li>
            <li>
              <a href="/docs/2.5">phpMyFAQ 2.5</a>
              <br />
              <small>minimum requirement: PHP 5.2+ and a database</small>
            </li>
            <li>
              <a href="/docs/2.0">phpMyFAQ 2.0</a>
              <br />
              <small>minimum requirement: PHP 4.3.3+ and a database</small>
            </li>
          </ul>
        </div>
      </div>
    </PageLayout>
  )
}
