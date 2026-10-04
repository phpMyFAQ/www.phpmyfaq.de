import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Highlights from './Highlights';

describe('Highlights', () => {
  it('renders six feature cards and a link to the features page', () => {
    render(<Highlights />);
    expect(screen.getByRole('heading', { level: 2, name: /everything a knowledge base needs/i })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(6);
    expect(screen.getByRole('link', { name: /all features/i })).toHaveAttribute('href', '/features');
  });
});