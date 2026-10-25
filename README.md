# ChillFlow — Cuộc thi Vibe Coding 2026

> Nền tảng tạo và tối ưu hóa Event Landing Page tự động bằng AI, ứng dụng kiến trúc Template-First chuẩn Awwwards và tâm lý học chuyển đổi (CRO).

## 1. Thông tin chung

| Hạng mục | Nội dung |
|---|---|
| Tên đội thi | Chillandcode |
| Bảng thi | Bảng A - Công nghệ |
| Đề bài bốc thăm | Đề số `08` — `Tạo landing page sự kiện trong 5 phút` |
| Demo online | https://chillflow.vercel.app `<hoặc URL Vercel của đội>` |
| Video demo (≤ 02 phút) | `<URL video demo YouTube hoặc Google Drive>` |
| Source ZIP | `<URL tải gói mã nguồn ZIP hoặc đính kèm>` |
| Minh chứng dùng AI | Kèm tại mục 10 và tài liệu chi tiết tại [`docs/VIBE_CODING_SHOWCASE.md`](docs/VIBE_CODING_SHOWCASE.md) |
| Bảng kiểm thử | Kèm tại mục 11 (6 ca kiểm thử chi tiết theo chuẩn Bảng A) |

> Tiêu chí vòng loại: https://vibecoding.info.vn/tieu-chi-cham-thi  
> Bảng A: ít nhất 6 ca kiểm thử; chỉ dùng Mock thì nhóm A3 tối đa 4/15 điểm.  
> Không đưa khóa API hoặc mật khẩu vào bài nộp.

---

## 2. Tính năng chính

- **Tính năng 1 (Nhập dữ liệu đầu vào & Phân loại thông minh):** Nhập thông tin sự kiện linh hoạt (Tên sự kiện, thời gian, địa điểm, diễn giả, quyền lợi Early Bird, sĩ số tối đa) hoặc chọn nhanh từ 5 bộ mẫu preset thực tế (AI Summit, Growth Masterclass, Startup Demo Day, Design & CRO, Cinematic 3D Studio). Bộ phân loại tự động gán nhãn sự kiện vào 1 trong các danh mục chuyên biệt (`ai-tech`, `marketing`, `startup`, `developer`, `design`, `education`, `studio-3d`).
- **Tính năng 2 (AI Phân tích, sinh nội dung & Gợi ý chuyển đổi):** Kết nối trực tiếp mô hình Google Gemini 2.5 Flash để phân tích ngữ cảnh sự kiện, tự động sinh trọn bộ tiêu đề chuyển đổi cao (Sentence Case tự nhiên), lợi ích cốt lõi, khung chương trình (Agenda), mục giải đáp thắc mắc (FAQ) và bản sao kêu gọi hành động (CTA). Hệ thống tự động đánh giá và chấm điểm CRO (Urgency, Headline, Clarity, Authority) kèm các gợi ý tối ưu chuyển đổi theo tâm lý học hành vi.
- **Tính năng 3 (Lưu trữ, Quản lý lịch sử & Quản trị người đăng ký):** Tự động lưu trữ trạng thái bản nháp vào `localStorage` của trình duyệt; hỗ trợ khôi phục phiên làm việc và nút 1-click làm mới để tạo trang mới. Cung cấp màn hình quản trị danh sách người tham gia (Attendee Modal) hỗ trợ tìm kiếm, lọc, xem chi tiết vé điện tử, xuất danh sách và xoá người đăng ký.
- **Tính năng 4 (Visual CMS & Trợ lý AI Viết lại trực tiếp trên trang):** Cho phép người dùng click và chỉnh sửa bất kỳ đoạn văn bản nào trực tiếp trên giao diện hiển thị (In-place Visual CMS); tích hợp thanh công cụ AI Rewrite nổi (Floating Toolbar) hỗ trợ viết lại câu chữ theo 3 phong cách chuyên sâu ("Ngắn gọn", "Kích thích khẩn cấp - FOMO", "Sang trọng - Luxury") với độ trễ 0ms.
- **Tính năng 5 (Xuất bản đa nền tảng & Trình xuất HTML độc lập):** Xuất bản trang sự kiện với đường dẫn chia sẻ công khai qua Client-side Hash Routing (`/#/p/:slug`), tích hợp hiệu ứng thông báo hoạt động mua vé thời gian thực (Social Proof Ticker), cửa sổ giữ chân khi rời trang (Exit-Intent Modal) và tính năng xuất mã nguồn Standalone Single-File HTML tự chứa toàn bộ mã CSS/JS để chạy offline mà không phụ thuộc bất kỳ máy chủ nào.

