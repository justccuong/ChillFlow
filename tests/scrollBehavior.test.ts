// tests/scrollBehavior.test.ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

describe('LandingPagePreview scroll compatibility', () => {
  it('outer wrapper của LandingPagePreview KHÔNG được chứa data-lenis-prevent để không chặn cuộn trang chính', () => {
    const src = readFileSync('src/components/LandingPage/LandingPagePreview.tsx', 'utf8');
    const match = src.match(/return\s*\(\s*<div([^>]*)>/);
    expect(match).toBeTruthy();
    expect(match![1]).not.toContain('data-lenis-prevent');
  });

  it('LandingPagePreview và App sử dụng overflow-x-clip để tránh kích hoạt context overflow-y độc lập', () => {
    const appSrc = readFileSync('src/App.tsx', 'utf8');
    const previewSrc = readFileSync('src/components/LandingPage/LandingPagePreview.tsx', 'utf8');
    expect(appSrc).toContain('overflow-x-clip');
    expect(previewSrc).toContain('overflow-x-clip');
  });
});
