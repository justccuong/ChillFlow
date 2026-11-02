# Kế Hoạch Sửa Lỗi Cuộn Trang, Làm Trong Suốt Countdown & Chuẩn Hóa Văn Phong Tự Nhiên

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Khắc phục triệt để lỗi không thể cuộn/lướt xuống trên landing page, thiết kế lại Countdown Timer thành dạng số trong suốt không viền với dấu 2 chấm căn chính giữa các con số, đồng thời thay thế các câu từ dịch máy/nghe "quá AI" thành tiếng Việt tự nhiên, thân thiện.

**Architecture:**
- **Scroll Fix:** Gỡ bỏ attribute `data-lenis-prevent` khỏi outer wrapper của `LandingPagePreview` (vốn đã ngăn chặn Lenis xử lý sự kiện lăn chuột trên toàn trang), chuyển đổi `overflow-x-hidden` sang `overflow-x-clip` trên `App.tsx` và `LandingPagePreview.tsx` để trình duyệt không kích hoạt cơ chế tự chuyển `overflow-y` thành `auto` làm đứt gãy luồng cuộn của `window`.
- **Countdown Redesign:** Đặt `variant = 'transparent'` làm mặc định cho `CountdownTimer.tsx`, loại bỏ toàn bộ viền khung (`border-none`), màu nền (`bg-transparent`) và bóng (`shadow-none`) của card số; tách rời hàng chứa số và hàng nhãn thời gian ("NGÀY", "GIỜ", "PHÚT", "GIÂY"); đưa dấu phân cách (dấu hai chấm / hai chấm tròn cân đối) vào container căn chỉnh theo tâm chiều cao của các con số (cap-height), đẩy lên trên để luôn nằm chuẩn ở giữa số.
- **Natural Copywriting:** Thay thế các từ ngữ dịch thô cứng mang tính máy móc như *"Bản xem trước trực tiếp"*, *"Live Auto-sync"* thành các từ tự nhiên trong giao diện tiếng Việt hiện đại như *"Xem trước giao diện"*, *"Tự động cập nhật"*, *"Chỉnh sửa nội dung"*.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Lenis Smooth Scroll, Vitest.

**Spec:** Yêu cầu từ người dùng:
1. Đổi cách dùng từ ở "bản xem trước gì đó trực tiếp" nghe quá AI sang chữ bình thường tự nhiên.
2. Phần số Countdown bỏ viền để mỗi số thôi, để trong suốt, dấu 2 chấm giữa thời gian để lên trên để cho ở giữa số.
3. Landing page đang bị lỗi toàn bộ trang không thể lướt xuống được.

## Global Constraints

- Không thay đổi cấu hình `vitest.config.ts` (`environment: 'node'`).
- Đảm bảo toàn bộ 118 tests hiện có tiếp tục PASS 100%.
- Không bổ sung thư viện bên ngoài mới.
- Thay đổi chuẩn xác, phẫu thuật (surgical), không xóa nhầm tính năng Visual CMS hay các modal liên quan.
- Tất cả câu từ giao diện người dùng phải bằng tiếng Việt tự nhiên, chuẩn mực UI/UX.

## Review Focus

1. **Khả năng cuộn trang:** `LandingPagePreview` phải cuộn mượt mà từ đầu trang xuống tận cuối trang (Footer) trên mọi kích thước màn hình mà không bị chặn bởi Lenis hay CSS overflow lock.
2. **Căn chỉnh dấu 2 chấm:** Dấu 2 chấm không được bị kéo lệch xuống dưới do chiều cao của nhãn thời gian ("NGÀY", "GIỜ", "PHÚT", "GIÂY").
3. **Hiển thị số Countdown:** Các con số (12, 08, 35, 59) hiển thị trong suốt, không có khung viền hộp trắng hay cyan bao bọc xung quanh, chữ to rõ ràng, số giây vẫn có màu sắc điểm nhấn tạo sự chuyển động.
4. **Các modal nội bộ có thanh cuộn:** Các modal (`SectionCustomizerModal`, `TemplateCatalogModal`, `AttendeeListModal`, `PricingModal`) vẫn giữ `data-lenis-prevent` để cuộn bên trong modal không gây xung đột cuộn nền ngoài trang.
5. **Đồng nhất từ ngữ:** Không còn xuất hiện cụm từ *"Bản xem trước trực tiếp"* hay *"Live Auto-sync"* gây cảm giác máy móc trong toàn bộ giao diện.

