import Link from 'next/link'

export default function RecentNews() {
  const newsItems = [
    {
      date: '2025-10-04',
      content: `We're excited to announce the release of [phpMyFAQ 4.1.0-alpha.3](/download), the "Jane Goodall" release.
This version introduces several new features and experimental improvements.
You can now edit the llms.txt configuration file and benefit from full EU Data Act 2025 compliance.
A new dark/light mode toggle enhances the user experience.
In addition, this release adds experimental support for PHP 8.5, FrankenPHP, LDAP group integration, MCP Server,
updates via the command line, .env file configuration, and Mago.`
    },
    {
      date: '2025-10-03',
      content: `The phpMyFAQ Team is pleased to announce [phpMyFAQ 4.0.13](/download), the "Claudia Cardinale" release.
This release fixes a security vulnerability, fixes the reported bugs, and we updated our third party dependencies.
[Click here to find a detailed security advisory](/security/advisory-2025-10-03).`
    },
    {
      date: '2025-09-23',
      content: `The phpMyFAQ Team would like to announce the availability of [phpMyFAQ 4.0.12](/download),
the "Robert Redford" release.
This release fixes all reported bugs, and we updated our third party dependencies.`
    },
    {
      date: '2025-09-13',
      content: `The phpMyFAQ Team is pleased to announce [phpMyFAQ 4.0.11](/download), the "Brent Hinds" release.
This release re-adds the rewrite rules for ISS, fixes the reported bugs, and we updated our third party dependencies.`
    },
    {
      date: '2025-08-02',
      content: `The phpMyFAQ Team would like to announce the availability of [phpMyFAQ 4.0.10](/download), the "Laura Dahlmeier" release.
This release fixes all reported bugs, and we updated our third party dependencies.`
    },
    {
      date: '2025-07-06',
      content: `The phpMyFAQ Team is pleased to announce [phpMyFAQ 4.0.9](/download), the "Brian Wilson" release.
This release fixes a lot of reported bugs, and we updated our third party dependencies.`
    }
  ]

  const formatContent = (content: string) => {
    // Simple markdown-like formatting for links
    return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  }

  return (
    <section id="news" className="news">
      <div className="container mt-5">
        <h2>
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
