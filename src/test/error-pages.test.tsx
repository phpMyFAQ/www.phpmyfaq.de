import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import NotFound from '@/app/not-found'
import ErrorPage from '@/components/ErrorPage'

// Mock PageLayout to avoid layout dependencies in unit tests
vi.mock('@/components/PageLayout', () => ({
  default: ({ title, description, children }: never) => (
    <div>
      {title && <h1>{title}</h1>}
      {description && <p>{description}</p>}
      <div>{children}</div>
    </div>
  )
}))

describe('Custom NotFound page', () => {
  it('renders title, description and home link', () => {
    render(<NotFound />)
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
    expect(screen.getByText(/couldn't find the page/i)).toBeInTheDocument()
    const back = screen.getByRole('link', { name: /back to homepage/i })
    expect(back).toHaveAttribute('href', '/')
  })
})

describe('Custom Error page', () => {
  it('renders message and allows retry via reset()', () => {
    const reset = vi.fn()
    const error = new Error('Boom!')
    render(<ErrorPage error={error} reset={reset} />)
    expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument()
    // In test env NODE_ENV is usually 'test', details should be visible
    expect(screen.getByText(/details:/i)).toBeInTheDocument()
    expect(screen.getByText(/boom!/i)).toBeInTheDocument()
    const btn = screen.getByRole('button', { name: /try again/i })
    fireEvent.click(btn)
    expect(reset).toHaveBeenCalled()
  })
})
