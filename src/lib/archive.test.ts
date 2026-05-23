import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getArchiveReleases, countReleases, countDownloadableReleases } from './archive';
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

## phpMyFAQ 1.2.x

### phpMyFAQ 1.2.5b - 2003-03-24 {#1.2.5b}

- legacy zip-only release

### phpMyFAQ 1.2.0 - 2002-10-09 {#1.2.0}

- oldest downloadable release

## phpMyFAQ 1.1.x

### phpMyFAQ 1.1.0 - 2002-02-11 {#1.1.0}

- reference-only release

## phpMyFAQ 0.x

### phpMyFAQ 0.1 - 2001-02-12 {#0.1}

- the very first build
`;

describe('getArchiveReleases', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(path, 'join').mockReturnValue('/mock/path/changelog/index.md');
    vi.spyOn(fs, 'readFileSync').mockReturnValue(MOCK_CHANGELOG);
  });

  it('includes releases down to 1.2.0', async () => {
    const groups = await getArchiveReleases();
    const versions = groups.flatMap((g) => g.releases.map((r) => r.version));
    expect(versions).toContain('1.2.0');
    expect(versions).toContain('1.2.5b');
  });

  it('lists 0.x, 1.0 and 1.1 releases for reference but without downloads', async () => {
    const groups = await getArchiveReleases();
    const v110 = groups.flatMap((g) => g.releases).find((r) => r.version === '1.1.0');
    const v01 = groups.flatMap((g) => g.releases).find((r) => r.version === '0.1');
    expect(v110?.zipUrl).toBeNull();
    expect(v110?.targzUrl).toBeNull();
    expect(v01?.zipUrl).toBeNull();
    const legacyGroups = groups.filter((g) => !g.downloadable).map((g) => g.slug);
    expect(legacyGroups).toContain('1.1');
    expect(legacyGroups).toContain('0');
  });

  it('excludes pre-release versions such as RC builds', async () => {
    const groups = await getArchiveReleases();
    const versions = groups.flatMap((g) => g.releases.map((r) => r.version));
    expect(versions).toContain('4.1.0');
    expect(versions).not.toContain('4.1.0-RC.7');
  });

  it('offers ZIP only for 1.x downloads and ZIP + tar.gz for 2.x and newer', async () => {
    const groups = await getArchiveReleases();
    const all = groups.flatMap((g) => g.releases);
    const v120 = all.find((r) => r.version === '1.2.0');
    expect(v120?.zipUrl).toBe('https://download.phpmyfaq.de/phpMyFAQ-1.2.0.zip');
    expect(v120?.targzUrl).toBeNull();

    const v200 = all.find((r) => r.version === '2.0.0');
    expect(v200?.zipUrl).toBe('https://download.phpmyfaq.de/phpMyFAQ-2.0.0.zip');
    expect(v200?.targzUrl).toBe('https://download.phpmyfaq.de/phpMyFAQ-2.0.0.tar.gz');
    expect(v200?.changelogAnchor).toBe('2.0.0');
  });

  it('produces a slug without the .x suffix', async () => {
    const groups = await getArchiveReleases();
    expect(groups.map((g) => g.slug)).toContain('4.1');
    expect(groups.map((g) => g.slug)).toContain('1.2');
  });

  it('counts all releases and downloadable releases separately', async () => {
    const groups = await getArchiveReleases();
    // 4.1.0, 2.0.0, 1.2.5b, 1.2.0, 1.1.0, 0.1
    expect(countReleases(groups)).toBe(6);
    // everything except 1.1.0 and 0.1
    expect(countDownloadableReleases(groups)).toBe(4);
  });
});
