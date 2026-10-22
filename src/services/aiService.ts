import type { EventInput, GeneratedContent, CROEvaluation, FaqItem } from '../types';

// Preset templates for instant demo during presentation
export const PRESETS: { label: string; iconType: 'ai' | 'marketing' | 'startup' | 'design'; data: EventInput }[] = [
  {
    label: 'AI Agent Summit 2026',
    iconType: 'ai',
    data: {
      eventName: 'VibeCoding Summit: Xây Dựng AI Agent Từ Số 0 Đến Triển Khai',
      category: 'ai-tech',
      eventDate: '2026-11-15T08:30',
      location: 'Hội trường Trống Đồng Palace, 72 Trần Đăng Ninh, Cầu Giấy, Hà Nội & Zoom Online',
      speakerName: 'Dr. Alex Nguyễn',
      speakerRole: 'AI Research Director & Ex-Google Developer Advocate',
      speakerBio: 'Hơn 10 năm kinh nghiệm kiến trúc hệ thống LLM & AI Agents, cố vấn công nghệ cho nhiều tập đoàn viễn thông.',
      earlyBirdDiscount: 'Giảm 40% vé Pro + Tặng trọn bộ 50+ Agent Workflows cho 50 vé đầu tiên',
      targetAudience: 'Software Developers, Tech Leads & AI Enthusiasts',
      maxCapacity: 120,
    },
  },
  {
    label: 'Growth Masterclass: 10K Users 0đ',
    iconType: 'marketing',
    data: {
      eventName: 'Growth Hacking Masterclass: Thu Hút 10,000 Người Dùng Với Ngân Sách 0đ',
      category: 'marketing',
      eventDate: '2026-11-28T19:30',
      location: 'Trực tuyến qua Zoom Webinar riêng tư (Có recording bản quyền)',
      speakerName: 'Elena Trần',
      speakerRole: 'Head of Growth tại FinTech Unicorn',
      speakerBio: 'Từng scale 3 sản phẩm SaaS từ 0 lên 50,000 người dùng hoạt động hàng tháng chỉ trong 6 tháng.',
      earlyBirdDiscount: 'Tặng Ebook "Growth Playbook 2026" + Suất 1-1 Review Funnel cho 30 vé đầu',
      targetAudience: 'Startup Founders, Solopreneurs, Digital Marketers',
      maxCapacity: 100,
    },
  },
  {
    label: 'Startup Demo Day & Pitching',
    iconType: 'startup',
    data: {
      eventName: 'Startup Demo Day 2026: Kết Nối 30+ Quỹ Đầu Tư Mạo Hiểm',
      category: 'startup',
      eventDate: '2026-12-10T13:30',
      location: 'Innovation Center, Tầng 12 Toà nhà Landmark, Ba Đình, Hà Nội',
      speakerName: 'Marcus Vũ & Khách mời VCs',
      speakerRole: 'Managing Partner tại Mekong Ventures',
      speakerBio: 'Đã giải ngân hơn $45M cho các startup giai đoạn Seed & Series A tại Đông Nam Á.',
      earlyBirdDiscount: 'Ưu đãi vé Founder Pass 50% + Quyền gửi Pitch Deck trực tiếp tới hội đồng thẩm định',
      targetAudience: 'Startup Founders, Co-founders, Angel Investors',
      maxCapacity: 80,
    },
  },
  {
    label: 'Design & CRO Workshop',
    iconType: 'design',
    data: {
      eventName: 'Thiết Kế Landing Page Tỉ Lệ Chuyển Đổi Cao Với Tư Duy CRO & Design System',
      category: 'design',
      eventDate: '2026-12-05T14:00',
      location: 'Toà nhà Innovation Hub, Quận 1, TP. Hồ Chí Minh',
      speakerName: 'Minh Vũ',
      speakerRole: 'Design Lead tại Creative Platform',
      speakerBio: 'Chuyên gia tối ưu trải nghiệm người dùng, đã tư vấn tăng CR hơn 230% cho 40+ thương hiệu D2C.',
      earlyBirdDiscount: 'Ưu đãi Early Bird 35% + Tặng UI Kit Figma Design System trị giá $99',
      targetAudience: 'UI/UX Designers, Frontend Developers, Product Managers',
      maxCapacity: 80,
    },
  },
];

