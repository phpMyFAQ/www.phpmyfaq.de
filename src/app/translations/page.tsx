import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { generatePageMetadata } from '@/components/PageLayout';
import TranslationsList from './TranslationsList';

export const metadata: Metadata = generatePageMetadata(
  'Translations',
  'Multi-language support and translation information for phpMyFAQ — 40+ languages including RTL support for Arabic, Farsi, Hebrew, and Urdu',
);

export default function TranslationsPage() {
  return (
    <PageLayout title="Translations">
      <TranslationsList />
    </PageLayout>
  );
}
