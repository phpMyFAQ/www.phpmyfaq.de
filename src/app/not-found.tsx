import PageLayout from '@/components/PageLayout'
import Link from 'next/link';

export default function NotFound() {
  return (
    <PageLayout title="Page not found" description="Sorry, we couldn't find the page you're looking for.">
      <div className="row">
        <div className="col-12 col-md-8">
          <p>The page may have been moved or deleted.</p>
          <Link className="btn btn-primary" href="/">Back to homepage</Link>
        </div>
      </div>
    </PageLayout>
  )
}

