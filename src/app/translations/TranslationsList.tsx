'use client';

import { useMemo, useState } from 'react';
import styles from './translations.module.scss';

type Language = {
  code: string;
  name: string;
  native: string;
  rtl?: boolean;
  note?: string;
};

const languages: Language[] = [
  { code: 'ar', name: 'Arabic', native: 'العربية', rtl: true },
  { code: 'eu', name: 'Basque', native: 'Euskara' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'bs', name: 'Bosnian', native: 'Bosanski' },
  { code: 'pt-br', name: 'Brazilian Portuguese', native: 'Português (Brasil)' },
  { code: 'zh-cn', name: 'Chinese', native: '简体中文', note: 'Simplified' },
  { code: 'zh-tw', name: 'Chinese', native: '繁體中文', note: 'Traditional' },
  { code: 'cs', name: 'Czech', native: 'Čeština' },
  { code: 'da', name: 'Danish', native: 'Dansk' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands' },
  { code: 'en', name: 'English', native: 'English' },
  { code: 'fi', name: 'Finnish', native: 'Suomi' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'el', name: 'Greek', native: 'Ελληνικά' },
  { code: 'he', name: 'Hebrew', native: 'עברית', rtl: true },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'hu', name: 'Hungarian', native: 'Magyar' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'lv', name: 'Latvian', native: 'Latviešu' },
  { code: 'lt', name: 'Lithuanian', native: 'Lietuvių' },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu' },
  { code: 'mn', name: 'Mongolian', native: 'Монгол' },
  { code: 'nb', name: 'Norwegian', native: 'Norsk', note: 'Bokmål' },
  { code: 'fa', name: 'Persian', native: 'فارسی', rtl: true, note: 'Farsi' },
  { code: 'pl', name: 'Polish', native: 'Polski' },
  { code: 'pt', name: 'Portuguese', native: 'Português', note: 'Post-1990' },
  { code: 'ro', name: 'Romanian', native: 'Română' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'sr', name: 'Serbian', native: 'Српски' },
  { code: 'sk', name: 'Slovak', native: 'Slovenčina' },
  { code: 'sl', name: 'Slovenian', native: 'Slovenščina' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'sv', name: 'Swedish', native: 'Svenska' },
  { code: 'th', name: 'Thai', native: 'ไทย' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe' },
  { code: 'uk', name: 'Ukrainian', native: 'Українська' },
  { code: 'ur', name: 'Urdu', native: 'اردو', rtl: true },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
  { code: 'cy', name: 'Welsh', native: 'Cymraeg' },
];

export default function TranslationsList() {
  const [query, setQuery] = useState('');

  const rtlCount = useMemo(() => languages.filter((l) => l.rtl).length, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return languages;
    return languages.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.native.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q) ||
        (l.note ?? '').toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <>
      <p className={styles.intro}>
        phpMyFAQ is fully internationalized. Translations are encoded in UTF-8 PHP files with plural-form support, work
        seamlessly with PDF export, and include right-to-left layouts for Arabic, Farsi, Hebrew, and Urdu.
      </p>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.value}>{languages.length}</span>
          <span className={styles.label}>Languages</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.value}>{rtlCount}</span>
          <span className={styles.label}>RTL Layouts</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.value}>UTF-8</span>
          <span className={styles.label}>Encoding</span>
        </div>
      </div>

      <h2 className={styles.heading}>Supported Languages</h2>

      <div className={styles.toolbar}>
        <div className={styles.search}>
          <i className="fas fa-search" aria-hidden="true"></i>
          <input
            type="search"
            placeholder="Search by name, native name, or code…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search languages"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>No languages match &ldquo;{query}&rdquo;.</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((lang) => (
            <div key={lang.code} className={`${styles.card} ${lang.rtl ? styles.rtl : ''}`}>
              <span className={styles.code}>{lang.code}</span>
              <div className={styles.body}>
                <span className={styles.name}>
                  {lang.name}
                  {lang.note && <span className={styles.badge}>{lang.note}</span>}
                  {lang.rtl && <span className={styles.badge}>RTL</span>}
                </span>
                <span className={styles.native} lang={lang.code} dir={lang.rtl ? 'rtl' : undefined}>
                  {lang.native}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.cta}>
        <h3>Help us translate phpMyFAQ</h3>
        <p>
          Want to add a new language or improve an existing translation? Contributions are welcome &mdash; submit a pull
          request on GitHub.
        </p>
        <a
          className={styles.button}
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/thorsten/phpMyFAQ"
        >
          <i className="fab fa-github" aria-hidden="true"></i>
          Contribute on GitHub
        </a>
      </div>
    </>
  );
}
