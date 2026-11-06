import { describe, it, expect } from 'vitest';
import { slugify } from '../src/utils/slug';

describe('Task 3: Unified Vietnamese Diacritic Slug Generation', () => {
  it('correctly transliterates Vietnamese accents to ASCII slugs without data loss', () => {
    const eventName = 'Hội thảo Trí tuệ Nhân tạo & Vibe Coding 2026';
    const slug = slugify(eventName);
    expect(slug).toBe('hoi-thao-tri-tue-nhan-tao-vibe-coding-2026');
  });

  it('handles strings with numbers, symbols, and trims hyphens', () => {
    expect(slugify('  Đổi Mới Sáng Tạo (Workshop #1)  ')).toBe('doi-moi-sang-tao-workshop-1');
  });

  it('handles empty string or non-alphanumeric input fallback', () => {
    expect(slugify('')).toBe('event');
    expect(slugify('   ')).toBe('event');
    expect(slugify('!@#$%^&*')).toBe('event');
  });
});
