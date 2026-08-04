import { readFileSync } from 'fs';
import { join } from 'path';
import { getAdvisoriesByYear, parseAdvisoryToHTML } from './securityAdvisory';
import { getSiteConfig } from './data';

const XML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
};

export function escapeXml(text: string): string {
  return text.replace(/[&<>"']/g, (char) => XML_ESCAPES[char]);
}

// Full advisory body as HTML, without the frontmatter block.
function advisoryBodyHtml(slug: string): string {
  const content = readFileSync(join(process.cwd(), 'content/security', `${slug}.md`), 'utf-8');
  const frontmatterEnd = content.indexOf('---', 3);
  const body = frontmatterEnd === -1 ? content : content.substring(frontmatterEnd + 3).trim();
  return parseAdvisoryToHTML(body);
}

// Builds the Atom 1.0 feed for all security advisories, newest first. The feed
// is rendered to a static file at build time (see src/app/security/atom.xml/).
// Advisories only carry a day, so timestamps are pinned to midnight UTC.
export function buildSecurityAtomFeed(): string {
  const advisories = getAdvisoriesByYear().flatMap((year) => year.advisories);
  const { siteUrl } = getSiteConfig();
  const feedUrl = `${siteUrl}/security/atom.xml`;
  const updated = advisories.length > 0 ? `${advisories[0].date}T00:00:00Z` : '1970-01-01T00:00:00Z';

  const entries = advisories.map((advisory) => {
    const entryUrl = `${siteUrl}/security/${advisory.slug}/`;
    const summary = advisory.description ? `    <summary>${escapeXml(advisory.description)}</summary>\n` : '';
    return (
      `  <entry>\n` +
      `    <title>${escapeXml(advisory.title)}</title>\n` +
      `    <id>${entryUrl}</id>\n` +
      `    <link rel="alternate" type="text/html" href="${entryUrl}"/>\n` +
      `    <published>${advisory.date}T00:00:00Z</published>\n` +
      `    <updated>${advisory.date}T00:00:00Z</updated>\n` +
      summary +
      `    <content type="html">${escapeXml(advisoryBodyHtml(advisory.slug))}</content>\n` +
      `  </entry>`
    );
  });

  return (
    `<?xml version="1.0" encoding="utf-8"?>\n` +
    `<feed xmlns="http://www.w3.org/2005/Atom">\n` +
    `  <title>phpMyFAQ Security Advisories</title>\n` +
    `  <subtitle>Security advisories published by the phpMyFAQ Team</subtitle>\n` +
    `  <id>${feedUrl}</id>\n` +
    `  <link rel="self" type="application/atom+xml" href="${feedUrl}"/>\n` +
    `  <link rel="alternate" type="text/html" href="${siteUrl}/advisories/"/>\n` +
    `  <updated>${updated}</updated>\n` +
    `  <author>\n` +
    `    <name>phpMyFAQ Team</name>\n` +
    `    <uri>${siteUrl}/</uri>\n` +
    `  </author>\n` +
    `${entries.join('\n')}\n` +
    `</feed>\n`
  );
}
