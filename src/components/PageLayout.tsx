import { Metadata } from 'next';
import styles from './PageLayout.module.scss';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export default function PageLayout({ children, title, description, className = '' }: PageLayoutProps) {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        {(title || description) && (
          <div className={styles.header}>
            {title && <h1>{title}</h1>}
            {description && <p className={styles.description}>{description}</p>}
          </div>
        )}
        <div className={`${styles.content} ${className}`}>{children}</div>
      </div>
    </div>
  );
}

export function generatePageMetadata(title: string, description?: string): Metadata {
  return {
    title: `${title} - phpMyFAQ`,
    description: description || `${title} - phpMyFAQ is a multilingual FAQ system`,
  };
}
