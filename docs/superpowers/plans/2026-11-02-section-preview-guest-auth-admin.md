# Section Visual Preview, Guest-First Cloud Sync, and Organizer Admin Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng bộ ba tính năng đột phá cho ChillFlow: (1) Bản xem trước bố cục Section trực quan (Visual Wireframe Preview), (2) Hệ thống lưu trữ nhiều Landing Page theo mô hình Guest-First kết hợp Cloud Sync Supabase BaaS, và (3) Trang Dashboard Quản trị Sự kiện & Phân tích Chuyển đổi (Event Organizer Admin).

**Architecture:** 
- **Tầng giao diện (UI/UX):** Bổ sung `SectionWireframePreview` hiển thị mockup wireframe đồ họa thu nhỏ (mini-wireframe) khi tùy biến layout; xây dựng trang `OrganizerDashboard` chuyên nghiệp chuyển đổi mượt mà với Builder qua Header navigation.
- **Tầng dữ liệu (Storage & Sync):** Triển khai kiến trúc Local-First thông qua `projectStorageService` (lưu trữ đa dự án vào `localStorage`/`IndexedDB` không cần login), mở rộng kết nối Supabase BaaS Client (`supabaseService`) hỗ trợ đồng bộ đám mây và Google Auth 1-click mà không làm gián đoạn trải nghiệm người dùng chưa đăng nhập.
- **Tầng phân tích (Analytics & Management):** Tính toán trực tiếp CRO KPIs, tỷ lệ chuyển đổi vé, và quản trị người tham dự (lọc, tìm kiếm, xuất CSV, check-in QR).

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Lucide React, Zustand, Vitest, Supabase JS Client (optional BaaS layer).

**Spec:** Phân tích kiến trúc Đề thi 08 (Bảng A — Vibe Coding 2026), kết hợp cơ chế Zero-Friction Guest-First và tài liệu `docs/DEFENSE_QA.md`.

---

## Global Constraints

- Không bắt buộc đăng nhập để tạo, lưu và chỉnh sửa Landing Page (Cơ chế Guest-First 100% Zero-Friction).
- Không tự dựng custom backend server (Node/Express/Nest) để tránh lỗi bảo mật và rủi ro cold-start khi BGK chấm thi. Sử dụng BaaS (Supabase) với graceful fallback khi chưa có API keys.
- Tương thích hoàn toàn với 97 unit tests hiện có và duy trì tốc độ chạy test dưới 10s.
- Giao diện đáp ứng (Responsive) tuyệt đối từ 375px (Mobile) đến 1440px (Desktop), hỗ trợ cả Light & Dark mode.
- Giữ nguyên cơ chế Undo/Redo (`Ctrl+Z` / `Ctrl+Y`) và In-place Visual CMS.

---

## Review Focus

1. **Section Preview Rendering:** Khi chuyển đổi giữa các loại section (Hero, Agenda, Benefits, v.v.), hình minh họa wireframe phải phản ánh đúng cấu trúc cột/thẻ tương ứng mà không làm giật khung modal.
2. **Guest Storage Isolation:** Dự án của chế độ Guest phải được lưu trữ độc lập theo ID/slug, tránh tình trạng tạo trang mới ghi đè mất trang cũ.
3. **Cloud Sync Graceful Fallback:** Khi chưa cấu hình biến môi trường Supabase (`VITE_SUPABASE_URL`), nút "Đồng bộ Cloud" phải hiển thị thông báo hướng dẫn hoặc lưu offline êm đẹp, tuyệt đối không văng exception làm trắng màn hình.
4. **Attendee Status & Capacity Bounds:** Khi cập nhật trạng thái người tham dự trong trang Admin (Đã xác nhận / Check-in / Hủy vé), số lượng vé còn lại phải cập nhật tức thì và không bị âm.
5. **CSV Export Encoding:** File CSV xuất từ Dashboard Admin phải chứa UTF-8 BOM (`\uFEFF`) để Excel trên Windows hiển thị đúng tiếng Việt không bị lỗi font chữ.

---

### Task 1: Section Layout Visual Preview & Wireframe Picker

**Files:**
- Create: `src/components/LandingPage/SectionWireframePreview.tsx`
- Modify: `src/components/LandingPage/SectionCustomizerModal.tsx:1-240`
- Modify: `src/types/index.ts:1-250`
- Test: `tests/sectionLayoutPreview.test.ts`

**Interfaces:**
- Consumes: `SectionVisibilityConfig`, `SectionDef` from `src/types/index.ts`
- Produces: 
  - `SectionWireframePreview: React.FC<{ sectionKey: string; layoutVariant?: string; isSelected?: boolean; className?: string }>`
  - `getSectionLayoutMetadata(sectionKey: string): { title: string; layouts: { id: string; label: string; wireframeType: string; description: string; croTip: string }[] }`

