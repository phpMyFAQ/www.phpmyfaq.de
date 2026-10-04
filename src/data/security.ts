// Facts about the phpMyFAQ security process that change with the release cycle.
// Rendered into content/security/policy.md via src/lib/securityPolicy.ts.

export interface SupportedVersion {
  version: string;
  status: string;
  securityUntil: string;
  php: string;
}

// Policy (see content/security/policy.md): a stable release receives security
// fixes for at least 12 months from its release date, and until at least 3
// months after the following minor release reaches stable — whichever is later.
// Dates derived from the release dates in content/changelog/index.md
// (4.1.0: 2026-03-12, 4.0.0: 2024-12-06, 3.2.0: 2023-09-04).
//
// 4.1.x: max(2026-03-12 + 12m, 4.2.0 + 3m) — 2027-03-12 unless 4.2.0 ships
//   after 2026-12-12, in which case this date moves out and must be updated.
// The rule applies from 4.1.x onwards. 4.0.x and 3.2.x predate it and carry the
// date of their last release: 4.0.19 on 2026-03-12, 3.2.10 on 2024-11-09.
export const supportedVersions: SupportedVersion[] = [
  { version: '4.2.x', status: 'Active development', securityUntil: '—', php: '8.4+' },
  { version: '4.1.x', status: 'Active support', securityUntil: '2027-03-12', php: '8.3+' },
  { version: '4.0.x', status: 'End of life', securityUntil: 'ended 2026-03-12', php: '8.2+' },
  { version: '3.2.x', status: 'End of life', securityUntil: 'ended 2024-11-09', php: '—' },
];

// Minimum PHP version for a release such as "4.1.9", e.g. "8.3+". The site
// headline, hero, download, features and requirements pages read it from the
// table above so they follow the release cycle instead of repeating the number.
export function phpRequirementFor(release: string): string {
  const line = `${release.split('.').slice(0, 2).join('.')}.x`;
  const entry = supportedVersions.find((v) => v.version === line);
  if (!entry || entry.php === '—') {
    throw new Error(`No PHP requirement for ${line} in src/data/security.ts`);
  }
  return entry.php;
}

// The same without the trailing "+", e.g. "8.3", for prose like "8.3 or later".
export function phpMinimumFor(release: string): string {
  return phpRequirementFor(release).replace(/\+$/, '');
}

// The newest stable PHP release, recommended on the requirements page, and the
// newest PHP version phpMyFAQ is tested against, which may still be a
// pre-release. Both follow the yearly PHP release cycle.
export const recommendedPhpVersion = '8.5';
export const latestSupportedPhpVersion = '8.6';

// Every PHP minor version from the requirement of `release` up to the latest
// supported one, e.g. ["8.3", "8.4", "8.5", "8.6"] for a 4.1 release.
export function supportedPhpVersionsFor(release: string): string[] {
  const [major, minimum] = phpMinimumFor(release).split('.').map(Number);
  const [latestMajor, latest] = latestSupportedPhpVersion.split('.').map(Number);
  if (major !== latestMajor || minimum > latest) {
    throw new Error(`Cannot list PHP versions from ${major}.${minimum} to ${latestSupportedPhpVersion}`);
  }
  return Array.from({ length: latest - minimum + 1 }, (_, i) => `${major}.${minimum + i}`);
}

// First release shipping sbom.cdx.json.
export const sbomSinceVersion = '4.1.7';

// PHPStan level enforced in CI — confirm against the application repository.
export const phpstanLevel = 9;

// Fingerprint of the PGP key for contactEmail. While null, the policy page omits
// the PGP hint entirely rather than printing a placeholder.
export const pgpFingerprint: string | null = null;

export const contactEmail = 'security@phpmyfaq.de';
export const advisoryReportUrl = 'https://github.com/thorsten/phpMyFAQ/security/advisories/new';
export const hardeningDocsUrl = 'https://phpmyfaq.readthedocs.io/en/main/';

// SECURITY.md in the application repository — the full disclosure policy on the
// website page summarises. Also listed as a Policy entry in security.txt.
export const securityPolicyUrl = 'https://github.com/thorsten/phpMyFAQ/blob/main/SECURITY.md';

export const lastReviewed = '2026-08-02';