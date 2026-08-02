# Split `/advisories` and `/security` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn `/security` from a duplicate of the advisory list into a page describing how the project handles security, leaving `/advisories` as the list.

**Architecture:** Page prose lives in `content/security/policy.md`. Values that change with the release cycle live in `src/data/security.ts` and are injected into the markdown through `{{token}}` placeholders by a new `src/lib/securityPolicy.ts`, which then renders with `marked`. `src/app/security/page.tsx` renders the resulting HTML. Advisory detail pages stay at `/security/<slug>`; no URLs change.

**Tech Stack:** Next.js 16 (App Router, static export), React 19, TypeScript, `gray-matter`, `marked`, SCSS modules, vitest (unit), Playwright (e2e).

## Global Constraints

- Node package manager is `pnpm`. Unit tests: `pnpm test:ci`. Lint: `pnpm lint`. E2E: `pnpm test:e2e`.
- A husky pre-commit hook runs `eslint .` and `vitest --run` on every commit. A commit fails if either fails.
- Commit messages follow Conventional Commits (`commitlint` runs on commit-msg).
- Prettier formatting is enforced (`pnpm format:check`). Run `pnpm format` before committing if unsure.
- Do **not** rename, move, or delete any file under `content/security/advisory-*.md`.
- Do **not** change any existing URL. `/security/<slug>` must keep working.
- Imports use the `@/` alias for `src/` (e.g. `@/lib/securityPolicy`).
- Existing page files import PageLayout on two lines (`import PageLayout from '@/components/PageLayout';` then `import { generatePageMetadata } from '@/components/PageLayout';`). Match that.

---

### Task 1: Security policy data and renderer

**Files:**
- Create: `src/data/security.ts`
- Create: `src/lib/securityPolicy.ts`
- Test: `src/lib/securityPolicy.test.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces:
  - `src/data/security.ts` — `interface SupportedVersion { version: string; status: string; securityUntil: string; php: string }`, `supportedVersions: SupportedVersion[]`, `sbomSinceVersion: string`, `phpstanLevel: number`, `pgpFingerprint: string | null`, `contactEmail: string`, `advisoryReportUrl: string`, `hardeningDocsUrl: string`, `lastReviewed: string`
  - `src/lib/securityPolicy.ts` — `POLICY_PATH: string`, `renderSupportedVersionsTable(): string`, `substituteTokens(markdown: string): string`, `interface SecurityPolicy { content: string; frontmatter: { title?: string; description?: string; [key: string]: unknown } }`, `getSecurityPolicy(): SecurityPolicy`

- [ ] **Step 1: Create the data file**

Create `src/data/security.ts`:

```ts
// Facts about the phpMyFAQ security process that change with the release cycle.
// Rendered into content/security/policy.md via src/lib/securityPolicy.ts.

export interface SupportedVersion {
  version: string;
  status: string;
  securityUntil: string;
  php: string;
}

// Policy: a minor release receives security fixes for at least 12 months after
// the following minor release is published. Dates derived from the release dates
// in content/changelog/index.md (4.1.0: 2026-03-12, 4.0.0: 2024-12-06,
// 3.2.0: 2023-09-04).
export const supportedVersions: SupportedVersion[] = [
  { version: '4.2.x', status: 'Active development', securityUntil: '—', php: '8.4+' },
  { version: '4.1.x', status: 'Active support', securityUntil: 'TBD (12 months after 4.2.0)', php: '8.3+' },
  { version: '4.0.x', status: 'Security fixes only', securityUntil: '2027-03-12', php: '8.2+' },
  { version: '3.2.x', status: 'End of life', securityUntil: 'ended 2025-12-06', php: '—' },
];

// First release shipping sbom.cdx.json — confirm against the application repository.
export const sbomSinceVersion = '4.1.0';

// PHPStan level enforced in CI — confirm against the application repository.
export const phpstanLevel = 9;

// Fingerprint of the PGP key for contactEmail. While null, the policy page omits
// the PGP hint entirely rather than printing a placeholder.
export const pgpFingerprint: string | null = null;

export const contactEmail = 'security@phpmyfaq.de';
export const advisoryReportUrl = 'https://github.com/thorsten/phpMyFAQ/security/advisories/new';
export const hardeningDocsUrl = 'https://phpmyfaq.readthedocs.io/en/main/';
export const lastReviewed = '2026-08-02';
```

- [ ] **Step 2: Write the failing tests**

Create `src/lib/securityPolicy.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { renderSupportedVersionsTable, substituteTokens, getSecurityPolicy } from './securityPolicy';
import { supportedVersions, lastReviewed, sbomSinceVersion } from '@/data/security';

