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
> *"ChillFlow tích hợp **100% AI thật** sử dụng mô hình **Google Gemini 1.5 Flash REST API**, đồng thời có sẵn **Smart Offline Fallback Engine** để bảo đảm tính liên tục:*
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
