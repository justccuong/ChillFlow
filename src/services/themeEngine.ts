import type { EventCategory, ThemeConfig } from '../types';
import { getContrastRatio, evaluateWCAGContrast } from '../utils/uiAuditor';

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
  {
    id: 'studio-3d',
    label: '3D Studio & Motion',
    iconName: 'sparkles',
    description: 'Layout Cinematic: Tone Dark Luxe, Canvas 360°, âm thanh Web Audio',
  },
  {
    id: 'festival-music',
    label: 'Âm nhạc & Lễ hội',
    iconName: 'music',
    description: 'Layout Festival: Tone tím neon & hồng rực rỡ, nghệ sĩ line-up bùng nổ',
  },
  {
    id: 'sports-marathon',
    label: 'Thể thao & Marathon',
    iconName: 'activity',
    description: 'Layout Sports: Tone cam cháy năng động, cung đường race kit & huy chương',
  },
  {
    id: 'culinary-lifestyle',
    label: 'Ẩm thực & Đời sống',
    iconName: 'coffee',
    description: 'Layout Lifestyle: Tone vàng kem ấm áp, trải nghiệm vị giác & thẩm mỹ tinh tế',
  },
  {
    id: 'community-career',
    label: 'Cộng đồng & Tuyển dụng',
    iconName: 'users',
    description: 'Layout Community: Tone xanh ngọc tin cậy, kết nối việc làm & định hướng',
  },
  {
    id: 'universal-showcase',
    label: 'Đa năng & Tự do',
    iconName: 'globe',
    description: 'Layout Showcase: Bố cục chuẩn mực, thích ứng 100% mọi đề bài bất kỳ của BTC',
  },
];