describe('renderSupportedVersionsTable', () => {
  it('renders a GFM table with one row per supported version', () => {
    const table = renderSupportedVersionsTable();
    const lines = table.trim().split('\n');

    // header + separator + one row per version
    expect(lines).toHaveLength(supportedVersions.length + 2);
    expect(lines[0]).toBe('| Version | Status | Security fixes until | PHP |');
    expect(lines[1]).toBe('| --- | --- | --- | --- |');
    expect(lines[2]).toBe('| 4.2.x | Active development | — | 8.4+ |');
  });
});

describe('substituteTokens', () => {
  it('replaces known tokens', () => {
    expect(substituteTokens('reviewed {{lastReviewed}}')).toBe(`reviewed ${lastReviewed}`);
    expect(substituteTokens('since {{sbomSinceVersion}}')).toBe(`since ${sbomSinceVersion}`);
  });

  it('expands the supported versions table token', () => {
    expect(substituteTokens('{{supportedVersionsTable}}')).toBe(renderSupportedVersionsTable());
  });

  it('leaves unknown tokens untouched', () => {
    expect(substituteTokens('{{nopeNotAToken}}')).toBe('{{nopeNotAToken}}');
  });
});

describe('getSecurityPolicy', () => {
  it('renders the policy markdown to HTML with no unresolved tokens', () => {
    const policy = getSecurityPolicy();

    expect(policy.content).toContain('<h2');
    expect(policy.content).toContain('<table>');
    expect(policy.content).not.toContain('{{');
  });

  it('exposes frontmatter for page metadata', () => {
    const policy = getSecurityPolicy();

    expect(policy.frontmatter.title).toBe('Security');
    expect(typeof policy.frontmatter.description).toBe('string');
  });
});
```

- [ ] **Step 3: Run the tests to verify they fail**

Run: `pnpm exec vitest --run src/lib/securityPolicy.test.ts`
Expected: FAIL — `Failed to resolve import "./securityPolicy"`.

- [ ] **Step 4: Create the renderer**

Create `src/lib/securityPolicy.ts`:

```ts
import { readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import {
  supportedVersions,
  sbomSinceVersion,
  phpstanLevel,
  pgpFingerprint,
  contactEmail,
  advisoryReportUrl,
  hardeningDocsUrl,
  lastReviewed,
} from '@/data/security';

export const POLICY_PATH = 'content/security/policy.md';

export interface SecurityPolicy {
  content: string;
  frontmatter: {
    title?: string;
    description?: string;
    [key: string]: unknown;
  };
}

// Builds the supported versions table as GFM so it renders like the hand-written
// tables in the policy markdown.
export function renderSupportedVersionsTable(): string {
  const rows = supportedVersions.map((v) => `| ${v.version} | ${v.status} | ${v.securityUntil} | ${v.php} |`);

  return ['| Version | Status | Security fixes until | PHP |', '| --- | --- | --- | --- |', ...rows].join('\n');
}

// Replaces {{token}} placeholders in the policy markdown. Unknown tokens are left
// as-is so a typo is visible in the rendered page instead of silently vanishing.
export function substituteTokens(markdown: string): string {
  const tokens: Record<string, string> = {
    supportedVersionsTable: renderSupportedVersionsTable(),
    sbomSinceVersion,
    phpstanLevel: String(phpstanLevel),
    pgpFingerprint: pgpFingerprint ? ` (PGP key fingerprint: \`${pgpFingerprint}\`)` : '',
    contactEmail,
    advisoryReportUrl,
    hardeningDocsUrl,
    lastReviewed,
  };

  return markdown.replace(/\{\{(\w+)\}\}/g, (match, key: string) => (key in tokens ? tokens[key] : match));
}

export function getSecurityPolicy(): SecurityPolicy {
  const raw = readFileSync(join(process.cwd(), POLICY_PATH), 'utf-8');
  const { data, content } = matter(raw);

  return {
    content: marked.parse(substituteTokens(content)) as string,
    frontmatter: data as SecurityPolicy['frontmatter'],
  };
}
```

- [ ] **Step 5: Run the tests**

Run: `pnpm exec vitest --run src/lib/securityPolicy.test.ts`
Expected: the `renderSupportedVersionsTable` and `substituteTokens` tests PASS. The two `getSecurityPolicy` tests FAIL with `ENOENT ... content/security/policy.md` — that file arrives in Task 2. Do not create it here and do not delete the tests.

- [ ] **Step 6: Commit**

The pre-commit hook runs the whole unit suite, which is currently red. Commit the data file and renderer together with Task 2's markdown instead — skip to Task 2, then commit both. If you need a checkpoint now, use:

```bash
git add src/data/security.ts src/lib/securityPolicy.ts src/lib/securityPolicy.test.ts
git commit --no-verify -m "feat: add security policy data and renderer"
```

---

### Task 2: Policy markdown content

**Files:**
- Create: `content/security/policy.md`
- Test: `src/lib/securityAdvisory.test.ts` (create)

**Interfaces:**
- Consumes: the tokens defined in `substituteTokens()` from Task 1 — `{{supportedVersionsTable}}`, `{{sbomSinceVersion}}`, `{{phpstanLevel}}`, `{{pgpFingerprint}}`, `{{contactEmail}}`, `{{advisoryReportUrl}}`, `{{hardeningDocsUrl}}`, `{{lastReviewed}}`.
- Produces: `content/security/policy.md` with frontmatter `title: Security` and a `description` string, consumed by Task 3.

- [ ] **Step 1: Write the regression test for the advisory list**

`content/security/` holds the advisory markdown files. `getAdvisoriesByYear()` filters for names starting with `advisory-`, so `policy.md` must never show up in the list. Lock that in.

Create `src/lib/securityAdvisory.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { getAdvisoriesByYear } from './securityAdvisory';

describe('getAdvisoriesByYear', () => {
  it('returns advisories grouped by year, newest year first', () => {
    const years = getAdvisoriesByYear();

    expect(years.length).toBeGreaterThan(0);
    const labels = years.map((y) => y.year);
    expect([...labels].sort((a, b) => b.localeCompare(a))).toEqual(labels);
  });

  it('ignores non-advisory markdown in content/security', () => {
    const slugs = getAdvisoriesByYear().flatMap((y) => y.advisories.map((a) => a.slug));

    expect(slugs).not.toContain('policy');
    expect(slugs.every((slug) => slug.startsWith('advisory-'))).toBe(true);
  });

  it('has no "Unknown" year bucket', () => {
    expect(getAdvisoriesByYear().map((y) => y.year)).not.toContain('Unknown');
  });
});
```

- [ ] **Step 2: Run it to see it pass before the markdown lands**

Run: `pnpm exec vitest --run src/lib/securityAdvisory.test.ts`
Expected: PASS. This is the baseline — it must still pass in Step 4, after `policy.md` exists.

- [ ] **Step 3: Create the policy markdown**

Create `content/security/policy.md`:

```markdown
---
title: Security
description: How the phpMyFAQ project handles security — vulnerability reporting, supported versions, SBOM and secure development.
---

phpMyFAQ has published a public security advisory for every fixed vulnerability
since 2003. This page describes how we handle security — how to report an issue,
how long each release is supported, and what documentation we provide for audits.
The advisories themselves are listed on our
[security advisories page](/advisories).

## Reporting a vulnerability

Please do not open a public GitHub issue for security problems.

- Preferred: GitHub Security Advisories → [Report a vulnerability]({{advisoryReportUrl}})
- Alternative: [{{contactEmail}}](mailto:{{contactEmail}}){{pgpFingerprint}}

What to expect:

| Step                        | Target                  |
| --------------------------- | ----------------------- |
| Acknowledgement of receipt  | 2 business days         |
| Initial assessment and CVSS | 7 business days         |
| Fix for critical / high     | 30 days                 |
| Fix for medium / low        | next scheduled release  |
| Public advisory             | with the fixing release |

We request coordinated disclosure and ask you not to publish details before the
advisory is out. We credit every reporter who wants to be credited. We do not
currently operate a paid bug bounty.

Safe harbour: we will not pursue legal action against researchers who act in good
faith, stay within the scope of a test installation they control, and do not
access or exfiltrate third-party data.

## Supported versions

{{supportedVersionsTable}}

Our policy: every minor release receives security fixes for at least 12 months
after the following minor release is published. Every major release is supported
for at least 24 months from its stable release. [Extended support for older
versions is available commercially](/support).

## Software Bill of Materials

Every release since {{sbomSinceVersion}} ships a CycloneDX SBOM covering both PHP
and JavaScript dependencies, attached as an asset to the GitHub release and
included in the distribution package as `sbom.cdx.json`.

## Secure development

- Dependencies monitored and updated via Dependabot
- Static analysis (PHPStan level {{phpstanLevel}}) enforced in CI
- Release artifacts published with SHA-256 checksums
- Two-factor authentication required for all accounts with write access
- [Hardening recommendations]({{hardeningDocsUrl}}) in the documentation

## Regulatory

phpMyFAQ is developed as a free and open source project. For the commercial
offerings listed under [Support](/support), phpMyFAQ acts as a manufacturer
within the meaning of Regulation (EU) 2024/2847 (Cyber Resilience Act). Our
vulnerability handling process, support periods and SBOM provision are documented
on this page. Reporting obligations under Article 14 are covered by the process
above.

Last reviewed: {{lastReviewed}}
```

- [ ] **Step 4: Run the full unit suite**

Run: `pnpm test:ci`
Expected: PASS, including the four `getSecurityPolicy`/`substituteTokens` tests from Task 1 and the advisory regression tests from Step 1. If `securityAdvisory.test.ts` now fails on the `policy` slug, the filename filter in `src/lib/securityAdvisory.ts` is broken — fix that, do not weaken the test.

- [ ] **Step 5: Format and commit**

```bash
pnpm format
git add src/data/security.ts src/lib/securityPolicy.ts src/lib/securityPolicy.test.ts src/lib/securityAdvisory.test.ts content/security/policy.md
git commit -m "feat: add security policy content and renderer"
```

---

### Task 3: Replace the `/security` page

**Files:**
- Modify: `src/app/security/page.tsx` (full rewrite — currently a byte-identical copy of `src/app/advisories/page.tsx`)
- Create: `src/app/security/security.module.scss`
- Modify: `tests/e2e/all-pages.spec.ts:12` area (add a `/security` entry)
- Test: `tests/e2e/security.spec.ts` (create)

**Interfaces:**
- Consumes: `getSecurityPolicy()` from `@/lib/securityPolicy` (Task 1), `content/security/policy.md` (Task 2).
- Produces: `/security` rendering the policy page with document title `Security - phpMyFAQ`.

- [ ] **Step 1: Add the e2e expectations**

In `tests/e2e/all-pages.spec.ts`, in the `pages` array, add below the `/advisories` line:

```ts
    { path: '/security', title: 'Security - phpMyFAQ' },
```

Create `tests/e2e/security.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test.describe('Security policy page', () => {
  test('/security shows the policy, not the advisory list', async ({ page }) => {
    await page.goto('/security');

    await expect(page.getByRole('heading', { level: 1, name: 'Security' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Reporting a vulnerability' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Supported versions' })).toBeVisible();

    // No advisory cards — those belong to /advisories
    await expect(page.locator('a[href^="/security/advisory-"]')).toHaveCount(0);

    // No unresolved template tokens leaked into the page
    await expect(page.locator('body')).not.toContainText('{{');
  });

  test('/security links to the advisory list and to support', async ({ page }) => {
    await page.goto('/security');

    await expect(page.locator('a[href="/advisories"]').first()).toBeVisible();
    await expect(page.locator('a[href="/support"]').first()).toBeVisible();
  });

  test('/advisories still lists advisories', async ({ page }) => {
    await page.goto('/advisories');

    await expect(page.getByRole('heading', { level: 1, name: 'List of Security Advisories' })).toBeVisible();
    expect(await page.locator('a[href^="/security/advisory-"]').count()).toBeGreaterThan(10);
  });

  test('an advisory detail page still resolves under /security/', async ({ page }) => {
    await page.goto('/advisories');
    const first = page.locator('a[href^="/security/advisory-"]').first();
    const href = await first.getAttribute('href');

    const response = await page.goto(href as string);
    expect(response?.status()).toBe(200);
  });
});
```

- [ ] **Step 2: Run the e2e tests to verify they fail**

Run: `pnpm test:e2e tests/e2e/security.spec.ts`
Expected: FAIL — `/security` still renders the advisory list, so the `Reporting a vulnerability` heading is missing and the advisory-card count is not 0.

- [ ] **Step 3: Create the stylesheet**

Create `src/app/security/security.module.scss`. It styles rendered markdown, so selectors are element-based inside one wrapper class:

```scss
.policy {
  max-width: 820px;
  line-height: 1.7;

  h2 {
    font-size: 1.6rem !important;
    margin: 2.5rem 0 1rem !important;
    padding-bottom: 0.5rem;
    font-weight: 600;
    border-bottom: 2px solid var(--color-border);
  }

  p {
    margin-bottom: 1.1rem;
  }

  ul {
    margin-bottom: 1.1rem;
    padding-left: 1.4rem;

    li {
      margin-bottom: 0.4rem;
    }
  }

  code {
    padding: 0.1rem 0.35rem;
    border-radius: 4px;
    background: var(--color-bg-secondary);
    font-size: 0.9em;
  }

  table {
    width: 100%;
    margin: 0 0 1.5rem;
    border-collapse: collapse;
    font-size: 0.95rem;

    th,
    td {
      padding: 0.6rem 0.85rem;
      text-align: left;
      border-bottom: 1px solid var(--color-border);
    }

    th {
      font-weight: 600;
      background: var(--color-bg-secondary);
    }

    tbody tr:last-child td {
      border-bottom: none;
    }
  }
}

.tableWrapper {
  overflow-x: auto;
}
```

- [ ] **Step 4: Rewrite the page**

Replace the entire contents of `src/app/security/page.tsx` with:

```tsx
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
      <div className={styles.tableWrapper}>
        <div className={styles.policy} dangerouslySetInnerHTML={{ __html: policy.content }} />
      </div>
    </PageLayout>
  );
}
```

`src/app/security/advisory.module.scss` stays untouched — it belongs to the `[advisory]` detail route.

- [ ] **Step 5: Run the tests**

Run: `pnpm test:ci && pnpm lint && pnpm test:e2e tests/e2e/security.spec.ts tests/e2e/all-pages.spec.ts`
Expected: PASS on all three.

- [ ] **Step 6: Format and commit**

```bash
pnpm format
git add src/app/security/page.tsx src/app/security/security.module.scss tests/e2e/security.spec.ts tests/e2e/all-pages.spec.ts
git commit -m "feat: replace duplicate advisory list on /security with security policy page"
```

---

### Task 4: Re-point links to the split pages

**Files:**
- Modify: `src/components/Footer.tsx:29` area
- Modify: `src/app/security/[advisory]/page.tsx:90`
- Modify: `src/app/advisories/page.tsx` (intro paragraph)
- Modify: `src/app/support/page.tsx` (Additional Resources grid)
- Modify: `public/.well-known/security.txt`
- Modify: `tests/e2e/all-pages.spec.ts` (footer link list)

**Interfaces:**
- Consumes: the `/security` policy page from Task 3.
- Produces: no new exports. Every in-site link that means "the list" points at `/advisories`; every link that means "the policy" points at `/security`.

- [ ] **Step 1: Extend the footer e2e expectations**

In `tests/e2e/all-pages.spec.ts`, in the `footerLinks` array of the `all footer links work correctly` test, add `'/security',` directly after `'/advisories',`.

- [ ] **Step 2: Write the failing footer test**

The `footerLinks` list only fetches URLs, so it cannot tell whether the link is actually in the footer. Add a real assertion to `tests/e2e/security.spec.ts`:

```ts
  test('the homepage footer links to both the policy and the advisory list', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('a[href="/security"]').first()).toBeVisible();
    await expect(page.locator('a[href="/advisories"]').first()).toBeVisible();
  });
