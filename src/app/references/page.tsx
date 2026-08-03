import PageLayout from '@/components/PageLayout';
import { generatePageMetadata } from '@/components/PageLayout';

export const metadata = generatePageMetadata('Who uses phpMyFAQ?', 'Organizations and websites using phpMyFAQ');

export default function ReferencesPage() {
  return (
    <PageLayout title="References">
      <div className="row">
        <div className="col-xs-12">
          <p>
            A selection of organizations running phpMyFAQ in production. Is your FAQ missing here? Then{' '}
            <a href="mailto:info@phpmyfaq.de">tell us</a> about your phpMyFAQ installation.
          </p>

          <h3>Higher Education &amp; Organizations</h3>
          <ul>
            <li>
              <a rel="nofollow" target="_blank" href="https://faq.tools.phil.uni-siegen.de/">
                University of Siegen, Faculty of Arts and Humanities
              </a>{' '}
              — public FAQ of the Philosophische Fakultät.
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="https://howto.fei.org/">
                Fédération Équestre Internationale (FEI)
              </a>{' '}
              — &ldquo;FEI How To&rdquo; knowledge base of the international federation for equestrian sports.
            </li>
          </ul>

          <h3>Public Sector &amp; Research</h3>
          <ul>
            <li>
              <a rel="nofollow" target="_blank" href="https://faq.rpd.cnr.it/">
                Consiglio Nazionale delle Ricerche (CNR)
              </a>{' '}
              — data protection FAQ of the National Research Council of Italy.
            </li>
          </ul>

          <h3>Industry &amp; Technology</h3>
          <ul>
            <li>
              <a rel="nofollow" target="_blank" href="https://meeting-infohub.cisco.com/faq/">
                Cisco
              </a>{' '}
              — FAQ of the Cisco Meeting InfoHub.
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="https://hilfe.zemo.de/">
                ZEMO
              </a>{' '}
              — customer help center of the German manufacturer of mobile health card (eGK) readers.
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="https://faq.telecoop.fr/">
                TeleCoop
              </a>{' '}
              — customer FAQ of the French cooperative mobile network operator.
            </li>
          </ul>

          <h3>Software Vendors</h3>
          <ul>
            <li>
              <a rel="nofollow" target="_blank" href="https://faq.topsolid.com/">
                TopSolid
              </a>{' '}
              — product FAQ of the French CAD/CAM/ERP software publisher.
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="https://faq.astendo.de/">
                astendo GmbH
              </a>{' '}
              — customer FAQ of the Berlin-based CRM and ERP software company.
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="https://faq.asadatec.de/">
                ASA Datec
              </a>{' '}
              — product FAQ of the aviation maintenance (CAMO) software vendor.
            </li>
          </ul>

          <h3>IT Service Providers</h3>
          <ul>
            <li>
              <a rel="nofollow" target="_blank" href="https://faq.first-root.com/">
                First Root
              </a>{' '}
              — customer FAQ of the German hosting provider.
            </li>
          </ul>

          <p>
            Haftungshinweis: Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte
            externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}