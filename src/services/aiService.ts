import type { EventInput, GeneratedContent, SemanticPageSchema, CROEvaluation, FaqItem } from '../types';
import { detectBestTemplate } from './templateRegistry';

// Preset templates for instant demo during presentation
export const PRESETS: { label: string; iconType: 'ai' | 'marketing' | 'startup' | 'design' | 'studio'; data: EventInput }[] = [
  {
    label: 'AI Agent Summit 2026',
    iconType: 'ai',
    data: {
      eventName: 'VibeCoding Summit: Xây dựng AI Agent từ số 0 đến triển khai',
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
      eventName: 'Growth Hacking Masterclass: Thu hút 10,000 người dùng với ngân sách 0đ',
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
      eventName: 'Startup Demo Day 2026: Kết nối 30+ quỹ đầu tư mạo hiểm',
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
      eventName: 'Thiết kế Landing Page tỉ lệ chuyển đổi cao với tư duy CRO & Design System',
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
  {
    label: 'Cinematic 3D Studio Showcase',
    iconType: 'studio',
    data: {
      eventName: 'Spatial Vision 2026: Đột phá thiết kế không gian 3D & điện ảnh số',
      category: 'studio-3d',
      eventDate: '2026-12-18T19:00',
      location: 'Grand Cinema Hall, Trung tâm Nghệ thuật Số Quận 1, TP. HCM & VR Live Stream',
      speakerName: 'Kenzo Vũ',
      speakerRole: 'Creative Director & Awwwards Judge',
      speakerBio: 'Hơn 12 năm dẫn dắt các dự án CGI/3D tương tác toàn cầu, từng đoạt 8 giải Awwwards Site of the Day và FWA.',
      earlyBirdDiscount: 'Giảm 50% vé Studio Pass VIP + Bộ 3D Spline Asset Kit bản quyền trị giá $299',
      targetAudience: '3D Artists, Motion Designers, Creative Directors & Visual Developers',
      maxCapacity: 60,
    },
  },
];

export interface GenerateLandingPageResult {
  content: GeneratedContent;
  cro: CROEvaluation;
  source: 'gemini-api' | 'smart-fallback';
}

export async function generateLandingPageContent(
  input: EventInput,
  apiKey?: string,
  forceOptimized = false
): Promise<GenerateLandingPageResult> {
  if (apiKey && apiKey.trim() !== '') {
    try {
      const result = await callGeminiAPI(input, apiKey.trim(), forceOptimized);
      if (result) return { ...result, source: 'gemini-api' };
    } catch (err) {
      console.warn('Gemini API call failed, falling back to smart built-in engine:', err);
    }
  }

  const fallback = generateWithSmartEngine(input, forceOptimized);
  return { ...fallback, source: 'smart-fallback' };
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
      ? `Làm chủ hệ sinh thái AI Agent 2026: Đột phá năng suất cùng ${input.speakerName}`
      : cleanTitle('Hội Thảo AI Summit', input.eventName);
    altHeadline = `Đừng để tụt hậu trước làn sóng tự động hóa AI Agent thực chiến`;
    subHeadline = `Khám phá kiến trúc xây dựng và vận hành AI Agent từ quy mô ý tưởng đến sản phẩm thực tế, chia sẻ trực tiếp bởi ${input.speakerName}.`;
    description = `Chương trình thực chiến 100% giúp ${input.targetAudience || 'kỹ sư và tech lead'} nắm vững framework mới nhất, giải quyết bài toán tự động hoá tác vụ phức tạp mà không tốn hàng tháng tự nghiên cứu.`;
  } else if (category === 'marketing') {
    headline = forceOptimized
      ? `Công thức tăng trưởng đột phá: Thu hút hàng ngàn khách hàng tiềm năng`
      : cleanTitle('Growth Masterclass', input.eventName);
    altHeadline = `Bí quyết scale sản phẩm tinh gọn không phụ thuộc vào quảng cáo trả phí`;
    subHeadline = `Toàn bộ framework growth hacking thực chiến đã được kiểm chứng qua case study thực tế của ${input.speakerName}.`;
    description = `Tiếp cận phương pháp thu hút và giữ chân khách hàng hiệu quả nhất hiện nay. Đăng ký sớm để nhận trọn bộ tài liệu và quyền lợi đặc quyền.`;
  } else if (category === 'startup') {
    headline = forceOptimized
      ? `Bứt phá định giá & thu hút vốn đầu tư cùng ${input.speakerName}`
      : cleanTitle('Diễn Đàn Đầu Tư', input.eventName);
    altHeadline = `Cơ hội tiếp cận trực tiếp 30+ quỹ đầu tư hàng đầu khu vực`;
    subHeadline = `Không gian đối thoại kín giữa các nhà sáng lập tiềm năng và những nhà đầu tư mạo hiểm hàng đầu.`;
    description = `Nơi định hình chiến lược tăng trưởng, hoàn thiện mô hình kinh doanh và mở ra cơ hội hợp tác chiến lược cho dự án của bạn.`;
  } else if (category === 'developer') {
    headline = forceOptimized
      ? `Kỹ nghệ phần mềm hiện đại: Xây dựng hệ thống bền vững & chịu tải cao`
      : cleanTitle('Hội Thảo Kỹ Thuật', input.eventName);
    altHeadline = `Học trực tiếp từ chuyên gia vận hành hệ thống hàng triệu người dùng`;
    subHeadline = `Đi sâu vào kiến trúc microservices, tối ưu hiệu năng và quy trình CI/CD thực tế cùng ${input.speakerName}.`;
    description = `Thực hành trên bài toán thực tế, trao đổi trực tiếp mã nguồn và thảo luận sâu về những thách thức kỹ thuật cốt lõi.`;
  } else if (category === 'design') {
    headline = forceOptimized
      ? `Thiết kế vì chuyển đổi: Tối ưu trải nghiệm & gia tăng doanh thu vượt trội`
      : cleanTitle('Masterclass Thiết Kế', input.eventName);
    altHeadline = `Bí quyết xây dựng trải nghiệm khiến khách hàng ra quyết định mua hàng`;
    subHeadline = `Ứng dụng tâm lý học hành vi và design system thực chiến vào thiết kế sản phẩm số cùng ${input.speakerName}.`;
    description = `Phân tích chi tiết quy trình audit UX, cách xây dựng luồng trải nghiệm tối ưu tỉ lệ chuyển đổi từ góc nhìn chuyên gia.`;
  } else if (category === 'studio-3d') {
    headline = forceOptimized
      ? `Trải nghiệm không gian số & nghệ thuật 3D đột phá cùng ${input.speakerName}`
      : cleanTitle('Cinematic 3D Studio', input.eventName);
    altHeadline = `Tiêu chuẩn thiết kế & kỹ xảo điện ảnh đoạt giải Awwwards 2026`;
    subHeadline = `Khám phá quy trình sáng tạo thế giới 3D tương tác, kỹ xảo điện ảnh và trải nghiệm số đa giác quan từ ${input.speakerName}.`;
    description = `Được định hình theo phong cách MDX Studio danh giá: tích hợp canvas 360° siêu thực, âm thanh Web Audio và nghệ thuật tương tác chạm đến cảm xúc.`;
  } else {
    headline = forceOptimized
      ? `Lộ trình tinh gọn để nâng tầm kỹ năng cùng ${input.speakerName}`
      : cleanTitle('Workshop Chuyên Sâu', input.eventName);
    altHeadline = `Nắm bắt phương pháp luận thực chiến chỉ sau một phiên học`;
    subHeadline = `Trải nghiệm học tập tương tác cao, kết nối trực tiếp cùng giảng viên và cộng đồng.`;
    description = `Chương trình được thiết kế cô đọng, tập trung vào kỹ năng ứng dụng ngay vào công việc hàng ngày.`;
  }

  let benefits = [
    {
      title: 'Kiến thức thực chiến 100%',
      description: 'Phân tích case study thực tế, tập trung vào giải pháp ứng dụng ngay mà không rườm rà lý thuyết.',
      iconName: 'zap' as const,
    },
    {
      title: 'Đối thoại trực tiếp cùng chuyên gia',
      description: `Q&A trực tiếp và nhận định hướng cụ thể từ ${input.speakerName || 'diễn giả'}.`,
      iconName: 'award' as const,
    },
    {
      title: 'Tài liệu & quyền lợi độc quyền',
      description: input.earlyBirdDiscount || 'Toàn bộ slide trình bày, bản thu âm và bộ công cụ mẫu dành riêng cho người tham gia.',
      iconName: 'target' as const,
    },
  ];

  if (category === 'studio-3d') {
    benefits = [
      {
        title: 'Hero Canvas 360° siêu thực (WebGL 60fps)',
        description: 'Tối ưu hóa kiến trúc Double-Buffered 3D Canvas, tương tác mượt mà trên mọi thiết bị chuẩn điện ảnh.',
        iconName: 'zap' as const,
      },
      {
        title: 'Masterclass thiết kế chuẩn SOTD Awwwards',
        description: `Học hỏi trực tiếp tư duy đạo diễn nghệ thuật, ánh sáng CGI Dark Luxe và không gian số từ ${input.speakerName || 'Creative Director'}.`,
        iconName: 'award' as const,
      },
      {
        title: 'Thư viện Shader 3D & Web Audio độc quyền',
        description: input.earlyBirdDiscount || 'Nhận trọn bộ source code tương tác, GLSL shaders và sound effects ambient bản quyền cao cấp.',
        iconName: 'target' as const,
      },
    ];
  }

  let agenda = [
    {
      time: '08:30 - 09:00',
      title: 'Check-in & Đón tiếp khách mời',
      description: 'Gặp gỡ, nhận tài liệu sự kiện và kết nối nhanh cùng cộng đồng.',
    },
    {
      time: '09:00 - 10:15',
      title: 'Phiên 1: Bức tranh toàn cảnh & xu hướng mới',
      description: `Diễn giả ${input.speakerName} trình bày phân tích chuyên sâu và bài học thực tiễn.`,
      speaker: input.speakerName,
    },
    {
      time: '10:15 - 11:30',
      title: 'Phiên 2: Phân tích case study & giải pháp cốt lõi',
      description: 'Mổ xẻ quy trình giải quyết vấn đề và framework triển khai thực tế.',
    },
    {
      time: '11:30 - 12:00',
      title: 'Phiên 3: Q&A đối thoại & trao giải',
      description: 'Giải đáp thắc mắc trực tiếp cùng người tham dự và trao các phần quà sớm.',
    },
  ];

  if (category === 'studio-3d') {
    agenda = [
      {
        time: '18:30 - 19:00',
        title: 'Red Carpet & Ambient Audio Sensory Lounge',
        description: 'Đón tiếp VIP, trải nghiệm không gian âm thanh tần số thấp và hiệu ứng ánh sáng tương tác đa hướng.',
      },
      {
        time: '19:00 - 20:00',
        title: 'Keynote: Giải mã kiến trúc trải nghiệm 3D chuẩn MDX & Awwwards',
        description: `${input.speakerName} trực tiếp bóc tách kiến trúc Canvas 360°, directional hover và nghệ thuật typography avant-garde.`,
        speaker: input.speakerName,
      },
      {
        time: '20:00 - 21:00',
        title: 'Live Workshop: Xây dựng không gian 3D thời gian thực 60fps',
        description: 'Thực hành kết nối WebGL shader, hiệu ứng Clip-Path bento grid và trigger âm thanh phản hồi xúc giác trong trình duyệt.',
      },
      {
        time: '21:00 - 21:30',
        title: 'Exhibition & Trao Tặng Exclusive 3D Asset Kit',
        description: 'Giao lưu cùng cộng đồng 3D Creator, nhận mã bản quyền bộ asset 3D độc quyền và vinh danh tác phẩm ấn tượng.',
      },
    ];
  }

  let faqs: FaqItem[] = [
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

  if (category === 'studio-3d') {
    faqs = [
      {
        question: 'Tôi có cần cấu hình máy tính đồ họa khủng để tham gia không?',
        answer: 'Không bắt buộc! Toàn bộ không gian 3D tương tác và demo được tối ưu hóa chạy trực tiếp trên trình duyệt hiện đại (Chrome/Edge/Safari) nhờ công nghệ Double-Buffered WebGL siêu nhẹ.',
      },
      {
        question: 'Sau sự kiện tôi có được cung cấp mã nguồn 3D và file project không?',
        answer: 'Chắc chắn có! Toàn bộ người tham dự sẽ nhận được quyền truy cập GitHub repo chứa mã nguồn canvas 360°, các shader GLSL tùy biến và bộ sound effect Web Audio độc bản.',
      },
      {
        question: 'Ưu đãi Studio Pass độc quyền áp dụng như thế nào?',
        answer: input.earlyBirdDiscount
          ? `Quyền lợi "${input.earlyBirdDiscount}" chỉ dành riêng cho số lượng giới hạn những nhà sáng tạo đăng ký đầu tiên. Cổng đăng ký sẽ tự đóng ngay khi đạt đủ sĩ số.`
          : 'Ưu đãi vé Studio Pass đặc quyền áp dụng cho những người hoàn tất đăng ký sớm nhất.',
      },
      {
        question: 'Buổi showcase có cấp chứng chỉ ghi nhận tham dự không?',
        answer: 'Có! Mỗi học viên tham gia trọn vẹn sẽ được cấp Certificate of Creative Excellence với chữ ký số của Giám đốc Nghệ thuật và mã định danh quốc tế.',
      },
    ];
  }

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

  const content: SemanticPageSchema = {
    matchedTemplateId: category,
    headline,
    alternativeHeadline: altHeadline,
    subHeadline,
    description,
    benefits,
    agenda,
    faqs,
    earlyBirdBadge: input.earlyBirdDiscount || 'Ưu đãi Early Bird có hạn',
    ctaButtonText: category === 'studio-3d' ? 'Trải nghiệm không gian 3D ngay' : 'Đăng ký tham gia ngay',
    tagline: category === 'studio-3d' ? 'AWWWARDS SITE OF THE DAY • CINEMATIC EXPERIENCE' : 'Sự kiện chuyên sâu không thể bỏ lỡ',
  };

  return { content, cro };
}

export const getFallbackContent = generateWithSmartEngine;

const ACTIVE_GEMINI_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-flash-lite-latest',
  'gemini-3.5-flash',
  'gemini-3.8-flash',
];

async function fetchGeminiContent(
  apiKey: string,
  body: Record<string, unknown>
): Promise<Response> {
  const envModel = import.meta.env.VITE_GEMINI_MODEL as string;
  const modelsToTry = [
    ...(envModel ? [envModel] : []),
    ...ACTIVE_GEMINI_MODELS.filter((m) => m !== envModel),
  ];

  let lastResponse: Response | null = null;
  let lastError: unknown = null;

  for (const model of modelsToTry) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        return res;
      }

      lastResponse = res;
      // If 404 (model sunset/not available), 503 (high demand spike), or 429 (quota exceeded on specific model), cascade to next
      if (res.status === 404 || res.status === 503 || res.status === 429) {
        console.warn(`Gemini model ${model} returned ${res.status}, automatically cascading to next active model...`);
        continue;
      }

      // If invalid key (400/403), stop retrying and return error
      return res;
    } catch (err) {
      lastError = err;
    }
  }

  if (lastResponse) return lastResponse;
  throw lastError || new Error('All Gemini models failed');
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

