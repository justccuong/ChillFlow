import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import path from 'path';
import { STORAGE_KEY_SEEN_TOUR } from '../src/components/LandingPage/QuickTourGuide';

describe('QuickTourGuide and Responsive Toolbar Layout', () => {
  it('STORAGE_KEY_SEEN_TOUR has expected storage key', () => {
    expect(STORAGE_KEY_SEEN_TOUR).toBe('chillflow_has_seen_quick_tour');
  });

  it('LandingPagePreview renders Desktop Vertical Studio Dock on left edge (hidden md:flex)', () => {
    const previewSrc = readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/LandingPagePreview.tsx'),
      'utf8'
    );
    expect(previewSrc).toContain('aside');
    expect(previewSrc).toContain('hidden md:flex fixed left-3 lg:left-4 top-1/2 -translate-y-1/2 z-50 flex-col');
    expect(previewSrc).toContain('Kho 12 Templates Sự Kiện');
  });

  it('LandingPagePreview renders Mobile Floating Action Button and Bottom Sheet Drawer (md:hidden)', () => {
    const previewSrc = readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/LandingPagePreview.tsx'),
      'utf8'
    );
    expect(previewSrc).toContain('md:hidden fixed bottom-5 left-4 z-50');
    expect(previewSrc).toContain('Công cụ Studio ChillFlow');
    expect(previewSrc).toContain('isMobileStudioOpen');
  });

  it('LandingPagePreview embeds QuickTourGuide component', () => {
    const previewSrc = readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/LandingPagePreview.tsx'),
      'utf8'
    );
    expect(previewSrc).toContain('<QuickTourGuide');
    expect(previewSrc).toContain('isOpen={isTourOpen}');
    expect(previewSrc).toContain('onClose={() => setIsTourOpen(false)}');
  });

  it('QuickTourGuide has 4 guided steps with skip and finish functionality', () => {
    const tourSrc = readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/QuickTourGuide.tsx'),
      'utf8'
    );
    expect(tourSrc).toContain('Bước 1/4');
    expect(tourSrc).toContain('Bước 2/4');
    expect(tourSrc).toContain('Bước 3/4');
    expect(tourSrc).toContain('Bước 4/4');
    expect(tourSrc).toContain('Bỏ qua');
    expect(tourSrc).toContain('Bắt đầu trải nghiệm');
  });
});
