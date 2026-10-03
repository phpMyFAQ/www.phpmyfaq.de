import Link from 'next/link';
import { marked } from 'marked';
import { getRecentNews } from '@/lib/news';
import { formatReleaseDate } from '@/lib/data';
import styles from './RecentNews.module.scss';

// Entries longer than this get clamped with a fade and a "Read more" link,
// so one long release note cannot stretch the whole row.
const CLAMP_THRESHOLD = 320;

export default function RecentNews() {
  const newsItems = getRecentNews(3);

  return (
    <section id="news" className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>Latest News</h2>
        <div className={styles.grid}>
          {newsItems.map((item) => {
            const clamped = item.content.length > CLAMP_THRESHOLD;
            const archiveUrl = `/news/${item.date.slice(0, 4)}/#${item.date}`;
            return (
              <article key={item.date} className={styles.card}>
                <time className={styles.date} dateTime={item.date}>
                  {formatReleaseDate(item.date)}
                </time>
                <div
                  className={`${styles.content} ${clamped ? styles.clamped : ''}`}
                  dangerouslySetInnerHTML={{ __html: marked.parse(item.content, { async: false }) }}
                />
                {clamped && (
                  <Link href={archiveUrl} className={styles.more}>
                    Read more &rarr;
                  </Link>
                )}
              </article>
            );
          })}
        </div>
        <p className={styles.footer}>
          <Link href="/news/">View full news archive &rarr;</Link>
        </p>
      </div>
    </section>
  );
}