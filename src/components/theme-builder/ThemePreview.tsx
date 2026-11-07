'use client';

import { generatePreviewCss } from '@/lib/themeBuilder/generateCss';
import type { Mode, ThemeState } from '@/lib/themeBuilder/tokens';
import styles from './ThemeBuilder.module.scss';

const PREVIEW_ID = 'pmf-theme-preview';

// A static mock of a phpMyFAQ start page. The generated CSS is attached to the
// preview element rather than :root so the builder page itself stays untouched.
// Links are rendered as spans: real anchors would change the URL hash, which
// carries the theme state, and there is nothing to navigate to anyway.
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
          <span className={styles.previewNavLinks}>
            <span className={styles.previewLink}>Categories</span>
            <span className={styles.previewLink}>Add question</span>
            <span className={styles.previewLink}>Login</span>
          </span>
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
              <span className={styles.previewLink}>How do I reset my password?</span>
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
      <p className={styles.previewNote}>Preview only: the links and buttons do nothing.</p>
    </>
  );
}