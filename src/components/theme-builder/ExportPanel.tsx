'use client';

import { useState, useSyncExternalStore } from 'react';
import { generateCustomCss, generateThemeCss } from '@/lib/themeBuilder/generateCss';
import type { ThemeState } from '@/lib/themeBuilder/tokens';
import styles from './ThemeBuilder.module.scss';

export default function ExportPanel({ theme }: { theme: ThemeState }) {
  const [copied, setCopied] = useState(false);
  // Object URLs are a browser feature. The server snapshot is false so the
  // static export and the first client render agree; the browser then decides.
  const canDownload = useSyncExternalStore(
    () => () => {},
    () => typeof URL.createObjectURL === 'function',
    () => false,
  );
  const customCss = generateCustomCss(theme);

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