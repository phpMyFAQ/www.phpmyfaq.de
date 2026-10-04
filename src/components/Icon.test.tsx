import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Icon from './Icon';

describe('Icon', () => {
  it('renders an inline svg hidden from assistive technology by default', () => {
    const { container } = render(<Icon name="download" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('fill', 'currentColor');
    expect(svg?.querySelector('path')?.getAttribute('d')).toBeTruthy();
  });

  it('exposes a label as an accessible image when given one', () => {
    const { container } = render(<Icon name="brand-github" label="GitHub" className="x" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('role', 'img');
    expect(svg).not.toHaveAttribute('aria-hidden');
    expect(svg?.querySelector('title')?.textContent).toBe('GitHub');
    expect(svg).toHaveClass('x');
  });
});