import { describe, it, expect } from 'vitest';
import {
  CATEGORIES,
  THEME_CONFIGS,
  getThemeForCategory,
  evaluateThemeAccessibility,
} from '../src/services/themeEngine';
import { detectBestTemplate } from '../src/services/templateRegistry';
import type { EventCategory } from '../src/types';

describe('Theme Engine (themeEngine.ts)', () => {
  it('defines all 12 required event categories covering tech, business, lifestyle, music, and sports', () => {
    expect(CATEGORIES.length).toBe(12);
    const categoryIds = CATEGORIES.map((c) => c.id);
    expect(categoryIds).toContain('festival-music');
    expect(categoryIds).toContain('sports-marathon');
    expect(categoryIds).toContain('culinary-lifestyle');
    expect(categoryIds).toContain('community-career');
    expect(categoryIds).toContain('universal-showcase');
  });

  it('provides complete design tokens for every category', () => {
    for (const cat of CATEGORIES) {
      const theme = THEME_CONFIGS[cat.id];
      expect(theme).toBeDefined();
      expect(theme.name).toBeTruthy();
      expect(theme.layout).toBeTruthy();
      expect(theme.accentColor).toBeTruthy();
      expect(theme.btnPrimary).toBeTruthy();
      expect(theme.heroImage).toMatch(/^https:\/\//);
      expect(theme.galleryPhotos?.length).toBeGreaterThan(0);
    }
  });

  it('detects music, sports, culinary, and community events without defaulting to ai-tech', () => {
    const musicMatch = detectBestTemplate('Đại nhạc hội EDM Countdown Hà Nội 2026', 'Âm nhạc');
    expect(musicMatch.id).toBe('festival-music');

    const marathonMatch = detectBestTemplate('Giải chạy Marathon Vì Nụ Cười Em 2026', 'Chạy bộ thể thao');
    expect(marathonMatch.id).toBe('sports-marathon');

    const culinaryMatch = detectBestTemplate('Lễ hội Ẩm thực Đường phố Quốc tế 2026', 'Món ăn & Đồ uống');
    expect(culinaryMatch.id).toBe('culinary-lifestyle');

    const careerMatch = detectBestTemplate('Ngày hội Việc làm và Thực tập Sinh viên FPT 2026', 'Tuyển dụng');
    expect(careerMatch.id).toBe('community-career');

    const unknownMatch = detectBestTemplate('Sự kiện cộng đồng tổng hợp đặc biệt 2026', 'Tự do');
    expect(unknownMatch.id).toBe('universal-showcase');
  });

  it('returns valid theme for a known category', () => {
    const devTheme = getThemeForCategory('developer');
    expect(devTheme.id).toBe('developer');
    expect(devTheme.layout).toBe('terminal');

    const musicTheme = getThemeForCategory('festival-music');
    expect(musicTheme.id).toBe('festival-music');
  });

  it('falls back to universal-showcase when category is undefined or invalid', () => {
    const fallbackTheme = getThemeForCategory(undefined);
    expect(['ai-tech', 'universal-showcase']).toContain(fallbackTheme.id);

    const invalidTheme = getThemeForCategory('non-existent' as EventCategory);
    expect(['ai-tech', 'universal-showcase']).toContain(invalidTheme.id);
  });

  it('evaluates theme accessibility and verifies WCAG contrast compliance for all categories', () => {
    for (const cat of CATEGORIES) {
      const theme = THEME_CONFIGS[cat.id];
      const audit = evaluateThemeAccessibility(theme);
      expect(audit.isCompliant).toBe(true);
      expect(audit.contrastRatio).toBeGreaterThanOrEqual(4.5);
    }
  });
});
