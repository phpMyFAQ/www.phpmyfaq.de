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

  test('restores a shared theme from the URL and resets', async ({ page }) => {
    await page.goto('/theme-builder/');
    await page.getByLabel('Danger hex value').fill('#aa0000');
    const url = page.url();
    await page.goto(url);
    await expect(page.getByLabel('Danger hex value')).toHaveValue('#aa0000');
    await page.getByRole('button', { name: 'Reset to phpMyFAQ defaults' }).click();
    await expect(page.getByLabel('Danger hex value')).toHaveValue('#f01704');
  });
});