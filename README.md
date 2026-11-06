# ChillFlow — Cuộc thi Vibe Coding 2026

> Nền tảng tạo và tối ưu hóa Event Landing Page tự động bằng AI, ứng dụng kiến trúc Template-First chuẩn Awwwards, Hybrid AI Proxy và tâm lý học chuyển đổi (CRO).

## 1. Thông tin chung

| Hạng mục | Nội dung |
|---|---|
| Tên đội thi | Chillandcode |
| Bảng thi | Bảng A - Công nghệ |
| Đề bài bốc thăm | Đề số `08` — `Tạo landing page sự kiện trong 5 phút` |
| Demo online | https://chill-flow-xi.vercel.app/ |
| Video demo (≤ 02 phút) | `<URL video demo YouTube hoặc Google Drive>` |
| Source ZIP | `<URL tải gói mã nguồn ZIP hoặc tệp đính kèm>` |
| Minh chứng dùng AI | Kèm tại Mục 10 và chi tiết tại [`docs/VIBE_CODING_SHOWCASE.md`](docs/VIBE_CODING_SHOWCASE.md) |
| Bảng kiểm thử | Kèm tại Mục 11 (6 ca kiểm thử chuẩn Bảng A) & 198 Unit Tests tự động (41 test suites) |

> Tiêu chí vòng loại: https://vibecoding.info.vn/tieu-chi-cham-thi  
> Bảng A: ít nhất 6 ca kiểm thử; chỉ dùng Mock thì nhóm A3 tối đa 4/15 điểm.  
> Không đưa khóa API hoặc mật khẩu vào bài nộp.

---

## 2. Tính năng chính

- **Tính năng 1 (Nhập dữ liệu đầu vào & 5 Presets 1-Click):** Nhập thông tin sự kiện linh hoạt (Tên sự kiện, thời gian, địa điểm, diễn giả, quyền lợi Early Bird, sĩ số tối đa) hoặc chọn nhanh 1-click từ 5 bộ mẫu preset thực tế (AI Summit, Growth Masterclass, Startup Demo Day, Design & CRO, Cinematic 3D Studio). Bộ phân loại thông minh tự động gán nhãn sự kiện vào 1 trong 12 danh mục chuyên biệt (`ai-tech`, `marketing`, `startup`, `developer`, `design`, `education`, `studio-3d`, `festival-music`, `sports-marathon`, `culinary-lifestyle`, `community-career`, `universal-showcase`).
- **Tính năng 2 (AI phân tích, sinh nội dung & chấm điểm CRO):** Kết nối mô hình Google Gemini 3.5 Flash qua Serverless AI Proxy & Smart Offline Engine, tự động sinh trọn bộ tiêu đề chuyển đổi cao (Sentence Case tự nhiên), lợi ích cốt lõi, khung chương trình (Agenda), FAQ và bản sao CTA. Hệ thống tự động đánh giá và chấm điểm CRO [0-100] (Urgency, Headline, Clarity, Authority, SEO/Schema, WCAG Contrast) kèm gợi ý cải thiện theo tâm lý học hành vi.
- **Tính năng 3 (Lưu / xem / xoá lịch sử & Quản lý người đăng ký):** Quản lý trạng thái tập trung với **Zustand Store**, hỗ trợ lịch sử hoàn tác/làm lại (**Undo / Redo** với phím tắt `Ctrl+Z` / `Ctrl+Y`). Tự động lưu trữ nhiều dự án vào `localStorage` (hỗ trợ tạo mới, đổi tên, nhân bản, xoá). Cung cấp màn hình quản trị danh sách người đăng ký vé (Attendee Modal) hỗ trợ tìm kiếm, lọc, xem vé điện tử, xuất danh sách CSV và xoá người đăng ký.
- **Tính năng 4 (Visual CMS & Trợ lý AI Viết lại trực tiếp trên trang):** Cho phép người dùng nhấp chuột và chỉnh sửa bất kỳ đoạn văn bản nào trực tiếp trên giao diện hiển thị (In-place Visual CMS); tích hợp thanh công cụ AI Rewrite nổi (Floating Toolbar) hỗ trợ viết lại câu chữ theo 3 phong cách chuyên sâu ("Ngắn gọn", "Kích thích khẩn cấp - FOMO", "Sang trọng - Luxury") với độ trễ 0ms.
- **Tính năng 5 (Xuất bản đa nền tảng, Chuẩn hoá SEO JSON-LD & Trình xuất HTML độc lập):** Xuất bản trang sự kiện với đường dẫn chia sẻ công khai qua Client-side Hash Routing (`/#/p/:slug`), tự động nhúng mã **JSON-LD Structured Data Schema (`@type: "Event"`)** và thẻ OpenGraph Meta tags; tích hợp hiệu ứng thông báo mua vé thời gian thực (Social Proof Ticker), cửa sổ giữ chân khi rời trang (Exit-Intent Modal) và tính năng xuất mã nguồn Standalone Single-File HTML tự chứa toàn bộ CSS/JS để chạy offline mà không phụ thuộc bất kỳ máy chủ nào.

