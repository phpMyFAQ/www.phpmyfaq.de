import { test, expect } from '@playwright/test';

test.describe('Theme builder', () => {
  test('edits a colour, exports it and downloads theme.css', async ({ page }) => {
    await page.goto('/theme-builder/');
    await page.getByLabel('Primary hex value').fill('#ff6600');

    const preview = page.getByTestId('theme-preview');
    await expect(preview).toHaveAttribute('data-bs-theme', 'light');
    const primaryButton = preview.getByRole('button', { name: 'Search' });
    await expect(primaryButton).toHaveCSS('background-color', 'rgb(255, 102, 0)');

    await expect(page.getByLabel('Custom CSS')).toHaveValue(/--bs-primary: #ff6600;/);
    await expect(page).toHaveURL(/#v1\./);

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download theme.css' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('theme.css');
  });

  test('restores a shared theme from the URL without a hydration error and resets', async ({ page, context }) => {
    await page.goto('/theme-builder/');
    await page.getByLabel('Danger hex value').fill('#aa0000');
    // The URL is written debounced.
    await expect(page).toHaveURL(/#v1\./);
    const url = page.url();

    // A fresh page is a real document load; goto() on the same URL would only
    // be a fragment navigation served from the in-memory state.
    const shared = await context.newPage();
    const pageErrors: string[] = [];
    shared.on('pageerror', (error) => pageErrors.push(error.message));
    await shared.goto(url);
    await expect(shared.getByLabel('Danger hex value')).toHaveValue('#aa0000');
    expect(pageErrors).toEqual([]);

    await shared.getByRole('button', { name: 'Reset to phpMyFAQ defaults' }).click();
    await expect(shared.getByLabel('Danger hex value')).toHaveValue('#f01704');
    await expect(shared).toHaveURL(/\/theme-builder\/$/);
  });
});