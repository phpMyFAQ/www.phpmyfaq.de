import { describe, expect, it } from 'vitest';
import { DEFAULT_THEME, cloneTheme } from './tokens';
import { decodeTheme, encodeTheme } from './serialize';

describe('theme serialisation', () => {
  it('round-trips an edited theme', () => {
    const theme = cloneTheme(DEFAULT_THEME);
    theme.light['--bs-primary'] = '#ff6600';
    theme['high-contrast']['--bs-link-color'] = '#00ff00';
    expect(decodeTheme(encodeTheme(theme))).toEqual(theme);
  });

  it('encodes the default theme as an empty diff', () => {
    const payload = encodeTheme(DEFAULT_THEME);
    expect(payload.startsWith('v1.')).toBe(true);
    expect(decodeTheme(payload)).toEqual(DEFAULT_THEME);
  });

  it('falls back to defaults on garbage', () => {
    expect(decodeTheme('')).toEqual(DEFAULT_THEME);
    expect(decodeTheme('v1.not-base64!!')).toEqual(DEFAULT_THEME);
    expect(decodeTheme('v9.e30')).toEqual(DEFAULT_THEME);
  });

  it('drops unknown tokens and invalid colours', () => {
    const json = JSON.stringify({
      light: { '--bs-primary': '#123456', '--bs-future': '#000000', '--bs-danger': 'red' },
    });
    const payload = 'v1.' + Buffer.from(json).toString('base64url');
    const theme = decodeTheme(payload);
    expect(theme.light['--bs-primary']).toBe('#123456');
    expect(theme.light['--bs-danger']).toBe('#f01704');
    expect((theme.light as Record<string, string>)['--bs-future']).toBeUndefined();
  });
});