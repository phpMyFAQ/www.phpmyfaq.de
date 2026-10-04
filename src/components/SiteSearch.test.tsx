import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SiteSearch, { type PagefindUiConstructor } from './SiteSearch';

const fakeUi = () => vi.fn<(options: Record<string, unknown>) => unknown>();
const resolving = (ui: ReturnType<typeof fakeUi>) => () => Promise.resolve(ui as unknown as PagefindUiConstructor);

describe('SiteSearch', () => {
  it('loads the Pagefind UI into the dialog on first open', async () => {
    const PagefindUI = fakeUi();
    render(<SiteSearch loadUi={resolving(PagefindUI)} />);

    await userEvent.click(screen.getByRole('button', { name: 'Search the site' }));

    await waitFor(() => expect(PagefindUI).toHaveBeenCalledTimes(1));
    const options = PagefindUI.mock.calls[0][0] as { element: HTMLElement; translations: { placeholder: string } };
    expect(options.element).toBeInstanceOf(HTMLElement);
    expect(options.translations.placeholder).toBe('Search phpMyFAQ.de');
  });

  it('explains when the index is not available', async () => {
    render(<SiteSearch loadUi={() => Promise.reject(new Error('missing'))} />);

    await userEvent.click(screen.getByRole('button', { name: 'Search the site' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/generated when the site is built/);
  });

  it('opens with the slash key but not while typing in a field', async () => {
    const PagefindUI = fakeUi();
    render(
      <>
        <input aria-label="Other field" />
        <SiteSearch loadUi={resolving(PagefindUI)} />
      </>,
    );

    await userEvent.type(screen.getByRole('textbox', { name: 'Other field' }), '/');
    expect(PagefindUI).not.toHaveBeenCalled();

    await userEvent.click(document.body);
    await userEvent.keyboard('/');
    await waitFor(() => expect(PagefindUI).toHaveBeenCalledTimes(1));
  });
});