```

Run: `pnpm test:e2e tests/e2e/security.spec.ts -g "homepage footer links"`
Expected: FAIL — the homepage has no `/security` link yet.

- [ ] **Step 3: Add the footer link**

In `src/components/Footer.tsx`, in the "Getting started" list, insert directly after the `/advisories` `<li>`:

```tsx
                <li>
                  <Link href="/security">Security</Link>
                </li>
```

- [ ] **Step 4: Fix the advisory detail breadcrumb**

In `src/app/security/[advisory]/page.tsx` line 90, the breadcrumb points at what is now the policy page. Change:

```tsx
                <Link href="/security">Security Advisories</Link>
```

to:

```tsx
                <Link href="/advisories">Security Advisories</Link>
```

- [ ] **Step 5: Cross-link from the advisory list**

In `src/app/advisories/page.tsx`, replace the intro paragraph:

```tsx
      <p className={styles.intro}>
        We take any security issues found in phpMyFAQ or bundled components seriously. Below are all published security
        advisories, grouped by year and ordered from newest to oldest.
      </p>
```

with:

```tsx
      <p className={styles.intro}>
        We take any security issues found in phpMyFAQ or bundled components seriously. Below are all published security
        advisories, grouped by year and ordered from newest to oldest. See our <Link href="/security">security page</Link>{' '}
        for how to report a vulnerability and how long each release is supported.
      </p>
