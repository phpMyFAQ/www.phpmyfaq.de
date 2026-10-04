import PageLayout, { generatePageMetadata } from '@/components/PageLayout';
import { Metadata } from 'next';
import Link from 'next/link';
import blocks from '@/components/ContentBlocks.module.scss';
import Icon from '@/components/Icon';
import type { IconName } from '@/components/icons.generated';

export const metadata: Metadata = generatePageMetadata(
  'Who uses phpMyFAQ?',
  'Universities, public sector, industry and software vendors running phpMyFAQ in production',
);

interface Reference {
  name: string;
  href: string;
  description: string;
}

interface Sector {
  icon: IconName;
  title: string;
  entries: Reference[];
}

const sectors: Sector[] = [
  {
    icon: 'university',
    title: 'Higher education & organizations',
    entries: [
      {
        name: 'University of Siegen, Faculty of Arts and Humanities',
        href: 'https://faq.tools.phil.uni-siegen.de/',
        description: 'Public FAQ of the Philosophische Fakultät at the German university.',
      },
      {
        name: 'Fédération Équestre Internationale (FEI)',
        href: 'https://howto.fei.org/',
        description:
          '"FEI How To" knowledge base of the Lausanne-based international federation for equestrian sports.',
      },
    ],
  },
  {
    icon: 'landmark',
    title: 'Public sector & research',
    entries: [
      {
        name: 'Consiglio Nazionale delle Ricerche (CNR)',
        href: 'https://faq.rpd.cnr.it/',
        description: 'Data protection FAQ of the National Research Council of Italy.',
      },
      {
        name: 'Bibliotheksverbund Bayern',
        href: 'https://fl.bib-bvb.de/faq/',
        description: "FAQ of the Bavarian Library Network's interlibrary loan service.",
      },
    ],
  },
  {
    icon: 'industry',
    title: 'Industry & technology',
    entries: [
      {
        name: 'Cisco',
        href: 'https://meeting-infohub.cisco.com/faq/',
        description: 'Meeting InfoHub FAQ of the US networking company.',
      },
      {
        name: 'ZEMO',
        href: 'https://hilfe.zemo.de/',
        description: 'Customer help center of the German manufacturer of mobile health card (eGK) readers.',
      },
      {
        name: 'TeleCoop',
        href: 'https://faq.telecoop.fr/',
        description: 'Customer FAQ of the French cooperative mobile network operator.',
      },
    ],
  },
  {
    icon: 'laptop-code',
    title: 'Software vendors',
    entries: [
      {
        name: 'TopSolid',
        href: 'https://faq.topsolid.com/',
        description: 'Product FAQ of the French CAD/CAM/ERP software publisher.',
      },
      {
        name: 'astendo GmbH',
        href: 'https://faq.astendo.de/',
        description: 'Customer FAQ of the Berlin-based CRM and ERP software company.',
      },
      {
        name: 'ASA Datec',
        href: 'https://faq.asadatec.de/',
        description: 'Product FAQ of the German aviation maintenance (CAMO) software vendor.',
      },
    ],
  },
  {
    icon: 'network-wired',
    title: 'IT service providers',
    entries: [
      {
        name: 'First Root',
        href: 'https://faq.first-root.com/',
        description: 'Customer FAQ of the German hosting provider.',
      },
      {
        name: 'Brownrice Internet',
        href: 'https://support.brownrice.com/',
        description: 'Support knowledge base of the US hosting and colocation provider.',
      },
    ],
  },
];

export default function ReferencesPage() {
  return (
    <PageLayout title="References">
      <p className={blocks.lead}>
        A selection of organizations running phpMyFAQ in production, last verified in August 2026. Missing here?{' '}
        <a href="mailto:info@phpmyfaq.de">Send us</a> the URL of your installation and a short confirmation that we may
        list you.
      </p>

      <div className={blocks.grid3}>
        {sectors.map((sector) => (
          <article key={sector.title} className={blocks.card}>
            <div className={blocks.icon}>
              <Icon name={sector.icon} />
            </div>
            <h2>{sector.title}</h2>
            <ul className={blocks.list}>
              {sector.entries.map((entry) => (
                <li key={entry.href}>
                  <span>
                    <a href={entry.href} target="_blank" rel="nofollow noopener noreferrer">
                      {entry.name}
                    </a>
                    <span className={blocks.meta}>{entry.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className={blocks.note}>
        <p>
          Want to run phpMyFAQ the way these organizations do? Take a look at the{' '}
          <Link href="/features/">features</Link> they rely on, such as LDAP, Active Directory and Microsoft Entra ID
          authentication, a REST API and two-factor authentication, or try the <Link href="/demo/">online demo</Link>.
          Self-hosted and open source, phpMyFAQ keeps your knowledge base under your own{' '}
          <Link href="/sovereignty/">digital sovereignty</Link>.
        </p>
        <p>All links lead to external websites; their operators are solely responsible for their content.</p>
      </div>
    </PageLayout>
  );
}