---

### Task 1: Sửa Lỗi Không Lướt Xuống Được (Full Page Scroll Lock Fix)

**Files:**
- Modify: `src/components/LandingPage/LandingPagePreview.tsx:359`
- Modify: `src/App.tsx:308`
- Test: `tests/scrollBehavior.test.ts`

**Interfaces:**
- Consumes: Window scrolling flow, Lenis listener
- Produces: `LandingPagePreview` không có `data-lenis-prevent` ở outer wrapper; `App.tsx` và `LandingPagePreview.tsx` sử dụng `overflow-x-clip` để bảo toàn cuộn dọc của `window`.

- [ ] **Step 1: Cập nhật failing test trong `tests/scrollBehavior.test.ts`**

```ts
// tests/scrollBehavior.test.ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

describe('LandingPagePreview scroll compatibility', () => {
  it('outer wrapper của LandingPagePreview KHÔNG được chứa data-lenis-prevent để không chặn cuộn trang chính', () => {
    const src = readFileSync('src/components/LandingPage/LandingPagePreview.tsx', 'utf8');
    // Kiểm tra dòng định nghĩa wrapper đầu của return
    const match = src.match(/return\s*\(\s*<div([^>]*)>/);
    expect(match).toBeTruthy();
    expect(match![1]).not.toContain('data-lenis-prevent');
  });

  it('LandingPagePreview và App sử dụng overflow-x-clip để tránh kích hoạt context overflow-y độc lập', () => {
    const appSrc = readFileSync('src/App.tsx', 'utf8');
    const previewSrc = readFileSync('src/components/LandingPage/LandingPagePreview.tsx', 'utf8');
    expect(appSrc).toContain('overflow-x-clip');
    expect(previewSrc).toContain('overflow-x-clip');
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận FAIL**

Run: `npm --prefix ChillFlow_Repo test tests/scrollBehavior.test.ts`
Expected: FAIL vì `LandingPagePreview` hiện tại vẫn có `data-lenis-prevent` và chưa có `overflow-x-clip`.

- [ ] **Step 3: Chỉnh sửa `LandingPagePreview.tsx` và `App.tsx`**

1. Trong `src/components/LandingPage/LandingPagePreview.tsx` (dòng ~359):
```tsx
// TRƯỚC:
<div data-lenis-prevent className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans pb-24 overflow-x-hidden">

// SAU:
<div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans pb-24 overflow-x-clip">
```

2. Trong `src/App.tsx` (dòng ~308):
```tsx
// TRƯỚC:
<div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans overflow-x-hidden">

// SAU:
<div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans overflow-x-clip">
```

- [ ] **Step 4: Chạy test để xác nhận PASS**

Run: `npm --prefix ChillFlow_Repo test tests/scrollBehavior.test.ts`
Expected: PASS.

- [ ] **Step 5: Chạy toàn bộ test suite để đảm bảo không hồi quy**

Run: `npm --prefix ChillFlow_Repo test`
Expected: 118+ tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/LandingPage/LandingPagePreview.tsx src/App.tsx tests/scrollBehavior.test.ts
git commit -m "fix(scroll): remove data-lenis-prevent from full page preview and use overflow-x-clip"
```

---

### Task 2: Countdown Timer Trong Suốt, Bỏ Viền & Căn Giữa Dấu 2 Chấm Với Số

**Files:**
- Modify: `src/components/CountdownTimer.tsx`
- Create: `tests/countdownDesign.test.ts`

**Interfaces:**
- Consumes: `CountdownTimerProps` (`targetDate`, `size`, `align`, `label`, `variant`, `showLabels`)
- Produces: UI timer trong suốt mặc định (`variant = 'transparent'`), không viền khung bao bọc, dấu 2 chấm căn chính giữa theo chiều cao của chữ số.

