# Theme Builder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/theme-builder/` on www.phpmyfaq.de: pick colours for the three phpMyFAQ 4.2 colour modes, preview them, check contrast, export CSS for `layout.customCss` or a `theme.css` file.

**Architecture:** Framework-free logic in `src/lib/themeBuilder/` (tokens, CSS generation, contrast maths, URL-hash serialisation) feeding a client component tree in `src/components/theme-builder/`. The page route is a thin server component. No server code: the site is a Next.js static export.

**Tech Stack:** Next.js 16 App Router (static export), React 19, TypeScript 7, SCSS modules, Vitest + React Testing Library, Playwright. Package manager is `pnpm`.

**Spec:** `docs/superpowers/specs/2026-11-07-theme-builder-design.md`

## Global Constraints

- Static export only (`output: 'export'`); no API routes, no server actions.
- Routes end with a trailing slash (`trailingSlash: true`); link as `/theme-builder`.
- Pages render through `PageLayout`; this page passes `searchable={false}`.
- Token defaults must equal `phpmyfaq/assets/templates/default/theme.css` of phpMyFAQ 4.2 (commit `65891f9`); values listed verbatim in Task 1.
- Contrast thresholds: light and dark modes 4.5:1 (WCAG AA), high-contrast mode 7:1 (WCAG AAA), per phpMyFAQ docs 12.3.
- Site styling uses the design tokens in `src/app/globals.scss` (`--color-*`) and `ContentBlocks.module.scss` classes; the preview uses only generated `--bs-*` variables.
- Lint and format with `pnpm lint` and `pnpm format:check`; commits follow Conventional Commits; pre-commit runs `pnpm lint && pnpm test:ci`.
- Prose written to files (docs, comments) is in full sentences.

## Review Focus

1. Colour input of `#abc` (3-digit) or `rgb(...)`: must be rejected, previous value kept, field marked invalid (Task 5 test).
2. URL hash from a future version with unknown token keys: unknown keys ignored, known ones applied (Task 4 test).
3. Export with every token unchanged must equal the shipped theme.css blocks byte-for-byte so a diff against upstream is empty (Task 2 test).
4. Preview `<style>` must be scoped to the preview container, otherwise editing `--bs-body-bg` restyles nothing or leaks into the site (Task 6 test).
5. Download in a browser without `URL.createObjectURL` (jsdom): must not throw; button falls back to disabled state (Task 7 test).

---

## File Structure

| Path                                                                                  | Responsibility                                                    |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `src/lib/themeBuilder/tokens.ts`                                                      | Types, mode list, token list, default values, contrast pair list  |
| `src/lib/themeBuilder/generateCss.ts`                                                 | `ThemeState` → CSS string (custom-CSS variant, theme.css variant) |
| `src/lib/themeBuilder/contrast.ts`                                                    | Hex parsing, relative luminance, contrast ratio, report           |
| `src/lib/themeBuilder/serialize.ts`                                                   | `ThemeState` ↔ URL-hash string                                    |
| `src/components/theme-builder/ThemeBuilder.tsx`                                       | Client root: state, mode tabs, layout                             |
| `src/components/theme-builder/ColorField.tsx`                                         | One token: colour picker + hex text input                         |
| `src/components/theme-builder/ThemePreview.tsx`                                       | Static phpMyFAQ mock styled by generated CSS                      |
| `src/components/theme-builder/ContrastReport.tsx`                                     | List of pairs with ratio and pass/fail                            |
| `src/components/theme-builder/ExportPanel.tsx`                                        | Copy custom CSS, download theme.css                               |
| `src/components/theme-builder/ThemeBuilder.module.scss`                               | Styles for all of the above                                       |
| `src/app/theme-builder/page.tsx`                                                      | Route, metadata, intro text                                       |
| `src/app/sitemap.ts`, `src/components/Footer.tsx`, `tests/e2e/*.spec.ts`, `README.md` | Wiring                                                            |

---

### Task 1: Tokens and defaults

**Files:**

- Create: `src/lib/themeBuilder/tokens.ts`
- Test: `src/lib/themeBuilder/tokens.test.ts`

**Interfaces:**

