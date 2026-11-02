import { describe, it, expect } from 'vitest';
import { calculateEventKpis, filterAttendees } from '../src/components/Admin/OrganizerDashboard';
import type { Attendee } from '../src/types';

describe('Organizer Admin Dashboard Calculations & Filtering', () => {
  const mockAttendees: Attendee[] = [
    {
      id: '1',
      fullName: 'Lê Hoàng Nam',
      email: 'nam@gmail.com',
      phone: '0901234567',
      registeredAt: '2026-11-01 09:00',
      ticketType: 'early-bird',
    },
    {
      id: '2',
      fullName: 'Trần Hương Giang',
      email: 'giang@tech.vn',
      phone: '0987654321',
      registeredAt: '2026-11-01 10:30',
      ticketType: 'standard',
    },
    {
      id: '3',
      fullName: 'Nguyễn Văn Minh',
      email: 'minh.event@company.com',
      phone: '0912345678',
      registeredAt: '2026-11-01 14:00',
      ticketType: 'early-bird',
    },
  ];

  it('calculates correct conversion rate, seats left and early bird ratio', () => {
    const kpis = calculateEventKpis(mockAttendees, 100, 50);
    // 3 attendees / 50 page views * 100 = 6%
    expect(kpis.conversionRate).toBe(6);
    expect(kpis.seatsLeft).toBe(97);
    // 2 early bird out of 3 total attendees = 66.7%
    expect(kpis.earlyBirdRatio).toBeCloseTo(66.67, 1);
  });

  it('handles zero page views or zero capacity safely without NaN or Infinity', () => {
    const kpis = calculateEventKpis([], 0, 0);
    expect(kpis.conversionRate).toBe(0);
    expect(kpis.seatsLeft).toBe(0);
    expect(kpis.earlyBirdRatio).toBe(0);
  });

  it('filters attendees by search keyword and ticket type', () => {
    const resultSearch = filterAttendees(mockAttendees, 'hoàng', 'all');
    expect(resultSearch.length).toBe(1);
    expect(resultSearch[0].fullName).toBe('Lê Hoàng Nam');

    const resultType = filterAttendees(mockAttendees, '', 'early-bird');
    expect(resultType.length).toBe(2);

    const resultCombined = filterAttendees(mockAttendees, 'giang', 'standard');
    expect(resultCombined.length).toBe(1);
    expect(resultCombined[0].email).toBe('giang@tech.vn');

    const resultNone = filterAttendees(mockAttendees, 'không-tồn-tại', 'all');
    expect(resultNone.length).toBe(0);
  });
});
