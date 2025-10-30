import { describe, it, expect } from 'vitest';
import { middleware } from '../../middleware';
import type { NextRequest } from 'next/server';

// Helper to create a minimal NextRequest-like object for testing
function mockRequest(pathname: string) {
  return { nextUrl: { pathname } } as unknown as NextRequest;
}

describe('middleware /news/:year validation', () => {
  it('allows valid year at lower bound (2001)', () => {
    const res = middleware(mockRequest('/news/2001'));
    expect(res.status).toBe(200);
  });

  it('allows valid year at upper bound (2025)', () => {
    const res = middleware(mockRequest('/news/2025'));
    expect(res.status).toBe(200);
  });

  it('returns 404 for year below range (1999)', () => {
    const res = middleware(mockRequest('/news/1999'));
    expect(res.status).toBe(404);
  });

  it('returns 404 for year above range (2026)', () => {
    const res = middleware(mockRequest('/news/2026'));
    expect(res.status).toBe(404);
  });

  it('returns 404 for non-numeric year (abcd)', () => {
    const res = middleware(mockRequest('/news/abcd'));
    expect(res.status).toBe(404);
  });

  it('passes through for paths with extra segments (not single-segment match)', () => {
    const res = middleware(mockRequest('/news/2025/extra'));
    expect(res.status).toBe(200);
  });

  it('passes through for non-news paths', () => {
    const res = middleware(mockRequest('/features'));
    expect(res.status).toBe(200);
  });
});
