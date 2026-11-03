/**
 * Anti-Spam & Form Protection Engine for ChillFlow Event Registration
 * 
 * Provides multi-layered defense against automated bots, griefers, and junk spam:
 * 1. Honeypot Field Check (Deceptive invisible input - Honey-trap mechanism)
 * 2. Time-to-Submit Verification (Blocks rapid automated submissions)
 * 3. Disposable/Temporary Email Filter (Blocks 10-minute mail, mailinator, tempmail, etc.)
 * 4. Vietnamese Mobile Phone Validator & Dummy Number Blocker
 * 5. Browser Local Cooldown Rate Limiting (Prevents flooding from the same machine)
 */

export const DISPOSABLE_EMAIL_DOMAINS = new Set([
  '10minutemail.com',
  '10minutemail.net',
  'armyspy.com',
  'crazymailing.com',
  'cuvox.de',
  'dayrep.com',
  'dispostable.com',
  'dropmail.me',
  'einrot.com',
  'emailfake.com',
  'fakemailgenerator.com',
  'fleckens.hu',
  'generator.email',
  'getnada.com',
  'guerrillamail.biz',
  'guerrillamail.com',
  'guerrillamail.de',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamailblock.com',
  'gustr.com',
  'inboxkitten.com',
  'jourrapide.com',
  'mailinator.com',
  'mohmal.com',
  'mytemp.email',
  'nada.ltd',
  'rhyta.com',
  'sharklasers.com',
  'superrito.com',
  'teleworm.us',
  'temp-mail.org',
  'tempail.com',
  'tempmail.com',
  'tempmail.net',
  'throwawaymail.com',
  'trashmail.com',
  'trashmail.net',
  'yopmail.com',
  'yopmail.fr',
  'yopmail.net',
]);

const DUMMY_PHONE_PATTERNS = [
  '0000000000',
  '0123456789',
  '0987654321',
  '0111111111',
  '0222222222',
  '0333333333',
  '0444444444',
  '0555555555',
  '0666666666',
  '0777777777',
  '0888888888',
  '0999999999',
  '0909090909',
  '0101010101',
];

// Fallback in-memory storage for non-browser/test environments
const memoryStore = new Map<string, string>();

export function getStorage() {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  if (typeof globalThis !== 'undefined' && (globalThis as any).localStorage) {
    return (globalThis as any).localStorage;
  }
  return {
    getItem: (key: string) => memoryStore.get(key) ?? null,
    setItem: (key: string, val: string) => memoryStore.set(key, val),
    removeItem: (key: string) => memoryStore.delete(key),
    clear: () => memoryStore.clear(),
  };
}

/**
 * Checks if the email format is structurally valid
 */
export function isValidEmailFormat(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(trimmed);
}

/**
 * Checks if the email domain belongs to a known disposable temporary email service
 */
export function isDisposableEmail(email: string): boolean {
  if (!isValidEmailFormat(email)) return false;
  const domain = email.trim().toLowerCase().split('@')[1];
  return DISPOSABLE_EMAIL_DOMAINS.has(domain);
}

/**
 * Normalizes phone number (removes spaces, dashes, dots, +84 prefix)
 */
export function normalizeVietnamesePhone(phone: string): string {
  if (!phone || typeof phone !== 'string') return '';
  let cleaned = phone.replace(/[\s\-\.]/g, '');
  if (cleaned.startsWith('+84')) {
    cleaned = '0' + cleaned.slice(3);
  } else if (cleaned.startsWith('84') && cleaned.length === 11) {
    cleaned = '0' + cleaned.slice(2);
  }
  return cleaned;
}

/**
 * Validates Vietnamese mobile phone format and checks against dummy spam numbers
 */
