// Emits a schema.org JSON-LD block. Data is build-time constants, never user
// input, so serialising it straight into the script tag is safe.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}