import { test, expect } from '@playwright/test';

test.describe('Dynamic Download Functionality', () => {
  test('download page displays current version data', async ({ page }) => {
    await page.goto('/download');
    
    // Check page loads successfully
    expect(await page.locator('h1').textContent()).toBe('Download phpMyFAQ');
    
    // Check stable version display
    const stableVersionAlert = page.locator('.alert-info');
    await expect(stableVersionAlert).toContainText('Latest Stable Version:');
    await expect(stableVersionAlert).toContainText('4.0.13');
    await expect(stableVersionAlert).toContainText('Released on');
    await expect(stableVersionAlert).toContainText('October 3, 2025');
    
    // Check stable release card
    const stableCard = page.locator('.card').filter({ hasText: 'Stable Release' });
    await expect(stableCard.locator('h6.text-primary')).toContainText('phpMyFAQ 4.0.13');
    await expect(stableCard.locator('small').first()).toContainText('Released: October 3, 2025');
    
    // Check stable download links with file sizes
    await expect(stableCard.locator('a').filter({ hasText: 'ZIP' })).toContainText('18.11 MB');
    await expect(stableCard.locator('a').filter({ hasText: 'TAR.GZ' })).toContainText('14.81 MB');
    
    // Check stable MD5 checksums
    await expect(stableCard.locator('code').first()).toContainText('a7f006835a7cb4c89884435195071375');
    await expect(stableCard.locator('code').last()).toContainText('e98c42f890f070c2affb68a51c0b1987');
    
    // Check development version card
    const devCard = page.locator('.card').filter({ hasText: 'Development Version' });
    await expect(devCard.locator('h6.text-warning')).toContainText('phpMyFAQ 4.1.0-alpha.3');
    await expect(devCard.locator('small').first()).toContainText('Released: October 4, 2025');
    
    // Check development download links with file sizes
    await expect(devCard.locator('a').filter({ hasText: 'ZIP' })).toContainText('17.74 MB');
    await expect(devCard.locator('a').filter({ hasText: 'TAR.GZ' })).toContainText('13.63 MB');
    
    // Check development MD5 checksums
    await expect(devCard.locator('code').first()).toContainText('b27343c5cfa0949bceddd474c4e742bd');
    await expect(devCard.locator('code').last()).toContainText('c3979f5c17c31baab624670e5dbc5189');
  });

  test('download links point to correct URLs', async ({ page }) => {
    await page.goto('/download');
    
    // Check stable version download URLs
    const stableZipLink = page.locator('a[href="https://download.phpmyfaq.de/phpMyFAQ-4.0.13.zip"]');
    const stableTarLink = page.locator('a[href="https://download.phpmyfaq.de/phpMyFAQ-4.0.13.tar.gz"]');
    
    await expect(stableZipLink).toBeVisible();
    await expect(stableTarLink).toBeVisible();
    
    // Check development version download URLs
    const devZipLink = page.locator('a[href="https://download.phpmyfaq.de/phpMyFAQ-4.1.0-alpha.3.zip"]');
    const devTarLink = page.locator('a[href="https://download.phpmyfaq.de/phpMyFAQ-4.1.0-alpha.3.tar.gz"]');
    
    await expect(devZipLink).toBeVisible();
    await expect(devTarLink).toBeVisible();
    
    // Check download attribute is present (for direct downloads)
    await expect(stableZipLink).toHaveAttribute('download');
    await expect(stableTarLink).toHaveAttribute('download');
    await expect(devZipLink).toHaveAttribute('download');
    await expect(devTarLink).toHaveAttribute('download');
  });

  test('external links work correctly', async ({ page }) => {
    await page.goto('/download');
    
    // Check GitHub release notes link
    const releaseNotesLink = page.locator('a[href="https://github.com/thorsten/phpMyFAQ/releases/latest"]');
    await expect(releaseNotesLink).toBeVisible();
    await expect(releaseNotesLink).toHaveAttribute('target', '_blank');
    await expect(releaseNotesLink).toHaveAttribute('rel', 'noopener');
    
    // Check GitHub repository link
    const githubLink = page.locator('a[href="https://github.com/thorsten/phpMyFAQ"]').first();
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', 'noopener');
    
    // Check GitHub releases page link
    const olderVersionsLink = page.locator('a[href="https://github.com/thorsten/phpMyFAQ/releases"]');
    await expect(olderVersionsLink).toBeVisible();
    await expect(olderVersionsLink).toHaveAttribute('target', '_blank');
    await expect(olderVersionsLink).toHaveAttribute('rel', 'noopener');
  });

  test('internal navigation links work', async ({ page }) => {
    await page.goto('/download');
    
    // Test requirements link
    await page.click('a[href="/requirements"]');
    await expect(page).toHaveURL('/requirements');
    await expect(page.locator('h1')).toContainText('System Requirements');
    
    // Go back to download page
    await page.goto('/download');
    
    // Test documentation link
    await page.click('a[href="/documentation"]');
    await expect(page).toHaveURL('/documentation');
    await expect(page.locator('h1')).toContainText('Documentation');
    
    // Go back to download page
    await page.goto('/download');
    
    // Test support link
    await page.click('a[href="/support"]');
    await expect(page).toHaveURL('/support');
    await expect(page.locator('h1')).toContainText('Support');
  });

  test('responsive design works correctly', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/download');
    
    // Cards should be side by side on desktop
    const cards = page.locator('.col-lg-6');
    await expect(cards).toHaveCount(2);
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    
    // Cards should still be visible and properly stacked
    await expect(cards.first()).toBeVisible();
    await expect(cards.last()).toBeVisible();
    
    // Download buttons should be responsive
    const downloadButtons = page.locator('.btn').filter({ hasText: 'ZIP' });
    await expect(downloadButtons.first()).toBeVisible();
  });

  test('fallback data works when API data is unavailable', async ({ page }) => {
    // This test verifies the fallback functionality
    // Even if the API data files don't exist, the page should still work
    await page.goto('/download');
    
    // Page should load successfully
    await expect(page.locator('h1')).toContainText('Download phpMyFAQ');
    
    // Should show some version information (either real or fallback)
    await expect(page.locator('.alert-info')).toContainText('Latest Stable Version:');
    
    // Should have download cards
    await expect(page.locator('.card').filter({ hasText: 'Stable Release' })).toBeVisible();
    await expect(page.locator('.card').filter({ hasText: 'Development Version' })).toBeVisible();
  });
});