import { beforeEach, describe, expect, it, vi } from 'vitest';

async function freshStore() {
  vi.resetModules();
  return import('./themeStore');
}

describe('themeStore', () => {
  beforeEach(() => {
    localStorage.clear();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn<(query: string) => { matches: boolean }>().mockReturnValue({ matches: false }),
    });
  });

  it('reads the saved theme first', async () => {
    localStorage.setItem('theme', 'dark');
    const store = await freshStore();
    expect(store.getTheme()).toBe('dark');
  });

  it('falls back to the system preference', async () => {
    vi.mocked(window.matchMedia).mockReturnValue({ matches: true } as MediaQueryList);
    const store = await freshStore();
    expect(store.getTheme()).toBe('dark');
  });

  it('persists changes and notifies subscribers', async () => {
    const store = await freshStore();
    const listener = vi.fn<() => void>();
    const unsubscribe = store.subscribe(listener);

    store.setTheme('dark');
    expect(store.getTheme()).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    store.setTheme('light');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('always reports light on the server', async () => {
    const store = await freshStore();
    expect(store.getServerTheme()).toBe('light');
  });
});