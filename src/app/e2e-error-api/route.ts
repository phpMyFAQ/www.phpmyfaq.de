export const dynamic = 'force-static';

export async function GET() {
  if (process.env.PLAYWRIGHT_TEST === '1') {
    return new Response('E2E Test Error', { status: 500 });
  }
  return new Response('OK', { status: 200 });
}
