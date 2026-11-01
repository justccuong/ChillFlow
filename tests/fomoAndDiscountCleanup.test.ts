import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Task 1: Sticky FOMO bar & Discount code cleanup', () => {
  it('ensures StickyFomoBar is removed from LandingPagePreview', () => {
    const previewContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/LandingPagePreview.tsx'),
      'utf-8'
    );
    expect(previewContent).not.toContain('<StickyFomoBar');
    expect(previewContent).not.toContain('StickyFomoBar');
  });

  it('ensures StickyFomoBar is removed from PublicStandalonePage', () => {
    const standaloneContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/PublicStandalonePage.tsx'),
      'utf-8'
    );
    expect(standaloneContent).not.toContain('<StickyFomoBar');
    expect(standaloneContent).not.toContain('StickyFomoBar');
  });

  it('ensures ExitIntentModal coupon popup is removed from LandingPagePreview and PublicStandalonePage', () => {
    const previewContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/LandingPagePreview.tsx'),
      'utf-8'
    );
    expect(previewContent).not.toContain('<ExitIntentModal');

    const standaloneContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/PublicStandalonePage.tsx'),
      'utf-8'
    );
    expect(standaloneContent).not.toContain('<ExitIntentModal');
  });

  it('ensures the noisy 56-ticket promotional preset in aiService is cleaned up', () => {
    const aiContent = fs.readFileSync(
      path.resolve(__dirname, '../src/services/aiService.ts'),
      'utf-8'
    );
    expect(aiContent).not.toContain('Chỉ còn 56 vé giá ưu đãi');
    expect(aiContent).not.toContain('Giảm 50% vé Studio Pass VIP');
  });

  it('ensures the early bird discount code input field is removed from EventInputForm', () => {
    const formContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/EventInputForm.tsx'),
      'utf-8'
    );
    expect(formContent).not.toContain('id="earlyBirdDiscount"');
  });
});
