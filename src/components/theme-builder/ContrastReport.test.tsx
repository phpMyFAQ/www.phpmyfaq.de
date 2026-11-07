import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContrastReport from './ContrastReport';
import { DEFAULT_THEME, cloneTheme } from '@/lib/themeBuilder/tokens';

describe('ContrastReport', () => {
  it('lists each pair with its ratio and verdict', () => {
    render(<ContrastReport theme={DEFAULT_THEME} mode="light" />);
    const body = screen.getByText('Body text on body background').closest('li')!;
    expect(body).toHaveTextContent(/\d+\.\d\d:1/);
    expect(body).toHaveTextContent('Pass');
  });

  it('names the required ratio on failure', () => {
    const theme = cloneTheme(DEFAULT_THEME);
    theme['high-contrast']['--bs-body-color'] = '#777777';
    render(<ContrastReport theme={theme} mode="high-contrast" />);
    const body = screen.getByText('Body text on body background').closest('li')!;
    expect(body).toHaveTextContent('Fail (needs 7:1)');
  });
});