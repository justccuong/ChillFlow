import { describe, it, expect } from 'vitest';
import { generateStandaloneHtml } from '../src/utils/sourceExporter';
import { getThemeForCategory } from '../src/services/themeEngine';
import type { EventInput, GeneratedContent } from '../src/types';

describe('Source Exporter & SEO HTML Generator (sourceExporter.ts)', () => {
  const mockInput: EventInput = {
    eventName: 'VibeCoding Summit 2026',
    category: 'ai-tech',
    eventDate: '2026-11-20T09:00',
    location: 'Hội trường Trống Đồng Palace, Cầu Giấy, Hà Nội',
    speakerName: 'Dr. Alex Nguyễn',
    speakerRole: 'AI Research Director',
    speakerBio: 'Chuyên gia kiến trúc hệ thống AI Agents.',
    earlyBirdDiscount: 'Giảm 40% vé Pro',
    targetAudience: 'Software Developers & Tech Leads',
    maxCapacity: 150,
  };

  const mockContent: GeneratedContent = {
    headline: 'Đột phá kỷ nguyên AI Agent 2026',
    alternativeHeadline: 'Chỉ còn 30 vé ưu đãi sớm AI Summit',
    subHeadline: 'Học cách xây dựng và triển khai AI Agent tự hành từ con số 0.',
    description: 'Sự kiện công nghệ quy tụ các chuyên gia hàng đầu về AI và Machine Learning.',
    benefits: [
      { title: 'Tự động hóa toàn diện', description: 'Tối ưu hiệu suất làm việc 500%' },
      { title: 'Thực hành Hands-on', description: 'Xây dựng agent trực tiếp tại workshop' },
    ],
    agenda: [
      { time: '08:30 - 09:00', title: 'Check-in & Networking', description: 'Đón tiếp khách mời' },
      { time: '09:00 - 10:30', title: 'Phiên 1: Kiến trúc Agentic', description: 'Tổng quan công nghệ' },
    ],
    faqs: [
      { question: 'Sự kiện có cấp chứng nhận không?', answer: 'Có, chứng chỉ tham gia có mã định danh QR.' },
    ],
    earlyBirdBadge: 'Ưu đãi 40% có hạn',
    ctaButtonText: 'Đăng ký giữ chỗ ngay',
  };

  const theme = getThemeForCategory('ai-tech');

  it('generates valid HTML5 with doctype, head, and body tags', () => {
    const html = generateStandaloneHtml(mockInput, mockContent, theme, 'pro');
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<html lang="vi"');
    expect(html).toContain('<head>');
    expect(html).toContain('</head>');
    expect(html).toContain('<body');
    expect(html).toContain('</body>');
    expect(html).toContain('</html>');
  });

  it('contains the event name, headlines, and benefits in rendered output', () => {
    const html = generateStandaloneHtml(mockInput, mockContent, theme, 'pro');
    expect(html).toContain('VibeCoding Summit 2026');
    expect(html).toContain('Đột phá kỷ nguyên AI Agent 2026');
    expect(html).toContain('Tự động hóa toàn diện');
    expect(html).toContain('Dr. Alex Nguyễn');
  });

  it('embeds OpenGraph meta tags and JSON-LD Event Schema (@type: "Event")', () => {
    const html = generateStandaloneHtml(mockInput, mockContent, theme, 'free');

    // OpenGraph & Twitter Cards
    expect(html).toContain('property="og:title"');
    expect(html).toContain('property="og:description"');
    expect(html).toContain('property="og:image"');
    expect(html).toContain('name="twitter:card"');

    // JSON-LD Schema
    expect(html).toContain('<script type="application/ld+json">');
    expect(html).toContain('"@type": "Event"');
    expect(html).toContain('"name": "VibeCoding Summit 2026"');
    expect(html).toContain('"startDate": "2026-11-20T09:00"');
    expect(html).toContain('"performer"');
  });

  it('includes ConvertFlow AI badge on free tier and omits watermark on pro tier', () => {
    const freeHtml = generateStandaloneHtml(mockInput, mockContent, theme, 'free');
    expect(freeHtml).toContain('ConvertFlow AI');

    const proHtml = generateStandaloneHtml(mockInput, mockContent, theme, 'pro');
    expect(proHtml).not.toContain('Free Tier Watermark Badge');
  });
  it('ensures navigation CTA links match the registration section anchor id', () => {
    const html = generateStandaloneHtml(mockInput, mockContent, theme, 'pro');
    expect(html).toContain('href="#registration"');
    expect(html).toContain('id="registration"');
  });

  it('renders dynamic testimonials and FAQs in standalone HTML', () => {
    const contentWithExtras: GeneratedContent = {
      ...mockContent,
      testimonials: [
        {
          name: 'Trần Văn Cường',
          role: 'Lead Architect',
          company: 'AI Solutions',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
          quote: 'Chương trình cực kỳ chất lượng và thực tế!',
          rating: 5,
        },
      ],
      faqs: [
        {
          question: 'Có hỗ trợ hoàn vé không?',
          answer: 'Có hỗ trợ trước ngày diễn ra sự kiện 48h.',
        },
      ],
    };

    const html = generateStandaloneHtml(mockInput, contentWithExtras, theme, 'pro');
    expect(html).toContain('Trần Văn Cường');
    expect(html).toContain('Chương trình cực kỳ chất lượng và thực tế!');
    expect(html).toContain('Có hỗ trợ hoàn vé không?');
    expect(html).toContain('Có hỗ trợ trước ngày diễn ra sự kiện 48h.');
  });

  it('reflects new universal categories such as festival-music in exported HTML', () => {
    const musicInput: EventInput = {
      ...mockInput,
      eventName: 'Hanoi SoundFest 2026',
      category: 'festival-music',
    };
    const musicTheme = getThemeForCategory('festival-music');
    const html = generateStandaloneHtml(musicInput, mockContent, musicTheme, 'pro');
    expect(html).toContain('data-category="festival-music"');
    expect(html).toContain('Hanoi SoundFest 2026');
  });
  it('renders rich 4-column event footer and real event gallery in exported HTML', () => {
    const contentWithGallery: GeneratedContent = {
      ...mockContent,
      galleryPhotos: [
        {
          title: 'Khung cảnh khán phòng hoành tráng',
          tag: 'STAGE 360',
          url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600',
        },
      ],
    };
    const html = generateStandaloneHtml(mockInput, contentWithGallery, theme, 'pro');

    // Rich footer checks
    expect(html).toContain('Liên hệ Ban tổ chức');
    expect(html).toContain('Điều hướng nhanh');
    expect(html).toContain('hotro@sukien.vn');
    expect(html).toContain('Thời gian & Địa điểm');

    // Gallery checks
    expect(html).toContain('Không khí & trải nghiệm sự kiện');
    expect(html).toContain('Khung cảnh khán phòng hoành tráng');
    expect(html).toContain('STAGE 360');
  });
});