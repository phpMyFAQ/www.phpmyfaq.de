import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import WhatsNext from './WhatsNext';

vi.mock(import('@/lib/data'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    requireVersions: () => ({
      stable: '4.1.9',
      stable_released: '2026-10-03',
      development: '4.2.0-beta',
      development_released: '2026-10-03',
    }),
  };
});

describe('WhatsNext', () => {
  it('names the pre-release the highlights are based on and links its changelog entry', () => {
    render(<WhatsNext />);
    const link = screen.getByRole('link', { name: /4\.2\.0-beta changelog/i });
    expect(link.getAttribute('href')).toMatch(/^\/changelog\/?#4\.2\.0-beta$/);
    expect(screen.getByText(/October 3, 2026/)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(6);
  });
});