import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/phpMyFAQ/);
    
    // Check main heading
    await expect(page.locator('h2.title')).toContainText('phpMyFAQ 4.0');
    
    // Check intro text
    await expect(page.locator('p.intro')).toContainText('phpMyFAQ is a mobile-friendly');
    
    // Check demo button
    await expect(page.locator('a[href="http://demo.phpmyfaq.de/"]')).toBeVisible();
    
    // Check download button in hero section
    await expect(page.locator('.promo a[href="/download"]')).toBeVisible();
  });

  test('navigation links work correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test Features navigation
    await page.click('a[href="/features"]');
    await expect(page).toHaveURL('/features');
    await expect(page.locator('h1')).toContainText('phpMyFAQ Features');
    
    // Test Documentation navigation
    await page.click('a[href="/documentation"]');
    await expect(page).toHaveURL('/documentation');
    await expect(page.locator('h1')).toContainText('Documentation');
    
    // Test Support navigation
    await page.click('a[href="/support"]');
    await expect(page).toHaveURL('/support');
    await expect(page.locator('h1')).toContainText('Support');
    
    // Test Download navigation
    await page.click('a[href="/download"]');
    await expect(page).toHaveURL('/download');
    await expect(page.locator('h1')).toContainText('Download phpMyFAQ');
  });

  test('logo navigation works', async ({ page }) => {
    await page.goto('/features');
    
    // Click logo to go back to homepage
    await page.click('a[href="/"] img[alt="Logo of phpMyFAQ"]');
    await expect(page).toHaveURL('/');
    await expect(page.locator('h2.title')).toContainText('phpMyFAQ 4.0');
  });

  test('footer links are present', async ({ page }) => {
    await page.goto('/');
    
    // Check footer sections
    await expect(page.locator('h3').filter({ hasText: 'Getting started' })).toBeVisible();
    await expect(page.locator('h3').filter({ hasText: 'Resources' })).toBeVisible();
    await expect(page.locator('h3').filter({ hasText: 'Misc' })).toBeVisible();
    
    // Check social icons in footer
    await expect(page.locator('.social-icons a[aria-label="phpMyFAQ at Github"]')).toBeVisible();
    await expect(page.locator('a[href="https://www.facebook.com/phpMyFAQ/"]')).toBeVisible();
    await expect(page.locator('a[href="https://discord.gg/wszhTceuNM"]')).toBeVisible();
    await expect(page.locator('a[href="mailto:thorsten@phpmyfaq.de"]')).toBeVisible();
  });
});