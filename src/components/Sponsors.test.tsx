import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Sponsors, { activeSponsors } from './Sponsors';

describe('activeSponsors', () => {
  it('keeps entries whose expiry date is today or later', () => {
    const active = activeSponsors('2026-12-11');
    expect(active.map((sponsor) => sponsor.href)).toContain('https://cashoutbettingsites.co.uk/');
  });

  it('drops entries once their expiry date has passed', () => {
    const active = activeSponsors('2026-12-12');
    expect(active.map((sponsor) => sponsor.href)).not.toContain('https://cashoutbettingsites.co.uk/');
  });

  it('keeps entries without an expiry date', () => {
    const permanent = { text: 'permanent', href: 'https://example.com/permanent' };
    const expiring = { text: 'expiring', href: 'https://example.com/expiring', expires: '2026-01-01' };
    const active = activeSponsors('2099-01-01', [permanent, expiring]);
    expect(active).toEqual([permanent]);
  });
});

describe('Sponsors', () => {
  it('marks every paid link as sponsored and opens it safely', () => {
    const { container } = render(<Sponsors />);
    const links = Array.from(container.querySelectorAll('a'));
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.getAttribute('rel')).toBe('sponsored nofollow noopener');
      expect(link.getAttribute('target')).toBe('_blank');
    }
  });
});