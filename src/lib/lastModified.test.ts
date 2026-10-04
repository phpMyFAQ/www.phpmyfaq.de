import { describe, it, expect } from 'vitest';
import { lastCommitDate } from './lastModified';

describe('lastCommitDate', () => {
  it('returns the commit date of a tracked file', () => {
    const date = lastCommitDate('package.json');
    expect(date).toBeInstanceOf(Date);
    expect(date!.getTime()).toBeLessThanOrEqual(Date.now());
  });

  it('returns null for a file without history', () => {
    expect(lastCommitDate('this/file/does/not/exist.md')).toBeNull();
  });
});