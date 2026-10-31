import { describe, it, expect, beforeEach } from 'vitest';
import { useLandingPageStore } from '../src/store/useLandingPageStore';
import type { GeneratedContent, EventInput } from '../src/types';

describe('Landing Page Zustand Store Item-Level Mutations (useLandingPageStore.ts)', () => {
  const mockContent: GeneratedContent = {
    headline: 'Tiêu đề gốc',
    alternativeHeadline: 'Tiêu đề phụ',
    subHeadline: 'Mô tả ngắn',
    description: 'Mô tả chi tiết',
    benefits: [
      { title: 'Lợi ích 1', description: 'Chi tiết lợi ích 1', iconName: 'zap' },
      { title: 'Lợi ích 2', description: 'Chi tiết lợi ích 2', iconName: 'target' },
    ],
    agenda: [
      { time: '08:00', title: 'Check-in', description: 'Đón khách' },
      { time: '09:00', title: 'Khai mạc', description: 'Bài phát biểu' },
    ],
    faqs: [
      { question: 'Có ăn trưa không?', answer: 'Có buffet trưa' },
    ],
    earlyBirdBadge: 'Early Bird',
    ctaButtonText: 'Đăng ký ngay',
    tagline: 'Tagline sự kiện',
  };

  const mockInput: EventInput = {
    eventName: 'Sự kiện mẫu 2026',
    category: 'universal-showcase',
    eventDate: '2026-12-01T08:00',
    location: 'Hà Nội',
    speakerName: 'Nguyễn Văn A',
    speakerRole: 'Diễn giả chính',
    speakerBio: 'Tiểu sử diễn giả',
    earlyBirdDiscount: 'Giảm 50%',
    maxCapacity: 200,
  };

  beforeEach(() => {
    useLandingPageStore.getState().resetAll();
    useLandingPageStore.getState().setInput(mockInput);
    useLandingPageStore.getState().setContent(mockContent, false);
  });

  it('updates specific benefit item and enables undo', () => {
    const store = useLandingPageStore.getState();
    store.updateBenefitItem(0, 'title', 'Lợi ích 1 đã sửa');

    const updated = useLandingPageStore.getState().content;
    expect(updated?.benefits[0].title).toBe('Lợi ích 1 đã sửa');
    expect(useLandingPageStore.getState().canUndo()).toBe(true);

    // Undo should restore
    useLandingPageStore.getState().undo();
    expect(useLandingPageStore.getState().content?.benefits[0].title).toBe('Lợi ích 1');
  });

  it('adds and removes benefit items', () => {
    const store = useLandingPageStore.getState();
    store.addBenefitItem();
    expect(useLandingPageStore.getState().content?.benefits.length).toBe(3);

    store.removeBenefitItem(2);
    expect(useLandingPageStore.getState().content?.benefits.length).toBe(2);
  });

  it('updates agenda items, adds and removes milestones', () => {
    const store = useLandingPageStore.getState();
    store.updateAgendaItem(1, 'title', 'Phiên chuyên sâu');
    expect(useLandingPageStore.getState().content?.agenda[1].title).toBe('Phiên chuyên sâu');

    store.addAgendaItem();
    expect(useLandingPageStore.getState().content?.agenda.length).toBe(3);

    store.removeAgendaItem(0);
    expect(useLandingPageStore.getState().content?.agenda.length).toBe(2);
  });

  it('updates FAQ items, adds and removes questions', () => {
    const store = useLandingPageStore.getState();
    store.updateFaqItem(0, 'question', 'Địa điểm gửi xe ở đâu?');
    expect(useLandingPageStore.getState().content?.faqs[0].question).toBe('Địa điểm gửi xe ở đâu?');

    store.addFaqItem();
    expect(useLandingPageStore.getState().content?.faqs.length).toBe(2);

    store.removeFaqItem(1);
    expect(useLandingPageStore.getState().content?.faqs.length).toBe(1);
  });

  it('updates EventInput fields through store', () => {
    const store = useLandingPageStore.getState();
    store.updateInputField('speakerName', 'Dr. Trần Văn B');
    expect(useLandingPageStore.getState().input?.speakerName).toBe('Dr. Trần Văn B');
  });

  it('toggles section visibility and resets to defaults', () => {
    const store = useLandingPageStore.getState();
    expect(store.sectionVisibility.agenda).toBe(true);

    store.toggleSection('agenda');
    expect(useLandingPageStore.getState().sectionVisibility.agenda).toBe(false);

    store.setSectionVisibility({ agenda: true, speaker: false });
    expect(useLandingPageStore.getState().sectionVisibility.agenda).toBe(true);
    expect(useLandingPageStore.getState().sectionVisibility.speaker).toBe(false);

    store.resetSectionVisibility();
    expect(useLandingPageStore.getState().sectionVisibility.speaker).toBe(true);
  });

  it('updates, adds and removes testimonial items', () => {
    const store = useLandingPageStore.getState();
    store.addTestimonialItem({
      name: 'Khách mời VIP',
      role: 'CEO',
      company: 'Tech Startup',
      avatar: 'https://example.com/avatar.jpg',
      quote: 'Sự kiện quá chất lượng!',
      rating: 5,
    });
    expect(useLandingPageStore.getState().content?.testimonials?.length).toBe(1);

    store.updateTestimonialItem(0, 'name', 'Khách mời VIP đã sửa');
    expect(useLandingPageStore.getState().content?.testimonials?.[0].name).toBe('Khách mời VIP đã sửa');

    store.removeTestimonialItem(0);
    expect(useLandingPageStore.getState().content?.testimonials?.length).toBe(0);
  });
});
