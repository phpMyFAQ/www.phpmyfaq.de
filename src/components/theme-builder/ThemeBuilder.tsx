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
        <div className={`${styles.panel} ${styles.stack}`}>
          <h2>Contrast ({MODE_LABELS[mode]})</h2>
          <p>
            {mode === 'high-contrast'
              ? 'High contrast mode aims for WCAG 2.2 level AAA: at least 7:1 for normal text.'
              : 'Light and dark mode aim for WCAG 2.2 level AA: at least 4.5:1 for normal text.'}
          </p>
          <ContrastReport theme={theme} mode={mode} />
        </div>
        <div className={styles.stack}>
          <ExportPanel theme={theme} />
        </div>
      </div>
    </div>
  );
}