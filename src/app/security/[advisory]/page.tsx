import { notFound } from 'next/navigation'
import { readFileSync } from 'fs'
import { join } from 'path'
import PageLayout from '@/components/PageLayout'
import { generatePageMetadata } from '@/components/PageLayout'
import { Metadata } from 'next'

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
  // Robust parser: group consecutive metadata lines into a single <dl class="dl-horizontal">
  const lines = content.split('\n')

  const htmlParts: string[] = []
  let inDl = false

  const closeDlIfOpen = () => {
    if (inDl) {
      htmlParts.push('</dl>')
      inDl = false
    }
  }

  for (let line of lines) {
    let l = line.trim()

    // Skip empty lines, but ensure we close an open DL
    if (l.length === 0) {
      closeDlIfOpen()
      continue
    }

    // Keep raw HTML intact
    if (l.startsWith('<')) {
      closeDlIfOpen()
      htmlParts.push(l)
      continue
    }

    // Headings
    if (l.startsWith('#### ')) {
      closeDlIfOpen()
      htmlParts.push(`<h4>${l.substring(5)}</h4>`)
      continue
    }
    if (l.startsWith('### ')) {
      closeDlIfOpen()
      htmlParts.push(`<h3>${l.substring(4)}</h3>`)
      continue
    }
    if (l.startsWith('## ')) {
      closeDlIfOpen()
      htmlParts.push(`<h2>${l.substring(3)}</h2>`)
      continue
    }

    // Metadata lines like **Issued on::** 2004-07-27 or **Risk:** medium
    // Strategy: capture bold label and the value; strip trailing colons from label
    const metaMatch = l.match(/^\*\*(.+?)\*\*\s*(.+)$/)
    if (metaMatch) {
      let labelRaw = metaMatch[1].trim()
      const value = metaMatch[2].trim()

      // Accept labels with one or more trailing colons inside the bold
      labelRaw = labelRaw.replace(/:+\s*$/, '').trim()

      if (!inDl) {
        htmlParts.push('<dl class="dl-horizontal">')
        inDl = true
      }

      htmlParts.push(`<dt>${labelRaw}:</dt><dd>${value}</dd>`)
      continue
    }

    // Default: wrap as paragraph
    closeDlIfOpen()
    htmlParts.push(`<p>${l}</p>`)
  }

  // Close any open DL at the end
  if (inDl) {
    htmlParts.push('</dl>')
  }

  const processedContent = htmlParts.join('\n').replace(/\n+/g, '\n').trim()
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

export async function generateMetadata({ params }: SecurityAdvisoryPageProps): Promise<Metadata> {
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