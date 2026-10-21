import type { EventCategory, ThemeConfig } from '../types';

export const CATEGORIES: { id: EventCategory; label: string; iconName: string; description: string }[] = [
  {
    id: 'ai-tech',
    label: 'Công nghệ & AI',
    iconName: 'cpu',
    description: 'Layout Conference: Tone xanh neon, bento grid, hiện đại',
  },
  {
    id: 'marketing',
    label: 'Marketing & Growth',
    iconName: 'trending-up',
    description: 'Layout Masterclass: Tone cam tím, tập trung tính cấp bách & CRO',
  },
  {
    id: 'startup',
    label: 'Startup & Kinh doanh',
    iconName: 'rocket',
    description: 'Layout Executive: Tone đen vàng tối giản, uy tín gọi vốn',
  },
  {
    id: 'developer',
    label: 'Lập trình & Kỹ thuật',
    iconName: 'code-2',
    description: 'Layout Workshop: Tone terminal dark, đi sâu vào bài toán kỹ thuật',
  },
  {
    id: 'design',
    label: 'Thiết kế & Sáng tạo',
    iconName: 'palette',
    description: 'Layout Creative: Tone tím gradient nghệ thuật, thẩm mỹ cao',
  },
  {
    id: 'education',
    label: 'Đào tạo & Workshop',
    iconName: 'graduation-cap',
    description: 'Layout Academy: Tone xanh hoàng gia tin cậy, lớp học thực chiến',
  },
];

