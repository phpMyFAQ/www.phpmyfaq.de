import { test, expect } from '@playwright/test';

test.describe('Error pages', () => {
  test('renders custom 404 page for non-existing route', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    // Next.js may serve 404 with 404 status in dev
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
    await expect(page.getByRole('link', { name: /back to homepage/i })).toHaveAttribute('href', '/');
  });

  test('returns 500 when an error is thrown (UI may be Next dev overlay)', async ({ page }) => {
    const response = await page.goto('/e2e-error-api');
    // In a dev server, Next should return 500 on the error boundary
    expect(response?.status()).toBe(500);
  });
});
