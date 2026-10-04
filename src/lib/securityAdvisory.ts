import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';

const renderInline = (text: string): string => marked.parseInline(text) as string;

export interface AdvisorySummary {
  slug: string;
  title: string;
  description?: string;
  risk?: string;
  issuedOn?: string;
  software?: string;
  date: string;
}

const securityDir = join(process.cwd(), 'content/security');

// Slugs of all advisories in content/security/, e.g. "advisory-2026-01-12",
// in directory order. The policy and other non-advisory files are skipped.
export function getAdvisorySlugs(): string[] {
  return readdirSync(securityDir)
    .filter((file) => file.startsWith('advisory-') && file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

// Reads all advisory markdown files from content/security/ and returns them grouped by year (descending)
export function getAdvisoriesByYear(): { year: string; advisories: AdvisorySummary[] }[] {
  const advisories = getAdvisorySlugs().map((slug) => {
    const content = readFileSync(join(securityDir, `${slug}.md`), 'utf-8');

    const titleMatch = content.match(/^title:\s*(.+)$/m);
    const descMatch = content.match(/^description:\s*(.+)$/m);
    const riskMatch = content.match(/\*\*Risk:*\*\*\s*(.+)/i);
    const issuedMatch = content.match(/\*\*Issued on:*\*\*\s*(.+)/i);
    const softwareMatch = content.match(/\*\*Software:*\*\*\s*(.+)/i);

    const title = titleMatch ? titleMatch[1].trim() : `Security Advisory ${slug.replace('advisory-', '')}`;
    const dateMatch = slug.match(/^advisory-(\d{4})-(\d{2})-(\d{2})/);
    const year = dateMatch ? dateMatch[1] : 'Unknown';
    const date = dateMatch ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}` : slug;

    return {
      slug,
      title,
      description: descMatch ? descMatch[1].trim() : undefined,
      risk: riskMatch ? riskMatch[1].trim() : undefined,
      issuedOn: issuedMatch ? issuedMatch[1].trim() : undefined,
      software: softwareMatch ? softwareMatch[1].trim() : undefined,
      date,
      year,
    };
  });

  const grouped = new Map<string, AdvisorySummary[]>();
  for (const advisory of advisories) {
    const { year, ...summary } = advisory;
    const list = grouped.get(year) || [];
    list.push(summary);
    grouped.set(year, list);
  }

  return Array.from(grouped.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([year, items]) => ({
      year,
      advisories: items.sort((a, b) => b.slug.localeCompare(a.slug)),
    }));
}

// Renders an advisory's markdown body to HTML.
// - Consecutive metadata lines (**Label:** value) become one <dl class="dl-horizontal">
// - Existing HTML lines pass through untouched
// - ##/###/#### headings are supported
// - Consecutive prose lines form one paragraph, as in markdown, so hard-wrapped
//   advisories do not render as one paragraph per line

export function parseAdvisoryToHTML(content: string): string {
  const lines = content.split('\n');
  const htmlParts: string[] = [];
  let inDl = false;
  let paragraph: string[] = [];

  const closeDlIfOpen = () => {
    if (inDl) {
      htmlParts.push('</dl>');
      inDl = false;
    }
  };

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      htmlParts.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  };

  for (const rawLine of lines) {
    const l = rawLine.trim();

    if (l.length === 0) {
      closeDlIfOpen();
      flushParagraph();
      continue;
    }

    if (l.startsWith('<')) {
      closeDlIfOpen();
      flushParagraph();
      htmlParts.push(l);
      continue;
    }

    const heading = l.match(/^(#{2,4}) (.+)$/);
    if (heading) {
      closeDlIfOpen();
      flushParagraph();
      const level = heading[1].length;
      htmlParts.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }

    // Metadata lines such as **Issued on::** 2004-07-27
    const metaMatch = l.match(/^\*\*(.+?)\*\*\s*(.+)$/);
    if (metaMatch) {
      flushParagraph();
      const label = metaMatch[1]
        .trim()
        .replace(/:+\s*$/, '')
        .trim();
      const value = metaMatch[2].trim();

      if (!inDl) {
        htmlParts.push('<dl class="dl-horizontal">');
        inDl = true;
      }

      htmlParts.push(`<dt>${label}:</dt><dd>${renderInline(value)}</dd>`);
      continue;
    }

    closeDlIfOpen();
    paragraph.push(l);
  }

  closeDlIfOpen();
  flushParagraph();

  return htmlParts.join('\n').replace(/\n+/g, '\n').trim();
}