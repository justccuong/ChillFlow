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

  it('SectionCustomizerModal tối ưu hóa hàng section trên di động: ẩn icon cồng kềnh, canh trái tên và mô tả, đặt xem trước và công tắc ở bên phải', () => {
    const src = readFileSync('src/components/LandingPage/SectionCustomizerModal.tsx', 'utf8');
    // Hide bulky square icon on mobile
    expect(src).toContain('hidden sm:flex w-9 h-9 rounded-xl items-center justify-center');
    // Hide Hiển thị badge on mobile
    expect(src).toContain('hidden sm:inline-flex text-[10px] font-semibold uppercase');
    // Mobile eye preview button
    expect(src).toContain('sm:hidden p-1.5 rounded-lg');
    expect(src).toContain('title="Xem trước mẫu wireframe"');
    // Solid footer to prevent text bleeding through
    expect(src).toContain('bg-white dark:bg-slate-900 flex items-center justify-end shrink-0 z-10');
  });

  it('App.tsx không chứa split layout bên ngoài mà hiển thị toàn màn hình', () => {
    const src = readFileSync('src/App.tsx', 'utf8');
    expect(src).not.toContain('MiniLivePreview');
  });
});
