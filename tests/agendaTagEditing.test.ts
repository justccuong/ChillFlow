import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { useLandingPageStore } from '../src/store/useLandingPageStore';

describe('Task 7: Editable Timeline / Agenda Session Tags', () => {
  it('ensures AgendaItem type definition in types/index.ts includes optional tag', () => {
    const typesContent = fs.readFileSync(
      path.resolve(__dirname, '../src/types/index.ts'),
      'utf-8'
    );
    expect(typesContent).toMatch(/interface AgendaItem\s*\{[\s\S]*?tag\?: string;/);
  });

  it('allows updating agenda item tag in useLandingPageStore with undo support', () => {
    const store = useLandingPageStore.getState();
    store.setContent({
      matchedTemplateId: 'ai-tech',
      headline: 'Test Headline',
      alternativeHeadline: 'Alt Headline',
      subHeadline: 'Sub Headline',
      description: 'Desc',
      tagline: 'Tagline',
      ctaButtonText: 'Register',
      earlyBirdBadge: 'Early Bird',
      benefits: [],
      agenda: [
        { time: '09:00', title: 'Welcome', description: 'Opening session', tag: 'CHECK-IN' },
      ],
      faqs: [],
      testimonials: [],
    }, false);

    expect(useLandingPageStore.getState().content?.agenda[0].tag).toBe('CHECK-IN');

    // Update tag
    useLandingPageStore.getState().updateAgendaItem(0, 'tag', 'VIP WELCOME & NETWORKING');
    expect(useLandingPageStore.getState().content?.agenda[0].tag).toBe('VIP WELCOME & NETWORKING');

    // Undo restores original tag
    useLandingPageStore.getState().undo();
    expect(useLandingPageStore.getState().content?.agenda[0].tag).toBe('CHECK-IN');
  });

  it('ensures AgendaSection wraps the session badge in InlineEditable for tag editing', () => {
    const agendaSectionContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/AgendaSection.tsx'),
      'utf-8'
    );
    expect(agendaSectionContent).toContain("onUpdateAgendaItem?.(index, 'tag'");
    expect(agendaSectionContent).toContain('item.tag || badge.label');
  });
});
