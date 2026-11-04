import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Public Header & Background Cleanup Refinements', () => {
  it('1. ensures laser timeline card background, border and shadow are completely transparent', () => {
    const css = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/LaserScrollTimeline.css'),
      'utf-8'
    );
    expect(css).toContain('.laser-timeline-canvas-card {');
    expect(css).toContain('background: transparent !important');
    expect(css).toContain('box-shadow: none !important');
    // Ensure the old dark grey solid background is removed
    expect(css).not.toContain('background: #080d1a');
  });

  it('2. ensures TrustBarSection label has no grey pill background or border', () => {
    const content = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/TrustBarSection.tsx'),
      'utf-8'
    );
    // Should not have the heavy dark/light pill background
    expect(content).not.toContain('bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800');
    expect(content).toContain('text-[11px] font-bold uppercase tracking-[0.25em] text-slate-600 dark:text-slate-400');
  });

  it('3. ensures PublicStandalonePage includes PublicEventNavbar and useThemeMode', () => {
    const content = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/PublicStandalonePage.tsx'),
      'utf-8'
    );
    expect(content).toContain("import { PublicEventNavbar } from './PublicEventNavbar'");
    expect(content).toContain('useThemeMode');
    expect(content).toContain('<PublicEventNavbar');
    expect(content).toContain('isOwner={isOwner}');
  });

  it('4. ensures PublicEventNavbar has theme toggler and role-based permissions', () => {
    const content = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/PublicEventNavbar.tsx'),
      'utf-8'
    );
    // Contains Theme Toggler
    expect(content).toContain('AnimatedThemeToggler');
    // Separates Organizer (isOwner) and Attendee
    expect(content).toContain('isOwner ? (');
    expect(content).toContain('Quản trị sự kiện');
    expect(content).toContain('Đăng ký vé');
    // Anchor navigation links
    expect(content).toContain('#agenda');
    expect(content).toContain('#benefits');
    expect(content).toContain('#speaker');
    expect(content).toContain('#gallery');
  });
});
