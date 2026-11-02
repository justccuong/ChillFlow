// tests/splitLayoutPreview.test.ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

describe('SectionCustomizerModal live mini-preview panel', () => {
  it('SectionCustomizerModal phải import MiniLivePreview', () => {
    const src = readFileSync('src/components/LandingPage/SectionCustomizerModal.tsx', 'utf8');
    expect(src).toContain('MiniLivePreview');
  });

  it('SectionCustomizerModal phải có mobileTab state để chuyển đổi trên mobile', () => {
    const src = readFileSync('src/components/LandingPage/SectionCustomizerModal.tsx', 'utf8');
    expect(src).toContain('mobileTab');
  });

  it('SectionCustomizerModal phải có breakpoint md: cho layout chia cột', () => {
    const src = readFileSync('src/components/LandingPage/SectionCustomizerModal.tsx', 'utf8');
    expect(src).toMatch(/md:flex|md:block|md:w-/);
  });

  it('SectionCustomizerModal phải có data-lenis-prevent để cho phép lăn chuột mượt mà', () => {
    const src = readFileSync('src/components/LandingPage/SectionCustomizerModal.tsx', 'utf8');
    expect(src).toContain('data-lenis-prevent');
  });

  it('App.tsx không chứa split layout bên ngoài mà hiển thị toàn màn hình', () => {
    const src = readFileSync('src/App.tsx', 'utf8');
    expect(src).not.toContain('MiniLivePreview');
  });
});
