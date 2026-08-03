import PageLayout from '@/components/PageLayout';
import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/components/PageLayout';
import { sbomSinceVersion, contactEmail, advisoryReportUrl } from '@/data/security';
import { getAdvisoriesByYear } from '@/lib/securityAdvisory';
import styles from '../sovereignty/sovereignty.module.scss';

export const metadata: Metadata = {
  ...generatePageMetadata(
    'Digitale Souveränität',
    'FAQ-Software auf eigener Infrastruktur betreiben — Open Source, DSGVO-freundlich, mit der Transparenz, die moderne Lieferketten-Prüfungen verlangen',
  ),
  alternates: { languages: { en: '/sovereignty/', de: '/souveraenitaet/' } },
};

export default function SouveraenitaetPage() {
  const advisoryYears = getAdvisoriesByYear();
  const advisoryCount = advisoryYears.reduce((sum, group) => sum + group.advisories.length, 0);
  const firstAdvisoryYear = advisoryYears[advisoryYears.length - 1]?.year;

  const dueDiligenceCards = [
    {
      icon: 'fas fa-cubes',
      title: 'Software Bill of Materials',
      body: (
        <>
          Eine CycloneDX-SBOM liegt seit Version {sbomSinceVersion} jedem Release als Asset bei — Ihr
          Abhängigkeitsinventar, maschinenlesbar, ohne Nachfragen.
        </>
      ),
    },
    {
      icon: 'fas fa-shield-alt',
      title: `${advisoryCount} öffentliche Security Advisories`,
      body: (
        <>
          Veröffentlicht seit {firstAdvisoryYear} — zwei Jahrzehnte transparenter Umgang mit Schwachstellen, vollständig
          im <Link href="/advisories/">Advisory-Archiv</Link>.
        </>
      ),
    },
    {
      icon: 'fas fa-user-shield',
      title: 'Coordinated Disclosure',
      body: (
        <>
          Schwachstellen vertraulich melden über{' '}
          <a rel="nofollow" target="_blank" href={advisoryReportUrl}>
            GitHub
          </a>{' '}
          oder <a href={`mailto:${contactEmail}`}>{contactEmail}</a> — mit dokumentierten Support-Zeiträumen und
          End-of-Life-Terminen auf der <Link href="/security/">Security-Seite</Link>.
        </>
      ),
    },
    {
      icon: 'fas fa-balance-scale',
      title: 'Mozilla Public License 2.0',
      body: (
        <>
          Offener Code, Zeile für Zeile prüfbar auf{' '}
          <a rel="nofollow" target="_blank" href="https://github.com/thorsten/phpMyFAQ">
            GitHub
          </a>
          . Keine Blackbox in Ihrer Lieferkette.
        </>
      ),
    },
  ];

  return (
    <PageLayout title="Digitale Souveränität">
      <p className={styles.prose}>
        <em>
          <Link href="/sovereignty/">Read this page in English</Link>
        </em>
      </p>
      <p className={styles.lead}>
        phpMyFAQ ist Open-Source-Software, wird seit 2001 in Deutschland entwickelt und läuft vollständig auf Ihrer
        eigenen Infrastruktur. Keine SaaS-Abhängigkeit, keine Daten außerhalb Ihrer Kontrolle — eine europäische Antwort
        auf proprietäre Wissensdatenbank-Clouds.
      </p>

      <h2 className={styles.heading}>Ihre Daten bleiben auf Ihrer Infrastruktur</h2>
      <ul className={styles.checkList}>
        <li>
          <i className="fas fa-check"></i>
          <span>
            Sie wählen die Server, das Land und die Datenbank — MySQL, MariaDB, PostgreSQL, SQL Server, SQLite und mehr
          </span>
        </li>
        <li>
          <i className="fas fa-check"></i>
          <span>Keine Hersteller-Cloud — keine Drittlandübermittlungen, die Sie bewerten müssten</span>
        </li>
        <li>
          <i className="fas fa-check"></i>
          <span>Kein externer Auftragsverarbeiter für den Betrieb Ihrer Wissensdatenbank erforderlich</span>
        </li>
        <li>
          <i className="fas fa-check"></i>
          <span>
            Anbindung an Ihre bestehende Identitätsinfrastruktur über LDAP, Active Directory und Microsoft Entra ID —
            siehe alle <Link href="/features/">Features</Link>
          </span>
        </li>
        <li>
          <i className="fas fa-check"></i>
          <span>Funktioniert, ohne Nutzungsdaten an Dritte weiterzugeben</span>
        </li>
      </ul>

      <h2 className={styles.heading}>Gebaut für DSGVO-konformen Betrieb</h2>
      <p className={styles.prose}>
        Software kann für sich genommen nicht &bdquo;DSGVO-konform&ldquo; sein — Konformität entsteht im Betrieb.
        phpMyFAQ verschafft Ihnen die Ausgangslage dafür: volle Kontrolle darüber, wo Daten liegen, welche Dienste
        beteiligt sind (standardmäßig keine) und wie lange etwas aufbewahrt wird.
      </p>

      <h2 className={styles.heading}>Sicherheitstransparenz für die Lieferketten-Prüfung</h2>
      <p className={styles.prose}>
        Der EU Cyber Resilience Act macht Software-Lieferketten prüfbar. Wenn Ihr Einkauf oder Ihr Security-Team nach
        den Nachweisen fragt, hat phpMyFAQ sie bereits:
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
        Wir beschreiben, was das Projekt tut — nicht ein Zertifikat, das es hält: Der CRA nimmt nicht-kommerzielle
        Open-Source-Software weitgehend aus, und Konformität hängt immer davon ab, wie Sie die Software betreiben. Diese
        Artefakte sind, was eine Due-Diligence-Prüfung tatsächlich verlangt — und was Closed-Source-Anbieter selten
        vorweisen.
      </p>

      <h2 className={styles.heading}>In der Praxis</h2>
      <p className={styles.prose}>
        Universitäten, öffentliche Einrichtungen und Unternehmen in ganz Europa{' '}
        <Link href="/references/">betreiben phpMyFAQ produktiv</Link>. Testen Sie die{' '}
        <Link href="/demo/">Online-Demo</Link> oder <Link href="/download/">laden Sie phpMyFAQ herunter</Link> — und
        behalten Sie Ihre Wissensdatenbank in der eigenen Hand.
      </p>
    </PageLayout>
  );
}