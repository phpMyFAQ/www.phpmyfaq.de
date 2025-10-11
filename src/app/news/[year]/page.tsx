import { notFound } from 'next/navigation'
import { readFileSync } from 'fs'
import { join } from 'path'
import PageLayout from '@/components/PageLayout'
import { generatePageMetadata } from '@/components/PageLayout'
import { Metadata } from 'next';

interface NewsYearPageProps {
  params: Promise<{
    year: string
  }>
}

// Function to read and parse markdown content
function getNewsContent(year: string): string | null {
  try {
    const filePath = join(process.cwd(), 'content/news', `${year}.md`)
    const content = readFileSync(filePath, 'utf-8')

    // Extract content after frontmatter
    const frontmatterEnd = content.indexOf('---', 3)
    if (frontmatterEnd === -1) return content

    return content.substring(frontmatterEnd + 3).trim()
  } catch (error) {
    return null
  }
}

// Function to parse markdown-like content to JSX
function parseNewsContent(content: string): React.JSX.Element[] {
  // Handle three formats:
  // 1. ###YYYY-MM-DD or ### YYYY-MM-DD (newer format)
  // 2. **YYYY-MM-DD** (older format with bold markdown)
  const dateRegex = /(?:###\s*|\*\*)(\d{4}-\d{2}-\d{2})(?:\*\*)?/g
  const dates: string[] = []
  let match

  // Extract all dates
  while ((match = dateRegex.exec(content)) !== null) {
    dates.push(match[1])
  }

  // Split content by date headers (both formats)
  const sections = content.split(/(?:###\s*|\*\*)\d{4}-\d{2}-\d{2}(?:\*\*)?/)
  const elements: React.JSX.Element[] = []

  // Skip the first empty section and process the rest
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i].trim()
    if (!section) continue

    const date = dates[i - 1] || ''

    // Process content - convert markdown links to JSX and clean up separators
    const processedContent = section
      .replace(/^\*\s*\*\s*\*/gm, '') // Remove separator lines
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text: string, href: string) => `<a href="${href}" target="_blank" rel="noopener">${text}</a>`) // Convert links
      .split('\n\n') // Split into paragraphs
      .filter(p => p.trim()) // Remove empty paragraphs
      .map(p => `<p>${p.trim()}</p>`) // Wrap in paragraph tags
      .join('\n')

    elements.push(
      <div key={date} className="mb-4">
        <h3 className="mb-2">{date}</h3>
        <hr className="mb-3" />
        <div dangerouslySetInnerHTML={{ __html: processedContent }} />
      </div>
    )
  }

  return elements
}

export async function generateStaticParams() {
  // Generate params for all years from 2001 to 2025
  const years = Array.from({ length: 25 }, (_, i) => 2001 + i)
  return years.map((year) => ({ year: year.toString() }))
}

export async function generateMetadata({ params }: NewsYearPageProps): Promise<Metadata> {
  const { year } = await params
  return generatePageMetadata(
    `phpMyFAQ news from ${year}`,
    `What happened this year so far?`
  )
}

export default async function NewsYearPage({ params }: NewsYearPageProps) {
  const { year } = await params

  // Validate year format
  if (!/^\d{4}$/.test(year)) {
    notFound()
  }

  const yearNum = parseInt(year)
  if (yearNum < 2001 || yearNum > 2025) {
    notFound()
  }

  const content = getNewsContent(year)

  if (!content) {
    notFound()
  }

  const newsElements = parseNewsContent(content)

  return (
    <PageLayout title={`phpMyFAQ news from ${year}`}>
      <div className="row">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/news">News</a></li>
              <li className="breadcrumb-item active" aria-current="page">{year}</li>
            </ol>
          </nav>

          <div id="news-content">
            {newsElements}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
