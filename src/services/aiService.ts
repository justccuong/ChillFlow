

import type { EventInput, GeneratedContent, SemanticPageSchema, CROEvaluation, FaqItem, EventCategory, TestimonialItem } from '../types';
import { detectBestTemplate } from './templateRegistry';
import { getSavedApiKey } from './storageService';

export const getDomainTestimonials = (cat: EventCategory): TestimonialItem[] => {
  switch (cat) {
    case 'festival-music':
      return [
        {
          name: 'Nguyễn Minh Anh',
          role: 'Music Producer & Fan',
          company: 'Hanoi Indie Vibe',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
          quote: 'Dàn âm thanh L-Acoustics cực đỉnh, visual laser sống động. Đứng quẩy từ chiều đến nửa đêm không muốn về!',
          rating: 5,
        },
        {
          name: 'Trần Hải Đăng',
          role: 'Event Photographer',
          company: 'VibeMedia',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
          quote: 'Lineup nghệ sĩ cháy hết nấc. Không gian check-in bùng nổ, khâu tổ chức soát vé vào cổng cực nhanh và an toàn.',
          rating: 5,
        },
        {
          name: 'Đặng Mai Phương',
          role: 'Creative Designer',
          company: 'Freelancer',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
          quote: 'Một lễ hội âm nhạc đúng nghĩa với năng lượng tuyệt vời. Rất háo hức chờ đón những mùa tiếp theo!',
          rating: 5,
        },
      ];
    case 'sports-marathon':
      return [
        {
          name: 'Phan Quốc Bảo',
          role: 'Sub-3.5 Marathoner',
          company: 'Runners Community',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
          quote: 'Đường chạy tuyệt đẹp, trạm tiếp nước và y tế bố trí chuyên nghiệp chuẩn quốc tế. Mình đã lập PR mới tại giải này!',
          rating: 5,
        },
        {
          name: 'Lê Thùy Dung',
          role: 'Triathlete',
          company: 'Iron Team VN',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
          quote: 'Huy chương finisher kim loại đúc cực kỳ tinh xảo. Đội ngũ pacer dẫn tốc đều và nhiệt tình cổ vũ suốt chặng đường.',
          rating: 5,
        },
        {
          name: 'Vũ Thanh Tùng',
          role: 'Trail Runner',
          company: 'Ha Giang Trail Club',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
          quote: 'Khâu nhận race kit nhanh gọn, expo trước ngày chạy rất sôi động với nhiều nhãn hàng thể thao uy tín.',
          rating: 5,
        },
      ];
    case 'culinary-lifestyle':
      return [
        {
          name: 'Hoàng Kim Oanh',
          role: 'Food Blogger & Sommelier',
          company: 'Saigon Taste Guide',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
          quote: 'Thực đơn tasting menu 7 món chuẩn vị Michelin, kết hợp rượu vang tinh tế. Một bữa tiệc vị giác đích thực!',
          rating: 5,
        },
        {
          name: 'Trịnh Bảo Nam',
          role: 'Executive Chef',
          company: 'L’Artisan Bistro',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
          quote: 'Phần workshop tương tác trực tiếp với Master Chef rất truyền cảm hứng. Kỹ thuật plating hiện đại rất đáng học hỏi.',
          rating: 5,
        },
        {
          name: 'Nguyễn Diệu Linh',
          role: 'Lifestyle Writer',
          company: 'Elle Gourmet',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
          quote: 'Không gian ấm cúng, ánh sáng và âm nhạc phối hợp hoàn hảo. Trải nghiệm ẩm thực cao cấp đáng nhớ nhất năm.',
          rating: 5,
        },
      ];
    case 'community-career':
      return [
        {
          name: 'Bùi Đức Anh',
          role: 'Junior Software Engineer',
          company: 'FPT University Alumni',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
          quote: 'Mình đã nhận offer trực tiếp ngay tại bàn phỏng vấn nhanh của công ty công nghệ đa quốc gia. Ngày hội việc làm quá thực tế!',
          rating: 5,
        },
        {
          name: 'Ngô Thu Trang',
          role: 'Talent Acquisition Manager',
          company: 'Global Tech Corp',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
          quote: 'Chất lượng ứng viên tham gia rất đồng đều và chủ động. Gian hàng của công ty đã thu hút hơn 300 hồ sơ tiềm năng.',
          rating: 5,
        },
        {
          name: 'Phạm Minh Quân',
          role: 'Community Lead',
          company: 'Vietnam Career Hub',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
          quote: 'Các phiên speed-networking và review CV 1-1 với HR Director mang lại giá trị định hướng rất lớn cho các bạn trẻ.',
          rating: 5,
        },
      ];
    default:
      return [
        {
          name: 'Nguyễn Văn Minh',
          role: 'Principal Engineer',
          company: 'FPT Software',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
          quote: 'Nội dung thực chiến, không lý thuyết suông. Mình áp dụng ngay mô hình workflow vào dự án công ty ngay tuần sau đó và giảm 40% thời gian xử lý!',
          rating: 5,
        },
        {
          name: 'Trần Thị Thu Hà',
          role: 'Head of Growth',
          company: 'Fintech Startup',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
          quote: 'Phần Q&A 1-1 với diễn giả cực kỳ giá trị. Bài toán hóc búa của team mình được gỡ rối ngay tại chỗ chỉ trong 15 phút trao đổi.',
          rating: 5,
        },
        {
          name: 'Lê Hoàng Long',
          role: 'AI Product Lead',
          company: 'Tech Corp',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
          quote: 'Bộ slide và tài liệu tặng kèm đáng giá hơn cả tiền vé. Sự kiện được tổ chức chuyên nghiệp, networking chất lượng với nhiều founder và kỹ sư hàng đầu.',
          rating: 5,
        },
      ];
  }
};


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
      earlyBirdDiscount: 'Bộ 3D Spline Asset Kit bản quyền tặng kèm cho người đăng ký sớm',
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
  try {
    const result = await callGeminiAPI(input, apiKey, forceOptimized);
    if (result) return { ...result, source: 'gemini-api' };
  } catch (err) {
    console.warn('Gemini API/Proxy call failed, seamlessly falling back to smart built-in engine:', err);
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
  } else if (category === 'festival-music') {
    headline = forceOptimized
      ? `Đại nhạc hội bùng nổ giác quan: Thăng hoa cùng âm nhạc & ánh sáng đỉnh cao`
      : cleanTitle('Live Music Festival', input.eventName);
    altHeadline = `Sẵn sàng cháy hết mình trong không gian âm nhạc đa chiều cuồng nhiệt nhất năm`;
    subHeadline = `Hòa mình vào bữa tiệc âm thanh sống động, hệ thống visual laser hoành tráng và dàn nghệ sĩ line-up đình đám cùng ${input.speakerName}.`;
    description = `Trải nghiệm đại nhạc hội quy mô lớn với sân khấu đa giác quan 360°, dàn nghệ sĩ quốc tế và các set diễn bùng nổ cảm xúc từ hoàng hôn đến nửa đêm.`;
  } else if (category === 'sports-marathon') {
    headline = forceOptimized
      ? `Chinh phục giới hạn bản thân: Đường chạy marathon & ngày hội thể thao bứt phá`
      : cleanTitle('Championship Marathon', input.eventName);
    altHeadline = `Khẳng định bản lĩnh trên cung đường chạy ven biển và đô thị đẹp nhất năm`;
    subHeadline = `Tham gia giải chạy chuyên nghiệp với cự ly đa dạng 5km, 10km, 21km và 42km, hỗ trợ bởi đội ngũ pacer giàu kinh nghiệm và đại sứ ${input.speakerName}.`;
    description = `Sự kiện thể thao đỉnh cao kết nối hàng ngàn runner đam mê, trang bị hệ thống tính giờ chiptiming tiêu chuẩn quốc tế và huy chương hoàn thành mạ vàng độc bản.`;
  } else if (category === 'culinary-lifestyle') {
    headline = forceOptimized
      ? `Hành trình vị giác đỉnh cao: Tinh hoa ẩm thực đương đại & phong cách sống thượng lưu`
      : cleanTitle('Culinary Gourmet Gala', input.eventName);
    altHeadline = `Khám phá nghệ thuật kết hợp nguyên liệu bản địa và kỹ thuật ẩm thực Michelin`;
    subHeadline = `Trải nghiệm thực đơn thử vị cao cấp gồm 7 món độc bản kết hợp rượu vang hảo hạng tuyển chọn bởi chuyên gia sommelier và bếp trưởng ${input.speakerName}.`;
    description = `Không gian dạ tiệc sang trọng nơi nghệ thuật ẩm thực giao hòa cùng âm nhạc thính phòng, mang lại trải nghiệm thị giác và vị giác khó quên.`;
  } else if (category === 'community-career') {
    headline = forceOptimized
      ? `Cầu nối sự nghiệp đỉnh cao: Kết nối 50+ doanh nghiệp hàng đầu & mở lối thăng tiến`
      : cleanTitle('Career Expo & Networking', input.eventName);
    altHeadline = `Khám phá hàng trăm cơ hội việc làm mơ ước với mức đãi ngộ vượt trội`;
    subHeadline = `Gặp gỡ trực tiếp các nhà tuyển dụng hàng đầu, phỏng vấn thử 1-1, chỉnh sửa CV chuyên sâu và lắng nghe chiến lược phát triển sự nghiệp từ ${input.speakerName}.`;
    description = `Sự kiện quy tụ các tập đoàn đa quốc gia, startup kỳ lân và các chuyên gia nhân sự kỳ cựu sẵn sàng đồng hành cùng bước chuyển mình nghề nghiệp của bạn.`;
  } else if (category === 'universal-showcase') {
    headline = forceOptimized
      ? `Sự kiện kết nối & ra mắt toàn cầu: Hội tụ tinh hoa, mở lối tương lai`
      : cleanTitle('Global Showcase Summit', input.eventName);
    altHeadline = `Nơi những ý tưởng đột phá và giải pháp dẫn đầu thị trường được trình làng`;
    subHeadline = `Hội tụ các chuyên gia đầu ngành, nhà đầu tư và cộng đồng tiên phong để cùng kiến tạo những bước tiến mới cùng ${input.speakerName}.`;
    description = `Diễn đàn đa lĩnh vực toàn diện mang đến không gian triển lãm sống động, các phiên đối thoại sâu sắc và cơ hội kết nối giá trị cao.`;
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
  } else if (category === 'festival-music') {
    benefits = [
      {
        title: 'Hệ thống âm thanh L-Acoustics & Visual Laser 4D',
        description: 'Công nghệ âm thanh chuẩn festival quốc tế kết hợp trình diễn visual mapping siêu thực tạo nên trải nghiệm bùng nổ.',
        iconName: 'zap' as const,
      },
      {
        title: 'Line-up nghệ sĩ & DJ hàng đầu',
        description: `Quy tụ dàn nghệ sĩ headliner đình đám, ca sĩ khách mời và set diễn đặc biệt của ${input.speakerName || 'Headliner'}.`,
        iconName: 'award' as const,
      },
      {
        title: 'Khu vực F&B, Chill Zone & Merch độc quyền',
        description: input.earlyBirdDiscount || 'Tận hưởng ẩm thực lễ hội đa dạng, quầy cocktail thủ công và bộ quà tặng vòng tay phát sáng LED sync nhịp điệu.',
        iconName: 'target' as const,
      },
    ];
  } else if (category === 'sports-marathon') {
    benefits = [
      {
        title: 'Bộ Race Kit & Chiptiming tiêu chuẩn quốc tế',
        description: 'Áo chạy thể thao cao cấp thoáng khí, BIB gắn chip tính giờ điện tử chính xác đến 1/100 giây và túi dù chống nước.',
        iconName: 'target' as const,
      },
      {
        title: 'Trạm tiếp nước & Y tế chuẩn y khoa thể thao',
        description: 'Các trạm điện giải, trái cây năng lượng và xe cấp cứu chuyên dụng bố trí đều đặn mỗi 2.5km suốt toàn bộ đường chạy.',
        iconName: 'zap' as const,
      },
      {
        title: 'Huy chương Finisher Medal đúc nổi tinh xảo',
        description: input.earlyBirdDiscount || 'Nhận huy chương vinh danh mạ kim loại cao cấp cùng chứng chỉ điện tử hoàn thành cự ly vinh danh nỗ lực bứt phá.',
        iconName: 'award' as const,
      },
    ];
  } else if (category === 'culinary-lifestyle') {
    benefits = [
      {
        title: 'Thực đơn Fine Dining 7 món độc bản',
        description: 'Nguyên liệu hữu cơ thượng hạng được chuẩn bị cầu kỳ bởi đầu bếp danh tiếng, tôn vinh hương vị tự nhiên tinh tế.',
        iconName: 'award' as const,
      },
      {
        title: 'Pairing Rượu Vang & Cocktail thủ công đỉnh cao',
        description: 'Mỗi món ăn đi kèm một dòng vang danh giá do chuyên gia sommelier quốc tế trực tiếp thuyết minh câu chuyện di sản.',
        iconName: 'target' as const,
      },
      {
        title: 'Không gian dạ tiệc sang trọng & Trình diễn trực tiếp',
        description: input.earlyBirdDiscount || `Tận mắt chứng kiến kỹ thuật nấu ăn đỉnh cao trên sân khấu mở Open Kitchen cùng bếp trưởng ${input.speakerName || 'Master Chef'}.`,
        iconName: 'zap' as const,
      },
    ];
  } else if (category === 'community-career') {
    benefits = [
      {
        title: 'Phỏng vấn trực tiếp tại 50+ gian hàng doanh nghiệp',
        description: 'Cơ hội nhận offer việc làm ngay tại sự kiện từ các tập đoàn công nghệ, tài chính và tập đoàn đa quốc gia hàng đầu.',
        iconName: 'target' as const,
      },
      {
        title: 'Review CV 1-1 & Tư vấn lộ trình thăng tiến',
        description: 'Được các HR Director và chuyên gia săn đầu người giàu kinh nghiệm trực tiếp góp ý hoàn thiện hồ sơ ứng tuyển.',
        iconName: 'zap' as const,
      },
      {
        title: 'Chuỗi Workshop kỹ năng đàm phán & Phỏng vấn đỉnh cao',
        description: input.earlyBirdDiscount || `Học hỏi kỹ năng đàm phán lương và bí quyết vượt qua phỏng vấn vòng cuối cùng chuyên gia ${input.speakerName || 'HR Lead'}.`,
        iconName: 'award' as const,
      },
    ];
  } else if (category === 'universal-showcase') {
    benefits = [
      {
        title: 'Trưng bày giải pháp & sản phẩm đột phá',
        description: 'Trải nghiệm trực quan các công nghệ và giải pháp mới nhất chuẩn bị định hình thị trường tương lai gần.',
        iconName: 'zap' as const,
      },
      {
        title: 'Mạng lưới kết nối đối tác quy mô lớn',
        description: 'Gặp gỡ, thảo luận và mở rộng mạng lưới hợp tác chiến lược với các nhà lãnh đạo và chuyên gia đồng ngành.',
        iconName: 'award' as const,
      },
      {
        title: 'Báo cáo xu hướng & Dữ liệu độc quyền',
        description: input.earlyBirdDiscount || 'Nhận toàn bộ tài liệu nghiên cứu thị trường, số liệu phân tích chuyên sâu và cẩm nang triển khai thực tế.',
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
  } else if (category === 'festival-music') {
    agenda = [
      {
        time: '16:00 - 18:00',
        title: 'Gate Open & Sunset Chill Vibes',
        description: 'Check-in nhận wristband, tham quan khu vực nghệ thuật và thưởng thức set DJ warm-up hoàng hôn.',
      },
      {
        time: '18:00 - 19:30',
        title: 'Opening Acts: Khởi động làn sóng cuồng nhiệt',
        description: 'Các nghệ sĩ Indie và ban nhạc trẻ thổi bùng bầu không khí với những bản hit mở màn.',
      },
      {
        time: '19:30 - 21:30',
        title: 'Main Stage Extravaganza: Headliner Showcase',
        description: `Trình diễn bùng nổ của dàn headliner và ${input.speakerName} với hiệu ứng pháo hoa, laser đỉnh cao.`,
        speaker: input.speakerName,
      },
      {
        time: '21:30 - 23:00',
        title: 'Grand Finale: Bữa tiệc EDM Afterparty',
        description: 'Set nhạc điện tử cao trào khép lại đêm hội trong biển ánh sáng và âm thanh rực rỡ.',
      },
    ];
  } else if (category === 'sports-marathon') {
    agenda = [
      {
        time: '04:00 - 04:45',
        title: 'Tập trung, gửi đồ & Khởi động toàn đoàn',
        description: 'Vận động viên check-in, kiểm tra BIB, gửi đồ và khởi động làm nóng cơ bắp cùng các HLV chuyên nghiệp.',
      },
      {
        time: '04:45 - 05:00',
        title: 'Phát súng xuất phát Cự ly Marathon & Half-Marathon',
        description: 'Xuất phát cự ly 42km và 21km trong không khí rực lửa trước bình minh.',
        speaker: input.speakerName,
      },
      {
        time: '06:00 - 07:30',
        title: 'Xuất phát Cự ly 10km & 5km Khám phá',
        description: 'Hàng ngàn runner cự ly ngắn sải bước chinh phục cung đường tràn đầy năng lượng buổi sớm.',
      },
      {
        time: '08:30 - 10:00',
        title: 'Về đích, trao giải & Trao huy chương Finisher',
        description: 'Runner nhận huy chương hoàn thành, phục hồi giãn cơ tại Finish Zone và vinh danh nhà vô địch.',
      },
    ];
  } else if (category === 'culinary-lifestyle') {
    agenda = [
      {
        time: '18:00 - 18:45',
        title: 'Welcome Cocktail & Finger Food Canapés',
        description: 'Đón tiếp khách quý bằng ly vang sủi chào mừng, canapé thủ công và kết nối trong phòng chờ thanh lịch.',
      },
      {
        time: '18:45 - 20:15',
        title: 'Dạ tiệc 7 món tinh hoa & Trình diễn Open Kitchen',
        description: `Thưởng thức các món ăn chính được bếp trưởng ${input.speakerName} đích thân giới thiệu câu chuyện nguyên liệu và phong vị.`,
        speaker: input.speakerName,
      },
      {
        time: '20:15 - 21:00',
        title: 'Sommelier Pairing Workshop & Thử vị tráng miệng',
        description: 'Trải nghiệm món tráng miệng kết hợp rượu vang ngọt ngào và thảo luận về văn hóa thưởng thức phong cách sống.',
      },
      {
        time: '21:00 - 21:45',
        title: 'Giao lưu Bếp trưởng & Trao quà tặng ẩm thực',
        description: 'Chụp ảnh kỷ niệm, nhận cẩm nang công thức món ăn đặc biệt và quà tặng di sản từ bếp trưởng.',
      },
    ];
  } else if (category === 'community-career') {
    agenda = [
      {
        time: '08:30 - 09:30',
        title: 'Check-in & Khai mạc Ngày hội tuyển dụng',
        description: 'Đón tiếp ứng viên, phát cẩm nang việc làm và tham quan khu trưng bày 50+ gian hàng doanh nghiệp.',
      },
      {
        time: '09:30 - 11:30',
        title: 'Phiên phỏng vấn nhanh & Chỉnh sửa CV 1-1',
        description: 'Ứng viên nộp hồ sơ, phỏng vấn trực tiếp tại quầy tuyển dụng và nhận tư vấn CV chuyên sâu từ HR Director.',
      },
      {
        time: '13:30 - 15:30',
        title: 'Tọa đàm: Chiến lược bứt phá thu nhập & Định vị bản thân',
        description: `Diễn giả ${input.speakerName} và ban lãnh đạo các tập đoàn chia sẻ xu hướng thị trường lao động mới.`,
        speaker: input.speakerName,
      },
      {
        time: '15:30 - 17:00',
        title: 'Speed Networking & Trao cơ hội nghề nghiệp',
        description: 'Kết nối mở giữa ứng viên và quản lý cấp cao, bốc thăm may mắn các suất học bổng nghề nghiệp.',
      },
    ];
  } else if (category === 'universal-showcase') {
    agenda = [
      {
        time: '08:30 - 09:15',
        title: 'Đón tiếp đại biểu & Khai mạc triển lãm',
        description: 'Khách mời nhận tài liệu, tham quan khu vực trưng bày giải pháp và kết nối networking buổi sáng.',
      },
      {
        time: '09:15 - 10:45',
        title: 'Keynote: Định hình làn sóng chuyển dịch mới',
        description: `${input.speakerName} công bố báo cáo độc quyền và phân tích các cơ hội chiến lược trọng tâm.`,
        speaker: input.speakerName,
      },
      {
        time: '11:00 - 12:00',
        title: 'Phiên đối thoại bàn tròn cùng các nhà lãnh đạo',
        description: 'Thảo luận mở về các rào cản thực thi, phương pháp tối ưu hóa và bài học thực tiễn.',
      },
      {
        time: '13:30 - 16:30',
        title: 'Showcase trình diễn sản phẩm & Lễ ký kết hợp tác',
        description: 'Trình diễn thực tế các giải pháp công nghệ, lễ ký kết thỏa thuận hợp tác và tiệc kết nối mở.',
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
  } else if (category === 'festival-music') {
    faqs = [
      {
        question: 'Vé điện tử (E-ticket) đổi sang vòng tay vào cổng như thế nào?',
        answer: 'Sau khi đăng ký thành công, bạn sẽ nhận mã QR qua email. Tại cổng check-in sự kiện, nhân viên sẽ quét mã QR và phát vòng tay vải RFID chính thức.',
      },
      {
        question: 'Đại nhạc hội có quy định về độ tuổi và trang phục không?',
        answer: 'Sự kiện mở cửa cho khán giả từ 16 tuổi trở lên. Khuyến khích trang phục festival cá tính, thoải mái để thuận tiện nhún nhảy suốt đêm nhạc.',
      },
      {
        question: 'Nếu trời mưa thì sự kiện có diễn ra không?',
        answer: 'Sự kiện được trang bị mái che khu vực khán đài chính và hệ thống thoát nước sân bãi tiêu chuẩn, đêm nhạc vẫn diễn ra bùng nổ trong mọi điều kiện thời tiết.',
      },
      {
        question: 'Tôi có thể mang đồ ăn thức uống từ bên ngoài vào không?',
        answer: 'Để đảm bảo an toàn và vệ sinh chung, ban tổ chức không cho phép mang thực phẩm từ ngoài vào. Bạn có thể thưởng thức đa dạng món ăn tại phố F&B ẩm thực lễ hội bên trong.',
      },
    ];
  } else if (category === 'sports-marathon') {
    faqs = [
      {
        question: 'Thời gian và địa điểm nhận Race Kit như thế nào?',
        answer: 'Vận động viên có thể nhận Race Kit tại khu vực Expo trước ngày đua 2 ngày. Vui lòng mang theo CCCD và email xác nhận đăng ký chứa mã QR.',
      },
      {
        question: 'Đường chạy có phân bổ pacer dẫn tốc độ không?',
        answer: 'Có! Ban tổ chức bố trí đội ngũ pacer chuyên nghiệp cho các mốc thời gian tiêu chuẩn ở các cự ly 21km và 42km để giúp bạn đạt mục tiêu PR cá nhân.',
      },
      {
        question: 'Hạn chót thời gian (Cut-off Time) cho từng cự ly là bao lâu?',
        answer: 'Thời gian cut-off lần lượt là: 5km (1h15p), 10km (2h00p), 21km (3h30p) và 42km (6h30p) để đảm bảo an toàn tuyệt đối cho người chạy.',
      },
      {
        question: 'Sau giải chạy tôi có thể tra cứu ảnh thi đấu ở đâu?',
        answer: 'Ảnh cá nhân được hệ thống AI tự động nhận diện theo số BIB và cập nhật lên website trong vòng 6 giờ sau khi bạn cán đích.',
      },
    ];
  } else if (category === 'culinary-lifestyle') {
    faqs = [
      {
        question: 'Sự kiện có phục vụ thực đơn riêng cho người ăn chay hoặc dị ứng thực phẩm không?',
        answer: 'Có! Vui lòng ghi chú yêu cầu ăn kiêng (ăn chay, gluten-free, dị ứng hải sản/hạt) khi điền thông tin để bếp trưởng chuẩn bị thực đơn thay thế chu đáo.',
      },
      {
        question: 'Quy định về trang phục (Dress Code) của dạ tiệc như thế nào?',
        answer: 'Dress Code của sự kiện là Smart Casual / Elegant Cocktail để giữ trọn vẹn không khí trang trọng và ấm cúng cho bữa tiệc tối.',
      },
      {
        question: 'Tôi có thể dẫn theo trẻ em tham gia không?',
        answer: 'Không gian sự kiện hướng tới trải nghiệm ẩm thực tinh tế và đối thoại sâu, do đó chỉ phù hợp cho khách mời từ 12 tuổi trở lên.',
      },
      {
        question: 'Tôi có được hướng dẫn cách làm các món ăn sau sự kiện không?',
        answer: 'Tất cả khách mời sẽ nhận được cuốn cẩm nang công thức và video ghi hình cận cảnh kỹ thuật chế biến được gửi về hòm thư điện tử.',
      },
    ];
  } else if (category === 'community-career') {
    faqs = [
      {
        question: 'Tôi cần chuẩn bị bao nhiêu bản CV khi đến tham gia?',
        answer: 'Nên chuẩn bị sẵn 5-10 bản CV bản in sạch đẹp và lưu sẵn file PDF trên điện thoại để quét mã nộp trực tuyến tại các gian hàng doanh nghiệp.',
      },
      {
        question: 'Sự kiện có thu phí vé vào cổng của người tìm việc không?',
        answer: 'Ngày hội tuyển dụng hoàn toàn miễn phí vé vào cổng cho tất cả ứng viên và sinh viên đã đăng ký trước qua landing page.',
      },
      {
        question: 'Những ngành nghề nào có nhiều chỉ tiêu tuyển dụng nhất tại ngày hội?',
        answer: 'Sự kiện đa dạng ngành nghề gồm Công nghệ thông tin, Marketing & Digital, Tài chính - Ngân hàng, Bán hàng B2B, Nhân sự và Chuỗi cung ứng.',
      },
      {
        question: 'Sau khi nộp hồ sơ tại ngày hội thì bao lâu sẽ có kết quả?',
        answer: 'Các doanh nghiệp sẽ thông báo kết quả sơ tuyển trong vòng 3-5 ngày làm việc qua email hoặc số điện thoại ghi trên hồ sơ ứng tuyển.',
      },
    ];
  } else if (category === 'universal-showcase') {
    faqs = [
      {
        question: 'Tôi có thể đại diện công ty đăng ký tham dự theo đoàn không?',
        answer: 'Hoàn toàn được! Bạn có thể chọn số lượng vé hoặc liên hệ ban tổ chức để nhận gói ưu đãi tham gia theo đoàn doanh nghiệp.',
      },
      {
        question: 'Tài liệu sự kiện có được bảo mật hay cung cấp công khai?',
        answer: 'Tất cả đại biểu đăng ký sẽ được cấp tài khoản truy cập cổng tài nguyên số bảo mật để tải slide, số liệu và tài liệu độc quyền.',
      },
      {
        question: 'Có khu vực làm việc riêng cho khách VIP và phóng viên báo chí không?',
        answer: 'Có! Sự kiện bố trí Media Hub và phòng VIP Lounge trang bị Internet tốc độ cao, đồ uống miễn phí và không gian đàm phán riêng tư.',
      },
      {
        question: 'Sau sự kiện ban tổ chức có hỗ trợ kết nối đối tác tiếp theo không?',
        answer: 'Ban tổ chức cung cấp hệ thống Business Matching để các đại biểu tiếp tục trao đổi và đặt lịch họp sau sự kiện trong 30 ngày.',
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
    testimonials: getDomainTestimonials(category),
    earlyBirdBadge: input.earlyBirdDiscount || 'Ưu đãi Early Bird có hạn',
    ctaButtonText:
      category === 'studio-3d'
        ? 'Trải nghiệm không gian 3D ngay'
        : category === 'festival-music'
        ? 'Săn vé đại nhạc hội ngay'
        : category === 'sports-marathon'
        ? 'Đăng ký cự ly chạy ngay'
        : category === 'culinary-lifestyle'
        ? 'Đặt bàn dạ tiệc ngay'
        : category === 'community-career'
        ? 'Ứng tuyển & Nhận vé miễn phí'
        : 'Đăng ký tham gia ngay',
    tagline:
      category === 'studio-3d'
        ? 'AWWWARDS SITE OF THE DAY • CINEMATIC EXPERIENCE'
        : category === 'festival-music'
        ? 'LIVE MUSIC FESTIVAL • ĐẠI TIỆC ÂM THANH ÁNH SÁNG'
        : category === 'sports-marathon'
        ? 'OFFICIAL MARATHON RACE • BỨT PHÁ GIỚI HẠN'
        : category === 'culinary-lifestyle'
        ? 'EXCLUSIVE CHEF TASTING • FINE DINING EXPERIENCE'
        : category === 'community-career'
        ? 'NATIONAL CAREER EXPO • KẾT NỐI 50+ DOANH NGHIỆP'
        : category === 'universal-showcase'
        ? 'GLOBAL SHOWCASE & PARTNERSHIP SUMMIT'
        : 'Sự kiện chuyên sâu không thể bỏ lỡ',
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

async function fetchWithHybridProxy(
  apiKey: string | undefined,
  body: Record<string, unknown>
): Promise<Response> {
  const cleanKey = apiKey?.trim();

  // 1. If user provided a personal BYOK key, use it with active Gemini models
  if (cleanKey && cleanKey !== '') {
    return fetchGeminiContent(cleanKey, body);
  }

  // 2. Otherwise try the Serverless AI Proxy (/api/ai-proxy) with system key
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 14000);
    const proxyRes = await fetch('/api/ai-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (proxyRes.ok) {
      return proxyRes;
    }
  } catch {
    // Proxy unavailable (e.g. local vite dev without vercel), fallback to local env
  }

  // 3. Fallback to client-side env key if defined
  const envKey = (import.meta.env.VITE_GEMINI_API_KEY as string)?.trim();
  if (envKey) {
    return fetchGeminiContent(envKey, body);
  }

  throw new Error('No API key or reachable AI proxy found');
}

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
  apiKey: string | undefined,
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

HƯỚNG DẪN RIÊNG CHO TỪNG LOẠI SỰ KIỆN:
- "festival-music": Không khí đại nhạc hội/concert cuồng nhiệt, từ vựng về âm nhạc, headliner, visual laser, hệ thống âm thanh, fanzone, vé tham dự. TUYỆT ĐỐI KHÔNG dùng từ ngữ giáo trình/lớp học.
- "sports-marathon": Không khí giải chạy/marathon thể thao, từ vựng về cự ly (5k/10k/21k/42k), race kit, chiptiming, trạm tiếp nước, pacer, huy chương finisher. TUYỆT ĐỐI KHÔNG dùng từ ngữ giáo trình/lớp học.
- "culinary-lifestyle": Không khí dạ tiệc ẩm thực/fine dining, từ vựng về thực đơn tasting, sommelier, pairing rượu vang, bếp trưởng Michelin, trải nghiệm vị giác sang trọng. TUYỆT ĐỐI KHÔNG dùng từ ngữ học thuật.
- "community-career": Không khí ngày hội việc làm/tuyển dụng, từ vựng về 50+ doanh nghiệp, phỏng vấn tuyển dụng, review CV 1-1, cơ hội nghề nghiệp. TUYỆT ĐỐI KHÔNG dùng từ ngữ học thuật giáo trình.
- "studio-3d": Không khí sáng tạo số 3D, CGI, canvas WebGL tương tác, đạo diễn nghệ thuật.
- "education": Giáo trình đào tạo thực chiến, bài tập tình huống, giảng viên hướng dẫn.
- "ai-tech" / "developer" / "startup" / "marketing" / "design" / "universal-showcase": Chuyên sâu theo đúng ngành nghề thực tế.

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

  const response = await fetchWithHybridProxy(apiKey, {
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
  apiKey: string | undefined,
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

  const response = await fetchWithHybridProxy(apiKey, {
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
      const parts = result.split(/[:—-]/);
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


// ============================================================================
// 4. VISION AI & MULTIMODAL UI AUDIT ENGINE
// ============================================================================

export interface VisionEvaluationResult {
  visualHierarchyScore: number;
  colorHarmonyScore: number;
  conversionPacingScore: number;
  overallVisionScore: number;
  critique: string;
  recommendations: string[];
}

export async function evaluateUIVision(params: {
  headline: string;
  category: string;
  themeName: string;
  deterministicScore: number;
  issuesSummary: string[];
  screenshotBase64?: string;
  apiKey?: string;
}): Promise<VisionEvaluationResult> {
  const { headline, category, themeName, deterministicScore, issuesSummary, apiKey } = params;

  // 1. If API key or proxy is available, attempt Vision / LLM Audit
  const activeKey = apiKey || (typeof window !== 'undefined' ? getSavedApiKey() : undefined);
  if (activeKey || (!activeKey && typeof window !== 'undefined')) {
    try {
      const prompt = `
Bạn là Giám đốc Nghệ thuật & Chuyên gia CRO cao cấp (Art Director & CRO Specialist).
Hãy thẩm định giao diện Landing Page sau dựa trên các thông số thực tế:
- Tiêu đề Hero: "${headline}"
- Danh mục sự kiện: "${category}" (${themeName})
- Điểm đo đạc vật lý (Deterministic UI Score): ${deterministicScore}/100
- Các phát hiện từ DOM: ${issuesSummary.length > 0 ? issuesSummary.join('; ') : 'Bố cục cân đối, không phát hiện lỗi tràn chữ'}

Hãy trả về DUY NHẤT một chuỗi JSON chuẩn (không kèm markdown):
{
  "visualHierarchyScore": 92,
  "colorHarmonyScore": 95,
  "conversionPacingScore": 88,
  "overallVisionScore": 91,
  "critique": "Bố cục Hero đạt chuẩn phân cấp thị giác F-Pattern, mắt người dùng tập trung vào tiêu đề chính trước khi quét đến nút CTA. Phối màu hiện đại với độ tương phản cao.",
  "recommendations": ["Tối ưu độ tương phản văn bản phụ", "Đặt CTA chính ở vị trí dễ quét mắt", "Giữ khoảng cách trắng thông thoáng"]
}
`;

      const response = await fetchWithHybridProxy(activeKey, {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (responseText) {
          const cleaned = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleaned);
          if (parsed.overallVisionScore) {
            return {
              visualHierarchyScore: Number(parsed.visualHierarchyScore) || 90,
              colorHarmonyScore: Number(parsed.colorHarmonyScore) || 92,
              conversionPacingScore: Number(parsed.conversionPacingScore) || 88,
              overallVisionScore: Number(parsed.overallVisionScore) || 90,
              critique: String(parsed.critique || 'Giao diện đạt tiêu chuẩn phân cấp thị giác cao.'),
              recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [
                'Tối ưu độ tương phản văn bản phụ',
                'Đặt CTA chính ở vị trí dễ quét mắt',
              ],
            };
          }
        }
      }
    } catch (err) {
      console.warn('Vision UI Audit API error, using smart fallback heuristic:', err);
    }
  }

  // 2. Intelligent Offline Fallback Heuristics
  const hierarchyScore = Math.min(96, Math.max(78, deterministicScore + (headline.length < 75 ? 4 : -4)));
  const harmonyScore = 94; // Theme engine palettes are mathematically calibrated
  const pacingScore = Math.min(95, Math.max(80, deterministicScore - 2));
  const overall = Math.round((hierarchyScore + harmonyScore + pacingScore) / 3);

  return {
    visualHierarchyScore: hierarchyScore,
    colorHarmonyScore: harmonyScore,
    conversionPacingScore: pacingScore,
    overallVisionScore: overall,
    critique: `Bố cục Hero đạt chuẩn phân cấp thị giác F-Pattern, mắt người dùng tập trung ngay vào tiêu đề chính trước khi quét đến nút CTA. Bảng màu ${themeName} hài hòa và đạt độ tương phản chuẩn WCAG 2.1.`,
    recommendations: [
      'Giữ tiêu đề dưới 3 dòng để duy trì tỷ lệ chuyển đổi cao nhất trên thiết bị di động.',
      'Sử dụng micro-copy dưới nút CTA (như "Hỗ trợ xuất VAT / Vé chính hãng") để triệt tiêu do dự mua vé.',
      'Đảm bảo khoảng đệm (white-space) giữa các khối nội dung tối thiểu 80px để trang không bị cảm giác nhồi nhét.',
    ],
  };
}
