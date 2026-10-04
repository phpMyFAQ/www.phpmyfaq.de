import { getSiteConfig, VersionData } from './data';

// schema.org description of phpMyFAQ for the homepage and download page.
export function softwareApplication(versions: VersionData, options: { downloadUrl?: string } = {}) {
  const { siteUrl } = getSiteConfig();
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'phpMyFAQ',
    url: siteUrl,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'FAQ and knowledge base software',
    operatingSystem: 'Linux, Windows, macOS',
    softwareVersion: versions.stable,
    datePublished: versions.stable_released,
    downloadUrl: options.downloadUrl ?? `${siteUrl}/download/`,
    releaseNotes: `${siteUrl}/changelog/#${versions.stable}`,
    license: 'https://www.mozilla.org/MPL/2.0/',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    softwareRequirements: 'PHP 8.3 or later, a database (MySQL, MariaDB, PostgreSQL, SQLite or SQL Server)',
    sameAs: ['https://github.com/thorsten/phpMyFAQ'],
    author: { '@type': 'Organization', name: 'phpMyFAQ Team', url: siteUrl },
  };
}

// schema.org description of a security advisory page.
export function securityAdvisoryArticle(slug: string, title: string, description: string) {
  const { siteUrl } = getSiteConfig();
  const date = slug.match(/^advisory-(\d{4}-\d{2}-\d{2})/)?.[1];
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    url: `${siteUrl}/security/${slug}/`,
    ...(date ? { datePublished: date } : {}),
    about: { '@type': 'SoftwareApplication', name: 'phpMyFAQ', url: siteUrl },
    author: { '@type': 'Organization', name: 'phpMyFAQ Team', url: siteUrl },
    publisher: { '@type': 'Organization', name: 'phpMyFAQ Team', url: siteUrl },
  };
}