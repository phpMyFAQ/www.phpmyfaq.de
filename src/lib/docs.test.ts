import { readFileSync } from 'fs';
import { describe, expect, it } from 'vitest';
import { supportedVersions } from '@/data/security';
import { docsUrlFor, documentedLines, isEndOfLife } from './docs';

describe('docsUrlFor', () => {
  it('documents the development line from the main branch and the others from their release branch', () => {
    expect(docsUrlFor('4.2.x')).toBe('https://phpmyfaq.readthedocs.io/en/main/');
    expect(docsUrlFor('4.1')).toBe('https://phpmyfaq.readthedocs.io/en/4.1/');
    expect(docsUrlFor('3.2.x')).toBe('https://phpmyfaq.readthedocs.io/en/3.2/');
  });

  it('throws for a line that is not in the support table', () => {
    expect(() => docsUrlFor('9.9')).toThrow(/9\.9\.x/);
  });

  it('matches the redirects in static/.htaccess', () => {
    const htaccess = readFileSync('static/.htaccess', 'utf-8');
    for (const line of documentedLines()) {
      const pattern = line.version.replace('.', '\\.');
      expect(htaccess).toContain(`RewriteRule ^docs/${pattern}/?$ ${line.url} [R=301,L]`);
    }
  });
});

describe('documentedLines', () => {
  it('lists every supported line in table order with its PHP requirement', () => {
    const lines = documentedLines();
    expect(lines.map((l) => l.version)).toEqual(supportedVersions.map((v) => v.version.replace(/\.x$/, '')));
    expect(lines[0]).toMatchObject({ version: '4.2', php: '8.4+', status: 'Active development' });
  });

  it('tells maintained lines from end-of-life ones', () => {
    const lines = documentedLines();
    expect(lines.filter((l) => !isEndOfLife(l)).map((l) => l.version)).toEqual(['4.2', '4.1']);
    expect(lines.filter(isEndOfLife).map((l) => l.version)).toEqual(['4.0', '3.2']);
  });
});