- [ ] **Step 1: Write the failing test**

Tạo file `tests/sectionLayoutPreview.test.ts` kiểm tra:
1. `getSectionLayoutMetadata` trả về đúng danh sách các biến thể bố cục (layouts) và CRO tip cho từng section (`hero`, `benefits`, `agenda`, `speaker`, `gallery`, `faq`).
2. Xác thực cấu trúc wireframe type (`split`, `centered`, `grid-3`, `timeline`, `masonry`, `accordion`).

```typescript
import { describe, it, expect } from 'vitest';
import { getSectionLayoutMetadata } from '../src/components/LandingPage/SectionWireframePreview';

describe('Section Layout Preview & Wireframe Metadata', () => {
  it('returns valid layout options and CRO recommendations for key sections', () => {
    const heroMeta = getSectionLayoutMetadata('hero');
    expect(heroMeta.layouts.length).toBeGreaterThanOrEqual(2);
    expect(heroMeta.layouts[0]).toHaveProperty('wireframeType');
    expect(heroMeta.layouts[0]).toHaveProperty('croTip');

    const agendaMeta = getSectionLayoutMetadata('agenda');
    expect(agendaMeta.layouts.some(l => l.wireframeType === 'timeline')).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/sectionLayoutPreview.test.ts` (trong thư mục `ChillFlow_Repo`)
Expected: FAIL với lỗi "Cannot find module" hoặc "getSectionLayoutMetadata is not a function".

- [ ] **Step 3: Implement `SectionWireframePreview.tsx` & enhance `SectionCustomizerModal.tsx`**

1. Viết `SectionWireframePreview.tsx`:
   - Vẽ các SVG mini-wireframes tinh tế đại diện cho từng kiểu bố cục:
     - `hero-split`: Cột trái text/CTA + Cột phải visual/countdown card.
     - `hero-centered`: Khối trung tâm căn giữa + pill đếm ngược + dual button.
     - `benefits-grid`: 3 ô bento card với icon và thanh tiến độ.
     - `agenda-timeline`: Trục thời gian zíc-zắc kèm laser dot.
     - `speaker-card`: Chân dung kèm badge chức danh và mạng xã hội.
     - `gallery-bento`: Bố cục ảnh bất đối xứng 2x2.
   - Thêm tooltip hover hiển thị CRO Tip (ví dụ: *"Bố cục Split tăng 18% tỉ lệ click CTA trên Desktop"*).
2. Tích hợp trực tiếp vào `SectionCustomizerModal.tsx`:
   - Bên cạnh nút bật/tắt (Toggle Switch), bổ sung tab/accordion mở rộng "Xem trước bố cục" (Preview & Layout Switcher) giúp người dùng nhìn thấy ngay hình dung trực quan trước khi chốt giao diện.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/sectionLayoutPreview.test.ts`
Expected: PASS 100%.

- [ ] **Step 5: Commit**

```bash
git add src/components/LandingPage/SectionWireframePreview.tsx src/components/LandingPage/SectionCustomizerModal.tsx tests/sectionLayoutPreview.test.ts
git commit -m "feat: add visual section layout wireframe previews and interactive selector"
```

---

### Task 2: Guest-First Multi-Landing-Page Storage & Cloud Sync (Local + Supabase BaaS)

**Files:**
- Create: `src/services/projectStorageService.ts`
- Create: `src/services/supabaseService.ts`
- Create: `src/components/MyProjectsModal.tsx`
- Modify: `src/components/Header.tsx:1-254`
- Modify: `src/App.tsx:1-382`
- Test: `tests/multiProjectStorage.test.ts`
- Test: `tests/cloudSyncService.test.ts`

**Interfaces:**
- Consumes: `EventInput`, `GeneratedContent`, `CROEvaluation` from `src/types/index.ts`
- Produces:
  - `SavedProject { id: string; slug: string; name: string; category: string; updatedAt: string; input: EventInput; content: GeneratedContent; cro: CROEvaluation; syncStatus: 'local' | 'synced' | 'pending' }`
  - `getAllSavedProjects(): SavedProject[]`
  - `saveProject(project: Omit<SavedProject, 'id' | 'updatedAt'>, existingId?: string): SavedProject`
  - `deleteProject(id: string): boolean`
  - `cloneProject(id: string): SavedProject | null`
  - `syncProjectsToCloud(userId: string): Promise<{ success: boolean; syncedCount: number; message: string }>`

- [ ] **Step 1: Write the failing tests**

Tạo file `tests/multiProjectStorage.test.ts` và `tests/cloudSyncService.test.ts`:
1. Kiểm tra lưu trữ nhiều landing page độc lập mà không bị ghi đè.
2. Kiểm tra thao tác nhân bản (Clone) tạo ra bản sao với tên mới `[Bản sao] ...` và ID mới.
3. Kiểm tra graceful offline fallback khi không có kết nối Supabase Cloud.

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { getAllSavedProjects, saveProject, cloneProject, deleteProject } from '../src/services/projectStorageService';

describe('Guest-First Multi-Project Storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and retrieves multiple landing pages for guests without login', () => {
    saveProject({
      slug: 'ai-summit-2026',
      name: 'AI Summit 2026',
      category: 'ai-tech',
      input: { eventName: 'AI Summit 2026' } as any,
      content: { hero: { title: 'Tương lai AI' } } as any,
      cro: { overallScore: 92 } as any,
      syncStatus: 'local'
    });

    saveProject({
      slug: 'growth-masterclass',
      name: 'Growth Masterclass',
      category: 'marketing',
      input: { eventName: 'Growth Masterclass' } as any,
      content: { hero: { title: 'Bứt phá doanh số' } } as any,
      cro: { overallScore: 88 } as any,
      syncStatus: 'local'
    });

    const projects = getAllSavedProjects();
    expect(projects.length).toBe(2);
    expect(projects[0].name).toBe('Growth Masterclass'); // Latest first
  });

  it('clones an existing project with a unique ID and cloned title', () => {
    const original = saveProject({
      slug: 'original-event',
      name: 'Original Event',
      category: 'startup',
      input: { eventName: 'Original Event' } as any,
      content: {} as any,
      cro: { overallScore: 90 } as any,
      syncStatus: 'local'
    });

    const cloned = cloneProject(original.id);
    expect(cloned).not.toBeNull();
    expect(cloned?.id).not.toBe(original.id);
    expect(cloned?.name).toContain('Bản sao');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/multiProjectStorage.test.ts`
