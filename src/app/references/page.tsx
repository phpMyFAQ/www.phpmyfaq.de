import PageLayout from '@/components/PageLayout'
import { generatePageMetadata } from '@/components/PageLayout'

export const metadata = generatePageMetadata(
  'Who uses phpMyFAQ?',
  'Organizations and websites using phpMyFAQ'
)

export default function ReferencesPage() {
  return (
    <PageLayout title="References">
      <div className="row">
        <div className="col-xs-12">
          <p>
            Is your FAQ missing here? Then <a href="mailto:info@phpmyfaq.de">tell us</a> about your phpMyFAQ
            installation.
          </p>
          <ul>
            <li>
              <a rel="nofollow" target="_blank" href="https://www.hardwareecke.de/faq/">HardwareEcke.de</a>{' '}
              <small>(since 2001)</small>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="https://www.fzrfahrer.de/technikfaq/">Yamaha FZR-Technik FAQ</a>{' '}
              <small>(since 2003)</small>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="http://www.dsl-abc.de/dsl-faq/">Die DSL FAQ von dsl-abc.de</a>{' '}
              <small>(since 2004)</small>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="http://www.comfortablesoftware.com/faq">ComfortableSOftware</a>{' '}
              <small>(since 2004)</small>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="http://www.knorr-bremse.com">Knorr-Bremse SfN GmbH (Intranet)</a>{' '}
              <small>(since 2004)</small>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="http://www.huschi.net">huschi.net</a>{' '}
              <small>(since 2005)</small>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="https://www.raiffeisendruckerei.de/">Raiffeisendruckerei GmbH</a>{' '}
              <small>(since 2005)</small>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="http://sos.sealsystems.de">SEALSystems Online Service (SOS)</a>{' '}
              <small>(since 2006)</small>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="http://www.hp.com/">HP Internal Team FAQ</a>{' '}
              <small>(since 2006)</small>
            </li>
            <li>
              <strong>HIW Kennisbank</strong> (Intranet){' '}
              <small>(since 2007)</small>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="http://www.ascent.de">ascent AG intern</a>{' '}
              <small>(since 2007)</small>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="http://www.netwarefaq.de">NetWareFAQ.de</a>{' '}
              <small>(since 2009)</small>
            </li>
            <li>
              <strong>Nedstat Customer Support Knowledgebase (Intranet)</strong>{' '}
              <small>(since 2010)</small>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="http://techfaq.smumn.edu">SMU TechFaq</a>{' '}
              <small>(since 2011)</small>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="http://www.emdec.com.br/faq">Emdec S/A</a>{' '}
              <small>(since 2012)</small>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="http://prestapresta.com">PrestaPresta</a>{' '}
              <small>(since 2013)</small>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="http://haun-media.de/tiltdesign-faq">Tiltdesign Foto FAQ News</a>{' '}
              <small>(since 2014)</small>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="http://faq.einszweidreidruck.at/">Eins Zwei Drei Druck FAQ</a>{' '}
              <small>(since 2015)</small>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="https://uwe-kernchen.de/phpmyfaq/">Netdesign Kernchen IT-FAQ</a>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="https://eperfaq.pekidi.com/">FIAT ePERFAQ</a>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="https://hilfe.zemo.de/">ZEMO Hilfe-FAQ</a>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="https://faq.tools.phil.uni-siegen.de/">FAQ Philosophische Fakultät Uni Siegen</a>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="https://faq.astendo.de/">astendo GmbH FAQ</a>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="https://www.serverprofis.de/faq/">Serverprofis FAQ</a>
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="https://faq.asadatec.de/">ASA Datec - FAQ</a>
            </li>
          </ul>
          <p>
            Haftungshinweis: Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
            für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich
            deren Betreiber verantwortlich.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
