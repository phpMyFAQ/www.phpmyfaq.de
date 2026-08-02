import { describe, it, expect } from 'vitest';
import { renderSupportedVersionsTable, substituteTokens, getSecurityPolicy } from './securityPolicy';
import { supportedVersions, lastReviewed, sbomSinceVersion } from '@/data/security';

describe('renderSupportedVersionsTable', () => {
  it('renders a GFM table with one row per supported version', () => {
    const table = renderSupportedVersionsTable();
    const lines = table.trim().split('\n');

    // header + separator + one row per version
    expect(lines).toHaveLength(supportedVersions.length + 2);
    expect(lines[0]).toBe('| Version | Status | Security fixes until | PHP |');
    expect(lines[1]).toBe('| --- | --- | --- | --- |');
    expect(lines[2]).toBe('| 4.2.x | Active development | — | 8.4+ |');
  });
});

describe('substituteTokens', () => {
  it('replaces known tokens', () => {
    expect(substituteTokens('reviewed {{lastReviewed}}')).toBe(`reviewed ${lastReviewed}`);
    expect(substituteTokens('since {{sbomSinceVersion}}')).toBe(`since ${sbomSinceVersion}`);
  });

  it('expands the supported versions table token', () => {
    expect(substituteTokens('{{supportedVersionsTable}}')).toBe(renderSupportedVersionsTable());
  });

  it('leaves unknown tokens untouched', () => {
    expect(substituteTokens('{{nopeNotAToken}}')).toBe('{{nopeNotAToken}}');
  });
});

describe('getSecurityPolicy', () => {
  it('renders the policy markdown to HTML with no unresolved tokens', () => {
    const policy = getSecurityPolicy();

    expect(policy.content).toContain('<h2');
    expect(policy.content).toContain('<table>');
    expect(policy.content).not.toContain('{{');
  });

  it('exposes frontmatter for page metadata', () => {
    const policy = getSecurityPolicy();

    expect(policy.frontmatter.title).toBe('Security');
    expect(typeof policy.frontmatter.description).toBe('string');
  });
});
