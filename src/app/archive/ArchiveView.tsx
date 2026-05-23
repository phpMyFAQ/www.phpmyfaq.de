'use client';

import { useState } from 'react';
import type { ArchiveGroup } from '@/lib/archive';
import styles from './archive.module.scss';

interface ArchiveViewProps {
  groups: ArchiveGroup[];
}

function formatDate(date: string): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
}

export default function ArchiveView({ groups }: ArchiveViewProps) {
  // The most recent series is expanded by default, the rest are collapsed.
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(groups.map((g, i) => [g.slug, i === 0])),
  );

  const toggle = (slug: string) => setExpanded((prev) => ({ ...prev, [slug]: !prev[slug] }));

  const jumpTo = (slug: string) => {
    setExpanded((prev) => ({ ...prev, [slug]: true }));
    requestAnimationFrame(() => {
      document.getElementById(`series-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className={styles.layout}>
      <nav className={styles.sidebar} aria-label="Release series">
        <span className={styles.sidebarTitle}>Series</span>
        <ul className={styles.sidebarList}>
          {groups.map((group) => (
            <li key={group.slug}>
              <button type="button" className={styles.sidebarLink} onClick={() => jumpTo(group.slug)}>
                {group.name}
                <span className={styles.sidebarCount}>{group.releases.length}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.content}>
        {groups.map((group) => {
          const isOpen = expanded[group.slug];
          return (
            <section key={group.slug} id={`series-${group.slug}`} className={styles.group}>
              <button
                type="button"
                className={styles.groupHeader}
                onClick={() => toggle(group.slug)}
                aria-expanded={isOpen}
              >
                <span className={styles.chevron} data-open={isOpen}>
                  ▸
                </span>
                <h2>phpMyFAQ {group.name}</h2>
                <span className={styles.groupMeta}>
                  {group.releases.length} {group.releases.length === 1 ? 'release' : 'releases'}
                </span>
              </button>

              {isOpen && (
                <ul className={styles.releases}>
                  {group.releases.map((release) => (
                    <li key={release.version} className={styles.release}>
                      <div className={styles.releaseInfo}>
                        <span className={styles.version}>{release.version}</span>
                        <time className={styles.date}>{formatDate(release.date)}</time>
                      </div>
                      <div className={styles.actions}>
                        <a className={styles.download} href={release.zipUrl} download>
                          <i className="fas fa-file-zipper" aria-hidden="true"></i> ZIP
                        </a>
                        <a className={styles.download} href={release.targzUrl} download>
                          <i className="fas fa-file-archive" aria-hidden="true"></i> TAR.GZ
                        </a>
                        <a className={styles.notes} href={`/changelog#${release.changelogAnchor}`}>
                          <i className="fas fa-file-lines" aria-hidden="true"></i>
                          <span className={styles.notesLabel}> Release notes</span>
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
