import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked, Tokens } from 'marked';

export interface ChangelogData {
  content: string;
  title: string;
  description: string;
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
    return `<ul class="ms-3">\n${body}\n</ul>\n`;
  },
};

marked.use({ renderer });

export async function getChangelogContent(): Promise<ChangelogData> {
  const filePath = path.join(process.cwd(), 'content/changelog/index.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const htmlContent = marked.parse(content);

  return {
    content: htmlContent,
    title: (data.title as string) || 'Changelog',
    description: (data.description as string) || 'User visible changes in phpMyFAQ releases',
  };
}
