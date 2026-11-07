import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ThemeBuilder from './ThemeBuilder';
import { encodeTheme } from '@/lib/themeBuilder/serialize';
import { DEFAULT_THEME, cloneTheme } from '@/lib/themeBuilder/tokens';

describe('ThemeBuilder', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/theme-builder/');
  });

  it('edits the current mode and updates preview and export', () => {
    render(<ThemeBuilder />);
    fireEvent.change(screen.getByLabelText('Primary hex value'), { target: { value: '#ff6600' } });
    const css = (screen.getByLabelText('Custom CSS') as HTMLTextAreaElement).value;
    expect(css.split("[data-bs-theme='dark']")[0]).toContain('--bs-primary: #ff6600;');
    expect(css.split("[data-bs-theme='dark']")[1]).toContain('--bs-primary: #083c83;');
    const expected = cloneTheme(DEFAULT_THEME);
    expected.light['--bs-primary'] = '#ff6600';
    expect(window.location.hash).toBe('#' + encodeTheme(expected));
  });

  it('switches modes with the tabs', () => {
    render(<ThemeBuilder />);
    fireEvent.click(screen.getByRole('tab', { name: 'Dark' }));
    expect(screen.getByRole('tab', { name: 'Dark' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('theme-preview')).toHaveAttribute('data-bs-theme', 'dark');
    expect(screen.getByLabelText('Navigation bar hex value')).toHaveValue('#1d212a');
  });

  it('restores state from the URL hash and resets to defaults', () => {
    const theme = cloneTheme(DEFAULT_THEME);
    theme.light['--bs-danger'] = '#aa0000';
    window.history.replaceState(null, '', '/theme-builder/#' + encodeTheme(theme));
    render(<ThemeBuilder />);
    expect(screen.getByLabelText('Danger hex value')).toHaveValue('#aa0000');
    fireEvent.click(screen.getByRole('button', { name: 'Reset to phpMyFAQ defaults' }));
    expect(screen.getByLabelText('Danger hex value')).toHaveValue('#f01704');
  });
});