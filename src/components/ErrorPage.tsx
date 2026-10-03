'use client';

import Link from 'next/link';
import PageLayout from './PageLayout';
import blocks from './ContentBlocks.module.scss';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const showDetails = process.env.NODE_ENV !== 'production';
  return (
    <PageLayout title="Something went wrong">
      <p>
        An unexpected error occurred. We're sorry for the inconvenience. Please try again or go back to the homepage.
      </p>
      {showDetails && (
        <div className={blocks.notice} role="alert">
          <i className="fas fa-triangle-exclamation" aria-hidden="true"></i>
          <p>
            <strong>Details:</strong> {error.message}
          </p>
        </div>
      )}
      <div className={blocks.actions}>
        <button type="button" className={blocks.cta} onClick={() => reset()}>
          Try again
        </button>
        <Link className={blocks.ctaSecondary} href="/">
          Back to homepage
        </Link>
      </div>
    </PageLayout>
  );
}