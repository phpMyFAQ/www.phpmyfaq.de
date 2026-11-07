// Colour tokens of the phpMyFAQ 4.2 default theme (assets/templates/default/theme.css).
// The frontend sets these Bootstrap custom properties per colour mode; everything
// else in the theme derives from them.

export type Mode = 'light' | 'dark' | 'high-contrast';

export const MODES: readonly Mode[] = ['light', 'dark', 'high-contrast'];

export const MODE_LABELS: Record<Mode, string> = {
  light: 'Light',
  dark: 'Dark',
  'high-contrast': 'High contrast',
};

export type TokenName =
  | '--bs-light'
  | '--bs-dark'
  | '--bs-primary'
  | '--bs-secondary'
  | '--bs-info'
  | '--bs-success'
  | '--bs-warning'
  | '--bs-danger'
  | '--bs-pmf-nav'
  | '--bs-pmf-footer'
  | '--bs-pmf-background'
  | '--bs-body-bg'
  | '--bs-body-color'
  | '--bs-border-color'
  | '--bs-link-color'
  | '--bs-link-hover-color';

export interface TokenDefinition {
  name: TokenName;
  label: string;
  description: string;
}

export const TOKENS: readonly TokenDefinition[] = [
  { name: '--bs-primary', label: 'Primary', description: 'Buttons, links and active navigation items.' },
  { name: '--bs-secondary', label: 'Secondary', description: 'Secondary buttons and badges.' },
  { name: '--bs-info', label: 'Info', description: 'Informational alerts and badges.' },
  { name: '--bs-success', label: 'Success', description: 'Success alerts and confirmation buttons.' },
  { name: '--bs-warning', label: 'Warning', description: 'Warning alerts and badges.' },
  { name: '--bs-danger', label: 'Danger', description: 'Error alerts and destructive buttons.' },
  { name: '--bs-light', label: 'Light', description: 'Light text on dark surfaces such as the navigation.' },
  { name: '--bs-dark', label: 'Dark', description: 'Dark text and dark surfaces.' },
  { name: '--bs-pmf-nav', label: 'Navigation bar', description: 'Background of the top navigation.' },
  { name: '--bs-pmf-footer', label: 'Footer', description: 'Background of the footer.' },
  { name: '--bs-pmf-background', label: 'Page background', description: 'Background behind the content area.' },
  { name: '--bs-body-bg', label: 'Body background', description: 'Background of the content area.' },
  { name: '--bs-body-color', label: 'Body text', description: 'Default text colour.' },
  { name: '--bs-border-color', label: 'Borders', description: 'Card and table borders.' },
  { name: '--bs-link-color', label: 'Links', description: 'Link colour (high contrast only by default).' },
  { name: '--bs-link-hover-color', label: 'Link hover', description: 'Link colour on hover.' },
];

export type ModeTokens = Partial<Record<TokenName, string>>;
export type ThemeState = Record<Mode, ModeTokens>;

// Values copied from phpMyFAQ 4.2 theme.css. Keep the order of the keys: the
// CSS generator writes them in insertion order and the output is compared to
// the upstream file in tests.
export const DEFAULT_THEME: ThemeState = {
  light: {
    '--bs-light': '#eceff9',
    '--bs-dark': '#060508',
    '--bs-primary': '#083c83',
    '--bs-secondary': '#1d646a',
    '--bs-info': '#40b0ae',
    '--bs-success': '#0aa05c',
    '--bs-warning': '#e1ca0a',
    '--bs-danger': '#f01704',
    '--bs-pmf-nav': '#2f3035',
    '--bs-pmf-footer': '#142f48',
    '--bs-pmf-background': '#9eb6c9',
    '--bs-body-bg': '#ffffff',
    '--bs-body-color': '#212529',
  },
  dark: {
    '--bs-light': '#eceff9',
    '--bs-dark': '#060508',
    '--bs-primary': '#083c83',
    '--bs-secondary': '#1d646a',
    '--bs-info': '#40b0ae',
    '--bs-success': '#0aa05c',
    '--bs-warning': '#e1ca0a',
    '--bs-danger': '#f01704',
    '--bs-pmf-nav': '#1d212a',
    '--bs-pmf-footer': '#1d212a',
    '--bs-pmf-background': '#14171d',
    '--bs-body-bg': '#14171d',
    '--bs-body-color': '#eceff9',
    '--bs-border-color': '#2e3440',
  },
  'high-contrast': {
    '--bs-light': '#ffffff',
    '--bs-dark': '#000000',
    '--bs-primary': '#ffff00',
    '--bs-secondary': '#00ffff',
    '--bs-info': '#00ffff',
    '--bs-success': '#00ff00',
    '--bs-warning': '#ffff00',
    '--bs-danger': '#ff0000',
    '--bs-pmf-nav': '#000000',
    '--bs-pmf-footer': '#000000',
    '--bs-pmf-background': '#000000',
    '--bs-body-bg': '#000000',
    '--bs-body-color': '#ffffff',
    '--bs-border-color': '#ffffff',
    '--bs-link-color': '#ffff00',
    '--bs-link-hover-color': '#ffff66',
  },
};

export interface ContrastPair {
  id: string;
  label: string;
  foreground: TokenName | '#ffffff' | '#000000';
  background: TokenName;
}

// Foreground/background combinations that appear on every phpMyFAQ page.
// Bootstrap paints button labels white on primary, secondary, success, info
// and danger, and dark on warning; the navigation and footer use --bs-light.
export const CONTRAST_PAIRS: readonly ContrastPair[] = [
  { id: 'body', label: 'Body text on body background', foreground: '--bs-body-color', background: '--bs-body-bg' },
  { id: 'nav', label: 'Navigation text on navigation bar', foreground: '--bs-light', background: '--bs-pmf-nav' },
  { id: 'footer', label: 'Footer text on footer', foreground: '--bs-light', background: '--bs-pmf-footer' },
  { id: 'primary', label: 'White on primary button', foreground: '#ffffff', background: '--bs-primary' },
  { id: 'secondary', label: 'White on secondary button', foreground: '#ffffff', background: '--bs-secondary' },
  { id: 'success', label: 'White on success', foreground: '#ffffff', background: '--bs-success' },
  { id: 'danger', label: 'White on danger', foreground: '#ffffff', background: '--bs-danger' },
  { id: 'warning', label: 'Black on warning', foreground: '#000000', background: '--bs-warning' },
  {
    id: 'primary-text',
    label: 'Primary as text on body background',
    foreground: '--bs-primary',
    background: '--bs-body-bg',
  },
];

export const HEX_COLOR = /^#[0-9a-f]{6}$/i;

export function isHexColor(value: string): boolean {
  return HEX_COLOR.test(value);
}

export function cloneTheme(theme: ThemeState): ThemeState {
  return {
    light: { ...theme.light },
    dark: { ...theme.dark },
    'high-contrast': { ...theme['high-contrast'] },
  };
}