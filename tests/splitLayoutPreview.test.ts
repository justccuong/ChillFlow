// tests/splitLayoutPreview.test.ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

describe('SectionCustomizerModal unified 2-column live preview modal', () => {
  it('SectionCustomizerModal phải import MiniLivePreview', () => {
    const src = readFileSync('src/components/LandingPage/SectionCustomizerModal.tsx', 'utf8');
    expect(src).toContain('MiniLivePreview');
  });

  it('SectionCustomizerModal gộp 2 tab thành 1 màn hình chia cột thống nhất (Unified Split View)', () => {
    const src = readFileSync('src/components/LandingPage/SectionCustomizerModal.tsx', 'utf8');
    // Unified flex-row layout without tab switching
    expect(src).toContain('flex flex-row min-h-0 overflow-hidden');
    // MiniLivePreview is always visible on right column
    expect(src).toContain('<MiniLivePreview');
  });

  it('SectionCustomizerModal có cột nút section gọn gàng, hiển thị icon, tên và mini switch', () => {
    const src = readFileSync('src/components/LandingPage/SectionCustomizerModal.tsx', 'utf8');
    // Compact button column with comfortable width for labels
    expect(src).toContain('w-[140px] xs:w-[160px] sm:w-[200px] md:w-[245px] shrink-0');
    // Has role="switch" for accessibility
    expect(src).toContain('role="switch"');
    // Has shortLabel for compact mobile display
    expect(src).toContain('shortLabel');
    expect(src).toContain('def.shortLabel');
  });

  it('SectionCustomizerModal hỗ trợ sáng vàng khi bật/hover, và chớp đỏ rồi mới biến mất khi tắt', () => {
    const src = readFileSync('src/components/LandingPage/SectionCustomizerModal.tsx', 'utf8');
    expect(src).toContain('highlightedSection');
    expect(src).toContain('highlightColor');
    expect(src).toContain('handleTurnOff');
    expect(src).toContain('handleTurnOn');
    expect(src).toContain('turningOffSectionKey');
    expect(src).toContain('highlightColor={highlightColor}');

    const previewSrc = readFileSync('src/components/LandingPage/MiniLivePreview.tsx', 'utf8');
    expect(previewSrc).toContain('highlightedSection');
    expect(previewSrc).toContain('highlightColor');
    expect(previewSrc).toContain('border-rose-500');
    expect(previewSrc).toContain('scrollIntoView');
  });

  it('MiniLivePreview có responsive viewport cho to hơn và tránh bị thu nhỏ như máy tính trên màn hình hẹp', () => {
    const previewSrc = readFileSync('src/components/LandingPage/MiniLivePreview.tsx', 'utf8');
    expect(previewSrc).toContain('targetInnerWidth');
    expect(previewSrc).toContain('w < 420 ? 520');
  });

  it('SectionCustomizerModal đã loại bỏ icon mắt xem trước wireframe khó hiểu', () => {
    const src = readFileSync('src/components/LandingPage/SectionCustomizerModal.tsx', 'utf8');
    // Completely removed Eye icon and wireframe accordion
    expect(src).not.toContain('<Eye');
    expect(src).not.toContain('SectionWireframePreview');
  });

  it('SectionCustomizerModal phải có data-lenis-prevent để cho phép lăn chuột mượt mà', () => {
    const src = readFileSync('src/components/LandingPage/SectionCustomizerModal.tsx', 'utf8');
    expect(src).toContain('data-lenis-prevent');
  });

  it('SectionCustomizerModal có footer nền đặc z-10 để tránh chữ cuộn lộ qua', () => {
    const src = readFileSync('src/components/LandingPage/SectionCustomizerModal.tsx', 'utf8');
    expect(src).toContain('bg-white dark:bg-slate-900 flex items-center justify-between shrink-0 z-10');
  });

  it('App.tsx không chứa split layout bên ngoài mà hiển thị toàn màn hình', () => {
    const src = readFileSync('src/App.tsx', 'utf8');
    expect(src).not.toContain('MiniLivePreview');
  });
});
