# Theme Builder for phpMyFAQ 4.2 – Design

Date: 2026-11-07
Status: draft, awaiting review

## Purpose

A page at `https://www.phpmyfaq.de/theme-builder/` where a phpMyFAQ administrator picks the colours of
their FAQ, sees the result immediately, gets contrast warnings, and exports CSS that works in a stock
phpMyFAQ 4.2 installation without touching SCSS or the build chain.

## What phpMyFAQ 4.2 offers (verified in `thorsten/phpMyFAQ` at `65891f9`, package version 4.2.0-RC.2)

- The frontend loads `assets/templates/<templateSet>/theme.css` after the compiled `assets/public/styles.css`
  (`index.twig` line 57). The default `theme.css` only sets Bootstrap CSS custom properties in three blocks:
  `:root, [data-bs-theme='light']`, `[data-bs-theme='dark']`, `[data-bs-theme='high-contrast']`.
- Tokens per block: `--bs-light`, `--bs-dark`, `--bs-primary`, `--bs-secondary`, `--bs-info`, `--bs-success`,
  `--bs-warning`, `--bs-danger`, `--bs-pmf-nav`, `--bs-pmf-footer`, `--bs-pmf-background`, `--bs-body-bg`,
  `--bs-body-color`; dark and high-contrast also set `--bs-border-color`; high-contrast also sets
  `--bs-link-color`, `--bs-link-hover-color`.
- `layout.customCss` (Admin → Configuration → Layout) injects raw CSS into a `<style>` tag right after
  `theme.css` (`index.twig` lines 58–60). This is the zero-file-access path.
- Documented custom layout path (docs/development.md 12.1.1): copy `assets/templates/default` to
  `assets/templates/<name>`, edit `theme.css`, set `layout.templateSet`.
- ZIP theme upload via `ThemeManager` exists but requires a static `index.twig` and stores into
  `StorageInterface`, while `theme.css` is still served from `assets/templates/<set>/`. Not a usable target
  for a CSS-only theme. Out of scope.

## Scope

In:
- Colour editing for the 13 common tokens plus the mode-specific extras, for all three modes.
- Live preview: a static mock of a phpMyFAQ page (navbar, hero/search, FAQ card, buttons, alert, footer)
  styled only through the generated variables, switchable between the three modes.
- WCAG 2.2 contrast report for a fixed list of foreground/background pairs: AA (4.5:1) for light and dark,
  AAA (7:1) for high contrast, matching docs/development.md 12.3.
- Export:
  1. "Copy for Custom CSS": the three variable blocks, paste into `layout.customCss`.
  2. "Download theme.css": same blocks plus the two `@font-face` rules and the high-contrast `body` rule
     from the default theme, for `assets/templates/<name>/theme.css`.
- State persists in the URL hash (shareable links) and survives reload. Reset to defaults.
- Presets: "phpMyFAQ default" only. No gallery.

Out:
- Fonts, spacing, logos, layout changes, template edits.
- ZIP generation, server-side anything (site is a static export).
- Importing an existing theme.css.

## Architecture

Pure client-side React inside the existing Next.js static export. Logic lives in `src/lib/themeBuilder/`
as framework-free TypeScript (unit-tested with Vitest); UI lives in `src/components/theme-builder/`
(React Testing Library); route in `src/app/theme-builder/page.tsx` (server component wrapping the client
component in `PageLayout`, `searchable={false}` because the content is a form).

Data flow: `ThemeState` (per-mode token map) → `generateCss()` → string used both for export and for the
preview (`<style>` scoped to the preview container) → `contrastReport()` → warnings list.

## Error handling

- Invalid colour input (anything not `#rrggbb`) keeps the previous value and marks the field invalid.
- Malformed URL hash falls back to defaults silently.
- Clipboard denied: button text stays "Copy", textarea remains selectable (same pattern as `CopyCommand`).

## Testing

- Unit: token defaults match the shipped theme.css; CSS generation byte-exact for defaults; contrast
  maths against known values (black/white = 21:1, #767676 on white ≈ 4.54:1); hash round-trip.
- Component: changing a colour updates preview variable and export text; invalid hex rejected; mode tabs.
- E2E: page in `all-pages.spec.ts` and `accessibility.spec.ts`; one flow test: edit primary, assert export
  contains it, download produces `theme.css`.
