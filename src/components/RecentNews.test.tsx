import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import RecentNews from './RecentNews'
import * as newsLib from '@/lib/news'

vi.mock('@/lib/news')

describe('RecentNews', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render news items', () => {
    const mockNews = [
      {
        date: '2025-10-04',
        content: 'We are excited to announce [phpMyFAQ 4.1.0-alpha.3](/download).'
      },
      {
        date: '2025-10-03',
        content: 'The phpMyFAQ Team is pleased to announce [phpMyFAQ 4.0.13](/download).'
      }
    ]

    vi.mocked(newsLib.getRecentNews).mockReturnValue(mockNews)

    render(<RecentNews />)

    expect(screen.getByText('Latest phpMyFAQ news')).toBeInTheDocument()
    expect(screen.getByText('2025-10-04')).toBeInTheDocument()
    expect(screen.getByText('2025-10-03')).toBeInTheDocument()
  })

  it('should convert markdown links to HTML', () => {
    const mockNews = [
      {
        date: '2025-10-04',
        content: 'Check out [phpMyFAQ 4.1.0](/download) now!'
      }
    ]

    vi.mocked(newsLib.getRecentNews).mockReturnValue(mockNews)

    render(<RecentNews />)

    const link = screen.getByText('phpMyFAQ 4.1.0')
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', '/download')
  })

  it('should call getRecentNews with limit of 6', () => {
    vi.mocked(newsLib.getRecentNews).mockReturnValue([])

    render(<RecentNews />)

    expect(newsLib.getRecentNews).toHaveBeenCalledWith(6)
  })

  it('should render news archive link', () => {
    vi.mocked(newsLib.getRecentNews).mockReturnValue([])

    render(<RecentNews />)

    const archiveLink = screen.getByText('news archive')
    expect(archiveLink.closest('a')).toHaveAttribute('href', '/news')
  })

  it('should handle empty news array', () => {
    vi.mocked(newsLib.getRecentNews).mockReturnValue([])

    render(<RecentNews />)

    expect(screen.getByText('Latest phpMyFAQ news')).toBeInTheDocument()
    expect(screen.queryByText(/2025-/)).not.toBeInTheDocument()
  })
})
