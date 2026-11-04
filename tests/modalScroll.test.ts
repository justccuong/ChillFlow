import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Task 4: Mouse wheel scrolling in Template Catalog and Modals with Lenis integration', () => {
  it('ensures TemplateCatalogModal scroll container has data-lenis-prevent attribute', () => {
    const modalContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/TemplateCatalogModal.tsx'),
      'utf-8'
    );
    expect(modalContent).toContain('data-lenis-prevent');
    expect(modalContent).toContain('overscroll-contain');
  });

  it('ensures TemplateCatalogModal pauses and resumes Lenis when opened and closed', () => {
    const modalContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/TemplateCatalogModal.tsx'),
      'utf-8'
    );
    expect(modalContent).toContain('__lenis');
    expect(modalContent).toContain('.stop()');
    expect(modalContent).toContain('.start()');
  });

  it('ensures other large scrollable modals also include data-lenis-prevent for smooth wheel scrolling', () => {
    const attendeeModal = fs.readFileSync(
      path.resolve(__dirname, '../src/components/AttendeeListModal.tsx'),
      'utf-8'
    );
    expect(attendeeModal).toContain('data-lenis-prevent');

    const pricingModal = fs.readFileSync(
      path.resolve(__dirname, '../src/components/PricingModal.tsx'),
      'utf-8'
    );
    expect(pricingModal).toContain('data-lenis-prevent');
  });

  it('ensures MyProjectsModal scroll container has data-lenis-prevent, min-h-0, and Lenis pause/resume', () => {
    const modalContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/MyProjectsModal.tsx'),
      'utf-8'
    );
    expect(modalContent).toContain('data-lenis-prevent');
    expect(modalContent).toContain('overscroll-contain');
    expect(modalContent).toContain('min-h-0');
    expect(modalContent).toContain('__lenis');
    expect(modalContent).toContain('.stop()');
    expect(modalContent).toContain('.start()');
  });
});
