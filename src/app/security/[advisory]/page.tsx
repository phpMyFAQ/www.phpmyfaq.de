import { notFound } from 'next/navigation'
import { readFileSync } from 'fs'
import { join } from 'path'
import PageLayout from '@/components/PageLayout'
import { generatePageMetadata } from '@/components/PageLayout'

interface SecurityAdvisoryPageProps {
  params: Promise<{
    advisory: string
  }>
}

// Function to read and parse markdown content
function getAdvisoryContent(advisory: string): { title: string; description: string; content: string } | null {
  try {
    const filePath = join(process.cwd(), 'content/security', `${advisory}.md`)
    const content = readFileSync(filePath, 'utf-8')
    
    // Extract frontmatter
    const frontmatterEnd = content.indexOf('---', 3)
    if (frontmatterEnd === -1) return null
    
    const frontmatter = content.substring(3, frontmatterEnd)
    const body = content.substring(frontmatterEnd + 3).trim()
    
    // Parse frontmatter
    const titleMatch = frontmatter.match(/title:\s*(.+)/)
    const descriptionMatch = frontmatter.match(/description:\s*(.+)/)
    
    return {
      title: titleMatch ? titleMatch[1].trim() : `Security Advisory ${advisory}`,
      description: descriptionMatch ? descriptionMatch[1].trim() : '',
      content: body
    }
  } catch (error) {
    return null
  }
}

// Function to convert Markdown content to JSX
function parseAdvisoryContent(content: string): React.JSX.Element {
  // Convert markdown to HTML-like content for rendering
  let processedContent = content
    // Convert headers
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    
    // Convert bold metadata format to definition list
    .replace(/^\*\*(.+?):\*\* (.+)$/gm, (match, term, definition) => {
      return `<dl class="row"><dt class="col-sm-3">${term}:</dt><dd class="col-sm-9">${definition}</dd></dl>`
    })
    
    // Convert paragraphs (lines that don't start with special characters)
    .split('\n')
    .map(line => {
      line = line.trim()
      if (!line) return ''
      if (line.startsWith('<')) return line // Already HTML
      if (line.startsWith('#')) return line // Headers will be processed later
      if (line.startsWith('**')) return line // Metadata will be processed later
      return `<p>${line}</p>`
    })
    .join('\n')
    
    // Clean up
    .replace(/\n+/g, '\n')
    .trim()
  
  return <div dangerouslySetInnerHTML={{ __html: processedContent }} />
}

export async function generateStaticParams() {
  // Read all security advisory files from the content/security directory
  const { readdirSync } = await import('fs')
  const { join } = await import('path')

  const securityDir = join(process.cwd(), 'content/security')
  const files = readdirSync(securityDir)

  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({
      advisory: file.replace('.md', '')
    }))
}

export async function generateMetadata({ params }: SecurityAdvisoryPageProps) {
  const { advisory } = await params

  const advisoryData = getAdvisoryContent(advisory)
  
  if (!advisoryData) {
    return generatePageMetadata(
      'Security Advisory Not Found',
      'The requested security advisory could not be found'
    )
  }
  
  return generatePageMetadata(
    advisoryData.title,
    advisoryData.description
  )
}

export default async function SecurityAdvisoryPage({ params }: SecurityAdvisoryPageProps) {
  const { advisory } = await params
  
  // Validate advisory format (advisory-YYYY-MM-DD)
  if (!/^advisory-\d{4}-\d{2}-\d{2}$/.test(advisory)) {
    notFound()
  }
  
  const advisoryData = getAdvisoryContent(advisory)
  
  if (!advisoryData) {
    notFound()
  }
  
  const contentElement = parseAdvisoryContent(advisoryData.content)
  
  return (
    <PageLayout title={advisoryData.title}>
      <div className="row">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/advisories">Security Advisories</a></li>
              <li className="breadcrumb-item active" aria-current="page">{advisory}</li>
            </ol>
          </nav>

          {contentElement}
        </div>
      </div>
    </PageLayout>
  )
}