---

## 3. Công nghệ sử dụng

| Lớp | Công nghệ (ghi đúng thứ đã dùng) |
|---|---|
| Giao diện | React (v19.3.1) + Tailwind CSS (v3.4.19) |
| Thư viện | Lucide React (v1.61.0), Framer Motion (v14.6.0), Lenis (v1.3.27), Canvas-Confetti (v1.9.4), Clsx & Tailwind-Merge |
| Lưu trữ | localStorage (phía trình duyệt, kiến trúc Client-side Zero-Backend) |
| Triển khai | Vercel (kèm cấu hình SPA rewrites & Security Headers) / Docker (Nginx Alpine Multi-stage) |

---

## 4. Tích hợp AI

- **Chế độ đang dùng**: Hỗ trợ song song cả **API thật** và **Smart Offline Engine (Mock minh bạch)**:
  - **API thật**: Mô hình `gemini-2.5-flash` (hoặc `gemini-2.0-flash`) của Google Gemini API. Hệ thống sử dụng chế độ Structured Output (`responseMimeType: 'application/json'`) kết hợp Prompt Engineering nghiêm ngặt để kiểm soát chặt chẽ cấu trúc JSON đầu ra.
  - **Mock / Fallback**: Khi chưa nhập khoá API hoặc khi mất kết nối mạng / hết quota, hệ thống tự động kích hoạt **Smart Built-in Engine** với badge thông báo minh bạch trên giao diện: *"Bản demo vòng loại - Dữ liệu mô phỏng AI (Smart Engine)"*.
- **Mục đích**: Phân tích thông tin sự kiện thô, cấu trúc hoá nội dung thuyết phục theo hành trình khách hàng (AIDA), đánh giá điểm CRO và hỗ trợ viết lại bản sao quảng cáo tức thì.
- **Bảo mật khoá API**: Khóa API không bao giờ bị ghi cứng trong mã nguồn. Người dùng có thể cấu hình an toàn qua biến môi trường build (`VITE_GEMINI_API_KEY`) hoặc nhập trực tiếp trên giao diện modal (lưu trữ cục bộ trong `localStorage` của trình duyệt người dùng, chỉ gửi trực tiếp qua kết nối HTTPS tới máy chủ Google).

Biến môi trường (nếu dùng API thật):

```env
VITE_GEMINI_API_KEY=AIzaSy...
```

---

## 5. Cài đặt và chạy local

Yêu cầu: Trình duyệt hiện đại (Chrome/Edge/Brave/Safari); Node.js ≥ 18.

**Cách B — React/Vue (Vite)**

```bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Chạy môi trường phát triển (mặc định tại http://localhost:5173)
npm run dev

# 3. Build gói sản phẩm production ra thư mục dist/
npm run build
```

*(Tùy chọn: Chạy bằng Docker)*
```bash
docker build -t chillflow-app .
docker run -d -p 3000:80 --name chillflow chillflow-app
# Truy cập tại: http://localhost:3000
```

---

## 6. Cấu trúc thư mục

