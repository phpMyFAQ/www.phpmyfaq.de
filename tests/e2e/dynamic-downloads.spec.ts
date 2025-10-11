import { test, expect } from '@playwright/test';

test.describe('Dynamic Download Functionality', () => {
  test('download page displays current version data', async ({ page }) => {
    await page.goto('/download');
    await expect(page).toHaveTitle('Download - phpMyFAQ');
    await expect(page.locator('h1')).toContainText('Download phpMyFAQ');
  });

  test('external links work correctly', async ({ page }) => {
    await page.goto('/download');
    const githubLink = page.locator('a[href="https://github.com/thorsten/phpMyFAQ"]').first();
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', 'nofollow');
    const olderVersionsLink = page.locator('a[href="https://github.com/thorsten/phpMyFAQ/releases"]');
    await expect(olderVersionsLink).toBeVisible();
    await expect(olderVersionsLink).toHaveAttribute('target', '_blank');
  });

  test('internal navigation links work', async ({ page }) => {
    await page.goto('/download');
    await page.click('a[href="/requirements"]');
    await expect(page).toHaveURL(/\/requirements\/?$/);
    await expect(page.locator('h1')).toContainText('System Requirements');
    await page.goto('/download');
    await page.click('a[href="/documentation"]');
    await expect(page).toHaveURL(/\/documentation\/?$/);
    await expect(page.locator('h1')).toContainText('Documentation');
    await page.goto('/download');
    await page.click('a[href="/support"]');
    await expect(page).toHaveURL(/\/support\/?$/);
    await expect(page.locator('h1')).toContainText('Support');
  });

  test('responsive design works correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/download');
    const cards = page.locator('.col-lg-6');
    await expect(cards).toHaveCount(2);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await expect(cards.first()).toBeVisible();
    await expect(cards.last()).toBeVisible();
    const downloadButtons = page.locator('.btn').filter({ hasText: 'ZIP' });
    await expect(downloadButtons.first()).toBeVisible();
  });

  test('fallback data works when API data is unavailable', async ({ page }) => {
    await page.goto('/download');
    await expect(page.locator('h1')).toContainText('Download phpMyFAQ');
    await expect(page.locator('.card').filter({ hasText: 'Stable Release' })).toBeVisible();
    await expect(page.locator('.card').filter({ hasText: 'Development Version' })).toBeVisible();
  });
});