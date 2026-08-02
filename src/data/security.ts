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
// 4.0.x: max(2025-12-06, 2026-03-12 + 3m) = 2026-06-12.
// 3.2.x: max(2024-09-04, 2024-12-06 + 3m) = 2025-03-06, counting 4.0.0 as the
//   following stable release.
export const supportedVersions: SupportedVersion[] = [
  { version: '4.2.x', status: 'Active development', securityUntil: '—', php: '8.4+' },
  { version: '4.1.x', status: 'Active support', securityUntil: '2027-03-12', php: '8.3+' },
  { version: '4.0.x', status: 'End of life', securityUntil: 'ended 2026-06-12', php: '8.2+' },
  { version: '3.2.x', status: 'End of life', securityUntil: 'ended 2025-03-06', php: '—' },
];

// First release shipping sbom.cdx.json — confirm against the application repository.
export const sbomSinceVersion = '4.2.0';

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
