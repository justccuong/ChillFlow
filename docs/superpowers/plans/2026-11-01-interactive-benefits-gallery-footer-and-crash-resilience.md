# Interactive Benefits, Gallery CMS, Rich Footer & Crash Resilience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `BenefitsSection` to adaptively center and balance cards across 1-4+ items; eliminate the first-load blank whitescreen via MutationObserver and React ErrorBoundary; make `EventGallerySection` fully editable (titles, tags, images); create a rich detailed `EventFooterSection` customized to event metadata; and ensure faithful standalone HTML export.

**Architecture:** 
1. **Dynamic Centered Benefits Layout:** Replace rigid 3-column CSS grid with an adaptive flex-wrap architecture that centers 1, 2, 3, and 4 items without awkward left-aligned gaps.
2. **Cold-Load Blank Screen Elimination:** Update `useScrollReveal` to watch DOM additions via `MutationObserver` so dynamically mounted/lazy components are revealed immediately, backed by a React `ErrorBoundary` fallback.
3. **Gallery Visual CMS:** Add `galleryPhotos` to `GeneratedContent` and Zustand store, allowing click-to-edit titles/tags and image swapping via `ImagePickerModal`.
4. **Rich Event Footer:** Replace barebones 2-line footer with a multi-column, professional event footer featuring event metadata, organizer info, contact hotline/email, navigation anchors, and in-place editing.
5. **Standalone HTML Synchronization:** Ensure `sourceExporter.ts` mirrors all updates in exported HTML.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Zustand, Vitest, Vite.

**Spec / Requirements:**
- User Request 1: Adding benefit cards should center 1 card, center 2 cards, arrange 3 cards, and balance 4 cards smoothly rather than leaving awkward empty columns.
- User Request 2: Fix initial page load whitescreen so the page renders reliably on first load.
- User Request 3: Allow editing gallery images, tags, and titles in the bottom gallery section.
- User Request 4: Expand footer into a detailed, title-based, professional event footer with editable organizer and contact info.
- Constraint: Split every feature into an atomic Git commit ("mỗi feat 1 commit").

## Global Constraints
- Every task MUST conclude with an atomic Git commit.
- Zero TypeScript errors (`npm run build` must pass cleanly).
- Zero linter regressions (`npx oxlint` must report 0 errors).
- All Vitest tests must pass (`npx vitest run`).
- In-place editing must support Undo/Redo (`useLandingPageStore`) and localStorage autosave.

## Review Focus
1. **Benefit Count Edge Cases (1, 2, 3, 4, 5+ items):** Cards must remain centered and visually balanced on both mobile (< 640px) and desktop (>= 1024px).
2. **First-Load Hydration / Lazy Loading:** Components wrapped in `lazy()` or `Suspense` must never stay hidden behind `opacity: 0` if `IntersectionObserver` triggers before mounting.
3. **Gallery Image URL Edits:** Swapping an image URL must update both the live preview and the standalone exported HTML.
4. **Footer Metadata Fallbacks:** If event location, date, or organizer is missing, sensible domain-specific defaults must be displayed without runtime exceptions.
5. **Undo/Redo Consistency:** Editing gallery photos or footer details must register with the store history stack for seamless `Ctrl+Z` / `Ctrl+Y`.

---

### Task 1: Dynamic Centered & Balanced Layout for BenefitsSection

**Files:**
- Modify: `src/components/LandingPage/BenefitsSection.tsx`
- Test: `tests/benefitsLayout.test.ts`

**Interfaces:**
- Input: `displayBenefits: BenefitItem[]` (length 1, 2, 3, 4, 5+)
- Output: Responsive flex container where cards are centered regardless of item count:
  - Count = 1: Single card centered (`max-w-xl mx-auto`).
  - Count = 2: Two cards side-by-side, centered together.
  - Count = 3: Three cards evenly spaced across the row.
  - Count = 4: Two balanced rows of 2 centered cards (`w-full md:w-[calc(50%-1.25rem)] max-w-lg`) or 3 + 1 centered.
  - Count >= 5: Centered flex grid with leftover items auto-centered on the last row.

- [ ] **Step 1: Write unit tests for card layout classes and responsive width logic**
  Create `tests/benefitsLayout.test.ts` testing container and item class generators for counts 1, 2, 3, 4, and 6.
- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run tests/benefitsLayout.test.ts`
  Expected: FAIL (file or function not yet exported).
- [ ] **Step 3: Refactor `BenefitsSection.tsx`**
  Replace rigid `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` with adaptive `flex flex-wrap justify-center gap-8 md:gap-10`.
  Compute responsive width classes per card based on total count so 1 card is centered, 2 cards are centered, 3 cards fill 1 row, and 4 cards form a balanced 2x2 grid.
- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run tests/benefitsLayout.test.ts`
  Expected: PASS.
