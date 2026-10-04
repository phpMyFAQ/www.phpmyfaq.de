import Link from 'next/link';
import styles from './Highlights.module.scss';
import Icon from '@/components/Icon';
import type { IconName } from '@/components/icons.generated';
import blocks from './ContentBlocks.module.scss';
import { requireVersions } from '@/lib/data';
import { phpRequirementFor } from '@/data/security';

const highlights = [
  {
    icon: 'search',
    title: 'Search that finds answers',
    description:
      'Full-text search across all languages, popular-search reports and optional Elasticsearch or OpenSearch backends.',
  },
  {
    icon: 'globe',
    title: 'Multilingual by design',
    description: '40+ interface languages, per-FAQ translations, right-to-left layouts and machine translation.',
  },
  {
    icon: 'user-shield',
    title: 'Permissions and single sign-on',
    description:
      'Users, groups and per-category rights. LDAP, Active Directory, Entra ID, OAuth 2.0, passkeys and two-factor authentication.',
  },
  {
    icon: 'edit',
    title: 'Editing without friction',
    description: 'WYSIWYG editor, categories, attachments, glossary, comments, revisions and an editorial workflow.',
  },
  {
    icon: 'plug',
    title: 'Built to integrate',
    description: 'REST API, an MCP server for AI clients, plugins, web push notifications and SBOMs for every release.',
  },
  {
    icon: 'server',
    title: 'Runs on your stack',
    description: `PHP ${phpRequirementFor(requireVersions().stable)}, MySQL, MariaDB, PostgreSQL, SQLite or SQL Server. Deploy on a web server, Docker or Kubernetes.`,
  },
] satisfies { icon: IconName; title: string; description: string }[];

export default function Highlights() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={blocks.heading}>Everything a knowledge base needs</h2>
        <div className={blocks.grid3}>
          {highlights.map((item) => (
            <article key={item.title} className={blocks.card}>
              <div className={blocks.icon}>
                <Icon name={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <p className={styles.footer}>
          <Link href="/features">All features &rarr;</Link>
        </p>
      </div>
    </section>
  );
}