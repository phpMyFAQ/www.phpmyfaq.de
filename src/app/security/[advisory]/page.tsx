import { readFileSync } from 'fs'
import { join } from 'path'
import PageLayout from '@/components/PageLayout'
import { generatePageMetadata } from '@/components/PageLayout'
import { Metadata } from 'next'
import { parseAdvisoryToHTML } from '@/lib/securityAdvisory'
import Link from 'next/link'
import { notFound } from 'next/navigation'

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
  } catch (_error) {
    return null
  }
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
  
  const html = parseAdvisoryToHTML(advisoryData.content)

  return (
    <PageLayout title={advisoryData.title}>
      <div className="row">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/advisories">Security Advisories</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{advisory}</li>
            </ol>
          </nav>

          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </PageLayout>
  )
}