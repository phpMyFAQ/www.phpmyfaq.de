import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// WCAG 2.1 AA sweep over the main templates. Serious and critical violations
// fail the test; the rest are printed so they can be picked up later.
const pages = [
  '/',
  '/download/',
  '/features/',
  '/documentation/',
  '/support/',
  '/requirements/',
  '/references/',
  '/demo/',
  '/donations/',
  '/changelog/',
  '/archive/',
  '/translations/',
  '/advisories/',
  '/security/',
  '/news/',
  '/news/2026/',
  '/docs/codenames/',
  '/sovereignty/',
  '/theme-builder/',
];

test.describe('Accessibility', () => {
  for (const path of pages) {
    test(`${path} has no serious accessibility violations`, async ({ page }) => {
      await page.goto(path);
      // The theme builder's preview shows whatever colours the visitor picked,
      // starting with phpMyFAQ's defaults; its contrast is reported on the page
      // itself, not something the site can guarantee.
      const builder = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
      if (path === '/theme-builder/') {
        builder.exclude('#pmf-theme-preview');
      }
      const results = await builder.analyze();

      const blocking = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      const minor = results.violations.filter((v) => !blocking.includes(v));
      if (minor.length > 0) {
        console.log(`${path}: ${minor.map((v) => `${v.id} (${v.impact}, ${v.nodes.length} nodes)`).join(', ')}`);
      }

      expect(
        blocking.map((v) => `${v.id}: ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).join('\n  ')}`),
      ).toEqual([]);
    });
  }
});