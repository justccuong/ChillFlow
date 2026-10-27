import React, { useState, useEffect } from 'react';
import type { ThemeConfig } from '../../types';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { NumberTicker } from '../magicui';

interface StickyBottomCtaProps {
  eventName: string;
  theme: ThemeConfig;
  onScrollToRegister: () => void;
  registeredCount: number;
  maxSeats: number;
}

export const StickyBottomCta: React.FC<StickyBottomCtaProps> = ({
  eventName,
  theme,
  onScrollToRegister,
  registeredCount,
  maxSeats,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down more than 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const remaining = Math.max(0, maxSeats - registeredCount);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 py-3 px-4 shadow-2xl transition-all animate-fade-in">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-bold text-white max-w-[280px] truncate">
              {eventName}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
            <Flame className="w-3.5 h-3.5" />
            <span>Chỉ còn <NumberTicker value={remaining} /> vé Early Bird!</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onScrollToRegister}
          className={`px-5 py-2 rounded-xl text-xs font-black shadow-md cursor-pointer transition-transform hover:scale-105 flex items-center gap-1.5 ${theme.btnPrimary}`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Giữ chỗ ngay</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
