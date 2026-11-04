import { describe, it, expect, beforeEach } from 'vitest';
import { getStoredAttendees } from '../src/services/storageService';
import { calculateEventKpis } from '../src/components/Admin/OrganizerDashboard';
import { SocialProofTicker } from '../src/components/LandingPage/SocialProofTicker';

// Mock localStorage for node test environment
const storageMap = new Map<string, string>();
const mockLocalStorage = {
  getItem: (key: string) => storageMap.get(key) ?? null,
  setItem: (key: string, val: string) => storageMap.set(key, val),
  removeItem: (key: string) => storageMap.delete(key),
  clear: () => storageMap.clear(),
};
(globalThis as any).localStorage = mockLocalStorage;

describe('Realtime Zero-Mock Data Reset & Clean Defaults', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  it('getStoredAttendees returns [] on fresh state without seeding fake attendees', () => {
    const attendees = getStoredAttendees('fresh-event-zero-state');
    expect(attendees).toEqual([]);
    // Ensure localStorage was not seeded with mock data
    const raw = mockLocalStorage.getItem('convertflow_attendees_fresh-event-zero-state');
    expect(raw).toBeNull();
  });

  it('calculateEventKpis returns 0% conversion rate and accurate KPIs for zero state', () => {
    const kpis = calculateEventKpis([], 100, 0);
    expect(kpis.conversionRate).toBe(0);
    expect(kpis.seatsLeft).toBe(100);
    expect(kpis.earlyBirdRatio).toBe(0);
  });

  it('SocialProofTicker returns null when attendees list is empty or undefined', () => {
    const renderEmpty = (SocialProofTicker as any)({ attendees: [] });
    expect(renderEmpty).toBeNull();

    const renderUndefined = (SocialProofTicker as any)({});
    expect(renderUndefined).toBeNull();
  });
});
