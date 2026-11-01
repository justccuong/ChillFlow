import { describe, it, expect } from 'vitest';
import { getBenefitCardWidthClass } from '../src/components/LandingPage/BenefitsSection';

describe('BenefitsSection Adaptive Balanced Layout (getBenefitCardWidthClass)', () => {
  it('returns centered single-card max width for 1 benefit item', () => {
    const widthClass = getBenefitCardWidthClass(1);
    expect(widthClass).toContain('max-w-xl');
    expect(widthClass).toContain('w-full');
  });

  it('returns 2-column centered width for 2 benefit items', () => {
    const widthClass = getBenefitCardWidthClass(2);
    expect(widthClass).toContain('md:w-[calc(50%-1.25rem)]');
    expect(widthClass).toContain('max-w-lg');
  });

  it('returns 3-column row width for 3 benefit items', () => {
    const widthClass = getBenefitCardWidthClass(3);
    expect(widthClass).toContain('lg:w-[calc(33.333%-1.7rem)]');
    expect(widthClass).toContain('max-w-md');
  });

  it('returns 2x2 balanced grid width for 4 benefit items to avoid single leftover card', () => {
    const widthClass = getBenefitCardWidthClass(4);
    expect(widthClass).toContain('md:w-[calc(50%-1.25rem)]');
    expect(widthClass).toContain('max-w-lg');
  });

  it('returns standard 3-column width for 5+ items with flex justify-center', () => {
    const widthClass5 = getBenefitCardWidthClass(5);
    const widthClass6 = getBenefitCardWidthClass(6);
    expect(widthClass5).toContain('lg:w-[calc(33.333%-1.7rem)]');
    expect(widthClass6).toContain('lg:w-[calc(33.333%-1.7rem)]');
  });
});
