import React from 'react';
import type { EventInput, GeneratedContent, ThemeConfig } from '../../../types';
import { CountdownTimer } from '../../CountdownTimer';
import { Calendar, MapPin, ArrowRight, Flame, ShieldCheck, Ticket, Users, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

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

  return (
    <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
      {/* Left Column: High-Conversion Copy */}
      <div className="lg:col-span-7 space-y-6">
        {/* Urgent FOMO Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-600 dark:text-amber-400">
          <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>{content.earlyBirdBadge || 'ƯU ĐÃI EARLY BIRD - CHỈ CÒN SỐ LƯỢNG CÓ HẠN'}</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight text-slate-900 dark:text-white">
          {headlineToDisplay}
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
          {content.subHeadline}
        </p>

        {/* Date & Location Pill */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-sm">
            <Calendar className="w-4 h-4 text-amber-500" />
            <span className="font-semibold">{input.eventDate}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-sm">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span className="font-semibold">{input.location}</span>
          </div>
        </div>

        {/* Compact Floating Countdown */}
        <div className="pt-2">
          <CountdownTimer targetDate={input.eventDate} />
        </div>

        {/* CTA & Guarantee */}
        <div className="pt-2 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={onScrollToRegister}
              className={`px-8 py-4 rounded-xl text-base shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group ${theme.btnPrimary}`}
            >
              <span>{content.ctaButtonText || 'Nhận Vé Masterclass Ngay'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Cam kết hoàn tiền 100% nếu không hài lòng</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Holographic VIP Event Pass Card & Scarcity Meter */}
      <div className="lg:col-span-5">
        <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/30 p-6 sm:p-7 shadow-2xl text-white space-y-6 overflow-hidden">
          {/* Top Pass Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Ticket className="w-5 h-5 text-slate-950 font-bold" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">OFFICIAL EVENT PASS</span>
                <h4 className="font-heading font-bold text-sm text-slate-100">{input.eventName}</h4>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold uppercase tracking-wider">
              VIP ACCESS
            </span>
          </div>

          {/* Speaker Brief */}
          <div className="flex items-center gap-3 bg-slate-850 p-3 rounded-xl border border-slate-800">
            <img
              src={input.speakerAvatarUrl || theme.speakerImage}
              alt={input.speakerName}
              className="w-12 h-12 rounded-xl object-cover border border-amber-500/40"
            />
            <div>
              <div className="text-xs font-bold text-slate-200">{input.speakerName}</div>
              <div className="text-[11px] text-slate-400">{input.speakerRole}</div>
            </div>
          </div>

          {/* Live Seat Scarcity Progress Meter */}
          <div className="space-y-2 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                Số chỗ đã được giữ
              </span>
              <span className="text-amber-400 font-bold">{percentTaken}% ({takenSeats}/{maxSeats})</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-1000 rounded-full"
                style={{ width: `${percentTaken}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Chỉ còn <strong className="text-amber-300">{remaining} vé</strong> trước khi chuyển sang giá vé chuẩn!
            </p>
          </div>

          {/* Key Pass Inclusions */}
          <div className="space-y-2 pt-1 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Full Access phiên thuyết trình & Hands-on Lab</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Trọn bộ 50+ Growth & Funnel Playbooks</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Tham gia nhóm kín trao đổi chuyên sâu cùng Mentor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
