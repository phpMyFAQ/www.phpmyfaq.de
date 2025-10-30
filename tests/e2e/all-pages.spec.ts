import { test, expect } from '@playwright/test';

test.describe('All Pages Accessibility Tests', () => {
  const pages = [
    { path: '/', title: 'phpMyFAQ - Open Source FAQ web application for PHP 8.2+' },
    { path: '/download', title: 'Download - phpMyFAQ' },
    { path: '/features', title: 'Features - phpMyFAQ' },
    { path: '/documentation', title: 'Documentation - phpMyFAQ' },
    { path: '/support', title: 'Support - phpMyFAQ' },
    { path: '/requirements', title: 'Requirements - phpMyFAQ' },
    { path: '/changelog', title: 'Changelog - phpMyFAQ' },
    { path: '/advisories', title: 'List of Security Advisories - phpMyFAQ' },
    { path: '/translations', title: 'Translations - phpMyFAQ' },
    { path: '/20years', title: '20 Years phpMyFAQ - phpMyFAQ' },
    { path: '/15years', title: '15 Years phpMyFAQ - phpMyFAQ' },
    { path: '/10years', title: '10 Years phpMyFAQ - phpMyFAQ' },
    { path: '/news', title: 'News archive - phpMyFAQ' },
    { path: '/donations', title: 'Donations - phpMyFAQ' },
    { path: '/references', title: 'Who uses phpMyFAQ? - phpMyFAQ' },
    { path: '/thankyou', title: 'Thank You! - phpMyFAQ' },
    { path: '/terms', title: 'Terms of Service - phpMyFAQ' },
    { path: '/imprint', title: 'Imprint - phpMyFAQ' },
    { path: '/privacy', title: 'Privacy Notice - phpMyFAQ' },
  ];

  for (const { path, title } of pages) {
    test(`${path} loads correctly with proper title`, async ({ page }) => {
      const response = await page.goto(path);

      // Check response status
      expect(response?.status()).toBe(200);

      // Check page title
      await expect(page).toHaveTitle(title);

      // Check no 404 error content
      await expect(page.locator('h1').filter({ hasText: '404' })).not.toBeVisible();
      await expect(page.locator('text=This page could not be found')).not.toBeVisible();

      // Check header is present
      await expect(page.locator('header.header')).toBeVisible();

      // Check footer is present
      await expect(page.locator('footer.footer')).toBeVisible();

      // Check only one header (no duplicates)
      const headerCount = await page.locator('header.header').count();
      expect(headerCount).toBe(1);

      // Check only one footer (no duplicates)
      const footerCount = await page.locator('footer.footer').count();
      expect(footerCount).toBe(1);
    });
  }

  test('all footer links work correctly', async ({ page }) => {
    await page.goto('/');

    const footerLinks = [
      '/requirements',
      '/download',
      '/changelog',
      '/advisories',
      '/translations',
      '/news',
      '/donations',
      '/references',
      '/20years',
      '/15years',
      '/10years',
      '/thankyou',
      '/terms',
      '/imprint',
      '/privacy',
    ];

    for (const link of footerLinks) {
      const response = await page.request.get(link);
      expect([200, 308, 301]).toContain(response.status());
    }
  });

  test('navigation consistency across all pages', async ({ page }) => {
    const navigationPages = ['/features', '/documentation', '/support', '/download'];

    for (const pagePath of navigationPages) {
      await page.goto(pagePath);

      // Scope to the main navigation to avoid ambiguous matches
      const nav = page.getByRole('navigation').first();

      // Check the main navigation links are present
      await expect(nav.getByRole('link', { name: 'Features', exact: true })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Documentation', exact: true })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Support', exact: true })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Download', exact: true })).toBeVisible();

      // Check the logo link works
      await expect(page.locator('a[href="/"] img[alt="Logo of phpMyFAQ"]').first()).toBeVisible();
    }
  });
});
