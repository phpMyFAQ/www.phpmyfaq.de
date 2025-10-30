import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import DemoPage from './page'

vi.mock('@/lib/data', () => ({
  getVersions: () => ({ stable: '4.0.13', development: '4.1.0-alpha.3' })
}))

describe('DemoPage', () => {
  it('renders title and credentials', () => {
    render(<DemoPage />)
    expect(screen.getByText('Demo')).toBeInTheDocument()
    expect(screen.getByText(/Admin user/i)).toBeInTheDocument()
    expect(screen.getByText(/Normal user/i)).toBeInTheDocument()
    expect(screen.getAllByText(/demoadmin/i)[0]).toBeInTheDocument()
    expect(screen.getAllByText(/demouser/i)[0]).toBeInTheDocument()
  })

  it('shows stable demo link', () => {
    render(<DemoPage />)
    const link = screen.getByRole('link', { name: /phpMyFAQ 4.0.13/i })
    expect(link).toHaveAttribute('href', 'https://roy.demo.phpmyfaq.de/')
  })
})