export async function generateLandingPageContent(
  input: EventInput,
  apiKey?: string,
  forceOptimized = false
): Promise<{ content: GeneratedContent; cro: CROEvaluation }> {
  if (apiKey && apiKey.trim() !== '') {
    try {
      const result = await callGeminiAPI(input, apiKey.trim(), forceOptimized);
      if (result) return result;
    } catch (err) {
      console.warn('Gemini API call failed, falling back to smart built-in engine:', err);
    }
  }

  return generateWithSmartEngine(input, forceOptimized);
}

function generateWithSmartEngine(input: EventInput, forceOptimized = false): {
  content: GeneratedContent;
  cro: CROEvaluation;
} {
  const category = input.category || 'ai-tech';

  let headline = '';
  let altHeadline = '';
  let subHeadline = '';
  let description = '';

  const cleanTitle = (fallbackPrefix: string, name: string) => {
    if (!name) return fallbackPrefix;
    if (name.includes(':') || name.length > 28) return name;
    return `${fallbackPrefix} — ${name}`;
  };

  if (category === 'ai-tech') {
    headline = forceOptimized
      ? `Làm Chủ Hệ Sinh Thái AI Agent 2026: Đột Phá Năng Suất Cùng ${input.speakerName}`
      : cleanTitle('Hội Thảo AI Summit', input.eventName);
    altHeadline = `Đừng Để Tụt Hậu Trước Làn Sóng Tự Động Hoá AI Agent Thực Chiến`;
    subHeadline = `Khám phá kiến trúc xây dựng và vận hành AI Agent từ quy mô ý tưởng đến sản phẩm thực tế, chia sẻ trực tiếp bởi ${input.speakerName}.`;
    description = `Chương trình thực chiến 100% giúp ${input.targetAudience || 'kỹ sư và tech lead'} nắm vững framework mới nhất, giải quyết bài toán tự động hoá tác vụ phức tạp mà không tốn hàng tháng tự nghiên cứu.`;
  } else if (category === 'marketing') {
    headline = forceOptimized
      ? `Công Thức Tăng Trưởng Đột Phá: Thu Hút Hàng Ngàn Khách Hàng Tiềm Năng`
      : cleanTitle('Growth Masterclass', input.eventName);
    altHeadline = `Bí Quyết Scale Sản Phẩm Tinh Gọn Không Phụ Thuộc Vào Quảng Cáo Trả Phí`;
    subHeadline = `Toàn bộ framework growth hacking thực chiến đã được kiểm chứng qua case study thực tế của ${input.speakerName}.`;
    description = `Tiếp cận phương pháp thu hút và giữ chân khách hàng hiệu quả nhất hiện nay. Đăng ký sớm để nhận trọn bộ tài liệu và quyền lợi đặc quyền.`;
  } else if (category === 'startup') {
    headline = forceOptimized
      ? `Bứt Phá Định Giá & Thu Hút Vốn Đầu Tư Cùng ${input.speakerName}`
      : cleanTitle('Diễn Đàn Đầu Tư', input.eventName);
    altHeadline = `Cơ Hội Tiếp Cận Trực Tiếp 30+ Quỹ Đầu Tư Hàng Đầu Khu Vực`;
    subHeadline = `Không gian đối thoại kín giữa các nhà sáng lập tiềm năng và những nhà đầu tư mạo hiểm hàng đầu.`;
    description = `Nơi định hình chiến lược tăng trưởng, hoàn thiện mô hình kinh doanh và mở ra cơ hội hợp tác chiến lược cho dự án của bạn.`;
  } else if (category === 'developer') {
    headline = forceOptimized
      ? `Kỹ Nghệ Phần Mềm Hiện Đại: Xây Dựng Hệ Thống Bền Vững & Chịu Tải Cao`
      : cleanTitle('Hội Thảo Kỹ Thuật', input.eventName);
    altHeadline = `Học Trực Tiếp Từ Chuyên Gia Vận Hành Hệ Thống Hàng Triệu Người Dùng`;
    subHeadline = `Đi sâu vào kiến trúc microservices, tối ưu hiệu năng và quy trình CI/CD thực tế cùng ${input.speakerName}.`;
    description = `Thực hành trên bài toán thực tế, trao đổi trực tiếp mã nguồn và thảo luận sâu về những thách thức kỹ thuật cốt lõi.`;
  } else if (category === 'design') {
    headline = forceOptimized
      ? `Thiết Kế Vì Chuyển Đổi: Tối Ưu Trải Nghiệm & Gia Tăng Doanh Thu Vượt Trội`
      : cleanTitle('Masterclass Thiết Kế', input.eventName);
    altHeadline = `Bí Quyết Xây Dựng Trải Nghiệm Khiến Khách Hàng Ra Quyết Định Mua Hàng`;
    subHeadline = `Ứng dụng tâm lý học hành vi và design system thực chiến vào thiết kế sản phẩm số cùng ${input.speakerName}.`;
    description = `Phân tích chi tiết quy trình audit UX, cách xây dựng luồng trải nghiệm tối ưu tỉ lệ chuyển đổi từ góc nhìn chuyên gia.`;
  } else {
    headline = forceOptimized
      ? `Lộ Trình Tinh Gọn Để Nâng Tầm Kỹ Năng Cùng ${input.speakerName}`
      : cleanTitle('Workshop Chuyên Sâu', input.eventName);
    altHeadline = `Nắm Bắt Phương Pháp Luận Thực Chiến Chỉ Sau Một Phiên Học`;
    subHeadline = `Trải nghiệm học tập tương tác cao, kết nối trực tiếp cùng giảng viên và cộng đồng.`;
    description = `Chương trình được thiết kế cô đọng, tập trung vào kỹ năng ứng dụng ngay vào công việc hàng ngày.`;
  }

  const benefits = [
    {
      title: 'Kiến Thức Thực Chiến 100%',
      description: 'Phân tích case study thực tế, tập trung vào giải pháp ứng dụng ngay mà không rườm rà lý thuyết.',
      iconName: 'zap' as const,
    },
    {
      title: 'Đối Thoại Trực Tiếp Cùng Chuyên Gia',
      description: `Q&A trực tiếp và nhận định hướng cụ thể từ ${input.speakerName || 'diễn giả'}.`,
      iconName: 'award' as const,
    },
    {
      title: 'Tài Liệu & Quyền Lợi Độc Quyền',
      description: input.earlyBirdDiscount || 'Toàn bộ slide trình bày, bản thu âm và bộ công cụ mẫu dành riêng cho người tham gia.',
      iconName: 'target' as const,
    },
  ];

  const agenda = [
    {
      time: '08:30 - 09:00',
      title: 'Check-in & Đón tiếp khách mời',
      description: 'Gặp gỡ, nhận tài liệu sự kiện và kết nối nhanh cùng cộng đồng.',
    },
    {
      time: '09:00 - 10:15',
      title: 'Phiên 1: Bức tranh toàn cảnh & Xu hướng mới',
      description: `Diễn giả ${input.speakerName} trình bày phân tích chuyên sâu và bài học thực tiễn.`,
      speaker: input.speakerName,
    },
    {
      time: '10:15 - 11:30',
      title: 'Phiên 2: Phân tích Case Study & Giải pháp cốt lõi',
      description: 'Mổ xẻ quy trình giải quyết vấn đề và framework triển khai thực tế.',
    },
    {
      time: '11:30 - 12:00',
      title: 'Phiên 3: Q&A Đối thoại & Trao giải',
      description: 'Giải đáp thắc mắc trực tiếp cùng người tham dự và trao các phần quà sớm.',
    },
  ];

  const faqs: FaqItem[] = [
    {
      question: 'Tôi có nhận được video recording và slide sau sự kiện không?',
      answer: 'Có! Toàn bộ người đăng ký tham gia sẽ nhận được đường link truy cập slide thuyết trình chất lượng cao và bản thu âm đầy đủ sau khi sự kiện kết thúc 24 giờ.',
    },
    {
      question: 'Nếu tôi không thể tham gia đúng giờ thì sao?',
      answer: 'Bạn hoàn toàn có thể xem lại video ghi âm và tài liệu gửi qua email. Tuy nhiên, việc tham gia trực tiếp sẽ giúp bạn có cơ hội hỏi đáp Q&A trực tiếp với diễn giả.',
    },
    {
      question: 'Ưu đãi Early Bird có giới hạn thời gian không?',
      answer: input.earlyBirdDiscount
        ? `Ưu đãi "${input.earlyBirdDiscount}" chỉ áp dụng cho số lượng suất đăng ký giới hạn. Hệ thống sẽ tự động đóng cổng đăng ký sớm khi đủ chỉ tiêu.`
        : 'Ưu đãi áp dụng có hạn, ban tổ chức sẽ ưu tiên cho những người hoàn tất thông tin sớm nhất.',
    },
    {
      question: 'Hình thức nhận vé mời như thế nào?',
      answer: 'Sau khi bấm đăng ký, hệ thống sẽ tự động xác nhận mã vé điện tử của bạn ngay trên màn hình và gửi bản hướng dẫn tham dự chi tiết về email đã cung cấp.',
    },
  ];

  const totalScore = forceOptimized ? 94 : 78;
  const headlineScore = forceOptimized ? 96 : 76;
  const urgencyScore = forceOptimized ? 92 : 72;
  const clarityScore = forceOptimized ? 95 : 82;
  const authorityScore = forceOptimized ? 93 : 84;

  const cro: CROEvaluation = {
    totalScore,
    headlineScore,
    urgencyScore,
    clarityScore,
    authorityScore,
    verdict: forceOptimized
      ? 'Trang đã đạt điểm chuyển đổi cao. Tiêu đề rõ ràng về giá trị cốt lõi, lời kêu gọi hành động (CTA) và ưu đãi Early Bird kích thích người xem ra quyết định nhanh.'
      : 'Cấu trúc thông tin chuẩn chỉnh. Có thể gia tăng tính cấp bách (Urgency) và nhấn mạnh lợi ích cụ thể của ưu đãi Early Bird để đẩy tỉ lệ chuyển đổi thêm 20-35%.',
    aiSuggestions: forceOptimized
      ? [
          'Tối ưu tiêu đề theo công thức đánh trúng vấn đề cốt lõi.',
          'Bố trí ưu đãi giới hạn số suất để tạo động lực đăng ký sớm.',
          'Rút gọn các bước trong form đăng ký để giảm tỷ lệ bỏ dở.',
        ]
      : [
          'Thêm con số định lượng vào tiêu đề để tăng tính thuyết phục.',
          'Tận dụng hiệu ứng đếm ngược thời gian để nhắc nhở người xem.',
          'Nêu rõ quyền lợi độc quyền dành cho những người đăng ký sớm.',
        ],
  };

  const content: GeneratedContent = {
    headline,
    alternativeHeadline: altHeadline,
    subHeadline,
    description,
    benefits,
    agenda,
    faqs,
    earlyBirdBadge: input.earlyBirdDiscount || 'Ưu đãi Early Bird có hạn',
    ctaButtonText: 'Đăng Ký Tham Gia Ngay',
    tagline: 'Sự kiện chuyên sâu không thể bỏ lỡ',
  };

  return { content, cro };
}

