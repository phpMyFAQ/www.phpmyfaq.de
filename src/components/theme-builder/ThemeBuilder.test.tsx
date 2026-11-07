import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import ThemeBuilder from './ThemeBuilder';
import { encodeTheme } from '@/lib/themeBuilder/serialize';
import { DEFAULT_THEME, cloneTheme } from '@/lib/themeBuilder/tokens';

describe('ThemeBuilder', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.history.replaceState(null, '', '/theme-builder/');
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('edits the current mode and updates preview and export', () => {
    render(<ThemeBuilder />);
    fireEvent.change(screen.getByLabelText('Primary hex value'), { target: { value: '#ff6600' } });
    const css = (screen.getByLabelText('Custom CSS') as HTMLTextAreaElement).value;
    expect(css.split("[data-bs-theme='dark']")[0]).toContain('--bs-primary: #ff6600;');
    expect(css.split("[data-bs-theme='dark']")[1]).toContain('--bs-primary: #083c83;');
  });

  it('writes the URL hash debounced, not on every change', () => {
    render(<ThemeBuilder />);
    fireEvent.change(screen.getByLabelText('Primary hex value'), { target: { value: '#ff6600' } });
    expect(window.location.hash).toBe('');
    act(() => {
      vi.advanceTimersByTime(300);
    });
    const expected = cloneTheme(DEFAULT_THEME);
    expected.light['--bs-primary'] = '#ff6600';
    expect(window.location.hash).toBe('#' + encodeTheme(expected));
  });

  it('leaves the URL without a hash while the theme equals the defaults', () => {
    render(<ThemeBuilder />);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(window.location.hash).toBe('');
    expect(window.location.pathname).toBe('/theme-builder/');
  });

  it('switches modes with the tabs', () => {
    render(<ThemeBuilder />);
    fireEvent.click(screen.getByRole('tab', { name: 'Dark' }));
    expect(screen.getByRole('tab', { name: 'Dark' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('theme-preview')).toHaveAttribute('data-bs-theme', 'dark');
    expect(screen.getByLabelText('Navigation bar hex value')).toHaveValue('#1d212a');
  });

  it('does not carry an invalid draft into another mode or past a reset', () => {
    render(<ThemeBuilder />);
    fireEvent.change(screen.getByLabelText('Primary hex value'), { target: { value: '#12' } });
    expect(screen.getByLabelText('Primary hex value')).toHaveAttribute('aria-invalid', 'true');
    fireEvent.click(screen.getByRole('tab', { name: 'Dark' }));
    expect(screen.getByLabelText('Primary hex value')).toHaveValue('#083c83');
    expect(screen.getByLabelText('Primary hex value')).not.toHaveAttribute('aria-invalid');
    fireEvent.change(screen.getByLabelText('Primary hex value'), { target: { value: '#12' } });
    fireEvent.click(screen.getByRole('button', { name: 'Reset to phpMyFAQ defaults' }));
    expect(screen.getByLabelText('Primary hex value')).toHaveValue('#083c83');
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

  it('follows a hashchange from outside', () => {
    render(<ThemeBuilder />);
    const theme = cloneTheme(DEFAULT_THEME);
    theme.light['--bs-danger'] = '#aa0000';
    act(() => {
      window.location.hash = '#' + encodeTheme(theme);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
    expect(screen.getByLabelText('Danger hex value')).toHaveValue('#aa0000');
  });

  it('hydrates server markup rendered with defaults when the URL carries a theme', async () => {
    const theme = cloneTheme(DEFAULT_THEME);
    theme.light['--bs-danger'] = '#aa0000';
    const html = renderToString(<ThemeBuilder />);
    window.history.replaceState(null, '', '/theme-builder/#' + encodeTheme(theme));

    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);
    // React reports a server/client mismatch through onRecoverableError and
    // then re-renders from scratch, so the UI alone cannot show the problem.
    const recovered: string[] = [];
    const errors = vi.spyOn(console, 'error').mockImplementation(() => {});
    let root: ReturnType<typeof hydrateRoot> | undefined;
    await act(async () => {
      root = hydrateRoot(container, <ThemeBuilder />, {
        onRecoverableError: (error) => recovered.push(String(error)),
      });
    });

    expect(recovered).toEqual([]);
    expect(errors.mock.calls.filter((call) => /hydrat/i.test(call.map(String).join(' ')))).toEqual([]);
    expect(container.querySelector<HTMLInputElement>('[aria-label="Danger hex value"]')!.value).toBe('#aa0000');

    await act(async () => {
      root!.unmount();
    });
    container.remove();
    errors.mockRestore();
  });
});