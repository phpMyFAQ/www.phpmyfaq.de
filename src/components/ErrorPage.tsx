'use client';

import Link from 'next/link';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const showDetails = process.env.NODE_ENV !== 'production';
  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 col-md-8">
          <h1>Something went wrong</h1>
          <p>
            An unexpected error occurred. We're sorry for the inconvenience. Please try again or go back to the
            homepage.
          </p>
          {showDetails && (
            <div className="alert alert-warning" role="alert">
              <strong>Details:</strong> {error.message}
            </div>
          )}
          <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={() => reset()}>
              Try again
            </button>
            <Link className="btn btn-outline-secondary" href="/">
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
