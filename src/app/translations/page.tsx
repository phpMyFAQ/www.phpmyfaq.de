import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { generatePageMetadata } from '@/components/PageLayout';

export const metadata: Metadata = generatePageMetadata(
  'Translations',
  'Multi-language support and translation information for phpMyFAQ',
);

export default function TranslationsPage() {
  return (
    <PageLayout title="Translations">
      <div className="row">
        <div className="col-xs-12">
          <p>
            phpMyFAQ currently supports more than 40 languages, including RTL languages like Arabic, Farsi and Hebrew.
            All our translations are encoded in UTF-8 based PHP files, and we provide support for plural forms in
            supported phpMyFAQ languages. Additionally, you can use our PDF export functionality with all supported
            translations.
          </p>
          <p>
            You can submit new translations by creating a pull request on{' '}
            <a target="_blank" href="https://github.com/thorsten/phpMyFAQ">
              GitHub
            </a>
            .
          </p>

          <h2>Supported languages</h2>
          <ul className="list-unstyled list-translations">
            <li>Arabic</li>
            <li>Basque</li>
            <li>Bengali</li>
            <li>Bosnian</li>
            <li>Brazilian Portuguese</li>
            <li>
              Chinese <small>(Simplified)</small>
            </li>
            <li>
              Chinese <small>(Traditional)</small>
            </li>
            <li>Czech</li>
            <li>Danish</li>
            <li>Dutch</li>
            <li>English</li>
            <li>Finnish</li>
            <li>French</li>
            <li>German</li>
            <li>Greek</li>
            <li>Hebrew</li>
            <li>Hindi</li>
            <li>Hungarian</li>
            <li>Indonesian</li>
            <li>Italian</li>
            <li>Japanese</li>
            <li>Korean</li>
            <li>Latvian</li>
            <li>Lithuanian</li>
            <li>Malay</li>
            <li>Mongolian</li>
            <li>
              Norwegian <small>(Bokmål)</small>
            </li>
            <li>Persian (Farsi)</li>
            <li>Polish</li>
            <li>
              Portuguese <small>(Post-1990 Orthographic Agreement)</small>
            </li>
            <li>Romanian</li>
            <li>Russian</li>
            <li>Serbian</li>
            <li>Slovak</li>
            <li>Slovenian</li>
            <li>Spanish</li>
            <li>Swedish</li>
            <li>Thai</li>
            <li>Turkish</li>
            <li>Ukrainian</li>
            <li>Urdu</li>
            <li>Vietnamese</li>
            <li>Welsh</li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
}
