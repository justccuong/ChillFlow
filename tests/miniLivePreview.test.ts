// tests/miniLivePreview.test.ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

describe('MiniLivePreview component', () => {
  it('file phải tồn tại và export MiniLivePreview', () => {
    const src = readFileSync('src/components/LandingPage/MiniLivePreview.tsx', 'utf8');
    expect(src).toContain('export const MiniLivePreview');
  });

  it('phải có pointer-events none để disable interaction', () => {
    const src = readFileSync('src/components/LandingPage/MiniLivePreview.tsx', 'utf8');
    expect(src).toMatch(/pointerEvents.*none|pointer-events.*none/);
  });

  it('phải có transform scale', () => {
    const src = readFileSync('src/components/LandingPage/MiniLivePreview.tsx', 'utf8');
    expect(src).toContain('scale');
  });

  it('phải có mini-live-preview-wrapper class', () => {
    const src = readFileSync('src/components/LandingPage/MiniLivePreview.tsx', 'utf8');
    expect(src).toContain('mini-live-preview-wrapper');
  });

  it('phải dùng ResizeObserver hoặc containerRef cho responsive scale', () => {
    const src = readFileSync('src/components/LandingPage/MiniLivePreview.tsx', 'utf8');
    expect(src).toMatch(/ResizeObserver|containerRef/);
  });
});