export function validateVietnamesePhone(phone: string): { isValid: boolean; error?: string } {
  const normalized = normalizeVietnamesePhone(phone);

  if (!normalized) {
    return { isValid: false, error: 'Vui lòng nhập số điện thoại' };
  }

  // Check for dummy spam repetitions first
  if (DUMMY_PHONE_PATTERNS.includes(normalized)) {
    return {
      isValid: false,
      error: 'Số điện thoại không khả dụng. Vui lòng nhập số điện thoại thật của bạn.',
    };
  }

  // Vietnamese mobile phone: 10 digits starting with 03, 05, 07, 08, 09
  const vnPhoneRegex = /^0(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$/;
  if (!vnPhoneRegex.test(normalized)) {
    return {
      isValid: false,
      error: 'Số điện thoại không hợp lệ (Phải là số di động 10 số, ví dụ 0912345678)',
    };
  }

  return { isValid: true };
}

/**
 * Cooldown rate limiter using storage to prevent spam flooding from the same browser
 */
const COOLDOWN_KEY_PREFIX = 'cf_reg_cooldown_';

export function checkSubmissionCooldown(
  eventId = 'default',
  cooldownSeconds = 15
): { allowed: boolean; remainingSeconds: number } {
  try {
    const storage = getStorage();
    const key = `${COOLDOWN_KEY_PREFIX}${eventId}`;
    const lastTimestamp = storage.getItem(key);
    if (!lastTimestamp) {
      return { allowed: true, remainingSeconds: 0 };
    }

    const elapsed = Math.floor((Date.now() - parseInt(lastTimestamp, 10)) / 1000);
    if (elapsed < cooldownSeconds) {
      return {
        allowed: false,
        remainingSeconds: cooldownSeconds - elapsed,
      };
    }

    return { allowed: true, remainingSeconds: 0 };
  } catch {
    return { allowed: true, remainingSeconds: 0 };
  }
}

export function recordSubmissionTimestamp(eventId = 'default'): void {
  try {
    const storage = getStorage();
    const key = `${COOLDOWN_KEY_PREFIX}${eventId}`;
    storage.setItem(key, Date.now().toString());
  } catch {
    // Ignore storage errors
  }
}

export function clearSubmissionCooldowns(): void {
  try {
    const storage = getStorage();
    storage.clear();
  } catch {
    // Ignore
  }
}

export interface AntiSpamVerificationInput {
  fullName: string;
  email: string;
  phone: string;
  honeypot: string;
  formMountTimestamp: number;
  eventId?: string;
  bypassTimeCheck?: boolean; // For automated unit testing
  bypassCooldown?: boolean; // For automated unit testing
}

export type AntiSpamResult =
  | { status: 'valid' }
  | { status: 'bot_honeypot' } // Silent trap: Pretend success to bot, but drop payload & preserve seats
  | { status: 'error'; message: string };

/**
 * Comprehensive anti-spam validator for registration submissions
 */
export function verifyRegistrationSubmission(
  input: AntiSpamVerificationInput
): AntiSpamResult {
  // 1. Honeypot check (Highest priority bot trap)
  // If the invisible honeypot field contains any value, it was filled by an automated bot parser
  if (input.honeypot && input.honeypot.trim() !== '') {
    return { status: 'bot_honeypot' };
  }

  // 2. Submission speed check (Human typing & reading takes at least 1.2s)
  if (!input.bypassTimeCheck) {
    const elapsedMs = Date.now() - input.formMountTimestamp;
    if (elapsedMs < 1200) {
      return {
        status: 'error',
        message: 'Thao tác quá nhanh! Vui lòng kiểm tra lại thông tin và bấm gửi lại.',
      };
    }
  }

  // 3. Local browser cooldown rate limit check
  if (!input.bypassCooldown) {
    const cooldown = checkSubmissionCooldown(input.eventId, 15);
    if (!cooldown.allowed) {
      return {
        status: 'error',
        message: `Bạn vừa gửi đăng ký. Vui lòng đợi ${cooldown.remainingSeconds} giây trước khi đăng ký tiếp.`,
      };
    }
  }

  // 4. Name validation
  const nameTrimmed = (input.fullName || '').trim();
  if (nameTrimmed.length < 2) {
    return {
      status: 'error',
      message: 'Vui lòng nhập họ và tên đầy đủ (ít nhất 2 ký tự).',
    };
  }

  // 5. Email format and disposable email check
  const emailTrimmed = (input.email || '').trim();
  if (!isValidEmailFormat(emailTrimmed)) {
    return {
      status: 'error',
      message: 'Địa chỉ email không đúng định dạng (Ví dụ: name@example.com).',
    };
  }

  if (isDisposableEmail(emailTrimmed)) {
    return {
      status: 'error',
      message: 'Không chấp nhận email tạm thời (10-minute mail). Vui lòng dùng email chính thức.',
    };
  }

  // 6. Phone validation
  const phoneValidation = validateVietnamesePhone(input.phone);
  if (!phoneValidation.isValid) {
    return {
      status: 'error',
      message: phoneValidation.error || 'Số điện thoại không hợp lệ.',
    };
  }

  return { status: 'valid' };
}
