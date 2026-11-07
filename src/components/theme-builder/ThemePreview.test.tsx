import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ThemePreview from './ThemePreview';
import { DEFAULT_THEME, cloneTheme } from '@/lib/themeBuilder/tokens';

describe('ThemePreview', () => {
  it('scopes the generated CSS to the preview element and sets the mode', () => {
    const theme = cloneTheme(DEFAULT_THEME);
    theme.dark['--bs-primary'] = '#ff6600';
    const { container } = render(<ThemePreview theme={theme} mode="dark" />);
    const preview = screen.getByTestId('theme-preview');
    expect(preview).toHaveAttribute('data-bs-theme', 'dark');
    const style = container.querySelector('style')!.textContent!;
    expect(style).toContain("#pmf-theme-preview[data-bs-theme='dark'] {");
    expect(style).toContain('--bs-primary: #ff6600;');
    expect(style).not.toContain(':root');
  });

  it('shows the typical phpMyFAQ page parts', () => {
    render(<ThemePreview theme={DEFAULT_THEME} mode="light" />);
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByText('How do I reset my password?')).toBeInTheDocument();
    expect(screen.getByText(/powered by phpMyFAQ/i)).toBeInTheDocument();
  });
});