QUY TẮC BẮT BUỘC VỀ VĂN PHONG TIẾNG VIỆT:
- Dùng văn phong tự nhiên, viết hoa theo đúng quy tắc tiếng Việt (Sentence case cho câu, tiêu đề và lợi ích; CHỈ viết hoa chữ cái đầu câu hoặc danh từ riêng/từ viết tắt như AI, Google, FPT, VC).
- TUYỆT ĐỐI KHÔNG viết hoa từng chữ cái đầu của mỗi từ (Title Case kiểu tiếng Anh) như "Đăng Ký Tham Gia Sự Kiện".

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
    "ctaButtonText": "Đăng ký giữ chỗ",
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

  const response = await fetchGeminiContent(apiKey, {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.7,
    },
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response');

  const cleanJson = text.trim().replace(/^```json\s*/i, '').replace(/\s*```$/i, '');
  const parsed = JSON.parse(cleanJson);
  if (parsed?.content) {
    parsed.content.matchedTemplateId = input.category || detectBestTemplate(input.eventName, input.targetAudience).id;
  }
  return parsed;
}

export type RewriteStyle = 'concise' | 'fomo' | 'luxury';

export interface RewriteOptions {
  text: string;
  style: RewriteStyle;
  apiKey?: string;
  category?: string;
}

