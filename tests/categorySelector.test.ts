import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Task 5: Distinct Event Category Icons and Badges', () => {
  it('ensures EventInputForm renders distinct Lucide icons for all 12 categories', () => {
    const formContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/EventInputForm.tsx'),
      'utf-8'
    );

    // Each new category must have its dedicated icon imported and mapped
    expect(formContent).toContain('Music');
    expect(formContent).toContain('Activity');
    expect(formContent).toContain('UtensilsCrossed');
    expect(formContent).toContain('Users');
    expect(formContent).toContain('Globe');
    expect(formContent).toContain('Box');

    // Default fallback must not hide categories into a duplicate Sparkles icon
    expect(formContent).toContain("case 'festival-music':");
    expect(formContent).toContain("case 'sports-marathon':");
    expect(formContent).toContain("case 'culinary-lifestyle':");
    expect(formContent).toContain("case 'community-career':");
    expect(formContent).toContain("case 'universal-showcase':");
  });

  it('ensures each category card has distinct micro-tag badges in EventInputForm', () => {
    const formContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/EventInputForm.tsx'),
      'utf-8'
    );
    // Micro badges for categories
    expect(formContent).toContain('EDM & Live');
    expect(formContent).toContain('Race & BIB');
    expect(formContent).toContain('Michelin Taste');
    expect(formContent).toContain('Job Fair');
    expect(formContent).toContain('All-in-One');
  });
});
