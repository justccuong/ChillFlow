# Event Landing Page Fixes & Visual CMS Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve 10 critical user experience, visual styling, Visual CMS inline editing, and AI generation issues across the event landing page generator in small, atomic, verified commits.

**Architecture:**
1. **Urgency & Promo Clutter Elimination:** Remove `StickyFomoBar` and exit-intent discount popup, streamlining the conversion funnel.
2. **Vector Icon Fidelity:** Replace hand-typed Unicode emojis (`🛡️`, etc.) in the footer with crisp Lucide SVG icons.
3. **Template Library Scale (12 Archetypes):** Update catalog counts from 7 to 12 across headers, dock pills, and modal badges.
4. **Modal Wheel Scroll Restoration:** Add `data-lenis-prevent` and pause window Lenis during modal open states to enable effortless mouse wheel scrolling in `TemplateCatalogModal`.
5. **Thematic Category Differentiation:** Assign unique Lucide icons, distinct accent colors, and themed micro-badges to all 12 categories in `EventInputForm`.
6. **Minimalist Spatial Core 3D:** Strip borders, tags, and instructions from `CinematicStudioHero` 3D canvas; center the core and decelerate scroll-driven rotation physics.
7. **Timeline Tag CMS:** Extend `AgendaItem` schema with editable `tag?: string` and wrap timeline phase badges in `InlineEditable`.
8. **Comprehensive Visual CMS Coverage:** Wrap text in all specialty sections (`AcademySyllabus`, `CinematicShowcase`, `CreativeMasonry`, `MarketingBeforeAfter`, `MasterclassStats`, `StartupPitchingRoster`, `TerminalCode`, `Registration`) in `InlineEditable`.
9. **Diverse Domain AI & Smart Fallbacks:** Implement custom, domain-specific headlines, benefits, agendas, and FAQs for categories beyond academic (`festival-music`, `sports-marathon`, `culinary-lifestyle`, `community-career`, `universal-showcase`).
10. **Automated 2-Stage CRO Optimization:** Merge initial generation and CRO optimization into a single automated pipeline so the user lands directly on a high-scoring CRO page without manual clicks.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Lenis Smooth Scroll, Canvas 3D (Double-Buffered WebGL/2D), Zustand, Vitest, Vite.

**Spec / Requirements Reference:**
- Requirement 1: Template catalog cannot be scrolled with mouse wheel; templates from academic onwards have duplicate AI copy.
- Requirement 2: Template catalog count is 12, not 7.
- Requirement 3: In Visual CMS edit mode, some sections cannot be edited because tags/text are not wrapped.
- Requirement 4: CRO optimization should run automatically on initial page creation (generate -> analyze -> auto-optimize 2nd pass) with no manual button click required.
- Requirement 5: Remove discount code / voucher popups and promo clutter.
- Requirement 6: Agenda/timeline phase tags should be editable.
- Requirement 7: Category selector items look too similar; give each a distinct visual identity and icon.
- Requirement 8: Spatial Core template should remove outer borders, badges, instructions, leave only the core centered, and rotate slower on scroll.
- Requirement 9: Remove the "Giảm 50% vé studio pass vip + tặng bộ 3d asset kit..." sticky bar completely.
- Requirement 10: Replace manual hand-typed icons in footer with vector icons.

## Global Constraints
- Every task MUST conclude with an atomic Git commit.
- Zero TypeScript errors (`npm run build` must pass cleanly).
- Zero linter regressions (`npm run lint` / `oxlint` must report 0 errors).
- All Vitest tests must pass (`npm test`).
- Inline edits must integrate with `useLandingPageStore` Undo/Redo (`Ctrl+Z` / `Ctrl+Y`) and local persistence.

