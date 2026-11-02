# Live Preview Panel + Scroll Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thay thế wireframe preview từng section bằng một panel "Live Mini-Preview" luôn hiển thị bên cạnh (split layout trên desktop, toggle tab trên mobile) — render thu nhỏ toàn bộ landing page thật — đồng thời sửa bug lăn chuột không hoạt động trong LandingPagePreview.

**Architecture:**
- **Desktop (≥ lg):** `App.tsx` trong tab `preview` dùng layout 2 cột — cột trái là `LandingPagePreview` editor, cột phải là `MiniLivePreview` panel (CSS `transform: scale(dynamic)`) render thật landing page.
- **Mobile (< lg):** Toggle button "👁 Xem trước" / "✏️ Chỉnh sửa" để chuyển đổi giữa editor và preview panel.
- **Scroll fix:** Lenis bind vào `document` global intercepts wheel events → thêm `data-lenis-prevent` vào outer wrapper của `LandingPagePreview` để Lenis bỏ qua container đó.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, CSS `transform: scale()`, `ResizeObserver`, Lenis v1 `data-lenis-prevent`

**Spec:** `docs/superpowers/plans/2026-11-02-section-preview-guest-auth-admin.md`

## Global Constraints

- Không thay đổi `vitest.config.ts` (`environment: 'node'`).
- Giữ nguyên 107+ tests passing; không xóa test cũ.
- Không dùng `<iframe>` thật — dùng CSS scale transform trên `<div>` nội bộ.
- Tất cả text user-facing bằng Tiếng Việt.
- Không thêm dependency mới.
- Karpathy: surgical changes, không refactor ngoài phạm vi task.

## Review Focus

1. **Scale transform overflow:** `transform: scale(0.32)` trên div 1280px wide vẫn chiếm box-model 1280px → cần `transform-origin: top left` + outer wrapper `overflow: hidden` với height = `innerHeight * scale`.
2. **Lenis + inner scroll conflict:** Lenis intercepts `wheel` trên `document`; thêm `data-lenis-prevent` đúng element để cho phép native scroll.
3. **Pointer-events trong mini preview:** Mini preview không nên clickable → `pointerEvents: 'none'` trên inner div.
4. **Mobile toggle state persistence:** `showMobilePreview` state không nên reset khi user switch tab.
5. **ResizeObserver trong test (Node env):** `ResizeObserver` không có trong Node → test chỉ kiểm tra source code text, không mount component.

---

## Task 1: Fix Mouse Wheel Scroll Bug trong LandingPagePreview

**Files:**
- Modify: `src/components/LandingPage/LandingPagePreview.tsx` (~line 358, outer wrapper div)
- Test: `tests/scrollBehavior.test.ts`

**Interfaces:**
- Consumes: Lenis `data-lenis-prevent` attribute
- Produces: `LandingPagePreview` outer wrapper có `data-lenis-prevent`

- [ ] **Step 1: Viết failing test**

```ts
// tests/scrollBehavior.test.ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

describe('LandingPagePreview scroll compatibility', () => {
  it('outer wrapper phải có data-lenis-prevent attribute', () => {
    const src = readFileSync('src/components/LandingPage/LandingPagePreview.tsx', 'utf8');
    expect(src).toContain('data-lenis-prevent');
  });
});
```

- [ ] **Step 2: Run test để xác nhận FAIL**

```
npx vitest run tests/scrollBehavior.test.ts
```
Expected: FAIL — `data-lenis-prevent` chưa có.

- [ ] **Step 3: Thêm `data-lenis-prevent` vào outer wrapper**

Trong `src/components/LandingPage/LandingPagePreview.tsx`, tìm dòng ~358:
```tsx
// BEFORE:
<div className="min-h-screen bg-slate-50 dark:bg-slate-950 ...">

// AFTER:
<div
  data-lenis-prevent
  className="min-h-screen bg-slate-50 dark:bg-slate-950 ..."
>
```

- [ ] **Step 4: Run test để xác nhận PASS**

```
npx vitest run tests/scrollBehavior.test.ts
```
Expected: PASS

- [ ] **Step 5: Full suite check**

```
npx vitest run
```
Expected: 108 passed

- [ ] **Step 6: Commit**

```bash
git add src/components/LandingPage/LandingPagePreview.tsx tests/scrollBehavior.test.ts
git commit -m "fix: add data-lenis-prevent to fix mouse wheel scroll in preview"
```

