import React, { useState } from 'react';
import type { Attendee } from '../types';
import { exportAttendeesToCSV } from '../services/storageService';
import { X, Download, Trash2, Users, Search, Ticket } from 'lucide-react';
import { NumberTicker } from './ui/number-ticker';

interface AttendeeListModalProps {
  isOpen: boolean;
  onClose: () => void;
  attendees: Attendee[];
  eventName: string;
  onClearAll: () => void;
}

export const AttendeeListModal: React.FC<AttendeeListModalProps> = ({
  isOpen,
  onClose,
  attendees,
  eventName,
  onClearAll,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredAttendees = attendees.filter(
    a =>
      a.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.phone.includes(searchTerm)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] transition-colors">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Danh sách người tham gia
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  <NumberTicker value={attendees.length} />
                </span>
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action bar & Search */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tên, email, số điện thoại..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => exportAttendeesToCSV(attendees, eventName)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" /> Xuất CSV
            </button>

            {attendees.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Xoá tất cả người đăng ký trong danh sách này?')) {
                    onClearAll();
                  }
                }}
                className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-red-50 dark:hover:bg-red-950/60 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 border border-slate-200 dark:border-slate-800 text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Xoá
              </button>
            )}
          </div>
        </div>

        {/* Attendee Table */}
        <div className="overflow-y-auto flex-1 p-3">
          {filteredAttendees.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              Chưa có người đăng ký nào.
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                  <th className="py-2 px-3">Họ và tên</th>
                  <th className="py-2 px-3">Email & SĐT</th>
                  <th className="py-2 px-3">Hạng vé</th>
                  <th className="py-2 px-3">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {filteredAttendees.map((a, i) => (
                  <tr key={a.id || i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white">
                      {a.fullName}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">
                      <div>{a.email}</div>
                      <div className="text-slate-500 text-[11px]">{a.phone}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${
                          a.ticketType === 'early-bird'
                            ? 'bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-400/30 font-semibold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <Ticket className="w-2.5 h-2.5" />
                        {a.ticketType === 'early-bird' ? 'Early Bird' : 'Tiêu chuẩn'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400 text-[11px]">
                      {a.registeredAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
