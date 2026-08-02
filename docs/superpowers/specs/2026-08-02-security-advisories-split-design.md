# Split `/advisories` and `/security`

## Problem

`src/app/security/page.tsx` and `src/app/advisories/page.tsx` are byte-identical
duplicates. Both render the list of security advisories grouped by year. There is
no page describing _how_ the project handles security — vulnerability reporting,
support windows, SBOM, or Cyber Resilience Act obligations.

## Goal

- `/advisories` — the list of published security advisories (unchanged behaviour)
- `/security` — a new policy page: reporting, supported versions, SBOM, secure
  development, regulatory position
- `/security/<slug>` — advisory detail pages stay where they are; no URL breakage,
  no redirects

## Route map

| Route              | Before                  | After                       |
| ------------------ | ----------------------- | --------------------------- |
| `/advisories`      | advisory list           | advisory list (unchanged)   |
| `/security`        | duplicate advisory list | security policy page        |
| `/security/<slug>` | advisory detail         | advisory detail (unchanged) |

`/security/page.tsx` and `/security/[advisory]/page.tsx` coexist in Next.js: the
static segment wins over the dynamic one.

## Content architecture

Prose lives in markdown so it can be edited without touching TSX. Values that
change with the release cycle live in a typed data file so they cannot drift out
of sync with reality unnoticed.

### `content/security/policy.md` (new)

Holds the full page text: prose, the reporting-SLA table, the bullet lists.
Frontmatter carries `title` and `description` for page metadata.

Placing it in `content/security/` next to the advisories is safe: both
`getAdvisoriesByYear()` (`src/lib/securityAdvisory.ts`) and
`getAllSecurityAdvisories()` (`src/lib/markdown.ts`) filter for files starting
with `advisory-`. A regression test locks this in.

Volatile values appear as tokens:

- `{{supportedVersionsTable}}`
- `{{sbomSinceVersion}}`
- `{{phpstanLevel}}`
- `{{pgpFingerprint}}`
- `{{lastReviewed}}`

### `src/data/security.ts` (new)

```ts
export interface SupportedVersion {
  version: string;
  status: string;
  securityUntil: string;
  php: string;
}

export const supportedVersions: SupportedVersion[];
export const sbomSinceVersion: string;
export const phpstanLevel: number;
export const pgpFingerprint: string | null;
export const contactEmail: string;
export const advisoryReportUrl: string;
export const hardeningDocsUrl: string;
export const lastReviewed: string;
```

Prefilled values, derived from release dates in `content/changelog/index.md`
(4.1.0 → 2026-03-12, 4.0.0 → 2024-12-06, 3.2.0 → 2023-09-04) and the stated
policy "security fixes for at least 12 months after the following minor release":

| Version | Status              | Security fixes until  | PHP  |
| ------- | ------------------- | --------------------- | ---- |
| 4.2.x   | Active development  | —                     | 8.4+ |
| 4.1.x   | Active support      | 12 months after 4.2.0 | 8.3+ |
| 4.0.x   | Security fixes only | 2027-03-12            | 8.2+ |
| 3.2.x   | End of life         | ended 2025-12-06      | —    |

`pgpFingerprint` is `null` until the real fingerprint is supplied. When null, the
PGP parenthetical is omitted from the rendered contact line rather than printing a
placeholder on a public page. `sbomSinceVersion` and `phpstanLevel` are prefilled
from the phpMyFAQ application repository and flagged in the plan for confirmation.

### `src/lib/securityPolicy.ts` (new)

One exported function, mirroring the shape of `getMarkdownContent()`:

```ts
export function getSecurityPolicy(): { content: string; frontmatter: {...} }
```

It reads the markdown with `gray-matter`, substitutes every token from
`src/data/security.ts`, then renders with `marked` (GFM tables enabled). The
supported-versions token expands to a GFM table built from `supportedVersions`, so
it is styled identically to the hand-written SLA table.

Unknown tokens are left untouched; a unit test asserts the rendered output
contains no unresolved `{{`.

## Page

`src/app/security/page.tsx` is rewritten:

- `PageLayout title="Security"`
- rendered HTML via `dangerouslySetInnerHTML`
- `security.module.scss` for table and section styling, consistent with the
  advisory card styling in `advisories.module.scss`
- metadata: title `Security`, description drawn from the markdown frontmatter

`src/app/security/advisory.module.scss` stays; it belongs to the detail route.

## Wiring

- `src/components/Footer.tsx` — add "Security" → `/security` alongside the
  existing "Security Advisories" → `/advisories`
- `src/app/security/[advisory]/page.tsx:90` — breadcrumb link changes from
  `/security` to `/advisories`; it currently points at what becomes the policy page
- `src/app/advisories/page.tsx` — intro paragraph links to `/security` for the
  reporting and support policy
- `src/app/support/page.tsx` — keep the `/advisories` resource item, add a
  `/security` one
- `public/.well-known/security.txt` — `Policy:` changes from the GitHub
  `SECURITY.md` URL to `https://www.phpmyfaq.de/security`
- The policy page links "Extended support is available commercially" to `/support`

## Testing

Unit (vitest):

- `src/lib/securityPolicy` substitutes every token; output contains no `{{`
- the supported-versions table renders one row per `supportedVersions` entry
- `getAdvisoriesByYear()` never returns `policy` — regression guard for the
  `advisory-` filename filter

E2E (playwright):

- `tests/e2e/all-pages.spec.ts` — `/security` expects title `Security - phpMyFAQ`;
  the `/advisories` entry is unchanged
- `/security` renders no advisory cards
- `/advisories` still renders advisory cards and its year headings
- the breadcrumb on an advisory detail page navigates to `/advisories`

## Out of scope

- Moving advisory detail pages to `/advisories/<slug>` — rejected to avoid
  breaking roughly fifty indexed URLs referenced from CVE records
- Any change to advisory markdown files or the advisory parser
- Redirects; no URL changes

## Open items

Values to confirm before release; the page is complete and shippable with the
prefilled data either way:

- PGP key fingerprint for security@phpmyfaq.de
- First release shipping `sbom.cdx.json`
- Enforced PHPStan level in CI
- Target URL for the hardening recommendations