- Produces:

  ```ts
  export type Mode = 'light' | 'dark' | 'high-contrast';
  export const MODES: readonly Mode[];
  export const MODE_LABELS: Record<Mode, string>;
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
  export const TOKENS: readonly TokenDefinition[]; // display order
  export type ModeTokens = Partial<Record<TokenName, string>>;
  export type ThemeState = Record<Mode, ModeTokens>;
  export const DEFAULT_THEME: ThemeState;
  export interface ContrastPair {
    id: string;
    label: string;
    foreground: TokenName | '#ffffff' | '#000000';
    background: TokenName;
  }
  export const CONTRAST_PAIRS: readonly ContrastPair[];
  export const HEX_COLOR = /^#[0-9a-f]{6}$/i;
  export function isHexColor(value: string): boolean;
  export function cloneTheme(theme: ThemeState): ThemeState;
  ```

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/themeBuilder/tokens.test.ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest --run src/lib/themeBuilder/tokens.test.ts`
Expected: FAIL, "Failed to resolve import './tokens'".

- [ ] **Step 3: Write the implementation**

```ts
// src/lib/themeBuilder/tokens.ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest --run src/lib/themeBuilder/tokens.test.ts`
Expected: PASS, 5 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/themeBuilder/tokens.ts src/lib/themeBuilder/tokens.test.ts
git commit -m "feat(theme-builder): add phpMyFAQ 4.2 colour tokens and defaults"
```

---

### Task 2: CSS generation

**Files:**

- Create: `src/lib/themeBuilder/generateCss.ts`
- Test: `src/lib/themeBuilder/generateCss.test.ts`

**Interfaces:**

- Consumes: `ThemeState`, `MODES`, `DEFAULT_THEME` from Task 1.
- Produces:

  ```ts
  export function generateCustomCss(theme: ThemeState): string; // three variable blocks only
  export function generateThemeCss(theme: ThemeState): string; // full theme.css replacement
  export function generatePreviewCss(theme: ThemeState, scopeSelector: string): string; // blocks scoped under a selector
  ```

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/themeBuilder/generateCss.test.ts
import { describe, expect, it } from 'vitest';
import { DEFAULT_THEME, cloneTheme } from './tokens';
import { generateCustomCss, generatePreviewCss, generateThemeCss } from './generateCss';

const EXPECTED_LIGHT_BLOCK = `:root,
[data-bs-theme='light'] {
  --bs-light: #eceff9;
  --bs-dark: #060508;
  --bs-primary: #083c83;
  --bs-secondary: #1d646a;
  --bs-info: #40b0ae;
  --bs-success: #0aa05c;
  --bs-warning: #e1ca0a;
  --bs-danger: #f01704;
  --bs-pmf-nav: #2f3035;
  --bs-pmf-footer: #142f48;
  --bs-pmf-background: #9eb6c9;
  --bs-body-bg: #ffffff;
  --bs-body-color: #212529;
}`;

describe('generateCustomCss', () => {
  it('writes the three mode blocks in upstream order and format', () => {
    const css = generateCustomCss(DEFAULT_THEME);
    expect(css.startsWith(EXPECTED_LIGHT_BLOCK)).toBe(true);
    expect(css).toContain("\n\n[data-bs-theme='dark'] {\n  --bs-light: #eceff9;");
    expect(css).toContain("\n\n[data-bs-theme='high-contrast'] {\n  --bs-light: #ffffff;");
    expect(css).toContain('  --bs-link-hover-color: #ffff66;\n}');
    expect(css.endsWith('}\n')).toBe(true);
  });

  it('reflects edited values and skips tokens that are unset', () => {
    const theme = cloneTheme(DEFAULT_THEME);
    theme.light['--bs-primary'] = '#ff6600';
    delete theme.light['--bs-pmf-background'];
    const css = generateCustomCss(theme);
    expect(css).toContain('--bs-primary: #ff6600;');
    expect(css.split("[data-bs-theme='dark']")[0]).not.toContain('--bs-pmf-background');
  });
});

describe('generateThemeCss', () => {
  it('adds the header, the Atkinson font faces and the high-contrast body rule', () => {
    const css = generateThemeCss(DEFAULT_THEME);
    expect(css).toContain('phpMyFAQ 4.2 theme generated by https://www.phpmyfaq.de/theme-builder/');
    expect(css).toContain("font-family: 'Atkinson Hyperlegible Next';");
    expect(css).toContain("url('../../fonts/AtkinsonHyperlegibleNext-VariableFont_wght.ttf')");
    expect(css).toContain(
      "[data-bs-theme='high-contrast'] body {\n  font-family: 'Atkinson Hyperlegible Next' !important;",
    );
    expect(css).toContain(EXPECTED_LIGHT_BLOCK);
  });
});

describe('generatePreviewCss', () => {
  it('scopes every block under the given selector', () => {
    const css = generatePreviewCss(DEFAULT_THEME, '.preview');
    expect(css).toContain(".preview[data-bs-theme='light'] {");
    expect(css).toContain(".preview[data-bs-theme='dark'] {");
    expect(css).toContain(".preview[data-bs-theme='high-contrast'] {");
    expect(css).not.toContain(':root');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest --run src/lib/themeBuilder/generateCss.test.ts`
Expected: FAIL, "Failed to resolve import './generateCss'".

- [ ] **Step 3: Write the implementation**

```ts
// src/lib/themeBuilder/generateCss.ts
import { MODES, type Mode, type ModeTokens, type ThemeState } from './tokens';

const SELECTORS: Record<Mode, string> = {
  light: ":root,\n[data-bs-theme='light']",
  dark: "[data-bs-theme='dark']",
  'high-contrast': "[data-bs-theme='high-contrast']",
};

function declarations(tokens: ModeTokens): string {
  return Object.entries(tokens)
    .filter(([, value]) => typeof value === 'string' && value !== '')
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n');
}

function block(selector: string, tokens: ModeTokens): string {
  return `${selector} {\n${declarations(tokens)}\n}`;
}

// The three variable blocks, formatted like the upstream theme.css so a diff
// against phpMyFAQ's default file only shows changed colours. Paste into
// Admin -> Configuration -> Layout -> Custom CSS.
export function generateCustomCss(theme: ThemeState): string {
  return MODES.map((mode) => block(SELECTORS[mode], theme[mode])).join('\n\n') + '\n';
}

const THEME_HEADER = `/**
 * phpMyFAQ 4.2 theme generated by https://www.phpmyfaq.de/theme-builder/
 *
 * Copy assets/templates/default to assets/templates/<your-theme>, replace
 * theme.css with this file and select the template set in
 * Admin -> Configuration -> Layout.
 */
