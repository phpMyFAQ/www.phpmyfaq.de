import { describe, expect, it } from 'vitest';
import { CONTRAST_PAIRS, DEFAULT_THEME, MODES, TOKENS, cloneTheme, isHexColor } from './tokens';

describe('theme tokens', () => {
  it('ships the phpMyFAQ 4.2 default colours', () => {
    expect(MODES).toEqual(['light', 'dark', 'high-contrast']);
    expect(DEFAULT_THEME.light['--bs-primary']).toBe('#083c83');
    expect(DEFAULT_THEME.light['--bs-body-bg']).toBe('#ffffff');
    expect(DEFAULT_THEME.light['--bs-border-color']).toBeUndefined();
    expect(DEFAULT_THEME.dark['--bs-border-color']).toBe('#2e3440');
    expect(DEFAULT_THEME.dark['--bs-body-color']).toBe('#eceff9');
    expect(DEFAULT_THEME['high-contrast']['--bs-link-hover-color']).toBe('#ffff66');
  });

  it('lists every token exactly once', () => {
    const names = TOKENS.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
    expect(names).toHaveLength(16);
  });

  it('only references known tokens in contrast pairs', () => {
    const names = new Set<string>(TOKENS.map((t) => t.name));
    for (const pair of CONTRAST_PAIRS) {
      expect(names.has(pair.background)).toBe(true);
      expect(names.has(pair.foreground) || /^#[0-9a-f]{6}$/i.test(pair.foreground)).toBe(true);
    }
  });

  it('validates six-digit hex colours only', () => {
    expect(isHexColor('#083c83')).toBe(true);
    expect(isHexColor('#ABCDEF')).toBe(true);
    expect(isHexColor('#abc')).toBe(false);
    expect(isHexColor('rgb(0,0,0)')).toBe(false);
    expect(isHexColor('083c83')).toBe(false);
  });

  it('clones without sharing references', () => {
    const copy = cloneTheme(DEFAULT_THEME);
    copy.light['--bs-primary'] = '#000000';
    expect(DEFAULT_THEME.light['--bs-primary']).toBe('#083c83');
  });
});