## Review Focus
1. **Modal Wheel Scroll with Lenis:** When `TemplateCatalogModal` is open, mouse wheel scrolling must move the modal's list smoothly without scrolling the background page.
2. **Specialty Section Edit Mode:** When `isEditMode = true`, clicking titles or descriptions in specialty sections must activate inline text inputs, and saving must update the live preview.
3. **Automated CRO Generation:** Submitting `EventInputForm` must produce a page with `cro.totalScore >= 90` and `isAlreadyOptimized = true` automatically.
4. **Spatial Core 3D Responsiveness:** In `CinematicStudioHero`, the 3D core must remain centered on mobile and desktop with zero borders or header pills, rotating smoothly on wheel and scroll.
5. **Domain Fallback Diversity:** Generating a `festival-music` or `sports-marathon` event without an API key must return music/marathon specific copy, not academic or workshop copy.

---

### Task 1: Remove Sticky FOMO Bar and Exit-Intent Discount Popup (Req 5 & 9)

**Files:**
- Modify: `ChillFlow_Repo/src/components/LandingPage/LandingPagePreview.tsx:360-375`
- Modify: `ChillFlow_Repo/src/components/LandingPage/PublicStandalonePage.tsx:70-80`
- Modify: `ChillFlow_Repo/src/components/EventInputForm.tsx:300-320`
- Modify: `ChillFlow_Repo/src/services/aiService.ts:220-230`
- Create: `ChillFlow_Repo/tests/fomoAndDiscountCleanup.test.ts`

**Interfaces:**
- Consumes: `LandingPagePreviewProps`
- Produces: Cleaned preview without `StickyFomoBar` and without exit-intent coupon code modal.

- [ ] **Step 1: Write the failing test**
  Create `tests/fomoAndDiscountCleanup.test.ts` asserting that `StickyFomoBar` is not rendered in preview, `ExitIntentModal` is removed from active rendering, and presets don't inject the noisy VIP 56-ticket promo string.

- [ ] **Step 2: Run test to verify it fails**
  Run: `cd ChillFlow_Repo; npx vitest run tests/fomoAndDiscountCleanup.test.ts`
  Expected: FAIL.

- [ ] **Step 3: Implement changes**
  - In `LandingPagePreview.tsx`: Remove `<StickyFomoBar ... />` and `<ExitIntentModal ... />`.
  - In `PublicStandalonePage.tsx`: Remove `<StickyFomoBar ... />` and `<ExitIntentModal ... />`.
  - In `EventInputForm.tsx`: Remove or comment out the early bird discount code input field.
  - In `aiService.ts`: Replace the long noisy string in `PRESETS` (`'Giảm 50% vé Studio Pass VIP...'`) with clean professional early bird text.

- [ ] **Step 4: Run test to verify it passes**
  Run: `cd ChillFlow_Repo; npx vitest run tests/fomoAndDiscountCleanup.test.ts`
  Expected: PASS.

- [ ] **Step 5: Verify build & lint**
  Run: `cd ChillFlow_Repo; npm run lint; npm run build`
  Expected: 0 errors.

- [ ] **Step 6: Commit**
  ```bash
  git add src/components/LandingPage/LandingPagePreview.tsx src/components/LandingPage/PublicStandalonePage.tsx src/components/EventInputForm.tsx src/services/aiService.ts tests/fomoAndDiscountCleanup.test.ts
  git commit -m "refactor(ui): remove sticky fomo bar and exit intent discount code popup"
  ```

---

### Task 2: Replace Manual Unicode Emojis in Footer with Vector Lucide Icons (Req 10)

**Files:**
- Modify: `ChillFlow_Repo/src/components/LandingPage/EventFooterSection.tsx:205-212`
- Modify: `ChillFlow_Repo/src/utils/sourceExporter.ts:298-318`
- Test: `ChillFlow_Repo/tests/footerSection.test.ts`

**Interfaces:**
- Consumes: `EventFooterSectionProps`
- Produces: Professional footer free of hand-typed Unicode emojis (`🛡️`, `📅`, `📍`, `👤`, `📧`, `📞`).

- [ ] **Step 1: Write the failing test**
  Update `tests/footerSection.test.ts` to assert that `EventFooterSection` and `sourceExporter.ts` contain no raw Unicode emojis (`🛡`, `📅`, `📍`, `👤`, `📧`, `📞`) and render SVG icons or clean semantic typography.

