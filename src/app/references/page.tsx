import PageLayout from '@/components/PageLayout';
import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/components/PageLayout';

export const metadata: Metadata = generatePageMetadata(
  'Who uses phpMyFAQ?',
  'Universities, public sector, industry and software vendors running phpMyFAQ in production',
);

export default function ReferencesPage() {
  return (
    <PageLayout title="References">
      <div className="row">
        <div className="col-xs-12">
          <p>
            A selection of organizations running phpMyFAQ in production. All entries were last verified in August 2026.
          </p>
          <p>
            Is your FAQ missing here? <a href="mailto:info@phpmyfaq.de">Send us</a> the URL of your installation and a
            short confirmation that we may list you here.
          </p>

          <h3>Higher Education &amp; Organizations</h3>
          <ul>
            <li>
              <a rel="nofollow" target="_blank" href="https://faq.tools.phil.uni-siegen.de/">
                University of Siegen, Faculty of Arts and Humanities
              </a>{' '}
              — public FAQ of the Philosophische Fakultät at the German university.
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="https://howto.fei.org/">
                Fédération Équestre Internationale (FEI)
              </a>{' '}
              — &ldquo;FEI How To&rdquo; knowledge base of the Lausanne-based international federation for equestrian
              sports.
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
            <li>
              <a rel="nofollow" target="_blank" href="https://fl.bib-bvb.de/faq/">
                Bibliotheksverbund Bayern
              </a>{' '}
              — FAQ of the Bavarian Library Network&apos;s interlibrary loan service.
            </li>
          </ul>

          <h3>Industry &amp; Technology</h3>
          <ul>
            <li>
              <a rel="nofollow" target="_blank" href="https://meeting-infohub.cisco.com/faq/">
                Cisco
              </a>{' '}
              — Meeting InfoHub FAQ of the US networking company.
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
              — product FAQ of the German aviation maintenance (CAMO) software vendor.
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
            <li>
              <a rel="nofollow" target="_blank" href="https://support.brownrice.com/">
                Brownrice Internet
              </a>{' '}
              — support knowledge base of the US hosting and colocation provider.
            </li>
          </ul>

          <p>
            <small>
              All links lead to external websites; their operators are solely responsible for their content.
            </small>
          </p>
          <p>
            Want to run phpMyFAQ the way these organizations do? Take a look at the{' '}
            <Link href="/features/">features</Link> they rely on — LDAP, Active Directory and Microsoft Entra ID
            authentication, a REST API, and two-factor authentication — or try the{' '}
            <Link href="/demo/">online demo</Link>. Self-hosted and open source, phpMyFAQ also keeps your knowledge base
            under your own <Link href="/sovereignty/">digital sovereignty</Link>.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}