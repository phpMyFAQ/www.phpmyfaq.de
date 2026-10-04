import { marked } from 'marked';
import { getRecentNews } from './news';
import { getSiteConfig } from './data';
import { escapeXml } from './securityAtomFeed';

// How many items the feed carries. A news year holds a dozen or so entries,
// so this covers roughly the last twelve months.
export const NEWS_FEED_LIMIT = 20;

// News items have no headline of their own. Use the first sentence with
// Markdown links and emphasis stripped, cut off at 140 characters.
export function newsEntryTitle(content: string): string {
  const text = content
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const sentenceEnd = text.search(/[.!?](\s|$)/);
  const sentence = sentenceEnd === -1 ? text : text.slice(0, sentenceEnd + 1);
  return sentence.length > 140 ? `${sentence.slice(0, 139).trimEnd()}…` : sentence;
}

// Rendered HTML with the site's root-relative links made absolute so they
// keep working inside feed readers.
export function newsEntryHtml(content: string, siteUrl: string): string {
  const html = marked.parse(content, { async: false });
  return html.replace(/href="\/(?!\/)/g, `href="${siteUrl}/`);
}

// Builds the Atom 1.0 feed for the most recent news items, newest first. The
// feed is rendered to a static file at build time (see src/app/news/atom.xml/).
// Entries link to the date anchor on the year page. News only carries a day,
// so timestamps are pinned to midnight UTC.
export function buildNewsAtomFeed(): string {
  const items = getRecentNews(NEWS_FEED_LIMIT);
  const { siteUrl } = getSiteConfig();
  const feedUrl = `${siteUrl}/news/atom.xml`;
  const updated = items.length > 0 ? `${items[0].date}T00:00:00Z` : '1970-01-01T00:00:00Z';

  // Two items on the same day would share an anchor; number the id so it stays unique.
  const perDate = new Map<string, number>();
  const entries = items.map((item) => {
    const entryUrl = `${siteUrl}/news/${item.date.slice(0, 4)}/#${item.date}`;
    const ordinal = (perDate.get(item.date) ?? 0) + 1;
    perDate.set(item.date, ordinal);
    const id = ordinal === 1 ? entryUrl : `${entryUrl}-${ordinal}`;
    return (
      `  <entry>\n` +
      `    <title>${escapeXml(newsEntryTitle(item.content))}</title>\n` +
      `    <id>${id}</id>\n` +
      `    <link rel="alternate" type="text/html" href="${entryUrl}"/>\n` +
      `    <published>${item.date}T00:00:00Z</published>\n` +
      `    <updated>${item.date}T00:00:00Z</updated>\n` +
      `    <content type="html">${escapeXml(newsEntryHtml(item.content, siteUrl))}</content>\n` +
      `  </entry>`
    );
  });

  return (
    `<?xml version="1.0" encoding="utf-8"?>\n` +
    `<feed xmlns="http://www.w3.org/2005/Atom">\n` +
    `  <title>phpMyFAQ News</title>\n` +
    `  <subtitle>Releases and project news from the phpMyFAQ Team</subtitle>\n` +
    `  <id>${feedUrl}</id>\n` +
    `  <link rel="self" type="application/atom+xml" href="${feedUrl}"/>\n` +
    `  <link rel="alternate" type="text/html" href="${siteUrl}/news/"/>\n` +
    `  <updated>${updated}</updated>\n` +
    `  <author>\n` +
    `    <name>phpMyFAQ Team</name>\n` +
    `    <uri>${siteUrl}/</uri>\n` +
    `  </author>\n` +
    `${entries.join('\n')}\n` +
    `</feed>\n`
  );
}