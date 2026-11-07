// Theme state in the URL hash, so a theme can be bookmarked and shared.
import { DEFAULT_THEME, MODES, TOKENS, type ThemeState, type TokenName, cloneTheme, isHexColor } from './tokens';

const VERSION = 'v1.';
const KNOWN_TOKENS = new Set<string>(TOKENS.map((t) => t.name));

function toBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(text: string): string {
  const base64 = text.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '='));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeTheme(theme: ThemeState): string {
  const diff: Record<string, Record<string, string>> = {};
  for (const mode of MODES) {
    for (const [name, value] of Object.entries(theme[mode])) {
      if (value && value !== DEFAULT_THEME[mode][name as TokenName]) {
        diff[mode] ??= {};
        diff[mode][name] = value;
      }
    }
  }
  return VERSION + toBase64Url(JSON.stringify(diff));
}

export function decodeTheme(payload: string): ThemeState {
  const theme = cloneTheme(DEFAULT_THEME);
  if (!payload.startsWith(VERSION)) {
    return theme;
  }
  try {
    const parsed: unknown = JSON.parse(fromBase64Url(payload.slice(VERSION.length)));
    if (!parsed || typeof parsed !== 'object') {
      return theme;
    }
    for (const mode of MODES) {
      const tokens = (parsed as Record<string, unknown>)[mode];
      if (!tokens || typeof tokens !== 'object') {
        continue;
      }
      for (const [name, value] of Object.entries(tokens as Record<string, unknown>)) {
        if (KNOWN_TOKENS.has(name) && typeof value === 'string' && isHexColor(value)) {
          theme[mode][name as TokenName] = value.toLowerCase();
        }
      }
    }
    return theme;
  } catch {
    return cloneTheme(DEFAULT_THEME);
  }
}