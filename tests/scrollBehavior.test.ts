// tests/scrollBehavior.test.ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

describe('LandingPagePreview scroll compatibility', () => {
  it('outer wrapper phải có data-lenis-prevent attribute', () => {
    const src = readFileSync('src/components/LandingPage/LandingPagePreview.tsx', 'utf8');
    expect(src).toContain('data-lenis-prevent');
  });
});
