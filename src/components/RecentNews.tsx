import Link from 'next/link'
import { getRecentNews } from '@/lib/news'

export default function RecentNews() {
  const newsItems = getRecentNews(6)

  const formatContent = (content: string) => {
    // Simple markdown-like formatting for links
    return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  }

  return (
    <section id="news" className="news">
      <div className="container mt-5">
        <h2 className="mb-2">
          <a id="latest-news"></a>
          Latest phpMyFAQ news
        </h2>
        <div className="row">
          {newsItems.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-xs-12 mb-4">
              <div className="news-item">
                <h3>{item.date}</h3>
                <hr />
                <div
                  className="news-content"
                  dangerouslySetInnerHTML={{ __html: formatContent(item.content) }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-lg-12">
            <p>
              Looking for older news? Take a look at our <Link href="/news/">news archive</Link>.
            </p>
            <div className="icon-holder text-center">
              <i className="fas fa-smile"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
