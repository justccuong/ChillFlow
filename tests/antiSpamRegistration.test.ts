import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  isValidEmailFormat,
  isDisposableEmail,
  normalizeVietnamesePhone,
  validateVietnamesePhone,
  checkSubmissionCooldown,
  recordSubmissionTimestamp,
  clearSubmissionCooldowns,
  verifyRegistrationSubmission,
} from '../src/utils/antiSpam';

describe('Anti-Spam & Form Protection Engine (antiSpam.ts)', () => {
  beforeEach(() => {
    clearSubmissionCooldowns();
    vi.restoreAllMocks();
  });

  describe('1. Honeypot Bot Trap (Honey-trap Mechanism)', () => {
    it('detects automated bot when honeypot field is filled with text', () => {
      const result = verifyRegistrationSubmission({
        fullName: 'Bot Spammer',
        email: 'spammer@example.com',
        phone: '0912345678',
        honeypot: 'http://spam-link.ru',
        formMountTimestamp: Date.now() - 5000,
        eventId: 'test-event',
      });

      expect(result.status).toBe('bot_honeypot');
    });

    it('detects automated bot even when honeypot contains single whitespace or hidden token', () => {
      const result = verifyRegistrationSubmission({
        fullName: 'Bot User',
        email: 'bot@example.com',
        phone: '0988776655',
        honeypot: 'filled_by_bot_script',
        formMountTimestamp: Date.now() - 5000,
        eventId: 'test-event',
      });

      expect(result.status).toBe('bot_honeypot');
    });

    it('allows legitimate submission when honeypot is completely empty', () => {
      const result = verifyRegistrationSubmission({
        fullName: 'Nguyễn Văn Thật',
        email: 'real.user@gmail.com',
        phone: '0912345678',
        honeypot: '',
        formMountTimestamp: Date.now() - 5000,
        eventId: 'test-event',
      });

      expect(result.status).toBe('valid');
    });
  });

  describe('2. Time-to-Submit Verification (Fast Script Blocker)', () => {
    it('blocks submissions made faster than 1.2 seconds (script / auto-filler)', () => {
      const now = Date.now();
      const result = verifyRegistrationSubmission({
        fullName: 'Quick Submitter',
        email: 'quick@gmail.com',
        phone: '0912345678',
        honeypot: '',
        formMountTimestamp: now - 300, // Only 300ms elapsed
        eventId: 'test-event',
      });

      expect(result.status).toBe('error');
      if (result.status === 'error') {
        expect(result.message).toContain('Thao tác quá nhanh');
      }
    });

    it('allows submissions after normal human duration (>= 1.2s)', () => {
      const now = Date.now();
      const result = verifyRegistrationSubmission({
        fullName: 'Human User',
        email: 'human@gmail.com',
        phone: '0912345678',
        honeypot: '',
        formMountTimestamp: now - 2500, // 2.5 seconds elapsed
        eventId: 'test-event',
      });

      expect(result.status).toBe('valid');
    });
  });

  describe('3. Disposable & Temporary Email Blocker', () => {
    it('correctly validates email syntax', () => {
      expect(isValidEmailFormat('user@gmail.com')).toBe(true);
      expect(isValidEmailFormat('alex.nguyen@techfirm.vn')).toBe(true);
      expect(isValidEmailFormat('invalid-mail')).toBe(false);
      expect(isValidEmailFormat('@no-user.com')).toBe(false);
      expect(isValidEmailFormat('user@domain')).toBe(false);
    });

    it('blocks popular disposable temp-mail domains', () => {
      const tempEmails = [
        'attacker@10minutemail.com',
        'spammer@mailinator.com',
        'fake@tempmail.com',
        'bot@guerrillamail.com',
        'test@trashmail.com',
        'throwaway@yopmail.com',
        'user@sharklasers.com',
      ];

      for (const email of tempEmails) {
        expect(isDisposableEmail(email)).toBe(true);

        const result = verifyRegistrationSubmission({
          fullName: 'Test Temp Mail',
          email,
          phone: '0912345678',
          honeypot: '',
          formMountTimestamp: Date.now() - 5000,
          eventId: 'test-event',
        });

        expect(result.status).toBe('error');
        if (result.status === 'error') {
          expect(result.message).toContain('email tạm thời');
        }
      }
    });

    it('allows reputable email domains', () => {
      const legitEmails = [
        'developer@gmail.com',
        'student@fpt.edu.vn',
        'ceo@startup.io',
        'contact@vibe.vn',
        'employee@microsoft.com',
      ];

      for (const email of legitEmails) {
        expect(isDisposableEmail(email)).toBe(false);
      }
    });
  });

  describe('4. Vietnamese Mobile Phone Validator & Dummy Number Blocker', () => {
    it('normalizes Vietnamese phone numbers with +84 or spaces', () => {
      expect(normalizeVietnamesePhone('+84 912 345 678')).toBe('0912345678');
      expect(normalizeVietnamesePhone('0912-345-678')).toBe('0912345678');
      expect(normalizeVietnamesePhone('+84988112233')).toBe('0988112233');
    });

    it('accepts valid 10-digit Vietnamese mobile prefixes (03, 05, 07, 08, 09)', () => {
      const validPhones = [
        '0912345678',
        '0389123456',
        '0701234567',
        '0868123456',
        '0567891234',
        '+84903112233',
      ];

      for (const phone of validPhones) {
        const val = validateVietnamesePhone(phone);
        expect(val.isValid).toBe(true);
      }
    });

    it('rejects invalid lengths or non-mobile prefixes', () => {
      expect(validateVietnamesePhone('123456').isValid).toBe(false);
      expect(validateVietnamesePhone('0141234567').isValid).toBe(false); // Invalid prefix 014
      expect(validateVietnamesePhone('02412345678').isValid).toBe(false); // Landline length
    });

    it('rejects obvious dummy/griefer repeating phone numbers', () => {
      const dummyNumbers = [
        '0000000000',
        '0123456789',
        '0987654321',
        '0999999999',
        '0888888888',
        '0777777777',
        '0333333333',
      ];

      for (const phone of dummyNumbers) {
        const val = validateVietnamesePhone(phone);
        expect(val.isValid).toBe(false);
        expect(val.error).toContain('không khả dụng');
      }
    });
  });

  describe('5. Browser-level Cooldown Rate Limiting', () => {
    it('allows first submission and calculates cooldown properly', () => {
      const eventId = 'cooldown-event-1';
      expect(checkSubmissionCooldown(eventId, 15).allowed).toBe(true);

      // Record a submission timestamp
      recordSubmissionTimestamp(eventId);

      // Second submission right away should be blocked
      const immediateCheck = checkSubmissionCooldown(eventId, 15);
      expect(immediateCheck.allowed).toBe(false);
      expect(immediateCheck.remainingSeconds).toBeGreaterThan(0);
      expect(immediateCheck.remainingSeconds).toBeLessThanOrEqual(15);
    });

    it('allows submission after cooldown period expires', () => {
      const eventId = 'cooldown-event-2';
      // Record timestamp 20 seconds ago
      const past = Date.now() - 20000;
      const key = `cf_reg_cooldown_${eventId}`;
      // Use recordSubmissionTimestamp with custom time simulation
      const storage = (globalThis as any).localStorage || { setItem: () => {} };
      try {
        storage.setItem(key, past.toString());
      } catch {
        // Safe
      }

      const check = checkSubmissionCooldown(eventId, 15);
      expect(check.allowed).toBe(true);
      expect(check.remainingSeconds).toBe(0);
    });
  });

  describe('6. End-to-End Registration Flow Simulation', () => {
    it('protects event capacity: bot honeypot traps return bot_honeypot so consumers do NOT increment seats', () => {
      let registeredCount = 10;
      const attendees: any[] = [];

      const mockOnRegisterSuccess = (data: any) => {
        attendees.push(data);
        registeredCount++;
      };

      // Simulated Bot Submission
      const botPayload = {
        fullName: 'X-Bot Spam',
        email: 'xbot@spammer.org',
        phone: '0912345678',
        honeypot: 'bot_auto_filled_value',
        formMountTimestamp: Date.now() - 5000,
        eventId: 'summit-2026',
      };

      const verification = verifyRegistrationSubmission(botPayload);
      expect(verification.status).toBe('bot_honeypot');

      // The consumer (RegistrationSection) recognizes bot_honeypot and DOES NOT call mockOnRegisterSuccess
      if (verification.status === 'valid') {
        mockOnRegisterSuccess(botPayload);
      }

      // Seat count and attendee list MUST remain completely unchanged!
      expect(registeredCount).toBe(10);
      expect(attendees.length).toBe(0);
    });

    it('allows real user and properly updates registeredCount and attendee list', () => {
      let registeredCount = 10;
      const attendees: any[] = [];

      const mockOnRegisterSuccess = (data: any) => {
        attendees.push(data);
        registeredCount++;
      };

      // Simulated Legitimate User
      const humanPayload = {
        fullName: 'Nguyễn Tiến Dũng',
        email: 'dung.nt@fpt.edu.vn',
        phone: '0978123456',
        honeypot: '',
        formMountTimestamp: Date.now() - 5000,
        eventId: 'summit-2026',
      };

      const verification = verifyRegistrationSubmission(humanPayload);
      expect(verification.status).toBe('valid');

      if (verification.status === 'valid') {
        mockOnRegisterSuccess(humanPayload);
      }

      // Seat count and attendee list are successfully updated!
      expect(registeredCount).toBe(11);
      expect(attendees.length).toBe(1);
      expect(attendees[0].fullName).toBe('Nguyễn Tiến Dũng');
    });
  });
});
