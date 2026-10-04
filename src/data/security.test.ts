import { describe, it, expect } from 'vitest';
import { phpMinimumFor, phpRequirementFor, supportedPhpVersionsFor, supportedVersions } from './security';

describe('phpRequirementFor', () => {
  it('maps a release to the PHP requirement of its line', () => {
    expect(phpRequirementFor('4.1.9')).toBe('8.3+');
    expect(phpRequirementFor('4.2.0-beta')).toBe('8.4+');
  });

  it('throws for a line that is missing or has no requirement', () => {
    expect(() => phpRequirementFor('9.9.0')).toThrow(/9\.9\.x/);
    expect(supportedVersions.find((v) => v.version === '3.2.x')?.php).toBe('—');
    expect(() => phpRequirementFor('3.2.10')).toThrow(/3\.2\.x/);
  });
});
describe('phpMinimumFor', () => {
  it('drops the trailing plus', () => {
    expect(phpMinimumFor('4.1.9')).toBe('8.3');
  });
});

describe('supportedPhpVersionsFor', () => {
  it('lists every minor version from the requirement up to the latest supported one', () => {
    expect(supportedPhpVersionsFor('4.1.9')).toEqual(['8.3', '8.4', '8.5', '8.6']);
    expect(supportedPhpVersionsFor('4.2.0-beta')).toEqual(['8.4', '8.5', '8.6']);
  });

  it('throws when the range cannot be expressed', () => {
    expect(() => supportedPhpVersionsFor('9.9.0')).toThrow(/9\.9\.x/);
  });
});