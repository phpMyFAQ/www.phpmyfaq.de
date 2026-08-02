import PageLayout from '@/components/PageLayout';
import { generatePageMetadata } from '@/components/PageLayout';
import { Metadata } from 'next';
import { getSecurityPolicy } from '@/lib/securityPolicy';
import styles from './security.module.scss';

const policy = getSecurityPolicy();

export const metadata: Metadata = generatePageMetadata(
  'Security',
  policy.frontmatter.description ??
    'How the phpMyFAQ project handles security — vulnerability reporting, supported versions, SBOM and secure development.',
);

export default function SecurityPage() {
  return (
    <PageLayout title="Security">
      <div className={styles.policy} dangerouslySetInnerHTML={{ __html: policy.content }} />
    </PageLayout>
  );
}