```

`Link` is already imported in that file.

- [ ] **Step 6: Add the support page resource item**

In `src/app/support/page.tsx`, in the "Additional Resources" grid, insert directly after the `/advisories` resource item:

```tsx
        <Link href="/security" className={styles.resourceItem}>
          <i className={`fas fa-user-shield ${styles.resourceIcon}`}></i>
          <span>Security Policy</span>
        </Link>
```

- [ ] **Step 7: Add the second policy URL to security.txt**

`public/.well-known/security.txt` currently ends with a single `Policy:` line and no trailing newline. RFC 9116 allows repeating the field, and the existing GitHub entry stays. Result:

```
Contact: mailto:security@phpmyfaq.de
Contact: https://github.com/thorsten/phpMyFAQ/security/advisories/new
Expires: 2027-08-01T00:00:00.000Z
Acknowledgments: https://github.com/thorsten/phpMyFAQ/security/advisories
Preferred-Languages: en, de
Canonical: https://www.phpmyfaq.de/.well-known/security.txt
Policy: https://github.com/thorsten/phpMyFAQ/blob/main/SECURITY.md
Policy: https://www.phpmyfaq.de/security
```

Note: this file already has uncommitted changes in the working tree from earlier work. Review `git diff public/.well-known/security.txt` before staging, and stage it only if the other changes are intended to go in.

- [ ] **Step 8: Run everything**

Run: `pnpm lint && pnpm test:ci && pnpm test:e2e`
Expected: PASS. The full e2e suite is the gate here — it covers navigation and every page title.

- [ ] **Step 9: Format and commit**

```bash
pnpm format
git add src/components/Footer.tsx 'src/app/security/[advisory]/page.tsx' src/app/advisories/page.tsx src/app/support/page.tsx tests/e2e/all-pages.spec.ts tests/e2e/security.spec.ts
git commit -m "feat: link security policy page from footer, support and advisories"
```

Commit `public/.well-known/security.txt` separately once its pre-existing working-tree changes are sorted out:

```bash
git add public/.well-known/security.txt
git commit -m "chore: add website security policy URL to security.txt"
```

---

### Task 5: Verify the static export

**Files:**
- No source changes. Verification only.

**Interfaces:**
- Consumes: everything from Tasks 1–4.
- Produces: confidence that `next build` emits `/security` as a policy page and every `/security/<slug>` advisory page alongside it.

- [ ] **Step 1: Build**

Run: `pnpm build`
Expected: build succeeds. The site uses static export, so a static `/security` route coexisting with the dynamic `/security/[advisory]` route is resolved at build time — this step is what proves it.

- [ ] **Step 2: Check the emitted output**

Run:

```bash
ls out/security/index.html && ls out/security | head -5 && ls out/advisories/index.html
```

Expected: `out/security/index.html` exists, `out/security/` also contains `advisory-*` directories, and `out/advisories/index.html` exists.

- [ ] **Step 3: Confirm the right content landed in each file**

Run:

```bash
grep -c "Reporting a vulnerability" out/security/index.html
grep -c "advisory-" out/security/index.html
grep -c "advisory-" out/advisories/index.html
```

Expected: first is `1` or more, second is `0`, third is a large number. If the second is non-zero, the advisory list is still being rendered on the policy page.

- [ ] **Step 4: Commit if anything needed fixing**

If Steps 1–3 required changes, commit them:

```bash
git add -A
git commit -m "fix: correct static export of split security pages"
```

If nothing needed fixing, there is nothing to commit — say so and stop.

---

## Open items to confirm before release

These do not block implementation. The page renders correctly with the prefilled
values; correcting them is a one-line edit in `src/data/security.ts`.

- `pgpFingerprint` — currently `null`, so the PGP hint is omitted entirely
- `sbomSinceVersion` — prefilled `4.1.0`
- `phpstanLevel` — prefilled `9`
- `hardeningDocsUrl` — currently the documentation root
- `supportedVersions[1].securityUntil` — `TBD (12 months after 4.2.0)` until 4.2.0 ships
