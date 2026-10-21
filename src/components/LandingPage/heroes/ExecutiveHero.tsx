import React from 'react';
import type { EventInput, GeneratedContent, ThemeConfig } from '../../../types';
import { CountdownTimer } from '../../CountdownTimer';
import { Calendar, MapPin, ArrowRight, Briefcase, DollarSign, Building2, Shield, Award } from 'lucide-react';

interface HeroProps {
  input: EventInput;
  content: GeneratedContent;
  theme: ThemeConfig;
  headlineToDisplay: string;
  onScrollToRegister: () => void;
  registeredCount: number;
}

export const ExecutiveHero: React.FC<HeroProps> = ({
  input,
  content,
  theme,
  headlineToDisplay,
  onScrollToRegister,
}) => {
  const metrics = theme.dealMetrics || {
    capitalPool: '$5,000,000+',
    startupsCount: 16,
    investorCount: 45,
  };

  return (
    <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
      {/* Left Column: Refined Executive Copy */}
      <div className="lg:col-span-7 space-y-6">
        {/* Elite Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-bold uppercase tracking-widest text-amber-500 dark:text-amber-300">
          <Briefcase className="w-3.5 h-3.5 text-amber-400" />
          <span>SERIES A & SEED DEMO DAY // PRIVATE SUMMIT</span>
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
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">{input.eventDate}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-sm">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">{input.location}</span>
          </div>
        </div>

        {/* Floating Countdown */}
        <div className="pt-2">
          <CountdownTimer targetDate={input.eventDate} />
        </div>

        {/* CTA */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            type="button"
            onClick={onScrollToRegister}
            className={`px-8 py-4 rounded-xl text-base shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group ${theme.btnPrimary}`}
          >
            <span>{content.ctaButtonText || 'Nhận Hồ Sơ Thẩm Định & Vé Mời'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-amber-400" />
            Bảo mật thông tin dự án theo chuẩn NDA
          </span>
        </div>
      </div>

      {/* Right Column: Term Sheet & Deal Summary Card */}
      <div className="lg:col-span-5">
        <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-400/30 p-6 sm:p-7 shadow-2xl text-white space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-300">EXECUTIVE DEAL SHEET</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 text-[10px] font-bold border border-amber-400/30">
              INVITE ONLY
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" /> Quỹ Đầu Tư Dự Kiến
              </span>
              <div className="text-2xl font-bold font-heading text-amber-300">{metrics.capitalPool}</div>
            </div>
            <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" /> Startup Chọn Lọc
              </span>
              <div className="text-2xl font-bold font-heading text-white">{metrics.startupsCount} Teams</div>
            </div>
          </div>

          <div className="space-y-3 bg-slate-850 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Hội Đồng Quỹ Tham Gia:</span>
              <span className="font-bold text-white">{metrics.investorCount}+ VCs & Thiên Thần</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Hình Thức Pitching:</span>
              <span className="font-bold text-white">5 Phút Pitch + 5 Phút Q&A Thẩm Định</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Quyền Lợi VIP:</span>
              <span className="font-bold text-amber-300">Deal Room 1-1 & Tiệc Tối Networking</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
            <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Được bảo trợ bởi mạng lưới 10+ VCs hàng đầu khu vực</span>
          </div>
        </div>
      </div>
    </div>
  );
};
