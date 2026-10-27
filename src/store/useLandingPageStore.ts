import { create } from 'zustand';
import { EventInput, GeneratedContent, CROEvaluation, ThemeConfig } from '../types';
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
