// WCAG 2.2 contrast calculation, see https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio
import { CONTRAST_PAIRS, type Mode, type ThemeState, type TokenName } from './tokens';

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(foregroundHex: string, backgroundHex: string): number {
  const l1 = relativeLuminance(foregroundHex);
  const l2 = relativeLuminance(backgroundHex);
  const [lighter, darker] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

// Light and dark aim for WCAG AA, high contrast for AAA (phpMyFAQ docs 12.3).
export function requiredRatio(mode: Mode): number {
  return mode === 'high-contrast' ? 7 : 4.5;
}

export interface ContrastResult {
  id: string;
  label: string;
  foreground: string;
  background: string;
  ratio: number;
  required: number;
  passes: boolean;
}

function resolve(theme: ThemeState, mode: Mode, value: TokenName | '#ffffff' | '#000000'): string | undefined {
  return value.startsWith('#') ? value : theme[mode][value];
}

export function contrastReport(theme: ThemeState, mode: Mode): ContrastResult[] {
  const required = requiredRatio(mode);
  const results: ContrastResult[] = [];
  for (const pair of CONTRAST_PAIRS) {
    const foreground = resolve(theme, mode, pair.foreground);
    const background = resolve(theme, mode, pair.background);
    if (!foreground || !background) {
      continue;
    }
    const ratio = contrastRatio(foreground, background);
    results.push({
      id: pair.id,
      label: pair.label,
      foreground,
      background,
      ratio,
      required,
      passes: ratio >= required,
    });
  }
  return results;
}