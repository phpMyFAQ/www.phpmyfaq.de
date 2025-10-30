import PageLayout from '@/components/PageLayout';
import { generatePageMetadata } from '@/components/PageLayout';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    'Coding standards',
    'Coding styles for PHP code, HTML, and SCSS/CSS. Please take care you follow these coding standards.',
  );
}

export default function StandardsPage() {
  return (
    <PageLayout title="Coding standards">
      <p className="intro">All files have to be UTF-8 encoded, never use any other encoding.</p>

      <div className="row">
        <div className="col-lg-12">
          <h2>PHP 8+</h2>
          <p>
            We're using the PSR coding standards for phpMyFAQ. You can find the definition of these coding standards
            here:
          </p>
          <ul>
            <li>
              <a rel="nofollow" target="_blank" href="https://www.php-fig.org/psr/psr-4/">
                PSR-4
              </a>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="https://www.php-fig.org/psr/psr-12/">
                PSR-12
              </a>
            </li>
          </ul>

          <h2>HTML5</h2>
          <ul>
            <li>We use the HTML5 doctype, which is easy to remember: &lt;!DOCTYPE html&gt;</li>
            <li>Two spaces for indentation, never tabs</li>
            <li>Double quotes only, never single quotes</li>
            <li>Always use proper indentation</li>
            <li>Use tags and elements appropriate for an HTML5 doctype (e.g., self-closing tags)</li>
            <li>Paragraphs of text should always be placed in a &lt;p&gt; tag. Never use multiple &lt;br/&gt; tags.</li>
            <li>
              Every form input that has text attached should use a &lt;label&gt; tag, especially radio or checkbox
              elements.
            </li>
            <li>Always put quotes around attributes for readability.</li>
          </ul>

          <h2>CSS / SCSS</h2>
          <ul>
            <li>Two spaces for indentation, never tabs</li>
            <li>Multiple-line approach (one property and value per line)</li>
            <li>
              Always a space after a property's colon (e.g., <em>display: block;</em> and not
              <em>display:block;</em>)
            </li>
            <li>End all lines with a semicolon</li>
            <li>For multiple, comma-separated selectors, place each selector on its own line</li>
            <li>
              Attribute selectors, like <em>input[type="text"]</em> should always wrap the attribute's value in double
              quotes, for consistency and safety.
            </li>
          </ul>

          <h2>TypeScript</h2>
          <p>
            We're using TypeScript for client-side code. Please follow the official TypeScript coding guidelines.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
