import { readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import {
  supportedVersions,
  sbomSinceVersion,
  phpstanLevel,
  pgpFingerprint,
  contactEmail,
  advisoryReportUrl,
  hardeningDocsUrl,
  lastReviewed,
} from '@/data/security';

export const POLICY_PATH = 'content/security/policy.md';

export interface SecurityPolicy {
  content: string;
  frontmatter: {
    title?: string;
    description?: string;
    [key: string]: unknown;
  };
}

// Builds the supported versions table as GFM so it renders like the hand-written
// tables in the policy markdown.
export function renderSupportedVersionsTable(): string {
  const rows = supportedVersions.map((v) => `| ${v.version} | ${v.status} | ${v.securityUntil} | ${v.php} |`);

  return ['| Version | Status | Security fixes until | PHP |', '| --- | --- | --- | --- |', ...rows].join('\n');
}

// Replaces {{token}} placeholders in the policy markdown. Unknown tokens are left
// as-is so a typo is visible in the rendered page instead of silently vanishing.
export function substituteTokens(markdown: string): string {
  const tokens: Record<string, string> = {
    supportedVersionsTable: renderSupportedVersionsTable(),
    sbomSinceVersion,
    phpstanLevel: String(phpstanLevel),
    pgpFingerprint: pgpFingerprint ? ` (PGP key fingerprint: \`${pgpFingerprint}\`)` : '',
    contactEmail,
    advisoryReportUrl,
    hardeningDocsUrl,
    lastReviewed,
  };

  return markdown.replace(/\{\{(\w+)\}\}/g, (match, key: string) => (Object.hasOwn(tokens, key) ? tokens[key] : match));
}

export function getSecurityPolicy(): SecurityPolicy {
  const raw = readFileSync(join(process.cwd(), POLICY_PATH), 'utf-8');
  const { data, content } = matter(raw);

  return {
    content: marked.parse(substituteTokens(content)) as string,
    frontmatter: data as SecurityPolicy['frontmatter'],
  };
}