`;

const FONT_FACES = `/* Font -Atkinson Hyperlegible Next- from Braille Institute for high-contrast mode to achieve better A11y */
@font-face {
  font-family: 'Atkinson Hyperlegible Next';
  src: url('../../fonts/AtkinsonHyperlegibleNext-VariableFont_wght.ttf') format('truetype-variations');
  font-weight: 200 800;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Atkinson Hyperlegible Next';
  src: url('../../fonts/AtkinsonHyperlegibleNext-Italic-VariableFont_wght.ttf') format('truetype-variations');
  font-weight: 200 800;
  font-style: italic;
  font-display: swap;
}
`;

const HIGH_CONTRAST_BODY = `[data-bs-theme='high-contrast'] body {
  font-family: 'Atkinson Hyperlegible Next' !important;
  font-size: 1.3rem;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
}
`;

// A complete replacement for assets/templates/<set>/theme.css.
export function generateThemeCss(theme: ThemeState): string {
  return [THEME_HEADER, FONT_FACES, generateCustomCss(theme), HIGH_CONTRAST_BODY].join('\n');
}

// Same declarations, but attached to the preview element instead of :root so
// the builder's own page is not restyled.
export function generatePreviewCss(theme: ThemeState, scopeSelector: string): string {
  return MODES.map((mode) => block(`${scopeSelector}[data-bs-theme='${mode}']`, theme[mode])).join('\n\n') + '\n';
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest --run src/lib/themeBuilder/generateCss.test.ts`
Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/themeBuilder/generateCss.ts src/lib/themeBuilder/generateCss.test.ts
git commit -m "feat(theme-builder): generate custom CSS and theme.css from tokens"
```

---

### Task 3: Contrast maths and report

**Files:**

- Create: `src/lib/themeBuilder/contrast.ts`
- Test: `src/lib/themeBuilder/contrast.test.ts`

**Interfaces:**

- Consumes: `CONTRAST_PAIRS`, `ThemeState`, `Mode`, `TokenName` from Task 1.
- Produces:

  ```ts
  export function contrastRatio(foregroundHex: string, backgroundHex: string): number;
  export function requiredRatio(mode: Mode): number; // 4.5 or 7
  export interface ContrastResult {
    id: string;
    label: string;
    foreground: string;
    background: string;
    ratio: number;
    required: number;
    passes: boolean;
  }
  export function contrastReport(theme: ThemeState, mode: Mode): ContrastResult[];
  ```

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/themeBuilder/contrast.test.ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest --run src/lib/themeBuilder/contrast.test.ts`
Expected: FAIL, "Failed to resolve import './contrast'".

- [ ] **Step 3: Write the implementation**

```ts
// src/lib/themeBuilder/contrast.ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest --run src/lib/themeBuilder/contrast.test.ts`
Expected: PASS, 5 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/themeBuilder/contrast.ts src/lib/themeBuilder/contrast.test.ts
git commit -m "feat(theme-builder): add WCAG contrast report"
```

---

### Task 4: URL hash serialisation

**Files:**

- Create: `src/lib/themeBuilder/serialize.ts`
- Test: `src/lib/themeBuilder/serialize.test.ts`

**Interfaces:**

- Consumes: `ThemeState`, `DEFAULT_THEME`, `MODES`, `TOKENS`, `isHexColor`, `cloneTheme` from Task 1.
- Produces:
  ```ts
  export function encodeTheme(theme: ThemeState): string; // hash payload without '#'
  export function decodeTheme(payload: string): ThemeState; // defaults merged with valid known values
  ```

Format: `v1.` followed by base64url of JSON `{ light: {...}, dark: {...}, "high-contrast": {...} }` containing only values that differ from the defaults. Unknown keys and invalid colours are dropped. Any parse failure returns a clone of `DEFAULT_THEME`.

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/themeBuilder/serialize.test.ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest --run src/lib/themeBuilder/serialize.test.ts`
Expected: FAIL, "Failed to resolve import './serialize'".

- [ ] **Step 3: Write the implementation**

```ts
// src/lib/themeBuilder/serialize.ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest --run src/lib/themeBuilder/serialize.test.ts`
Expected: PASS, 4 tests. If `btoa`/`atob` are missing under Node, jsdom provides them; the Vitest environment is `jsdom`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/themeBuilder/serialize.ts src/lib/themeBuilder/serialize.test.ts
git commit -m "feat(theme-builder): encode theme state in the URL hash"
```

---

### Task 5: ColorField component

**Files:**

- Create: `src/components/theme-builder/ColorField.tsx`
- Create: `src/components/theme-builder/ThemeBuilder.module.scss`
- Test: `src/components/theme-builder/ColorField.test.tsx`

**Interfaces:**

- Consumes: `TokenDefinition`, `isHexColor` from Task 1.
- Produces:

  ```tsx
  export interface ColorFieldProps {
    token: TokenDefinition;
    value: string | undefined;
    onChange: (value: string) => void;
  }
  export default function ColorField(props: ColorFieldProps): JSX.Element;
  ```

  Renders a `<label>` with the token label, an `<input type="color">` (aria-label `${label} picker`) and an `<input type="text">` (aria-label `${label} hex value`). Text input commits only valid `#rrggbb`; invalid text sets `aria-invalid="true"` and a visible hint "Use a six-digit hex colour like #083c83".

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/theme-builder/ColorField.test.tsx
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ColorField from './ColorField';
import { TOKENS } from '@/lib/themeBuilder/tokens';

const primary = TOKENS.find((t) => t.name === '--bs-primary')!;

