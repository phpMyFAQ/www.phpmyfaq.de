import Link from 'next/link';
import styles from './Breadcrumb.module.scss';

interface BreadcrumbProps {
  parent: { href: string; label: string };
  current: string;
}

export default function Breadcrumb({ parent, current }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={styles.breadcrumb}>
      <ol>
        <li>
          <Link href={parent.href}>{parent.label}</Link>
        </li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}