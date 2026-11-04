# Form UX Hierarchy & Compact Theme Chips Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul `EventInputForm.tsx` to eliminate visual noise by moving core event information (name, date, location) to the top, replacing the 12 bulky theme cards with compact icon chips (Option A) that save 55%+ height, softening preset pill prominence, and replacing the heavy purple AI banner with a subtle inline suggestion indicator.

**Architecture:**
1. **Natural Input Flow Hierarchy:** Users start by typing what they already know (Event Name, Date & Time, Location), followed by selecting the visual style/category, then filling optional speaker & ticket details.
2. **Compact Icon Chips (Option A):** Replace heavy 2-row multi-badge cards with lightweight, cohesive horizontal chips (`w-3.5 h-3.5` icons + label) in a wrapping layout. Active chip has clear, clean accent styling; inactive chips remain calm and neutral.
3. **Muted Inline AI Detection:** Replace the jarring full-width purple notification banner with a sleek, minimalist inline helper badge (`✨ AI gợi ý: [Template] • [Áp dụng]`) placed neatly alongside the theme label.
4. **De-emphasized Header Presets:** Tone down the quick preset buttons from loud high-contrast pills to refined secondary chips that do not compete with the form title.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Vitest.

**Spec:** Direct UX feedback & architectural guidelines provided in user request (`Option A: Card → Icon Chips`, `Event Info First → Theme Below`, `Softened Presets & Muted AI Banner`).

---

## Global Constraints

- Do not alter existing `EventInput` or `EventCategory` data structures or break the `onSubmit(formData)` contract.
- Preserve automatic category detection via `detectBestTemplate()` while making its visual presentation subtle.
- Keyboard accessibility: users must be able to Tab through inputs and select chips with Space/Enter.
- All 170+ existing test cases must continue to pass alongside newly written tests.
- Commits must be atomic per task using conventional commit prefixes (`feat: ...`).

---

## Review Focus

1. **Information Order & First Focus:** `eventName` input must be the first interactive form field below the header, ensuring immediate focus without visual distractions.
2. **Height Reduction:** The entire category section height must decrease by at least 50% on desktop (from ~220px to under 90px).
3. **Preset Distinction:** Quick preset buttons in the header must look subordinate to the main form actions.
4. **AI Suggestion Usability:** When `eventName` changes, the AI template recommendation must still be clickable to auto-switch categories without occupying a full-width banner.
5. **Mobile Responsiveness:** Icon chips must wrap smoothly without horizontal overflow or clipping on 360px-400px mobile screens.

---

### Task 1: Reorder EventInputForm Hierarchy (Event Info First) & Soften Presets

**Files:**
- Modify: `ChillFlow_Repo/src/components/EventInputForm.tsx`
- Create: `ChillFlow_Repo/tests/formHierarchyAndVisualNoise.test.ts`

**Interfaces:**
- Consumes: `EventInputFormProps` (`initialData`, `onSubmit`, `isLoading`)
- Produces: Reordered DOM structure where `eventName`, `eventDate`, and `location` precede the theme/category selection.

- [ ] **Step 1: Write failing test in `tests/formHierarchyAndVisualNoise.test.ts` verifying event info comes before category selector**

```typescript
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Form UX Hierarchy & Visual Noise Reduction', () => {
  const formPath = path.resolve(__dirname, '../src/components/EventInputForm.tsx');
  const content = fs.readFileSync(formPath, 'utf-8');

  it('places eventName, eventDate and location inputs before category selector in the DOM', () => {
    const eventNameIndex = content.indexOf('name="eventName"');
    const categorySelectorIndex = content.indexOf('Category / Theme Selector');
    expect(eventNameIndex).toBeGreaterThan(0);
    expect(categorySelectorIndex).toBeGreaterThan(0);
    // eventName must appear BEFORE the category selector
    expect(eventNameIndex).toBeLessThan(categorySelectorIndex);
  });

  it('tones down header preset buttons to secondary styling without heavy shadow', () => {
    expect(content).not.toContain('bg-indigo-600 text-white border-indigo-500 font-medium shadow-sm');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm --prefix ChillFlow_Repo test tests/formHierarchyAndVisualNoise.test.ts`
Expected: FAIL (currently `eventName` is defined after `Category / Theme Selector` in `EventInputForm.tsx`)

- [ ] **Step 3: Reorder form sections and soften header presets in `src/components/EventInputForm.tsx`**

1. In the header bar (`{/* Quick presets */}`):
   - Replace loud primary pill styling:
     `activePresetIndex === idx ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30 font-semibold' : 'bg-slate-100/70 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 border-slate-200/60 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'`
