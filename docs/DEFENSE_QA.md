# Bộ Câu Hỏi & Phản Biện Kỹ Thuật (Defense Q&A) — ChillFlow

> **Tài liệu chuẩn bị cho đội thi khi thuyết trình và trả lời chất vấn của Hội Đồng Ban Giám Khảo (Bảng A — VibeCoding 2026).**

---

### Câu 1: Tại sao đội thi không để AI sinh trực tiếp toàn bộ mã nguồn HTML/CSS mà lại dùng kiến trúc "Template-First"?

**Trả lời:**
> *"Đây là quyết định kiến trúc cốt lõi nhất của chúng tôi dựa trên kinh nghiệm thực tế khi phát triển sản phẩm với AI. Khi để LLM sinh toàn bộ code HTML/CSS từ số 0, sản phẩm gặp phải 2 điểm yếu chí tử:*
> 1. * **AI Fragility (Tính mỏng manh):** Thường xuyên vỡ layout, co cụm chữ, hỏng responsive trên di động (375px), lỗi thẻ đóng mở và rủi ro bảo mật XSS.*
> 2. * **AI Smell (Cảm giác nhân tạo rẻ tiền):** Các trang web sinh tự do thường có màu sắc generic, typography thiếu tương phản và giảm độ tin cậy của khách hàng, triệt tiêu tỷ lệ chuyển đổi (CRO).*
> 
> *Giải pháp của chúng tôi là **Template-First**: Chúng tôi đầu tư thiết kế sẵn 6 Archetype chuẩn Awwwards, và dùng AI làm **chuyên gia ngôn ngữ & tâm lý học hành vi (Semantic Copywriter)** để sinh Typed JSON Schema. Nhờ đó, chúng tôi đảm bảo được 100% độ ổn định giao diện, responsive tuyệt đối và tỷ lệ chuyển đổi tối đa."*

---

### Câu 2: Sản phẩm của bạn tích hợp AI thật hay chỉ dùng Mock? Cơ chế kiểm soát đầu ra ra sao?

**Trả lời:**
> *"ChillFlow tích hợp **100% AI thật** sử dụng mô hình **Google Gemini 3.5 Flash REST API**, đồng thời có sẵn **Smart Offline Fallback Engine** để bảo đảm tính liên tục:*
> 1. * **Kiểm soát đầu ra (Structured Outputs):** Chúng tôi cấu hình `responseMimeType: 'application/json'` và ép kiểu dữ liệu chặt chẽ theo TypeScript Schema (`SemanticPageSchema`). Mọi trường từ Headline, Lợi ích, Agenda đến FAQ đều được định danh rõ ràng.*
> 2. * **Văn phong tiếng Việt chuẩn:** Prompt được tối ưu để loại bỏ hiện tượng Title Case (viết hoa từng chữ kiểu tiếng Anh), đảm bảo câu chữ tự nhiên, mang tính kích thích hành động (FOMO/Urgency).*
> 3. * **Khả năng chịu lỗi:** Nếu người dùng chưa nhập API key hoặc kết nối Internet gián đoạn, hệ thống tự động chuyển sang Smart Engine với thông báo minh bạch, cam kết ứng dụng không bao giờ bị crash."*

---

### Câu 3: Tại sao đội thi lựa chọn kiến trúc Client-side (Zero-backend)? Dữ liệu được bảo mật như thế nào?

**Trả lời:**
> *"Theo barem chấm Bảng A, tiêu chí kỹ thuật đánh giá 'Lựa chọn công nghệ phù hợp và an toàn cơ bản, không bắt buộc backend hoặc database thật'. Chúng tôi chọn kiến trúc Client-side với các ưu điểm vượt trội:*
> 1. * **Zero Latency & Tốc độ tức thì:** Mọi thao tác từ sinh trang, chỉnh sửa Inline CMS đến chuyển đổi Archetype đều diễn ra với độ trễ 0ms.*
> 2. * **Bảo mật & Quyền riêng tư tối đa:** Khóa API và danh sách người đăng ký vé được lưu hoàn toàn trong `localStorage` của trình duyệt người dùng. Khóa API không bao giờ được gửi qua bất kỳ máy chủ trung gian nào, loại bỏ hoàn toàn nguy cơ rò rỉ dữ liệu máy chủ.*
> 3. * **Khả năng Export độc lập:** Chúng tôi xây dựng bộ biên dịch xuất ra file Standalone HTML duy nhất, có thể chạy offline hoặc tải lên bất kỳ hosting nào mà không cần server."*

---

### Câu 4: Đội thi đã làm gì để kiểm thử độ ổn định và ngăn chặn dữ liệu sai?

**Trả lời:**
> *"Chúng tôi xây dựng quy trình kiểm thử 3 lớp nghiêm ngặt (được thể hiện chi tiết ở Mục 11 trong README):*
> 1. * **Chặn dữ liệu sai ở tầng Form (Validation Layer):** Chặn bỏ trống các trường bắt buộc, validate ngày tháng và bắt buộc sức chứa sự kiện phải là số dương (> 0) kèm giao diện thông báo lỗi trực quan (Inline Error).*
> 2. * **Chặn vượt ngưỡng đăng ký (Business Rule Layer):** Khi số lượng người đăng ký đạt giới hạn `maxCapacity`, hệ thống tự động khóa form đăng ký và thông báo trạng thái 'Hết vé'.*
> 3. * **Kiểm thử tự động hóa (Automated E2E Testing):** Sử dụng Headless Chrome/Puppeteer để tự động kiểm tra responsive trên kích thước 375px (mobile) và 1440px (desktop), đảm bảo không có bất kỳ phần tử nào bị tràn màn hình (horizontal overflow)."*


