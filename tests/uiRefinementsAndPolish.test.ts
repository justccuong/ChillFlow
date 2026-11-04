import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('UI Polish & Visual Feedback Refinements', () => {
  it('1. ensures FloatingAiToolbar dropdown menu has guaranteed solid opaque background', () => {
    const content = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/FloatingAiToolbar.tsx'),
      'utf-8'
    );
    expect(content).toContain('bg-slate-950');
    expect(content).toContain('backgroundColor');
  });

  it('2. ensures earlyBirdDiscount in RegistrationSection is wrapped with InlineEditable', () => {
    const content = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/RegistrationSection.tsx'),
      'utf-8'
    );
    expect(content).toMatch(/<InlineEditable[^>]*value=\{input\.earlyBirdDiscount\}/);
  });

  it('3. ensures EventFooterSection does not contain InlineEditable wrappers', () => {
    const content = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/EventFooterSection.tsx'),
      'utf-8'
    );
    expect(content).not.toContain('<InlineEditable');
    expect(content).not.toContain("from './InlineEditable'");
  });

  it('4. ensures ConferenceHero early bird badge has no heavy pill background', () => {
    const content = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/heroes/ConferenceHero.tsx'),
      'utf-8'
    );
    expect(content).not.toContain('bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30');
  });

  it('5. ensures EventGallerySection uses square corners (rounded-none)', () => {
    const content = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/EventGallerySection.tsx'),
      'utf-8'
    );
    expect(content).toContain('rounded-none');
    expect(content).not.toContain('rounded-3xl');
  });

  it('6. ensures EventGallerySection provides balanced 2x2 grid when totalCount is 4', async () => {
    const { getGalleryGridColSpan } = await import('../src/components/LandingPage/EventGallerySection');
    expect(getGalleryGridColSpan(0, 4)).toBe('md:col-span-6');
    expect(getGalleryGridColSpan(1, 4)).toBe('md:col-span-6');
    expect(getGalleryGridColSpan(2, 4)).toBe('md:col-span-6');
    expect(getGalleryGridColSpan(3, 4)).toBe('md:col-span-6');
  });

  it('7. ensures all 12 preset themes have exactly 3 curated gallery photos for Bento harmony', async () => {
    const { THEME_CONFIGS } = await import('../src/services/themeEngine');
    Object.entries(THEME_CONFIGS).forEach(([key, theme]) => {
      expect(theme.galleryPhotos?.length, `Theme ${key} should have 3 gallery photos`).toBe(3);
    });
  });
});
