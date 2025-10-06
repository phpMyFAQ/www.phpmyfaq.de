import PageLayout from '@/components/PageLayout'
import { generatePageMetadata } from '@/components/PageLayout'

export const metadata = generatePageMetadata(
  'Terms of service',
  'Terms of service for phpmyfaq.de'
)

export default function TermsPage() {
  return (
    <PageLayout title="Terms of service">
      <div className="row">
        <div className="col-xs-12">
          <p>
            This Agreement was last modified on May 8th, 2016.
          </p>
          <p>
            Please read these Terms and Conditions ("Agreement", "Terms and Conditions") carefully before
            using phpmyfaq.de ("the Site") operated by Thorsten Rinne ("us", "we", or "our"). This Agreement
            sets forth the legally binding terms and conditions for your use of the Site at phpmyfaq.de.
          </p>
          <p>
            By accessing or using the Site in any manner, including, but not limited to, visiting or browsing
            the Site or contributing content or other materials to the Site, you agree to be bound by these
            Terms and Conditions. Capitalized terms are defined in this Agreement.
          </p>

          <h2>
            INTELLECTUAL PROPERTY
          </h2>
          <p>
            The Site and its original content, features and functionality are owned by Thorsten Rinne and
            are protected by international copyright, trademark, patent, trade secret and other intellectual
            property or proprietary rights laws.
          </p>

          <h2>
            TERMINATION
          </h2>
          <p>
            We may terminate your access to the Site, without cause or notice, which may result in the
            forfeiture and destruction of all information associated with you. All provisions of this
            Agreement that by their nature should survive termination shall survive termination, including,
            without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of
            liability.
          </p>

          <h2>
            LINKS TO OTHER SITES
          </h2>
          <p>
            Our Site may contain links to third-party sites that are not owned or controlled by Thorsten
            Rinne.
            <br />
            Thorsten Rinne has no control over, and assumes no responsibility for, the content, privacy
            policies, or practices of any third party sites or services. We strongly advise you to read the
            terms and conditions and privacy policy of any third-party site that you visit.
          </p>

          <h2>
            GOVERNING LAW
          </h2>
          <p>
            This Agreement (and any further rules, polices, or guidelines incorporated by reference) shall
            be governed and construed in accordance with the laws of Germany, without giving effect to any
            principles of conflicts of law.
          </p>

          <h2>
            CHANGES TO THIS AGREEMENT
          </h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms and Conditions
            by posting the updated terms on the Site. Your continued use of the Site after any such changes
            constitutes your acceptance of the new Terms and Conditions.
            <br />
            Please review this Agreement periodically for changes. If you do not agree to any of this
            Agreement or any changes to this Agreement, do not use, access or continue to access the Site or
            discontinue any use of the Site immediately.
          </p>

          <h2>
            CONTACT US
          </h2>
          <p>
            If you have any questions about this Agreement, please{' '}
            <a href="mailto:thorsten@phpmyfaq.de">contact us</a>.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
