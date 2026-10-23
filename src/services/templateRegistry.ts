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
  layoutArchetype: 'cyber-conference' | 'growth-masterclass' | 'terminal-hacker' | 'executive-dealflow' | 'creative-avantgarde' | 'academic-syllabus' | 'cinematic-studio';
  features: string[];
}

export const TEMPLATE_LIBRARY: TemplateDefinition[] = [
  {
    id: 'ai-tech',
    name: 'Cyber Summit 2026',
    subtitle: 'Hội nghị Công nghệ & AI Chuyên sâu',
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
    subtitle: 'Chương trình Tăng trưởng & CRO Funnel',
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
    subtitle: 'Hội thảo Kỹ thuật & DevCon Telemetry',
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
    subtitle: 'Diễn đàn Khởi nghiệp & Gọi vốn VC',
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
    subtitle: 'Festival Thiết kế & Sáng tạo Số',
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
    subtitle: 'Khóa Đào tạo Chuyên sâu & Chứng chỉ ISO',
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
    subtitle: 'Studio Thiết kế Không gian & Trải nghiệm 3D',
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
];

export function getTemplateById(id: EventCategory): TemplateDefinition {
  return TEMPLATE_LIBRARY.find(t => t.id === id) || TEMPLATE_LIBRARY[0];
}

export function detectBestTemplate(eventName: string, topic?: string): TemplateDefinition {
  const text = `${eventName} ${topic || ''}`.toLowerCase();

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

  if (text.includes('code') || text.includes('dev') || text.includes('lập trình') || text.includes('kỹ thuật') || text.includes('software') || text.includes('hackathon') || text.includes('backend') || text.includes('frontend')) {
    return TEMPLATE_LIBRARY.find(t => t.id === 'developer') || TEMPLATE_LIBRARY[0];
  }
  if (text.includes('growth') || text.includes('marketing') || text.includes('doanh số') || text.includes('khách hàng') || text.includes('funnel') || text.includes('seo') || text.includes('traffic')) {
    return TEMPLATE_LIBRARY.find(t => t.id === 'marketing') || TEMPLATE_LIBRARY[0];
  }
  if (text.includes('startup') || text.includes('đầu tư') || text.includes('gọi vốn') || text.includes('pitch') || text.includes('venture') || text.includes('kinh doanh') || text.includes('quỹ')) {
    return TEMPLATE_LIBRARY.find(t => t.id === 'startup') || TEMPLATE_LIBRARY[0];
  }
  if (text.includes('design') || text.includes('thiết kế') || text.includes('sáng tạo') || text.includes('ui/ux') || text.includes('art') || text.includes('figma')) {
    return TEMPLATE_LIBRARY.find(t => t.id === 'design') || TEMPLATE_LIBRARY[0];
  }
  if (text.includes('đào tạo') || text.includes('workshop') || text.includes('học') || text.includes('chứng chỉ') || text.includes('academy') || text.includes('giáo trình')) {
    return TEMPLATE_LIBRARY.find(t => t.id === 'education') || TEMPLATE_LIBRARY[0];
  }

  // Default to ai-tech for AI, summit, conference
  return TEMPLATE_LIBRARY[0];
}