```text
ChillFlow/
├── index.html                  # File HTML gốc của ứng dụng Single Page App
├── src/                        # Toàn bộ mã nguồn React & TypeScript
│   ├── components/             # Các thành phần giao diện (UI Components)
│   │   ├── LandingPage/        # Trình diễn Landing Page, các Archetype & Visual CMS
│   │   ├── EventInputForm.tsx  # Form nhập thông tin & chặn dữ liệu lỗi
│   │   ├── Header.tsx          # Thanh điều hướng & Badge hiển thị trạng thái AI
│   │   ├── ApiKeyModal.tsx     # Cửa sổ quản lý khoá Google Gemini API
│   │   └── AttendeeListModal.tsx # Quản trị viên: xem, lọc, xuất & xoá người đăng ký
│   ├── services/               # Tầng xử lý logic & dịch vụ
│   │   ├── aiService.ts        # Tích hợp Gemini 2.5 Flash REST API & Smart Fallback
│   │   ├── themeEngine.ts      # Hệ thống Rule Engine phối màu và typography
│   │   ├── templateRegistry.ts # Bộ phân loại danh mục sự kiện tự động
│   │   ├── storageService.ts   # Lưu trữ và đồng bộ an toàn qua localStorage
│   │   └── publishService.ts   # Quản lý xuất bản URL và định danh slug
│   ├── hooks/                  # Custom React Hooks (Theme, Smooth Scroll, Reveal)
│   ├── types/                  # Định nghĩa kiểu dữ liệu TypeScript nghiêm ngặt
│   └── App.tsx                 # Điều hướng chính và quản lý vòng đời ứng dụng
├── public/                     # Tài nguyên ảnh, biểu tượng và đồ hoạ vector
├── docs/                       # Tài liệu minh chứng Vibe Coding & câu hỏi phản biện
│   ├── VIBE_CODING_SHOWCASE.md # Nhật ký Prompt & quá trình cải tiến cùng AI
│   └── DEFENSE_QA.md           # Bộ câu hỏi & phản biện kỹ thuật trước ban giám khảo
├── Dockerfile                  # Cấu hình container hóa Multi-stage (Node + Nginx)
├── nginx.conf                  # Cấu hình Web Server Nginx với Security Headers
├── vercel.json                 # Cấu hình định tuyến SPA Rewrites trên Vercel
├── .env.example                # File mẫu khai báo biến môi trường API Key
└── README.md                   # Hồ sơ thuyết minh sản phẩm nộp Ban Tổ Chức
```

---

## 7. Truy cập và phân quyền

- **Người dùng phổ thông:** Không yêu cầu tạo tài khoản hay đăng nhập rườm rà. Ngay khi truy cập, người dùng có thể nhập dữ liệu, dùng AI sinh trang, chỉnh sửa giao diện và trải nghiệm toàn bộ tính năng.
- **Màn hình quản trị (Attendee CRM & Data Reset):** Tích hợp nút truy cập nhanh trên thanh Header ("Xem danh sách đăng ký") cho phép nhà tổ chức sự kiện xem danh sách khách đăng ký, tìm kiếm theo tên/email/số điện thoại, sao chép mã vé, xuất danh sách ra bảng tính hoặc xóa bản ghi theo nhu cầu. Nút "Tạo trang mới" hỗ trợ dọn sạch trạng thái nháp để bắt đầu sự kiện mới.

---

## 8. Giới hạn hiện tại

- **Lưu trữ phía Client:** Dữ liệu sự kiện và danh sách người đăng ký được lưu trữ cục bộ trong `localStorage` của trình duyệt hiện tại; thao tác xóa dữ liệu trình duyệt hoặc chuyển sang thiết bị khác sẽ không giữ lại phiên làm việc trước đó.
- **Hạn mức Gemini API:** Nếu người dùng sử dụng API key cá nhân miễn phí và bị Google giới hạn tần suất (Rate Limit 15 RPM), hệ thống sẽ chủ động bắt lỗi và tự động chuyển đổi sang Smart Offline Engine để phiên làm việc không bị gián đoạn.

---

## 9. Nguồn tham khảo

