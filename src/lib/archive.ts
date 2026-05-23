import { getChangelogData } from './changelog';
import { getDownloadUrl } from './data';

// Oldest version with downloadable packages on download.phpmyfaq.de. Releases below
// this (0.x, 1.0.x, 1.1.x) are listed for historical reference only — no packages exist.
const MIN_DOWNLOAD = { major: 1, minor: 2 };
// tar.gz archives only exist reliably for the 2.x line and newer. Older downloadable
// releases (1.2.x – 1.x) are ZIP only on the download server.
const MIN_TARGZ_MAJOR = 2;

export interface ArchiveRelease {
  version: string;
  date: string;
  changelogAnchor: string;
  // null when no downloadable package exists for this release.
  zipUrl: string | null;
  targzUrl: string | null;
}

export interface ArchiveGroup {
  // Series label, e.g. "4.1.x".
  name: string;
  // Stable identifier used for anchors/jump links, e.g. "4.1".
  slug: string;
  // false for legacy series (0.x, 1.0, 1.1) listed for reference without downloads.
  downloadable: boolean;
  releases: ArchiveRelease[];
}

interface ParsedVersion {
  major: number;
  minor: number;
}

// Parses the leading major.minor of a version, tolerating old letter suffixes
// such as "1.2.5b" or "0.80a". Returns major/minor only — enough for thresholds.
function parseVersion(version: string): ParsedVersion {
  const parts = version.trim().split('.');
  const major = parseInt(parts[0] ?? '0', 10) || 0;
  const minor = parseInt((parts[1] ?? '0').replace(/\D.*$/, ''), 10) || 0;
  return { major, minor };
}

// Excludes pre-releases such as "4.1.0-RC.7". The old letter-suffixed releases
// (e.g. "1.2.5b") are real stable builds and are kept.
function isPreRelease(version: string): boolean {
  return /-/.test(version) || /(alpha|beta|rc|dev|pre)/i.test(version);
}

function isDownloadable({ major, minor }: ParsedVersion): boolean {
  if (major > MIN_DOWNLOAD.major) return true;
  return major === MIN_DOWNLOAD.major && minor >= MIN_DOWNLOAD.minor;
}

// Builds the list of archived releases grouped by series, going back to the very
// first 0.x builds. Releases >= 1.2.0 carry download links (ZIP for 1.2.x – 1.x,
// ZIP + tar.gz for 2.x and newer); earlier series are listed for reference only.
// The data is derived from content/changelog/index.md, so a new release added to
// the changelog automatically shows up here on the next build.
export async function getArchiveReleases(): Promise<ArchiveGroup[]> {
  const { groups } = await getChangelogData();

  const archiveGroups: ArchiveGroup[] = [];

  for (const group of groups) {
    const releases = group.releases
      .filter((r) => !isPreRelease(r.version))
      .map<ArchiveRelease>((r) => {
        const parsed = parseVersion(r.version);
        const downloadable = isDownloadable(parsed);
        return {
          version: r.version,
          date: r.date,
          changelogAnchor: r.anchor,
          zipUrl: downloadable ? getDownloadUrl(r.version, 'zip') : null,
          targzUrl: downloadable && parsed.major >= MIN_TARGZ_MAJOR ? getDownloadUrl(r.version, 'tar.gz') : null,
        };
      });

    if (releases.length === 0) continue;

    const slug = group.slug.replace(/\.x$/i, '');
    const downloadable = releases.some((r) => r.zipUrl !== null);
    archiveGroups.push({ name: group.slug, slug, downloadable, releases });
  }

  return archiveGroups;
}

// Total number of archived releases across all series.
export function countReleases(groups: ArchiveGroup[]): number {
  return groups.reduce((sum, g) => sum + g.releases.length, 0);
}

// Number of releases that have a downloadable package.
export function countDownloadableReleases(groups: ArchiveGroup[]): number {
  return groups.reduce((sum, g) => sum + g.releases.filter((r) => r.zipUrl !== null).length, 0);
}
