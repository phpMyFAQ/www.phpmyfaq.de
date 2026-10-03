#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseNewsFile, type NewsItem } from '../src/lib/news.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface RecentNewsResponse {
  generated: string;
  limit: number;
  news: NewsItem[];
}

interface YearMetadata {
  year: string;
  count: number;
  firstDate: string;
  lastDate: string;
}

interface YearsResponse {
  generated: string;
  years: YearMetadata[];
}

interface YearNewsResponse {
  generated: string;
  year: string;
  total: number;
  news: NewsItem[];
}

// Writes the response only when its payload (ignoring the timestamp) differs from the file on disk.
// Unchanged files keep their previous "generated" value so repeated builds do not create spurious diffs.
function writeIfChanged(filePath: string, response: { generated: string }): boolean {
  if (fs.existsSync(filePath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(filePath, 'utf8')) as { generated?: string };
      const { generated: _existingGenerated, ...existingPayload } = existing;
      const { generated: _newGenerated, ...newPayload } = response;
      if (JSON.stringify(existingPayload) === JSON.stringify(newPayload)) {
        return false;
      }
    } catch {
      // Unreadable or invalid JSON: fall through and rewrite the file.
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(response, null, 2));
  return true;
}

function getAvailableYears(): string[] {
  const newsDir = path.join(__dirname, '..', 'content', 'news');
  const files = fs.readdirSync(newsDir);

  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace('.md', ''))
    .filter((year) => /^\d{4}$/.test(year))
    .sort((a, b) => parseInt(b) - parseInt(a)); // Sort descending (newest first)
}

function generateNewsApi(): void {
  const outputDir = path.join(__dirname, '..', 'public', 'api', 'news');
  const generated = new Date().toISOString();

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const availableYears = getAvailableYears();
  const allNews: NewsItem[] = [];
  const yearsMetadata: YearMetadata[] = [];

  // Process each year
  for (const year of availableYears) {
    const yearNews = parseNewsFile(year);

    if (yearNews.length === 0) {
      continue;
    }

    // Sort news by date descending
    yearNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Add to all news collection
    allNews.push(...yearNews);

    // Calculate year metadata
    const dates = yearNews.map((n) => n.date).sort();
    yearsMetadata.push({
      year,
      count: yearNews.length,
      firstDate: dates[0],
      lastDate: dates[dates.length - 1],
    });

    // Generate individual year file
    const yearResponse: YearNewsResponse = {
      generated,
      year,
      total: yearNews.length,
      news: yearNews,
    };

    const yearChanged = writeIfChanged(path.join(outputDir, `${year}.json`), yearResponse);
    console.log(`${yearChanged ? '✅ Generated' : '⏭️  Unchanged'} ${year}.json (${yearNews.length} entries)`);
  }

  // Sort all news by date descending
  allNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Generate recent.json (latest 10 entries)
  const recentResponse: RecentNewsResponse = {
    generated,
    limit: 10,
    news: allNews.slice(0, 10),
  };

  const recentChanged = writeIfChanged(path.join(outputDir, 'recent.json'), recentResponse);
  console.log(
    `${recentChanged ? '✅ Generated' : '⏭️  Unchanged'} recent.json (${recentResponse.news.length} entries)`,
  );

  // Generate years.json
  const yearsResponse: YearsResponse = {
    generated,
    years: yearsMetadata,
  };

  const yearsChanged = writeIfChanged(path.join(outputDir, 'years.json'), yearsResponse);
  console.log(`${yearsChanged ? '✅ Generated' : '⏭️  Unchanged'} years.json (${yearsMetadata.length} years)`);

  console.log(`\n🎉 News API generated successfully in ${outputDir}`);
}

// Run if this is the main module
if (process.argv[1] === new URL(import.meta.url).pathname) {
  try {
    generateNewsApi();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error generating news API:', (error as Error).message);
    process.exit(1);
  }
}

export { generateNewsApi };