export async function rewriteCopyContent(options: RewriteOptions): Promise<string> {
  const { text, style, apiKey, category } = options;
  if (!text || text.trim() === '') return text;

  // 1. Try real Gemini API if key is present
  if (apiKey && apiKey.trim() !== '') {
    try {
      const rewritten = await callGeminiRewriteAPI(text.trim(), style, apiKey.trim(), category);
      if (rewritten && rewritten.trim() !== '') {
        return rewritten.trim();
      }
    } catch (err) {
      console.warn('Gemini Rewrite API error, using smart local rewrite engine:', err);
    }
  }

  // 2. Fallback to smart offline copywriting engine
  return rewriteWithSmartFallback(text.trim(), style);
}

async function callGeminiRewriteAPI(
  text: string,
  style: RewriteStyle,
  apiKey: string,
  category?: string
): Promise<string> {
  const styleInstruction = {
    concise: 'Ngắn gọn hơn: Cắt bỏ mọi từ thừa, câu chữ cô đọng, súc tích, nhịp nhanh, đanh thép, dễ đọc lướt.',
    fomo: 'Tăng tính khẩn cấp (FOMO): Nhấn mạnh sự khan hiếm, cơ hội cuối cùng, số suất có hạn, kích thích hành động ngay kẻo bỏ lỡ.',
    luxury: 'Sang trọng hơn: Dùng ngôn từ tinh hoa, đẳng cấp, chuyên nghiệp chuẩn C-Level / Executive Summit, gia tăng uy tín và vị thế.',
  }[style];

  const prompt = `
Bạn là chuyên gia Copywriting & Tối ưu chuyển đổi (CRO) hàng đầu.
Nhiệm vụ: Hãy viết lại câu/đoạn văn bản sau cho Landing Page sự kiện theo phong cách yêu cầu.

Văn bản gốc:
"${text}"

Phong cách yêu cầu:
${styleInstruction}

Ngữ cảnh sự kiện: ${category || 'Sự kiện công nghệ, kinh doanh chuyên nghiệp'}

QUY TẮC BẮT BUỘC:
- Chỉ trả về DUY NHẤT câu/đoạn văn bản tiếng Việt đã được viết lại hoàn chỉnh.
- KHÔNG dùng dấu ngoặc kép bọc ngoài câu.
- KHÔNG thêm bất kỳ lời giải thích, lời chào, tiền tố hay hậu tố nào.
- Dùng văn phong tự nhiên, viết hoa theo đúng quy tắc tiếng Việt (Sentence case). TUYỆT ĐỐI KHÔNG viết hoa chữ cái đầu của mỗi từ (Title Case).
`;

  const response = await fetchGeminiContent(apiKey, {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.85,
      maxOutputTokens: 200,
    },
  });

  if (!response.ok) {
    throw new Error(`Gemini Rewrite API status: ${response.status}`);
  }

  const data = await response.json();
  const rawResult = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawResult) throw new Error('Empty rewrite text from Gemini');

  return rawResult.trim().replace(/^["“']|["”']$/g, '');
}

function rewriteWithSmartFallback(text: string, style: RewriteStyle): string {
  const clean = text.trim();

  if (style === 'concise') {
    // Rút gọn từ thừa, cô đọng
    let result = clean
      .replace(/^(Chương trình|Hội thảo|Sự kiện|Workshop|Khám phá|Tìm hiểu cách)\s+/i, '')
      .replace(/từ số 0 đến triển khai/i, 'thực chiến')
      .replace(/dành cho\s+.*$/i, '')
      .replace(/một cách hiệu quả và bền vững/i, 'đột phá')
      .trim();

    if (result.length > 55) {
      const parts = result.split(/[:—\-]/);
      if (parts.length > 1) {
        result = parts[0].trim();
      }
    }
    return result || clean;
  }

  if (style === 'fomo') {
    // Tăng tính khẩn cấp FOMO
    if (/chỉ còn|sắp hết|vé cuối|đừng bỏ lỡ/i.test(clean)) {
      return `[Gấp] Chỉ còn 12 suất: ${clean.replace(/^\[.*?\]\s*/, '')}`;
    }
    const fomoPrefixes = [
      '⚡ Đừng bỏ lỡ:',
      '🔥 Cơ hội cuối cùng:',
      '⏳ Sắp đóng đăng ký:',
      '🚀 Chỉ còn 15 vé sớm:',
    ];
    const prefix = fomoPrefixes[Math.floor(Math.random() * fomoPrefixes.length)];
    return `${prefix} ${clean}`;
  }

  if (style === 'luxury') {
    // Sang trọng, đẳng cấp Executive
    let elevated = clean
      .replace(/khóa học|lớp học/gi, 'Chương trình đào tạo cấp cao')
      .replace(/buổi chia sẻ/gi, 'Hội đàm thượng đỉnh')
      .replace(/giảm giá/gi, 'Đặc quyền đặc biệt')
      .replace(/hướng dẫn/gi, 'Chuyển giao chiến lược');

    if (!/thượng đỉnh|đặc quyền|tinh hoa|chiến lược/i.test(elevated)) {
      elevated = `Hội nghị thượng đỉnh: ${elevated}`;
    }
    return elevated;
  }

  return clean;
}
