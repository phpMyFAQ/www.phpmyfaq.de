import Link from 'next/link';
import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { generatePageMetadata } from '@/components/PageLayout';
import ScreenshotGallery, { Screenshot } from '@/components/ScreenshotGallery';
import styles from './features.module.scss';
import Icon from '@/components/Icon';
import type { IconName } from '@/components/icons.generated';
import blocks from '@/components/ContentBlocks.module.scss';
import { requireVersions } from '@/lib/data';
import { supportedPhpVersionsFor } from '@/data/security';

const screenshots: Screenshot[] = [
  {
    src: '/images/screenshots/frontend-categories.webp',
    width: 1800,
    height: 1029,
    alt: 'phpMyFAQ public category overview',
    caption: 'The public FAQ: a clear category overview your visitors can browse and search.',
  },
  {
    src: '/images/screenshots/frontend-glossary.webp',
    width: 1800,
    height: 1029,
    alt: 'phpMyFAQ public glossary',
    caption: 'A built-in glossary explains recurring terms right where readers need them.',
  },
  {
    src: '/images/screenshots/login.webp',
    width: 1800,
    height: 1278,
    alt: 'phpMyFAQ sign-in page with Microsoft and passkey login',
    caption: 'Modern sign-in with local accounts, Microsoft Entra ID and passkeys.',
  },
  {
    src: '/images/screenshots/admin-dashboard.webp',
    width: 1800,
    height: 1029,
    alt: 'phpMyFAQ admin dashboard',
    caption: 'The admin dashboard: visits, popular FAQs, content health and backup status at a glance.',
  },
  {
    src: '/images/screenshots/admin-editor.webp',
    width: 1800,
    height: 1029,
    alt: 'phpMyFAQ FAQ editor with WYSIWYG editing',
    caption: 'Creating a FAQ with WYSIWYG editing, SEO and permission tabs — including AI-assisted translation.',
  },
  {
    src: '/images/screenshots/admin-pages.webp',
    width: 1800,
    height: 1029,
    alt: 'phpMyFAQ custom pages management',
    caption: 'Custom pages with multi-language support, new in phpMyFAQ 4.2.',
  },
  {
    src: '/images/screenshots/admin-configuration.webp',
    width: 1800,
    height: 1029,
    alt: 'phpMyFAQ configuration backend',
    caption: 'The searchable configuration: security, LDAP, Keycloak, OAuth 2.0, storage backends and more.',
  },
  {
    src: '/images/screenshots/admin-users.webp',
    width: 1800,
    height: 1029,
    alt: 'phpMyFAQ user management',
    caption: 'User management with protected accounts, super-admins and two-factor authentication.',
  },
  {
    src: '/images/screenshots/admin-groups.webp',
    width: 1800,
    height: 1029,
    alt: 'phpMyFAQ group management',
    caption: 'Group management with per-group rights and category restrictions.',
  },
  {
    src: '/images/screenshots/admin-statistics.webp',
    width: 1800,
    height: 1029,
    alt: 'phpMyFAQ session statistics',
    caption: 'Session statistics with visitor trends and CSV export.',
  },
  {
    src: '/images/screenshots/admin-export.webp',
    width: 1800,
    height: 1029,
    alt: 'phpMyFAQ export options',
    caption: 'Export your FAQ content as JSON or PDF, per category or in full.',
  },
  {
    src: '/images/screenshots/admin-update.webp',
    width: 1800,
    height: 1029,
    alt: 'phpMyFAQ built-in update center',
    caption: 'The built-in update center with system health check and release channels.',
  },
];

export const metadata: Metadata = generatePageMetadata(
  'Features',
  'phpMyFAQ is a mobile-friendly, multilingual, scalable, completely database-driven FAQ software and offers features from single FAQ sites up to enterprise ready integrations',
);

