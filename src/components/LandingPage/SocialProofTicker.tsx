import React, { useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import type { Attendee } from '../../types';

interface SocialProofTickerProps {
  attendees?: Attendee[];
}

function formatTimeAgo(timeStr?: string): string {
  if (!timeStr) return 'Vừa xong';
  try {
    const time = new Date(timeStr).getTime();
    if (isNaN(time)) return 'Vừa xong';
    const diffSec = Math.floor((Date.now() - time) / 1000);
    if (diffSec < 60) return 'Vừa xong';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)} phút trước`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} giờ trước`;
    return `${Math.floor(diffSec / 86400)} ngày trước`;
  } catch {
    return 'Vừa xong';
  }
}

const ActiveSocialProofTicker: React.FC<{ attendees: Attendee[] }> = ({ attendees }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed || attendees.length === 0) return;

    // Show after initial 4 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Loop interval: show for 6s, hide for 10s
    const loopInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % attendees.length);
        setIsVisible(true);
      }, 10000);
    }, 18000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(loopInterval);
    };
  }, [isDismissed, attendees.length]);

  if (isDismissed || !isVisible || attendees.length === 0) return null;

  const item = attendees[currentIndex % attendees.length];
  const ticketLabel = item.ticketType === 'early-bird' ? 'Vé Early Bird' : 'Vé Tiêu chuẩn';

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl flex items-center gap-3">
        <div className="relative shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 via-cyan-500/20 to-indigo-600/30 border-2 border-indigo-500/40 flex items-center justify-center text-indigo-600 dark:text-cyan-400">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5">
            <CheckCircle2 className="w-3 h-3" />
          </div>
        </div>

        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {item.fullName}
            </span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 truncate">
            Vừa đăng ký <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">{ticketLabel}</strong>
          </p>
          <span className="text-[10px] text-slate-400 block">{formatTimeAgo(item.registeredAt)}</span>
        </div>

        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Ẩn thông báo"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export const SocialProofTicker: React.FC<SocialProofTickerProps> = ({ attendees }) => {
  if (!attendees || attendees.length === 0) {
    return null;
  }
  return <ActiveSocialProofTicker attendees={attendees} />;
};
