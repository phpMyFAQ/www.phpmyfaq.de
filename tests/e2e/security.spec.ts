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
