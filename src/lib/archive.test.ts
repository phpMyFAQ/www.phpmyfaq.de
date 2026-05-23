import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getArchiveReleases, countReleases } from './archive';
import fs from 'fs';
import path from 'path';

vi.mock('fs');
vi.mock('path');

const MOCK_CHANGELOG = `---
title: phpMyFAQ Changelog
---

## phpMyFAQ 4.1.x

### phpMyFAQ 4.1.0-RC.7 - 2026-02-27 {#4.1.0-RC.7}

- pre-release

### phpMyFAQ 4.1.0 - 2026-03-12 {#4.1.0}

- added feature

## phpMyFAQ 2.0.x

### phpMyFAQ 2.0.0 - 2007-05-22 {#2.0.0}

- first 2.x release

## phpMyFAQ 1.6.x

### phpMyFAQ 1.6.0 - 2006-04-21 {#1.6.0}

- legacy release
`;

describe('getArchiveReleases', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(path, 'join').mockReturnValue('/mock/path/changelog/index.md');
    vi.spyOn(fs, 'readFileSync').mockReturnValue(MOCK_CHANGELOG);
  });

  it('excludes versions older than 2.0.0', async () => {
    const groups = await getArchiveReleases();
    const versions = groups.flatMap((g) => g.releases.map((r) => r.version));
    expect(versions).toContain('2.0.0');
    expect(versions).not.toContain('1.6.0');
  });

  it('excludes pre-release versions such as RC builds', async () => {
    const groups = await getArchiveReleases();
    const versions = groups.flatMap((g) => g.releases.map((r) => r.version));
    expect(versions).toContain('4.1.0');
    expect(versions).not.toContain('4.1.0-RC.7');
  });

  it('builds download URLs and changelog anchors for each release', async () => {
    const groups = await getArchiveReleases();
    const release = groups.flatMap((g) => g.releases).find((r) => r.version === '2.0.0');
    expect(release).toBeDefined();
    expect(release?.zipUrl).toBe('https://download.phpmyfaq.de/phpMyFAQ-2.0.0.zip');
    expect(release?.targzUrl).toBe('https://download.phpmyfaq.de/phpMyFAQ-2.0.0.tar.gz');
    expect(release?.changelogAnchor).toBe('2.0.0');
  });

  it('produces a slug without the .x suffix', async () => {
    const groups = await getArchiveReleases();
    expect(groups.map((g) => g.slug)).toContain('4.1');
    expect(groups.map((g) => g.slug)).toContain('2.0');
  });

  it('counts releases across all groups', async () => {
    const groups = await getArchiveReleases();
    expect(countReleases(groups)).toBe(2);
  });
});
