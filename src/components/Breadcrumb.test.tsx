import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Breadcrumb from './Breadcrumb';

describe('Breadcrumb', () => {
  it('links the parent and marks the current page', () => {
    render(<Breadcrumb parent={{ href: '/news', label: 'News' }} current="2026" />);
    const nav = screen.getByRole('navigation', { name: 'breadcrumb' });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'News' })).toHaveAttribute('href', '/news');
    const current = nav.querySelector('[aria-current="page"]');
    expect(current).toHaveTextContent('2026');
  });
});