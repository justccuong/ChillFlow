import { describe, it, expect } from 'vitest';
import { getEventSupportEmail, getFooterQuickLinks } from '../src/components/LandingPage/EventFooterSection';

describe('EventFooterSection Utilities', () => {
  it('generates a clean sanitized event support email based on event title', () => {
    const email1 = getEventSupportEmail('AI Agent Summit 2026');
    expect(email1).toBe('hotro@aiagentsummit2026.vn');

    const email2 = getEventSupportEmail('Workshop Thiết Kế & Sáng Tạo #1');
    expect(email2).toBe('hotro@workshopthietkesangtao1.vn');

    const emailEmpty = getEventSupportEmail('');
    expect(emailEmpty).toBe('hotro@sukien.vn');
  });

  it('provides all standard event navigation links with anchors', () => {
    const links = getFooterQuickLinks();
    expect(links.length).toBeGreaterThanOrEqual(5);
    const hrefs = links.map((l) => l.href);
    expect(hrefs).toContain('#benefits');
    expect(hrefs).toContain('#speaker');
    expect(hrefs).toContain('#agenda');
    expect(hrefs).toContain('#faq');
    expect(hrefs).toContain('#registration');
  });
});
