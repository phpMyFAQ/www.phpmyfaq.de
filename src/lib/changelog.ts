import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked, Tokens } from 'marked';

export interface ChangelogData {
  content: string;
  title: string;
  description: string;
}

export interface ChangelogRelease {
  version: string;
  date: string;
  anchor: string;
  items: string[];
}

export interface ChangelogGroup {
  name: string;
  slug: string;
  releases: ChangelogRelease[];
}

export interface ChangelogStructured {
  title: string;
  description: string;
  groups: ChangelogGroup[];
}

// Configure marked to handle heading anchors {#id} syntax
const renderer = {
  heading(token: Tokens.Heading): string {
    const match = token.text.match(/^(.+?)\s*\{#(.+?)\}$/);
    if (match) {
      const text = match[1];
      const id = match[2];
      return `<h${token.depth} class="mt-4 mb-2"><a id="${id}"></a>${text}</h${token.depth}>\n`;
    }
    if (token.depth === 2) {
      return `<h${token.depth} class="mt-5 mb-3">${token.text}</h${token.depth}>\n`;
    }
    return `<h${token.depth}>${token.text}</h${token.depth}>\n`;
  },
  list(token: Tokens.List): string {
    const body = token.items.map((item) => `<li class="mb-1">${item.tokens.map((t) => ('text' in t ? t.text : '')).join('')}</li>`).join('\n');
    return `<ul class="ms-3" style="list-style-type: disc">\n${body}\n</ul>\n`;
  },
};

marked.use({ renderer });

export async function getChangelogContent(): Promise<ChangelogData> {
  const filePath = path.join(process.cwd(), 'content/changelog/index.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const htmlContent = marked.parse(content) as string;

  return {
    content: htmlContent,
    title: (data.title as string) || 'Changelog',
    description: (data.description as string) || 'User visible changes in phpMyFAQ releases',
  };
}

// Parses the changelog Markdown into structured groups/releases for the interactive changelog view.
export async function getChangelogData(): Promise<ChangelogStructured> {
  const filePath = path.join(process.cwd(), 'content/changelog/index.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const groups: ChangelogGroup[] = [];
  let currentGroup: ChangelogGroup | null = null;
  let currentRelease: ChangelogRelease | null = null;

  for (const rawLine of content.split('\n')) {
    const line = rawLine.trimEnd();

    const groupMatch = line.match(/^##\s+(.+?)\s*$/);
    if (groupMatch && !line.startsWith('### ')) {
      const name = groupMatch[1].trim();
      currentGroup = { name, slug: name.replace(/^phpMyFAQ\s+/i, '').trim() || name, releases: [] };
      groups.push(currentGroup);
      currentRelease = null;
      continue;
    }

    const releaseMatch = line.match(/^###\s+phpMyFAQ\s+(.+?)\s+-\s+(\d{4}-\d{2}-\d{2})\s*(?:\{#(.+?)\})?\s*$/);
    if (releaseMatch) {
      if (!currentGroup) {
        currentGroup = { name: 'Releases', slug: 'releases', releases: [] };
        groups.push(currentGroup);
      }
      const version = releaseMatch[1].trim();
      currentRelease = {
        version,
        date: releaseMatch[2],
        anchor: releaseMatch[3]?.trim() || version,
        items: [],
      };
      currentGroup.releases.push(currentRelease);
      continue;
    }

    const itemMatch = line.match(/^-\s+(.+)$/);
    if (itemMatch && currentRelease) {
      currentRelease.items.push(marked.parseInline(itemMatch[1].trim()) as string);
    }
  }

  return {
    title: (data.title as string) || 'Changelog',
    description: (data.description as string) || 'User visible changes in phpMyFAQ releases',
    groups: groups.filter((g) => g.releases.length > 0),
  };
}
