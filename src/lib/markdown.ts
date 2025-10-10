import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export interface PageData {
  content: string
  frontmatter: {
    title?: string
    description?: string
    layout?: string
    [key: string]: any
  }
}

export function getMarkdownContent(filePath: string): PageData | null {
  try {
    const fullPath = path.join(process.cwd(), filePath)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      content: marked.parse(content) as string,
      frontmatter: data
    }
  } catch {
    return null
  }
}

export function getHandlebarsContent(filePath: string): PageData | null {
  try {
    const fullPath = path.join(process.cwd(), filePath)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Simple conversion from Handlebars to HTML
    // This is a basic implementation - more complex Handlebars logic would need custom handling
    let htmlContent = content
      .replace(/\{\{>\s*([^}]+)\s*\}\}/g, '') // Remove partials for now
      .replace(/\{\{#markdown\}\}([\s\S]*?)\{\{\/markdown\}\}/g, (match, mdContent) => {
        return marked.parse(mdContent) as string
      })
      .replace(/\{\{([^}]+)\}\}/g, '') // Remove remaining Handlebars expressions for now
    
    return {
      content: htmlContent,
      frontmatter: data
    }
  } catch {
    return null
  }
}

export function getAllNewsFiles(): string[] {
  const newsDir = path.join(process.cwd(), 'app/templates/pages/news')
  
  if (!fs.existsSync(newsDir)) {
    return []
  }
  
  return fs.readdirSync(newsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''))
}

export function getAllSecurityAdvisories(): string[] {
  const securityDir = path.join(process.cwd(), 'app/templates/pages/security')
  
  if (!fs.existsSync(securityDir)) {
    return []
  }
  
  return fs.readdirSync(securityDir)
    .filter(file => file.startsWith('advisory-') && (file.endsWith('.md') || file.endsWith('.hbs')))
    .map(file => file.replace(/\.(md|hbs)$/, ''))
}

export function getAllDocsFiles(): string[] {
  const docsDir = path.join(process.cwd(), 'app/templates/pages/docs')
  
  if (!fs.existsSync(docsDir)) {
    return []
  }
  
  return fs.readdirSync(docsDir)
    .filter(file => file.endsWith('.md') || file.endsWith('.hbs'))
    .map(file => file.replace(/\.(md|hbs)$/, ''))
}