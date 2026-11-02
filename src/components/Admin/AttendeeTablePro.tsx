import React, { useState } from 'react';
import { Search, Download, Trash2, CheckCircle2, Ticket, QrCode } from 'lucide-react';
import type { Attendee } from '../../types';
import { exportAttendeesToCSV } from '../../services/storageService';

interface AttendeeTableProProps {
  attendees: Attendee[];
  eventName: string;
  onUpdateAttendees: (updated: Attendee[]) => void;
}

export const AttendeeTablePro: React.FC<AttendeeTableProProps> = ({
  attendees,
  eventName,
  onUpdateAttendees,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketFilter, setTicketFilter] = useState<'all' | 'early-bird' | 'standard'>('all');
  const [checkedInIds, setCheckedInIds] = useState<Set<string>>(new Set());

  // Filter attendees
  const filtered = attendees.filter((a) => {
    const matchesSearch =
      a.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.phone.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTicket = ticketFilter === 'all' || a.ticketType === ticketFilter;

    return matchesSearch && matchesTicket;
  });

  const handleToggleCheckIn = (id: string) => {
    setCheckedInIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc muốn hủy vé của ${name}?`)) {
      const updated = attendees.filter((a) => a.id !== id);
      onUpdateAttendees(updated);
    }
  };

  const handleExport = () => {
    exportAttendeesToCSV(attendees, eventName);
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
      {/* Table Toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/50">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên, email hoặc số điện thoại..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filter Pills & Export */}
        <div className="flex items-center gap-2 flex-wrap justify-between sm:justify-end">
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => setTicketFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                ticketFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Tất cả ({attendees.length})
            </button>
            <button
              type="button"
              onClick={() => setTicketFilter('early-bird')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                ticketFilter === 'early-bird'
                  ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Early Bird
            </button>
            <button
              type="button"
              onClick={() => setTicketFilter('standard')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                ticketFilter === 'standard'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Tiêu chuẩn
            </button>
          </div>

          <button
            type="button"
            onClick={handleExport}
            disabled={attendees.length === 0}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Xuất CSV (Excel)</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Mã vé</th>
              <th className="py-3 px-4">Người tham dự</th>
              <th className="py-3 px-4">Liên hệ</th>
              <th className="py-3 px-4">Loại vé</th>
              <th className="py-3 px-4">Thời gian</th>
              <th className="py-3 px-4 text-center">Trạng thái Check-in</th>
              <th className="py-3 px-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400 dark:text-slate-500">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-2 text-slate-400">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <span>Không tìm thấy người tham dự nào phù hợp</span>
                </td>
              </tr>
            ) : (
              filtered.map((attendee) => {
                const isCheckedIn = checkedInIds.has(attendee.id);

                return (
                  <tr
                    key={attendee.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 dark:text-slate-400 font-bold">
                      #{attendee.id.slice(-6)}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {attendee.fullName}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      <div>{attendee.email}</div>
                      <div className="text-[11px] text-slate-400">{attendee.phone}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      {attendee.ticketType === 'early-bird' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          Early Bird
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                          Tiêu chuẩn
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {attendee.registeredAt}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleCheckIn(attendee.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                          isCheckedIn
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {isCheckedIn ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Đã Check-in</span>
                          </>
                        ) : (
                          <>
                            <QrCode className="w-3.5 h-3.5 text-slate-400" />
                            <span>Chưa Check-in</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(attendee.id, attendee.fullName)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="Hủy vé"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AttendeeTablePro;