- [ ] **Step 2: Run test to verify it fails**
  Run: `cd ChillFlow_Repo; npx vitest run tests/footerSection.test.ts`
  Expected: FAIL (emojis detected).

- [ ] **Step 3: Implement vector icons in footer**
  - In `EventFooterSection.tsx`: Replace `🛡️` with `<ShieldCheck className="w-4 h-4 text-emerald-500 inline mr-1.5 shrink-0" />`.
  - In `sourceExporter.ts`: Replace `📅`, `📍`, `👤`, `📧`, `📞` with SVG icon spans or clean styled badges.

- [ ] **Step 4: Run test to verify it passes**
  Run: `cd ChillFlow_Repo; npx vitest run tests/footerSection.test.ts`
  Expected: PASS.

- [ ] **Step 5: Commit**
  ```bash
  git add src/components/LandingPage/EventFooterSection.tsx src/utils/sourceExporter.ts tests/footerSection.test.ts
  git commit -m "fix(footer): replace manual unicode emojis with vector lucide icons"
  ```

---

### Task 3: Update Template Catalog Count from 7 to 12 Across UI & Modals (Req 2)

**Files:**
- Modify: `ChillFlow_Repo/src/components/LandingPage/LandingPagePreview.tsx:380-390, 405-415`
- Modify: `ChillFlow_Repo/src/components/TemplateCatalogModal.tsx:35-45, 75-80`
- Modify: `ChillFlow_Repo/src/components/LandingPage/HeroSection.tsx:6-15`
- Create: `ChillFlow_Repo/tests/templateCount.test.ts`

**Interfaces:**
- Consumes: `TEMPLATE_LIBRARY` (length = 12)
- Produces: UI labels and badges displaying "Kho 12 Templates Sự Kiện" accurately.

- [ ] **Step 1: Write the failing test**
  Create `tests/templateCount.test.ts` verifying that `TEMPLATE_LIBRARY` contains 12 definitions and that UI strings in `LandingPagePreview` and `TemplateCatalogModal` reference "12 Templates" instead of "7".

- [ ] **Step 2: Run test to verify it fails**
  Run: `cd ChillFlow_Repo; npx vitest run tests/templateCount.test.ts`
  Expected: FAIL.

- [ ] **Step 3: Implement label and count updates**
  - In `LandingPagePreview.tsx`: Change "Kho 7 Templates Sự Kiện" to "Kho 12 Templates Sự Kiện" in top banner and floating dock button.
  - In `TemplateCatalogModal.tsx`: Update header and subtitles to reflect 12 distinct archetypes.
  - In `HeroSection.tsx`: Update comment from 7 to 12 archetypes.

- [ ] **Step 4: Run test to verify it passes**
  Run: `cd ChillFlow_Repo; npx vitest run tests/templateCount.test.ts`
  Expected: PASS.

- [ ] **Step 5: Commit**
  ```bash
  git add src/components/LandingPage/LandingPagePreview.tsx src/components/TemplateCatalogModal.tsx src/components/LandingPage/HeroSection.tsx tests/templateCount.test.ts
  git commit -m "fix(catalog): update template catalog count and labels from 7 to 12"
  ```

---

### Task 4: Restore Mouse Wheel Scrolling in Template Catalog Modal (Req 1 Part A)

**Files:**
- Modify: `ChillFlow_Repo/src/components/TemplateCatalogModal.tsx:25-40, 70-80`
- Modify: `ChillFlow_Repo/src/hooks/useSmoothScroll.ts:45-60`
- Create: `ChillFlow_Repo/tests/modalScroll.test.ts`

**Interfaces:**
- Consumes: Window Lenis instance `(window as any).__lenis`
- Produces: Fully scrollable modal container responsive to mouse wheel events without scroll locking.

- [ ] **Step 1: Write the failing test**
  Create `tests/modalScroll.test.ts` verifying that modal containers include `data-lenis-prevent` and `overscroll-contain`, and that Lenis pause/resume hook works when modals open/close.

