import { describe, it, expect } from 'vitest';
import { buildSecurityAtomFeed, escapeXml } from './securityAtomFeed';
import { getAdvisoriesByYear } from './securityAdvisory';

describe('escapeXml', () => {
  it('escapes all XML special characters', () => {
    expect(escapeXml(`<b>"Fish & Chips" isn't XML</b>`)).toBe(
      '&lt;b&gt;&quot;Fish &amp; Chips&quot; isn&apos;t XML&lt;/b&gt;',
    );
  });
});

describe('buildSecurityAtomFeed', () => {
  const feed = buildSecurityAtomFeed();
  const advisories = getAdvisoriesByYear().flatMap((y) => y.advisories);

  it('produces an Atom 1.0 document with the required feed metadata', () => {
    expect(feed.startsWith('<?xml version="1.0" encoding="utf-8"?>')).toBe(true);
    expect(feed).toContain('<feed xmlns="http://www.w3.org/2005/Atom">');
    expect(feed).toContain('<title>phpMyFAQ Security Advisories</title>');
    expect(feed).toContain('<link rel="self" type="application/atom+xml"');
    expect(feed).toContain('<name>phpMyFAQ Team</name>');
  });

  it('contains one entry per advisory', () => {
    expect(advisories.length).toBeGreaterThan(0);
    expect(feed.match(/<entry>/g)).toHaveLength(advisories.length);
    expect(feed.match(/<\/entry>/g)).toHaveLength(advisories.length);
  });

  it('lists entries newest first and uses the newest date as feed updated', () => {
    const dates = [...feed.matchAll(/<published>(\d{4}-\d{2}-\d{2})T00:00:00Z<\/published>/g)].map((m) => m[1]);
    expect(dates).toHaveLength(advisories.length);
    expect([...dates].sort((a, b) => b.localeCompare(a))).toEqual(dates);
    expect(feed).toContain(`<updated>${dates[0]}T00:00:00Z</updated>`);
  });

  it('links entries to their advisory page with an absolute, trailing-slash URL', () => {
    const { slug } = advisories[0];
    expect(feed).toContain(`<id>http://localhost:3000/security/${slug}/</id>`);
    expect(feed).toContain(`href="http://localhost:3000/security/${slug}/"`);
  });

  it('embeds the advisory body as escaped HTML content', () => {
    expect(feed).toContain('<content type="html">');
    expect(feed).toContain('&lt;h2&gt;');
    expect(feed).not.toContain('<content type="html"><');
  });

  it('leaves no unescaped ampersands behind', () => {
    expect(feed).not.toMatch(/&(?!amp;|lt;|gt;|quot;|apos;|#\d)/);
  });
});
