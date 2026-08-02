import { describe, it, expect } from 'vitest';
import { getAdvisoriesByYear } from './securityAdvisory';

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