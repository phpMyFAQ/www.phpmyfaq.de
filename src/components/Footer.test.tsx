import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('should render footer with current year', () => {
    render(<Footer />)

    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`2001-${currentYear}`))).toBeInTheDocument()
  })

  it('should render all footer sections', () => {
    render(<Footer />)

    expect(screen.getByText('Getting started')).toBeInTheDocument()
    expect(screen.getByText('Resources')).toBeInTheDocument()
    expect(screen.getByText('Misc')).toBeInTheDocument()
    expect(screen.getByText('Get Connected')).toBeInTheDocument()
  })

  it('should render social media links', () => {
    render(<Footer />)

    const githubLink = screen.getByLabelText('phpMyFAQ at Github')
    const facebookLink = screen.getByLabelText('phpMyFAQ at Facebook')
    const discordLink = screen.getByLabelText('phpMyFAQ Discord Community')

    expect(githubLink).toHaveAttribute('href', 'https://github.com/thorsten/phpMyFAQ')
    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/phpMyFAQ/')
    expect(discordLink).toHaveAttribute('href', 'https://discord.gg/wszhTceuNM')
  })

  it('should render navigation links', () => {
    render(<Footer />)

    expect(screen.getByText('Requirements')).toBeInTheDocument()
    expect(screen.getByText('Download')).toBeInTheDocument()
    expect(screen.getByText('Changelog')).toBeInTheDocument()
    expect(screen.getByText('Translations')).toBeInTheDocument()
  })

  it('should render developer credit', () => {
    render(<Footer />)

    expect(screen.getByText(/Thorsten Rinne and the phpMyFAQ Team/)).toBeInTheDocument()
  })
})