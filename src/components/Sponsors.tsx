import styles from './Sponsors.module.scss';

// Paid placements. Each entry drops off the page automatically once its
// `expires` date (YYYY-MM-DD, inclusive) has passed, so an expired deal never
// needs a manual removal. Entries without `expires` stay until removed.
interface Sponsor {
  before?: string;
  text: string;
  href: string;
  after?: string;
  expires?: string;
}

const sponsors: Sponsor[] = [
  {
    before: 'Find the best online casinos,',
    text: 'Kasinohai',
    href: 'https://www.kasinohai.com/parhaat-nettikasinot',
    after: 'in Finnish, on Kasinohai',
    expires: '2027-04-21',
  },
  {
    before: 'Find the best Zimpler casinos,',
    text: 'Zimpler kasinot',
    href: 'https://kasinokurko.com/',
    after: 'in Finnish, on KasinoKurko',
    expires: '2027-02-02',
  },
  {
    before: 'For the best in-play and cash out betting sites online, visit',
    text: 'cashoutbettingsites.co.uk',
    href: 'https://cashoutbettingsites.co.uk/',
    expires: '2026-12-11',
  },
  {
    before: 'Für ein optimales Spielerlebnis in Casinos',
    text: 'ohne OASIS Sperrdatei',
    href: 'https://neue-casinos24.com/casino-ohne-oasis',
    after: 'sorgt Neuecasinos24 durch die neuesten Casino Vergleiche.',
    expires: '2026-12-11',
  },
  {
    before: 'Schnelle und sichere Zahlungen auch in Online Spielotheken mit',
    text: 'Jeton Cash Casino',
    href: 'https://de.handycasinos24.com/zahlungsmethoden/jeton',
    after: 'Lösungen. Handycasinos24.com für weitere Infos.',
  },
  {
    text: 'nettikasinot',
    href: 'http://fi.parhaatuudetkasinot.com/nettikasinot',
  },
  {
    text: 'casino recensies',
    href: 'https://nieuwe-casinos.net/casino-reviews',
  },
];

// The site is statically exported, so "today" is the build date. Rebuilds
// happen with every release, which is often enough for sponsor expiry.
export function activeSponsors(today: string = new Date().toISOString().slice(0, 10)): Sponsor[] {
  return sponsors.filter((sponsor) => !sponsor.expires || sponsor.expires >= today);
}

export default function Sponsors() {
  const active = activeSponsors();
  if (active.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <strong className={styles.label}>Sponsored by</strong>
        {active.map((sponsor) => (
          <p key={sponsor.href}>
            {sponsor.before && `${sponsor.before} `}
            <a href={sponsor.href} target="_blank" rel="sponsored nofollow noopener">
              {sponsor.text}
            </a>
            {sponsor.after && ` ${sponsor.after}`}
          </p>
        ))}
      </div>
    </section>
  );
}