# Production Realtime Reset, CRO Generation Pipeline & Clean Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clean all mock seed data to 0 on initial launch, fix MyProjectsModal mouse-wheel scroll lock, generate random 12-char project IDs (e.g. `abc1-def2-123c`) with `/p/:id` routing & public deployment, integrate a 4-step loading screen during form generation that automatically optimizes CRO, remove the CRO scorecard button from the left dock, and replace fake attendee photos with clean default silhouettes.

**Architecture:**
1. **Modal Wheel Scroll Fix:** Add `data-lenis-prevent`, `overscroll-contain`, `min-h-0`, and Lenis pause/resume lifecycle to `MyProjectsModal.tsx`.
2. **Pure Zero-Mock State:** Purge `DEFAULT_ATTENDEES` seed in `storageService.ts`, eliminate hardcoded `SAMPLE_EVENTS` from `SocialProofTicker.tsx` (hide ticker when 0 attendees; render neutral default SVG avatars for real registrants), and ensure `ConferenceHero.tsx` and `OrganizerDashboard.tsx` start from pure 0 without fake numbers or fake Unsplash faces.
3. **12-Char Project IDs & Standalone Routing:** Generate random 12-char project IDs matching pattern `xxxx-xxxx-xxxx` (e.g. `abc1-def2-123c`), store the complete event JSON, and resolve `/p/:id` or `#/p/:id` so external viewers can load the published page directly.
4. **Interactive Generation Loading Stepper & CRO Integration:** Introduce a rich `GenerationProgressModal` with 4-phase progress updates during `handleFormSubmit`. Automatically execute CRO optimization during generation, and remove the CRO score pill & drawer from the Studio Dock.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Zustand, Lenis Smooth Scroll, Vitest.

---

## Global Constraints

- Never break existing Visual CMS inline editing, template switching, or source export capabilities.
- Zero mock data on initial start: `localStorage` contains 0 attendees and 0 projects until created by user.
- All 152+ existing tests must continue to pass alongside newly created test suites.
- Commit messages must follow conventional commits per feature (`feat: ...`).

## Review Focus

1. **Lenis Modal Scroll Collision:** Opening `MyProjectsModal` must not swallow mouse-wheel events; users must be able to scroll through 10+ projects smoothly.
2. **Empty Attendee Safety:** When `attendees.length === 0`, `SocialProofTicker` must gracefully render nothing instead of throwing errors or showing fake people.
3. **12-Character ID Parsing:** Opening URL route with `#/p/abc1-def2-123c` or `/p/abc1-def2-123c` must successfully load the saved project JSON.
4. **Generation Stepper Interruption:** If an AI API error occurs, `GenerationProgressModal` must display error notification and dismiss cleanly without locking the UI.
5. **No Visual Dock Bloat:** CRO score pill must be completely removed from the Studio Dock on the left, leaving only clean template & layout controls.

---

### Task 1: Fix `MyProjectsModal` Mouse-Wheel Scroll Issue

**Files:**
- Modify: `ChillFlow_Repo/src/components/MyProjectsModal.tsx`
- Modify: `ChillFlow_Repo/tests/modalScroll.test.ts`

**Interfaces:**
- Consumes: `window.__lenis` from `src/hooks/useSmoothScroll.ts`
- Produces: Smooth wheel scrollable project list with `data-lenis-prevent`, `overscroll-contain`, `min-h-0`

- [ ] **Step 1: Write failing test in `tests/modalScroll.test.ts` verifying `MyProjectsModal` wheel scroll attributes and Lenis lifecycle**

```typescript
it('ensures MyProjectsModal scroll container has data-lenis-prevent, min-h-0, and Lenis pause/resume', () => {
  const modalContent = fs.readFileSync(
    path.resolve(__dirname, '../src/components/MyProjectsModal.tsx'),
    'utf-8'
  );
  expect(modalContent).toContain('data-lenis-prevent');
  expect(modalContent).toContain('overscroll-contain');
  expect(modalContent).toContain('min-h-0');
  expect(modalContent).toContain('__lenis');
  expect(modalContent).toContain('.stop()');
  expect(modalContent).toContain('.start()');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm --prefix ChillFlow_Repo test tests/modalScroll.test.ts`
