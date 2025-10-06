'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import styles from './Header.module.scss'

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <header className={`${styles.header} header`}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Link href="/">
              <img src="/images/logo.png" width="199" height="50" alt="Logo of phpMyFAQ" />
            </Link>
            <span className="visually-hidden">phpMyFAQ</span>
          </div>

          <div className={styles.navContainer}>
            <nav>
              <button
                className={styles.navToggle}
                onClick={() => setIsNavOpen(!isNavOpen)}
                aria-controls="navbar-collapse"
                aria-expanded={isNavOpen}
                aria-label="Toggle navigation"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>

              <ul className={`${styles.nav} ${isNavOpen ? styles.show : ''}`}>
                <li className={`${styles.navItem} ${isActive('/features') ? styles.active : ''}`}>
                  <Link href="/features">Features</Link>
                </li>
                <li className={`${styles.navItem} ${isActive('/documentation') ? styles.active : ''}`}>
                  <Link href="/documentation">Documentation</Link>
                </li>
                <li className={`${styles.navItem} ${isActive('/support') ? styles.active : ''}`}>
                  <Link href="/support">Support</Link>
                </li>
                <li className={`${styles.navItem} ${isActive('/download') ? styles.active : ''}`}>
                  <Link href="/download">Download</Link>
                </li>
              </ul>
            </nav>

            <div className={styles.themeToggleContainer}>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}