- [ ] **Step 5: Verify build & lint**
  Run: `npm run build && npx oxlint`
  Expected: 0 errors.
- [ ] **Step 6: Atomic Git Commit**
  ```bash
  git add src/components/LandingPage/BenefitsSection.tsx tests/benefitsLayout.test.ts
  git commit -m "feat(ui): dynamic centered and balanced card layout for BenefitsSection"
  ```

---

### Task 2: Eliminate Initial Blank Whitescreen & Add ErrorBoundary Crash Resilience

**Files:**
- Create: `src/components/common/ErrorBoundary.tsx`
- Modify: `src/hooks/useScrollReveal.ts`
- Modify: `src/index.css`
- Modify: `src/components/LandingPage/LandingPagePreview.tsx`
- Test: `tests/errorBoundary.test.ts`

**Interfaces:**
- `ErrorBoundary`: React Class Component with `componentDidCatch` rendering a graceful recovery UI with a retry button instead of a white screen.
- `useScrollReveal`: Enhanced with `MutationObserver` to automatically observe and reveal dynamically rendered / lazy-loaded DOM elements when they enter the DOM.
- `index.css`: Safe fallback ensuring content becomes visible even if JavaScript observers are delayed.

- [ ] **Step 1: Write test for ErrorBoundary component**
  Create `tests/errorBoundary.test.ts` verifying that throwing children render the recovery fallback UI.
- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run tests/errorBoundary.test.ts`
  Expected: FAIL.
- [ ] **Step 3: Implement `src/components/common/ErrorBoundary.tsx`**
  Create robust ErrorBoundary with error logging, fallback card with "Tải lại trang", and optional reset callback.
- [ ] **Step 4: Enhance `src/hooks/useScrollReveal.ts`**
  Add a `MutationObserver` that monitors child list additions in `document.body`. Whenever elements with `[data-reveal]` are mounted, immediately register them with `IntersectionObserver`.
  Add a safeguard: any `[data-reveal]` element in the top 1200px of the page is immediately given `reveal-active` within 50ms of mount.
- [ ] **Step 5: Wrap `LandingPagePreview.tsx` sections with `ErrorBoundary`**
  Protect `<LandingPagePreview>` and each major suspended section (`HeroSection`, `CategorySection`, etc.) inside `ErrorBoundary`.
- [ ] **Step 6: Run tests and verify**
  Run: `npx vitest run && npm run build`
  Expected: PASS.
- [ ] **Step 7: Atomic Git Commit**
  ```bash
  git add src/components/common/ErrorBoundary.tsx src/hooks/useScrollReveal.ts src/index.css src/components/LandingPage/LandingPagePreview.tsx tests/errorBoundary.test.ts
  git commit -m "fix(resilience): eliminate initial blank screen via MutationObserver scroll reveal and ErrorBoundary"
  ```

---

### Task 3: In-Place Visual CMS Editing for EventGallerySection (Photos, Titles, Tags)

**Files:**
- Modify: `src/types/index.ts`
- Modify: `src/store/useLandingPageStore.ts`
- Modify: `src/components/LandingPage/EventGallerySection.tsx`
- Modify: `src/components/LandingPage/LandingPagePreview.tsx`
- Test: `tests/store.test.ts`

**Interfaces:**
- `GeneratedContent.galleryPhotos?: GalleryPhoto[]`
- Store methods: `updateGalleryPhoto(index, field, val)`, `addGalleryPhoto(photo)`, `removeGalleryPhoto(index)`
- `EventGallerySectionProps`:
  - `photos: GalleryPhoto[]`
  - `isEditMode: boolean`
  - `onUpdatePhoto: (index: number, field: keyof GalleryPhoto, val: string) => void`
  - `onOpenImagePicker: (index: number) => void`
  - `onAddPhoto: () => void`
  - `onRemovePhoto: (index: number) => void`

- [ ] **Step 1: Add store unit tests for gallery photo mutations**
  In `tests/store.test.ts`, add test cases for `updateGalleryPhoto`, `addGalleryPhoto`, `removeGalleryPhoto`.
- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run tests/store.test.ts`
  Expected: FAIL.
- [ ] **Step 3: Update `src/types/index.ts` and `src/store/useLandingPageStore.ts`**
  Add `galleryPhotos?: GalleryPhoto[]` to `GeneratedContent`. Implement `updateGalleryPhoto`, `addGalleryPhoto`, and `removeGalleryPhoto` with undo/redo history tracking.