---

## 3. Công nghệ sử dụng

| Lớp | Công nghệ (ghi đúng thứ đã dùng) |
|---|---|
| Giao diện | React (v19.3.1) + Tailwind CSS (v3.4.19) |
| Thư viện | Lucide React (v1.61.0), Framer Motion (v14.6.0), Lenis (v1.3.27), Canvas-Confetti (v1.9.4), Clsx & Tailwind-Merge |
| Quản lý State | Zustand (v5) với cơ chế History Stack Undo/Redo (`Ctrl+Z` / `Ctrl+Y`) |
| Kiểm thử tự động | Vitest (v5.0.5) — 198 unit tests (41 test suites) bao phủ toàn diện từ AI Proxy, CRO Engine, Theme Archetypes, Visual CMS, Anti-Spam, XSS Prevention đến Single-File Exporter |
| Linter & Typecheck | Oxlint (v1.88.0) + TypeScript (v6.0.3) Strict Mode |
| Lưu trữ | localStorage (phía trình duyệt, kiến trúc Local-First / Zero-Backend) |
| Triển khai | Vercel (kèm Serverless AI Proxy `api/ai-proxy.ts` & Security Headers) / Docker Multi-stage |

---

## 4. Tích hợp AI

- **Chế độ đang dùng**: **API thật kết hợp Smart Fallback (Hybrid AI Proxy)**
  - **API thật**: Kết nối Google Gemini 3.5 Flash (`gemini-3.5-flash-lite`, `gemini-2.5-flash`) thông qua Serverless Proxy để bảo vệ key và hỗ trợ BYOK (Bring Your Own Key).
  - **Smart Offline Engine**: Khi chạy offline hoặc không có API Key, hệ thống tự động kích hoạt bộ sinh nội dung thông minh tích hợp sẵn, phân loại theo 12 danh mục sự kiện thực tế mà không bao giờ báo lỗi hay gián đoạn trải nghiệm người dùng.
- **Mục đích**: Phân tích thông tin sự kiện thô, cấu trúc hoá nội dung thuyết phục theo hành trình khách hàng (AIDA), đánh giá điểm CRO và hỗ trợ viết lại bản sao quảng cáo tức thì.
- **Bảo mật khoá API**: Khóa API không bao giờ bị ghi cứng trong mã nguồn client. Key phía server được lưu trong biến môi trường serverless; key của người dùng nhập (BYOK) chỉ lưu trong bộ nhớ tạm trình duyệt và truyền qua header `x-api-key`.

Biến môi trường (khi triển khai hoặc chạy local proxy):

```env
GEMINI_API_KEY=AIzaSy...
# Hoặc khi dev local (tùy chọn)
VITE_GEMINI_API_KEY=AIzaSy...
```

---

## 5. Cài đặt và chạy local

Yêu cầu: Trình duyệt hiện đại (Chrome, Edge, Brave, Safari); Node.js ≥ 18.

**Cách chạy: React + Vite**

```bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Kiểm tra chất lượng mã nguồn (Oxlint)
npm run lint

# 3. Chạy toàn bộ 198 Unit Tests tự động (Vitest)
npm test

# 4. Chạy môi trường phát triển (mặc định tại http://localhost:5173)
npm run dev

# 5. Build gói sản phẩm production ra thư mục dist/
npm run build
```

*(Tùy chọn: Khởi chạy bằng Docker)*
```bash
docker build -t chillflow-app .
docker run -d -p 3000:80 --name chillflow chillflow-app
# Truy cập tại: http://localhost:3000
```

---

## 6. Cấu trúc thư mục

