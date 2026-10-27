import { describe, it, expect } from 'vitest';
import {
  parseHexColor,
  getRelativeLuminance,
  getContrastRatio,
  evaluateWCAGContrast,
  generatePunchyHeadline,
  auditRenderedDOM,
} from '../src/utils/uiAuditor';

describe('UI Auditor: WCAG 2.1 Contrast & Relative Luminance', () => {
  it('parses valid 3-character and 6-character hex colors into RGB tuples', () => {
    expect(parseHexColor('#ffffff')).toEqual([255, 255, 255]);
    expect(parseHexColor('000000')).toEqual([0, 0, 0]);
    expect(parseHexColor('#fff')).toEqual([255, 255, 255]);
    expect(parseHexColor('#000')).toEqual([0, 0, 0]);
    expect(parseHexColor('#06b6d4')).toEqual([6, 182, 212]);
  });

  it('returns null for invalid hex color codes', () => {
    expect(parseHexColor('')).toBeNull();
    expect(parseHexColor('#xyz123')).toBeNull();
    expect(parseHexColor('rgb(255,0,0)')).toBeNull();
  });

  it('calculates Relative Luminance according to W3C formula', () => {
    const lumBlack = getRelativeLuminance('#000000');
    const lumWhite = getRelativeLuminance('#ffffff');

    expect(lumBlack).toBeCloseTo(0, 4);
    expect(lumWhite).toBeCloseTo(1, 4);

    // Gray luminance should be strictly between 0 and 1
    const lumGray = getRelativeLuminance('#777777');
    expect(lumGray).toBeGreaterThan(0);
    expect(lumGray).toBeLessThan(1);
  });

  it('calculates Contrast Ratio accurately (21:1 for black on white, 1:1 for identical)', () => {
    const maxContrast = getContrastRatio('#ffffff', '#000000');
    expect(maxContrast).toBe(21);

    const sameContrast = getContrastRatio('#3b82f6', '#3b82f6');
    expect(sameContrast).toBe(1);

    // Cyan #06b6d4 on dark slate #020617 gives 8.31:1 (Exceeds WCAG AAA 7.0:1 requirement)
    const cyberContrast = getContrastRatio('#06b6d4', '#020617');
    expect(cyberContrast).toBeGreaterThanOrEqual(7.0);
  });

  it('evaluates WCAG compliance levels (AAA, AA, FAIL)', () => {
    const aaa = evaluateWCAGContrast(12.5);
    expect(aaa.level).toBe('AAA');
    expect(aaa.normalText).toBe(true);
    expect(aaa.score).toBe(100);

    const aa = evaluateWCAGContrast(5.2);
    expect(aa.level).toBe('AA');
    expect(aa.normalText).toBe(true);
    expect(aa.score).toBe(88);

    const largeOnly = evaluateWCAGContrast(3.5);
    expect(largeOnly.largeText).toBe(true);
    expect(largeOnly.normalText).toBe(false);

    const fail = evaluateWCAGContrast(2.1);
    expect(fail.level).toBe('FAIL');
    expect(fail.normalText).toBe(false);
  });
});

describe('UI Auditor: Headline Transformation & Auto-Fix Utilities', () => {
  it('cleans boilerplate lead-ins from verbose headlines', () => {
    const verbose = 'Chào mừng bạn đến với Hội thảo Trí tuệ Nhân tạo 2026: Kiến tạo Tương lai Kỷ nguyên Agentic';
    const punchy = generatePunchyHeadline(verbose);

    expect(punchy).not.toMatch(/^Chào mừng bạn đến với/i);
    expect(punchy.length).toBeLessThanOrEqual(75);
  });

  it('extracts high-converting core message from colon or dash splitters', () => {
    const colonSplit = 'Chuyển Đổi Số Thực Chiến 2026: Lộ trình 30 ngày cho Doanh nghiệp vừa và nhỏ';
    const punchy = generatePunchyHeadline(colonSplit);

    expect(punchy).toBe('Chuyển Đổi Số Thực Chiến 2026');
  });

  it('falls back to punchy default when input is empty', () => {
    const empty = generatePunchyHeadline('');
    expect(empty).toBeTruthy();
    expect(empty.length).toBeGreaterThan(10);
  });
});

describe('UI Auditor: DOM Deterministic Audit Engine', () => {
  it('generates a complete audit report with default fallback metrics', () => {
    const report = auditRenderedDOM(null, {
      headline: 'Chinh Phục Kỹ Năng Đột Phá 2026',
    });

    expect(report.overallScore).toBeGreaterThanOrEqual(70);
    expect(report.metrics.contrastRatio).toBeGreaterThan(10);
    expect(report.metrics.wcagLevel).toBe('AAA');
    expect(report.metrics.isCtaAboveFold).toBe(true);
    expect(Array.isArray(report.issues)).toBe(true);
  });

  it('detects overly verbose headlines and prescribes punchy-headline auto-fix', () => {
    const veryLongHeadline =
      'Chương trình đào tạo đặc biệt chuyên sâu toàn diện về ứng dụng thực tiễn Trí tuệ nhân tạo và Tự động hóa quy trình nghiệp vụ cho các nhà lãnh đạo công nghệ thế hệ mới năm 2026';

    const report = auditRenderedDOM(null, {
      headline: veryLongHeadline,
    });

    const headlineIssue = report.issues.find((i) => i.id === 'headline-too-long');
    expect(headlineIssue).toBeDefined();
    expect(headlineIssue?.severity).toBe('warning');
    expect(headlineIssue?.autoFixType).toBe('punchy-headline');
  });
});
