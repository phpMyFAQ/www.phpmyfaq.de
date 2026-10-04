import { test, expect } from '@playwright/test';

// The redirects come from static/.htaccess; scripts/serve-static.ts applies
// the same rules, so this checks what the production host does.
test.describe('Redirects', () => {
  test('sends the documentation of maintained release lines to Read the Docs', async ({ request }) => {
    const expected = [
      ['/docs/4.2/', 'https://phpmyfaq.readthedocs.io/en/main/'],
      ['/docs/4.1/', 'https://phpmyfaq.readthedocs.io/en/4.1/'],
      ['/docs/4.1', 'https://phpmyfaq.readthedocs.io/en/4.1/'],
      ['/docs/4.0/', 'https://phpmyfaq.readthedocs.io/en/4.0/'],
      ['/docs/3.2/', 'https://phpmyfaq.readthedocs.io/en/3.2/'],
    ];

    for (const [path, location] of expected) {
      const response = await request.get(path, { maxRedirects: 0 });
      expect(response.status(), path).toBe(301);
      expect(response.headers()['location'], path).toBe(location);
    }
  });

  test('leaves the archived documentation alone', async ({ request }) => {
    const response = await request.get('/docs/3.1/', { maxRedirects: 0 });
    expect(response.status()).toBe(200);
  });
});