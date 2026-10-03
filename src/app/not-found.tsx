import PageLayout from '@/components/PageLayout';
import Link from 'next/link';
import blocks from '@/components/ContentBlocks.module.scss';

export default function NotFound() {
  return (
    <PageLayout title="Page not found" description="Sorry, we couldn't find the page you're looking for.">
      <p>The page may have been moved or deleted.</p>
      <div className={blocks.actions}>
        <Link className={blocks.cta} href="/">
          Back to homepage
        </Link>
        <Link className={blocks.ctaSecondary} href="/documentation">
          Documentation
        </Link>
      </div>
    </PageLayout>
  );
}