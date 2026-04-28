import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';

const renderInline = (text: string): string => marked.parseInline(text) as string;

// Reads all advisory markdown files from content/security/ and returns them grouped by year (descending)
export function getAdvisoriesByYear(): { year: string; advisories: { slug: string; title: string }[] }[] {
  const securityDir = join(process.cwd(), 'content/security');
  const files = readdirSync(securityDir)
    .filter((file) => file.startsWith('advisory-') && file.endsWith('.md'));

  const advisories = files.map((file) => {
    const slug = file.replace('.md', '');
    const content = readFileSync(join(securityDir, file), 'utf-8');
    const titleMatch = content.match(/title:\s*(.+)/);
    const title = titleMatch ? titleMatch[1].trim() : `Security Advisory ${slug.replace('advisory-', '')}`;
    const dateMatch = slug.match(/^advisory-(\d{4})/);
    const year = dateMatch ? dateMatch[1] : 'Unknown';
    return { slug, title, year };
  });

  // Group by year
  const grouped = new Map<string, { slug: string; title: string }[]>();
  for (const advisory of advisories) {
    const list = grouped.get(advisory.year) || [];
    list.push({ slug: advisory.slug, title: advisory.title });
    grouped.set(advisory.year, list);
  }

  // Sort years descending, advisories within each year descending by slug
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
