// tests/splitLayoutPreview.test.ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

describe('App split layout preview', () => {
  it('App.tsx phải import MiniLivePreview', () => {
    const src = readFileSync('src/App.tsx', 'utf8');
    expect(src).toContain('MiniLivePreview');
  });

  it('App.tsx phải có showMobilePreview state', () => {
    const src = readFileSync('src/App.tsx', 'utf8');
    expect(src).toContain('showMobilePreview');
  });

  it('App.tsx phải có lg: responsive breakpoint', () => {
    const src = readFileSync('src/App.tsx', 'utf8');
    expect(src).toMatch(/lg:flex|lg:block|lg:w-/);
  });
});
