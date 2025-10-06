import PageLayout from '@/components/PageLayout'
import { generatePageMetadata } from '@/components/PageLayout'

export const metadata = generatePageMetadata(
  'Code names',
  "phpMyFAQ uses code names for every major release, if you're curious about them, take a look at this page."
)

export default function CodenamesPage() {
  return (
    <PageLayout title="Code names">
      <p className="intro">
        Since phpMyFAQ 1.4.x we&apos;re using code names during the development for the next major phpMyFAQ
        releases. Here&apos;s the list of them with a describing Wikipedia article.
      </p>
      <div className="row">
        <div className="col-lg-6 col-md-6">

          <h2>phpMyFAQ 1.x series (2001-2007)</h2>
          <ul>
            <li>
              <strong>phpMyFAQ 0.x</strong> (2001, 11 releases)<br />
              Codename: -
            </li>
            <li>
              <strong>phpMyFAQ 1.0.x</strong> (2001-2002, 3 releases)<br />
              Codename: -
            </li>
            <li>
              <strong>phpMyFAQ 1.1.x</strong> (2002, 7 releases)<br />
              Codename: -
            </li>
            <li>
              <strong>phpMyFAQ 1.2.x</strong> (2002-2003, 8 releases)<br />
              Codename: -
            </li>
            <li>
              <strong>phpMyFAQ 1.3.x</strong> (2003-2004, 17 releases)<br />
              Codename: -
            </li>
            <li>
              <strong>phpMyFAQ 1.4.x</strong> (2004-2005, 13 releases)<br />
              Codename: <a rel="nofollow" target="_blank" href="https://en.wikipedia.org/wiki/Pan_%28moon%29">Pan</a>, a
              moon of planet Saturn
            </li>
            <li>
              <strong>phpMyFAQ 1.5.x</strong> (2005-2006, 10 releases)<br />
              Codename: <a rel="nofollow" target="_blank" href="https://en.wikipedia.org/wiki/Phoebe_%28moon%29">Phoebe</a>,
              a moon of planet
              Saturn
            </li>
            <li>
              <strong>phpMyFAQ 1.6.x</strong> (2006-2007, 13 releases)<br />
              Codename: <a rel="nofollow" target="_blank" href="https://en.wikipedia.org/wiki/Pluto">Pluto</a>, the second
              largest dwarf planet
            </li>
          </ul>

        </div>
        <div className="col-lg-6 col-md-6">

          <h2>phpMyFAQ 2.x series (2007-2019)</h2>
          <ul>
            <li>
              <strong>phpMyFAQ 2.0.x</strong> (2007-2009, 18 releases)<br />
              Codename: <a rel="nofollow" target="_blank" href="https://en.wikipedia.org/wiki/Prometheus_%28moon%29">Prometheus</a>,
              a moon of planet Saturn
            </li>
            <li>
              <strong>phpMyFAQ 2.5.x</strong> (2009-2010, 8 releases)<br />
              Codename: <a rel="nofollow" target="_blank" href="https://en.wikipedia.org/wiki/Pandora_%28moon%29">Pandora</a>,
              a moon of planet Saturn
            </li>
            <li>
              <strong>phpMyFAQ 2.6.x</strong> (2010-2011, 19 releases)<br />
              Codename: <a rel="nofollow" target="_blank" href="https://en.wikipedia.org/wiki/Portia_%28moon%29">Portia</a>,
              a moon of planet Uranus
            </li>
            <li>
              <strong>phpMyFAQ 2.7.x</strong> (2011-2013, 10 releases)<br />
              Codename: <a rel="nofollow" target="_blank" href="https://en.wikipedia.org/wiki/Prospero_%28moon%29">Prospero</a>,
              a moon of planet Uranus
            </li>
            <li>
              <strong>phpMyFAQ 2.8.x</strong> (2013-2016, 30 releases)<br />
              Codename: <a rel="nofollow" target="_blank" href="https://en.wikipedia.org/wiki/Perdita_%28moon%29">Perdita</a>,
              a moon of planet Uranus
            </li>
            <li>
              <strong>phpMyFAQ 2.9.x</strong> (2016-2019, 15 releases)<br />
              Codename: <a rel="nofollow" target="_blank" href="https://en.wikipedia.org/wiki/Proteus%28moon%29">Proteus</a>,
              a moon of planet Neptune
            </li>
          </ul>

        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6">

          <h2>phpMyFAQ 3.x series (2020-2024)</h2>
          <ul>
            <li>
              <strong>phpMyFAQ 3.0.x</strong> (2020-2022, 13 releases)<br />
              Codename: <a rel="nofollow" target="_blank" href="https://en.wikipedia.org/wiki/Phobos_%28moon%29">Phobos</a>,
              a moon of planet Mars
            </li>
            <li>
              <strong>phpMyFAQ 3.1.x</strong> (2022–2023, 19 releases)<br />
              Codename: <a rel="nofollow" target="_blank" href="https://en.wikipedia.org/wiki/Poseidon">Poseidon</a>, the
              of the sea, rivers, floods, droughts, and earthquakes in Greek mythology
            </li>
            <li>
              <strong>phpMyFAQ 3.2.x</strong> (2023-2024, 11 releases)<br />
              Codename: <a rel="nofollow" target="_blank" href="https://en.wikipedia.org/wiki/Pontus_(mythology)">Pontus</a>,
              the god of the sea, father of the fish and other sea creatures in Greek mythology.
            </li>
          </ul>

        </div>
        <div className="col-lg-6 col-md-6">

          <h2>phpMyFAQ 4.x series (2024 - today)</h2>
          <ul>
            <li>
              <strong>phpMyFAQ 4.0.x</strong> (2024-today, 14 release so far)<br />
              Codename: <a rel="nofollow" target="_blank" href="https://en.wikipedia.org/wiki/Pallas_(Titan)">Pallas</a>,
              the titan of warcraft in Greek mythology.
            </li>
            <li>
              <strong>phpMyFAQ 4.1.x</strong> (2025?)<br />
              Codename: <a rel="nofollow" target="_blank" href="https://en.wikipedia.org/wiki/Porus_(mythology)">Porus</a>,
              from Plato&apos;s Symposium.
            </li>
            <li>
              <strong>phpMyFAQ 4.2.x</strong><br />
              Codename: <a rel="nofollow" target="_blank" href="https://en.wikipedia.org/wiki/Melicertes">Palaimon</a>,
              a prince in Greek mythology.
            </li>
          </ul>

        </div>

      </div>
    </PageLayout>
  )
}