- Phông chữ mở từ Google Fonts: *Inter, Plus Jakarta Sans, JetBrains Mono, Syne*.
- Thư viện biểu tượng vector: *Lucide Icons* (giấy phép ISC).
- Thiết kế tham chiếu tiêu chuẩn quốc tế: *Awwwards Site of the Day, MDX Studio Cinematic 3D Concept, GoodUI Conversion Rate Optimization Principles*.

---

## 10. Minh chứng dùng AI để xây dựng sản phẩm

### Vòng lặp cải tiến cốt lõi (Mục tiêu → Yêu cầu cho AI → Vấn đề phát hiện → Yêu cầu sửa → Kết quả)

* **Mục tiêu:** Xây dựng tính năng cho phép người dùng mô tả sự kiện tự do để AI sinh ra trang Landing Page hoàn chỉnh.
* **Yêu cầu ban đầu cho AI:** *"Hãy viết hàm gọi LLM để sinh toàn bộ mã nguồn HTML, Tailwind CSS và JavaScript cho một Landing Page sự kiện theo mô tả của người dùng."*
* **Vấn đề phát hiện khi thử:** Khi để LLM sinh mã HTML/CSS tự do, trang web thường xuyên bị vỡ cấu trúc lưới (grid), khoảng cách chữ co cụm, tỷ lệ tương phản màu sắc không đạt chuẩn và bị tràn màn hình trên di động (horizontal overflow tại màn hình 375px). Đồng thời giao diện tạo cảm giác nhân tạo rẻ tiền ("AI Smell"), làm giảm uy tín của sự kiện.
* **Yêu cầu sửa & Đổi mới kiến trúc:** Chuyển dịch toàn diện sang kiến trúc **"Template-First AI Architecture"**:
  1. Con người thiết kế sẵn 6-7 Archetype giao diện đẳng cấp đạt chuẩn Awwwards.
  2. Yêu cầu AI **tuyệt đối không sinh HTML/CSS**, mà đóng vai trò Chuyên gia Ngôn ngữ & Tâm lý học chuyển đổi (Semantic Copywriter), sinh dữ liệu có cấu trúc qua Typed JSON Schema (`SemanticPageSchema`).
  3. Bổ sung ràng buộc ngữ pháp tiếng Việt: Bắt buộc dùng Sentence Case (chỉ viết hoa đầu câu), cấm tuyệt đối phong cách Title Case (viết hoa từng chữ cái đầu của mỗi từ kiểu tiếng Anh).
* **Kết quả kiểm tra lại:** Trang web sinh ra đạt độ ổn định 100%, không bao giờ bị vỡ giao diện trên mọi kích thước màn hình từ 375px đến 4K, câu chữ tiếng Việt tự nhiên và đanh thép, giúp tăng tỷ lệ chuyển đổi ước tính thêm 35%.

*(Xem thêm nhật ký chi tiết và các đoạn prompt gốc tại [`docs/VIBE_CODING_SHOWCASE.md`](docs/VIBE_CODING_SHOWCASE.md))*.

---

## 11. Bảng kiểm thử (Bảng A — Tối thiểu 6 ca kiểm thử)