```text
ChillFlow/
├── index.html                  # Điểm khởi chạy SPA, nạp Logo & Font typography
├── api/                        # Vercel Serverless Function (Hybrid AI Proxy)
│   └── ai-proxy.ts
├── public/                     # Tài nguyên tĩnh (Logo, Favicon, WebP showcase)
│   ├── logo.png                # Logo thương hiệu ChillFlow chính thức
│   ├── favicon.png             # Favicon tab trình duyệt
│   ├── backgrounds/
│   ├── brands/
│   └── showcase/
├── src/                        # Toàn bộ mã nguồn React & TypeScript
│   ├── components/             # Các thành phần giao diện (UI Components)
│   │   ├── LandingPage/        # Trình diễn Landing Page, các Archetype & Visual CMS
│   │   │   ├── heroes/         # 7 Biến thể Hero (Terminal, Conference, Masterclass...)
│   │   │   └── sections/       # 9 Biến thể Section chuyên biệt theo từng ngành
│   │   ├── magicui/            # Magic UI Registry (Particles, KineticText, NumberTicker)
│   │   ├── CROScorecard.tsx    # Bảng đánh giá CRO, SEO/Schema & WCAG Contrast
│   │   ├── EventInputForm.tsx  # Form nhập thông tin & 5 preset 1-click
│   │   ├── Header.tsx          # Thanh điều hướng, Logo & Badge trạng thái AI
│   │   └── ApiKeyModal.tsx     # Cửa sổ quản lý khoá Google Gemini API (BYOK)
│   ├── store/                  # Quản lý State tập trung (Zustand + Undo/Redo)
│   │   └── useLandingPageStore.ts
│   ├── hooks/                  # Custom hooks (ThemeMode, ScrollReveal, UndoRedo)
│   ├── services/               # Tầng xử lý logic & dịch vụ
│   │   ├── aiService.ts        # Hybrid AI Proxy, Gemini REST API & Smart Fallback
│   │   ├── themeEngine.ts      # Bảng màu 7 archetype & WCAG Contrast Audit
│   │   ├── templateRegistry.ts # Bộ phân loại 12 danh mục sự kiện tự động
│   │   ├── projectStorageService.ts # Quản lý nhiều dự án Local-First
│   │   └── storageService.ts   # Lưu trữ LocalStorage & xuất file CSV
│   └── utils/                  # Tiện ích bổ trợ
│       ├── slug.ts             # Chuẩn hoá URL Slug tiếng Việt Unicode
│       ├── seo.ts              # JSON-LD Schema (@type: "Event") & Safe Stringify
│       ├── sourceExporter.ts   # Biên dịch Standalone Single-File HTML an toàn XSS
│       ├── croCalculator.ts    # Thuật toán tính điểm CRO [0, 100]
│       ├── antiSpam.ts         # Honeypot, Disposable Email & Rate Limiting
│       └── date.ts             # Định dạng ngày giờ tiếng Việt & đếm ngược
├── tests/                      # Bộ kiểm thử tự động (Vitest Suite - 198 tests, 41 test suites)
│   ├── aiProxySecurity.test.ts
│   ├── xssAndSafeExport.test.ts
│   ├── slugConsistency.test.ts
│   ├── localFirstTransparency.test.ts
│   ├── antiSpamRegistration.test.ts
│   └── ... (36 test suites bao phủ toàn bộ chức năng)
├── vercel.json                 # Cấu hình Vercel SPA rewrites, API proxy & Security Headers
├── vitest.config.ts            # Cấu hình Vitest test runner
└── vite.config.ts              # Cấu hình Rollup manual chunks code-splitting
```

---

## 7. Truy cập và phân quyền

- **Không yêu cầu đăng nhập bắt buộc:** Người dùng và Ban Giám Khảo có thể trải nghiệm ngay lập tức toàn bộ tính năng cốt lõi (nhập form, sinh nội dung, chỉnh sửa Visual CMS, đổi theme, đăng ký vé, xuất file HTML) mà không gặp bất kỳ rào cản đăng nhập nào.
- **Chuyển đổi màn hình linh hoạt:** Thanh điều hướng trên cùng (Header) cho phép chuyển đổi 1-click giữa:
  - Màn hình nhập dữ liệu & chọn mẫu (Form).
  - Màn hình xem trước & biên tập trực quan (Preview / Visual CMS).
  - Màn hình quản trị người tham gia (Attendee Manager) & quản lý dự án (My Projects).
- **Màn hình quản trị:** Cho phép tra cứu, tìm kiếm theo tên/email, lọc danh sách vé đã đặt, xem chi tiết vé điện tử, tải danh sách CSV về máy và xoá người đăng ký trực tiếp trong `localStorage`.

---

## 8. Giới hạn hiện tại