- [ ] **Step 2: Run test to verify it fails**
  Run: `cd ChillFlow_Repo; npx vitest run tests/modalScroll.test.ts`
  Expected: FAIL.

- [ ] **Step 3: Implement Lenis bypass for modals**
  - In `TemplateCatalogModal.tsx`:
    - Add `data-lenis-prevent` to the modal container and scroll area.
    - Add `useEffect` on `isOpen`: when `isOpen = true`, invoke `(window as any).__lenis?.stop()`; when closed, invoke `(window as any).__lenis?.start()`.
    - Ensure container has `overflow-y-auto overscroll-contain`.
  - In other modals (`AttendeeListModal`, `PricingModal`, `ImagePickerModal`): ensure `data-lenis-prevent` is present.

- [ ] **Step 4: Run test to verify it passes**
  Run: `cd ChillFlow_Repo; npx vitest run tests/modalScroll.test.ts`
  Expected: PASS.

- [ ] **Step 5: Commit**
  ```bash
  git add src/components/TemplateCatalogModal.tsx src/hooks/useSmoothScroll.ts tests/modalScroll.test.ts
  git commit -m "fix(modal): restore mouse wheel scrolling in template catalog modal with lenis bypass"
  ```

---

### Task 5: Redesign Event Category Selector with Thematic Icons & Micro-Badges (Req 7)

**Files:**
- Modify: `ChillFlow_Repo/src/components/EventInputForm.tsx:8-40, 175-215`
- Modify: `ChillFlow_Repo/src/services/themeEngine.ts:4-77`
- Create: `ChillFlow_Repo/tests/categorySelector.test.ts`

**Interfaces:**
- Consumes: `CATEGORIES` list of 12 categories
- Produces: 12 distinct cards with category-specific icons, colors, and badge tags.

- [ ] **Step 1: Write the failing test**
  Create `tests/categorySelector.test.ts` verifying that each of the 12 category IDs maps to a unique icon component and unique theme color class (no duplicates of the generic sparkles icon across festival, sports, culinary, community, and universal).

- [ ] **Step 2: Run test to verify it fails**
  Run: `cd ChillFlow_Repo; npx vitest run tests/categorySelector.test.ts`
  Expected: FAIL.

- [ ] **Step 3: Implement distinct icons and rich visual cards**
  - In `EventInputForm.tsx`:
    - Update `renderCategoryIcon` with unique Lucide icons:
      - `festival-music`: `<Music className="w-5 h-5 text-fuchsia-400" />`
      - `sports-marathon`: `<Activity className="w-5 h-5 text-orange-400" />`
      - `culinary-lifestyle`: `<UtensilsCrossed className="w-5 h-5 text-amber-400" />`
      - `community-career`: `<Users className="w-5 h-5 text-sky-400" />`
      - `universal-showcase`: `<Globe className="w-5 h-5 text-indigo-400" />`
      - `studio-3d`: `<Box className="w-5 h-5 text-amber-400" />`
    - Add category micro-tag badge under the label (e.g. "EDM & Concert", "Race & Marathon", "Tasting Michelin", "Job Fair & HR", "Showcase Đa Năng").
    - Style each card with subtle border-color accents and hover shadow matching the category theme.

- [ ] **Step 4: Run test to verify it passes**
  Run: `cd ChillFlow_Repo; npx vitest run tests/categorySelector.test.ts`
  Expected: PASS.

- [ ] **Step 5: Commit**
  ```bash
  git add src/components/EventInputForm.tsx src/services/themeEngine.ts tests/categorySelector.test.ts
  git commit -m "feat(ui): redesign event category selector with distinct icons and themed micro-badges"
  ```

---

### Task 6: Minimalist Borderless Spatial Core 3D with Slower Scroll-Driven Rotation (Req 8)

**Files:**
- Modify: `ChillFlow_Repo/src/components/LandingPage/heroes/CinematicStudioHero.tsx:110-135, 155-165, 440-475`
- Create: `ChillFlow_Repo/tests/spatialCoreHero.test.ts`

**Interfaces:**
- Consumes: Canvas mouse/wheel and scroll velocity state
- Produces: Pure centered 3D wireframe core without borders, badges, or instructions; damped slow rotation.

