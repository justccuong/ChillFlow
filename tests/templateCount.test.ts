import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { TEMPLATE_LIBRARY } from '../src/services/templateRegistry';

describe('Task 3: Template Count & Labels (12 instead of 7)', () => {
  it('confirms TEMPLATE_LIBRARY has exactly 12 templates', () => {
    expect(TEMPLATE_LIBRARY.length).toBe(12);
  });

  it('ensures LandingPagePreview references 12 templates and not 7', () => {
    const previewContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/LandingPagePreview.tsx'),
      'utf-8'
    );
    expect(previewContent).not.toContain('Kho 7 Templates');
    expect(previewContent).toContain('Kho 12 Templates');
  });

  it('ensures TemplateCatalogModal reflects the 12 templates in comments and copy', () => {
    const modalContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/TemplateCatalogModal.tsx'),
      'utf-8'
    );
    expect(modalContent).not.toContain('6 Standard Archetypes');
    expect(modalContent).toContain('11 Archetypes');
  });

  it('ensures HeroSection reflects 12 archetypes in comments', () => {
    const heroContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/HeroSection.tsx'),
      'utf-8'
    );
    expect(heroContent).not.toContain('the 7 Hero Archetypes');
    expect(heroContent).toContain('the 12 Hero Archetypes');
  });
});
