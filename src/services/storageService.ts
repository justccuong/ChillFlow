import { Attendee, EventInput, GeneratedContent, CROEvaluation } from '../types';

const STORAGE_KEY_PREFIX = 'convertflow_';
const ATTENDEES_KEY = `${STORAGE_KEY_PREFIX}attendees`;
const CURRENT_EVENT_KEY = `${STORAGE_KEY_PREFIX}current_event`;
const CURRENT_CONTENT_KEY = `${STORAGE_KEY_PREFIX}current_content`;
const CURRENT_CRO_KEY = `${STORAGE_KEY_PREFIX}current_cro`;
const API_KEY_STORAGE = `${STORAGE_KEY_PREFIX}gemini_api_key`;

// Default seed attendees so the landing page already looks active and high-converting!
const DEFAULT_ATTENDEES: Attendee[] = [
  {
    id: 'att-1',
    fullName: 'Trần Minh Hoàng',
    email: 'hoang.tm@gmail.com',
    phone: '0912***456',
    registeredAt: '2026-10-21 08:30',
    ticketType: 'early-bird',
  },
  {
    id: 'att-2',
    fullName: 'Nguyễn Thị Thuỳ Dương',
    email: 'duong.ntt@techfirm.vn',
    phone: '0988***123',
    registeredAt: '2026-10-21 09:15',
    ticketType: 'early-bird',
  },
  {
    id: 'att-3',
    fullName: 'Lê Quang Huy',
    email: 'quanghuy.dev@gmail.com',
    phone: '0903***789',
    registeredAt: '2026-10-21 11:40',
    ticketType: 'early-bird',
  },
  {
    id: 'att-4',
    fullName: 'Phạm Đức Thắng',
    email: 'thang.pd@startup.io',
    phone: '0971***666',
    registeredAt: '2026-10-21 14:05',
    ticketType: 'standard',
  },
];

export function getStoredAttendees(eventIdentifier = 'default'): Attendee[] {
  try {
    const raw = localStorage.getItem(`${ATTENDEES_KEY}_${eventIdentifier}`);
    if (!raw) {
      // Initialize with seed data
      localStorage.setItem(`${ATTENDEES_KEY}_${eventIdentifier}`, JSON.stringify(DEFAULT_ATTENDEES));
      return DEFAULT_ATTENDEES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read attendees from localStorage', e);
    return DEFAULT_ATTENDEES;
  }
}

export function saveAttendee(attendee: Omit<Attendee, 'id' | 'registeredAt'>, eventIdentifier = 'default'): Attendee[] {
  const current = getStoredAttendees(eventIdentifier);
  const now = new Date();
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  const newAttendee: Attendee = {
    ...attendee,
    id: 'att-' + Date.now(),
    registeredAt: timeStr,
  };

  const updated = [newAttendee, ...current];
  localStorage.setItem(`${ATTENDEES_KEY}_${eventIdentifier}`, JSON.stringify(updated));
  return updated;
}

export function saveCurrentEventState(input: EventInput, content: GeneratedContent, cro: CROEvaluation) {
  try {
    localStorage.setItem(CURRENT_EVENT_KEY, JSON.stringify(input));
    localStorage.setItem(CURRENT_CONTENT_KEY, JSON.stringify(content));
    localStorage.setItem(CURRENT_CRO_KEY, JSON.stringify(cro));
  } catch (e) {
    console.error('Failed to save event state', e);
  }
}

export function getSavedEventState(): {
  input: EventInput | null;
  content: GeneratedContent | null;
  cro: CROEvaluation | null;
} {
  try {
    const inputRaw = localStorage.getItem(CURRENT_EVENT_KEY);
    const contentRaw = localStorage.getItem(CURRENT_CONTENT_KEY);
    const croRaw = localStorage.getItem(CURRENT_CRO_KEY);

    return {
      input: inputRaw ? JSON.parse(inputRaw) : null,
      content: contentRaw ? JSON.parse(contentRaw) : null,
      cro: croRaw ? JSON.parse(croRaw) : null,
    };
  } catch (e) {
    return { input: null, content: null, cro: null };
  }
}

export function clearEventState() {
  localStorage.removeItem(CURRENT_EVENT_KEY);
  localStorage.removeItem(CURRENT_CONTENT_KEY);
  localStorage.removeItem(CURRENT_CRO_KEY);
}

export function getSavedApiKey(): string {
  const fromStorage = localStorage.getItem(API_KEY_STORAGE);
  if (fromStorage && fromStorage.trim() !== '') {
    return fromStorage.trim();
  }
  const envKey = (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
  return envKey.trim();
}

export function saveApiKey(key: string) {
  localStorage.setItem(API_KEY_STORAGE, key.trim());
}

export function exportAttendeesToCSV(attendees: Attendee[], eventName: string) {
  const headers = ['Mã Vé', 'Họ và Tên', 'Email', 'Số Điện Thoại', 'Loại Vé', 'Thời Gian Đăng Ký'];
  const rows = attendees.map(a => [
    a.id,
    `"${a.fullName.replace(/"/g, '""')}"`,
    `"${a.email}"`,
    `"${a.phone}"`,
    a.ticketType === 'early-bird' ? 'Early Bird (Ưu Đãi Sớm)' : 'Standard',
    `"${a.registeredAt}"`,
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `danh-sach-dang-ky-${eventName.replace(/[^a-zA-Z0-9]/g, '_')}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
