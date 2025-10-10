import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface NewsItem {
  date: string
  content: string
}

/**
 * Parse a single year's news markdown file and extract individual news entries
 */
export function parseNewsFile(year: string): NewsItem[] {
  try {
    const filePath = path.join(process.cwd(), 'content/news', `${year}.md`)

    if (!fs.existsSync(filePath)) {
      return []
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { content } = matter(fileContents)

    // Split by date headers (### YYYY-MM-DD)
    const datePattern = /^### (\d{4}-\d{2}-\d{2})\s*$/gm
    const entries: NewsItem[] = []

    let match
    const matches: { date: string; index: number }[] = []

    // Find all date headers and their positions
    while ((match = datePattern.exec(content)) !== null) {
      matches.push({
        date: match[1],
        index: match.index + match[0].length
      })
    }

    // Extract content between date headers
    for (let i = 0; i < matches.length; i++) {
      const current = matches[i]
      const next = matches[i + 1]

      const startIndex = current.index
      // Calculate how much to subtract for next header
      // We need to find the position right before the next "###" line
      let endIndex: number
      if (next) {
        // Find where the next header starts (the ### line itself)
        const nextHeaderStart = content.lastIndexOf('\n###', next.index)
        endIndex = nextHeaderStart > startIndex ? nextHeaderStart : next.index
      } else {
        endIndex = content.length
      }

      let itemContent = content.substring(startIndex, endIndex).trim()

      // Remove separator lines (* * *)
      itemContent = itemContent.replace(/^\*\s*\*\s*\*\s*$/gm, '').trim()

      if (itemContent) {
        entries.push({
          date: current.date,
          content: itemContent
        })
      }
    }

    return entries
  } catch {
    return []
  }
}

/**
 * Get the most recent N news entries across years
 */
export function getRecentNews(limit: number = 6): NewsItem[] {
  const currentYear: number = new Date().getFullYear()
  const allNews: NewsItem[] = []

  // Try the current year and previous years until we have enough entries
  for (let year: number = currentYear; year >= currentYear - 2 && allNews.length < limit * 2; year--) {
    const yearNews = parseNewsFile(year.toString())
    allNews.push(...yearNews)
  }

  // Sort by date descending (newest first)
  allNews.sort((a, b): number => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })

  // Return only the requested number of entries
  return allNews.slice(0, limit)
}
