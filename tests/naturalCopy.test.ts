// tests/naturalCopy.test.ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

describe('Natural Vietnamese Copywriting', () => {
  it('SectionCustomizerModal không chứa "Bản xem trước trực tiếp" hay "Live Auto-sync"', () => {
    const src = readFileSync('src/components/LandingPage/SectionCustomizerModal.tsx', 'utf8');
    expect(src).not.toContain('Bản xem trước trực tiếp');
    expect(src).not.toContain('Live Auto-sync');
    expect(src).toContain('Xem trước giao diện');
    expect(src).toContain('Tự động cập nhật');
  });

  it('PublishModal sử dụng câu từ tự nhiên thay cho "Mở trang trực tiếp"', () => {
    const src = readFileSync('src/components/LandingPage/PublishModal.tsx', 'utf8');
    expect(src).not.toContain('Mở trang trực tiếp');
    expect(src).toMatch(/Xem trang sự kiện|Mở xem trang/);
  });

  it('LandingPagePreview không dùng cụm từ máy móc "sửa chữ trực tiếp và kích hoạt AI Viết lại"', () => {
    const src = readFileSync('src/components/LandingPage/LandingPagePreview.tsx', 'utf8');
    expect(src).not.toContain('sửa chữ trực tiếp và kích hoạt AI Viết lại');
  });
});
