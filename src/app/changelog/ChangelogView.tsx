'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ChangelogGroup } from '@/lib/changelog';
import styles from './changelog.module.scss';

interface ChangelogViewProps {
  groups: ChangelogGroup[];
}

function formatDate(date: string): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
}

// Maps the leading verb of a changelog entry to a category for colour-coded tags.
function itemCategory(html: string): string {
  const word = html.replace(/<[^>]+>/g, '').trim().split(/\s+/)[0]?.toLowerCase() ?? '';
  if (['added', 'new'].includes(word)) return 'added';
  if (['fixed'].includes(word)) return 'fixed';
  if (['removed', 'dropped', 'changed', 'switched'].includes(word)) return 'changed';
  return 'updated';
}

export default function ChangelogView({ groups }: ChangelogViewProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(groups.map((g, i) => [g.slug, i === 0])),
  );

  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  const toggle = (slug: string) => setExpanded((prev) => ({ ...prev, [slug]: !prev[slug] }));

  // Opens the group containing the hash-targeted release and queues a scroll to it.
  const revealHash = useCallback(() => {
    const anchor = decodeURIComponent(window.location.hash.replace(/^#/, ''));
    if (!anchor) return;
    const group = groups.find((g) => g.releases.some((r) => r.anchor === anchor));
    if (!group) return;
    setExpanded((prev) => ({ ...prev, [group.slug]: true }));
    setPendingScroll(anchor);
  }, [groups]);

  useEffect(() => {
    revealHash();
    window.addEventListener('hashchange', revealHash);
    return () => window.removeEventListener('hashchange', revealHash);
  }, [revealHash]);

  // Runs after the target group has rendered its releases, so the element exists.
  useEffect(() => {
    if (!pendingScroll) return;
    const el = document.getElementById(pendingScroll);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setPendingScroll(null);
    }
  }, [pendingScroll, expanded]);

  const jumpTo = (slug: string) => {
    setExpanded((prev) => ({ ...prev, [slug]: true }));
    requestAnimationFrame(() => {
      document.getElementById(`group-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className={styles.layout}>
      <nav className={styles.sidebar} aria-label="Changelog versions">
        <span className={styles.sidebarTitle}>Versions</span>
        <ul className={styles.sidebarList}>
          {groups.map((group) => (
            <li key={group.slug}>
              <button type="button" className={styles.sidebarLink} onClick={() => jumpTo(group.slug)}>
                {group.slug}
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
            <section key={group.slug} id={`group-${group.slug}`} className={styles.group}>
              <button
                type="button"
                className={styles.groupHeader}
                onClick={() => toggle(group.slug)}
                aria-expanded={isOpen}
              >
                <span className={styles.chevron} data-open={isOpen}>
                  ▸
                </span>
                <h2>{group.name}</h2>
                <span className={styles.groupMeta}>
                  {group.releases.length} {group.releases.length === 1 ? 'release' : 'releases'}
                </span>
              </button>

              {isOpen && (
                <div className={styles.releases}>
                  {group.releases.map((release) => (
                    <article key={release.anchor} id={release.anchor} className={styles.release}>
                      <div className={styles.releaseHead}>
                        <h3>{release.version}</h3>
                        <time className={styles.releaseDate}>{formatDate(release.date)}</time>
                      </div>
                      <ul className={styles.items}>
                        {release.items.map((item, idx) => {
                          const cat = itemCategory(item);
                          return (
                            <li key={idx} className={styles.item} data-cat={cat}>
                              <span className={styles.itemDot} aria-hidden="true" />
                              <span dangerouslySetInnerHTML={{ __html: item }} />
                            </li>
                          );
                        })}
                      </ul>
                    </article>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