async function callGeminiAPI(
  input: EventInput,
  apiKey: string,
  forceOptimized: boolean
): Promise<{ content: GeneratedContent; cro: CROEvaluation } | null> {
  const prompt = `
Bạn là Giám đốc Tiếp thị (CMO) và Chuyên gia CRO hàng đầu.
Hãy phân tích sự kiện sau và sinh dữ liệu JSON chuẩn để render vào Landing Page:

Thông tin sự kiện:
- Tên sự kiện: "${input.eventName}"
- Loại ngành nghề: "${input.category}"
- Thời gian: "${input.eventDate}"
- Địa điểm: "${input.location}"
- Diễn giả: "${input.speakerName}" (${input.speakerRole})
- Ưu đãi đăng ký sớm: "${input.earlyBirdDiscount}"
- Đối tượng: "${input.targetAudience || 'Khán giả mục tiêu'}"
- Tối ưu hóa chuyển đổi cao: ${forceOptimized ? 'BẬT' : 'TIÊU CHUẨN'}

Hãy trả về DUY NHẤT một chuỗi JSON hợp lệ (không kèm Markdown backticks):
{
  "content": {
    "headline": "Tiêu đề chính cô đọng, sắc bén, kích thích chuyển đổi",
    "alternativeHeadline": "Tiêu đề biến thể A/B nhấn mạnh tính cấp bách",
    "subHeadline": "1-2 câu giải thích rõ sự kiện này mang lại giá trị gì",
    "description": "2-3 câu mô tả sức hấp dẫn của sự kiện",
    "benefits": [
      { "title": "Lợi ích 1", "description": "Mô tả ngắn gọn", "iconName": "zap" },
      { "title": "Lợi ích 2", "description": "Mô tả ngắn gọn", "iconName": "award" },
      { "title": "Lợi ích 3", "description": "Mô tả ngắn gọn", "iconName": "target" }
    ],
    "agenda": [
      { "time": "08:30 - 09:00", "title": "Đón tiếp & Check-in", "description": "Mô tả ngắn" },
      { "time": "09:00 - 10:15", "title": "Phiên 1: Khai mở vấn đề", "description": "Mô tả ngắn", "speaker": "${input.speakerName}" },
      { "time": "10:15 - 11:30", "title": "Phiên 2: Giải pháp thực chiến", "description": "Mô tả ngắn" },
      { "time": "11:30 - 12:00", "title": "Phiên 3: Q&A & Bế mạc", "description": "Mô tả ngắn" }
    ],
    "faqs": [
      { "question": "Tôi có nhận được video recording và slide không?", "answer": "Toàn bộ tài liệu và slide sẽ được gửi qua email sau sự kiện." },
      { "question": "Ưu đãi Early Bird có giới hạn không?", "answer": "Ưu đãi có hạn theo số suất quy định." },
      { "question": "Vé mời được nhận như thế nào?", "answer": "Mã vé sẽ được tạo ngay lập tức khi hoàn tất đăng ký." }
    ],
    "earlyBirdBadge": "Ưu đãi Early Bird tóm tắt",
    "ctaButtonText": "Đăng Ký Giữ Chỗ",
    "tagline": "Sự kiện chuyên sâu"
  },
  "cro": {
    "totalScore": 92,
    "headlineScore": 94,
    "urgencyScore": 90,
    "clarityScore": 95,
    "authorityScore": 91,
    "verdict": "Nhận xét ngắn gọn về tỉ lệ chuyển đổi",
    "aiSuggestions": [
      "Gợi ý 1",
      "Gợi ý 2",
      "Gợi ý 3"
    ]
  }
}
`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response');

  const cleanJson = text.trim().replace(/^```json\s*/i, '').replace(/\s*```$/i, '');
  return JSON.parse(cleanJson);
}