- [ ] **Step 1: Viết test trong `tests/countdownDesign.test.ts`**

```ts
// tests/countdownDesign.test.ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

describe('CountdownTimer design specifications', () => {
  it('default variant phải là transparent để không có viền bao quanh số', () => {
    const src = readFileSync('src/components/CountdownTimer.tsx', 'utf8');
    expect(src).toMatch(/variant\s*=\s*'transparent'/);
  });

  it('dấu 2 chấm hoặc dấu phân cách nằm trong container căn giữa theo số và có class dịch lên tâm số', () => {
    const src = readFileSync('src/components/CountdownTimer.tsx', 'utf8');
    // Phải có căn chỉnh dấu phân cách theo chiều cao số
    expect(src).toContain('separator');
  });

  it('nhãn thời gian nằm tách biệt ở dưới các con số', () => {
    const src = readFileSync('src/components/CountdownTimer.tsx', 'utf8');
    expect(src).toContain('unit.label');
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận FAIL**

Run: `npm --prefix ChillFlow_Repo test tests/countdownDesign.test.ts`
Expected: FAIL.

- [ ] **Step 3: Cập nhật `src/components/CountdownTimer.tsx`**

Cập nhật `CountdownTimer.tsx`:
1. Đổi `variant = 'transparent'` làm giá trị mặc định.
2. Loại bỏ các viền hộp/card bao quanh số trong chế độ transparent: giữ nguyên chữ số `tabular-nums font-black font-mono` to rõ ràng, không viền viền, không nền trắng đục.
3. Thiết kế cấu trúc phân tầng:
   - Hàng số và dấu phân cách: Mỗi cột thời gian gồm cụm số ở trên, dấu phân cách được đặt cạnh cụm số ở cùng cấp độ chiều cao.
   - Dấu 2 chấm: Thiết kế dạng 2 chấm tròn cân đối (`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-400 dark:bg-slate-500`) hoặc ký tự `:` được căn giữa chính xác với tâm số học (center of numbers).
   - Nhãn thời gian ("NGÀY", "GIỜ", "PHÚT", "GIÂY") đặt ngay bên dưới số của từng cột, hoàn toàn không ảnh hưởng đến vị trí chiều cao của dấu phân cách.

- [ ] **Step 4: Chạy test để xác nhận PASS**

Run: `npm --prefix ChillFlow_Repo test tests/countdownDesign.test.ts`
Expected: PASS.

- [ ] **Step 5: Kiểm tra các Hero sử dụng CountdownTimer**

Chạy: `npm --prefix ChillFlow_Repo test`
Expected: Toàn bộ tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/CountdownTimer.tsx tests/countdownDesign.test.ts
git commit -m "feat(countdown): transparent borderless numbers with vertically centered colons"
```

---

### Task 3: Tinh Chỉnh Câu Từ Tiếng Việt Tự Nhiên (Copywriting Polish)

**Files:**
- Modify: `src/components/LandingPage/SectionCustomizerModal.tsx`
- Modify: `src/components/LandingPage/PublishModal.tsx`
- Modify: `src/components/LandingPage/LandingPagePreview.tsx`
- Create: `tests/naturalCopy.test.ts`

**Interfaces:**
- Consumes: Giao diện người dùng
- Produces: Câu từ tiếng Việt tự nhiên, loại bỏ các từ máy móc/AI.

- [ ] **Step 1: Viết test trong `tests/naturalCopy.test.ts`**

