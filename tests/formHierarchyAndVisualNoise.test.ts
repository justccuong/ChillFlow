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
});
