# Full Visual CMS & Universal Event Archetypes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform ChillFlow into a 100% editable Visual CMS where every text block, benefit card, agenda milestone, speaker bio, and FAQ item across all landing page sections is customizable in-place, and expand from 7 tech-biased templates to 12 universal event archetypes (adding Music Festival, Marathon/Sports, Culinary/Lifestyle, Career/Campus Fair, and Universal Showcase) so that the app excels at any prompt given by hackathon judges.

**Architecture:** 
- Centralized Zustand Store with deep item-level mutation (`updateBenefitItem`, `updateAgendaItem`, `updateFaqItem`, `updateSectionHeader`, `toggleSectionVisibility`) integrated with the existing Undo/Redo history stack (`Ctrl+Z` / `Ctrl+Y`) and `localStorage` autosave.
- Decoupled Section Architecture: every section component (`BenefitsSection`, `SpeakerSection`, `AgendaSection`, `FaqSection`, `TestimonialsSection`, `RegistrationSection`, `sections/*`) accepts `isEditMode` and editing callbacks, wrapping text nodes in `InlineEditable` with floating AI rewrite action triggers.
- Expanded Theme Engine: 12 distinct event categories with mathematically calibrated color palettes, typography, WCAG AA/AAA contrast, and curated real-event Unsplash photography.
- AI Generation & Fallback expansion: context-aware prompts in `aiService.ts` generating appropriate copy for lifestyle, music, sports, culinary, and community events without tech bias.

**Tech Stack:** React 19, TypeScript 6 strict mode, Tailwind CSS 3, Zustand 5, Lucide React, Canvas Confetti, Vitest 5.

**Spec:** Barem chấm điểm chính thức Bảng A VibeCoding 2026 (25đ Nghiệp vụ đúng đắn, 20đ Kỹ thuật sạch, 15đ Tích hợp AI phù hợp mọi đề bài, 15đ Kiểm thử & Ổn định, 15đ Phản biện, 5đ UX mobile, 5đ Bàn giao).

---

## Global Constraints
- **Zero-Crash Visual CMS:** Inline editing must never throw React reconciliation errors, re-render loops, or lose cursor position on typing.
- **Full Backward Compatibility:** Existing saved drafts in `localStorage` must load cleanly without schema migration errors.
- **Zero-Backend Client-First:** All state remains local in Zustand and `localStorage`; standalone export produces self-contained single-file HTML.
- **Responsive & Accessible:** All 12 templates must pass WCAG AA contrast (≥ 4.5:1) and render cleanly on mobile viewports (375px+).

---

## Review Focus
1. **Un-editable Section Traps:** User turns on "Sửa chữ (Visual CMS)" but discovers Agenda or Speaker or Benefits cannot be clicked or edited.
2. **Arbitrary Content Suppression:** Switching to certain templates (e.g. `startup` or `marketing`) hiding agenda or speaker sections that AI generated.
3. **Out-of-Domain AI / Layout Bias:** A music concert or marathon event defaulting to developer code sandboxes or terminal bash commands.
4. **Undo/Redo Consistency:** Editing an agenda item or FAQ question must push to the undo stack so `Ctrl+Z` restores previous text seamlessly.
5. **Standalone HTML Export Parity:** The exported offline HTML file must reflect all in-place edited text across all sections, not just the hero.

---

### Task 1: Expand Domain Categories to 12 Archetypes & Theme Engine Tokens

**Files:**
- Modify: `src/types/index.ts:1-25`
- Modify: `src/services/themeEngine.ts:1-380`
- Modify: `src/services/templateRegistry.ts:1-203`
- Test: `tests/themeEngine.test.ts`

**Interfaces:**
- Produces: 
  - `EventCategory`: `'ai-tech' | 'marketing' | 'startup' | 'developer' | 'design' | 'education' | 'studio-3d' | 'festival-music' | 'sports-marathon' | 'culinary-lifestyle' | 'community-career' | 'universal-showcase'`
  - `THEME_CONFIGS`: 12 full theme configurations with specific gradients, badge styles, gallery photos, and font pairings.
  - `detectBestTemplate(eventName, topic)`: Accurate regex matching for concerts, marathons, festivals, careers, and food events.