Expected: FAIL (missing `min-h-0` and Lenis lifecycle in `MyProjectsModal.tsx`)

- [ ] **Step 3: Implement scroll fix in `src/components/MyProjectsModal.tsx`**

1. In `useEffect` when `isOpen` is true:
   ```typescript
   if ((window as any).__lenis) {
     (window as any).__lenis.stop();
   }
   return () => {
     if ((window as any).__lenis) {
       (window as any).__lenis.start();
     }
   };
   ```
2. Update the modal wrapper: add `data-lenis-prevent` and `overscroll-contain`.
3. Update the project list container:
   `<div className="p-6 overflow-y-auto space-y-3.5 flex-1 min-h-0 overscroll-contain" data-lenis-prevent>`

- [ ] **Step 4: Run test to verify it passes**

Run: `npm --prefix ChillFlow_Repo test tests/modalScroll.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git -C ChillFlow_Repo add src/components/MyProjectsModal.tsx tests/modalScroll.test.ts
git -C ChillFlow_Repo commit -m "feat: fix mouse wheel scroll in MyProjectsModal with Lenis lifecycle and min-h-0"
```

---

### Task 2: Pure Zero-Mock Data Reset & Neutral Default Avatars

**Files:**
- Modify: `ChillFlow_Repo/src/services/storageService.ts`
- Modify: `ChillFlow_Repo/src/components/LandingPage/SocialProofTicker.tsx`
- Modify: `ChillFlow_Repo/src/components/LandingPage/heroes/ConferenceHero.tsx`
- Modify: `ChillFlow_Repo/src/components/Admin/OrganizerDashboard.tsx`
- Modify: `ChillFlow_Repo/src/components/Admin/AnalyticsSummaryCards.tsx`
- Create: `ChillFlow_Repo/tests/realtimeZeroMockData.test.ts`

**Interfaces:**
- Consumes: `getStoredAttendees()` returning `Attendee[]`
- Produces: Empty initial states, 0 mock records, default SVG avatars for real registrants

- [ ] **Step 1: Write test in `tests/realtimeZeroMockData.test.ts` for zero mock state and default avatar**

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { getStoredAttendees } from '../src/services/storageService';
import { calculateEventKpis } from '../src/components/Admin/OrganizerDashboard';

