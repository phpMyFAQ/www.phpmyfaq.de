import { readFileSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';
import PageLayout, { generatePageMetadata } from '@/components/PageLayout';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface DocsVersionPageProps {
  params: Promise<{
    version: string;
  }>;
}

// Function to read and parse documentation content
async function getDocsContent(version: string): Promise<string | null> {
  try {
    const filePath = join(process.cwd(), 'content/docs', `${version}.md`);
    const content = readFileSync(filePath, 'utf-8');

    // Extract content after frontmatter
    const frontmatterEnd = content.indexOf('---', 3);
    const markdownContent = frontmatterEnd === -1 ? content : content.substring(frontmatterEnd + 3).trim();

    // Convert Markdown to HTML
    return marked(markdownContent);
  } catch (_error) {
    return null;
  }
}

// Valid documentation versions
const VALID_VERSIONS = ['2.0', '2.5', '2.6', '2.7', '2.8', '2.9', '3.0', '3.1'];

export const dynamicParams = false;

export function generateStaticParams() {
  return VALID_VERSIONS.map((version) => ({
    version: version,
  }));
}

export async function generateMetadata({ params }: DocsVersionPageProps): Promise<Metadata> {
  const { version } = await params;
  return generatePageMetadata(`phpMyFAQ ${version} Documentation`, `Detailed documentation for phpMyFAQ ${version}`);
}

export default async function DocsVersionPage({ params }: DocsVersionPageProps) {
  const { version } = await params;

  // Validate version
  if (!VALID_VERSIONS.includes(version)) {
    notFound();
  }

  const content = await getDocsContent(version);

  if (!content) {
    notFound();
  }

  return (
    <PageLayout title={`phpMyFAQ ${version} Documentation`}>
      <div className="row">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/docs">Documentation</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {version}
              </li>
            </ol>
          </nav>

          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </PageLayout>
  );
}
