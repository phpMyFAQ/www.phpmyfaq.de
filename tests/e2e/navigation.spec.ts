import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/phpMyFAQ/);
    await expect(page.locator('h2.title')).toContainText('phpMyFAQ 4.0');
    await expect(page.locator('p.intro')).toContainText('phpMyFAQ is a mobile-friendly');
    await expect(page.locator('.promo a[href="/demo"], .promo a[href="/demo/"]')).toBeVisible();
    await expect(page.locator('.promo a[href="/download"], .promo a[href="/download/"]')).toBeVisible();
  });

  test('navigation links work correctly', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation').first();
    await nav.getByRole('link', { name: 'Features', exact: true }).click();
    await expect(page).toHaveURL(/\/features\/?$/);
    await expect(page.locator('h1')).toContainText('phpMyFAQ Features');
    await nav.getByRole('link', { name: 'Documentation', exact: true }).click();
    await expect(page).toHaveURL(/\/documentation\/?$/);
    await expect(page.locator('h1')).toContainText('Documentation');
    await nav.getByRole('link', { name: 'Support', exact: true }).click();
    await expect(page).toHaveURL(/\/support\/?$/);
    await expect(page.locator('h1')).toContainText('Support');
    await nav.getByRole('link', { name: 'Download', exact: true }).click();
    await expect(page).toHaveURL(/\/download\/?$/);
    await expect(page.locator('h1')).toContainText('Download phpMyFAQ');
  });

  test('logo navigation works', async ({ page }) => {
    await page.goto('/features');
    await page.click('a[href="/"] img[alt="Logo of phpMyFAQ"]');
    await expect(page).toHaveURL('/');
    await expect(page.locator('h2.title')).toContainText('phpMyFAQ 4.0');
  });

  test('footer links are present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h3').filter({ hasText: 'Getting started' })).toBeVisible();
    await expect(page.locator('h3').filter({ hasText: 'Resources' })).toBeVisible();
    await expect(page.locator('h3').filter({ hasText: 'Misc' })).toBeVisible();
    await expect(page.locator('.social-icons a[aria-label="phpMyFAQ at Github"]')).toBeVisible();
    await expect(page.locator('a[href="https://www.facebook.com/phpMyFAQ/"]')).toBeVisible();
    await expect(page.locator('a[href="https://discord.gg/wszhTceuNM"]')).toBeVisible();
    await expect(page.locator('a[href="mailto:thorsten@phpmyfaq.de"]')).toBeVisible();
  });
});
