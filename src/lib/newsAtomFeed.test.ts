import { describe, it, expect } from 'vitest';
import { buildNewsAtomFeed, newsEntryHtml, newsEntryTitle, NEWS_FEED_LIMIT } from './newsAtomFeed';
import { getRecentNews } from './news';

describe('newsEntryTitle', () => {
  it('uses the first sentence with links and emphasis stripped', () => {
    const content =
      'The phpMyFAQ Team is pleased to announce [phpMyFAQ 4.1.9](/download), the **"Dolly Parton"** release.\nIt fixes bugs.';
    expect(newsEntryTitle(content)).toBe(
      'The phpMyFAQ Team is pleased to announce phpMyFAQ 4.1.9, the "Dolly Parton" release.',
    );
  });

  it('does not cut at a dot inside a version number', () => {
    expect(newsEntryTitle('Released phpMyFAQ 4.1.9 today! More soon.')).toBe('Released phpMyFAQ 4.1.9 today!');
  });

  it('truncates very long first sentences', () => {
    const title = newsEntryTitle(`${'word '.repeat(60)}end.`);
    expect(title.length).toBeLessThanOrEqual(140);
    expect(title.endsWith('…')).toBe(true);
  });
});

describe('newsEntryHtml', () => {
  it('renders Markdown and makes root-relative links absolute', () => {
    const html = newsEntryHtml(
      'See [downloads](/download) and [docs](https://docs.example/) or [cdn](//cdn.example/).',
      'https://www.phpmyfaq.de',
    );
    expect(html).toContain('href="https://www.phpmyfaq.de/download"');
    expect(html).toContain('href="https://docs.example/"');
    expect(html).toContain('href="//cdn.example/"');
  });
});

describe('buildNewsAtomFeed', () => {
  const feed = buildNewsAtomFeed();
  const items = getRecentNews(NEWS_FEED_LIMIT);

  it('produces an Atom 1.0 document with the required feed metadata', () => {
    expect(feed.startsWith('<?xml version="1.0" encoding="utf-8"?>')).toBe(true);
    expect(feed).toContain('<feed xmlns="http://www.w3.org/2005/Atom">');
    expect(feed).toContain('<title>phpMyFAQ News</title>');
    expect(feed).toContain('<link rel="self" type="application/atom+xml" href="http://localhost:3000/news/atom.xml"/>');
    expect(feed).toContain('<name>phpMyFAQ Team</name>');
  });

  it('contains one entry per recent news item', () => {
    expect(items.length).toBeGreaterThan(0);
    expect(feed.match(/<entry>/g)).toHaveLength(items.length);
  });

  it('lists entries newest first and uses the newest date as feed updated', () => {
    const dates = [...feed.matchAll(/<published>(\d{4}-\d{2}-\d{2})T00:00:00Z<\/published>/g)].map((m) => m[1]);
    expect([...dates].sort((a, b) => b.localeCompare(a))).toEqual(dates);
    expect(feed).toContain(`<updated>${dates[0]}T00:00:00Z</updated>`);
  });

  it('links entries to the date anchor on the year page with unique ids', () => {
    const { date } = items[0];
    expect(feed).toContain(`href="http://localhost:3000/news/${date.slice(0, 4)}/#${date}"`);
    const ids = [...feed.matchAll(/<id>([^<]+)<\/id>/g)].map((m) => m[1]);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('leaves no unescaped ampersands behind', () => {
    expect(feed).not.toMatch(/&(?!amp;|lt;|gt;|quot;|apos;|#\d)/);
  });
});