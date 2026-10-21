import React from 'react';
import type { EventInput, GeneratedContent, ThemeConfig } from '../../../types';
import { CountdownTimer } from '../../CountdownTimer';
import { Calendar, MapPin, ArrowRight, Flame, ShieldCheck, Ticket, Users, CheckCircle2, TrendingUp, Sparkles, BarChart2 } from 'lucide-react';

interface HeroProps {
  input: EventInput;
  content: GeneratedContent;
  theme: ThemeConfig;
  headlineToDisplay: string;
  onScrollToRegister: () => void;
  registeredCount: number;
}

export const MasterclassHero: React.FC<HeroProps> = ({
  input,
  content,
  theme,
  headlineToDisplay,
  onScrollToRegister,
  registeredCount,
}) => {
  const maxSeats = input.maxCapacity || 100;
  const takenSeats = Math.min(maxSeats, Math.max(18, registeredCount + 68));
  const percentTaken = Math.round((takenSeats / maxSeats) * 100);
  const remaining = maxSeats - takenSeats;

  const heroPhoto =
    input.heroImageUrl ||
    theme.heroImage ||
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 px-4 sm:px-6">
      {/* FOMO Urgent Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-xs font-bold text-amber-700 dark:text-amber-400 backdrop-blur-sm animate-shimmer">
        <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
        <span>{content.earlyBirdBadge || 'ƯU ĐÃI EARLY BIRD - CHỈ CÒN SỐ LƯỢNG CÓ HẠN'}</span>
      </div>

      {/* Full-Bleed Grand Headline (Zero Column Squishing!) */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-[1.16] text-slate-900 dark:text-white max-w-4xl mx-auto drop-shadow-sm">
        {headlineToDisplay}
      </h1>

      {/* Sub-headline */}
      <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-sans leading-relaxed max-w-3xl mx-auto">
        {content.subHeadline}
      </p>

      {/* Event Key Badges: Date & Location */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm">
          <Calendar className="w-4 h-4 text-amber-500" />
          <span className="font-semibold">{input.eventDate}</span>
        </div>
        <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm">
          <MapPin className="w-4 h-4 text-amber-500" />
          <span className="font-semibold">{input.location}</span>
        </div>
      </div>

      {/* Centered Floating Countdown */}
      <div className="pt-2 pb-1">
        <CountdownTimer targetDate={input.eventDate} />
      </div>

      {/* CTA Button & Seat Scarcity Bar */}
      <div className="space-y-4 max-w-md mx-auto">
        <button
          type="button"
          onClick={onScrollToRegister}
          className={`w-full px-8 py-4 rounded-xl text-base shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5 group ${theme.btnPrimary}`}
        >
          <span>{content.ctaButtonText || 'Nhận Vé Masterclass Ngay'}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Live Seat Scarcity Meter */}
        <div className="space-y-1.5 bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-amber-500/20 shadow-sm text-xs">
          <div className="flex items-center justify-between font-semibold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-500" />
              Đã giữ chỗ
            </span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">{percentTaken}% ({takenSeats}/{maxSeats})</span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-1000 rounded-full"
              style={{ width: `${percentTaken}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Panoramic Horizon Stage Ribbon (3D Tilt) */}
      <div className="pt-6 max-w-4xl mx-auto [perspective:1200px]">
        <div className="relative mx-auto rounded-2xl p-1.5 border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-transparent shadow-2xl transition-all duration-700 hover:[transform:rotateX(0deg)] [transform:rotateX(8deg)]">
          <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-[16/8] sm:aspect-[21/9]">
            <img
              src={heroPhoto}
              alt="Marketing Horizon"
              className="w-full h-full object-cover filter brightness-90 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                <span className="font-bold tracking-wide uppercase text-[11px] text-amber-300">GROWTH STAGE 2026</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5 text-amber-400" /> +340% ROI Average</span>
                <span className="flex items-center gap-1"><BarChart2 className="w-3.5 h-3.5 text-orange-400" /> Data-Driven Playbooks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
