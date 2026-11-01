import { describe, it, expect } from 'vitest';
import { getGalleryGridColSpan } from '../src/components/LandingPage/EventGallerySection';

describe('EventGallerySection Bento Grid Span Calculator (getGalleryGridColSpan)', () => {
  it('returns full width md:col-span-12 when there is only 1 photo', () => {
    expect(getGalleryGridColSpan(0, 1)).toBe('md:col-span-12');
  });

  it('returns balanced half width md:col-span-6 when there are 2 photos', () => {
    expect(getGalleryGridColSpan(0, 2)).toBe('md:col-span-6');
    expect(getGalleryGridColSpan(1, 2)).toBe('md:col-span-6');
  });

  it('returns bento span 7 for hero photo and span 5 for side photos when 3+ photos', () => {
    expect(getGalleryGridColSpan(0, 3)).toBe('md:col-span-7');
    expect(getGalleryGridColSpan(1, 3)).toBe('md:col-span-5');
  });
});
