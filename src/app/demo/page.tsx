import PageLayout, { generatePageMetadata } from '@/components/PageLayout';
import { getVersions } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata('Demo installations', 'phpMyFAQ demo installations');

export default function DemoPage() {
  const versions = getVersions();

  const fallback = {
    stable: '4.1.6',
    development: '4.1.0-RC.7',
  };

  const stableVersion = versions?.stable || fallback.stable;
  const devVersion = versions?.development || fallback.development;

  // The versions API keeps serving the last pre-release even after it went
  // stable; only show the development demo while it is actually ahead.
  const baseVersion = (version: string) => version.split('-')[0].split('.').map(Number);
  const isNewer = (a: number[], b: number[]) =>
    a[0] !== b[0] ? a[0] > b[0] : a[1] !== b[1] ? a[1] > b[1] : a[2] > b[2];
  const showDevelopment = isNewer(baseVersion(devVersion), baseVersion(stableVersion));

  return (
    <PageLayout title="Demo" description="phpMyFAQ demo installations">
      <p className="lead">You can test all these phpMyFAQ installations with the following credentials:</p>

      <div className="row mb-4">
        <div className="col-md-6 col-12">
          <h4>Admin user</h4>
          <dl className="row">
            <dt className="col-sm-3">Username</dt>
            <dd className="col-sm-9">
              <code>demoadmin</code>
            </dd>
            <dt className="col-sm-3">Password</dt>
            <dd className="col-sm-9">
              <code>demoadmin</code>
            </dd>
          </dl>
        </div>
        <div className="col-md-6 col-12">
          <h4>Normal user</h4>
          <dl className="row">
            <dt className="col-sm-3">Username</dt>
            <dd className="col-sm-9">
              <code>demouser</code>
            </dd>
            <dt className="col-sm-3">Password</dt>
            <dd className="col-sm-9">
              <code>demouser</code>
            </dd>
          </dl>
        </div>
      </div>

      <div className="row gy-4">
        <div className="col-md-6 col-12">
          <h2 className="h4">phpMyFAQ {stableVersion}</h2>
          <ul className="list-unstyled text-center m-0">
            <li>
              <a className="btn btn-primary" rel="nofollow" target="_blank" href="https://roy.demo.phpmyfaq.de/">
                phpMyFAQ {stableVersion}
              </a>
            </li>
          </ul>
        </div>
        {showDevelopment && (
          <div className="col-md-6 col-12">
            <h2 className="h4">phpMyFAQ {devVersion}</h2>
            <ul className="list-unstyled text-center m-0">
              <li>
                n/a
                {/*
              <a className=\"btn btn-primary\" rel=\"nofollow\" target=\"_blank\" href=\"https://moss.demo.phpmyfaq.de/\">
                phpMyFAQ {devVersion}
              </a>
            */}
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <p>You can do whatever you want with these installations, the installations will be reset every day.</p>
        </div>
      </div>
    </PageLayout>
  );
}