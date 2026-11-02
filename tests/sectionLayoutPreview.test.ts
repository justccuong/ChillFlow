import { describe, it, expect } from 'vitest';
import { getSectionLayoutMetadata } from '../src/components/LandingPage/SectionWireframePreview';

describe('Section Layout Preview & Wireframe Metadata', () => {
  it('returns valid layout options and CRO recommendations for key sections', () => {
    const heroMeta = getSectionLayoutMetadata('hero');
    expect(heroMeta.layouts.length).toBeGreaterThanOrEqual(2);
    expect(heroMeta.layouts[0]).toHaveProperty('wireframeType');
    expect(heroMeta.layouts[0]).toHaveProperty('croTip');

    const agendaMeta = getSectionLayoutMetadata('agenda');
    expect(agendaMeta.layouts.some(l => l.wireframeType === 'timeline')).toBe(true);

    const benefitsMeta = getSectionLayoutMetadata('benefits');
    expect(benefitsMeta.layouts.some(l => l.wireframeType === 'grid-3')).toBe(true);
  });

  it('handles unknown section gracefully with fallback layout', () => {
    const unknownMeta = getSectionLayoutMetadata('unknown_custom_section');
    expect(unknownMeta).toBeDefined();
    expect(unknownMeta.layouts.length).toBeGreaterThanOrEqual(1);
  });
});
