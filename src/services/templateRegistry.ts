import { EventCategory } from '../types';

export interface TemplateDefinition {
  id: EventCategory;
  name: string;
  subtitle: string;
  categoryLabel: string;
  badge: string;
  themeColor: string;
  accentGradient: string;
  description: string;
  idealFor: string;
  previewThumbnail: string;
  layoutArchetype: string;
  features: string[];
}

export const TEMPLATE_LIBRARY: TemplateDefinition[] = [
  {
    id: 'ai-tech',
    name: 'Cyber Summit 2026',
    subtitle: 'Hội nghị công nghệ & AI chuyên sâu',
    categoryLabel: 'Công nghệ & AI',
    badge: 'HOTTEST AI 2026',
    themeColor: '#06b6d4',
    accentGradient: 'from-cyan-500 to-blue-600',
    description: 'Bố cục hội nghị công nghệ cao cấp với ảnh cutout diễn giả organic, bento grid thực hành hands-on và bảng phân chia phòng breakout tracks.',
    idealFor: 'Hội thảo AI Agent, LLM Summit, Tech Conference, Hội nghị chuyển đổi số.',
    previewThumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    layoutArchetype: 'cyber-conference',
    features: [
      'Hero Split không gian mở + Keynote Portrait',
      'Countdown Obsidian Glass Card cực đại',
      'Hands-on Lab Bento Grid (3 Modules)',
      'Breakout Track A/B & Keynote Roadmap',
      'VIP Pass & Early Bird Registration',
    ],
  },
  {
    id: 'marketing',
    name: 'Growth Masterclass',
    subtitle: 'Chương trình tăng trưởng & CRO funnel',
    categoryLabel: 'Marketing & Growth',
    badge: 'HIGH CRO CONVERSION',
    themeColor: '#f59e0b',
    accentGradient: 'from-amber-400 via-orange-500 to-amber-600',
    description: 'Tập trung 100% vào tỉ lệ chuyển đổi với chỉ số ROI cực lớn, bảng so sánh Before/After, thước đo khan hiếm chỗ ngồi và cam kết hoàn tiền.',
    idealFor: 'Khóa học Growth Hacking, Masterclass Digital Marketing, Tối ưu chuyển đổi.',
    previewThumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    layoutArchetype: 'growth-masterclass',
    features: [
      'Hero Panoramic tâm điểm với Countdown chính diện',
      '4 Bộ đếm chỉ số thực (+340% ROI, 10K+ Học viên)',
      'Bảng so sánh Trước & Sau (Before vs After)',
      'Lộ trình 4 Chặng Tăng trưởng Funnel',
      'Cam kết hoàn tiền 100% rủi ro 0đ',
    ],
  },
  {
    id: 'developer',
    name: 'Terminal Broadsheet',
    subtitle: 'Hội thảo kỹ thuật & DevCon telemetry',
    categoryLabel: 'Lập trình & Kỹ thuật',
    badge: 'DEV NATIVE CLI',
    themeColor: '#10b981',
    accentGradient: 'from-emerald-400 to-teal-500',
    description: 'Phong cách Terminal hacker đích thực với dòng lệnh CLI sao chép 1-click, bảng đo telemetry production, git commit feed và code snippet chuyên sâu.',
    idealFor: 'DevFest, Hackathon, Architecture Workshop, Kubernetes/Cloud-native Meetup.',
    previewThumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    layoutArchetype: 'terminal-hacker',
    features: [
      'Terminal Status bar (12ms latency, production ready)',
      '1-Click CLI Command Copy Bar ($ npx devcon)',
      'Bảng đo Telemetry (WASM, React 19, 1480+ PRs)',
      'Code Sandbox & Kiến trúc hệ thống mẫu',
      'GitHub-style Maintainer Profile Card',
    ],
  },
  {
    id: 'startup',
    name: 'Executive Dealflow',
    subtitle: 'Diễn đàn khởi nghiệp & gọi vốn VC',
    categoryLabel: 'Startup & Kinh doanh',
    badge: 'WALL STREET LUXURY',
    themeColor: '#eab308',
    accentGradient: 'from-amber-300 to-amber-500',
    description: 'Thiết kế tối giản sang trọng với tông đen vàng champagne, bento grid vốn cam kết ($5M+), danh sách 16 startup pitching và bảo mật thỏa thuận NDA.',
    idealFor: 'Demo Day, Pitching Event, Angel Investor Summit, Venture Capital Gala.',
    previewThumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    layoutArchetype: 'executive-dealflow',
    features: [
      'Hero đen vàng tối giản uy quyền với Countdown thanh lịch',
      'Bento Dealflow ($5M+ Vốn cam kết, 30+ Quỹ VC)',
      'Danh mục 6 Startup Pitching tiêu biểu theo ngành',
      'Hội đồng Thẩm định & Giám khảo Quỹ đầu tư',
      'Quy trình đăng ký thẩm định Pass bí mật & NDA',
    ],
  },
  {
    id: 'design',
    name: 'Creative Avant-Garde',
    subtitle: 'Festival thiết kế & sáng tạo số',
    categoryLabel: 'Thiết kế & Sáng tạo',
    badge: 'AWWWARDS ART DIRECTION',
    themeColor: '#ec4899',
    accentGradient: 'from-pink-500 via-purple-500 to-indigo-500',
    description: 'Phong cách Neo-Brutalist nghệ thuật chuẩn Awwwards với nhãn dán rotated stickers, moodboard masonry nghệ thuật, marquee ticker và showcase canvas.',
    idealFor: 'Design Conference, UI/UX Summit, Creative Portfolio Festival, Branding Camp.',
    previewThumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80',
    layoutArchetype: 'creative-avantgarde',
    features: [
      'Stickers dán chéo (NO BORING WEBSITES / Awwwards)',
      'Marquee Ticker chuyển động nhịp điệu typography',
      'Lưới ảnh Masonry Moodboard phá cách bất đối xứng',
      'Phòng thực hành Micro-Interactions & 3D Spline',
      'Creative Director Profile & Portfolio Kit tặng kèm',
    ],
  },
  {
    id: 'education',
    name: 'Academic Masterclass',
    subtitle: 'Khóa đào tạo chuyên sâu & chứng chỉ ISO',
    categoryLabel: 'Đào tạo & Workshop',
    badge: 'ACCREDITED CERTIFICATE',
    themeColor: '#3b82f6',
    accentGradient: 'from-blue-500 to-indigo-600',
    description: 'Bố cục giáo dục hoàng gia đáng tin cậy với con dấu chứng nhận ISO 17024, cây lộ trình đào tạo 4 tuần tuần tự, học liệu và mẫu chứng chỉ hoàn thành.',
    idealFor: 'Bootcamp, Khóa học chuyên gia, Workshop chứng chỉ nghề, Đào tạo nội bộ.',
    previewThumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    layoutArchetype: 'academic-syllabus',
    features: [
      'Con dấu chứng chỉ ISO 17024 & 36 Giờ thực chiến',
      'Cây giáo trình 4 Tuần chi tiết theo từng module',
      'Xem trước Chứng chỉ tốt nghiệp có mã định danh',
      'Hồ sơ Giảng viên Viện sĩ & Chuyên gia đầu ngành',
      'Form đăng ký nhận trọn bộ Syllabus & Giáo trình',
    ],
  },
  {
    id: 'studio-3d',
    name: 'Cinematic 3D Studio',
    subtitle: 'Studio thiết kế không gian & trải nghiệm 3D',
    categoryLabel: '3D Studio & Motion',
    badge: 'AWWWARDS SITE OF THE DAY',
    themeColor: '#e2e8f0',
    accentGradient: 'from-amber-200 via-zinc-100 to-amber-400',
    description: 'Bố cục phòng thu 3D điện ảnh đỉnh cao phong cách MDX, canvas 360 độ tương tác, hiệu ứng nút bấm đa hướng và hệ thống âm thanh Web Audio sống động.',
    idealFor: 'Showcase 3D, Creative Studio, Portfolio Nghệ thuật số, Motion Graphics, Sản phẩm điện ảnh.',
    previewThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    layoutArchetype: 'cinematic-studio',
    features: [
      'Hero Canvas 360° tương tác kép (Double-Buffered)',
      'Nút bấm cảm biến hướng trỏ chuột (Directional Hover)',
      'Hệ thống âm thanh Web Audio & Sóng âm SVG sống động',
      'Bento Grid dự án 3D mở rộng với hiệu ứng Clip-Path',
      'Thước đo tín nhiệm giải thưởng quốc tế Awwwards & FWA',
    ],
  },
  {
    id: 'festival-music',
    name: 'Neon Pulse Festival',
    subtitle: 'Đại nhạc hội & Sân khấu âm nhạc điện tử',
    categoryLabel: 'Âm nhạc & Lễ hội',
    badge: 'TOP VIBRANT MUSIC',
    themeColor: '#d946ef',
    accentGradient: 'from-fuchsia-500 via-pink-500 to-purple-600',
    description: 'Không gian lễ hội cuồng nhiệt với dàn nghệ sĩ line-up, countdown giờ G và hệ thống hiệu ứng laser sân khấu đa tầng.',
    idealFor: 'Đại nhạc hội, EDM Festival, Acoustic Night, Live Concert, Gala Countdown.',
    previewThumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    layoutArchetype: 'festival-stage',
    features: [
      'Hero Stage Lighting & Laser Beam Wave',
      'Headliner & Guest Artist Line-up Showcase',
      'Countdown Đếm Ngược Giờ G Cực Đại',
      'Bento Grid Không Khí Khán Giả 120dB',
      'Cổng Đặt Vé Early Bird & VIP Lounge',
    ],
  },
  {
    id: 'sports-marathon',
    name: 'Apex Marathon Challenge',
    subtitle: 'Giải chạy & Thể thao năng động',
    categoryLabel: 'Thể thao & Marathon',
    badge: 'HIGH ENDURANCE',
    themeColor: '#f97316',
    accentGradient: 'from-orange-500 via-amber-500 to-red-600',
    description: 'Thiết kế tràn đầy năng lượng bứt phá với cung đường chạy GPS, quyền lợi Race Kit, cúp Finisher và bảng thành tích.',
    idealFor: 'Marathon 21K/42K, Trail Run, Giải bơi lội, Thể thao đối kháng, Esports Tournament.',
    previewThumbnail: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80',
    layoutArchetype: 'sports-endurance',
    features: [
      'Cung Đường Race Map & Độ Dốc Trực Quan',
      'Bộ Race Kit Độc Quyền (Áo, BIB, Huy Chương)',
      'Lộ Trình Trạm Tiếp Nước & Y Tế Chuẩn Quốc Tế',
      'Bảng Thành Tích & Kỷ Lục Đường Đua',
      'Cổng Đăng Ký Theo Cự Ly (5K, 10K, 21K, 42K)',
    ],
  },
  {
    id: 'culinary-lifestyle',
    name: 'Epicurean Tasting Club',
    subtitle: 'Hội nghị ẩm thực & Trải nghiệm giác quan',
    categoryLabel: 'Ẩm thực & Đời sống',
    badge: 'MICHELIN EXPERIENCE',
    themeColor: '#eab308',
    accentGradient: 'from-amber-400 via-yellow-500 to-orange-600',
    description: 'Phong cách sang trọng, ấm cúng với thực đơn nếm thử món ngon, quy trình rang xay cà phê và không gian giao lưu tinh tế.',
    idealFor: 'Lễ hội ẩm thực quốc tế, Workshop nếm cà phê, Lớp làm bánh nghệ thuật, Tiệc rượu vang.',
    previewThumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    layoutArchetype: 'culinary-lifestyle',
    features: [
      'Thực Đơn Tasting Menu & Pairing Rượu Vang',
      'Bàn Master Chef & Giao Lưu Chuyên Gia Ẩm Thực',
      'Workshop Trải Nghiệm Thực Tế Hands-on',
      'Bộ Sưu Tập Hình Ảnh Món Ăn Nghệ Thuật',
      'Vé Trải Nghiệm Ẩm Thực Giới Hạn Ghế Ngồi',
    ],
  },
  {
    id: 'community-career',
    name: 'Talent Bridge Fair',
    subtitle: 'Ngày hội việc làm & Kết nối cơ hội',
    categoryLabel: 'Cộng đồng & Tuyển dụng',
    badge: 'CAREER CONNECT',
    themeColor: '#0284c7',
    accentGradient: 'from-sky-500 via-blue-500 to-indigo-600',
    description: 'Không gian chuyên nghiệp kết nối hàng ngàn ứng viên với các nhà tuyển dụng hàng đầu, tư vấn lộ trình và review CV.',
    idealFor: 'Job Fair, Ngày hội việc làm sinh viên, Hội thảo hướng nghiệp, Hackathon tuyển dụng.',
    previewThumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    layoutArchetype: 'community-networking',
    features: [
      'Sơ Đồ Gian Hàng Phỏng Vấn Tuyển Dụng',
      'Bàn Tư Vấn Nghề Nghiệp & Sửa CV 1-1',
      'Lịch Trình Tọa Đàm Cùng Giám Đốc Nhân Sự',
      'Danh Sách 50+ Doanh Nghiệp Tham Gia',
      'Đăng Ký Ứng Tuyển Nhận Thẻ Ứng Viên VIP',
    ],
  },
  {
    id: 'universal-showcase',
    name: 'Grand Horizon Showcase',
    subtitle: 'Giao diện đa năng cho mọi loại sự kiện',
    categoryLabel: 'Đa năng & Tự do',
    badge: 'ALL-IN-ONE UNIVERSAL',
    themeColor: '#6366f1',
    accentGradient: 'from-indigo-500 via-purple-500 to-pink-500',
    description: 'Bố cục toàn năng, cân bằng thị giác hoàn hảo thích ứng với mọi chủ đề sự kiện bất kỳ mà Ban giám khảo đưa ra.',
    idealFor: 'Mọi loại sự kiện, Hội nghị tổng hợp, Lễ kỷ niệm, Diễn đàn mở, Buổi gặp mặt cộng đồng.',
    previewThumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    layoutArchetype: 'universal-showcase',
    features: [
      'Hero Đa Chiều Thích Ứng Mọi Thể Loại',
      'Khối Lợi Ích Cốt Lõi Tùy Biến 100%',
      'Lịch Trình Sự Kiện Trực Quan Đa Tầng',
      'Hồ Sơ Ban Tổ Chức & Khách Mời Trang Trọng',
      'Cổng Đăng Ký Đa Dạng Hình Thức Tham Gia',
    ],
  },
];

