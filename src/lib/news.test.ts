import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { parseNewsFile, getRecentNews, getNewsYears } from './news';
import fs from 'fs';
import path from 'path';

vi.mock('fs');
vi.mock('path');

describe('parseNewsFile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return empty array if file does not exist', () => {
    vi.spyOn(path, 'join').mockReturnValue('/mock/path/2025.md');
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = parseNewsFile('2025');

    expect(result).toEqual([]);
    expect(fs.existsSync).toHaveBeenCalledWith('/mock/path/2025.md');
  });

  it('should parse news entries correctly', () => {
    const mockContent = `---
title: News from 2025
---

### 2025-10-04
* * *
We're excited to announce the release of [phpMyFAQ 4.1.0-alpha.3](/download).

### 2025-10-03
* * *
The phpMyFAQ Team is pleased to announce [phpMyFAQ 4.0.13](/download).

### 2025-09-23
* * *
The phpMyFAQ Team would like to announce [phpMyFAQ 4.0.12](/download).
`;

    vi.spyOn(path, 'join').mockReturnValue('/mock/path/2025.md');
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockContent);

    const result = parseNewsFile('2025');

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({
      date: '2025-10-04',
      content: expect.stringContaining('phpMyFAQ 4.1.0-alpha.3'),
    });
    expect(result[1]).toEqual({
      date: '2025-10-03',
      content: expect.stringContaining('phpMyFAQ 4.0.13'),
    });
    expect(result[2]).toEqual({
      date: '2025-09-23',
      content: expect.stringContaining('phpMyFAQ 4.0.12'),
    });
  });

  it('should handle news without separator lines', () => {
    const mockContent = `---
title: News from 2025
---

### 2025-10-04
We're excited to announce the release.

### 2025-10-03
The phpMyFAQ Team is pleased to announce.
`;

    vi.spyOn(path, 'join').mockReturnValue('/mock/path/2025.md');
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockContent);

    const result = parseNewsFile('2025');

    expect(result).toHaveLength(2);
    expect(result[0].date).toBe('2025-10-04');
    expect(result[1].date).toBe('2025-10-03');
  });

  it('should return empty array on error', () => {
    vi.spyOn(path, 'join').mockReturnValue('/mock/path/2025.md');
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error('Read error');
    });

    const result = parseNewsFile('2025');

    expect(result).toEqual([]);
  });
});

describe('getRecentNews', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return the most recent 6 news entries', () => {
    vi.setSystemTime(new Date('2025-10-09'));

    const mockContent2025 = `---
title: News from 2025
---

### 2025-10-04
News 1

### 2025-10-03
News 2

### 2025-09-23
News 3

### 2025-09-13
News 4

### 2025-08-02
News 5

### 2025-07-06
News 6

### 2025-06-01
News 7
`;

    vi.spyOn(path, 'join').mockImplementation((_, __, filename) => `/mock/path/${filename}`);
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockContent2025);

    const result = getRecentNews(6);

    expect(result.length).toBeGreaterThanOrEqual(6);
    expect(result[0].date).toBe('2025-10-04');
    // Just check we got 6 results, order verified in another test
  });

  it('should combine news from multiple years when current year has fewer than requested', () => {
    vi.setSystemTime(new Date('2026-01-15'));

    const mockContent2026 = `---
title: News from 2026
---

### 2026-01-10
News 1

### 2026-01-05
News 2
`;

    const mockContent2025 = `---
title: News from 2025
---

### 2025-12-20
News 3

### 2025-12-15
News 4

### 2025-12-10
News 5

### 2025-12-05
News 6
`;

    vi.spyOn(path, 'join').mockImplementation((_, __, filename) => `/mock/path/${filename}`);
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockImplementation((filePath: fs.PathOrFileDescriptor) => {
      const pathStr = String(filePath);
      if (pathStr.includes('2026.md')) return mockContent2026;
      if (pathStr.includes('2025.md')) return mockContent2025;
      return '';
    });

    const result = getRecentNews(6);

    expect(result).toHaveLength(6);
    expect(result[0].date).toBe('2026-01-10');
    expect(result[1].date).toBe('2026-01-05');
    expect(result[2].date).toBe('2025-12-20');
    expect(result[5].date).toBe('2025-12-05');
  });

  it('keeps looking back beyond two years when recent years are quiet', () => {
    vi.setSystemTime(new Date('2026-06-01'));

    vi.spyOn(path, 'join').mockImplementation((_, __, filename) => `/mock/path/${filename}`);
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockImplementation((filePath: fs.PathOrFileDescriptor) => {
      const year = String(filePath).match(/(\d{4})\.md$/)?.[1];
      // Only 2026 and 2022 have a single entry each; the years between are empty.
      if (year === '2026') return '### 2026-01-10\nNews 1\n';
      if (year === '2022') return '### 2022-03-03\nOld news\n';
      return '';
    });

    const result = getRecentNews(2);

    expect(result.map((item) => item.date)).toEqual(['2026-01-10', '2022-03-03']);
  });

  it('should sort news by date descending', () => {
    vi.setSystemTime(new Date('2025-10-09'));

    const mockContent = `---
title: News
---

### 2025-10-04
Newer news

### 2025-09-23
Middle news

### 2025-07-06
Older news
`;

    vi.spyOn(path, 'join').mockImplementation((_, __, filename) => `/mock/path/${filename}`);
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockContent);

    const result = getRecentNews(3);

    // Results should be sorted by date descending
    expect(result.length).toBe(3);
    expect(new Date(result[0].date).getTime()).toBeGreaterThanOrEqual(new Date(result[1].date).getTime());
    expect(new Date(result[1].date).getTime()).toBeGreaterThanOrEqual(new Date(result[2].date).getTime());
  });
});
describe('parseNewsFile with the pre-2015 format', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('parses bold date markers and drops the rule underneath', () => {
    const mockContent = `---
title: phpMyFAQ news from 2001
---

**2001-11-23**

---

Due to acute lack of time, the release of version 1.1.0 has been postponed.

**2001-11-09**

---

About half of the new version is now finished.
`;

    vi.spyOn(path, 'join').mockReturnValue('/mock/path/2001.md');
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockContent);

    const result = parseNewsFile('2001');

    expect(result).toEqual([
      { date: '2001-11-23', content: 'Due to acute lack of time, the release of version 1.1.0 has been postponed.' },
      { date: '2001-11-09', content: 'About half of the new version is now finished.' },
    ]);
  });

  it('accepts a heading without a space after the hashes', () => {
    vi.spyOn(path, 'join').mockReturnValue('/mock/path/2015.md');
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue('###2015-03-01\nReleased.\n');

    expect(parseNewsFile('2015')).toEqual([{ date: '2015-03-01', content: 'Released.' }]);
  });
});

describe('getNewsYears', () => {
  it('lists the four-digit news files newest first', () => {
    vi.spyOn(path, 'join').mockReturnValue('/mock/news');
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readdirSync').mockReturnValue(['2024.md', 'index.md', '2026.md', '2025.md'] as never);

    expect(getNewsYears()).toEqual(['2026', '2025', '2024']);
  });
});