describe('Zero-Mock Data & Neutral Default Avatars', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with 0 stored attendees by default without mock seeds', () => {
    const attendees = getStoredAttendees('fresh_event');
    expect(attendees).toEqual([]);
    expect(attendees.length).toBe(0);
  });

  it('calculates 0% conversion rate and 0 views when no attendees exist', () => {
    const kpis = calculateEventKpis([], 100, 0);
    expect(kpis.conversionRate).toBe(0);
    expect(kpis.seatsLeft).toBe(100);
    expect(kpis.earlyBirdRatio).toBe(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm --prefix ChillFlow_Repo test tests/realtimeZeroMockData.test.ts`
Expected: FAIL (currently returns 4 seed attendees)

- [ ] **Step 3: Implement Zero-Mock Data across storage, heroes, ticker and admin**

1. In `src/services/storageService.ts`:
   - Change `DEFAULT_ATTENDEES` from seed array to `[]`.
   - Remove auto-seeding of 4 attendees in `getStoredAttendees`.
2. In `src/components/LandingPage/SocialProofTicker.tsx`:
   - Remove fake `SAMPLE_EVENTS` array.
   - Accept `attendees?: Attendee[]` prop.
   - If `!attendees || attendees.length === 0`, return `null`.
   - For avatars: render an SVG user avatar silhouette with a subtle colored gradient circle instead of Unsplash URLs.
3. In `src/components/LandingPage/heroes/ConferenceHero.tsx`:
   - If `registeredCount === 0`, do not show fake avatar pile or fake "120 người đã giữ chỗ / 38 vé Early Bird".
   - When `registeredCount > 0`, render clean SVG user silhouettes with user initials.
4. In `src/components/Admin/OrganizerDashboard.tsx`:
   - Replace `estimatedViews = Math.max(50, attendees.length * 15)` with `pageViews = attendees.length > 0 ? attendees.length * 5 : 0`.
   - In `AnalyticsSummaryCards.tsx`: remove hardcoded `+18.4%` subtitle when views = 0. Show empty state placeholder when attendees = 0.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm --prefix ChillFlow_Repo test tests/realtimeZeroMockData.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git -C ChillFlow_Repo add src/services/storageService.ts src/components/LandingPage/SocialProofTicker.tsx src/components/LandingPage/heroes/ConferenceHero.tsx src/components/Admin/OrganizerDashboard.tsx src/components/Admin/AnalyticsSummaryCards.tsx tests/realtimeZeroMockData.test.ts
git -C ChillFlow_Repo commit -m "feat: purge mock seed data and introduce neutral default avatars for real users"
```

---

### Task 3: 12-Character Random Project IDs (`abc1-def2-123c`), URL Routing & Deployment

**Files:**
- Modify: `ChillFlow_Repo/src/services/projectStorageService.ts`
- Modify: `ChillFlow_Repo/src/services/publishService.ts`
- Modify: `ChillFlow_Repo/src/App.tsx`
- Create: `ChillFlow_Repo/tests/projectIdAndRouting.test.ts`

**Interfaces:**
- Produces: `generate12CharId(): string` returning `xxxx-xxxx-xxxx` (e.g. `abc1-def2-123c`)
- Consumes: `/p/:id` and `#/p/:id` routing resolution in `App.tsx` and `publishService.ts`

- [ ] **Step 1: Write test in `tests/projectIdAndRouting.test.ts`**

```typescript
import { describe, it, expect } from 'vitest';
import { generate12CharId, saveProject, getProjectById } from '../src/services/projectStorageService';
import { extractSlugFromLocation } from '../src/services/publishService';

describe('12-Character Project IDs & Public Routing', () => {
  it('generates a 12-character alphanumeric ID with hyphen format xxxx-xxxx-xxxx', () => {
    const id = generate12CharId();
    expect(id).toMatch(/^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$/);
    expect(id.replace(/-/g, '').length).toBe(12);
  });

  it('saves project with 12-char ID and retrieves it accurately', () => {
    const newProj = saveProject({
      slug: 'test-event',
      name: 'Test Event',
      category: 'ai-tech',
      input: { eventName: 'Test Event', category: 'ai-tech' } as any,
      content: { headline: 'Hello' } as any,
      cro: { totalScore: 90 } as any,
      syncStatus: 'local',
    });
    expect(newProj.id).toMatch(/^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$/);
    const found = getProjectById(newProj.id);
    expect(found?.name).toBe('Test Event');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm --prefix ChillFlow_Repo test tests/projectIdAndRouting.test.ts`
Expected: FAIL (missing `generate12CharId`)

- [ ] **Step 3: Implement 12-character ID generation and standalone route resolver**

1. In `src/services/projectStorageService.ts`:
   ```typescript
   export function generate12CharId(): string {
     const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
     const block = (len: number) =>
       Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
     return `${block(4)}-${block(4)}-${block(4)}`;
   }
   ```
   Use `generate12CharId()` when creating new `SavedProject.id`.
2. In `src/services/publishService.ts`:
   - Update `getPublicShareUrl(idOrSlug: string)`:
     `return `${window.location.origin}/#/p/${idOrSlug}`;`
   - Store published records indexed by both `record.slug` AND `record.id`.
3. In `src/App.tsx`:
   - Support loading project via `/p/:id` or `#/p/:id` or `?id=:id`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm --prefix ChillFlow_Repo test tests/projectIdAndRouting.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git -C ChillFlow_Repo add src/services/projectStorageService.ts src/services/publishService.ts src/App.tsx tests/projectIdAndRouting.test.ts
git -C ChillFlow_Repo commit -m "feat: implement 12-character random project IDs and unified public routing"
```

---

### Task 4: Multi-Step AI Generation Loading Stepper & Remove CRO from Dock

**Files:**
- Create: `ChillFlow_Repo/src/components/GenerationProgressModal.tsx`
- Modify: `ChillFlow_Repo/src/App.tsx`
- Modify: `ChillFlow_Repo/src/components/LandingPage/LandingPagePreview.tsx`
- Create: `ChillFlow_Repo/tests/generationProgressAndCroPipeline.test.ts`

**Interfaces:**
- Produces: `<GenerationProgressModal isOpen={isLoading} currentStep={step} eventName={name} />`
- Modifies: `LandingPagePreview.tsx` (removes CRO scorecard button and drawer from Studio Dock)

- [ ] **Step 1: Write test in `tests/generationProgressAndCroPipeline.test.ts`**

```typescript
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Generation Progress Stepper & Studio Dock CRO Removal', () => {
  it('creates GenerationProgressModal with 4 clear progress phases', () => {
    const modalPath = path.resolve(__dirname, '../src/components/GenerationProgressModal.tsx');
    expect(fs.existsSync(modalPath)).toBe(true);
    const content = fs.readFileSync(modalPath, 'utf-8');
    expect(content).toContain('CRO');
    expect(content).toContain('Phân tích');
  });

  it('ensures Studio Dock in LandingPagePreview no longer has CRO button or CRO drawer', () => {
    const previewContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/LandingPagePreview.tsx'),
      'utf-8'
    );
    expect(previewContent).not.toContain('Xem phân tích CRO chi tiết');
    expect(previewContent).not.toContain('showCRODrawer');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm --prefix ChillFlow_Repo test tests/generationProgressAndCroPipeline.test.ts`
Expected: FAIL (missing component and CRO button still in preview)

- [ ] **Step 3: Implement GenerationProgressModal and remove CRO from Studio Dock**

1. Create `src/components/GenerationProgressModal.tsx`:
   - Interactive backdrop with 4 steps:
     - 1. Phân tích đối tượng mục tiêu & ngành sự kiện
     - 2. Tạo nội dung quảng cáo & thông điệp chuyển đổi
     - 3. Kiểm định & tự động tối ưu hóa CRO (Score 90+)
     - 4. Kết nối giao diện & kho 12 Template
   - Animated progress bar and pulsating step icons.
2. In `src/App.tsx`:
   - Show `<GenerationProgressModal />` during `isLoading`.
   - Advance steps as AI generation + CRO pipeline runs.
3. In `src/components/LandingPage/LandingPagePreview.tsx`:
   - Remove the CRO score button (`showCRODrawer`) from the left Studio Dock.
   - Remove the CRO drawer modal from preview (CRO is already complete at generation).

- [ ] **Step 4: Run test to verify it passes**

Run: `npm --prefix ChillFlow_Repo test tests/generationProgressAndCroPipeline.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git -C ChillFlow_Repo add src/components/GenerationProgressModal.tsx src/App.tsx src/components/LandingPage/LandingPagePreview.tsx tests/generationProgressAndCroPipeline.test.ts
git -C ChillFlow_Repo commit -m "feat: add 4-step generation loading modal and integrate CRO into generation flow"
```

---

### Task 5: Full Regression Testing & Production Build Verification

**Files:**
- All modified and newly created files

- [ ] **Step 1: Run full Vitest suite**

Run: `npm --prefix ChillFlow_Repo test`
Expected: 33+ test suites pass with 0 failures

- [ ] **Step 2: Run full production build**

Run: `npm --prefix ChillFlow_Repo run build`
Expected: `tsc -b && vite build` exits with code 0

- [ ] **Step 3: Commit and tag if applicable**

```bash
git -C ChillFlow_Repo status
```
