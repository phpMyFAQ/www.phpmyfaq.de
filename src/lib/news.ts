import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface NewsItem {
  date: string;
  content: string;
}

// A news entry starts with its date on a line of its own. Files since 2015 use
// a "### YYYY-MM-DD" heading (with or without the space); older files use
// "**YYYY-MM-DD**".
const ENTRY_HEADER = /^(?:###\s*|\*\*)(\d{4}-\d{2}-\d{2})(?:\*\*)?\s*$/gm;

// Decorative rules directly under the date ("* * *" or "---") and stray
// "* * *" lines are dropped; everything else is left to the Markdown renderer.
function cleanEntry(section: string): string {
  return section
    .replace(/^\*\s*\*\s*\*\s*$/gm, '')
    .trim()
    .replace(/^---\s*\n/, '')
    .trim();
}

// Years that have a news file, newest first.
export function getNewsYears(): string[] {
  const newsDir = path.join(process.cwd(), 'content/news');
  if (!fs.existsSync(newsDir)) {
    return [];
  }
  return fs
    .readdirSync(newsDir)
    .map((file) => file.match(/^(\d{4})\.md$/)?.[1])
    .filter((year): year is string => year !== undefined)
    .sort((a, b) => b.localeCompare(a));
}

/**
 * Parse a single year's news markdown file and extract individual news entries
 */
export function parseNewsFile(year: string): NewsItem[] {
  try {
    const filePath = path.join(process.cwd(), 'content/news', `${year}.md`);

    if (!fs.existsSync(filePath)) {
      return [];
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(fileContents);

    const headers = [...content.matchAll(ENTRY_HEADER)].map((match) => ({
      date: match[1],
      start: match.index,
      bodyStart: match.index + match[0].length,
    }));

    const entries: NewsItem[] = [];
    headers.forEach((header, i) => {
      const end = headers[i + 1]?.start ?? content.length;
      const itemContent = cleanEntry(content.substring(header.bodyStart, end));
      if (itemContent) {
        entries.push({ date: header.date, content: itemContent });
      }
    });

    return entries;
  } catch {
    return [];
  }
}

/**
 * Get the most recent N news entries across years
 */
// The oldest news file in content/news.
const FIRST_NEWS_YEAR = 2001;

export function getRecentNews(limit: number = 6): NewsItem[] {
  const currentYear: number = new Date().getFullYear();
  const allNews: NewsItem[] = [];

  // Walk back year by year until there are enough entries. Every entry of a
  // year is newer than any entry of the year before, so once the limit is
  // reached no older year can contribute to the result.
  for (let year: number = currentYear; year >= FIRST_NEWS_YEAR && allNews.length < limit; year--) {
    allNews.push(...parseNewsFile(year.toString()));
  }

  // Sort by date descending (newest first)
  allNews.sort((a, b): number => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  // Return only the requested number of entries
  return allNews.slice(0, limit);
}