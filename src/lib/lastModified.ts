import { execFileSync } from 'child_process';

const cache = new Map<string, Date | null>();

// Date of the last commit that touched a file, or null when the file has no
// history or git is unavailable (callers fall back to the build time).
export function lastCommitDate(file: string): Date | null {
  if (!cache.has(file)) {
    let date: Date | null = null;
    try {
      const output = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
      date = output ? new Date(output) : null;
    } catch {
      date = null;
    }
    cache.set(file, date);
  }
  return cache.get(file) ?? null;
}