2. Move the Core Event Information block:
   - Tên sự kiện (`name="eventName"` with prominent autofocus/large typography), Thời gian (`name="eventDate"`), and Địa điểm (`name="location"`) to the top of `<form>`.
   - Place Category / Theme Selector immediately below the Core Information.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm --prefix ChillFlow_Repo test tests/formHierarchyAndVisualNoise.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git -C ChillFlow_Repo add src/components/EventInputForm.tsx tests/formHierarchyAndVisualNoise.test.ts
git -C ChillFlow_Repo commit -m "feat(ux): reorder event input form hierarchy to place core event details before theme selection"
```

---

### Task 2: Compact Theme Icon Chips (Option A) & Muted Inline AI Banner

**Files:**
- Modify: `ChillFlow_Repo/src/components/EventInputForm.tsx`
- Modify: `ChillFlow_Repo/tests/formHierarchyAndVisualNoise.test.ts`

**Interfaces:**
- Consumes: `CATEGORIES` from `src/services/themeEngine.ts`, `detectBestTemplate` from `src/services/templateRegistry.ts`
- Produces: Compact icon chips (`flex flex-wrap gap-2`) with `w-3.5 h-3.5` icons, saving ~60% height; muted inline AI suggestion badge.

- [ ] **Step 1: Add tests in `tests/formHierarchyAndVisualNoise.test.ts` for Option A chips and muted AI indicator**

```typescript
it('implements compact icon chips (Option A) instead of bulky card grid', () => {
  const content = fs.readFileSync(formPath, 'utf-8');
  // Must use flex-wrap gap-2 instead of 6-col card grid
  expect(content).toContain('flex flex-wrap gap-2');
  expect(content).not.toContain('grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6');
});

it('displays AI template recommendation as a subtle inline badge instead of a full-width purple banner', () => {
  const content = fs.readFileSync(formPath, 'utf-8');
  expect(content).not.toContain('p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-700 dark:text-indigo-300 animate-in fade-in');
  expect(content).toContain('AI đề xuất');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm --prefix ChillFlow_Repo test tests/formHierarchyAndVisualNoise.test.ts`
Expected: FAIL (missing `flex flex-wrap gap-2` and still has bulky grid)

- [ ] **Step 3: Implement Option A Icon Chips and Muted AI Suggestion in `EventInputForm.tsx`**

1. Change category selector render:
   - Container: `<div className="flex flex-wrap gap-2 pt-1">`
   - Each chip:
     ```tsx
     <button
       key={cat.id}
       type="button"
       onClick={() => handleCategorySelect(cat.id)}
       className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
         isSelected
           ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm shadow-indigo-500/25 ring-2 ring-indigo-500/20'
           : 'bg-slate-100/80 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-white'
       }`}
     >
       {renderCategoryIcon(cat.id, 'w-3.5 h-3.5')}
       <span>{cat.label}</span>
     </button>
     ```
2. Muted inline AI indicator:
   - Place directly in the category header line or right below chips as a gentle hint:
     ```tsx
     {suggestedCategory && formData.category !== suggestedCategory.id && (
       <div className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100/60 dark:bg-slate-800/40 px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-slate-800">
         <Sparkles className="w-3 h-3 text-amber-500" />
         <span>AI đề xuất: <strong>{suggestedCategory.name}</strong></span>
         <button
           type="button"
           onClick={() => handleCategorySelect(suggestedCategory.id)}
           className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold text-[11px] cursor-pointer ml-1"
         >
           Áp dụng
         </button>
       </div>
     )}
     ```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm --prefix ChillFlow_Repo test tests/formHierarchyAndVisualNoise.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git -C ChillFlow_Repo add src/components/EventInputForm.tsx tests/formHierarchyAndVisualNoise.test.ts
git -C ChillFlow_Repo commit -m "feat(ux): convert theme selector to compact icon chips and soften AI suggestion banner"
```

---

### Task 3: Regression Suite Verification & Production Build

**Files:**
- All modified components and tests

- [ ] **Step 1: Run full Vitest suite**

Run: `npm --prefix ChillFlow_Repo test`
Expected: 35/35 test suites pass with 0 failures

- [ ] **Step 2: Run production build**

Run: `npm --prefix ChillFlow_Repo run build`
Expected: `tsc -b && vite build` exits with code 0

- [ ] **Step 3: Push to remote master**

```bash
git -C ChillFlow_Repo push origin master
```
