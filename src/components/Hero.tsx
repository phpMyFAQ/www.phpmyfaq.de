import Link from 'next/link'

export default function Hero() {
  return (
    <section className="promo offset-header">
      <div className="container text-center">
        <h2 className="title">phpMy<span className="highlight">FAQ</span> 4.0</h2>

        <p className="intro">
          phpMyFAQ is a mobile-friendly, feature-rich, scalable open source FAQ web app for PHP 8.2+
        </p>

        <div className="btns">
          <a className="btn btn-outline-light me-2" href="http://demo.phpmyfaq.de/">Demo</a>
          <Link href="/download" className="btn btn-light">Download</Link>
        </div>
        <p className="love-phpmyfaq">
          We really think you will like this knowledge base script. Knowledge is free, and so is phpMyFAQ. Since 2001.
        </p>

        <ul className="meta list-inline">
          <li className="list-inline-item">
            <a className="btn btn-outline-light" rel="nofollow" target="_blank" href="https://github.com/thorsten/phpMyFAQ">
              View on GitHub
            </a>
          </li>
          <li className="list-inline-item">
            <Link className="btn btn-outline-light" href="/documentation">
              Documentation
            </Link>
          </li>
          <li className="list-inline-item">
            <a className="btn btn-outline-light" rel="nofollow" target="_blank" href="https://github.com/thorsten/phpMyFAQ/issues">
              Issues on GitHub
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}