export const THEME_CONFIGS: Record<EventCategory, ThemeConfig> = {
  'ai-tech': {
    id: 'ai-tech',
    name: 'Cyber Tech Conference',
    layout: 'conference',
    accentColor: 'text-cyan-400',
    accentBg: 'bg-cyan-500/10',
    accentBorder: 'border-cyan-500/30',
    btnPrimary: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold',
    badgeBg: 'bg-cyan-500/10',
    badgeText: 'text-cyan-300',
    glowGradient: 'from-cyan-600/20 via-blue-600/10 to-transparent',
    heroImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80',
    speakerImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    galleryPhotos: [
      {
        title: 'Sân khấu Keynote & Khán phòng 500+ kỹ sư',
        tag: 'Phiên chính',
        url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
      },
      {
        title: 'Thực hành lập trình Agent trực tiếp',
        tag: 'Hands-on Lab',
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Trao đổi chuyên môn cùng chuyên gia',
        tag: 'Q&A Chuyên sâu',
        url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Networking & Kết nối tuyển dụng Tech',
        tag: 'Networking',
        url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      },
    ],
    trustLogos: ['Google Cloud', 'OpenAI Ecosystem', 'FPT Software', 'NVIDIA Inception', 'VNG Tech'],
  },
  'marketing': {
    id: 'marketing',
    name: 'High-Conversion Masterclass',
    layout: 'masterclass',
    accentColor: 'text-amber-400',
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/30',
    btnPrimary: 'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-extrabold',
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-300',
    glowGradient: 'from-orange-600/20 via-amber-600/10 to-transparent',
    heroImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80',
    speakerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    statsHighlight: [
      { value: '+340%', label: 'Tăng trưởng ROI', subtext: 'Đo lường sau 30 ngày áp dụng funnel' },
      { value: '10,000+', label: 'Học viên & Leader', subtext: 'Đã tham gia chuỗi Masterclass' },
      { value: '50+ Playbooks', label: 'Tài liệu thực chiến', subtext: 'Tải về và triển khai ngay lập tức' },
      { value: '0 VNĐ', label: 'Chi phí ẩn', subtext: 'Cam kết 100% hoàn tiền nếu không hài lòng' },
    ],
    galleryPhotos: [
      {
        title: 'Thuyết trình chiến lược tăng trưởng 10x',
        tag: 'Keynote',
        url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
      },
      {
        title: 'Thảo luận xây dựng Funnel chuyển đổi cao',
        tag: 'Workshop',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Giải đáp vướng mắc tăng trưởng doanh số',
        tag: '1-1 Review',
        url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Cộng đồng 300+ Marketers & Founders',
        tag: 'Cộng đồng',
        url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      },
    ],
    trustLogos: ['Meta Business Partners', 'TikTok for Business', 'HubSpot Academy', 'MoMo Growth', 'Base.vn'],
  },
  'startup': {
    id: 'startup',
    name: 'Executive Minimalist Summit',
    layout: 'executive',
    accentColor: 'text-amber-300',
    accentBg: 'bg-amber-400/10',
    accentBorder: 'border-amber-400/30',
    btnPrimary: 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black',
    badgeBg: 'bg-slate-800',
    badgeText: 'text-amber-300',
    glowGradient: 'from-amber-500/15 via-slate-800/10 to-transparent',
    heroImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1600&q=80',
    speakerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    dealMetrics: {
      capitalPool: '$5,000,000+',
      startupsCount: 16,
      investorCount: 45,
    },
    galleryPhotos: [
      {
        title: 'Sân khấu Demo Day & Pitching trước 30+ VCs',
        tag: 'Pitch Stage',
        url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80',
      },
      {
        title: 'Phiên đối thoại kín cùng Hội đồng đầu tư',
        tag: 'Private Room',
        url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Lắng nghe phản biện & Định giá doanh nghiệp',
        tag: 'Q&A Thẩm định',
        url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Tiệc kết nối nhà sáng lập & Quỹ thiên thần',
        tag: 'VIP Lounge',
        url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
      },
    ],
    trustLogos: ['Mekong Capital', '500 Startups VN', 'Techcombank Business', 'VinVentures', 'Nextrans'],
  },
  'developer': {
    id: 'developer',
    name: 'Developer Terminal Workshop',
    layout: 'terminal',
    accentColor: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-500/30',
    btnPrimary: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-300',
    glowGradient: 'from-emerald-600/20 via-teal-600/10 to-transparent',
    heroImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1600&q=80',
    speakerImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    terminalSnippet: {
      filename: 'ai_agent_runtime.py',
      language: 'python',
      runCommand: 'npx create-eventflow-agent@v2.6',
      code: `import asyncio
from eventflow.agents import AutonomousAgent, ToolRegistry

agent = AutonomousAgent(
    model="gemini-2.5-pro",
    tools=ToolRegistry.load_all(),
    temperature=0.2
)

async def main():
    print("[EVENTFLOW] Initializing live workshop session...")
    stream = await agent.run_live_mission(
        topic="Full-Stack AI Engineering 2026",
        mode="hands_on_debug"
    )
    async for event in stream:
        print(f">> {event.stage}: {event.summary}")

if __name__ == "__main__":
    asyncio.run(main())`,
    },
    galleryPhotos: [
      {
        title: 'Hội trường trình diễn hệ thống chịu tải cao',
        tag: 'Tech Deep-Dive',
        url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1000&q=80',
      },
      {
        title: 'Coding trực tiếp trên sân khấu (Live Coding)',
        tag: 'Live Coding',
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Giải mã bài toán kiến trúc Microservices',
        tag: 'Kiến trúc',
        url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Giao lưu cộng đồng Open-Source Developers',
        tag: 'Dev Hangout',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      },
    ],
    trustLogos: ['GitHub', 'AWS Community', 'Vercel Ecosystem', 'FPT University', 'Docker Captains'],
  },
  'design': {
    id: 'design',
    name: 'Creative Studio Masterclass',
    layout: 'creative',
    accentColor: 'text-purple-400',
    accentBg: 'bg-purple-500/10',
    accentBorder: 'border-purple-500/30',
    btnPrimary: 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold',
    badgeBg: 'bg-purple-500/10',
    badgeText: 'text-purple-300',
    glowGradient: 'from-purple-600/20 via-pink-600/10 to-transparent',
    heroImage: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1600&q=80',
    speakerImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    creativeTags: ['Design Systems', 'Micro-Interactions', 'Spline 3D', 'Spatial UI', 'Typography Matrix'],
    galleryPhotos: [
      {
        title: 'Không gian workshop thiết kế tương tác',
        tag: 'Design Studio',
        url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80',
      },
      {
        title: 'Phân tích Wireframe & Design System trực tiếp',
        tag: 'Figma Review',
        url: 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Học viên thực hành tối ưu UI/UX sản phẩm số',
        tag: 'Thực hành',
        url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Trưng bày & Trao giải thiết kế xuất sắc',
        tag: 'Exhibition',
        url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      },
    ],
    trustLogos: ['Figma Community', 'Adobe Creative Cloud', 'Dribbble Meetups', 'Behance Pro', 'Design League'],
  },
  'education': {
    id: 'education',
    name: 'Academy Royal Seminar',
    layout: 'academy',
    accentColor: 'text-blue-400',
    accentBg: 'bg-blue-500/10',
    accentBorder: 'border-blue-500/30',
    btnPrimary: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-300',
    glowGradient: 'from-blue-600/20 via-indigo-600/10 to-transparent',
    heroImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80',
    speakerImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    certificateInfo: {
      certTitle: 'Professional Specialist Certificate',
      issuer: 'ConvertFlow Academy & FPT University EdTech Board',
      hours: 36,
      accreditation: 'Global Standard ISO/IEC 17024 Accredited',
    },
    curriculumModules: [
      {
        moduleNum: '01',
        title: 'Nền tảng & Tư duy Nguyên lý Đầu tiên (First Principles)',
        duration: 'Tuần 1 (8 giờ)',
        topics: ['Hiểu bản chất vấn đề', 'Xây dựng mental model', 'Giải quyết bài toán cơ sở'],
      },
      {
        moduleNum: '02',
        title: 'Kỹ thuật Chuyên sâu & Thực hành Hands-on Lab',
        duration: 'Tuần 2 (10 giờ)',
        topics: ['Trực tiếp thao tác trên môi trường thật', 'Debug và tối ưu hiệu năng', 'Code review 1-1'],
      },
      {
        moduleNum: '03',
        title: 'Dự án Tốt nghiệp & Thẩm định Thực tế (Capstone Project)',
        duration: 'Tuần 3 & 4 (18 giờ)',
        topics: ['Xây dựng sản phẩm hoàn chỉnh', 'Báo cáo trước hội đồng', 'Cấp chứng nhận chính thức'],
      },
    ],
    galleryPhotos: [
      {
        title: 'Giảng đường chuyên đề cùng 200+ học viên',
        tag: 'Giảng đường',
        url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80',
      },
      {
        title: 'Thảo luận nhóm & Làm bài tập tình huống',
        tag: 'Case Study',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Giảng viên hướng dẫn trực tiếp từng cá nhân',
        tag: 'Mentorship',
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Trao chứng chỉ hoàn thành khóa học thực chiến',
        tag: 'Certificate',
        url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      },
    ],
    trustLogos: ['Đại học Quốc Gia', 'FPT Education', 'Coursera Enterprise', 'EdTech Asia', 'Topica'],
  },
};

export function getThemeForCategory(category?: EventCategory): ThemeConfig {
  if (category && THEME_CONFIGS[category]) {
    return THEME_CONFIGS[category];
  }
  return THEME_CONFIGS['ai-tech'];
}
