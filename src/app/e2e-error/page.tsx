import PageLayout from '@/components/PageLayout';

export default function E2EErrorPage() {
  return (
    <PageLayout title="E2E Error Test Helper">
      <p>This page is used during development. The E2E tests use the API route /e2e-error-api to trigger HTTP 500.</p>
    </PageLayout>
  );
}