import { supportedVersions, type SupportedVersion } from '@/data/security';

export const docsBaseUrl = 'https://phpmyfaq.readthedocs.io/en/';

export interface DocumentedLine {
  // Release line without the ".x", e.g. "4.1".
  version: string;
  url: string;
  status: string;
  php: string;
}

// The documentation of every release line in the support table lives on Read
// the Docs: the development line is documented from the main branch, the
// others from their release branch. static/.htaccess redirects the old
// /docs/<line>/ URLs to the same addresses; src/lib/docs.test.ts checks that
// both stay in step.
export function docsUrlFor(line: string): string {
  const version = line.replace(/\.x$/, '');
  const entry = supportedVersions.find((v) => v.version === `${version}.x`);
  if (!entry) {
    throw new Error(`No release line ${version}.x in src/data/security.ts`);
  }
  return `${docsBaseUrl}${entry.status === 'Active development' ? 'main' : version}/`;
}

export function isEndOfLife(entry: Pick<SupportedVersion, 'status'>): boolean {
  return entry.status === 'End of life';
}

// Release lines from the support table with their documentation, newest first.
export function documentedLines(): DocumentedLine[] {
  return supportedVersions.map((v) => ({
    version: v.version.replace(/\.x$/, ''),
    url: docsUrlFor(v.version),
    status: v.status,
    php: v.php,
  }));
}