- [ ] **Step 1: Write the failing test**
  Create `tests/spatialCoreHero.test.ts` checking that `CinematicStudioHero` source does not render the text `"SPATIAL_CORE_V3"`, `"120 FPS"`, or `"Lăn chuột hoặc kéo để xoay 360°"`, and that rotation constants are decelerated.

- [ ] **Step 2: Run test to verify it fails**
  Run: `cd ChillFlow_Repo; npx vitest run tests/spatialCoreHero.test.ts`
  Expected: FAIL.

- [ ] **Step 3: Implement minimalist spatial core viewport**
  - In `CinematicStudioHero.tsx`:
    - Remove outer card wrapper classes (`bg-slate-100/90 dark:bg-zinc-950/70 border border-slate-200 dark:border-white/10 shadow-xl...`). Replace with transparent container: `relative w-full aspect-square max-w-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none`.
    - Remove the top header pill containing `SPATIAL_CORE_V3` and `120 FPS`.
    - Remove the bottom pill containing `Lăn chuột hoặc kéo để xoay 360° • Scroll-Driven 3D`.
    - Slower rotation speeds:
      - `scrollImpulseY += deltaY * 0.0012` (was 0.0035).
      - `scrollImpulseX += deltaY * 0.0006` (was 0.0018).
      - Idle velocity: `velocity.current.x * 0.96 + 0.0005 * 0.04` and `velocity.current.y * 0.96 + 0.0012 * 0.04`.

- [ ] **Step 4: Run test to verify it passes**
  Run: `cd ChillFlow_Repo; npx vitest run tests/spatialCoreHero.test.ts`
  Expected: PASS.

- [ ] **Step 5: Commit**
  ```bash
  git add src/components/LandingPage/heroes/CinematicStudioHero.tsx tests/spatialCoreHero.test.ts
  git commit -m "feat(studio-3d): borderless centered spatial core with slow scroll-driven rotation"
  ```

---

### Task 7: Editable Timeline / Agenda Session Tags in Visual CMS (Req 6)

**Files:**
- Modify: `ChillFlow_Repo/src/types/index.ts:30-40`
- Modify: `ChillFlow_Repo/src/store/useLandingPageStore.ts:50-70`
- Modify: `ChillFlow_Repo/src/components/LandingPage/AgendaSection.tsx:35-46, 220-230`
- Modify: `ChillFlow_Repo/src/utils/sourceExporter.ts:180-210`
- Create: `ChillFlow_Repo/tests/agendaTagEditing.test.ts`

**Interfaces:**
- Consumes: `AgendaItem { time: string; title: string; description: string; speaker?: string; tag?: string }`
- Produces: Click-to-edit phase tag pill in timeline with store undo/redo.

- [ ] **Step 1: Write the failing test**
  Create `tests/agendaTagEditing.test.ts` testing that `AgendaItem` accepts a custom `tag`, `updateAgendaItem(index, 'tag', newTag)` updates store state, and `AgendaSection` renders the editable tag.

- [ ] **Step 2: Run test to verify it fails**
  Run: `cd ChillFlow_Repo; npx vitest run tests/agendaTagEditing.test.ts`
  Expected: FAIL.

- [ ] **Step 3: Implement editable tags**
  - In `types/index.ts`: Add `tag?: string;` to `AgendaItem`.
  - In `useLandingPageStore.ts`: Ensure `updateAgendaItem` handles `'tag'`.
  - In `AgendaSection.tsx`: Wrap the session phase badge with `<InlineEditable value={item.tag || badge.label} isEditMode={isEditMode} onSave={(val) => onUpdateAgendaItem?.(index, 'tag', val)} />`.
  - In `sourceExporter.ts`: Export `item.tag || defaultTag`.

- [ ] **Step 4: Run test to verify it passes**
  Run: `cd ChillFlow_Repo; npx vitest run tests/agendaTagEditing.test.ts`
  Expected: PASS.

