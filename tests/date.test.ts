import { describe, it, expect } from 'vitest';
import { formatEventDate, calculateTimeRemaining } from '../src/utils/date';

describe('Date Utilities (date.ts)', () => {
  describe('formatEventDate', () => {
    it('returns empty string when input is empty', () => {
      expect(formatEventDate('')).toBe('');
    });

    it('returns original string when date is invalid', () => {
      expect(formatEventDate('not-a-valid-date')).toBe('not-a-valid-date');
    });

    it('formats a valid ISO date correctly in Vietnamese locale', () => {
      const formatted = formatEventDate('2026-11-20T09:00:00Z');
      expect(formatted).toBeTruthy();
      expect(typeof formatted).toBe('string');
      // Should contain year 2026 and day 20
      expect(formatted).toContain('2026');
      expect(formatted).toContain('20');
    });
  });

  describe('calculateTimeRemaining', () => {
    it('calculates exact countdown for a known future timestamp', () => {
      const now = new Date('2026-10-01T00:00:00Z').getTime();
      const target = '2026-10-03T05:30:15Z'; // exactly 2 days, 5 hours, 30 minutes, 15 seconds later
      const result = calculateTimeRemaining(target, now);

      expect(result.days).toBe(2);
      expect(result.hours).toBe(5);
      expect(result.minutes).toBe(30);
      expect(result.seconds).toBe(15);
    });

    it('activates fallback lively countdown when target date is in the past', () => {
      const now = new Date('2026-10-15T00:00:00Z').getTime();
      const pastTarget = '2025-01-01T00:00:00Z';
      const result = calculateTimeRemaining(pastTarget, now);

      // Fallback is 14 days, 8 hours, 45 minutes
      expect(result.days).toBe(14);
      expect(result.hours).toBe(8);
      expect(result.minutes).toBe(45);
    });

    it('activates fallback when target date is invalid', () => {
      const now = new Date('2026-10-15T00:00:00Z').getTime();
      const result = calculateTimeRemaining('invalid-date-string', now);

      expect(result.days).toBe(14);
      expect(result.hours).toBe(8);
      expect(result.minutes).toBe(45);
    });
  });
});