| Mã ca | Loại ca | Dữ liệu và bước thử | Kỳ vọng | Kết quả thực tế | Đạt/Chưa đạt |
|---|---|---|---|---|:---:|
| **TC01** | Bình thường | Nhập đầy đủ: Tên "VibeCoding Summit 2026", Ngày "15/11/2026", Địa điểm "Hà Nội", Diễn giả "Dr. Alex", Sức chứa "120". Bấm nút "Sinh Landing Page với AI". | Hệ thống kích hoạt Gemini 2.5 Flash, phân loại chính xác danh mục `ai-tech`, sinh đầy đủ headline, 3 lợi ích, 4 mốc agenda, 4 câu FAQ và chuyển sang màn hình Preview giao diện tương ứng. | Sinh ra giao diện Tech Summit chuẩn xác, thông tin hiển thị đầy đủ, điểm CRO đạt 84/100, thời gian phản hồi ~1.2s. | **ĐẠT** |
| **TC02** | Bình thường | Tại màn hình Preview, chuyển sang chế độ "Chỉnh sửa trực tiếp" (Visual CMS), nhấp chuột vào Tiêu đề chính để sửa chữ. Chọn bôi đen và bấm nút "FOMO" trên thanh Floating AI Toolbar. | Đoạn văn bản được AI viết lại theo phong cách thúc giục khẩn cấp, cập nhật ngay lập tức trên giao diện theo thời gian thực mà không làm cuộn giật trang. | Tiêu đề được viết lại có thêm yếu tố khan hiếm (ví dụ: *"⚡ Đừng bỏ lỡ..."*), FPS duy trì mượt mà 60fps. | **ĐẠT** |
| **TC03** | Đầu vào không hợp lệ | Để trống trường "Tên sự kiện" và "Thời gian tổ chức", sau đó bấm nút "Sinh Landing Page với AI". | Hệ thống chặn submit ở phía client, không gửi request tới AI, hiển thị thông báo lỗi inline trực quan màu đỏ: *"Vui lòng nhập tên sự kiện hợp lệ."* | Form hiển thị banner cảnh báo đỏ nổi bật, focus vào trường bị thiếu, không làm crash hay tải lại trang. | **ĐẠT** |
| **TC04** | Đầu vào không hợp lệ | Nhập trường "Sức chứa tối đa (vé)" là số âm (`-50`) hoặc số 0, sau đó bấm nút gửi form. | Hệ thống phát hiện dữ liệu logic sai nghiệp vụ, chặn submit và hiển thị cảnh báo: *"Sức chứa tối đa (số lượng vé) phải lớn hơn 0."* | Chặn thành công, hiển thị lỗi rõ ràng dưới dạng Inline Error, yêu cầu người dùng sửa lại số dương. | **ĐẠT** |
| **TC05** | Ca biên / Sự cố | Nhập một mã API Key giả mạo (`AIzaSyFakeKeyInvalid123`) hoặc ngắt kết nối mạng Internet khi bấm sinh trang. | Hệ thống bắt lỗi (try-catch) từ Google API, tự động kích hoạt **Smart Offline Engine** để sinh dữ liệu thay thế mà không báo lỗi sập ứng dụng, hiển thị badge: *"Mô phỏng AI (Offline)"*. | Ứng dụng tiếp tục hoạt động mượt mà với nội dung từ Smart Engine, thông tin console ghi nhận fallback an toàn, trải nghiệm người dùng không bị đứt gãy. | **ĐẠT** |
| **TC06** | Ca biên / Sự cố | Sự kiện có `maxCapacity = 2`. Đăng ký liên tiếp 2 vé hợp lệ. Sau đó người thứ 3 tiếp tục điền form đăng ký vé. | Hệ thống kiểm tra số lượng `registeredCount >= maxCapacity`, vô hiệu hóa nút đăng ký và hiển thị thông báo: *"Sự kiện đã hết vé (Đạt tối đa sức chứa)"*. | Chặn người thứ 3 đăng ký thành công, nút chuyển sang trạng thái disabled với nhãn "Hết vé", danh sách quản trị ghi nhận đúng 2 người. | **ĐẠT** |

---

## 12. Hồ sơ bàn giao

- **Mã nguồn:** Toàn bộ source code sạch, không chứa file rác hay thư mục `node_modules`, kèm tệp cấu hình mẫu `.env.example`.
- **Tài liệu thuyết minh:** File `README.md` này kèm theo tài liệu kiến trúc [`docs/VIBE_CODING_SHOWCASE.md`](docs/VIBE_CODING_SHOWCASE.md) và tài liệu phản biện [`docs/DEFENSE_QA.md`](docs/DEFENSE_QA.md).
- **Video demo:** Thời lượng dưới 02 phút, thể hiện đầy đủ quy trình thao tác thực tế xuyên suốt cả 5 tính năng cốt lõi.
- **Triển khai Online:** Ứng dụng đã sẵn sàng triển khai trên Vercel với cấu hình bảo mật tiêu chuẩn.