- [ ] **Step 4: Refactor `EventGallerySection.tsx`**
  - Accept `photos`, `isEditMode`, `onUpdatePhoto`, `onOpenImagePicker`, `onAddPhoto`, `onRemovePhoto`.
  - Wrap `photo.title` and `photo.tag` in `<InlineEditable>`.
  - In `isEditMode`, render an overlay button "Đổi ảnh" (Camera icon) on hover/focus.
  - Add "+ Thêm ảnh vào Gallery" button when `isEditMode` is active.
- [ ] **Step 5: Wire gallery handlers in `LandingPagePreview.tsx`**
  Connect store actions, image picker modal (handling gallery photo index selection), and autosave.
- [ ] **Step 6: Run tests and build**
  Run: `npx vitest run && npm run build`
  Expected: PASS.
- [ ] **Step 7: Atomic Git Commit**
  ```bash
  git add src/types/index.ts src/store/useLandingPageStore.ts src/components/LandingPage/EventGallerySection.tsx src/components/LandingPage/LandingPagePreview.tsx tests/store.test.ts
  git commit -m "feat(cms): enable in-place editing, image swapping and photo management for EventGallerySection"
  ```

---

### Task 4: Rich, Detailed & Editable EventFooterSection

**Files:**
- Create: `src/components/LandingPage/EventFooterSection.tsx`
- Modify: `src/components/LandingPage/LandingPagePreview.tsx`
- Test: `tests/footerSection.test.ts`

**Interfaces:**
- Component `EventFooterSection`:
  - Column 1: Event Name, Event Tagline/Description (in-place editable).
  - Column 2: Event Time & Venue Details (in-place editable).
  - Column 3: Quick Navigation Anchor Links (Về đầu trang, Lợi ích, Diễn giả, Lịch trình, FAQ, Đăng ký vé).
  - Column 4: Organizer Info, Support Email, Hotline (in-place editable).
  - Bottom bar: Copyright, Terms, Privacy Policy.
  - Consumes: `input`, `content`, `theme`, `isEditMode`, `onUpdateInputField`, `onUpdateContentField`.

- [ ] **Step 1: Write test for EventFooterSection**
  Create `tests/footerSection.test.ts` verifying rendering of event metadata, editable nodes, and quick navigation anchors.
- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run tests/footerSection.test.ts`
  Expected: FAIL.
- [ ] **Step 3: Implement `src/components/LandingPage/EventFooterSection.tsx`**
  Build high-conversion, editorial footer with 4 columns, WCAG contrast compliant colors, and `InlineEditable` on all textual fields.
- [ ] **Step 4: Replace inline footer in `LandingPagePreview.tsx`**
  Embed `<EventFooterSection>` at the bottom of the page with edit props wired to store.
- [ ] **Step 5: Run tests and build**
  Run: `npx vitest run tests/footerSection.test.ts && npm run build`
  Expected: PASS.
- [ ] **Step 6: Atomic Git Commit**
  ```bash
  git add src/components/LandingPage/EventFooterSection.tsx src/components/LandingPage/LandingPagePreview.tsx tests/footerSection.test.ts
  git commit -m "feat(footer): add rich detailed EventFooterSection with in-place Visual CMS editing"
  ```

---

### Task 5: Standalone HTML Exporter Synchronization & Full Verification

**Files:**
- Modify: `src/utils/sourceExporter.ts`
- Modify: `tests/sourceExporter.test.ts`

**Interfaces:**
- Exported standalone HTML includes:
  - Dynamic balanced benefits grid.
  - User-edited gallery photos (titles, tags, URLs).
  - Rich detailed event footer (organizer, contact, navigation links, copyright).
  - MutationObserver scroll reveal script.

- [ ] **Step 1: Update unit tests in `tests/sourceExporter.test.ts`**
  Add test assertions for exported gallery photos and rich footer markup in standalone HTML.
- [ ] **Step 2: Update `generateStandaloneHtml` in `src/utils/sourceExporter.ts`**
  Export the updated dynamic gallery section and rich detailed event footer.
- [ ] **Step 3: Run Vitest test suite**
  Run: `npx vitest run`
  Expected: 100% tests PASS.
- [ ] **Step 4: Run linter and production build**
  Run: `npx oxlint && npm run build`
  Expected: 0 errors, clean build.
- [ ] **Step 5: Atomic Git Commit**
  ```bash
  git add src/utils/sourceExporter.ts tests/sourceExporter.test.ts
  git commit -m "fix(exporter): update standalone HTML exporter for rich footer, dynamic gallery, and balanced benefits"
  ```

---

## Plan Review Checklist
- [x] Every feature has its own distinct task and dedicated atomic Git commit ("mỗi feat 1 commit").
- [x] Clear TDD verification steps for all tasks.
- [x] Addresses 100% of the user's 4 raised issues and feedback images.
- [x] Zero breaking changes to existing 12 event archetypes or store undo/redo functionality.
