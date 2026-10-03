import Link from 'next/link';
import styles from './Highlights.module.scss';

const highlights = [
  {
    icon: 'fas fa-search',
    title: 'Search that finds answers',
    description:
      'Full-text search across all languages, popular-search reports and optional Elasticsearch or OpenSearch backends.',
  },
  {
    icon: 'fas fa-globe',
    title: 'Multilingual by design',
    description: '40+ interface languages, per-FAQ translations, right-to-left layouts and machine translation.',
  },
  {
    icon: 'fas fa-user-shield',
    title: 'Permissions and single sign-on',
    description:
      'Users, groups and per-category rights. LDAP, Active Directory, Entra ID, OAuth 2.0, passkeys and two-factor authentication.',
  },
  {
    icon: 'fas fa-edit',
    title: 'Editing without friction',
    description: 'WYSIWYG editor, categories, attachments, glossary, comments, revisions and an editorial workflow.',
  },
  {
    icon: 'fas fa-plug',
    title: 'Built to integrate',
    description: 'REST API, an MCP server for AI clients, plugins, web push notifications and SBOMs for every release.',
  },
  {
    icon: 'fas fa-server',
    title: 'Runs on your stack',
    description:
      'PHP 8.3+, MySQL, MariaDB, PostgreSQL, SQLite or SQL Server. Deploy on a web server, Docker or Kubernetes.',
  },
];

export default function Highlights() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>Everything a knowledge base needs</h2>
        <div className={styles.grid}>
          {highlights.map((item) => (
            <article key={item.title} className={styles.card}>
              <div className={styles.icon}>
                <i className={item.icon} aria-hidden="true"></i>
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