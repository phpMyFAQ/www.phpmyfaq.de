'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './SiteSearch.module.scss';
import Icon from '@/components/Icon';

// Pagefind's default UI, generated into out/pagefind/ by scripts/build-search-index.ts.
// It is loaded on first use only, so pages pay nothing for the search until it opens.
export type PagefindUiConstructor = new (options: Record<string, unknown>) => unknown;

declare global {
  interface Window {
    PagefindUI?: PagefindUiConstructor;
  }
}

const UI_SCRIPT = '/pagefind/pagefind-ui.js';
const UI_STYLES = '/pagefind/pagefind-ui.css';

export function loadPagefindUi(): Promise<PagefindUiConstructor> {
  if (window.PagefindUI) return Promise.resolve(window.PagefindUI);
  return new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${UI_STYLES}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = UI_STYLES;
      document.head.appendChild(link);
    }
    const script = document.createElement('script');
    script.src = UI_SCRIPT;
    script.async = true;
    script.onload = () =>
      window.PagefindUI ? resolve(window.PagefindUI) : reject(new Error('PagefindUI did not register'));
    script.onerror = () => reject(new Error(`Could not load ${UI_SCRIPT}`));
    document.head.appendChild(script);
  });
}

type Status = 'idle' | 'loading' | 'ready' | 'unavailable';

function isTypingTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
  );
}

interface SiteSearchProps {
  // Injected in tests; defaults to loading the generated UI script.
  loadUi?: () => Promise<PagefindUiConstructor>;
}

export default function SiteSearch({ loadUi = loadPagefindUi }: SiteSearchProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialised = useRef(false);
  const [status, setStatus] = useState<Status>('idle');

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    if (initialised.current) {
      containerRef.current?.querySelector('input')?.focus();
      return;
    }
    initialised.current = true;
    setStatus('loading');
    loadUi()
      .then((PagefindUI) => {
        new PagefindUI({
          element: containerRef.current,
          showImages: false,
          showSubResults: true,
          autofocus: true,
          translations: { placeholder: 'Search phpMyFAQ.de' },
        });
        setStatus('ready');
      })
      .catch(() => setStatus('unavailable'));
  }, [loadUi]);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }, []);

  // "/" anywhere outside a form field, or Ctrl/Cmd+K, opens the search.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const shortcut =
        (event.key === 'k' && (event.metaKey || event.ctrlKey)) || (event.key === '/' && !isTypingTarget(event.target));
      if (shortcut) {
        event.preventDefault();
        open();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={open}
        aria-label="Search the site"
        title="Search (press /)"
      >
        <Icon name="search" />
      </button>
      {/* oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- the handler only detects clicks on the backdrop; Escape is handled natively by <dialog> */}
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label="Search phpMyFAQ.de"
        onClick={(event) => {
          // A click on the backdrop lands on the dialog element itself.
          if (event.target === dialogRef.current) close();
        }}
      >
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.title}>Search</h2>
            <button type="button" className={styles.close} onClick={close} aria-label="Close search">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>
          <div ref={containerRef} className={styles.results} />
          {status === 'loading' && <p className={styles.status}>Loading search…</p>}
          {status === 'unavailable' && (
            <p className={styles.status} role="alert">
              The search index is generated when the site is built and is not available here.
            </p>
          )}
        </div>
      </dialog>
    </>
  );
}