const advancedFeatures = [
  {
    icon: 'edit',
    title: 'FAQ Content Management System',
    description:
      'Administrate users, groups, news, categories, FAQ records, attachments, comments, glossary items, and stop words in the password-protected administration backend.',
  },
  {
    icon: 'users',
    title: 'User and group-based permissions',
    description:
      'Assign permissions to users and groups, create users and user groups with permissions and category and even record restrictions for viewing and creating/editing content. You can secure the whole FAQ frontend.',
  },
  {
    icon: 'search',
    title: 'Powerful Search',
    description:
      'Users can easily find questions and answers with search across all languages or one category. You also get a list of the most popular searches and a graphical report. Elasticsearch and OpenSearch greatly improve the search experience.',
  },
  {
    icon: 'sign-in-alt',
    title: 'LDAP and HTTP authentication with SSO support',
    description:
      "Add your company's OpenLDAP or Microsoft Active Directory user management to phpMyFAQ for authentication, or secure the whole FAQ via HTTP authentication. Various Single Sign-On services like Shibboleth or NTLM are supported.",
  },
  {
    icon: 'cloud',
    title: 'Active Directory and EntraID Support',
    description:
      'phpMyFAQ supports LDAP Data Mapping (e.g. against Microsoft Active Directory and Microsoft EntraID), including multi-domain authentication against an ADS Global Catalog. Multiple AD servers can be configured.',
  },
  {
    icon: 'retweet',
    title: 'Community support',
    description:
      'All users can add questions for others to answer, answer open questions, or add translations for existing FAQ records. User-generated entries are enabled by administrators.',
  },
  {
    icon: 'chart-bar',
    title: 'Statistics',
    description:
      'Analyze user paths through your FAQ via built-in tracking, analyze quality with voting statistics and view counts on each FAQ. Download an extended reporting sheet as CSV.',
  },
  {
    icon: 'code-branch',
    title: 'Revision system',
    description:
      'Store old entries in wiki-like revisions, so you can switch back to previous versions of an FAQ entry.',
  },
  {
    icon: 'download',
    title: 'Backup and Restore',
    description: 'Backup and restore all database content with one click, including verification of the backup.',
  },
  {
    icon: 'comment',
    title: 'User comments',
    description: 'Get more feedback from users and visitors by allowing comments on your questions and answers.',
  },
  {
    icon: 'lightbulb',
    title: 'Smart answering',
    description:
      'When a user submits a new question, phpMyFAQ automatically tries to answer it via full-text search across existing FAQs.',
  },
  {
    icon: 'brand-google',
    title: 'Search engine optimization',
    description:
      'phpMyFAQ supports rewrite rules for Apache and nginx, lists FAQ articles in alphabetical order, generates XML sitemaps for search robots including GoogleBot, and supports rich snippets for Google.',
  },
  {
    icon: 'file-pdf',
    title: 'Export and Import your FAQs',
    description: 'Export as PDF (including a Table of Contents) and JSON files. Import existing FAQs in CSV format.',
  },
  {
    icon: 'shield-alt',
    title: 'Advanced spam protection',
    description: 'phpMyFAQ uses graphical captcha, bad word lists, and IPv4/IPv6 banlists to prevent spam.',
  },
  {
    icon: 'robot',
    title: 'MCP server',
    description:
      'phpMyFAQ is AI-ready with an integrated MCP server, so you can use phpMyFAQ together with AI clients.',
  },
  {
    icon: 'puzzle-piece',
    title: 'Plugin management',
    description: 'phpMyFAQ supports a plugin system to extend its functionality. Install and remove plugins easily.',
  },
] satisfies { icon: IconName; title: string; description: string }[];

// "8.3, 8.4, 8.5, and 8.6": from the requirement of the stable release up to
// the newest PHP version phpMyFAQ is tested against.
const supportedPhpList = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(
  supportedPhpVersionsFor(requireVersions().stable),
);

export default function FeaturesPage() {
  return (
    <PageLayout title="phpMyFAQ Features">
      <p className={blocks.lead}>
        phpMyFAQ is a mobile-friendly, multilingual, AI-ready, scalable, completely database-driven FAQ software and
        offers the following features &mdash; from single FAQ sites up to enterprise ready integrations:
      </p>

      <h2 className={blocks.heading}>Core Features</h2>
      <ul className={styles.coreList}>
        <li>
          <Icon name="check" />
          <span>Supports PHP {supportedPhpList}</span>
        </li>
        <li>
          <Icon name="check" />
          <span>
            Supports MySQL, MariaDB, PostgreSQL, MS SQL Server, SQLite3, Azure SQL, Elasticsearch, OpenSearch, and Redis
            databases
          </span>
        </li>
        <li>
          <Icon name="check" />
          <span>Unlimited FAQs, categories, users, and groups</span>
        </li>
        <li>
          <Icon name="check" />
          <span>
            Mobile first, touch-friendly, and accessible HTML5/CSS3 layout based on{' '}
            <a href="https://getbootstrap.com/" target="_blank" rel="nofollow">
              Bootstrap
            </a>
          </span>
        </li>
        <li>
          <Icon name="check" />
          <span>Integrated WYSIWYG editor</span>
        </li>
        <li>
          <Icon name="check" />
          <span>
            <Link href="/translations">40+ languages</Link> incl. RTL layouts for Arabic, Farsi, Urdu, and Hebrew
          </span>
        </li>
        <li>
          <Icon name="check" />
          <span>Simple installation, configuration, and update process with a web-based installer and updater</span>
        </li>
        <li>
          <Icon name="check" />
          <span>AI ready with an integrated MCP server</span>
        </li>
        <li>
          <Icon name="check" />
          <span>Plugin system to extend phpMyFAQ&apos;s functionality</span>
        </li>
        <li>
          <Icon name="check" />
          <span>Supports simple cloud hosting with Docker and Kubernetes</span>
        </li>
        <li>
          <Icon name="check" />
          <span>Compatible with all modern browsers</span>
        </li>
      </ul>

      <h2 className={blocks.heading}>See it in action</h2>
      <ScreenshotGallery screenshots={screenshots} />
      <p>
        Screenshots show the upcoming phpMyFAQ 4.2 — want to click around yourself? Try the{' '}
        <Link href="/demo">demo installation</Link>.
      </p>

      <h2 className={blocks.heading}>Advanced Features</h2>
      <div className={blocks.grid3}>
        {advancedFeatures.map((feature) => (
          <article key={feature.title} className={blocks.card}>
            <div className={blocks.icon}>
              <Icon name={feature.icon} />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </PageLayout>
  );
}