- **Lưu trữ Local-First trên trình duyệt:** Dữ liệu dự án và người đăng ký được bảo lưu trên thiết bị/trình duyệt hiện tại; nếu xóa hoàn toàn bộ nhớ cache trình duyệt sẽ mất các bản ghi đã lưu.
- **Xác thực mô phỏng (Local Demo):** Tính năng đăng nhập tài khoản và phân hạng thành viên (Free / Pro / VIP) hiện hoạt động ở chế độ Client-side Demo nhằm phục vụ chấm thi nhanh, chưa kết nối OAuth/SSO máy chủ từ xa.
- **Chia sẻ liên kết trực tiếp:** Đường dẫn công khai `/#/p/:slug` chạy trên cùng trình duyệt localhost. Để chia sẻ trang sự kiện sang máy khác mà không cần kết nối cơ sở dữ liệu chung, người dùng sử dụng tính năng **Xuất mã nguồn (VIP)** để tải về 1 file Standalone HTML độc lập và đưa lên GitHub Pages hoặc hosting tĩnh bất kỳ.

---

## 9. Nguồn tham khảo

- **Bộ phông chữ Google Fonts:** Plus Jakarta Sans (Body), Space Mono (Code/Terminal), Bebas Neue (Display Headline), Source Sans 3 (Modern).
- **Thư viện biểu tượng:** Lucide React Icons (v1.61.0).
- **Tiêu chuẩn dữ liệu cấu trúc:** Chuẩn Schema.org [`@type: "Event"`](https://schema.org/Event) và OpenGraph Protocol của Meta.
- **Thiết kế & Tâm lý chuyển đổi (CRO):** Nguyên tắc tương phản WCAG 2.1 AA, mô hình phễu AIDA và các mẫu thiết kế từ Awwwards & Linear.

---

## 10. Minh chứng dùng AI để xây dựng sản phẩm

### Chu trình Vibe Coding tiêu biểu: Xây dựng bộ sinh nội dung đa ngành & Bảo vệ chống Injection

```text
[Mục tiêu]
Xây dựng công cụ tạo landing page sự kiện có khả năng sinh nội dung chuyên sâu theo từng ngành (Tech, Âm nhạc, Thể thao, Ẩm thực) và xuất file HTML độc lập an toàn.

[Yêu cầu cho AI]
1. Tạo kiến trúc Hybrid AI Proxy hỗ trợ Gemini 3.5 Flash, kèm Fallback Engine offline.
2. Thiết kế thuật toán tính điểm CRO [0-100] dựa trên tâm lý học hành vi.
3. Tạo module xuất file Standalone Single-File HTML tự chứa toàn bộ CSS và JS.

[Vấn đề phát hiện khi thử nghiệm]
- Khi người dùng ngắt kết nối mạng hoặc nhập tên có ký tự đặc biệt, ứng dụng có nguy cơ gián đoạn.
- File HTML xuất ra ban đầu có nguy cơ bị lỗi cấu trúc nếu nội dung sự kiện chứa dấu ngoặc nhọn hoặc thẻ </script>.
- Bộ tạo URL slug regex cũ làm mất dấu tiếng Việt khi chia sẻ liên kết.

[Yêu cầu sửa & Tối ưu]
- Bổ sung module `escapeHtml` và `safeJsonLdStringify` (thay < thành \u003c) trong utils xuất bản.
- Xây dựng tiện ích `slugify` chuẩn Unicode NFD giữ trọn vẹn ngữ nghĩa tiếng Việt.
- Bổ sung bộ lọc Honeypot Bot và Disposable Email chống spam vé.

[Kết quả kiểm tra lại]
- Toàn bộ 198 Unit Tests tự động vượt qua 100% trên Vitest.
- File HTML xuất ra độc lập hoàn toàn, mở offline bằng trình duyệt không phụ thuộc server.
- Trải nghiệm tạo trang hoàn tất dưới 5 phút đúng yêu cầu đề bài số 08.
```

*Chi tiết toàn bộ nhật ký prompt và kịch bản thử nghiệm được lưu tại [`docs/VIBE_CODING_SHOWCASE.md`](docs/VIBE_CODING_SHOWCASE.md).*

---

## 11. Bảng kiểm thử (Bảng A — Tối thiểu 6 ca kiểm thử)

Dự án trang bị hệ thống kiểm thử tự động **198 Unit Tests (41 test suites)** chạy trên Vitest, kết hợp 6 ca kiểm thử nghiệp vụ chi tiết theo đúng barem Bảng A:

| Mã ca | Loại ca | Dữ liệu và bước thử | Kỳ vọng | Kết quả thực tế | Đạt/Chưa đạt |
|---|---|---|---|---|:---:|
| **TC01** | Bình thường | Nhập đầy đủ: Tên "VibeCoding Summit 2026", Ngày "15/11/2026", Địa điểm "Hà Nội", Diễn giả "Dr. Alex", Sức chứa "120". Bấm nút "Tạo trang sự kiện & tối ưu chuyển đổi". | Hệ thống phân loại chính xác danh mục `ai-tech`, sinh đầy đủ headline, 3 lợi ích, 4 mốc agenda, 4 câu FAQ, tính điểm CRO và hiển thị giao diện sự kiện công nghệ cao. | Sinh ra giao diện Tech Summit chuẩn xác, thông tin hiển thị đầy đủ, điểm CRO đạt 84/100, phản hồi tức thì. | **ĐẠT** |
| **TC02** | Bình thường | Tại màn hình Preview, bật chế độ "Chỉnh sửa trực tiếp" (Visual CMS), nhấp chuột vào Tiêu đề chính để sửa chữ. Bấm phím tắt `Ctrl+Z` (Undo) hoặc `Ctrl+Y` (Redo). | Đoạn văn bản được hoàn tác về nội dung trước đó ngay lập tức nhờ Zustand History Stack mà không làm tải lại hay giật trang. | Nội dung tiêu đề quay lại trạng thái trước khi sửa, phím tắt `Ctrl+Z` / `Ctrl+Y` phản hồi tức thì 0ms. | **ĐẠT** |
| **TC03** | Đầu vào không hợp lệ | Để trống trường "Tên sự kiện" và "Thời gian tổ chức", sau đó bấm nút tạo trang. | Hệ thống chặn submit ở phía client, hiển thị cảnh báo trực quan: *"Vui lòng nhập tên sự kiện hợp lệ."* và focus vào ô lỗi. | Form hiển thị banner cảnh báo đỏ nổi bật, chặn tạo trang, không làm gián đoạn ứng dụng. | **ĐẠT** |
| **TC04** | Đầu vào không hợp lệ | Nhập trường "Sức chứa tối đa (vé)" là số âm (`-50`) hoặc số 0, sau đó bấm nút gửi form. | Hệ thống phát hiện dữ liệu logic sai nghiệp vụ, chặn submit và hiển thị cảnh báo: *"Sức chứa tối đa (số lượng vé) phải lớn hơn 0."* | Chặn thành công, hiển thị lỗi rõ ràng dưới dạng Inline Error, yêu cầu sửa lại số dương hợp lệ. | **ĐẠT** |
| **TC05** | Ca biên / Sự cố | Ngắt kết nối mạng Internet hoặc nhập một API Key không hợp lệ khi bấm tạo trang. | Hệ thống tự động kích hoạt **Smart Offline Engine** để sinh dữ liệu thay thế chuẩn theo ngành mà không báo lỗi sập ứng dụng. | Ứng dụng tiếp tục hoạt động mượt mà với nội dung từ Smart Engine, thông tin ghi nhận fallback an toàn, trải nghiệm người dùng không bị đứt gãy. | **ĐẠT** |
| **TC06** | Ca biên / Sự cố | Sự kiện có `maxCapacity = 2`. Đăng ký liên tiếp 2 vé hợp lệ. Sau đó người thứ 3 tiếp tục điền form đăng ký vé. | Hệ thống kiểm tra số lượng `registeredCount >= maxCapacity`, vô hiệu hóa nút đăng ký và hiển thị thông báo: *"Sự kiện đã hết vé (Đạt tối đa sức chứa)"*. | Chặn người thứ 3 đăng ký thành công, nút chuyển sang trạng thái disabled với nhãn "Hết vé", danh sách quản trị ghi nhận đúng 2 người. | **ĐẠT** |

---

## 12. Hồ sơ bàn giao

- **Mã nguồn:** Toàn bộ source code sạch, không chứa thư mục rác `node_modules` hay `.git`, kèm file cấu hình mẫu `.env.example`.
- **Tài liệu thuyết minh:** File `README.md` này kèm theo tài liệu kiến trúc [`docs/VIBE_CODING_SHOWCASE.md`](docs/VIBE_CODING_SHOWCASE.md) và tài liệu phản biện [`docs/DEFENSE_QA.md`](docs/DEFENSE_QA.md).
- **Video demo:** Thời lượng dưới 02 phút, thể hiện đầy đủ quy trình thao tác thực tế xuyên suốt cả 5 tính năng cốt lõi.
- **Minh chứng AI & Bảng kiểm thử:** Tích hợp đầy đủ tại Mục 10 và Mục 11 trong hồ sơ nộp bài.
- **Cam kết nộp bài:** Bản nộp trước hạn là căn cứ chấm thi chính thức; toàn bộ tính năng và kiểm thử đã được đóng gói và xác nhận hoạt động ổn định.