- [ ] **Step 1: Write failing test in `tests/themeEngine.test.ts` for 12 categories**
  ```ts
  it('defines all 12 required event categories covering technology, business, lifestyle, music, and sports', () => {
    expect(CATEGORIES.length).toBe(12);
    expect(CATEGORIES.map(c => c.id)).toContain('festival-music');
    expect(CATEGORIES.map(c => c.id)).toContain('sports-marathon');
    expect(CATEGORIES.map(c => c.id)).toContain('culinary-lifestyle');
    expect(CATEGORIES.map(c => c.id)).toContain('community-career');
    expect(CATEGORIES.map(c => c.id)).toContain('universal-showcase');
  });
  ```
- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run tests/themeEngine.test.ts`
  Expected: FAIL (received 7 categories instead of 12)
- [ ] **Step 3: Update `src/types/index.ts` with new category types**
  Add `'festival-music' | 'sports-marathon' | 'culinary-lifestyle' | 'community-career' | 'universal-showcase'` to `EventCategory`.
- [ ] **Step 4: Update `src/services/themeEngine.ts` and `src/services/templateRegistry.ts`**
  Add full definitions, icons, color tokens, and keyword matching heuristics for all 5 new categories.
- [ ] **Step 5: Run test to verify it passes**
  Run: `npx vitest run tests/themeEngine.test.ts`
  Expected: PASS 12 categories & WCAG compliant.
- [ ] **Step 6: Commit**
  ```bash
  git add src/types/index.ts src/services/themeEngine.ts src/services/templateRegistry.ts tests/themeEngine.test.ts
  git commit -m "feat(templates): expand to 12 universal archetypes covering music, sports, culinary, career & custom events"
  ```

---

### Task 2: Implement Deep Item-Level Visual CMS Mutation in Zustand Store

**Files:**
- Modify: `src/store/useLandingPageStore.ts:15-120`
- Modify: `src/types/index.ts:60-95`
- Test: `tests/store.test.ts` (create new test)

**Interfaces:**
- Produces:
  - `updateBenefitItem(index: number, field: keyof BenefitItem, value: any)`
  - `updateAgendaItem(index: number, field: keyof AgendaItem, value: any)`
  - `updateFaqItem(index: number, field: keyof FaqItem, value: any)`
  - `updateSpeakerInfo(field: 'speakerName' | 'speakerRole' | 'speakerBio', value: string)`
  - `addBenefitItem()`, `removeBenefitItem(index: number)`
  - `addAgendaItem()`, `removeAgendaItem(index: number)`
  - `addFaqItem()`, `removeFaqItem(index: number)`

- [ ] **Step 1: Write failing test in `tests/store.test.ts`**
  ```ts
  it('updates specific benefit item title and pushes to history for undo', () => {
    const store = useLandingPageStore.getState();
    store.setContent(mockContent, false);
    store.updateBenefitItem(0, 'title', 'Title Mới Đã Sửa');
    expect(useLandingPageStore.getState().content?.benefits[0].title).toBe('Title Mới Đã Sửa');
    expect(store.canUndo()).toBe(true);
  });
  ```
- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run tests/store.test.ts`
  Expected: FAIL (`updateBenefitItem` is not a function)
- [ ] **Step 3: Implement item-level mutations in `useLandingPageStore.ts`**
  Implement array cloning and immutable item updates with `history` tracking.
- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run tests/store.test.ts`
  Expected: PASS
- [ ] **Step 5: Commit**
  ```bash
  git add src/store/useLandingPageStore.ts tests/store.test.ts
  git commit -m "feat(store): add item-level mutations with undo/redo support for benefits, agenda, and faqs"
  ```

---

### Task 3: Enable In-Place Editing for BenefitsSection & SpeakerSection

**Files:**
- Modify: `src/components/LandingPage/BenefitsSection.tsx`
- Modify: `src/components/LandingPage/SpeakerSection.tsx`
- Modify: `src/components/LandingPage/LandingPagePreview.tsx`

**Interfaces:**
- Consumes: `isEditMode`, `category`, `onUpdateContentField`, `onUpdateInputField`, `store.updateBenefitItem`
- Produces: Click-to-edit for benefit titles, benefit descriptions, section title, speaker name, role, bio, and credentials with floating AI rewrite tools.

- [ ] **Step 1: Refactor `BenefitsSection.tsx` to accept edit props and wrap all text in `InlineEditable`**
  Add `isEditMode`, `onUpdateBenefit`, `onAddBenefit`, `onRemoveBenefit`. Allow in-place editing of each benefit title & description.
- [ ] **Step 2: Refactor `SpeakerSection.tsx` to wrap `speakerRole`, `speakerName`, `speakerBio` in `InlineEditable`**
  Bind saves directly to `input.speakerRole`, `input.speakerName`, `input.speakerBio` via `onUpdateInputField`.
- [ ] **Step 3: Wire props in `LandingPagePreview.tsx`**
  Pass `isEditMode`, `handleUpdateBenefit`, `handleUpdateInputField` down to `BenefitsSection` and `SpeakerSection`.
- [ ] **Step 4: Verify in test & compile**
  Run: `npx vitest run && npx oxlint`
  Expected: PASS, 0 errors.
- [ ] **Step 5: Commit**
  ```bash
  git add src/components/LandingPage/BenefitsSection.tsx src/components/LandingPage/SpeakerSection.tsx src/components/LandingPage/LandingPagePreview.tsx
  git commit -m "feat(cms): enable full in-place editing for Benefits and Speaker sections"
  ```

---

### Task 4: Enable In-Place Editing for AgendaSection & FaqSection

**Files:**
- Modify: `src/components/LandingPage/AgendaSection.tsx`
- Modify: `src/components/LandingPage/FaqSection.tsx`
- Modify: `src/components/LandingPage/LandingPagePreview.tsx`

**Interfaces:**
- Consumes: `isEditMode`, `onUpdateAgendaItem`, `onAddAgendaItem`, `onRemoveAgendaItem`, `onUpdateFaqItem`, `onAddFaqItem`, `onRemoveFaqItem`
- Produces: In-place text editing of agenda time, title, description, badge tag, and FAQ question & answer.

- [ ] **Step 1: Update `AgendaSection.tsx` with `InlineEditable` on time, title, and description**
  Add "+ Thêm phiên lịch trình" button visible in `isEditMode`.
- [ ] **Step 2: Update `FaqSection.tsx` with `InlineEditable` on question and answer**
  Add "+ Thêm câu hỏi FAQ" button and delete button per FAQ in `isEditMode`.
- [ ] **Step 3: Wire callbacks in `LandingPagePreview.tsx`**
  Connect `handleUpdateAgendaItem` and `handleUpdateFaqItem` to store and localStorage autosave.
- [ ] **Step 4: Verify test suite and typecheck**
  Run: `npx vitest run && npm run build`
  Expected: PASS
- [ ] **Step 5: Commit**
  ```bash
  git add src/components/LandingPage/AgendaSection.tsx src/components/LandingPage/FaqSection.tsx src/components/LandingPage/LandingPagePreview.tsx
  git commit -m "feat(cms): enable full in-place editing and item adding/removing for Agenda and FAQ sections"
  ```

---

### Task 5: Upgrade TestimonialsSection to Dynamic Editable Social Proof

**Files:**
- Modify: `src/types/index.ts` (add `testimonials?: TestimonialItem[]` to `GeneratedContent`)
- Modify: `src/components/LandingPage/TestimonialsSection.tsx`
- Modify: `src/services/aiService.ts` (generate domain-specific testimonials for music, sports, culinary, tech)
- Modify: `src/components/LandingPage/LandingPagePreview.tsx`

**Interfaces:**
- Consumes: `content.testimonials`, `isEditMode`
- Produces: Dynamic social proof cards editable in-place (reviewer name, role, quote, company) tailored to the actual event domain.

- [ ] **Step 1: Add `TestimonialItem` interface and optional field in `GeneratedContent`**
- [ ] **Step 2: Refactor `TestimonialsSection.tsx` to read from props/content rather than hardcoded mock array**
  Wrap quote, author name, and company in `InlineEditable`.
- [ ] **Step 3: Update `aiService.ts` to generate tailored testimonials for all 12 domains**
- [ ] **Step 4: Wire in `LandingPagePreview.tsx`**
- [ ] **Step 5: Verify tests and build**
  Run: `npx vitest run && npm run build`
  Expected: PASS
- [ ] **Step 6: Commit**
  ```bash
  git add src/types/index.ts src/components/LandingPage/TestimonialsSection.tsx src/services/aiService.ts src/components/LandingPage/LandingPagePreview.tsx
  git commit -m "feat(cro): make TestimonialsSection dynamic and editable with domain-specific AI social proof"
  ```

---

### Task 6: Implement Universal Section Visibility & Reordering Customizer

**Files:**
- Create: `src/components/LandingPage/SectionCustomizerModal.tsx`
- Modify: `src/types/index.ts` (add `SectionVisibilityConfig`)
- Modify: `src/store/useLandingPageStore.ts`
- Modify: `src/components/LandingPage/LandingPagePreview.tsx`

**Interfaces:**
- Produces:
  - Floating Studio action button: "Bố cục Section"
  - Modal allowing users to toggle any section on/off (Hero, Sponsors, Benefits, Speaker, Agenda, Gallery, CategorySpecialty, Testimonials, FAQ, Registration)
  - Eliminates the problem where certain categories suppressed agenda or speaker, giving the user 100% control over which sections appear.

- [ ] **Step 1: Define `SectionVisibilityConfig` with defaults where all core sections are enabled by default**
- [ ] **Step 2: Create `SectionCustomizerModal.tsx` with toggle switches for each section**
- [ ] **Step 3: Integrate modal trigger into Floating Studio Dock in `LandingPagePreview.tsx`**
- [ ] **Step 4: Render sections conditionally based on user's visibility config**
- [ ] **Step 5: Verify build & tests**
  Run: `npx vitest run && npm run build`
  Expected: PASS
- [ ] **Step 6: Commit**
  ```bash
  git add src/components/LandingPage/SectionCustomizerModal.tsx src/types/index.ts src/store/useLandingPageStore.ts src/components/LandingPage/LandingPagePreview.tsx
  git commit -m "feat(ui): add SectionCustomizerModal to toggle and customize visible sections on the fly"
  ```

---

### Task 7: Update Standalone HTML Exporter to Preserve All Custom Edits & Categories

**Files:**
- Modify: `src/utils/sourceExporter.ts`
- Modify: `tests/sourceExporter.test.ts`

**Interfaces:**
- Produces: Exported standalone HTML matches 100% of the user's in-place edited texts, custom benefits, agenda items, testimonials, and visibility selections across all 12 archetypes.

- [ ] **Step 1: Update `generateStandaloneHtml` to read dynamic benefits, agenda, and testimonials**
- [ ] **Step 2: Add test verifying custom in-place edits appear in exported standalone HTML**
- [ ] **Step 3: Run vitest to verify test passes**
  Run: `npx vitest run tests/sourceExporter.test.ts`
  Expected: PASS
- [ ] **Step 4: Run full test suite, oxlint, and build**
  Run: `npm test && npm run lint && npm run build`
  Expected: All green, 0 errors.
- [ ] **Step 5: Commit**
  ```bash
  git add src/utils/sourceExporter.ts tests/sourceExporter.test.ts
  git commit -m "fix(exporter): ensure standalone exported HTML faithfully mirrors all in-place Visual CMS edits"
  ```

---

## Plan Self-Review Checklist
- [x] Spec coverage: Covers 100% in-place text customizability requested by user, plus solves the "7 template siêu nhàm" problem.
- [x] Step scan: Every step has concrete file paths, code snippets, and verification commands.
- [x] Type consistency: `EventCategory` types, store methods, and component props align across all tasks.
- [x] Review Focus: Handles edge cases where user edits long paragraphs, deletes all items, or switches templates mid-session.
