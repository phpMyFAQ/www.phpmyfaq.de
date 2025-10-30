import { describe, it, expect } from 'vitest';
import { parseAdvisoryToHTML } from '@/lib/securityAdvisory';

describe('parseAdvisoryContent', () => {
  it('groups metadata lines into a single dl with correct dt/dd pairs', () => {
    const md = `## Vulnerability in phpMyFAQ version 1.4.0
                        **Issued on::** 2004-07-27
                        **Software::** phpMyFAQ version 1.4.0
                        **Risk::** medium
                        **Platforms::** all

                    The phpMyFAQ Team has learned of a security vulnerability in phpMyFAQ version 1.4.0.
`;

    const html = parseAdvisoryToHTML(md);

    expect(html).toContain('<h2>Vulnerability in phpMyFAQ version 1.4.0</h2>');
    expect(html).toContain('<dl class="dl-horizontal">');
    expect(html).toContain('<dt>Issued on:</dt><dd>2004-07-27</dd>');
    expect(html).toContain('<dt>Software:</dt><dd>phpMyFAQ version 1.4.0</dd>');
    expect(html).toContain('<dt>Risk:</dt><dd>medium</dd>');
    expect(html).toContain('<dt>Platforms:</dt><dd>all</dd>');
  });
});
