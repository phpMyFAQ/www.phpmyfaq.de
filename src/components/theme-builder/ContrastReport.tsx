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