import React, { useState } from 'react';
import { Flame, ArrowRight, X, Clock } from 'lucide-react';
import { CountdownTimer } from '../CountdownTimer';

interface StickyFomoBarProps {
  targetDate: string;
  onCtaClick: () => void;
  earlyBirdBadge?: string;
  ticketsLeft?: number;
}

export const StickyFomoBar: React.FC<StickyFomoBarProps> = ({
  targetDate,
  onCtaClick,
  earlyBirdBadge = 'Ưu đãi đăng ký sớm',
  ticketsLeft = 14,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="sticky top-0 z-40 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white border-b border-indigo-500/30 px-3 py-2 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
        
        {/* Left message & Ticket urgency */}
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          </div>
          <div className="flex items-center gap-2 truncate">
            <span className="font-bold text-amber-300 hidden sm:inline">
              {earlyBirdBadge}:
            </span>
            <span className="font-medium text-slate-200">
              Chỉ còn <strong className="text-white underline decoration-amber-400 decoration-2">{ticketsLeft} vé</strong> giá ưu đãi!
            </span>
          </div>
        </div>

        {/* Center Countdown Mini */}
        <div className="hidden md:flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/10 shrink-0">
          <Clock className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-[11px] text-slate-300">Giá tăng sau:</span>
          <div className="scale-90 origin-left">
            <CountdownTimer targetDate={targetDate} size="compact" align="left" />
          </div>
        </div>

        {/* Right CTA Button & Close */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onCtaClick}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
          >
            <span>Giữ chỗ ngay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            title="Đóng thanh thông báo"
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
