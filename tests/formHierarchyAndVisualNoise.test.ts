import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Form UX Hierarchy & Visual Noise Reduction', () => {
  const formPath = path.resolve(__dirname, '../src/components/EventInputForm.tsx');
  const content = fs.readFileSync(formPath, 'utf-8');

  it('places eventName, eventDate and location inputs before category selector in the DOM', () => {
    const eventNameIndex = content.indexOf('name="eventName"');
    const categorySelectorIndex = content.indexOf('Category / Theme Selector');
    expect(eventNameIndex).toBeGreaterThan(0);
    expect(categorySelectorIndex).toBeGreaterThan(0);
    // eventName must appear BEFORE the category selector
    expect(eventNameIndex).toBeLessThan(categorySelectorIndex);
  });

  it('tones down header preset buttons to secondary styling without heavy shadow', () => {
    expect(content).not.toContain('bg-indigo-600 text-white border-indigo-500 font-medium shadow-sm');
  });

  it('implements clean select dropdown for categories instead of bulky card grid', () => {
    // Must use select dropdown instead of 6-col card grid
    expect(content).toContain('select');
    expect(content).toContain('id="eventCategory"');
    expect(content).not.toContain('grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6');
  });

  it('does not display heavy purple recommendation banners in category header', () => {
    expect(content).not.toContain('p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-700 dark:text-indigo-300 animate-in fade-in');
  });
});
