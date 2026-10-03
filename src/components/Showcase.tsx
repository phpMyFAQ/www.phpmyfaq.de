import Link from 'next/link';
import ScreenshotGallery, { Screenshot } from './ScreenshotGallery';
import styles from './Showcase.module.scss';

// The public FAQ leads; the admin shots show the other half of the product.
// The full set lives on the features page.
const screenshots: Screenshot[] = [
  {
    src: '/images/screenshots/frontend-categories.webp',
    alt: 'phpMyFAQ public category overview',
    caption: 'The public FAQ: a clear category overview your visitors can browse and search.',
  },
  {
    src: '/images/screenshots/admin-dashboard.webp',
    alt: 'phpMyFAQ admin dashboard',
    caption: 'The admin dashboard with visits, popular FAQs and content health.',
  },
  {
    src: '/images/screenshots/admin-editor.webp',
    alt: 'phpMyFAQ FAQ editor with WYSIWYG editing',
    caption: 'The FAQ editor with WYSIWYG editing, SEO and permission tabs.',
  },
];

export default function Showcase() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>See it in action</h2>
        <ScreenshotGallery screenshots={screenshots} layout="featured" />
        <p className={styles.footer}>
          <Link href="/features">More screenshots</Link> · <Link href="/demo">Try the live demo</Link>
        </p>
      </div>
    </section>
  );
}