- [ ] **Step 5: Commit**
  ```bash
  git add src/types/index.ts src/store/useLandingPageStore.ts src/components/LandingPage/AgendaSection.tsx src/utils/sourceExporter.ts tests/agendaTagEditing.test.ts
  git commit -m "feat(cms): enable in-place inline editing for agenda timeline session tags"
  ```

---

### Task 8: Wrap All Specialty Section Copy in InlineEditable (Req 3)

**Files:**
- Modify: `ChillFlow_Repo/src/components/LandingPage/LandingPagePreview.tsx:600-665`
- Modify: `ChillFlow_Repo/src/components/LandingPage/sections/AcademySyllabusSection.tsx`
- Modify: `ChillFlow_Repo/src/components/LandingPage/sections/CinematicShowcaseSection.tsx`
- Modify: `ChillFlow_Repo/src/components/LandingPage/sections/CreativeMasonrySection.tsx`
- Modify: `ChillFlow_Repo/src/components/LandingPage/sections/DeveloperCodeSandboxSection.tsx`
- Modify: `ChillFlow_Repo/src/components/LandingPage/sections/ExecutivePitchesSection.tsx`
- Modify: `ChillFlow_Repo/src/components/LandingPage/sections/MarketingBeforeAfterSection.tsx`
- Modify: `ChillFlow_Repo/src/components/LandingPage/sections/MasterclassStatsSection.tsx`
- Modify: `ChillFlow_Repo/src/components/LandingPage/sections/StartupPitchingRosterSection.tsx`
- Modify: `ChillFlow_Repo/src/components/LandingPage/sections/TerminalCodeSection.tsx`
- Modify: `ChillFlow_Repo/src/components/LandingPage/RegistrationSection.tsx`
- Create: `ChillFlow_Repo/tests/specialtySectionsCms.test.ts`

**Interfaces:**
- Consumes: `isEditMode: boolean` passed from `LandingPagePreview`
- Produces: Click-to-edit inline inputs on headlines, sub-copy, stats, and bullets across all specialty sections.

- [ ] **Step 1: Write the failing test**
  Create `tests/specialtySectionsCms.test.ts` verifying that specialty sections import and use `InlineEditable` when `isEditMode = true`.

- [ ] **Step 2: Run test to verify it fails**
  Run: `cd ChillFlow_Repo; npx vitest run tests/specialtySectionsCms.test.ts`
  Expected: FAIL.

- [ ] **Step 3: Implement InlineEditable across specialty sections**
  - Pass `isEditMode` prop into each specialty section in `LandingPagePreview.tsx`.
  - Wrap section headings, subtitles, card descriptions, and metrics with `<InlineEditable ... />`.
  - Wrap registration section heading and subtitle with `<InlineEditable ... />`.

- [ ] **Step 4: Run test to verify it passes**
  Run: `cd ChillFlow_Repo; npx vitest run tests/specialtySectionsCms.test.ts`
  Expected: PASS.

- [ ] **Step 5: Verify build & lint**
  Run: `cd ChillFlow_Repo; npm run lint; npm run build`
  Expected: 0 errors.

- [ ] **Step 6: Commit**
  ```bash
  git add src/components/LandingPage/LandingPagePreview.tsx src/components/LandingPage/sections/*.tsx src/components/LandingPage/RegistrationSection.tsx tests/specialtySectionsCms.test.ts
  git commit -m "feat(cms): wrap all specialty section copy in InlineEditable for visual editing"
  ```

---

### Task 9: Dedicated Domain-Specific AI & Fallback Content Generation (Req 1 Part B)

**Files:**
- Modify: `ChillFlow_Repo/src/services/aiService.ts:300-460, 580-680`
- Create: `ChillFlow_Repo/tests/domainContentGeneration.test.ts`

**Interfaces:**
- Consumes: `input: EventInput` with category `festival-music`, `sports-marathon`, `culinary-lifestyle`, `community-career`, `universal-showcase`
- Produces: Custom domain-tailored headlines, benefits, agendas, and FAQs (not generic academic copy).

