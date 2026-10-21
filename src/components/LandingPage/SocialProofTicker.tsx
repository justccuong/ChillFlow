import React, { useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface SocialProofItem {
  name: string;
  location: string;
  ticketType: string;
  timeAgo: string;
  avatar: string;
}

const SAMPLE_EVENTS: SocialProofItem[] = [
  {
    name: 'Nguyễn Hải Đăng',
    location: 'Hà Nội',
    ticketType: 'Vé Early Bird',
    timeAgo: '2 phút trước',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
  },
  {
    name: 'Hoàng Thu Trang',
    location: 'TP. Hồ Chí Minh',
    ticketType: 'Vé VIP Pass',
    timeAgo: '5 phút trước',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
  },
  {
    name: 'Lê Minh Tuấn',
    location: 'Đà Nẵng',
    ticketType: 'Vé Standard',
    timeAgo: '11 phút trước',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
  },
  {
    name: 'Vũ Thùy Linh',
    location: 'Cần Thơ',
    ticketType: 'Vé Nhóm 3 người',
    timeAgo: '18 phút trước',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
  },
];

export const SocialProofTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show after initial 4 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Loop interval: show for 6s, hide for 14s
    const loopInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % SAMPLE_EVENTS.length);
        setIsVisible(true);
      }, 10000);
    }, 18000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(loopInterval);
    };
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  const item = SAMPLE_EVENTS[currentIndex];

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl flex items-center gap-3">
        <div className="relative shrink-0">
          <img
            src={item.avatar}
            alt={item.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/50"
          />
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5">
            <CheckCircle2 className="w-3 h-3" />
          </div>
        </div>

        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {item.name}
            </span>
            <span className="text-[10px] text-slate-400">({item.location})</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 truncate">
            Vừa đăng ký <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">{item.ticketType}</strong>
          </p>
          <span className="text-[10px] text-slate-400 block">{item.timeAgo}</span>
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