export function getTemplateById(id: EventCategory): TemplateDefinition {
  return TEMPLATE_LIBRARY.find(t => t.id === id) || TEMPLATE_LIBRARY[0];
}

export function detectBestTemplate(eventName: string, topic?: string): TemplateDefinition {
  const text = `${eventName} ${topic || ''}`.toLowerCase();

  // Music & Festival
  if (
    text.includes('nhạc') ||
    text.includes('music') ||
    text.includes('concert') ||
    text.includes('festival') ||
    text.includes('edm') ||
    text.includes('live show') ||
    text.includes('dj') ||
    text.includes('acoustic') ||
    text.includes('biểu diễn') ||
    text.includes('ca sĩ') ||
    text.includes('band') ||
    text.includes('âm thanh')
  ) {
    return TEMPLATE_LIBRARY.find(t => t.id === 'festival-music') || TEMPLATE_LIBRARY[0];
  }

  // Sports & Marathon
  if (
    text.includes('marathon') ||
    text.includes('chạy') ||
    text.includes('run') ||
    text.includes('thể thao') ||
    text.includes('sport') ||
    text.includes('fitness') ||
    text.includes('esport') ||
    text.includes('bóng đá') ||
    text.includes('race') ||
    text.includes('đua') ||
    text.includes('vận động')
  ) {
    return TEMPLATE_LIBRARY.find(t => t.id === 'sports-marathon') || TEMPLATE_LIBRARY[0];
  }

  // Culinary & Lifestyle
  if (
    text.includes('ẩm thực') ||
    text.includes('ăn uống') ||
    text.includes('món ăn') ||
    text.includes('nấu ăn') ||
    text.includes('bánh') ||
    text.includes('culinary') ||
    text.includes('food') ||
    text.includes('cà phê') ||
    text.includes('coffee') ||
    text.includes('taste') ||
    text.includes('rượu') ||
    text.includes('wine') ||
    text.includes('gốm') ||
    text.includes('lifestyle') ||
    text.includes('đời sống')
  ) {
    return TEMPLATE_LIBRARY.find(t => t.id === 'culinary-lifestyle') || TEMPLATE_LIBRARY[0];
  }

  // Community & Career
  if (
    text.includes('tuyển dụng') ||
    text.includes('việc làm') ||
    text.includes('career') ||
    text.includes('job') ||
    text.includes('sinh viên') ||
    text.includes('thực tập') ||
    text.includes('intern') ||
    text.includes('hội chợ') ||
    text.includes('hướng nghiệp')
  ) {
    return TEMPLATE_LIBRARY.find(t => t.id === 'community-career') || TEMPLATE_LIBRARY[0];
  }

  // 3D Studio & VFX
  if (
    text.includes('3d') ||
    text.includes('studio') ||
    text.includes('motion') ||
    text.includes('cinema') ||
    text.includes('cinematic') ||
    text.includes('animation') ||
    text.includes('vfx') ||
    text.includes('render') ||
    text.includes('blender') ||
    text.includes('unreal') ||
    text.includes('spatial') ||
    text.includes('cgi')
  ) {
    return TEMPLATE_LIBRARY.find(t => t.id === 'studio-3d') || TEMPLATE_LIBRARY[0];
  }

  // Developer & Coding
  if (text.includes('code') || text.includes('dev') || text.includes('lập trình') || text.includes('kỹ thuật') || text.includes('software') || text.includes('backend') || text.includes('frontend')) {
    return TEMPLATE_LIBRARY.find(t => t.id === 'developer') || TEMPLATE_LIBRARY[0];
  }

  // Growth & Marketing
  if (text.includes('growth') || text.includes('marketing') || text.includes('doanh số') || text.includes('khách hàng') || text.includes('funnel') || text.includes('seo') || text.includes('traffic')) {
    return TEMPLATE_LIBRARY.find(t => t.id === 'marketing') || TEMPLATE_LIBRARY[0];
  }

  // Startup & Venture
  if (text.includes('startup') || text.includes('đầu tư') || text.includes('gọi vốn') || text.includes('pitch') || text.includes('venture') || text.includes('quỹ')) {
    return TEMPLATE_LIBRARY.find(t => t.id === 'startup') || TEMPLATE_LIBRARY[0];
  }

  // Design & Creative
  if (text.includes('design') || text.includes('thiết kế') || text.includes('sáng tạo') || text.includes('ui/ux') || text.includes('art') || text.includes('figma')) {
    return TEMPLATE_LIBRARY.find(t => t.id === 'design') || TEMPLATE_LIBRARY[0];
  }

  // Education & Academy
  if (text.includes('đào tạo') || text.includes('workshop') || text.includes('học') || text.includes('chứng chỉ') || text.includes('academy') || text.includes('giáo trình')) {
    return TEMPLATE_LIBRARY.find(t => t.id === 'education') || TEMPLATE_LIBRARY[0];
  }

  // AI & Tech Summit
  if (text.includes('ai') || text.includes('agent') || text.includes('llm') || text.includes('trí tuệ nhân tạo') || text.includes('hackathon')) {
    return TEMPLATE_LIBRARY.find(t => t.id === 'ai-tech') || TEMPLATE_LIBRARY[0];
  }

  // Fallback to Universal Showcase for ANY custom/open event topic
  return TEMPLATE_LIBRARY.find(t => t.id === 'universal-showcase') || TEMPLATE_LIBRARY[0];
}
