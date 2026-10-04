import { describe, it, expect } from 'vitest';
import { getAdvisoriesByYear, getAdvisorySlugs } from './securityAdvisory';

describe('getAdvisorySlugs', () => {
  it('lists every advisory file without its extension and skips the policy', () => {
    const slugs = getAdvisorySlugs();

    expect(slugs.length).toBeGreaterThan(0);
    expect(slugs).toContain('advisory-2022-12-11');
    expect(slugs).not.toContain('policy');
    expect(slugs.every((slug) => /^advisory-\d{4}-\d{2}-\d{2}/.test(slug))).toBe(true);
  });
});

describe('getAdvisoriesByYear', () => {
  it('returns advisories grouped by year, newest year first', () => {
    const years = getAdvisoriesByYear();

    expect(years.length).toBeGreaterThan(0);
    const labels = years.map((y) => y.year);
    expect([...labels].sort((a, b) => b.localeCompare(a))).toEqual(labels);
  });

  it('ignores non-advisory markdown in content/security', () => {
    const slugs = getAdvisoriesByYear().flatMap((y) => y.advisories.map((a) => a.slug));

    expect(slugs).not.toContain('policy');
    expect(slugs.every((slug) => slug.startsWith('advisory-'))).toBe(true);
  });

  it('has no "Unknown" year bucket', () => {
    expect(getAdvisoriesByYear().map((y) => y.year)).not.toContain('Unknown');
  });
});