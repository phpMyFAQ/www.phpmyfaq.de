import PageLayout from '@/components/PageLayout';
import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/components/PageLayout';
import { sbomSinceVersion, contactEmail, advisoryReportUrl } from '@/data/security';
import { getAdvisoriesByYear } from '@/lib/securityAdvisory';
import styles from './sovereignty.module.scss';

export const metadata: Metadata = generatePageMetadata(
  'Digital Sovereignty',
  'Run your FAQ on your own infrastructure — open source, GDPR-friendly, with the transparency modern supply-chain due diligence demands',
);

export default function SovereigntyPage() {
  const advisoryYears = getAdvisoriesByYear();
  const advisoryCount = advisoryYears.reduce((sum, group) => sum + group.advisories.length, 0);
  const firstAdvisoryYear = advisoryYears[advisoryYears.length - 1]?.year;

  const dueDiligenceCards = [
    {
      icon: 'fas fa-cubes',
      title: 'Software Bill of Materials',
      body: (
        <>
          A CycloneDX SBOM ships as a release asset with every release since {sbomSinceVersion} — your dependency
          inventory, machine-readable, without asking.
        </>
      ),
    },
    {
      icon: 'fas fa-shield-alt',
      title: `${advisoryCount} public security advisories`,
      body: (
        <>
          Published since {firstAdvisoryYear} — two decades of transparent vulnerability handling, all in the{' '}
          <Link href="/advisories/">advisory archive</Link>.
        </>
      ),
    },
    {
      icon: 'fas fa-user-shield',
      title: 'Coordinated disclosure',
      body: (
        <>
          Report vulnerabilities privately via{' '}
          <a rel="nofollow" target="_blank" href={advisoryReportUrl}>
            GitHub
          </a>{' '}
          or <a href={`mailto:${contactEmail}`}>{contactEmail}</a> — with documented support windows and end-of-life
          dates on the <Link href="/security/">security page</Link>.
        </>
      ),
    },
    {
      icon: 'fas fa-balance-scale',
      title: 'Mozilla Public License 2.0',
      body: (
        <>
          Open code, auditable line by line on{' '}
          <a rel="nofollow" target="_blank" href="https://github.com/thorsten/phpMyFAQ">
            GitHub
          </a>
          . No black boxes in your supply chain.
        </>
      ),
    },
  ];

  return (
    <PageLayout title="Digital Sovereignty">
      <p className={styles.lead}>
        phpMyFAQ is open source software, developed in Germany since 2001, and runs entirely on your own infrastructure.
        No SaaS dependency, no data leaving your control — a European answer to proprietary knowledge-base clouds.
      </p>

      <h2 className={styles.heading}>Your data stays on your infrastructure</h2>
      <ul className={styles.checkList}>
        <li>
          <i className="fas fa-check"></i>
          <span>
            You choose the servers, the country, and the database — MySQL, MariaDB, PostgreSQL, SQL Server, SQLite and
            more
          </span>
        </li>
        <li>
          <i className="fas fa-check"></i>
          <span>No vendor cloud involved — no third-country data transfers to assess</span>
        </li>
        <li>
          <i className="fas fa-check"></i>
          <span>No external processor required to run your knowledge base</span>
        </li>
        <li>
          <i className="fas fa-check"></i>
          <span>
            Plugs into your identity infrastructure through LDAP, Active Directory and Microsoft Entra ID — see all{' '}
            <Link href="/features/">features</Link>
          </span>
        </li>
        <li>
          <i className="fas fa-check"></i>
          <span>Works without handing usage data to a third party</span>
        </li>
      </ul>

      <h2 className={styles.heading}>Built for GDPR-friendly operation</h2>
      <p className={styles.prose}>
        Software cannot be &ldquo;GDPR-compliant&rdquo; on its own — compliance is achieved in operation. What phpMyFAQ
        gives you is the position to achieve it: full control over where data lives, which services are involved (none,
        by default), and how long anything is retained.
      </p>

      <h2 className={styles.heading}>Security transparency for supply-chain due diligence</h2>
      <p className={styles.prose}>
        The EU Cyber Resilience Act is making software supply chains auditable. When your procurement or security team
        asks for the paper trail, phpMyFAQ already has it:
      </p>
      <div className={styles.grid}>
        {dueDiligenceCards.map((card) => (
          <article key={card.title} className={styles.card}>
            <div className={styles.icon}>
              <i className={card.icon}></i>
            </div>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
      <p className={styles.prose}>
        We describe what the project does, not a certification it holds: the CRA largely exempts non-commercial open
        source, and compliance always depends on how you deploy. These artifacts are what due diligence actually asks
        for — and closed-source vendors rarely show them.
      </p>

      <h2 className={styles.heading}>See it in practice</h2>
      <p className={styles.prose}>
        Universities, public-sector institutions and companies across Europe{' '}
        <Link href="/references/">run phpMyFAQ in production</Link>. Try the <Link href="/demo/">online demo</Link> or{' '}
        <Link href="/download/">download</Link> it and keep your knowledge base on your own terms.
      </p>
    </PageLayout>
  );
}