# Kế hoạch Tối ưu Điểm Tuyệt đối Bảng A (VibeCoding 2026) — 100/100 Điểm

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hoàn thiện và chuẩn hoá toàn bộ dự án EventFlow AI (ChillFlow) đạt điểm tối đa (100/100) trên cả 7 tiêu chí chấm điểm của Bảng A tại VibeCoding 2026 Hackathon.

**Architecture:** Bám sát chặt chẽ kiến trúc "Template-First AI Architecture" trên React 19 + TypeScript + Tailwind CSS, tích hợp Google Gemini 1.5 Flash với Structured Output JSON và Offline Smart Engine, bổ sung bộ minh chứng Vibe Coding và quy trình kiểm thử/xử lý lỗi nghiệp vụ hoàn chỉnh.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Google Gemini 1.5 Flash REST API, Vercel SPA Rewrites, Docker Multi-stage Nginx.

**Spec:** Barem chấm điểm chính thức Bảng A VibeCoding 2026.

---

## Bảng Đối Soát 7 Tiêu Chí Bảng A & Hiện Trạng Dự Án

| Tiêu chí | Điểm | Yêu cầu Bảng A | Hiện trạng ChillFlow | Điểm kỳ vọng |
| :--- | :---: | :--- | :--- | :---: |
| **1. Hoàn thành chức năng & độ đúng nghiệp vụ** | 25 | 5 tính năng hoàn chỉnh, luồng xuyên suốt, đúng nghiệp vụ chuyển đổi | Đủ 5 tính năng: AI Event Generator, Multi-Archetype Template-First, Visual CMS & AI Rewrite, CRO Scorecard & A/B Test, Publishing & Standalone HTML Exporter | 25/25 |
| **2. Thiết kế kỹ thuật & chất lượng mã nguồn** | 20 | Code có cấu trúc, dữ liệu nhất quán, an toàn cơ bản, công nghệ phù hợp | React 19 + TS strict, Clean modular architecture, Security headers, Zero XSS | 20/20 |
| **3. Tích hợp AI & kiểm soát đầu ra** | 15 | AI thật phù hợp đầu vào; kiểm soát kết quả rõ ràng (Mock tối đa 4/15) | Gemini 1.5 Flash AI thật + Strict JSON Schema + Văn phong tiếng Việt tự nhiên + Smart Fallback Engine | 15/15 |
| **4. Kiểm thử độ ổn định & xử lý lỗi** | 15 | Kiểm tra chặn dữ liệu sai, xử lý sự cố hợp lý, không crash app | Inline form validation thay alert, Toast trạng thái AI thật vs Fallback, E2E test | 15/15 |
| **5. Làm chủ Vibe Coding & phản biện kỹ thuật** | 15 | Minh chứng dùng AI, hiểu và giải thích được sản phẩm, phản biện kỹ thuật | Tài liệu Vibe Coding Showcase, Prompt Logs, Bộ câu hỏi phản biện kỹ thuật (Defense Q&A) | 15/15 |
| **6. Giao diện & trải nghiệm người dùng** | 5 | Dễ thao tác, dễ đọc, mượt mà trên mobile (375px) | Giao diện Awwwards-grade, Dark/Light mode, Kinetic Typography, Smooth scroll | 5/5 |
| **7. Triển khai & bàn giao** | 5 | Link online, source repo, hướng dẫn chạy trong 2 phút, video demo | GitHub repo clean, Vercel SPA ready, Dockerfile multi-stage, README chuẩn nộp bài | 5/5 |
| **TỔNG CỘNG** | **100** | | | **100/100** |

---

## Global Constraints

- Không làm phá vỡ logic giao diện hoặc các archetype đã hoạt động ổn định.
- Giữ nguyên cơ chế Zero-Backend: Toàn bộ dữ liệu lưu trữ phía client (localStorage) và gọi trực tiếp Gemini REST endpoint an toàn.
- Không để lộ secret / API key trong git history.
- Thông điệp lỗi và giao diện phải dùng tiếng Việt tự nhiên chuẩn văn phong Sentence case.

## Review Focus

1. **AI Indicator:** Giám khảo cần thấy rõ khi nào hệ thống đang gọi AI thật (Gemini) và khi nào dùng Fallback Engine, tránh bị đánh đồng là "chỉ dùng Mock" (bị trần 4/15 điểm).
2. **Form Validation:** Thay thế hộp thoại `alert()` truyền thống bằng Inline Error UI chuyên nghiệp, chặn ngày trong quá khứ và số lượng vé âm/không hợp lệ.
3. **Security Headers:** Bổ sung các header bảo mật HTTP trong `vercel.json` và `nginx.conf` (X-Content-Type-Options, X-Frame-Options, Referrer-Policy).
4. **Tài liệu nộp bài (README.md & Showcase):** Viết lại `README.md` từ đầu để làm nổi bật 5 tính năng và hướng dẫn chạy trong 2 phút cho ban giám khảo.
5. **Kịch bản phản biện kỹ thuật (Defense Q&A):** Soạn sẵn bộ câu hỏi - câu trả lời sắc bén để đội thi thuyết trình và phản biện trước hội đồng giám khảo.

