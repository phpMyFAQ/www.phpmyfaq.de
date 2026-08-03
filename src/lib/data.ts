import fs from 'fs';
import path from 'path';

export interface VersionData {
  stable: string;
  stable_released: string;
  development: string;
  development_released: string;
  nightly?: string;
  nightly_released?: string;
}

export interface FileInfo {
  filesize: number;
  md5: string;
}

export interface DownloadInfo {
  version: string;
  zip: FileInfo;
  targz: FileInfo;
}

export function getVersions(): VersionData | null {
  try {
    const versionsPath = path.join(process.cwd(), 'data', 'versions.json');
    if (!fs.existsSync(versionsPath)) return null;

    const data = fs.readFileSync(versionsPath, 'utf8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function getStableInfo(): DownloadInfo | null {
  try {
    const stablePath = path.join(process.cwd(), 'data', 'stable.json');
    if (!fs.existsSync(stablePath)) return null;

    const data = fs.readFileSync(stablePath, 'utf8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function getDevelopmentInfo(): DownloadInfo | null {
  try {
    const devPath = path.join(process.cwd(), 'data', 'development.json');
    if (!fs.existsSync(devPath)) return null;

    const data = fs.readFileSync(devPath, 'utf8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

// The versions API keeps serving the last pre-release even after it went
// stable, so the development channel is only offered while its base version
// is actually ahead of the stable release.
export function isDevelopmentAhead(development: string, stable: string): boolean {
  const base = (version: string) => version.split('-')[0].split('.').map(Number);
  const [devParts, stableParts] = [base(development), base(stable)];
  for (let i = 0; i < 3; i++) {
    if (devParts[i] !== stableParts[i]) return devParts[i] > stableParts[i];
  }
  return false;
}

export function formatFileSize(sizeInMB: number): string {
  return `${sizeInMB.toFixed(2)} MB`;
}

// SBOM files (CycloneDX) are only published for releases from 4.1.7 onwards,
// so older releases must not get dead links. Each segment is compared
// numerically — as strings, "4.1.10" would sort before "4.1.7" and newer
// patch releases would lose their SBOM links.
export function hasSbomFiles(version: string): boolean {
  const [base, preRelease] = version.split('-');
  const parts = base.split('.').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return false;
  const minimum = [4, 1, 7];
  for (let i = 0; i < 3; i++) {
    if (parts[i] !== minimum[i]) return parts[i] > minimum[i];
  }
  // Pre-releases of 4.1.7 itself (e.g. 4.1.7-RC.1) predate the release.
  return preRelease === undefined;
}

export function getDownloadUrl(version: string, format: 'zip' | 'tar.gz'): string {
  const baseUrl = 'https://download.phpmyfaq.de';
  const extension = format === 'zip' ? 'zip' : 'tar.gz';
  return `${baseUrl}/phpMyFAQ-${version}.${extension}`;
}

// The scope is dot-separated in the filename, e.g. phpMyFAQ-4.1.7.php.sbom.cdx.json
export function getSbomUrl(version: string, scope: 'combined' | 'php' | 'js' = 'combined'): string {
  const baseUrl = 'https://download.phpmyfaq.de';
  const infix = scope === 'combined' ? '' : `.${scope}`;
  return `${baseUrl}/phpMyFAQ-${version}${infix}.sbom.cdx.json`;
}

export function formatReleaseDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function getSiteConfig() {
  const env = process.env.NODE_ENV || 'development';

  const config = {
    development: {
      domain: 'http://localhost:3000',
      siteUrl: 'http://localhost:3000',
    },
    staging: {
      domain: 'https://staging.phpmyfaq.de',
      siteUrl: 'https://staging.phpmyfaq.de',
    },
    production: {
      domain: 'https://www.phpmyfaq.de',
      siteUrl: 'https://www.phpmyfaq.de',
    },
  };

  return config[env as keyof typeof config] || config.development;
}