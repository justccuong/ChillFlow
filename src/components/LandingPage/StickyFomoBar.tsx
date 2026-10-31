import React, { useState, useEffect } from 'react';
import { Flame, ArrowRight, X, Clock } from 'lucide-react';
import { CountdownTimer } from '../CountdownTimer';

interface StickyFomoBarProps {
  targetDate: string;
  onCtaClick: () => void;
  earlyBirdBadge?: string;
  ticketsLeft?: number;
  triggerScrollY?: number;
}

export const StickyFomoBar: React.FC<StickyFomoBarProps> = ({
  targetDate,
  onCtaClick,
  earlyBirdBadge = 'Ưu đãi đăng ký sớm',
  ticketsLeft = 14,
  triggerScrollY = 450,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > triggerScrollY) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll in case user reloaded midway
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerScrollY]);

  if (!isVisible || !isScrolled) return null;

  return (
    <div className="fixed top-16 inset-x-0 z-40 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white border-b border-cyan-500/30 px-3 py-2 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-300">
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
              Chỉ còn <strong className="text-white underline decoration-cyan-400 decoration-2">{ticketsLeft} vé</strong> giá ưu đãi!
            </span>
          </div>
        </div>

        {/* Center Countdown Mini */}
        <div className="hidden lg:flex items-center gap-2 bg-black/60 px-3 py-1 rounded-full border border-white/10 shrink-0">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] text-slate-300">Giá tăng sau:</span>
          <div className="scale-75 origin-left">
            <CountdownTimer targetDate={targetDate} size="compact" align="left" label="" />
          </div>
        </div>

        {/* Right CTA Button & Close */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onCtaClick}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
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

export default StickyFomoBar;
