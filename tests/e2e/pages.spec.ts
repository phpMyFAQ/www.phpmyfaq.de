import { test, expect } from '@playwright/test';

test.describe('Page Content Tests', () => {
  test('download page displays correctly', async ({ page }) => {
    await page.goto('/download');
    
    // Check page title and heading
    await expect(page).toHaveTitle('Download - phpMyFAQ');
    await expect(page.locator('h1')).toContainText('Download phpMyFAQ');
    
    // Check download buttons in main content
    await expect(page.locator('a[href="https://github.com/thorsten/phpMyFAQ/releases/latest"]')).toBeVisible();
    await expect(page.locator('.card a[href="https://github.com/thorsten/phpMyFAQ"]')).toBeVisible();
    
    // Check version info
    await expect(page.locator('.alert-info')).toContainText('Latest Stable Version: 4.0.13');
  });

  test('features page displays correctly', async ({ page }) => {
    await page.goto('/features');
    
    // Check page title
    await expect(page).toHaveTitle('Features - phpMyFAQ');
    await expect(page.locator('h1')).toContainText('phpMyFAQ Features');
    
    // Check features lists
    await expect(page.locator('h3').filter({ hasText: 'Core Features' })).toBeVisible();
    await expect(page.locator('h3').filter({ hasText: 'Advanced Features' })).toBeVisible();
    
    // Check news section
    await expect(page.locator('h2').filter({ hasText: 'Latest phpMyFAQ news' })).toBeVisible();
  });

  test('documentation page displays correctly', async ({ page }) => {
    await page.goto('/documentation');
    
    // Check page title
    await expect(page).toHaveTitle('Documentation - phpMyFAQ');
    await expect(page.locator('h1')).toContainText('Documentation');
    
    // Check documentation sections
    await expect(page.locator('h5').filter({ hasText: 'Getting Started' })).toBeVisible();
    await expect(page.locator('h5').filter({ hasText: 'User Guide' })).toBeVisible();
    await expect(page.locator('h5').filter({ hasText: 'Developer Resources' })).toBeVisible();
  });

  test('support page displays correctly', async ({ page }) => {
    await page.goto('/support');
    
    // Check page title
    await expect(page).toHaveTitle('Support - phpMyFAQ');
    await expect(page.locator('h1')).toContainText('Support');
    
    // Check support sections
    await expect(page.locator('h5').filter({ hasText: 'Community Support' })).toBeVisible();
    await expect(page.locator('h5').filter({ hasText: 'Professional Support' })).toBeVisible();
    
    // Check FAQ accordion
    await expect(page.locator('#supportAccordion')).toBeVisible();
  });

  test('all pages return 200 status (no 404 errors)', async ({ page }) => {
    const pages = ['/', '/download', '/features', '/documentation', '/support'];
    
    for (const pagePath of pages) {
      const response = await page.goto(pagePath);
      expect(response?.status()).toBe(200);
      
      // Ensure we don't see 404 error content
      await expect(page.locator('h1').filter({ hasText: '404' })).not.toBeVisible();
      await expect(page.locator('text=This page could not be found')).not.toBeVisible();
    }
  });

  test('favicon loads correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check that favicon request returns 200
    const faviconResponse = await page.request.get('/favicon.ico');
    expect(faviconResponse.status()).toBe(200);
  });
});