- [ ] **Step 1: Write the failing test**
  Create `tests/domainContentGeneration.test.ts` verifying that `generateWithSmartEngine` returns:
  - Music festival copy (lineup, stage audio, countdown) for `festival-music`.
  - Marathon copy (race kit, pacer, medal finisher) for `sports-marathon`.
  - Culinary copy (tasting menu, sommelier, master chef) for `culinary-lifestyle`.
  - Job fair copy (recruiter booths, CV review, networking) for `community-career`.
  Assert none of them contain academic phrases like "lớp học", "giáo trình 4 tuần", or "giảng viên viện sĩ".

- [ ] **Step 2: Run test to verify it fails**
  Run: `cd ChillFlow_Repo; npx vitest run tests/domainContentGeneration.test.ts`
  Expected: FAIL.

- [ ] **Step 3: Implement domain-specific generators**
  - In `aiService.ts`:
    - Add explicit branches in `generateWithSmartEngine` for `festival-music`, `sports-marathon`, `culinary-lifestyle`, `community-career`, and `universal-showcase`.
    - Provide rich, immersive benefits, agendas, and FAQs for each.
    - Update system prompt in `fetchGeminiContent` so Gemini also generates tailored structures for all 12 categories.

- [ ] **Step 4: Run test to verify it passes**
  Run: `cd ChillFlow_Repo; npx vitest run tests/domainContentGeneration.test.ts`
  Expected: PASS.

- [ ] **Step 5: Commit**
  ```bash
  git add src/services/aiService.ts tests/domainContentGeneration.test.ts
  git commit -m "feat(ai): provide unique domain-specific fallback and AI content for all 12 templates"
  ```

---

### Task 10: Automatic 2-Phase Generation & Instant CRO Optimization Pipeline (Req 4)

**Files:**
- Modify: `ChillFlow_Repo/src/App.tsx:143-182`
- Modify: `ChillFlow_Repo/src/components/EventInputForm.tsx:130-170`
- Create: `ChillFlow_Repo/tests/autoCroPipeline.test.ts`

**Interfaces:**
- Consumes: `EventInput` on form submission
- Produces: Automatically generated and CRO-optimized page on initial creation (`cro.totalScore >= 90`, `isAlreadyOptimized = true`) without manual clicks.

- [ ] **Step 1: Write the failing test**
  Create `tests/autoCroPipeline.test.ts` verifying that initial form submission executes the 2-phase pipeline (generation + CRO optimization), resulting in high CRO score and `isAlreadyOptimized = true`.

- [ ] **Step 2: Run test to verify it fails**
  Run: `cd ChillFlow_Repo; npx vitest run tests/autoCroPipeline.test.ts`
  Expected: FAIL.

- [ ] **Step 3: Implement automated 2-phase pipeline in App.tsx**
  - In `App.tsx`:
    - In `handleFormSubmit`:
      1. Show toast: "⚡ Đang tạo trang và phân tích chuyển đổi (CRO)...".
      2. Call `generateLandingPageContent(input, apiKey, true)` (or 2-pass: pass 1 base generation, pass 2 immediate CRO boost).
      3. Set `isAlreadyOptimized(true)` directly.
      4. Toast: "🚀 Trang đích đã được tạo & tối ưu hóa tỷ lệ chuyển đổi (CRO) thành công!".
  - In `EventInputForm.tsx`: Update loading text to display "Đang phân tích thông tin & tối ưu CRO...".

- [ ] **Step 4: Run test to verify it passes**
  Run: `cd ChillFlow_Repo; npx vitest run tests/autoCroPipeline.test.ts`
  Expected: PASS.

- [ ] **Step 5: Final verification of complete build & all tests**
  Run: `cd ChillFlow_Repo; npm test; npm run lint; npm run build`
  Expected: All test suites PASS, 0 lint errors, production build succeeds cleanly.

- [ ] **Step 6: Commit**
  ```bash
  git add src/App.tsx src/components/EventInputForm.tsx tests/autoCroPipeline.test.ts
  git commit -m "feat(cro): automated 2-phase generation and instant CRO optimization pipeline"
  ```

---
