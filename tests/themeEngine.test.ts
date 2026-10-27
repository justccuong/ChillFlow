import { describe, it, expect } from 'vitest';
import {
  CATEGORIES,
  THEME_CONFIGS,
  getThemeForCategory,
  evaluateThemeAccessibility,
} from '../src/services/themeEngine';
import type { EventCategory } from '../src/types';

describe('Theme Engine (themeEngine.ts)', () => {
  it('defines all 7 required event categories', () => {
    expect(CATEGORIES.length).toBe(7);
    const categoryIds = CATEGORIES.map((c) => c.id);
    expect(categoryIds).toEqual([
      'ai-tech',
      'marketing',
      'startup',
      'developer',
      'design',
      'education',
      'studio-3d',
    ]);
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

  it('returns valid theme for a known category', () => {
    const devTheme = getThemeForCategory('developer');
    expect(devTheme.id).toBe('developer');
    expect(devTheme.layout).toBe('terminal');
  });

  it('falls back to ai-tech when category is undefined or invalid', () => {
    const fallbackTheme = getThemeForCategory(undefined);
    expect(fallbackTheme.id).toBe('ai-tech');
    expect(fallbackTheme.layout).toBe('conference');

    const invalidTheme = getThemeForCategory('non-existent' as EventCategory);
    expect(invalidTheme.id).toBe('ai-tech');
  });

  it('evaluates theme accessibility and verifies WCAG contrast compliance', () => {
    const cyberTheme = getThemeForCategory('ai-tech');
    const audit = evaluateThemeAccessibility(cyberTheme);

    expect(audit.isCompliant).toBe(true);
    expect(audit.contrastRatio).toBeGreaterThanOrEqual(7.0);
    expect(['AAA', 'AA']).toContain(audit.wcagLevel);
    expect(audit.score).toBeGreaterThanOrEqual(90);
  });
});
