import { describe, it, expect } from 'vitest';
import { generateLandingPageContent } from '../src/services/aiService';
import { EventInput } from '../src/types';

describe('Domain-Specific Content Generation (Smart Fallback & Prompting)', () => {
  const baseInput: Omit<EventInput, 'category'> = {
    eventName: 'Summer Wave Fest 2026',
    eventDate: '2026-07-20',
    location: 'Quận 7, TP.HCM',
    speakerName: 'DJ Alan Walker',
    speakerRole: 'Headliner DJ & Music Producer',
    targetAudience: 'Yêu âm nhạc điện tử',
  };

  it('generates rich music festival copy without academic terms for festival-music', async () => {
    const res = await generateLandingPageContent(
      { ...baseInput, category: 'festival-music' },
      undefined,
      false
    );
    const text = JSON.stringify(res.content);
    // Should have music festival context
    expect(text).toMatch(/nhạc|âm nhạc|sân khấu|nghệ sĩ|line-up|DJ|vũ hội|festival/i);
    // Must NOT contain academic course terms
    expect(text).not.toMatch(/giáo trình|lớp học|bài giảng|giảng viên viện sĩ|học phần/i);
    // Benefits should reflect festival
    expect(res.content.benefits.some(b => b.title.match(/âm thanh|nghệ sĩ|F&B|visual|laser/i))).toBe(true);
  });

  it('generates authentic race and marathon copy for sports-marathon', async () => {
    const res = await generateLandingPageContent(
      {
        ...baseInput,
        eventName: 'VnExpress Marathon Midnight',
        speakerName: 'Nguyễn Văn Lai',
        speakerRole: 'Kỷ lục gia Điền kinh',
        category: 'sports-marathon',
      },
      undefined,
      false
    );
    const text = JSON.stringify(res.content);
    // Should have sports / marathon terms
    expect(text).toMatch(/chạy|marathon|race kit|cung đường|runner|cự ly|huy chương/i);
    // Must NOT contain academic terms
    expect(text).not.toMatch(/giáo trình|lớp học|bài giảng|học viên/i);
    expect(res.content.benefits.some(b => b.title.match(/race kit|chiptiming|tiếp nước|huy chương|finisher/i))).toBe(true);
  });

  it('generates gastronomy and lifestyle copy for culinary-lifestyle', async () => {
    const res = await generateLandingPageContent(
      {
        ...baseInput,
        eventName: 'Michelin Star Gourmet Gala',
        speakerName: 'Chef Gordon Ramsay',
        speakerRole: 'Executive Chef',
        category: 'culinary-lifestyle',
      },
      undefined,
      false
    );
    const text = JSON.stringify(res.content);
    // Should have culinary terms
    expect(text).toMatch(/ẩm thực|vị giác|dạ tiệc|món|bếp trưởng|rượu vang|sommelier|tinh hoa/i);
    expect(text).not.toMatch(/giáo trình|lớp học|học viên|bài giảng/i);
    expect(res.content.benefits.some(b => b.title.match(/thực đơn|fine dining|rượu vang|pairing|cocktail|bếp/i))).toBe(true);
  });

  it('generates career fair and networking copy for community-career', async () => {
    const res = await generateLandingPageContent(
      {
        ...baseInput,
        eventName: 'Tech Talent Career Expo 2026',
        speakerName: 'Lê Hồng Minh',
        speakerRole: 'Giám đốc Nhân sự Cấp cao',
        category: 'community-career',
      },
      undefined,
      false
    );
    const text = JSON.stringify(res.content);
    // Should have career / job fair terms
    expect(text).toMatch(/tuyển dụng|việc làm|CV|doanh nghiệp|phỏng vấn|sự nghiệp|thăng tiến/i);
    expect(text).not.toMatch(/giáo trình|lớp học|học viên/i);
    expect(res.content.benefits.some(b => b.title.match(/doanh nghiệp|CV|phỏng vấn|ứng viên|thăng tiến/i))).toBe(true);
  });

  it('generates global expo and multi-purpose showcase copy for universal-showcase', async () => {
    const res = await generateLandingPageContent(
      {
        ...baseInput,
        eventName: 'Global Innovation Expo',
        speakerName: 'Trần Đình Long',
        speakerRole: 'Chủ tịch Diễn đàn',
        category: 'universal-showcase',
      },
      undefined,
      false
    );
    const text = JSON.stringify(res.content);
    expect(text).toMatch(/kết nối|triển lãm|tiên phong|đột phá|đối tác|hợp tác|toàn cầu/i);
  });
});
