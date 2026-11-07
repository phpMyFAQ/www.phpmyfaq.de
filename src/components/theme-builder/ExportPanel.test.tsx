import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import ExportPanel from './ExportPanel';
import { DEFAULT_THEME, cloneTheme } from '@/lib/themeBuilder/tokens';

describe('ExportPanel', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('shows the custom CSS and copies it', async () => {
    const writeText = vi.fn<(text: string) => Promise<void>>().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    const theme = cloneTheme(DEFAULT_THEME);
    theme.light['--bs-primary'] = '#ff6600';

    render(<ExportPanel theme={theme} />);
    expect((screen.getByLabelText('Custom CSS') as HTMLTextAreaElement).value).toContain('--bs-primary: #ff6600;');

    const button = screen.getByRole('button', { name: 'Copy custom CSS' });
    await act(async () => {
      fireEvent.click(button);
    });
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining("[data-bs-theme='dark']"));
    expect(button).toHaveTextContent('Copied');
  });

  it('downloads theme.css through an object URL', () => {
    const createObjectURL = vi.fn<(blob: Blob) => string>().mockReturnValue('blob:test');
    const revokeObjectURL = vi.fn<(url: string) => void>();
    vi.stubGlobal('URL', Object.assign(URL, { createObjectURL, revokeObjectURL }));
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    render(<ExportPanel theme={DEFAULT_THEME} />);
    fireEvent.click(screen.getByRole('button', { name: 'Download theme.css' }));

    expect(createObjectURL).toHaveBeenCalledTimes(1);
    const blob = createObjectURL.mock.calls[0][0] as Blob;
    expect(blob.type).toBe('text/css');
    expect(click).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:test');
  });

  it('disables the download when object URLs are unavailable', () => {
    const original = URL.createObjectURL;
    // jsdom does not implement createObjectURL; make the absence explicit.
    Object.defineProperty(URL, 'createObjectURL', { value: undefined, configurable: true });
    render(<ExportPanel theme={DEFAULT_THEME} />);
    expect(screen.getByRole('button', { name: 'Download theme.css' })).toBeDisabled();
    Object.defineProperty(URL, 'createObjectURL', { value: original, configurable: true });
  });
});