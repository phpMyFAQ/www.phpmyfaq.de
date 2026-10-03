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
    const active = activeSponsors('2099-01-01');
    expect(active.map((sponsor) => sponsor.href)).toContain('https://nieuwe-casinos.net/casino-reviews');
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