```ts
// tests/naturalCopy.test.ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

describe('Natural Vietnamese Copywriting', () => {
  it('SectionCustomizerModal không chứa "Bản xem trước trực tiếp" hay "Live Auto-sync"', () => {
    const src = readFileSync('src/components/LandingPage/SectionCustomizerModal.tsx', 'utf8');
    expect(src).not.toContain('Bản xem trước trực tiếp');
    expect(src).not.toContain('Live Auto-sync');
    expect(src).toContain('Xem trước giao diện');
    expect(src).toContain('Tự động cập nhật');
  });

  it('PublishModal sử dụng câu từ tự nhiên thay cho "Mở trang trực tiếp"', () => {
    const src = readFileSync('src/components/LandingPage/PublishModal.tsx', 'utf8');
    expect(src).not.toContain('Mở trang trực tiếp');
    expect(src).toMatch(/Xem trang sự kiện|Mở xem trang/);
  });

  it('LandingPagePreview không dùng cụm từ máy móc "sửa chữ trực tiếp và kích hoạt AI Viết lại"', () => {
    const src = readFileSync('src/components/LandingPage/LandingPagePreview.tsx', 'utf8');
    expect(src).not.toContain('sửa chữ trực tiếp và kích hoạt AI Viết lại');
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận FAIL**

Run: `npm --prefix ChillFlow_Repo test tests/naturalCopy.test.ts`
Expected: FAIL.

- [ ] **Step 3: Cập nhật câu từ trong các file**

1. `SectionCustomizerModal.tsx`:
   - Dòng 351: Thay `"Bản xem trước trực tiếp"` bằng `"Xem trước giao diện"`.
   - Dòng 355: Thay `"Live Auto-sync"` bằng `"Tự động cập nhật"`.
   - Dòng 154: Thay `"Bản thu nhỏ live cập nhật theo thao tác"` bằng `"Xem trước giao diện cập nhật theo thay đổi"`.
   - Dòng 188: Thay `"Bật/tắt để thấy trang live cập nhật trực quan bên cạnh"` bằng `"Bật/tắt các phần để xem giao diện cập nhật ngay bên cạnh"`.
   - Dòng 296: Thay `"Bản xem trước wireframe bố cục:"` bằng `"Bố cục mẫu:"`.

2. `PublishModal.tsx`:
   - Dòng 113: Thay `"Mở trang trực tiếp"` bằng `"Xem trang sự kiện"`.

3. `LandingPagePreview.tsx`:
   - Dòng 385: Thay `"Chế độ Visual CMS đang hoạt động: Rê chuột vào các tiêu đề, địa điểm hoặc tên diễn giả để sửa chữ trực tiếp. Mọi thay đổi sẽ tự động lưu! ..."` thành `"Chế độ chỉnh sửa đang bật: Nhấp vào tiêu đề, văn bản hoặc ảnh để chỉnh sửa nội dung. Mọi thay đổi sẽ tự động lưu! ..."`.
   - Dòng 455: Thay `title="Bật/Tắt chế độ Visual CMS sửa chữ trực tiếp và kích hoạt AI Viết lại"` thành `title="Bật/Tắt chế độ chỉnh sửa nội dung trực tiếp trên trang"`.
   - Dòng 458: Thay `<span>{isEditMode ? 'Sửa chữ (Đang bật)' : 'Sửa chữ (Visual CMS)'}</span>` thành `<span>{isEditMode ? 'Đang chỉnh sửa' : 'Chỉnh sửa nội dung'}</span>`.

- [ ] **Step 4: Chạy test để xác nhận PASS**

Run: `npm --prefix ChillFlow_Repo test tests/naturalCopy.test.ts`
Expected: PASS.

- [ ] **Step 5: Chạy toàn bộ test suite**

Run: `npm --prefix ChillFlow_Repo test`
Expected: Tất cả tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/LandingPage/SectionCustomizerModal.tsx src/components/LandingPage/PublishModal.tsx src/components/LandingPage/LandingPagePreview.tsx tests/naturalCopy.test.ts
git commit -m "refactor(copy): polish UI wording to natural Vietnamese and remove robotic terms"
```

---

### Task 4: Kiểm Tra Toàn Diện & Build Production

**Files:**
- Toàn bộ codebase đã sửa đổi

- [ ] **Step 1: Chạy toàn bộ test suite**

Run: `npm --prefix ChillFlow_Repo test`
Expected: 100% tests PASS không có lỗi hồi quy.

- [ ] **Step 2: Chạy kiểm tra TypeScript type-check & Build**

Run: `npm --prefix ChillFlow_Repo run build`
Expected: Build thành công không có lỗi type error.
