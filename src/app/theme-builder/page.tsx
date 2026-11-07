import type { Metadata } from 'next';
import PageLayout, { generatePageMetadata } from '@/components/PageLayout';
import ThemeBuilder from '@/components/theme-builder/ThemeBuilder';
import blocks from '@/components/ContentBlocks.module.scss';

export const metadata: Metadata = generatePageMetadata(
  'Theme Builder',
  'Pick the colours of your phpMyFAQ 4.2 installation, check the contrast and export the CSS.',
);

export default function ThemeBuilderPage() {
  return (
    <PageLayout
      title="Theme Builder"
      description="Colours for your phpMyFAQ 4.1 or 4.2 installation, with a live preview and contrast check."
      searchable={false}
    >
      <p className={blocks.lead}>
        phpMyFAQ 4.2 paints its frontend from a small set of CSS variables, one set per colour mode. Change them here,
        watch the preview, and paste the result into your installation. Everything runs in your browser; the theme is
        stored in the page URL, so you can bookmark or share it. The defaults shown are those of phpMyFAQ 4.2, but the
        exported CSS uses the same variables and colour modes as phpMyFAQ 4.1, so it works with phpMyFAQ 4.1 as well.
      </p>
      <ThemeBuilder />
      <h2 className={blocks.heading}>How it works</h2>
      <ol>
        <li>Pick a colour mode (light, dark or high contrast) and adjust the colours.</li>
        <li>Check the contrast report. Light and dark should meet WCAG AA, high contrast AAA.</li>
        <li>
          Copy the CSS into Admin → Configuration → Layout → Custom CSS, or download <code>theme.css</code> for a copied
          template set as described in the{' '}
          <a href="https://docs.phpmyfaq.de/development.html" target="_blank" rel="noopener noreferrer">
            developer documentation
          </a>
          .
        </li>
      </ol>
    </PageLayout>
  );
}