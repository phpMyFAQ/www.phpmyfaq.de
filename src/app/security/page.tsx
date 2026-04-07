import PageLayout from '@/components/PageLayout';
import { generatePageMetadata } from '@/components/PageLayout';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAdvisoriesByYear } from '@/lib/securityAdvisory';

export const metadata: Metadata = generatePageMetadata(
  'List of Security Advisories',
  'We seriously take care about any security issues found in phpMyFAQ or bundled components. This page provides links to all our security advisories.',
);

export default function SecurityPage() {
  const advisoriesByYear = getAdvisoriesByYear();

  return (
    <PageLayout title="List of Security Advisories">
      <div className="row">
        <div className="col-12">
          <p>Here you can find our advisories:</p>

          {advisoriesByYear.map(({ year, advisories }) => (
            <div key={year}>
              <h2>{year}</h2>
              <ul>
                {advisories.map(({ slug, title }) => (
                  <li key={slug}>
                    <Link href={`/security/${slug}`}>{title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
