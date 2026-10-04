import { test, expect } from '@playwright/test';

// The site is a static export, so the only error page the host can serve is
// 404.html. Runtime errors inside the app are covered by src/test/error-pages.test.tsx.
test.describe('Error pages', () => {
  test('renders custom 404 page for non-existing route', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
    await expect(page.getByRole('link', { name: /back to homepage/i })).toHaveAttribute('href', '/');
  });
});