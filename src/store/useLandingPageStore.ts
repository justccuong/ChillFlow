import { create } from 'zustand';
import { EventInput, GeneratedContent, CROEvaluation, ThemeConfig, BenefitItem, AgendaItem, FaqItem, TestimonialItem, SectionVisibilityConfig, DEFAULT_SECTION_VISIBILITY } from '../types';
import { saveCurrentEventState, getSavedEventState } from '../services/storageService';

interface LandingPageState {
  input: EventInput | null;
  content: GeneratedContent | null;
  croEvaluation: CROEvaluation | null;
  theme: ThemeConfig | null;
  isEditMode: boolean;
  history: GeneratedContent[];
  future: GeneratedContent[];

  // Actions
  setInput: (input: EventInput) => void;
  setContent: (content: GeneratedContent, trackHistory?: boolean) => void;
  updateContentField: (field: keyof GeneratedContent, val: unknown) => void;
  updateInputField: (field: keyof EventInput, val: unknown) => void;

  // Deep Item-level mutations for Visual CMS
  updateBenefitItem: (index: number, field: keyof BenefitItem, val: any) => void;
  addBenefitItem: (item?: BenefitItem) => void;
  removeBenefitItem: (index: number) => void;

  updateAgendaItem: (index: number, field: keyof AgendaItem, val: any) => void;
  addAgendaItem: (item?: AgendaItem) => void;
  removeAgendaItem: (index: number) => void;

  updateFaqItem: (index: number, field: keyof FaqItem, val: any) => void;
  addFaqItem: (item?: FaqItem) => void;
  removeFaqItem: (index: number) => void;
  updateTestimonialItem: (index: number, field: keyof TestimonialItem, val: any) => void;
  addTestimonialItem: (item?: TestimonialItem) => void;
  removeTestimonialItem: (index: number) => void;
  sectionVisibility: SectionVisibilityConfig;
  setSectionVisibility: (config: Partial<SectionVisibilityConfig>) => void;
  toggleSection: (key: keyof SectionVisibilityConfig) => void;
  resetSectionVisibility: () => void;
  setCroEvaluation: (cro: CROEvaluation) => void;
  setTheme: (theme: ThemeConfig) => void;
  toggleEditMode: () => void;
  setEditMode: (enabled: boolean) => void;

  // Undo / Redo
  canUndo: () => boolean;
  canRedo: () => boolean;
  undo: () => boolean;
  redo: () => boolean;

  // Hydration
  initFromStorage: () => void;
  resetAll: () => void;
}

const MAX_HISTORY_LENGTH = 30;

