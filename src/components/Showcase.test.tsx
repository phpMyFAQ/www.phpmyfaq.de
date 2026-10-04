import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Showcase from './Showcase';

describe('Showcase', () => {
  it('shows three screenshots, loading the featured one eagerly', () => {
    render(<Showcase />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute('loading', 'eager');
    expect(images[1]).toHaveAttribute('loading', 'lazy');
  });

  it('links to the full gallery and the demo', () => {
    render(<Showcase />);
    expect(screen.getByRole('link', { name: /more screenshots/i })).toHaveAttribute('href', '/features');
    expect(screen.getByRole('link', { name: /live demo/i })).toHaveAttribute('href', '/demo');
  });
});