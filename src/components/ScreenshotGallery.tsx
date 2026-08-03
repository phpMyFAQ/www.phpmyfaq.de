'use client';

import { useCallback, useEffect, useState } from 'react';
import styles from './ScreenshotGallery.module.scss';

export interface Screenshot {
  src: string;
  alt: string;
  caption: string;
}

export default function ScreenshotGallery({ screenshots }: { screenshots: Screenshot[] }) {
  const [current, setCurrent] = useState<number | null>(null);

  const close = useCallback(() => setCurrent(null), []);
  const prev = useCallback(
    () => setCurrent((index) => (index === null ? null : (index + screenshots.length - 1) % screenshots.length)),
    [screenshots.length],
  );
  const next = useCallback(
    () => setCurrent((index) => (index === null ? null : (index + 1) % screenshots.length)),
    [screenshots.length],
  );

  useEffect(() => {
    if (current === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') prev();
      if (event.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [current, close, prev, next]);

  return (
    <>
      <div className={styles.grid}>
        {screenshots.map((screenshot, index) => (
          <figure key={screenshot.src} className={styles.thumb}>
            <button type="button" onClick={() => setCurrent(index)} aria-label={`Enlarge: ${screenshot.alt}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={screenshot.src} alt={screenshot.alt} loading="lazy" />
            </button>
            <figcaption>{screenshot.caption}</figcaption>
          </figure>
        ))}
      </div>

      {current !== null && (
        <dialog open className={styles.lightbox} aria-modal="true">
          {/* A full-size button behind the image closes the lightbox on backdrop click. */}
          <button type="button" className={styles.lightboxBackdrop} onClick={close} aria-label="Close" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.lightboxImage} src={screenshots[current].src} alt={screenshots[current].alt} />
          <p className={styles.lightboxCaption}>{screenshots[current].caption}</p>
          <button type="button" className={styles.lightboxClose} onClick={close} aria-label="Close">
            ×
          </button>
          {screenshots.length > 1 && (
            <>
              <button
                type="button"
                className={styles.lightboxPrev}
                onClick={(event) => {
                  event.stopPropagation();
                  prev();
                }}
                aria-label="Previous screenshot"
              >
                ‹
              </button>
              <button
                type="button"
                className={styles.lightboxNext}
                onClick={(event) => {
                  event.stopPropagation();
                  next();
                }}
                aria-label="Next screenshot"
              >
                ›
              </button>
            </>
          )}
        </dialog>
      )}
    </>
  );
}