---

### Câu 5: Cơ chế bảo vệ API Key và kiến trúc Hybrid AI Proxy hoạt động như thế nào?

**Trả lời:**
> *"ChillFlow áp dụng mô hình **Hybrid AI Proxy Architecture** giải quyết trọn vẹn bài toán bảo mật API Key trong môi trường Web:*
> 1. * **Bảo mật Server-side (Default Zero-Config):** Một Vercel Serverless Function (`api/ai-proxy.ts`) hoạt động ở biên (Edge), giữ biến môi trường `GEMINI_API_KEY` bí mật trên server. Người dùng bình thường trải nghiệm ứng dụng ngay lập tức mà không cần tự cấu hình key và không bao giờ thấy API Key trong file tĩnh client.*
> 2. * **Cơ chế BYOK (Bring Your Own Key):** Người dùng chuyên nghiệp hoặc khi hết quota hệ thống có thể chủ động nhập khóa cá nhân qua `ApiKeyModal.tsx`. Khóa này được lưu bảo mật trong LocalStorage trình duyệt và gửi qua header `x-api-key`.*
> 3. * **Khả năng chịu tải & Cascading Model Fallback:** Tự động điều hướng giữa các mô hình (`gemini-3.5-flash-lite`, `gemini-3.5-flash`, `gemini-3.8-flash`) với cơ chế Exponential Backoff Retry. Nếu toàn bộ mạng gián đoạn, Smart Offline Engine lập tức đảm nhiệm để cam kết phiên demo không bao giờ gián đoạn."*

---

### Câu 6: Làm thế nào ChillFlow tối ưu hóa SEO và Structured Data cho công cụ tìm kiếm?

**Trả lời:**
> *"Để chứng minh giá trị chuyển đổi (CRO) không chỉ dừng lại ở giao diện mà còn ở lưu lượng truy cập tự nhiên (Organic Traffic), ChillFlow chuẩn hóa SEO đa tầng:*
> 1. * **Thẻ Meta OpenGraph & Twitter Cards:** Tự động tạo thẻ `og:title`, `og:description`, `og:image`, `twitter:card="summary_large_image"` từ dữ liệu form và ảnh poster chất lượng cao, giúp bài viết chia sẻ trên Facebook, Zalo, LinkedIn hiển thị đẹp mắt và kích thích click.*
> 2. * **Chuẩn hóa JSON-LD Schema (`@type: "Event"`):** Cả bản Standalone HTML (`sourceExporter.ts`) lẫn bản xem trước công khai (`PublicStandalonePage.tsx`) đều được tự động nhúng cấu trúc JSON-LD chuẩn Schema.org chứa tên sự kiện, thời gian (`startDate`), địa điểm (`location`), thông tin diễn giả (`performer`) và vé mời (`offers`). Điều này giúp Google Search hiển thị sự kiện dưới dạng **Rich Snippet (Hộp sự kiện nổi bật)**.*
> 3. * **Kiểm tra độ tương phản (WCAG Accessibility Contrast):** Thuật toán `evaluateThemeAccessibility` kiểm tra bảng màu đạt tỷ lệ tương phản >= 7.0:1 (Chuẩn WCAG AAA), được thể hiện ngay trên bảng điểm `CROScorecard.tsx`."*

---

### Câu 7: Đội thi đã áp dụng quy trình CI/CD và kiểm thử tự động (Unit Test) như thế nào?

**Trả lời:**
> *"Để chứng minh năng lực kỹ thuật và tính chuyên nghiệp trong sản xuất phần mềm, chúng tôi tích hợp bộ quy trình kiểm thử tự động hóa:*
> 1. * **Unit Testing (`Vitest`):** Dự án có bộ test suite chạy siêu tốc (< 1s) kiểm thử 4 module cốt lõi:
>    - `date.test.ts`: Kiểm thử định dạng ngày tháng tiếng Việt và logic đếm ngược linh hoạt.
>    - `themeEngine.test.ts`: Kiểm thử tính hợp lệ của toàn bộ 7 archetype và độ tương phản trợ năng.
>    - `sourceExporter.test.ts`: Kiểm thử đầu ra HTML không lỗi cú pháp, chứa đủ Schema SEO.
>    - `croCalculator.test.ts`: Kiểm thử thuật toán chấm điểm luôn nằm trong chặn $[0, 100]$ với mọi dữ liệu biên.
> 2. * **CI/CD Pipeline (`.github/workflows/ci.yml`):** Tự động kích hoạt khi `push` hoặc tạo `pull_request` qua 4 chặng: `oxlint` (phát hiện lỗi code), `tsc -b` (kiểm tra kiểu dữ liệu nghiêm ngặt), `vitest` (chạy toàn bộ unit test) và `vite build` (đóng gói bundle với code splitting tối ưu)."*