---

## Task 2: `MiniLivePreview` Component

**Files:**
- Create: `src/components/LandingPage/MiniLivePreview.tsx`
- Test: `tests/miniLivePreview.test.ts`

**Interfaces:**
- Consumes:
  - `input: EventInput`, `content: GeneratedContent`, `cro: CROEvaluation`, `registeredCount?: number`, `scale?: number` (fallback default `0.32`), `className?: string`
- Produces:
  - `export const MiniLivePreview: React.FC<MiniLivePreviewProps>`
  - Outer wrapper: `ref={containerRef}`, class `mini-live-preview-wrapper`, `overflow: hidden`, `width: '100%'`, dynamic height.
  - Inner div: class `mini-live-preview-inner`, `style={{ width: 1280, transform: \`scale(${dynamicScale})\`, transformOrigin: 'top left', pointerEvents: 'none' }}`

**Design:**
- `INNER_WIDTH = 1280` (constant)
- `dynamicScale` từ `ResizeObserver` watching `containerRef`; fallback to `scale` prop.
- Outer `height = Math.round(estimatedInnerHeight * dynamicScale)` — estimatedInnerHeight ~4200px.
- Render sections: `HeroSection`, `TrustBarSection`, `BenefitsSection`, `SpeakerSection`, `TestimonialsSection`, `AgendaSection`, `FaqSection`, `RegistrationSection`, `EventFooterSection` — import trực tiếp (không lazy), tất cả visible, `pointer-events: none` nên không cần handlers thật.
- Wrap sections trong theme `div` dùng `getThemeForCategory(input.category)`.
- Không render: toolbar, floating buttons, CRO drawer, publish modal, image picker.

- [ ] **Step 1: Viết failing tests**

```ts
// tests/miniLivePreview.test.ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

describe('MiniLivePreview component', () => {
  it('file phải tồn tại và export MiniLivePreview', () => {
    const src = readFileSync('src/components/LandingPage/MiniLivePreview.tsx', 'utf8');
    expect(src).toContain('export const MiniLivePreview');
  });
  it('phải có pointer-events none để disable interaction', () => {
    const src = readFileSync('src/components/LandingPage/MiniLivePreview.tsx', 'utf8');
    expect(src).toMatch(/pointerEvents.*none|pointer-events.*none/);
  });
  it('phải có transform scale', () => {
    const src = readFileSync('src/components/LandingPage/MiniLivePreview.tsx', 'utf8');
    expect(src).toContain('scale');
  });
  it('phải có mini-live-preview-wrapper class', () => {
    const src = readFileSync('src/components/LandingPage/MiniLivePreview.tsx', 'utf8');
    expect(src).toContain('mini-live-preview-wrapper');
  });
  it('phải dùng ResizeObserver hoặc useRef cho responsive scale', () => {
    const src = readFileSync('src/components/LandingPage/MiniLivePreview.tsx', 'utf8');
    expect(src).toMatch(/ResizeObserver|containerRef/);
  });
});
```

- [ ] **Step 2: Run test để xác nhận FAIL**

```
npx vitest run tests/miniLivePreview.test.ts
```
Expected: FAIL — file chưa tồn tại.

- [ ] **Step 3: Tạo `src/components/LandingPage/MiniLivePreview.tsx`**

Skeleton cần đạt được:
```tsx
const INNER_WIDTH = 1280;
const ESTIMATED_HEIGHT = 4200;

export const MiniLivePreview: React.FC<MiniLivePreviewProps> = ({
  input, content, registeredCount = 0, scale = 0.32, className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dynamicScale, setDynamicScale] = useState(scale);
  const theme = getThemeForCategory(input.category);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w > 0) setDynamicScale(w / INNER_WIDTH);
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const displayHeight = Math.round(ESTIMATED_HEIGHT * dynamicScale);

  return (
    <div
      ref={containerRef}
      className={`mini-live-preview-wrapper overflow-hidden relative rounded-xl ...${className ?? ''}`}
      style={{ width: '100%', height: displayHeight }}
    >
      <div
        className="mini-live-preview-inner absolute top-0 left-0"
        style={{ width: INNER_WIDTH, transform: `scale(${dynamicScale})`, transformOrigin: 'top left', pointerEvents: 'none' }}
      >
        {/* theme wrapper + all sections */}
      </div>
    </div>
  );
};
```

