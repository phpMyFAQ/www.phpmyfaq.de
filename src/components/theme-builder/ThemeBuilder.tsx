'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
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

const EMPTY_HASH = encodeTheme(DEFAULT_THEME);
const URL_WRITE_DELAY_MS = 250;

function themeFromLocation(): ThemeState {
  return decodeTheme(window.location.hash.slice(1));
}

function initialTheme(): ThemeState {
  return typeof window === 'undefined' ? cloneTheme(DEFAULT_THEME) : themeFromLocation();
}

const noopSubscribe = () => () => {};

export default function ThemeBuilder() {
  // The static export is rendered with the defaults. Until hydration is done
  // the client shows the same, then switches to the theme from the URL hash;
  // rendering the hash theme straight away would make React discard the
  // server markup with a hydration error on every shared link.
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const [theme, setTheme] = useState<ThemeState>(initialTheme);
  const [mode, setMode] = useState<Mode>('light');
  const [resetCount, setResetCount] = useState(0);
  const shownTheme = hydrated ? theme : DEFAULT_THEME;

  // Keep the URL in sync so the current theme can be bookmarked or shared.
  // Debounced: dragging the colour picker fires many changes per second and
  // Safari throws once replaceState runs more than 100 times in 10 seconds.
  useEffect(() => {
    if (!hydrated) {
      return;
    }
    const timer = setTimeout(() => {
      const payload = encodeTheme(theme);
      const url = payload === EMPTY_HASH ? window.location.pathname + window.location.search : '#' + payload;
      try {
        window.history.replaceState(null, '', url);
      } catch {
        // History throttled or unavailable: the theme stays editable, only the URL lags.
      }
    }, URL_WRITE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [theme, hydrated]);

  // A link pasted into a tab that already shows the builder only changes the hash.
  useEffect(() => {
    const onHashChange = () => setTheme(themeFromLocation());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const update = (name: TokenName, value: string) => {
    setTheme((current) => ({ ...current, [mode]: { ...current[mode], [name]: value } }));
  };

  const reset = () => {
    setTheme(cloneTheme(DEFAULT_THEME));
    setResetCount((count) => count + 1);
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
            // The key includes mode and reset count so an invalid draft typed
            // into a field is dropped when the mode switches or the theme resets.
            <ColorField
              key={`${mode}:${resetCount}:${token.name}`}
              token={token}
              value={shownTheme[mode][token.name]}
              onChange={(v) => update(token.name, v)}
            />
          ))}
          <div className={styles.actions}>
            <button type="button" className={`${styles.button} ${styles.buttonSecondary}`} onClick={reset}>
              Reset to phpMyFAQ defaults
            </button>
          </div>
        </div>
      </div>
      <div>
        <ThemePreview theme={shownTheme} mode={mode} />
        <div className={`${styles.panel} ${styles.stack}`}>
          <h2>Contrast ({MODE_LABELS[mode]})</h2>
          <p>
            {mode === 'high-contrast'
              ? 'High contrast mode aims for WCAG 2.2 level AAA: at least 7:1 for normal text.'
              : 'Light and dark mode aim for WCAG 2.2 level AA: at least 4.5:1 for normal text.'}
          </p>
          <ContrastReport theme={shownTheme} mode={mode} />
        </div>
        <div className={styles.stack}>
          <ExportPanel theme={shownTheme} />
        </div>
      </div>
    </div>
  );
}