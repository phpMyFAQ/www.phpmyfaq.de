import { getChangelogData } from './changelog';
import { getDownloadUrl } from './data';

// Oldest version exposed on the archive page. Older 0.x/1.x releases are intentionally excluded.
const MIN_MAJOR = 2;

export interface ArchiveRelease {
  version: string;
  date: string;
  changelogAnchor: string;
  zipUrl: string;
  targzUrl: string;
}

export interface ArchiveGroup {
  // Series label, e.g. "4.1.x".
  name: string;
  // Stable identifier used for anchors/jump links, e.g. "4.1".
  slug: string;
  releases: ArchiveRelease[];
}

// Returns true for plain stable semver versions (e.g. "3.2.10"), excluding
// pre-releases such as "4.1.0-RC.7" that should not appear in the archive.
function isStableVersion(version: string): boolean {
  return /^\d+\.\d+(\.\d+)?$/.test(version.trim());
}

function majorOf(version: string): number {
  return parseInt(version.trim().split('.')[0] ?? '0', 10);
}

// Builds the list of downloadable archived releases (>= 2.0.0) grouped by series.
// The data is derived from content/changelog/index.md, so a new release that is
// added to the changelog automatically shows up here on the next build.
export async function getArchiveReleases(): Promise<ArchiveGroup[]> {
  const { groups } = await getChangelogData();

  const archiveGroups: ArchiveGroup[] = [];

  for (const group of groups) {
    const releases = group.releases
      .filter((r) => isStableVersion(r.version) && majorOf(r.version) >= MIN_MAJOR)
      .map<ArchiveRelease>((r) => ({
        version: r.version,
        date: r.date,
        changelogAnchor: r.anchor,
        zipUrl: getDownloadUrl(r.version, 'zip'),
        targzUrl: getDownloadUrl(r.version, 'tar.gz'),
      }));

    if (releases.length === 0) continue;

    const slug = group.slug.replace(/\.x$/i, '');
    archiveGroups.push({ name: group.slug, slug, releases });
  }

  return archiveGroups;
}

// Total number of archived releases across all series.
export function countReleases(groups: ArchiveGroup[]): number {
  return groups.reduce((sum, g) => sum + g.releases.length, 0);
}
