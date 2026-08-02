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

  test('the breadcrumb on an advisory detail page navigates back to the advisory list', async ({ page }) => {
    await page.goto('/advisories');
    const first = page.locator('a[href^="/security/advisory-"]').first();
    const href = await first.getAttribute('href');
    await page.goto(href as string);

    const breadcrumb = page.getByRole('navigation', { name: 'breadcrumb' });
    const breadcrumbLink = breadcrumb.locator('a[href="/advisories"], a[href="/advisories/"]');
    await expect(breadcrumbLink).toHaveText('Security Advisories');

    await breadcrumbLink.click();
    await expect(page).toHaveURL(/\/advisories\/?$/);
    await expect(page.getByRole('heading', { level: 1, name: 'List of Security Advisories' })).toBeVisible();
  });

  test('the homepage footer links to both the policy and the advisory list', async ({ page }) => {
    await page.goto('/');

    // Scope to the footer links region itself (Footer.tsx's <section> holding the "Getting started" /
    // "Resources" / "Misc" link lists), identified via its visually-hidden heading. This is deliberately
    // narrower than the page-wide search used before review: a link matching elsewhere on the homepage
    // (e.g. moved into the header nav) must NOT satisfy this assertion.
    const footerLinksRegion = page.locator('section', { has: page.getByText('Other interesting links') });

    // next/link appends a trailing slash (trailingSlash: true in next.config.mjs), so match both forms —
    // same pattern already used in tests/e2e/navigation.spec.ts.
    await expect(footerLinksRegion.locator('a[href="/security"], a[href="/security/"]').first()).toBeVisible();
    await expect(footerLinksRegion.locator('a[href="/advisories"], a[href="/advisories/"]').first()).toBeVisible();
  });
});