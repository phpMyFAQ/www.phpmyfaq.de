import PageLayout from '@/components/PageLayout'
import { generatePageMetadata } from '@/components/PageLayout'
import Link from 'next/link'
import { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata(
  'Documentation',
  'Documentation for phpMyFAQ administrator, end-users and developers.'
)

export default function DocumentationPage() {
  return (
    <PageLayout title="Documentation">
      <div className="row">
        <div className="col-xs-12">
          <p className="intro">
            It&apos;s important for phpMyFAQ to provide documentation to its users, but documentation means different
            things to different people. You can find links to our end-user guide providing everything from the
            installation of phpMyFAQ and how to use it. For developers, we provide a bunch of resources about how to
            contribute to phpMyFAQ the right way.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-xs-12">
          <h2>Getting Started</h2>
          <ul className="list-unstyled">
            <li>
              <h3>
                <i className="fa fa-caret-right"></i>{' '}
                <Link target="_blank" href="/docs/4.1">Documentation for phpMyFAQ 4.1</Link>
              </h3>
              This guide contains detailed documentation for those using phpMyFAQ 4.1, whether they be
              administrators or end-users.
            </li>
            <li>
              <h3>
                <i className="fa fa-caret-right"></i>{' '}
                <Link target="_blank" href="/docs/4.0">Documentation for phpMyFAQ 4.0</Link>
              </h3>
              This guide contains detailed documentation for those using phpMyFAQ 4.0, whether they be
              administrators or end-users.
            </li>
            <li>
              <h3>
                <i className="fa fa-caret-right"></i>{' '}
                <Link href="/requirements">Requirements</Link>
              </h3>
              All requirements like e.g. the minimum PHP version to install the latest version of phpMyFAQ
            </li>
            <li>
              <h3>
                <i className="fa fa-caret-right"></i>{' '}
                <Link href="/changelog">Changelog</Link>
              </h3>
              The list of user-visible changes of phpMyFAQ releases since 2001.
            </li>
            <li>
              <h3>
                <i className="fa fa-caret-right"></i>{' '}
                <Link href="/translations">Translations</Link>
              </h3>
              The list of supported languages in phpMyFAQ and a guide how to fix existing or add new
              translations.
            </li>
          </ul>
        </div>
        <div className="col-lg-6 col-xs-12">
          <h2>Developer Resources</h2>
          <ul className="list-unstyled">
            <li>
              <h3>
                <i className="fa fa-caret-right"></i>{' '}
                <Link href="/docs/standards">Coding standards</Link>
              </h3>
              Coding styles for PHP code, HTML, and LESS/CSS. Please take care you follow these coding
              standards.
            </li>
            <li>
              <h3>
                <i className="fa fa-caret-right"></i>{' '}
                <a target="_blank" href="https://phpmyfaq.readthedocs.io/en/main/development/">How to contribute</a>
              </h3>
              If you want to contribute code or fix issues in phpMyFAQ you can find everything on this page.
            </li>
            <li>
              <h3>
                <i className="fa fa-caret-right"></i>{' '}
                <a rel="nofollow" target="_blank" href="https://github.com/thorsten/phpMyFAQ">
                  Source code
                </a>
              </h3>
              Quick link to our repository at <a rel="nofollow" target="_blank" href="https://github.com">
              Github</a>.
            </li>
            <li>
              <h3>
                <i className="fa fa-caret-right"></i>{' '}
                <a target="_blank" href="https://api-docs.phpmyfaq.de/">OpenAPI specification</a>
              </h3>
              phpMyFAQ 4.0 and later versions provide an OpenAPI specification for the REST API.
            </li>
            <li>
              <h3>
                <i className="fa fa-caret-right"></i>{' '}
                <Link href="/docs/codenames">Codenames</Link>
              </h3>
              phpMyFAQ uses codenames for every major release, if you&apos;re curious about them, take a look
              at this page.
            </li>
          </ul>
        </div>
      </div>
      <h2>Outdated documentations</h2>
      <p className="outro">
        Looking for an old version of documentation?
        We have an overview of <Link href="/docs/">old, unmaintained versions</Link> online.
      </p>
    </PageLayout>
  )
}
