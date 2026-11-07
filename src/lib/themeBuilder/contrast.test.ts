import { describe, expect, it } from 'vitest';
import { DEFAULT_THEME, cloneTheme } from './tokens';
import { contrastRatio, contrastReport, requiredRatio } from './contrast';

describe('contrastRatio', () => {
  it('matches the WCAG reference values', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
    expect(contrastRatio('#ffffff', '#000000')).toBeCloseTo(21, 5);
    expect(contrastRatio('#767676', '#ffffff')).toBeCloseTo(4.54, 2);
    expect(contrastRatio('#083c83', '#ffffff')).toBeGreaterThan(9);
  });
});

describe('requiredRatio', () => {
  it('is AA for light and dark, AAA for high contrast', () => {
    expect(requiredRatio('light')).toBe(4.5);
    expect(requiredRatio('dark')).toBe(4.5);
    expect(requiredRatio('high-contrast')).toBe(7);
  });
});

describe('contrastReport', () => {
  it('reports every pair with a verdict', () => {
    const report = contrastReport(DEFAULT_THEME, 'light');
    expect(report.map((r) => r.id)).toContain('body');
    const body = report.find((r) => r.id === 'body')!;
    expect(body.foreground).toBe('#212529');
    expect(body.background).toBe('#ffffff');
    expect(body.passes).toBe(true);
    expect(body.required).toBe(4.5);
  });

  it('fails a pair when the colours are too close', () => {
    const theme = cloneTheme(DEFAULT_THEME);
    theme.light['--bs-body-color'] = '#eeeeee';
    const body = contrastReport(theme, 'light').find((r) => r.id === 'body')!;
    expect(body.passes).toBe(false);
  });

  it('skips pairs whose token is not set in this mode', () => {
    const theme = cloneTheme(DEFAULT_THEME);
    delete theme.light['--bs-pmf-footer'];
    expect(contrastReport(theme, 'light').find((r) => r.id === 'footer')).toBeUndefined();
  });
});