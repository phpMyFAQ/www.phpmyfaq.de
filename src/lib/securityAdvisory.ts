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

// Reads all advisory markdown files from content/security/ and returns them grouped by year (descending)
export function getAdvisoriesByYear(): { year: string; advisories: AdvisorySummary[] }[] {
  const securityDir = join(process.cwd(), 'content/security');
  const files = readdirSync(securityDir).filter((file) => file.startsWith('advisory-') && file.endsWith('.md'));

  const advisories = files.map((file) => {
    const slug = file.replace('.md', '');
    const content = readFileSync(join(securityDir, file), 'utf-8');

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

// Parser für Security-Advisory-Markdown in einen HTML-String
// - Gruppiert aufeinanderfolgende Metadaten-Zeilen (**Label:** Wert) in ein gemeinsames <dl class="dl-horizontal">
// - Belässt vorhandenes HTML unverändert
// - Unterstützt Überschriften (##/###/####) und einfache Absätze pro Zeile

export function parseAdvisoryToHTML(content: string): string {
  const lines = content.split('\n');
  const htmlParts: string[] = [];
  let inDl = false;

  const closeDlIfOpen = () => {
    if (inDl) {
      htmlParts.push('</dl>');
      inDl = false;
    }
  };

  for (let rawLine of lines) {
    const l = rawLine.trim();

    if (l.length === 0) {
      closeDlIfOpen();
      continue;
    }

    // Bewahre vorhandenes HTML
    if (l.startsWith('<')) {
      closeDlIfOpen();
      htmlParts.push(l);
      continue;
    }

    // Überschriften
    if (l.startsWith('#### ')) {
      closeDlIfOpen();
      htmlParts.push(`<h4>${renderInline(l.substring(5))}</h4>`);
      continue;
    }
    if (l.startsWith('### ')) {
      closeDlIfOpen();
      htmlParts.push(`<h3>${renderInline(l.substring(4))}</h3>`);
      continue;
    }
    if (l.startsWith('## ')) {
      closeDlIfOpen();
      htmlParts.push(`<h2>${renderInline(l.substring(3))}</h2>`);
      continue;
    }

    // Metadaten-Zeilen wie **Issued on::** 2004-07-27
    const metaMatch = l.match(/^\*\*(.+?)\*\*\s*(.+)$/);
    if (metaMatch) {
      let labelRaw = metaMatch[1].trim();
      const value = metaMatch[2].trim();

      // Entferne einen oder mehrere abschließende Doppelpunkte innerhalb des Labels
      labelRaw = labelRaw.replace(/:+\s*$/, '').trim();

      if (!inDl) {
        htmlParts.push('<dl class="dl-horizontal">');
        inDl = true;
      }

      htmlParts.push(`<dt>${labelRaw}:</dt><dd>${renderInline(value)}</dd>`);
      continue;
    }

    // Standard: Absatz
    closeDlIfOpen();
    htmlParts.push(`<p>${renderInline(l)}</p>`);
  }

  // Offenes DL schließen
  closeDlIfOpen();

  return htmlParts.join('\n').replace(/\n+/g, '\n').trim();
}
