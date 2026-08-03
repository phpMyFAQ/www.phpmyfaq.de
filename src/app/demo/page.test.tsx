import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DemoPage from './page';

vi.mock(import('@/lib/data'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getVersions: () => ({
      stable: '4.1.6',
      stable_released: '2026-07-13',
      development: '4.1.0-RC.7',
      development_released: '2026-02-27',
    }),
  };
});

describe('DemoPage', () => {
  it('renders title and credentials', () => {
    render(<DemoPage />);
    expect(screen.getByText('Demo')).toBeInTheDocument();
    expect(screen.getByText(/Admin user/i)).toBeInTheDocument();
    expect(screen.getByText(/Normal user/i)).toBeInTheDocument();
    expect(screen.getAllByText(/demoadmin/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/demouser/i)[0]).toBeInTheDocument();
  });

  it('shows stable demo link', () => {
    render(<DemoPage />);
    const link = screen.getByRole('link', { name: /phpMyFAQ 4.1.6/i });
    expect(link).toHaveAttribute('href', 'https://roy.demo.phpmyfaq.de/');
  });

  it('hides the development demo while it trails the stable release', () => {
    render(<DemoPage />);
    expect(screen.queryByText(/4\.1\.0-RC\.7/)).not.toBeInTheDocument();
  });
});