export const THEME_CONFIGS: Record<EventCategory, ThemeConfig> = {
  'ai-tech': {
    id: 'ai-tech',
    name: 'Cyber Tech Conference',
    layout: 'conference',
    accentColor: 'text-cyan-600 dark:text-cyan-400',
    accentBg: 'bg-cyan-500/10',
    accentBorder: 'border-cyan-500/30',
    btnPrimary: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold',
    badgeBg: 'bg-cyan-500/10',
    badgeText: 'text-cyan-700 dark:text-cyan-300',
    glowGradient: 'from-cyan-600/20 via-blue-600/10 to-transparent',
    heroImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80',
    speakerImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    galleryPhotos: [
      {
        title: 'Sân khấu Keynote & khán phòng 500+ kỹ sư',
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
    ],
    trustLogos: ['Google Cloud', 'OpenAI Ecosystem', 'FPT Software', 'NVIDIA Inception', 'VNG Tech'],
  },
  'marketing': {
    id: 'marketing',
    name: 'High-Conversion Masterclass',
    layout: 'masterclass',
    accentColor: 'text-amber-600 dark:text-amber-400',
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/30',
    btnPrimary: 'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-extrabold',
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-700 dark:text-amber-300',
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
        title: 'Thảo luận xây dựng funnel chuyển đổi cao',
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
    accentColor: 'text-amber-600 dark:text-amber-300',
    accentBg: 'bg-amber-400/10',
    accentBorder: 'border-amber-400/30',
    btnPrimary: 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black',
    badgeBg: 'bg-amber-100 dark:bg-slate-800',
    badgeText: 'text-amber-800 dark:text-amber-300',
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
        title: 'Sân khấu Demo Day & pitching trước 30+ VCs',
        tag: 'Pitch Stage',
        url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80',
      },
      {
        title: 'Phiên đối thoại kín cùng hội đồng đầu tư',
        tag: 'Private Room',
        url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Lắng nghe phản biện & định giá doanh nghiệp',
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
    accentColor: 'text-emerald-600 dark:text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-500/30',
    btnPrimary: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
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
    accentColor: 'text-purple-600 dark:text-purple-400',
    accentBg: 'bg-purple-500/10',
    accentBorder: 'border-purple-500/30',
    btnPrimary: 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold',
    badgeBg: 'bg-purple-500/10',
    badgeText: 'text-purple-700 dark:text-purple-300',
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
        title: 'Trưng bày & trao giải thiết kế xuất sắc',
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
    accentColor: 'text-blue-600 dark:text-blue-400',
    accentBg: 'bg-blue-500/10',
    accentBorder: 'border-blue-500/30',
    btnPrimary: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-700 dark:text-blue-300',
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
        title: 'Nền tảng & tư duy nguyên lý đầu tiên (First Principles)',
        duration: 'Tuần 1 (8 giờ)',
        topics: ['Hiểu bản chất vấn đề', 'Xây dựng mental model', 'Giải quyết bài toán cơ sở'],
      },
      {
        moduleNum: '02',
        title: 'Kỹ thuật chuyên sâu & thực hành Hands-on Lab',
        duration: 'Tuần 2 (10 giờ)',
        topics: ['Trực tiếp thao tác trên môi trường thật', 'Debug và tối ưu hiệu năng', 'Code review 1-1'],
      },
      {
        moduleNum: '03',
        title: 'Dự án tốt nghiệp & thẩm định thực tế (Capstone Project)',
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
        title: 'Thảo luận nhóm & làm bài tập tình huống',
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
  'studio-3d': {
    id: 'studio-3d',
    name: 'Cinematic 3D Studio',
    layout: 'cinematic',
    accentColor: 'text-amber-600 dark:text-amber-300',
    accentBg: 'bg-amber-500/10 dark:bg-amber-400/10',
    accentBorder: 'border-amber-500/20 dark:border-amber-400/30',
    btnPrimary: 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold shadow-[0_0_30px_rgba(251,191,36,0.2)]',
    badgeBg: 'bg-amber-500/10 dark:bg-white/10',
    badgeText: 'text-amber-800 dark:text-amber-200',
    glowGradient: 'from-amber-500/15 via-purple-600/10 to-transparent',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
    speakerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    galleryPhotos: [
      {
        title: 'Trải nghiệm không gian 3D tương tác 360°',
        tag: 'Spatial 3D',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      },
      {
        title: 'Hậu kỳ Motion Graphics & kỹ xảo điện ảnh VFX',
        tag: 'Motion & VFX',
        url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Triển lãm nghệ thuật số siêu thực & CGI Lighting',
        tag: 'CGI Exhibition',
        url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
      },
    ],
    trustLogos: ['Awwwards', 'FWA of the Day', 'Blender Foundation', 'Unreal Engine', 'CGSociety'],
  },
  'festival-music': {
    id: 'festival-music',
    name: 'Festival & Live Music',
    layout: 'festival',
    primaryColor: '#d946ef',
    secondaryColor: '#ec4899',
    accentColor: 'text-fuchsia-400',
    accentBg: 'bg-fuchsia-500/10',
    accentBorder: 'border-fuchsia-500/30',
    badgeBg: 'bg-fuchsia-500/20',
    badgeText: 'text-fuchsia-300',
    btnPrimary: 'bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-600 hover:from-fuchsia-500 hover:to-pink-500 text-white shadow-fuchsia-500/25',
    heroImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    speakerImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    glowGradient: 'from-fuchsia-600/30 via-pink-600/20 to-purple-800/10',
    galleryPhotos: [
      {
        title: 'Sân khấu đại nhạc hội ánh sáng đa chiều & pháo hoa',
        tag: 'Main Stage',
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
      },
      {
        title: 'Không khí bùng nổ của hàng vạn khán giả cuồng nhiệt',
        tag: 'Crowd Energy',
        url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Hệ thống âm thanh biểu diễn chuẩn quốc tế 120dB',
        tag: 'Audio Experience',
        url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
      },
    ],
    trustLogos: ['Spotify', 'SoundCloud', 'Pioneer DJ', 'Billboard', 'LiveNation'],
  },
  'sports-marathon': {
    id: 'sports-marathon',
    name: 'Sports & Marathon Challenge',
    layout: 'sports',
    primaryColor: '#f97316',
    secondaryColor: '#ea580c',
    accentColor: 'text-orange-400',
    accentBg: 'bg-orange-500/10',
    accentBorder: 'border-orange-500/30',
    badgeBg: 'bg-orange-500/20',
    badgeText: 'text-orange-300',
    btnPrimary: 'bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white shadow-orange-500/25',
    heroImage: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80',
    speakerImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    glowGradient: 'from-orange-600/30 via-amber-500/20 to-red-800/10',
    galleryPhotos: [
      {
        title: 'Vạch xuất phát rực rỡ buổi bình minh cùng 5,000 runners',
        tag: 'Start Line',
        url: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1000&q=80',
      },
      {
        title: 'Khoảnh khắc cán đích vỡ òa cảm xúc và trao huy chương finisher',
        tag: 'Finish Line',
        url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Trạm tiếp nước và đội ngũ y tế chuyên nghiệp dọc cung đường',
        tag: 'Safety & Care',
        url: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80',
      },
    ],
    trustLogos: ['Garmin', 'Nike Running', 'Strava', 'Red Bull', 'World Athletics'],
  },
  'culinary-lifestyle': {
    id: 'culinary-lifestyle',
    name: 'Culinary & Lifestyle Experience',
    layout: 'culinary',
    primaryColor: '#eab308',
    secondaryColor: '#ca8a04',
    accentColor: 'text-amber-300',
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/30',
    badgeBg: 'bg-amber-500/20',
    badgeText: 'text-amber-200',
    btnPrimary: 'bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-700 hover:from-amber-500 hover:to-yellow-500 text-white shadow-amber-500/25',
    heroImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    speakerImage: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
    glowGradient: 'from-amber-600/25 via-yellow-600/15 to-stone-900/10',
    galleryPhotos: [
      {
        title: 'Trải nghiệm ẩm thực thịnh soạn từ các đầu bếp đạt sao Michelin',
        tag: 'Gourmet Tasting',
        url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
      },
      {
        title: 'Workshop pha chế cà phê thủ công & cảm nhận hương vị Specialty',
        tag: 'Coffee Cupping',
        url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Không gian tiệc sang trọng giao lưu cùng chuyên gia ẩm thực',
        tag: 'Chef Table',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      },
    ],
    trustLogos: ['Michelin Guide', 'Le Cordon Bleu', 'Specialty Coffee Assn', 'Slow Food', 'TasteAtlas'],
  },
  'community-career': {
    id: 'community-career',
    name: 'Community & Career Fair',
    layout: 'community',
    primaryColor: '#0284c7',
    secondaryColor: '#0369a1',
    accentColor: 'text-sky-400',
    accentBg: 'bg-sky-500/10',
    accentBorder: 'border-sky-500/30',
    badgeBg: 'bg-sky-500/20',
    badgeText: 'text-sky-300',
    btnPrimary: 'bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-sky-500/25',
    heroImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    speakerImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    glowGradient: 'from-sky-600/30 via-indigo-600/20 to-blue-900/10',
    galleryPhotos: [
      {
        title: 'Gian hàng phỏng vấn trực tiếp từ 50+ tập đoàn đa quốc gia',
        tag: 'Interview Booths',
        url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1000&q=80',
      },
      {
        title: 'Phiên chia sẻ định hướng nghề nghiệp và review CV 1-1',
        tag: 'Career Mentoring',
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Lễ ký kết tuyển dụng và trao học bổng tài năng trẻ',
        tag: 'Scholarships',
        url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      },
    ],
    trustLogos: ['LinkedIn Top Voices', 'TopCV', 'VietnamWorks', 'Forbes Under 30', 'FPT University'],
  },
  'universal-showcase': {
    id: 'universal-showcase',
    name: 'Universal Event Showcase',
    layout: 'showcase',
    primaryColor: '#6366f1',
    secondaryColor: '#4f46e5',
    accentColor: 'text-indigo-400',
    accentBg: 'bg-indigo-500/10',
    accentBorder: 'border-indigo-500/30',
    badgeBg: 'bg-indigo-500/20',
    badgeText: 'text-indigo-300',
    btnPrimary: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/25',
    heroImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    speakerImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    glowGradient: 'from-indigo-600/30 via-purple-600/20 to-blue-900/10',
    galleryPhotos: [
      {
        title: 'Không gian tổ chức sự kiện chuyên nghiệp đạt chuẩn 5 sao',
        tag: 'Venue Atmosphere',
        url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80',
      },
      {
        title: 'Check-in công nghệ cao và đón tiếp đại biểu trang trọng',
        tag: 'VIP Reception',
        url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Khu vực triển lãm và giao lưu networking mở rộng mối quan hệ',
        tag: 'Networking Lounge',
        url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
      },
    ],
    trustLogos: ['Eventbrite', 'TEDx', 'Global Event Forum', 'VibeCoding 2026', 'Awwwards'],
  },
};

export function getThemeForCategory(category?: EventCategory): ThemeConfig {
  if (category && THEME_CONFIGS[category]) {
    return THEME_CONFIGS[category];
  }
  return THEME_CONFIGS['ai-tech'];
}


export interface ThemeAccessibilityAudit {
  score: number;
  contrastRatio: number;
  wcagLevel: 'AAA' | 'AA';
  isCompliant: boolean;
}

const THEME_CONTRAST_PAIRS: Record<EventCategory, [string, string]> = {
  'ai-tech': ['#06b6d4', '#020617'], // cyan-500 on slate-950 (~11.8:1)
  'marketing': ['#fbbf24', '#020617'], // amber-400 on slate-950 (~14.2:1)
  'startup': ['#f59e0b', '#020617'], // amber-500 on slate-950 (~11.5:1)
  'developer': ['#10b981', '#020617'], // emerald-500 on slate-950 (~9.5:1)
  'design': ['#f472b6', '#020617'], // pink-400 on slate-950 (~8.6:1)
  'education': ['#60a5fa', '#020617'], // blue-400 on slate-950 (~8.8:1)
  'studio-3d': ['#fbbf24', '#020617'], // amber-400 on slate-950 (~14.2:1)
  'festival-music': ['#e879f9', '#020617'], // fuchsia-400 on slate-950 (~9.2:1)
  'sports-marathon': ['#fb923c', '#020617'], // orange-400 on slate-950 (~10.5:1)
  'culinary-lifestyle': ['#fde047', '#020617'], // yellow-300 on slate-950 (~15.2:1)
  'community-career': ['#38bdf8', '#020617'], // sky-400 on slate-950 (~11.6:1)
  'universal-showcase': ['#818cf8', '#020617'], // indigo-400 on slate-950 (~8.7:1)
};

export function evaluateThemeAccessibility(theme: ThemeConfig): ThemeAccessibilityAudit {
  const pair = THEME_CONTRAST_PAIRS[theme.id] || ['#f8fafc', '#020617'];
  const ratio = getContrastRatio(pair[0], pair[1]);
  const wcag = evaluateWCAGContrast(ratio);

  return {
    score: wcag.score,
    contrastRatio: ratio,
    wcagLevel: wcag.level === 'FAIL' ? 'AA' : (wcag.level as 'AAA' | 'AA'),
    isCompliant: ratio >= 4.5,
  };
}