Expected: FAIL với lỗi file hoặc hàm chưa tồn tại.

- [ ] **Step 3: Implement `projectStorageService.ts`, `supabaseService.ts`, and `MyProjectsModal.tsx`**

1. `src/services/projectStorageService.ts`:
   - Lưu trữ mảng `SavedProject[]` vào `localStorage` key `convertflow_saved_projects`.
   - Cung cấp CRUD đầy đủ: `getAllSavedProjects`, `saveProject`, `getProjectById`, `deleteProject`, `cloneProject`.
   - Tự động đồng bộ dự án hiện tại mỗi khi AI sinh trang hoặc khi người dùng chỉnh sửa In-place CMS.
2. `src/services/supabaseService.ts`:
   - Kiểm tra `import.meta.env.VITE_SUPABASE_URL` và `import.meta.env.VITE_SUPABASE_ANON_KEY`.
   - Nếu có: hỗ trợ đăng nhập 1-click Google OAuth và đồng bộ bảng `landing_pages`.
   - Nếu không có (hoặc offline): trả về thông báo an toàn, hiển thị trạng thái "Chế độ Local-First (Offline Ready)" thay vì gây lỗi.
3. `src/components/MyProjectsModal.tsx`:
   - Hiển thị danh sách các landing page dưới dạng lưới thẻ (Grid Cards) với:
     - Badge danh mục & điểm CRO.
     - Thời gian chỉnh sửa gần nhất.
     - Thao tác: **Chỉnh sửa tiếp** (Tải vào editor), **Nhân bản**, **Xem trang công khai**, **Xóa**.
     - Nút "Đồng bộ lên Cloud" ở góc trên với thông báo minh bạch.
4. Tích hợp nút mở modal "Dự án của tôi" lên thanh `Header.tsx` (icon Folder / Library với bộ đếm số lượng dự án).

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/multiProjectStorage.test.ts tests/cloudSyncService.test.ts`
Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/services/projectStorageService.ts src/services/supabaseService.ts src/components/MyProjectsModal.tsx src/components/Header.tsx src/App.tsx tests/multiProjectStorage.test.ts tests/cloudSyncService.test.ts
git commit -m "feat: add guest-first multi-landing-page storage and optional supabase cloud sync"
```

---

### Task 3: Event Organizer Dashboard & CRO Analytics (Admin Page)

**Files:**
- Create: `src/components/Admin/OrganizerDashboard.tsx`
- Create: `src/components/Admin/AnalyticsSummaryCards.tsx`
- Create: `src/components/Admin/AttendeeTablePro.tsx`
- Modify: `src/components/Header.tsx:1-254`
- Modify: `src/App.tsx:1-382`
- Test: `tests/organizerDashboard.test.ts`

