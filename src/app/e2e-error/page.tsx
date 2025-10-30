export default function E2EErrorPage() {
  return (
    <div className="container py-4">
      <h1>E2E Error Test Helper</h1>
      <p>This page is used during development. The E2E tests use the API route /e2e-error-api to trigger HTTP 500.</p>
    </div>
  );
}
