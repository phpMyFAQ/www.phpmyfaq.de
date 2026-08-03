import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';
import { isDevelopmentAhead } from '../../src/lib/data';

// The development card is only rendered while the development channel is
// ahead of the stable release, so derive the expectation from the same data
// the page is built from.
const versions = JSON.parse(readFileSync(join(process.cwd(), 'data', 'versions.json'), 'utf-8'));
const developmentShown = isDevelopmentAhead(versions.development, versions.stable);

test.describe('Dynamic Download Functionality', () => {
  test('download page displays current version data', async ({ page }) => {
    await page.goto('/download');
    await expect(page).toHaveTitle('Download - phpMyFAQ');
    await expect(page.locator('h1')).toContainText('Download phpMyFAQ');
  });

  test('external links work correctly', async ({ page }) => {
    await page.goto('/download');
    const githubLink = page.locator('.social-icons a[href="https://github.com/thorsten/phpMyFAQ"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', 'nofollow');
    // next/link honours trailingSlash: true, so accept both forms
    const archiveLink = page.locator('.older-versions-box a[href="/archive"], .older-versions-box a[href="/archive/"]');
    await expect(archiveLink).toBeVisible();
  });

  test('internal navigation links work', async ({ page }) => {
    await page.goto('/download');
    await page.click('a[href="/requirements"], a[href="/requirements/"]');
    await expect(page).toHaveURL(/\/requirements\/?$/);
    await expect(page.locator('h1')).toContainText('System Requirements');
    await page.goto('/download');
    await page.click('a[href="/documentation"], a[href="/documentation/"]');
    await expect(page).toHaveURL(/\/documentation\/?$/);
    await expect(page.locator('h1')).toContainText('Documentation');
    await page.goto('/download');
    await page.click('a[href="/support"], a[href="/support/"]');
    await expect(page).toHaveURL(/\/support\/?$/);
    await expect(page.locator('h1')).toContainText('Support');
  });

  test('responsive design works correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/download');
    const cards = page.locator('.col-lg-6');
    await expect(cards).toHaveCount(developmentShown ? 2 : 1);
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
    const developmentCard = page.locator('.card').filter({ hasText: 'Development Version' });
    if (developmentShown) {
      await expect(developmentCard).toBeVisible();
    } else {
      await expect(developmentCard).toHaveCount(0);
    }
  });
});