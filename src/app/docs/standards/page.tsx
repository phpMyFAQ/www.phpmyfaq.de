import PageLayout from '@/components/PageLayout'
import { generatePageMetadata } from '@/components/PageLayout'

export const metadata = generatePageMetadata(
  'Coding standards',
  'Coding styles for PHP code, HTML, and CSS. Please take care you follow these coding standards.'
)

export default function StandardsPage() {
  return (
    <PageLayout title="Coding standards">
      <div className="row">
        <div className="col-xs-12">
          <p>
            This document describes the coding standards used by the phpMyFAQ development team for PHP, HTML, CSS, SCSS and JavaScript. If you want to be compliant with our coding standards we recommend to use the PHP_CodeSniffer with our integrated phpMyFAQ Coding Standard.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 col-xs-12">
          <h2>PHP</h2>
          <p>For PHP code we&apos;re using:</p>
          <ul>
            <li>
              <a rel="nofollow" target="_blank" href="https://www.php-fig.org/psr/psr-4/">
                PSR-4: Autoloader
              </a>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="https://www.php-fig.org/psr/psr-12/">
                PSR-12: Extended Coding Style
              </a>
            </li>
          </ul>

          <h2>HTML</h2>
          <p>For HTML code we&apos;re using:</p>
          <ul>
            <li>
              HTML5 with valid syntax as much as possible based on the{' '}
              <a rel="nofollow" target="_blank" href="https://html.spec.whatwg.org/">
                WHATWG HTML Living Standard
              </a>
            </li>
          </ul>

          <h2>CSS/SCSS</h2>
          <p>For CSS and SCSS code we&apos;re using:</p>
          <ul>
            <li>
              <a rel="nofollow" target="_blank" href="https://github.com/necolas/idiomatic-css">
                Idiomatic CSS
              </a>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="http://sass-lang.com/guide">
                Sass Basics
              </a>
            </li>
          </ul>
        </div>

        <div className="col-lg-6 col-xs-12">
          <h2>JavaScript</h2>
          <p>For JavaScript code we&apos;re using:</p>
          <ul>
            <li>
              <a rel="nofollow" target="_blank" href="https://github.com/airbnb/javascript">
                AirBnB JavaScript Style Guide
              </a>
            </li>
          </ul>

          <h2>phpMyFAQ Coding Standard with PHP_CodeSniffer</h2>
          <p>
            If you want to verify you follow our coding standards you can use our integrated phpMyFAQ Coding Standard for the PHP_CodeSniffer.
          </p>
          <p>
            To run it you have to install it first via Composer:
          </p>
          <pre>$ composer install</pre>
          <p>After that you can run the PHP_CodeSniffer from the phpMyFAQ root directory:</p>
          <pre>$ ./vendor/bin/phpcs --standard=phpcs.xml phpmyfaq/</pre>
          <p>
            If you want to check only one file you can simply run:
          </p>
          <pre>$ ./vendor/bin/phpcs --standard=phpcs.xml phpmyfaq/src/phpMyFAQ/Setup.php</pre>
          <p>
            We integrated the PHPCS configuration in PHP Storm as well, so you can run it directly from the IDE.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
