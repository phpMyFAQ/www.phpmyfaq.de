import Link from 'next/link';
import CopyCommand from './CopyCommand';
import { formatReleaseDate, isDevelopmentAhead, requireVersions } from '@/lib/data';
import { phpRequirementFor } from '@/data/security';

// "4.1.9" -> "4.1": the headline names the release line, the exact version
// goes in the release note below the buttons.
const releaseLine = (version: string) => version.split('.').slice(0, 2).join('.');

export default function Hero() {
  const versions = requireVersions();
  const showDevelopment = isDevelopmentAhead(versions.development, versions.stable);
  const php = phpRequirementFor(versions.stable);

  return (
    <section className="promo">
      <div className="container">
        <h1 className="title">
          phpMy<span className="highlight">FAQ</span> {releaseLine(versions.stable)}
        </h1>

        <p className="intro">
          A mobile-friendly, feature-rich, AI-ready open source FAQ web app for PHP {php}. Free since 2001.
        </p>

        <div className="btns">
          <Link href="/download" className="btn btn-light">
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
              &middot; <Link href="/download/#development">Try {versions.development}</Link>
            </>
          )}
        </p>

        <div className="meta">
          <p className="meta-label">Or run the 4.2 nightly in a container:</p>
          <CopyCommand command="docker pull ghcr.io/thorsten/phpmyfaq:nightly" label="Copy the docker pull command" />
          <p className="meta-links">
            <a
              rel="nofollow noopener"
              target="_blank"
              href="https://github.com/thorsten/phpMyFAQ/pkgs/container/phpmyfaq"
            >
              All image tags
            </a>
            <a rel="nofollow noopener" target="_blank" href="https://github.com/thorsten/phpMyFAQ/issues">
              Report an issue
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}