export const useLandingPageStore = create<LandingPageState>((set, get) => ({
  input: null,
  content: null,
  croEvaluation: null,
  theme: null,
  isEditMode: false,
  sectionVisibility: DEFAULT_SECTION_VISIBILITY,
  setSectionVisibility: (config) => set((state) => ({
    sectionVisibility: { ...state.sectionVisibility, ...config }
  })),
  toggleSection: (key) => set((state) => ({
    sectionVisibility: {
      ...state.sectionVisibility,
      [key]: !state.sectionVisibility[key]
    }
  })),
  resetSectionVisibility: () => set({ sectionVisibility: DEFAULT_SECTION_VISIBILITY }),
  history: [],
  future: [],

  setInput: (input) => {
    set({ input });
    const { content, croEvaluation } = get();
    if (content && croEvaluation) {
      saveCurrentEventState(input, content, croEvaluation);
    }
  },

  setContent: (newContent, trackHistory = true) => {
    const { content, history, input, croEvaluation } = get();

    if (trackHistory && content) {
      const nextHistory = [...history, content];
      if (nextHistory.length > MAX_HISTORY_LENGTH) {
        nextHistory.shift();
      }
      set({
        content: newContent,
        history: nextHistory,
        future: [],
      });
    } else {
      set({ content: newContent });
    }

    if (input && croEvaluation) {
      saveCurrentEventState(input, newContent, croEvaluation);
    }
  },

  updateContentField: (field, val) => {
    const { content, setContent } = get();
    if (!content) return;

    const updated = {
      ...content,
      [field]: val,
    };
    setContent(updated, true);
  },

  updateInputField: (field, val) => {
    const { input, content, croEvaluation } = get();
    if (!input) return;
    const updated: EventInput = {
      ...input,
      [field]: val,
    };
    set({ input: updated });
    if (content && croEvaluation) {
      saveCurrentEventState(updated, content, croEvaluation);
    }
  },

  updateBenefitItem: (index, field, val) => {
    const { content, setContent } = get();
    if (!content || !content.benefits[index]) return;
    const newBenefits = [...content.benefits];
    newBenefits[index] = {
      ...newBenefits[index],
      [field]: val,
    };
    setContent({ ...content, benefits: newBenefits }, true);
  },

  addBenefitItem: (item) => {
    const { content, setContent } = get();
    if (!content) return;
    const newItem: BenefitItem = item || {
      title: 'Giá trị nổi bật mới',
      description: 'Mô tả chi tiết quyền lợi hoặc trải nghiệm thực tế nhận được.',
      iconName: 'zap',
    };
    setContent({ ...content, benefits: [...content.benefits, newItem] }, true);
  },

  removeBenefitItem: (index) => {
    const { content, setContent } = get();
    if (!content || content.benefits.length <= 1) return;
    const newBenefits = content.benefits.filter((_, i) => i !== index);
    setContent({ ...content, benefits: newBenefits }, true);
  },

  updateAgendaItem: (index, field, val) => {
    const { content, setContent } = get();
    if (!content || !content.agenda[index]) return;
    const newAgenda = [...content.agenda];
    newAgenda[index] = {
      ...newAgenda[index],
      [field]: val,
    };
    setContent({ ...content, agenda: newAgenda }, true);
  },

  addAgendaItem: (item) => {
    const { content, setContent } = get();
    if (!content) return;
    const newItem: AgendaItem = item || {
      time: '10:00 - 11:30',
      title: 'Phiên thảo luận & Thực hành mới',
      description: 'Nội dung chi tiết hoạt động hoặc bài trình bày tiếp theo.',
      tag: 'Workshop',
    };
    setContent({ ...content, agenda: [...content.agenda, newItem] }, true);
  },

  removeAgendaItem: (index) => {
    const { content, setContent } = get();
    if (!content || content.agenda.length <= 1) return;
    const newAgenda = content.agenda.filter((_, i) => i !== index);
    setContent({ ...content, agenda: newAgenda }, true);
  },

  updateFaqItem: (index, field, val) => {
    const { content, setContent } = get();
    if (!content || !content.faqs[index]) return;
    const newFaqs = [...content.faqs];
    newFaqs[index] = {
      ...newFaqs[index],
      [field]: val,
    };
    setContent({ ...content, faqs: newFaqs }, true);
  },

  addFaqItem: (item) => {
    const { content, setContent } = get();
    if (!content) return;
    const newItem: FaqItem = item || {
      question: 'Câu hỏi thắc mắc mới cần giải đáp?',
      answer: 'Câu trả lời chi tiết và rõ ràng giải tỏa băn khoăn của người tham gia.',
    };
    setContent({ ...content, faqs: [...content.faqs, newItem] }, true);
  },

  removeFaqItem: (index) => {
    const { content, setContent } = get();
    if (!content || content.faqs.length <= 1) return;
    const newFaqs = content.faqs.filter((_, i) => i !== index);
    setContent({ ...content, faqs: newFaqs }, true);
  },
  updateTestimonialItem: (index, field, val) => {
    const { content, setContent } = get();
    if (!content) return;
    const current = content.testimonials ? [...content.testimonials] : [];
    if (!current[index]) return;
    current[index] = { ...current[index], [field]: val };
    setContent({ ...content, testimonials: current }, true);
  },

  addTestimonialItem: (item) => {
    const { content, setContent } = get();
    if (!content) return;
    const current = content.testimonials ? [...content.testimonials] : [];
    const newItem: TestimonialItem = item || {
      name: 'Khách mời tham dự',
      role: 'Chuyên gia / Khách tham dự',
      company: 'Cộng đồng',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      quote: 'Sự kiện được tổ chức chuyên nghiệp, mang lại nhiều trải nghiệm đáng giá và kết nối chất lượng.',
      rating: 5,
    };
    setContent({ ...content, testimonials: [...current, newItem] }, true);
  },

  removeTestimonialItem: (index) => {
    const { content, setContent } = get();
    if (!content || !content.testimonials || content.testimonials.length === 0) return;
    const current = content.testimonials.filter((_, i) => i !== index);
    setContent({ ...content, testimonials: current }, true);
  },


  setCroEvaluation: (croEvaluation) => {
    set({ croEvaluation });
    const { input, content } = get();
    if (input && content) {
      saveCurrentEventState(input, content, croEvaluation);
    }
  },

  setTheme: (theme) => set({ theme }),

  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),

  setEditMode: (enabled) => set({ isEditMode: enabled }),

  canUndo: () => get().history.length > 0,

  canRedo: () => get().future.length > 0,

  undo: () => {
    const { history, content, future, input, croEvaluation } = get();
    if (history.length === 0 || !content) return false;

    const previous = history[history.length - 1];
    const newHistory = history.slice(0, -1);
    const newFuture = [content, ...future];

    set({
      content: previous,
      history: newHistory,
      future: newFuture,
    });

    if (input && croEvaluation) {
      saveCurrentEventState(input, previous, croEvaluation);
    }
    return true;
  },

  redo: () => {
    const { future, content, history, input, croEvaluation } = get();
    if (future.length === 0 || !content) return false;

    const next = future[0];
    const newFuture = future.slice(1);
    const newHistory = [...history, content];

    set({
      content: next,
      history: newHistory,
      future: newFuture,
    });

    if (input && croEvaluation) {
      saveCurrentEventState(input, next, croEvaluation);
    }
    return true;
  },

  initFromStorage: () => {
    const saved = getSavedEventState();
    if (saved.input && saved.content && saved.cro) {
      set({
        input: saved.input,
        content: saved.content,
        croEvaluation: saved.cro,
      });
    }
  },

  resetAll: () => {
    set({
      input: null,
      content: null,
      croEvaluation: null,
      theme: null,
      history: [],
      future: [],
    });
  },
}));
