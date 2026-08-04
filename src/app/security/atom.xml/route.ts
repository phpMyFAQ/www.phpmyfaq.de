import { buildSecurityAtomFeed } from '@/lib/securityAtomFeed';

// Rendered to a static out/security/atom.xml file by the export build.
export const dynamic = 'force-static';

export async function GET() {
  return new Response(buildSecurityAtomFeed(), {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
}
