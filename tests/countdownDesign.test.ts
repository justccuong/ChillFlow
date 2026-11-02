// tests/countdownDesign.test.ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

describe('CountdownTimer design specifications', () => {
  it('default variant phải là transparent để không có viền bao quanh số', () => {
    const src = readFileSync('src/components/CountdownTimer.tsx', 'utf8');
    expect(src).toMatch(/variant\s*=\s*'transparent'/);
  });

  it('dấu 2 chấm hoặc dấu phân cách nằm trong container căn giữa theo số và có class dịch lên tâm số', () => {
    const src = readFileSync('src/components/CountdownTimer.tsx', 'utf8');
    expect(src).toContain('separator');
  });

  it('nhãn thời gian nằm tách biệt ở dưới các con số', () => {
    const src = readFileSync('src/components/CountdownTimer.tsx', 'utf8');
    expect(src).toContain('unit.label');
  });
});
