import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ThemeBuilderPage from './page';

describe('ThemeBuilderPage', () => {
  it('tells visitors that the output works for phpMyFAQ 4.1 as well', () => {
    render(<ThemeBuilderPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Theme Builder');
    expect(screen.getByText(/works with phpMyFAQ 4\.1 as well/)).toBeInTheDocument();
  });
});