describe('ColorField', () => {
  it('shows the current value in both inputs', () => {
    render(<ColorField token={primary} value="#083c83" onChange={() => {}} />);
    expect(screen.getByLabelText('Primary picker')).toHaveValue('#083c83');
    expect(screen.getByLabelText('Primary hex value')).toHaveValue('#083c83');
  });

  it('commits a valid hex value typed into the text field', () => {
    const onChange = vi.fn();
    render(<ColorField token={primary} value="#083c83" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Primary hex value'), { target: { value: '#FF6600' } });
    expect(onChange).toHaveBeenCalledWith('#ff6600');
  });

  it('rejects short hex and rgb() input and marks the field invalid', () => {
    const onChange = vi.fn();
    render(<ColorField token={primary} value="#083c83" onChange={onChange} />);
    const text = screen.getByLabelText('Primary hex value');
    fireEvent.change(text, { target: { value: '#abc' } });
    fireEvent.change(text, { target: { value: 'rgb(0,0,0)' } });
    expect(onChange).not.toHaveBeenCalled();
    expect(text).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Use a six-digit hex colour like #083c83')).toBeInTheDocument();
  });

  it('commits the colour picker value', () => {
    const onChange = vi.fn();
    render(<ColorField token={primary} value="#083c83" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Primary picker'), { target: { value: '#112233' } });
    expect(onChange).toHaveBeenCalledWith('#112233');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest --run src/components/theme-builder/ColorField.test.tsx`
Expected: FAIL, "Failed to resolve import './ColorField'".

- [ ] **Step 3: Write the component and styles**

```tsx
// src/components/theme-builder/ColorField.tsx
'use client';

import { useEffect, useId, useState } from 'react';
import { isHexColor, type TokenDefinition } from '@/lib/themeBuilder/tokens';
import styles from './ThemeBuilder.module.scss';

export interface ColorFieldProps {
  token: TokenDefinition;
  value: string | undefined;
  onChange: (value: string) => void;
}

// One colour token: a native colour picker and a hex text field kept in sync.
// Only a complete #rrggbb value is committed; while the text is invalid the
// previous colour stays active and the field is marked invalid.
export default function ColorField({ token, value, onChange }: ColorFieldProps) {
  const hintId = useId();
  const [text, setText] = useState(value ?? '');
  const invalid = text !== '' && !isHexColor(text);

  useEffect(() => {
    setText(value ?? '');
  }, [value]);

  const commit = (next: string) => {
    setText(next);
    if (isHexColor(next)) {
      onChange(next.toLowerCase());
    }
  };

  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>
        <span>{token.label}</span>
        <small>{token.description}</small>
      </label>
      <div className={styles.fieldInputs}>
        <input
          type="color"
          aria-label={`${token.label} picker`}
          value={value ?? '#000000'}
          onChange={(event) => commit(event.target.value)}
        />
        <input
          type="text"
          aria-label={`${token.label} hex value`}
          aria-invalid={invalid ? 'true' : undefined}
          aria-describedby={invalid ? hintId : undefined}
          className={styles.hexInput}
          value={text}
          maxLength={7}
          spellCheck={false}
          onChange={(event) => commit(event.target.value)}
        />
      </div>
      {invalid && (
        <p id={hintId} className={styles.fieldHint}>
          Use a six-digit hex colour like #083c83
        </p>
      )}
    </div>
  );
}
```

```scss
// src/components/theme-builder/ThemeBuilder.module.scss
.layout {
  display: grid;
  gap: 2rem;
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 380px) minmax(0, 1fr);
    align-items: start;
  }
}

.panel {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-bg-secondary);
  padding: 1.25rem;
}

.tabs {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;

  button {
    flex: 1;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    background: var(--color-bg);
    font-weight: 600;

    &[aria-selected='true'] {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: #ffffff;
    }
  }
}

.field {
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--color-border);
}

.fieldLabel {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.35rem;

  small {
    color: var(--color-text-muted);
  }
}

.fieldInputs {
  display: flex;
  gap: 0.5rem;
  align-items: center;

  input[type='color'] {
    width: 2.5rem;
    height: 2.25rem;
    padding: 0;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    background: none;
  }
}

.hexInput {
  width: 7.5rem;
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-bg);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  &[aria-invalid='true'] {
    border-color: #c62828;
  }
}

.fieldHint {
  margin: 0.35rem 0 0;
  font-size: 0.875rem;
  color: #c62828;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.button {
  padding: 0.55rem 1rem;
  border: 1px solid var(--color-primary);
  border-radius: 6px;
  background: var(--color-primary);
  color: #ffffff;
  font-weight: 600;

  &:hover,
  &:focus-visible {
    background: var(--color-primary-dark);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.buttonSecondary {
  background: var(--color-bg);
  color: var(--color-primary-text);

  &:hover,
  &:focus-visible {
    background: var(--color-bg-secondary);
  }
}

.report {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.4rem 0;
    border-bottom: 1px solid var(--color-border);
  }
}

.pass {
  color: #1b7f3b;
  font-weight: 600;
}

.fail {
  color: #c62828;
  font-weight: 600;
}

.cssOutput {
  width: 100%;
  min-height: 14rem;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-bg);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.8rem;
  resize: vertical;
}

// Preview mock. Everything below is painted only with --bs-* variables set by
// the generated CSS, so what the visitor sees is what their FAQ will get.
.preview {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--bs-pmf-background);
  color: var(--bs-body-color);
  font-family: system-ui, sans-serif;
}

.previewNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--bs-pmf-nav);
  color: var(--bs-light);
  font-weight: 700;

  a {
    color: var(--bs-light);
    text-decoration: none;
    margin-left: 1rem;
    font-weight: 400;
  }
}

.previewBody {
  margin: 1.5rem;
  padding: 1.25rem;
  border-radius: 8px;
  background: var(--bs-body-bg);
  color: var(--bs-body-color);

  h2 {
    margin-top: 0;
  }

  a {
    color: var(--bs-link-color, var(--bs-primary));

    &:hover {
      color: var(--bs-link-hover-color, var(--bs-primary));
    }
  }
}

.previewSearch {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;

  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid var(--bs-border-color, #dee2e6);
    border-radius: 6px;
    background: var(--bs-body-bg);
    color: var(--bs-body-color);
  }
}

.previewCard {
  padding: 1rem;
  border: 1px solid var(--bs-border-color, #dee2e6);
  border-radius: 6px;
  margin-bottom: 1rem;
}

.previewButtons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;

  button {
    padding: 0.45rem 0.9rem;
    border: none;
    border-radius: 6px;
    color: #ffffff;
    font-weight: 600;
  }
}

.btnPrimary {
  background: var(--bs-primary);
}
.btnSecondary {
  background: var(--bs-secondary);
}
.btnSuccess {
  background: var(--bs-success);
}
.btnDanger {
  background: var(--bs-danger);
}
.btnWarning {
  background: var(--bs-warning);
  color: #000000 !important;
}
.btnInfo {
  background: var(--bs-info);
}

.previewAlert {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  background: var(--bs-info);
  color: #ffffff;
}

