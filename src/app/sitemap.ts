import type { MetadataRoute } from 'next';
import { getSiteConfig } from '@/lib/data';
import { getAllNewsFiles, getAllSecurityAdvisories } from '@/lib/markdown';

// Written to out/sitemap.xml by the static export; robots.txt points here.
export const dynamic = 'force-static';

type Entry = { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] };

const staticPages: Entry[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/download/', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/features/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/documentation/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/support/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/demo/', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/requirements/', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/changelog/', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/archive/', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/security/', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/advisories/', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/translations/', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/references/', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/sovereignty/', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/souveraenitaet/', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/news/', priority: 0.5, changeFrequency: 'weekly' },
  { path: '/donations/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/thankyou/', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/docs/', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/docs/codenames/', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/docs/standards/', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/25years/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/20years/', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/15years/', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/10years/', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/imprint/', priority: 0.1, changeFrequency: 'yearly' },
  { path: '/privacy/', priority: 0.1, changeFrequency: 'yearly' },
  { path: '/terms/', priority: 0.1, changeFrequency: 'yearly' },
];

// Documentation per release line: the newer ones are their own pages, the
// older ones render from content/docs through the [version] route.
const docsVersions = ['4.2', '4.1', '4.0', '3.2', '3.1', '3.0', '2.9', '2.8', '2.7', '2.6', '2.5', '2.0'];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteConfig().siteUrl;
  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${base}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  for (const version of docsVersions) {
    entries.push({ url: `${base}/docs/${version}/`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 });
  }

  for (const year of getAllNewsFiles().sort().reverse()) {
    entries.push({ url: `${base}/news/${year}/`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 });
  }

  for (const slug of getAllSecurityAdvisories().sort().reverse()) {
    const date = slug.match(/^advisory-(\d{4}-\d{2}-\d{2})/)?.[1];
    entries.push({
      url: `${base}/security/${slug}/`,
      lastModified: date ? new Date(date) : now,
      changeFrequency: 'yearly',
      priority: 0.4,
    });
  }

  return entries;
}