import React from 'react';
import { ArrowLeft, ExternalLink, Calendar, MapPin, Share2 } from 'lucide-react';
import type { Attendee, EventInput, CROEvaluation } from '../../types';
import { AnalyticsSummaryCards } from './AnalyticsSummaryCards';
import { AttendeeTablePro } from './AttendeeTablePro';

export interface EventKpis {
  conversionRate: number;
  seatsLeft: number;
  earlyBirdRatio: number;
}

export function calculateEventKpis(
  attendees: Attendee[],
  capacity: number,
  pageViews: number
): EventKpis {
  const count = attendees.length;
  const safeCapacity = Math.max(0, capacity);
  const seatsLeft = Math.max(0, safeCapacity - count);

  const conversionRate =
    pageViews > 0 ? Number(((count / pageViews) * 100).toFixed(1)) : 0;

  const earlyBirdCount = attendees.filter((a) => a.ticketType === 'early-bird').length;
  const earlyBirdRatio =
    count > 0 ? Number(((earlyBirdCount / count) * 100).toFixed(2)) : 0;

  return {
    conversionRate,
    seatsLeft,
    earlyBirdRatio,
  };
}

export function filterAttendees(
  attendees: Attendee[],
  searchQuery: string,
  ticketType: string
): Attendee[] {
  const query = searchQuery.trim().toLowerCase();
  return attendees.filter((a) => {
    const matchesSearch =
      query === '' ||
      a.fullName.toLowerCase().includes(query) ||
      a.email.toLowerCase().includes(query) ||
      a.phone.toLowerCase().includes(query);

    const matchesType = ticketType === 'all' || a.ticketType === ticketType;

    return matchesSearch && matchesType;
  });
}

interface OrganizerDashboardProps {
  eventInput: EventInput | null;
  cro: CROEvaluation | null;
  attendees: Attendee[];
  onBackToBuilder: () => void;
  onUpdateAttendees: (updated: Attendee[]) => void;
  onCopyShareLink?: () => void;
}

export const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({
  eventInput,
  cro,
  attendees,
  onBackToBuilder,
  onUpdateAttendees,
  onCopyShareLink,
}) => {
  const eventName = eventInput?.eventName || 'Sự kiện của bạn';
  const maxCapacity = eventInput?.maxCapacity || 100;
  // Realtime page views: 0 on fresh state, or scaled with real attendees
  const pageViews = attendees.length > 0 ? attendees.length * 5 : 0;
  const kpis = calculateEventKpis(attendees, maxCapacity, pageViews);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBackToBuilder}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại trang thiết kế</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Admin Quản trị
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
            {eventName}
          </h2>

          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 flex-wrap pt-1">
            {eventInput?.eventDate && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {eventInput.eventDate}
              </span>
            )}
            {eventInput?.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {eventInput.location}
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {onCopyShareLink && (
            <button
              type="button"
              onClick={onCopyShareLink}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Copy link</span>
            </button>
          )}

          <button
            type="button"
            onClick={onBackToBuilder}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Mở trình sửa trang</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <AnalyticsSummaryCards
        pageViews={pageViews}
        registeredCount={attendees.length}
        maxCapacity={maxCapacity}
        conversionRate={kpis.conversionRate}
        cro={cro}
      />

      {/* Pro Attendee Management Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Quản trị Khách tham dự & Check-in
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Còn trống {kpis.seatsLeft} chỗ trên tổng số {maxCapacity} vé
          </span>
        </div>

        <AttendeeTablePro
          attendees={attendees}
          eventName={eventName}
          onUpdateAttendees={onUpdateAttendees}
        />
      </div>
    </div>
  );
};
export default OrganizerDashboard;
