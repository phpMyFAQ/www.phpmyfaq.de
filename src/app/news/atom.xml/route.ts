import { buildNewsAtomFeed } from '@/lib/newsAtomFeed';

// Rendered to a static out/news/atom.xml file by the export build.
export const dynamic = 'force-static';

export async function GET() {
  return new Response(buildNewsAtomFeed(), {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
}