- [ ] **Step 4: Run test để xác nhận PASS**

```
npx vitest run tests/miniLivePreview.test.ts
```
Expected: 5 PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/LandingPage/MiniLivePreview.tsx tests/miniLivePreview.test.ts
git commit -m "feat: add MiniLivePreview scaled live preview component with ResizeObserver"
```

---

## Task 3: Split Layout trong App.tsx

**Files:**
- Modify: `src/App.tsx`
- Test: `tests/splitLayoutPreview.test.ts`

**Interfaces:**
- Consumes: `MiniLivePreview` từ Task 2
- Produces: `App.tsx` render tab `preview` với:
  - State: `const [showMobilePreview, setShowMobilePreview] = useState(false)`
  - Desktop layout: `flex flex-col lg:flex-row`; `LandingPagePreview` trong `flex-1`, `MiniLivePreview` trong `lg:w-[420px] lg:sticky lg:top-16`
  - Mobile: sticky toggle bar (hidden trên `lg:`), conditional show/hide bằng `hidden` class

- [ ] **Step 1: Viết failing tests**

```ts
// tests/splitLayoutPreview.test.ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

describe('App split layout preview', () => {
  it('App.tsx phải import MiniLivePreview', () => {
    const src = readFileSync('src/App.tsx', 'utf8');
    expect(src).toContain('MiniLivePreview');
  });
  it('App.tsx phải có showMobilePreview state', () => {
    const src = readFileSync('src/App.tsx', 'utf8');
    expect(src).toContain('showMobilePreview');
  });
  it('App.tsx phải có lg: responsive breakpoint', () => {
    const src = readFileSync('src/App.tsx', 'utf8');
    expect(src).toMatch(/lg:flex|lg:block|lg:w-/);
  });
});
```

- [ ] **Step 2: Run test để xác nhận FAIL**

```
npx vitest run tests/splitLayoutPreview.test.ts
```
Expected: FAIL

- [ ] **Step 3: Sửa `src/App.tsx`**

1. Thêm import: `import { MiniLivePreview } from './components/LandingPage/MiniLivePreview';`
2. Thêm state: `const [showMobilePreview, setShowMobilePreview] = useState(false);`
3. Thay đoạn `currentTab === 'preview'` render (the `else` branch của `currentTab === 'form'`):

```tsx
<ErrorBoundary sectionName="Bản xem trước">
  {/* Mobile toggle — ẩn trên lg */}
  <div className="lg:hidden sticky top-14 z-30 flex border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm">
    <button
      type="button"
      onClick={() => setShowMobilePreview(false)}
      className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${!showMobilePreview ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}
    >
      ✏️ Chỉnh sửa
    </button>
    <button
      type="button"
      onClick={() => setShowMobilePreview(true)}
      className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${showMobilePreview ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}
    >
      👁 Xem trước
    </button>
  </div>

  {/* Split layout */}
  <div className="flex flex-col lg:flex-row lg:items-start">
    {/* Editor cột trái */}
    <div className={`flex-1 min-w-0 ${showMobilePreview ? 'hidden lg:block' : ''}`}>
      <LandingPagePreview {/* ...tất cả props giữ nguyên... */} />
    </div>

    {/* Mini preview cột phải */}
    <div className={`lg:w-[420px] lg:shrink-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-hidden lg:border-l lg:border-slate-200 lg:dark:border-slate-800 lg:flex lg:items-start lg:p-3 ${showMobilePreview ? 'flex justify-center p-4 min-h-screen bg-slate-100 dark:bg-slate-900' : 'hidden lg:flex'}`}>
      <MiniLivePreview
        input={eventInput}
        content={content}
        cro={cro!}
        registeredCount={attendees.length}
        className="w-full"
      />
    </div>
  </div>
</ErrorBoundary>
```

- [ ] **Step 4: Run test để xác nhận PASS**

```
npx vitest run tests/splitLayoutPreview.test.ts
```
Expected: 3 PASS

- [ ] **Step 5: Full suite + build**

```
npx vitest run
npm run build
```
Expected: ≥ 111 passed, build clean.

- [ ] **Step 6: Commit + push**

```bash
git add src/App.tsx tests/splitLayoutPreview.test.ts
git commit -m "feat: split layout live preview panel — desktop side-by-side, mobile toggle"
git push origin master
```