**Interfaces:**
- Consumes: `SavedProject`, `Attendee`, `CROEvaluation`
- Produces:
  - `OrganizerDashboard: React.FC<{ activeProject: SavedProject | null; attendees: Attendee[]; onBackToBuilder: () => void; onUpdateAttendees: (updated: Attendee[]) => void }>`
  - `calculateEventKpis(attendees: Attendee[], capacity: number, pageViews: number): { conversionRate: number; seatsLeft: number; earlyBirdRatio: number }`

- [ ] **Step 1: Write the failing test**

Tạo file `tests/organizerDashboard.test.ts` kiểm tra:
1. `calculateEventKpis` tính đúng tỷ lệ chuyển đổi (`attendees / views * 100`) và số chỗ ngồi còn lại (`capacity - attendees`).
2. Lọc danh sách người tham dự theo loại vé (Early Bird vs Standard).
3. Tìm kiếm người tham dự không phân biệt hoa thường theo tên hoặc email.

```typescript
import { describe, it, expect } from 'vitest';
import { calculateEventKpis, filterAttendees } from '../src/components/Admin/OrganizerDashboard';
import type { Attendee } from '../src/types';

describe('Organizer Admin Dashboard Calculations & Filtering', () => {
  const mockAttendees: Attendee[] = [
    { id: '1', fullName: 'Lê Hoàng Nam', email: 'nam@gmail.com', phone: '0901234567', registeredAt: '2026-11-01', ticketType: 'early-bird' },
    { id: '2', fullName: 'Trần Hương Giang', email: 'giang@tech.vn', phone: '0987654321', registeredAt: '2026-11-01', ticketType: 'standard' }
  ];

  it('calculates correct conversion rate and capacity balance', () => {
    const kpis = calculateEventKpis(mockAttendees, 100, 50);
    expect(kpis.conversionRate).toBe(4); // 2 / 50 * 100 = 4%
    expect(kpis.seatsLeft).toBe(98);
  });

  it('filters attendees by search keyword and ticket type', () => {
    const resultSearch = filterAttendees(mockAttendees, 'hoàng', 'all');
    expect(resultSearch.length).toBe(1);
    expect(resultSearch[0].fullName).toBe('Lê Hoàng Nam');

    const resultType = filterAttendees(mockAttendees, '', 'early-bird');
    expect(resultType.length).toBe(1);
    expect(resultType[0].ticketType).toBe('early-bird');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/organizerDashboard.test.ts`
Expected: FAIL với lỗi hàm chưa tồn tại.

- [ ] **Step 3: Implement Organizer Admin Dashboard components**

1. `src/components/Admin/AnalyticsSummaryCards.tsx`:
   - 4 thẻ KPI nổi bật:
     - **Tổng lượt xem trang (Total Views):** Có biểu đồ mini trend SVG.
     - **Số lượng vé đã đặt (Registrations / Capacity):** Thanh tiến độ tỷ lệ lấp đầy hội trường (Fullness %).
     - **Tỷ lệ chuyển đổi CRO thực tế (Conversion Rate %):** So sánh với mức chuẩn trung bình ngành (Industry Benchmark 3.5%).
     - **Điểm chất lượng chuyển đổi (CRO Health Score):** Lấy từ bộ đánh giá tự động của ChillFlow.
2. `src/components/Admin/AttendeeTablePro.tsx`:
   - Bộ lọc tab: Tất cả / Vé Early Bird / Vé Tiêu Chuẩn / Vé VIP.
   - Thanh tìm kiếm tức thì theo Tên, Email, Số điện thoại.
   - Thao tác:
     - Nút đánh dấu "Đã Check-in" (Check-in Toggle với mã QR vé).
     - Nút "Hủy vé / Xóa".
     - Nút "Xuất file CSV" chuẩn tiếng Việt UTF-8 BOM.
3. `src/components/Admin/OrganizerDashboard.tsx`:
   - Tổ chức layout toàn trang dashboard quản trị.
   - Bổ sung nút quay lại "Quay về trình thiết kế (Back to Builder)".
4. Cập nhật `Header.tsx` & `App.tsx`:
   - Thêm tab chuyển đổi "Quản trị sự kiện (Admin)" ngay trên thanh điều hướng trung tâm cạnh "Xem trang" và "Chỉnh sửa".

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/organizerDashboard.test.ts`
Expected: PASS 100%.

- [ ] **Step 5: Run full test suite to guarantee zero regression**

Run: `npm test`
Expected: Tất cả 19 test files cũ + 3 test files mới đều PASS trọn vẹn (khoảng 105+ tests).

- [ ] **Step 6: Commit**

```bash
git add src/components/Admin/ tests/organizerDashboard.test.ts src/components/Header.tsx src/App.tsx
git commit -m "feat: implement organizer admin dashboard with cro analytics and attendee management pro"
```
