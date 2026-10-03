import PageLayout, { generatePageMetadata } from '@/components/PageLayout';
import { Metadata } from 'next';
import blocks from '@/components/ContentBlocks.module.scss';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    'Code names',
    "phpMyFAQ uses code names for every major release, if you're curious about them, take a look at this page.",
  );
}

interface Codename {
  version: string;
  span?: string;
  name?: string;
  href?: string;
  about?: string;
}

interface Series {
  title: string;
  releases: Codename[];
}

const series: Series[] = [
  {
    title: 'phpMyFAQ 1.x series (2001-2007)',
    releases: [
      { version: '0.x', span: '2001, 11 releases' },
      { version: '1.0.x', span: '2001-2002, 3 releases' },
      { version: '1.1.x', span: '2002, 7 releases' },
      { version: '1.2.x', span: '2002-2003, 8 releases' },
      { version: '1.3.x', span: '2003-2004, 17 releases' },
      {
        version: '1.4.x',
        span: '2004-2005, 13 releases',
        name: 'Pan',
        href: 'https://en.wikipedia.org/wiki/Pan_%28moon%29',
        about: 'a moon of planet Saturn',
      },
      {
        version: '1.5.x',
        span: '2005-2006, 10 releases',
        name: 'Phoebe',
        href: 'https://en.wikipedia.org/wiki/Phoebe_%28moon%29',
        about: 'a moon of planet Saturn',
      },
      {
        version: '1.6.x',
        span: '2006-2007, 13 releases',
        name: 'Pluto',
        href: 'https://en.wikipedia.org/wiki/Pluto',
        about: 'the second largest dwarf planet',
      },
    ],
  },
  {
    title: 'phpMyFAQ 2.x series (2007-2019)',
    releases: [
      {
        version: '2.0.x',
        span: '2007-2009, 18 releases',
        name: 'Prometheus',
        href: 'https://en.wikipedia.org/wiki/Prometheus_%28moon%29',
        about: 'a moon of planet Saturn',
      },
      {
        version: '2.5.x',
        span: '2009-2010, 8 releases',
        name: 'Pandora',
        href: 'https://en.wikipedia.org/wiki/Pandora_%28moon%29',
        about: 'a moon of planet Saturn',
      },
      {
        version: '2.6.x',
        span: '2010-2011, 19 releases',
        name: 'Portia',
        href: 'https://en.wikipedia.org/wiki/Portia_%28moon%29',
        about: 'a moon of planet Uranus',
      },
      {
        version: '2.7.x',
        span: '2011-2013, 10 releases',
        name: 'Prospero',
        href: 'https://en.wikipedia.org/wiki/Prospero_%28moon%29',
        about: 'a moon of planet Uranus',
      },
      {
        version: '2.8.x',
        span: '2013-2016, 30 releases',
        name: 'Perdita',
        href: 'https://en.wikipedia.org/wiki/Perdita_%28moon%29',
        about: 'a moon of planet Uranus',
      },
      {
        version: '2.9.x',
        span: '2016-2019, 15 releases',
        name: 'Proteus',
        href: 'https://en.wikipedia.org/wiki/Proteus_%28moon%29',
        about: 'a moon of planet Neptune',
      },
    ],
  },
  {
    title: 'phpMyFAQ 3.x series (2020-2024)',
    releases: [
      {
        version: '3.0.x',
        span: '2020-2022, 13 releases',
        name: 'Phobos',
        href: 'https://en.wikipedia.org/wiki/Phobos_%28moon%29',
        about: 'a moon of planet Mars',
      },
      {
        version: '3.1.x',
        span: '2022-2023, 19 releases',
        name: 'Poseidon',
        href: 'https://en.wikipedia.org/wiki/Poseidon',
        about: 'the god of the sea, rivers, floods, droughts and earthquakes in Greek mythology',
      },
      {
        version: '3.2.x',
        span: '2023-2024, 11 releases',
        name: 'Pontus',
        href: 'https://en.wikipedia.org/wiki/Pontus_(mythology)',
        about: 'the god of the sea, father of the fish and other sea creatures in Greek mythology',
      },
    ],
  },
  {
    title: 'phpMyFAQ 4.x series (2024 - today)',
    releases: [
      {
        version: '4.0.x',
        span: '2024-2026, 20 releases',
        name: 'Pallas',
        href: 'https://en.wikipedia.org/wiki/Pallas_(Titan)',
        about: 'the titan of warcraft in Greek mythology',
      },
      {
        version: '4.1.x',
        span: '2026 - today',
        name: 'Porus',
        href: 'https://en.wikipedia.org/wiki/Porus_(mythology)',
        about: "from Plato's Symposium",
      },
      {
        version: '4.2.x',
        span: 'in development',
        name: 'Palaimon',
        href: 'https://en.wikipedia.org/wiki/Melicertes',
        about: 'a prince in Greek mythology',
      },
      {
        version: '4.3.x',
        name: 'Phaethon',
        href: 'https://en.wikipedia.org/wiki/Phaethon',
        about: 'the son of Helios who attempted to drive the sun chariot',
      },
      {
        version: '4.4.x',
        name: 'Perseus',
        href: 'https://en.wikipedia.org/wiki/Perseus',
        about: 'a hero in Greek mythology',
      },
      {
        version: '4.5.x',
        name: 'Priam',
        href: 'https://en.wikipedia.org/wiki/Priam',
        about: 'the last king of Troy',
      },
    ],
  },
];

export default function CodenamesPage() {
  return (
    <PageLayout title="Code names">
      <p className={blocks.lead}>
        Since phpMyFAQ 1.4 every major release line gets a code name during development. Here they are, each with the
        Wikipedia article that explains it.
      </p>

      <div className={blocks.grid2}>
        {series.map((group) => (
          <article key={group.title} className={blocks.card}>
            <h2>{group.title}</h2>
            <ul className={blocks.list}>
              {group.releases.map((release) => (
                <li key={release.version}>
                  <span>
                    <strong>phpMyFAQ {release.version}</strong>
                    {release.span && ` (${release.span})`}
                    <span className={blocks.meta}>
                      {release.name ? (
                        <>
                          Codename:{' '}
                          <a href={release.href} target="_blank" rel="nofollow noopener noreferrer">
                            {release.name}
                          </a>
                          , {release.about}
                        </>
                      ) : (
                        'No codename'
                      )}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </PageLayout>
  );
}