.previewFooter {
  padding: 1rem;
  background: var(--bs-pmf-footer);
  color: var(--bs-light);
  font-size: 0.875rem;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest --run src/components/theme-builder/ColorField.test.tsx`
Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/theme-builder/ColorField.tsx src/components/theme-builder/ColorField.test.tsx src/components/theme-builder/ThemeBuilder.module.scss
git commit -m "feat(theme-builder): add colour field with hex validation"
```

---

### Task 6: ThemePreview and ContrastReport components

**Files:**

- Create: `src/components/theme-builder/ThemePreview.tsx`
- Create: `src/components/theme-builder/ContrastReport.tsx`
- Test: `src/components/theme-builder/ThemePreview.test.tsx`
- Test: `src/components/theme-builder/ContrastReport.test.tsx`

**Interfaces:**

- Consumes: `generatePreviewCss` (Task 2), `contrastReport`, `ContrastResult` (Task 3), `ThemeState`, `Mode` (Task 1).
- Produces:

  ```tsx
  export default function ThemePreview({ theme, mode }: { theme: ThemeState; mode: Mode }): JSX.Element;
  // Renders <style> with generatePreviewCss(theme, '#pmf-theme-preview') and a <div id="pmf-theme-preview" data-bs-theme={mode} data-testid="theme-preview">.
  export default function ContrastReport({ theme, mode }: { theme: ThemeState; mode: Mode }): JSX.Element;
  // Renders <ul> with one <li> per ContrastResult: label, "{ratio.toFixed(2)}:1", "Pass"/"Fail (needs {required}:1)".
  ```

- [ ] **Step 1: Write the failing tests**

```tsx
// src/components/theme-builder/ThemePreview.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ThemePreview from './ThemePreview';
import { DEFAULT_THEME, cloneTheme } from '@/lib/themeBuilder/tokens';

describe('ThemePreview', () => {
  it('scopes the generated CSS to the preview element and sets the mode', () => {
    const theme = cloneTheme(DEFAULT_THEME);
    theme.dark['--bs-primary'] = '#ff6600';
    const { container } = render(<ThemePreview theme={theme} mode="dark" />);
    const preview = screen.getByTestId('theme-preview');
    expect(preview).toHaveAttribute('data-bs-theme', 'dark');
    const style = container.querySelector('style')!.textContent!;
    expect(style).toContain("#pmf-theme-preview[data-bs-theme='dark'] {");
    expect(style).toContain('--bs-primary: #ff6600;');
    expect(style).not.toContain(':root');
  });

  it('shows the typical phpMyFAQ page parts', () => {
    render(<ThemePreview theme={DEFAULT_THEME} mode="light" />);
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByText('How do I reset my password?')).toBeInTheDocument();
    expect(screen.getByText(/powered by phpMyFAQ/i)).toBeInTheDocument();
  });
});
```

```tsx
// src/components/theme-builder/ContrastReport.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContrastReport from './ContrastReport';
import { DEFAULT_THEME, cloneTheme } from '@/lib/themeBuilder/tokens';

describe('ContrastReport', () => {
  it('lists each pair with its ratio and verdict', () => {
    render(<ContrastReport theme={DEFAULT_THEME} mode="light" />);
    const body = screen.getByText('Body text on body background').closest('li')!;
    expect(body).toHaveTextContent(/\d+\.\d\d:1/);
    expect(body).toHaveTextContent('Pass');
  });

  it('names the required ratio on failure', () => {
    const theme = cloneTheme(DEFAULT_THEME);
    theme['high-contrast']['--bs-body-color'] = '#777777';
    render(<ContrastReport theme={theme} mode="high-contrast" />);
    const body = screen.getByText('Body text on body background').closest('li')!;
    expect(body).toHaveTextContent('Fail (needs 7:1)');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest --run src/components/theme-builder/ThemePreview.test.tsx src/components/theme-builder/ContrastReport.test.tsx`
Expected: FAIL on unresolved imports.

- [ ] **Step 3: Write the components**

```tsx
// src/components/theme-builder/ThemePreview.tsx
'use client';

import { generatePreviewCss } from '@/lib/themeBuilder/generateCss';
import type { Mode, ThemeState } from '@/lib/themeBuilder/tokens';
import styles from './ThemeBuilder.module.scss';

const PREVIEW_ID = 'pmf-theme-preview';

// A static mock of a phpMyFAQ start page. The generated CSS is attached to the
// preview element rather than :root so the builder page itself stays untouched.
export default function ThemePreview({ theme, mode }: { theme: ThemeState; mode: Mode }) {
  return (
    <>
      <style>{generatePreviewCss(theme, `#${PREVIEW_ID}`)}</style>
      <div
        id={PREVIEW_ID}
        data-bs-theme={mode}
        data-testid="theme-preview"
        className={styles.preview}
        aria-label="Theme preview"
      >
        <div className={styles.previewNav}>
          <span>My FAQ</span>
          <nav aria-label="Preview navigation">
            <a href="#preview">Categories</a>
            <a href="#preview">Add question</a>
            <a href="#preview">Login</a>
          </nav>
        </div>
        <div className={styles.previewBody}>
          <h2>Welcome to the FAQ</h2>
          <div className={styles.previewSearch}>
            <input type="search" aria-label="Preview search" placeholder="Search the FAQ" readOnly />
            <button type="button" className={styles.btnPrimary}>
              Search
            </button>
          </div>
          <article className={styles.previewCard}>
            <h3>
              <a href="#preview">How do I reset my password?</a>
            </h3>
            <p>Use the "Forgot password" link on the login page and follow the email instructions.</p>
          </article>
          <div className={styles.previewButtons}>
            <button type="button" className={styles.btnPrimary}>
              Primary
            </button>
            <button type="button" className={styles.btnSecondary}>
              Secondary
            </button>
            <button type="button" className={styles.btnSuccess}>
              Success
            </button>
            <button type="button" className={styles.btnInfo}>
              Info
            </button>
            <button type="button" className={styles.btnWarning}>
              Warning
            </button>
            <button type="button" className={styles.btnDanger}>
              Danger
            </button>
          </div>
          <div className={styles.previewAlert} role="note">
            This FAQ was updated yesterday.
          </div>
        </div>
        <div className={styles.previewFooter}>powered by phpMyFAQ 4.2</div>
      </div>
    </>
  );
}
```

```tsx
// src/components/theme-builder/ContrastReport.tsx
'use client';

