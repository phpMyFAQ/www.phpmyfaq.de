import { test, expect } from '@playwright/test';

// The index is produced by the Pagefind binary during the build. Where that
// binary cannot run (see scripts/build-search-index.ts) there is nothing to
// test against, so the suite skips instead of failing.
test.describe('Site search', () => {
  test.beforeEach(async ({ request }) => {
    const entry = await request.get('/pagefind/pagefind-entry.json');
    test.skip(entry.status() !== 200, 'No Pagefind index in this build');
  });

  test('finds pages and offers a section filter', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Search the site' }).click();

    const input = page.getByPlaceholder('Search phpMyFAQ.de');
    await expect(input).toBeFocused();
    await input.fill('LDAP');

    const results = page.locator('.pagefind-ui__result');
    await expect(results.first()).toBeVisible();
    await expect(page.locator('.pagefind-ui__filter-name').first()).toContainText(/section/i);

    const firstLink = results.first().locator('.pagefind-ui__result-link');
    const href = await firstLink.getAttribute('href');
    expect(href).toMatch(/^\//);
  });

  test('opens with the slash key and closes with Escape', async ({ page }) => {
    await page.goto('/download');
    await page.keyboard.press('/');
    await expect(page.getByRole('dialog', { name: 'Search phpMyFAQ.de' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog', { name: 'Search phpMyFAQ.de' })).toBeHidden();
  });

  test('the 404 page and the homepage are not indexed', async ({ request }) => {
    const entry = await request.get('/pagefind/pagefind-entry.json');
    expect(entry.status()).toBe(200);
    // Pagefind indexes only data-pagefind-body elements; these two pages have none.
    const notFound = await request.get('/404.html');
    expect(await notFound.text()).not.toContain('data-pagefind-body');
    const home = await request.get('/');
    expect(await home.text()).not.toContain('data-pagefind-body');
  });
});