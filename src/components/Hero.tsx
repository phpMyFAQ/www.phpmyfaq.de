import Link from 'next/link';

export default function Hero() {
  return (
    <section className="promo">
      <div className="container">
        <h1 className="title">
          phpMy<span className="highlight">FAQ</span> 4.1
        </h1>

        <p className="intro">
          A mobile-friendly, feature-rich, AI-ready open source FAQ web app for PHP 8.3+. Free since 2001.
        </p>

        <div className="btns">
          <Link href="/download" className="btn btn-light me-3">
            Download phpMyFAQ
          </Link>
          <Link href="/demo" className="btn btn-outline-light">
            Live Demo
          </Link>
        </div>

        <ul className="meta list-inline">
          <li className="list-inline-item">
            <a rel="nofollow" target="_blank" href="https://github.com/thorsten/phpMyFAQ">
              GitHub
            </a>
          </li>
          <li className="list-inline-item">&middot;</li>
          <li className="list-inline-item">
            <Link href="/documentation">Documentation</Link>
          </li>
          <li className="list-inline-item">&middot;</li>
          <li className="list-inline-item">
            <Link href="/features">Features</Link>
          </li>
          <li className="list-inline-item">&middot;</li>
          <li className="list-inline-item">
            <a rel="nofollow" target="_blank" href="https://github.com/thorsten/phpMyFAQ/issues">
              Report an issue
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
