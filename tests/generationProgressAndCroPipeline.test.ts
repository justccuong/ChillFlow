import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Generation Progress Stepper & Studio Dock CRO Removal', () => {
  it('creates GenerationProgressModal with 4 clear progress phases', () => {
    const modalPath = path.resolve(__dirname, '../src/components/GenerationProgressModal.tsx');
    expect(fs.existsSync(modalPath)).toBe(true);
    const content = fs.readFileSync(modalPath, 'utf-8');
    expect(content).toContain('CRO');
    expect(content).toContain('Phân tích');
    expect(content).toContain('Tối ưu');
    expect(content).toContain('Template');
  });

  it('ensures Studio Dock in LandingPagePreview no longer has CRO button or CRO drawer', () => {
    const previewContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/LandingPagePreview.tsx'),
      'utf-8'
    );
    expect(previewContent).not.toContain('Xem phân tích CRO chi tiết');
    expect(previewContent).not.toContain('showCRODrawer');
  });

  it('ensures App.tsx includes GenerationProgressModal during loading', () => {
    const appContent = fs.readFileSync(
      path.resolve(__dirname, '../src/App.tsx'),
      'utf-8'
    );
    expect(appContent).toContain('GenerationProgressModal');
  });
});
