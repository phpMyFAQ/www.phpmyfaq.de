import Link from 'next/link';
import { getRecentNews } from '@/lib/news';
import styles from './RecentNews.module.scss';

export default function RecentNews() {
  const newsItems = getRecentNews(6);

  const formatContent = (content: string) => {
    return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>').replace(/\n/g, '<br>');
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section id="news" className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>Latest News</h2>
        <div className={styles.grid}>
          {newsItems.map((item, index) => (
            <article key={index} className={styles.card}>
              <time className={styles.date} dateTime={item.date}>
                {formatDate(item.date)}
              </time>
              <div className={styles.content} dangerouslySetInnerHTML={{ __html: formatContent(item.content) }} />
            </article>
          ))}
        </div>
        <p className={styles.footer}>
          <Link href="/news/">View full news archive &rarr;</Link>
        </p>
      </div>
    </section>
  );
}
