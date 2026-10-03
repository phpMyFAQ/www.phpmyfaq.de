import Link from 'next/link';
import { formatReleaseDate, getVersions, isDevelopmentAhead } from '@/lib/data';

// Shown while data/versions.json is missing (e.g. a fresh checkout before
// `npm run fetch:versions`).
const fallbackVersions = {
  stable: '4.1.9',
  stable_released: '2026-10-03',
  development: '4.2.0-beta',
  development_released: '2026-10-03',
};

// "4.1.9" -> "4.1": the headline names the release line, the exact version
// goes in the release note below the buttons.
const releaseLine = (version: string) => version.split('.').slice(0, 2).join('.');

export default function Hero() {
  const versions = getVersions() ?? fallbackVersions;
  const showDevelopment = isDevelopmentAhead(versions.development, versions.stable);

  return (
    <section className="promo">
      <div className="container">
        <h1 className="title">
          phpMy<span className="highlight">FAQ</span> {releaseLine(versions.stable)}
        </h1>

        <p className="intro">
          A mobile-friendly, feature-rich, AI-ready open source FAQ web app for PHP 8.3+. Free since 2001.
        </p>

        <div className="btns">
          <Link href="/download" className="btn btn-light me-3">
            Download phpMyFAQ
          </Link>
          <Link href="/demo" className="btn btn-outline-light">
            Live Demo
          </Link>
        </div>

        <p className="release-note">
          Latest release: <strong>{versions.stable}</strong> ({formatReleaseDate(versions.stable_released)})
          {showDevelopment && (
            <>
              {' '}
              &middot; <Link href="/download">Try {versions.development}</Link>
            </>
          )}
        </p>

        <ul className="meta list-inline">
          <li className="list-inline-item">
            <a rel="nofollow noopener" target="_blank" href="https://github.com/thorsten/phpMyFAQ">
              GitHub
            </a>
          </li>
          <li className="list-inline-item">
            <Link href="/documentation">Documentation</Link>
          </li>
          <li className="list-inline-item">
            <Link href="/features">Features</Link>
          </li>
          <li className="list-inline-item">
            <a rel="nofollow noopener" target="_blank" href="https://github.com/thorsten/phpMyFAQ/issues">
              Report an issue
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}