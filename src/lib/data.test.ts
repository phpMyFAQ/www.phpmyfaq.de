import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  formatFileSize,
  getDownloadUrl,
  getSbomUrl,
  hasSbomFiles,
  formatReleaseDate,
  getSiteConfig,
  getVersions,
  getStableInfo,
  getDevelopmentInfo,
} from './data';
import fs from 'fs';
import path from 'path';

vi.mock('fs');
vi.mock('path');

describe('formatFileSize', () => {
  it('should format file size correctly', () => {
    expect(formatFileSize(10.5)).toBe('10.50 MB');
    expect(formatFileSize(1.234567)).toBe('1.23 MB');
    expect(formatFileSize(100)).toBe('100.00 MB');
  });
});

describe('getDownloadUrl', () => {
  it('should generate correct ZIP download URL', () => {
    const url = getDownloadUrl('4.0.13', 'zip');
    expect(url).toBe('https://download.phpmyfaq.de/phpMyFAQ-4.0.13.zip');
  });

  it('should generate correct TAR.GZ download URL', () => {
    const url = getDownloadUrl('4.1.0-alpha.3', 'tar.gz');
    expect(url).toBe('https://download.phpmyfaq.de/phpMyFAQ-4.1.0-alpha.3.tar.gz');
  });
});

describe('hasSbomFiles', () => {
  it('should be false for releases before 4.1.7', () => {
    expect(hasSbomFiles('4.1.6')).toBe(false);
    expect(hasSbomFiles('4.0.13')).toBe(false);
    expect(hasSbomFiles('3.2.10')).toBe(false);
    expect(hasSbomFiles('1.2.0')).toBe(false);
  });

  it('should be true for 4.1.7 and later', () => {
    expect(hasSbomFiles('4.1.7')).toBe(true);
    expect(hasSbomFiles('4.1.8')).toBe(true);
    expect(hasSbomFiles('4.2.0')).toBe(true);
    expect(hasSbomFiles('5.0.0')).toBe(true);
  });

  it('should compare segments numerically, not lexicographically', () => {
    // As a string, '4.1.10' < '4.1.7' — the gate must not fall for that.
    expect(hasSbomFiles('4.1.10')).toBe(true);
    expect(hasSbomFiles('4.10.0')).toBe(true);
  });

  it('should exclude pre-releases of 4.1.7 but include later pre-releases', () => {
    expect(hasSbomFiles('4.1.7-RC.1')).toBe(false);
    expect(hasSbomFiles('4.2.0-alpha.1')).toBe(true);
  });

  it('should be false for non-semver versions like nightlies', () => {
    expect(hasSbomFiles('nightly-2026-08-02')).toBe(false);
  });
});

describe('getSbomUrl', () => {
  it('should generate the combined SBOM URL by default', () => {
    expect(getSbomUrl('4.1.7')).toBe('https://download.phpmyfaq.de/phpMyFAQ-4.1.7.sbom.cdx.json');
  });

  it('should generate scoped SBOM URLs with dot-separated scope', () => {
    expect(getSbomUrl('4.1.7', 'php')).toBe('https://download.phpmyfaq.de/phpMyFAQ-4.1.7.php.sbom.cdx.json');
    expect(getSbomUrl('4.1.7', 'js')).toBe('https://download.phpmyfaq.de/phpMyFAQ-4.1.7.js.sbom.cdx.json');
  });
});

describe('formatReleaseDate', () => {
  it('should format date correctly', () => {
    const formatted = formatReleaseDate('2025-10-04');
    expect(formatted).toBe('October 4, 2025');
  });

  it('should handle different date formats', () => {
    const formatted = formatReleaseDate('2025-01-15');
    expect(formatted).toBe('January 15, 2025');
  });

  it('should return original string if date is invalid', () => {
    const invalidDate = 'invalid-date';
    const result = formatReleaseDate(invalidDate);
    // Invalid dates return "Invalid Date" in most browsers
    expect(result).toMatch(/Invalid Date|invalid-date/);
  });
});

describe('getSiteConfig', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it('should return development config by default', () => {
    const config = getSiteConfig();
    expect(config.domain).toBe('http://localhost:3000');
    expect(config.siteUrl).toBe('http://localhost:3000');
  });

  it('should return staging config when NODE_ENV is staging', () => {
    vi.stubEnv('NODE_ENV', 'staging');
    const config = getSiteConfig();
    expect(config.domain).toBe('https://staging.phpmyfaq.de');
    expect(config.siteUrl).toBe('https://staging.phpmyfaq.de');
  });

  it('should return production config when NODE_ENV is production', () => {
    vi.stubEnv('NODE_ENV', 'production');
    const config = getSiteConfig();
    expect(config.domain).toBe('https://www.phpmyfaq.de');
    expect(config.siteUrl).toBe('https://www.phpmyfaq.de');
  });
});

describe('getVersions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null if file does not exist', () => {
    vi.spyOn(path, 'join').mockReturnValue('/mock/path/versions.json');
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = getVersions();

    expect(result).toBeNull();
  });

  it('should parse versions JSON correctly', () => {
    const mockData = {
      stable: '4.0.13',
      stable_released: '2025-10-03',
      development: '4.1.0-alpha.3',
      development_released: '2025-10-04',
    };

    vi.spyOn(path, 'join').mockReturnValue('/mock/path/versions.json');
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(mockData));

    const result = getVersions();

    expect(result).toEqual(mockData);
  });

  it('should return null on error', () => {
    vi.spyOn(path, 'join').mockReturnValue('/mock/path/versions.json');
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error('Read error');
    });

    const result = getVersions();

    expect(result).toBeNull();
  });
});

describe('getStableInfo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null if file does not exist', () => {
    vi.spyOn(path, 'join').mockReturnValue('/mock/path/stable.json');
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = getStableInfo();

    expect(result).toBeNull();
  });

  it('should parse stable info correctly', () => {
    const mockData = {
      version: '4.0.13',
      zip: { filesize: 12.5, md5: 'abc123' },
      targz: { filesize: 11.2, md5: 'def456' },
    };

    vi.spyOn(path, 'join').mockReturnValue('/mock/path/stable.json');
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(mockData));

    const result = getStableInfo();

    expect(result).toEqual(mockData);
  });
});

describe('getDevelopmentInfo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null if file does not exist', () => {
    vi.spyOn(path, 'join').mockReturnValue('/mock/path/development.json');
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = getDevelopmentInfo();

    expect(result).toBeNull();
  });

  it('should parse development info correctly', () => {
    const mockData = {
      version: '4.1.0-alpha.3',
      zip: { filesize: 13.5, md5: 'ghi789' },
      targz: { filesize: 12.1, md5: 'jkl012' },
    };

    vi.spyOn(path, 'join').mockReturnValue('/mock/path/development.json');
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(mockData));

    const result = getDevelopmentInfo();

    expect(result).toEqual(mockData);
  });
});