import { contrastReport } from '@/lib/themeBuilder/contrast';
import type { Mode, ThemeState } from '@/lib/themeBuilder/tokens';
import styles from './ThemeBuilder.module.scss';

export default function ContrastReport({ theme, mode }: { theme: ThemeState; mode: Mode }) {
  const results = contrastReport(theme, mode);
  return (
    <ul className={styles.report} aria-label="Contrast report">
      {results.map((result) => (
        <li key={result.id}>
          <span>{result.label}</span>
          <span>
            {result.ratio.toFixed(2)}:1{' '}
            {result.passes ? (
              <span className={styles.pass}>Pass</span>
            ) : (
              <span className={styles.fail}>Fail (needs {result.required}:1)</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm vitest --run src/components/theme-builder/ThemePreview.test.tsx src/components/theme-builder/ContrastReport.test.tsx`
Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/theme-builder/ThemePreview.tsx src/components/theme-builder/ThemePreview.test.tsx src/components/theme-builder/ContrastReport.tsx src/components/theme-builder/ContrastReport.test.tsx
git commit -m "feat(theme-builder): add scoped preview and contrast report"
```

---

### Task 7: ExportPanel component

**Files:**

- Create: `src/components/theme-builder/ExportPanel.tsx`
- Test: `src/components/theme-builder/ExportPanel.test.tsx`

**Interfaces:**

- Consumes: `generateCustomCss`, `generateThemeCss` (Task 2), `ThemeState` (Task 1).
- Produces:

  ```tsx
  export default function ExportPanel({ theme }: { theme: ThemeState }): JSX.Element;
  // Readonly <textarea aria-label="Custom CSS"> with generateCustomCss(theme);
  // button "Copy custom CSS" (text "Copied" for 2 s after success);
  // button "Download theme.css" triggers a Blob download named theme.css; disabled when URL.createObjectURL is unavailable.
  ```

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/theme-builder/ExportPanel.test.tsx
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
    expect(screen.getByLabelText('Custom CSS')).toHaveValue(expect.stringContaining('--bs-primary: #ff6600;'));

    const button = screen.getByRole('button', { name: 'Copy custom CSS' });
    await act(async () => {
      fireEvent.click(button);
    });
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining("[data-bs-theme='dark']"));
    expect(button).toHaveTextContent('Copied');
  });

  it('downloads theme.css through an object URL', () => {
    const createObjectURL = vi.fn().mockReturnValue('blob:test');
    const revokeObjectURL = vi.fn();
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest --run src/components/theme-builder/ExportPanel.test.tsx`
Expected: FAIL, "Failed to resolve import './ExportPanel'".

- [ ] **Step 3: Write the component**

```tsx
// src/components/theme-builder/ExportPanel.tsx
'use client';

import { useEffect, useState } from 'react';
import { generateCustomCss, generateThemeCss } from '@/lib/themeBuilder/generateCss';
import type { ThemeState } from '@/lib/themeBuilder/tokens';
import styles from './ThemeBuilder.module.scss';

export default function ExportPanel({ theme }: { theme: ThemeState }) {
  const [copied, setCopied] = useState(false);
  const [canDownload, setCanDownload] = useState(false);
  const customCss = generateCustomCss(theme);

  // Object URLs are a browser feature; decide after mount so the static
  // export and the test environment both render the same initial markup.
  useEffect(() => {
    setCanDownload(typeof URL.createObjectURL === 'function');
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(customCss);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access denied: the textarea stays selectable.
    }
  };

  const download = () => {
    const blob = new Blob([generateThemeCss(theme)], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'theme.css';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.panel}>
      <h2>Export</h2>
      <p>
        Paste the CSS below into <strong>Admin → Configuration → Layout → Custom CSS</strong>. No file access needed,
        works on every phpMyFAQ 4.2 installation.
      </p>
      <textarea className={styles.cssOutput} aria-label="Custom CSS" readOnly value={customCss} />
      <div className={styles.actions}>
        <button type="button" className={styles.button} onClick={copy}>
          {copied ? 'Copied' : 'Copy custom CSS'}
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonSecondary}`}
          onClick={download}
          disabled={!canDownload}
        >
          Download theme.css
        </button>
      </div>
      <p>
        <strong>theme.css</strong> is for a copied template set: duplicate <code>assets/templates/default</code>,
        replace its <code>theme.css</code> with the download and select the set under Layout → Template set.
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest --run src/components/theme-builder/ExportPanel.test.tsx`
Expected: PASS, 3 tests. If the `toHaveValue(expect.stringContaining(...))` matcher is rejected by jest-dom, replace with `expect((screen.getByLabelText('Custom CSS') as HTMLTextAreaElement).value).toContain('--bs-primary: #ff6600;')`.

- [ ] **Step 5: Commit**

```bash
git add src/components/theme-builder/ExportPanel.tsx src/components/theme-builder/ExportPanel.test.tsx
git commit -m "feat(theme-builder): add copy and download export panel"
```

---

### Task 8: ThemeBuilder root component

**Files:**

- Create: `src/components/theme-builder/ThemeBuilder.tsx`
- Test: `src/components/theme-builder/ThemeBuilder.test.tsx`

**Interfaces:**

- Consumes: `ColorField` (Task 5), `ThemePreview`, `ContrastReport` (Task 6), `ExportPanel` (Task 7), `encodeTheme`/`decodeTheme` (Task 4), tokens (Task 1).
- Produces: `export default function ThemeBuilder(): JSX.Element;`
  - Mode tabs (`role="tablist"`, buttons with `role="tab"`, `aria-selected`), label from `MODE_LABELS`.
  - Fields: every entry in `TOKENS`. Tokens without a value in the current mode render with an "Add" behaviour: `ColorField` receives `value={undefined}`; the first commit adds the key.
  - "Reset to phpMyFAQ defaults" button.
  - On mount: `decodeTheme(window.location.hash.slice(1))`. On every state change: `history.replaceState(null, '', '#' + encodeTheme(theme))`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/theme-builder/ThemeBuilder.test.tsx
import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ThemeBuilder from './ThemeBuilder';
import { encodeTheme } from '@/lib/themeBuilder/serialize';
import { DEFAULT_THEME, cloneTheme } from '@/lib/themeBuilder/tokens';

describe('ThemeBuilder', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/theme-builder/');
  });

  it('edits the current mode and updates preview and export', () => {
    render(<ThemeBuilder />);
    fireEvent.change(screen.getByLabelText('Primary hex value'), { target: { value: '#ff6600' } });
    const css = (screen.getByLabelText('Custom CSS') as HTMLTextAreaElement).value;
    expect(css.split("[data-bs-theme='dark']")[0]).toContain('--bs-primary: #ff6600;');
    expect(css.split("[data-bs-theme='dark']")[1]).toContain('--bs-primary: #083c83;');
    expect(window.location.hash).toBe(
      '#' + encodeTheme({ ...cloneTheme(DEFAULT_THEME), light: { ...DEFAULT_THEME.light, '--bs-primary': '#ff6600' } }),
    );
  });

  it('switches modes with the tabs', () => {
    render(<ThemeBuilder />);
    fireEvent.click(screen.getByRole('tab', { name: 'Dark' }));
    expect(screen.getByRole('tab', { name: 'Dark' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('theme-preview')).toHaveAttribute('data-bs-theme', 'dark');
    expect(screen.getByLabelText('Navigation bar hex value')).toHaveValue('#1d212a');
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
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest --run src/components/theme-builder/ThemeBuilder.test.tsx`
Expected: FAIL, "Failed to resolve import './ThemeBuilder'".

- [ ] **Step 3: Write the component**

```tsx
// src/components/theme-builder/ThemeBuilder.tsx
'use client';

import { useEffect, useState } from 'react';
import { decodeTheme, encodeTheme } from '@/lib/themeBuilder/serialize';
import {
  DEFAULT_THEME,
  MODES,
  MODE_LABELS,
  TOKENS,
  type Mode,
  type ThemeState,
  type TokenName,
  cloneTheme,
} from '@/lib/themeBuilder/tokens';
import ColorField from './ColorField';
import ContrastReport from './ContrastReport';
import ExportPanel from './ExportPanel';
import ThemePreview from './ThemePreview';
import styles from './ThemeBuilder.module.scss';

function initialTheme(): ThemeState {
  if (typeof window === 'undefined') {
    return cloneTheme(DEFAULT_THEME);
  }
  return decodeTheme(window.location.hash.slice(1));
}

export default function ThemeBuilder() {
  const [theme, setTheme] = useState<ThemeState>(initialTheme);
  const [mode, setMode] = useState<Mode>('light');

  // Keep the URL in sync so the current theme can be bookmarked or shared.
  useEffect(() => {
    window.history.replaceState(null, '', '#' + encodeTheme(theme));
  }, [theme]);

  const update = (name: TokenName, value: string) => {
    setTheme((current) => ({ ...current, [mode]: { ...current[mode], [name]: value } }));
  };

  return (
    <div className={styles.layout}>
      <div>
        <div className={styles.panel}>
          <div className={styles.tabs} role="tablist" aria-label="Colour mode">
            {MODES.map((m) => (
              <button key={m} type="button" role="tab" aria-selected={m === mode} onClick={() => setMode(m)}>
                {MODE_LABELS[m]}
              </button>
            ))}
          </div>
          {TOKENS.map((token) => (
            <ColorField
              key={token.name}
              token={token}
              value={theme[mode][token.name]}
              onChange={(v) => update(token.name, v)}
            />
          ))}
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonSecondary}`}
              onClick={() => setTheme(cloneTheme(DEFAULT_THEME))}
            >
              Reset to phpMyFAQ defaults
            </button>
          </div>
        </div>
      </div>
      <div>
        <ThemePreview theme={theme} mode={mode} />
        <div className={styles.panel} style={{ marginTop: '1.5rem' }}>
          <h2>Contrast ({MODE_LABELS[mode]})</h2>
          <p>
            {mode === 'high-contrast'
              ? 'High contrast mode aims for WCAG 2.2 level AAA: at least 7:1 for normal text.'
              : 'Light and dark mode aim for WCAG 2.2 level AA: at least 4.5:1 for normal text.'}
          </p>
          <ContrastReport theme={theme} mode={mode} />
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <ExportPanel theme={theme} />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest --run src/components/theme-builder/ThemeBuilder.test.tsx`
Expected: PASS, 3 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/theme-builder/ThemeBuilder.tsx src/components/theme-builder/ThemeBuilder.test.tsx
git commit -m "feat(theme-builder): assemble builder with mode tabs and URL state"
```

---

### Task 9: Route, navigation, sitemap, e2e, docs

**Files:**

- Create: `src/app/theme-builder/page.tsx`
- Modify: `src/app/sitemap.ts` (the `staticPages` array)
- Modify: `src/components/Footer.tsx` (resources column, next to the `/translations` link)
- Modify: `tests/e2e/all-pages.spec.ts` (`pages` array), `tests/e2e/accessibility.spec.ts` (`pages` array)
- Create: `tests/e2e/theme-builder.spec.ts`
- Modify: `README.md` (Project Structure section: mention `src/lib/themeBuilder/`)

**Interfaces:**

- Consumes: `ThemeBuilder` (Task 8), `PageLayout`, `generatePageMetadata`, `ContentBlocks.module.scss`.

- [ ] **Step 1: Write the page**

```tsx
// src/app/theme-builder/page.tsx
import type { Metadata } from 'next';
import PageLayout, { generatePageMetadata } from '@/components/PageLayout';
import ThemeBuilder from '@/components/theme-builder/ThemeBuilder';
import blocks from '@/components/ContentBlocks.module.scss';

export const metadata: Metadata = generatePageMetadata(
  'Theme Builder',
  'Pick the colours of your phpMyFAQ 4.2 installation, check the contrast and export the CSS.',
);

export default function ThemeBuilderPage() {
  return (
    <PageLayout
      title="Theme Builder"
      description="Colours for your phpMyFAQ 4.2 installation, with a live preview and contrast check."
      searchable={false}
    >
      <p className={blocks.lead}>
        phpMyFAQ 4.2 paints its frontend from a small set of CSS variables, one set per colour mode. Change them here,
        watch the preview, and paste the result into your installation. Everything runs in your browser; the theme is
        stored in the page URL, so you can bookmark or share it.
      </p>
      <ThemeBuilder />
      <h2 className={blocks.heading}>How it works</h2>
      <ol>
        <li>Pick a colour mode (light, dark or high contrast) and adjust the colours.</li>
        <li>Check the contrast report. Light and dark should meet WCAG AA, high contrast AAA.</li>
        <li>
          Copy the CSS into Admin → Configuration → Layout → Custom CSS, or download <code>theme.css</code> for a copied
          template set as described in the{' '}
          <a href="https://docs.phpmyfaq.de/development.html" target="_blank" rel="noopener noreferrer">
            developer documentation
          </a>
          .
        </li>
      </ol>
    </PageLayout>
  );
}
```

- [ ] **Step 2: Wire sitemap and footer**

In `src/app/sitemap.ts`, add after the `/translations/` entry:

```ts
  { path: '/theme-builder/', priority: 0.5, changeFrequency: 'monthly' },
```

In `src/components/Footer.tsx`, add after the `Translations` list item:

```tsx
<li>
  <Link href="/theme-builder">Theme Builder</Link>
</li>
```

- [ ] **Step 3: Add e2e coverage**

In `tests/e2e/all-pages.spec.ts` add to `pages`:

```ts
    { path: '/theme-builder', title: 'Theme Builder - phpMyFAQ' },
```

In `tests/e2e/accessibility.spec.ts` add to `pages`:

```ts
  '/theme-builder/',
```

Create `tests/e2e/theme-builder.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test.describe('Theme builder', () => {
  test('edits a colour, exports it and downloads theme.css', async ({ page }) => {
    await page.goto('/theme-builder/');
    await page.getByLabel('Primary hex value').fill('#ff6600');

    const preview = page.getByTestId('theme-preview');
    await expect(preview).toHaveAttribute('data-bs-theme', 'light');
    const primaryButton = preview.getByRole('button', { name: 'Search' });
    await expect(primaryButton).toHaveCSS('background-color', 'rgb(255, 102, 0)');

    await expect(page.getByLabel('Custom CSS')).toHaveValue(/--bs-primary: #ff6600;/);
    await expect(page).toHaveURL(/#v1\./);

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download theme.css' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('theme.css');
  });

  test('restores a shared theme from the URL and resets', async ({ page }) => {
    await page.goto('/theme-builder/');
    await page.getByLabel('Danger hex value').fill('#aa0000');
    const url = page.url();
    await page.goto(url);
    await expect(page.getByLabel('Danger hex value')).toHaveValue('#aa0000');
    await page.getByRole('button', { name: 'Reset to phpMyFAQ defaults' }).click();
    await expect(page.getByLabel('Danger hex value')).toHaveValue('#f01704');
  });
});
```

- [ ] **Step 4: Update README**

In the Project Structure block of `README.md`, change the `lib/` line to:

```
├── lib/                   # Markdown parsing, news, changelog, advisories, feeds, structured data, theme builder logic
```

- [ ] **Step 5: Run unit tests, lint, format and build**

Run: `pnpm lint && pnpm format:check && pnpm test:ci`
Expected: all green. Fix any oxfmt complaints with `pnpm format`.

Run: `PAGEFIND_OPTIONAL=1 pnpm build`
Expected: build succeeds and `out/theme-builder/index.html` exists.

- [ ] **Step 6: Run e2e**

Run: `pnpm test:e2e tests/e2e/theme-builder.spec.ts tests/e2e/all-pages.spec.ts tests/e2e/accessibility.spec.ts`
Expected: PASS. If axe reports `color-contrast` on the preview mock, add `.disableRules(['color-contrast'])` only for the `/theme-builder/` path in `accessibility.spec.ts`: the preview deliberately shows whatever the visitor chose.

- [ ] **Step 7: Commit**

```bash
git add src/app/theme-builder/page.tsx src/app/sitemap.ts src/components/Footer.tsx tests/e2e/all-pages.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/theme-builder.spec.ts README.md
git commit -m "feat: add theme builder page for phpMyFAQ 4.2"
```

---

### Task 10: Announce (optional, same PR)

**Files:**

- Modify: `content/news/2026.md`

- [ ] **Step 1: Add a news entry**

Append under a new heading at the top of the entries:

```markdown
### 2026-11-07

**New: Theme Builder for phpMyFAQ 4.2**

Pick the colours of your FAQ for light, dark and high-contrast mode, check the WCAG contrast and export the
CSS for the Custom CSS setting or a complete theme.css. Try it at [/theme-builder/](/theme-builder/).
```

- [ ] **Step 2: Run tests and commit**

Run: `pnpm test:ci`
Expected: PASS (the news parser tests read the real file).

```bash
git add content/news/2026.md
git commit -m "docs: announce the theme builder"
```

---

## Self-review notes

- Spec coverage: tokens/modes (T1), export variants (T2, T7), contrast (T3, T6), URL state (T4, T8), preview (T6), page/route/wiring/e2e (T9). Presets limited to the default (reset button, T8). Out-of-scope items untouched.
- Review Focus items map to T5 (invalid hex), T4 (unknown keys), T2 (byte-exact default block), T6 (scoped style), T7 (no createObjectURL).
- Names used across tasks: `generateCustomCss`, `generateThemeCss`, `generatePreviewCss`, `contrastReport`, `encodeTheme`, `decodeTheme`, `cloneTheme`, `isHexColor`, `TOKENS`, `MODES`, `MODE_LABELS`, `DEFAULT_THEME`, test id `theme-preview`, element id `pmf-theme-preview`. Consistent.