---

### Task 1: Nâng cấp Kiểm thử dữ liệu sai & Xử lý lỗi (Tiêu chí 4 — 15 điểm)

**Files:**
- Modify: `src/components/EventInputForm.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Input validation: Chặn khi thiếu trường bắt buộc, ngày sự kiện sai định dạng hoặc trong quá khứ, sức chứa <= 0.
- Toast feedback: Hiển thị trạng thái "Đang kết nối Gemini AI...", "AI đã sinh nội dung thành công", hoặc thông báo fallback thân thiện khi không có API key.

- [x] **Step 1: Viết logic validation và state thông báo lỗi inline trong EventInputForm**
- [x] **Step 2: Loại bỏ hoàn toàn browser `alert()` và thay bằng component thông báo lỗi trực quan trên form**
- [x] **Step 3: Bổ sung toast indicator trong App.tsx khi gọi AI thật thành công**
- [x] **Step 4: Kiểm tra build và xác nhận không có lỗi TypeScript**

---

### Task 2: Củng cố Tích hợp AI thật & Kiểm soát đầu ra (Tiêu chí 3 — 15 điểm)

**Files:**
- Modify: `src/services/aiService.ts`
- Modify: `src/components/ApiKeyModal.tsx`

**Interfaces:**
- Đảm bảo `aiService.ts` trả về thông tin rõ ràng về nguồn dữ liệu (`source: 'gemini-api' | 'smart-fallback'`).
- Hiển thị badge trực quan trên Header: "Chế độ: Gemini 1.5 Flash (AI Thật)" khi có key, hoặc "Chế độ: Smart Engine (Offline)" để minh bạch 100% với ban giám khảo.

- [x] **Step 1: Cập nhật hàm generateLandingPageContent trả về metadata nguồn sinh (Gemini vs Fallback)**
- [x] **Step 2: Bổ sung Badge trạng thái AI Engine trên thanh Header**
- [x] **Step 3: Kiểm tra luồng fallback khi API key bị lỗi hoặc mất mạng**

---

### Task 3: Tăng cường Bảo mật cơ bản & Security Headers (Tiêu chí 2 — 20 điểm)

**Files:**
- Modify: `vercel.json`
- Modify: `nginx.conf`

**Interfaces:**
- Thêm các Security Headers chuẩn OWASP: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.

- [x] **Step 1: Bổ sung khối "headers" vào vercel.json**
- [x] **Step 2: Bổ sung các directive security headers vào nginx.conf**
- [x] **Step 3: Kiểm tra cấu hình cú pháp JSON và Nginx**

---

### Task 4: Xây dựng Tài liệu Bàn giao & Hướng dẫn Chạy (Tiêu chí 7 — 5 điểm)

**Files:**
- Modify: `README.md`

**Interfaces:**
- Giới thiệu tổng quan sản phẩm và bảng đối soát 5 tính năng cốt lõi theo đúng barem Bảng A.
- Hướng dẫn chạy nhanh trong 2 bước với `npm` và `docker`.
- Hướng dẫn lấy và cấu hình Google Gemini API Key miễn phí.
- Kiến trúc thư mục và sơ đồ hoạt động.

- [x] **Step 1: Soạn thảo README.md chuyên nghiệp chuẩn bài thi Hackathon**
- [x] **Step 2: Kiểm tra liên kết và định dạng markdown**

---

### Task 5: Soạn thảo Bộ Minh chứng Vibe Coding & Kịch bản Phản biện Kỹ thuật (Tiêu chí 5 — 15 điểm)

**Files:**
- Create: `docs/VIBE_CODING_SHOWCASE.md`
- Create: `docs/DEFENSE_QA.md`

**Interfaces:**
- Minh chứng quá trình Vibe Coding: Prompt system, Structured JSON Schemas, cách dùng AI hỗ trợ kiến trúc "Template-First".
- Bộ câu hỏi phản biện kỹ thuật (Defense Q&A) sẵn sàng cho đội thi thuyết trình trước hội đồng giám khảo.
- Kịch bản quay video demo (3-5 phút) chuẩn barem.

- [x] **Step 1: Tạo docs/VIBE_CODING_SHOWCASE.md ghi nhận minh chứng sử dụng AI và quy trình phát triển**
- [x] **Step 2: Tạo docs/DEFENSE_QA.md với các câu trả lời phản biện xuất sắc về kiến trúc kỹ thuật**
- [x] **Step 3: Rà soát toàn bộ tài liệu và đối chiếu barem Bảng A**
