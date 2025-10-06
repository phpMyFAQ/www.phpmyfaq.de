import { test, expect } from '@playwright/test'

// Test all news years from 2001 to 2025
const years = Array.from({ length: 25 }, (_, i) => 2001 + i)

test.describe('News Pages', () => {
  test('news index page should load', async ({ page }) => {
    await page.goto('/news')

    // Check title
    await expect(page.locator('h1')).toContainText('News')

    // Check that year links are present
    for (const year of years) {
      await expect(page.getByRole('link', { name: year.toString() })).toBeVisible()
    }
  })

  for (const year of years) {
    test(`news page for ${year} should load and display content`, async ({ page }) => {
      await page.goto(`/news/${year}`)

      // Check title
      await expect(page.locator('h1')).toContainText(`phpMyFAQ news from ${year}`)

      // Check breadcrumb
      await expect(page.locator('nav[aria-label="breadcrumb"]')).toBeVisible()
      await expect(page.getByRole('link', { name: 'News' })).toBeVisible()
      await expect(page.locator('.breadcrumb-item.active')).toContainText(year.toString())

      // Check that at least one date header (h3) exists
      const dateHeaders = page.locator('h3')
      await expect(dateHeaders.first()).toBeVisible()

      // Check that the date format is YYYY-MM-DD
      const firstDateText = await dateHeaders.first().textContent()
      expect(firstDateText).toMatch(/^\d{4}-\d{2}-\d{2}$/)

      // Check that content exists (at least one paragraph)
      const paragraphs = page.locator('p')
      await expect(paragraphs.first()).toBeVisible()

      // Check that there's at least one horizontal rule (separator)
      const separators = page.locator('hr')
      await expect(separators.first()).toBeVisible()
    })
  }

  test('invalid year should return 404', async ({ page }) => {
    const response = await page.goto('/news/1999')
    expect(response?.status()).toBe(404)
  })

  test('future year beyond 2025 should return 404', async ({ page }) => {
    const response = await page.goto('/news/2026')
    expect(response?.status()).toBe(404)
  })

  test('non-numeric year should return 404', async ({ page }) => {
    const response = await page.goto('/news/abcd')
    expect(response?.status()).toBe(404)
  })

  test('news links should be clickable and open in new tab', async ({ page }) => {
    // Test 2019 which has download links
    await page.goto('/news/2019')

    // Find links (they should have target="_blank")
    const links = page.locator('a[href^="/"]').filter({ hasText: /download|phpMyFAQ/ })
    if (await links.count() > 0) {
      const firstLink = links.first()
      await expect(firstLink).toHaveAttribute('target', '_blank')
      await expect(firstLink).toHaveAttribute('rel', 'noopener')
    }
  })

  test('older years (2001-2010) with bold date format should display correctly', async ({ page }) => {
    // Test 2001 which uses **YYYY-MM-DD** format
    await page.goto('/news/2001')

    // Check that content is displayed
    await expect(page.locator('h1')).toContainText('phpMyFAQ news from 2001')

    // Check for date headers
    const dateHeaders = page.locator('h3')
    await expect(dateHeaders.first()).toBeVisible()

    // Verify the first date is from 2001
    const firstDateText = await dateHeaders.first().textContent()
    expect(firstDateText).toMatch(/^2001-/)
  })

  test('newer years (2020+) with ### format should display correctly', async ({ page }) => {
    // Test 2020 which might use ###YYYY-MM-DD format
    await page.goto('/news/2020')

    // Check that content is displayed
    await expect(page.locator('h1')).toContainText('phpMyFAQ news from 2020')

    // Check for date headers
    const dateHeaders = page.locator('h3')
    await expect(dateHeaders.first()).toBeVisible()

    // Verify the first date is from 2020
    const firstDateText = await dateHeaders.first().textContent()
    expect(firstDateText).toMatch(/^2020-/)
  })
})
