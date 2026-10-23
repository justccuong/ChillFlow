import React from 'react';
import type { EventInput, GeneratedContent, ThemeConfig } from '../../../types';
import { CountdownTimer } from '../../CountdownTimer';
import { formatEventDate } from '../../../utils/date';
import { InlineEditable } from '../InlineEditable';
import { Calendar, MapPin, ArrowRight, Briefcase, DollarSign, Shield, Award, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  input: EventInput;
  content: GeneratedContent;
  theme: ThemeConfig;
  headlineToDisplay: string;
  onScrollToRegister: () => void;
  registeredCount: number;
  isEditMode?: boolean;
  onUpdateContentField?: (field: keyof GeneratedContent, val: any) => void;
  onUpdateInputField?: (field: keyof EventInput, val: any) => void;
  onSaveHeadline?: (val: string) => void;
}

export const ExecutiveHero: React.FC<HeroProps> = ({
  input,
  content,
  theme,
  headlineToDisplay,
  onScrollToRegister,
  registeredCount,
  isEditMode = false,
  onUpdateContentField,
  onUpdateInputField,
  onSaveHeadline,
}) => {
  const metrics = theme.dealMetrics || {
    capitalPool: '$5,000,000+',
    startupsCount: 16,
    investorCount: 45,
  };

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-left space-y-7 font-sans">
      {/* Top Section: Full-Width Grand Executive Typography */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-300">
          <Briefcase className="w-3.5 h-3.5 text-amber-500" />
          <span>SERIES A & SEED DEMO DAY // PRIVATE VENTURE SUMMIT</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white leading-[1.16]">
          <InlineEditable
            value={headlineToDisplay}
            onSave={(val) => (onSaveHeadline ? onSaveHeadline(val) : onUpdateContentField?.('headline', val))}
            isEditMode={isEditMode}
            as="span"
            category={input.category}
          />
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-sans leading-relaxed max-w-3xl">
          <InlineEditable
            value={content.subHeadline}
            onSave={(val) => onUpdateContentField?.('subHeadline', val)}
            isEditMode={isEditMode}
            as="span"
            multiline
            category={input.category}
          />
        </p>

        {/* Date & Location & NDA Pills */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700 dark:text-slate-300 pt-1">
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-sm">
            <Calendar className="w-4 h-4 text-amber-500" />
            <span className="font-semibold">{formatEventDate(input.eventDate)}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-sm">
            <MapPin className="w-4 h-4 text-amber-500" />
            <InlineEditable
              value={input.location}
              onSave={(val) => onUpdateInputField?.('location', val)}
              isEditMode={isEditMode}
              as="span"
              className="font-semibold"
              category={input.category}
            />
          </div>
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-sm">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>Tiêu chuẩn bảo mật NDA quốc tế</span>
          </div>
        </div>

        {/* Prominent Executive Countdown */}
        <div className="pt-2">
          <CountdownTimer targetDate={input.eventDate} size="hero" align="left" />
        </div>
      </div>

      {/* Bottom Section: Asymmetric 3-Column Bento Poster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-1">
        {/* Bento 1: Deal Metrics (Col-span 4) */}
        <div className="md:col-span-4 rounded-2xl p-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-400/20 text-white space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-bold tracking-wider text-amber-400">
            <span>QUỸ ĐẦU TƯ & DEALFLOW</span>
            <span className="px-2 py-0.5 rounded bg-amber-400/20 text-[10px]">INVITE ONLY</span>
          </div>

          <div className="space-y-3">
            <div className="bg-slate-850 p-3.5 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" /> Vốn Cam Kết Đầu Tư
              </div>
              <div className="text-2xl font-bold font-heading text-amber-300">{metrics.capitalPool}</div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-slate-850 p-3 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">Startup Pitching</div>
                <div className="text-lg font-bold text-slate-100">{metrics.startupsCount} Doanh nghiệp</div>
              </div>
              <div className="bg-slate-850 p-3 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">Quỹ VC Tham Dự</div>
                <div className="text-lg font-bold text-slate-100">{metrics.investorCount}+ Quỹ VC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento 2: Primary VIP Registration & Inclusions (Col-span 5) */}
        <div className="md:col-span-5 rounded-2xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                QUYỀN LỢI THÀNH VIÊN VIP
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                CÒN 14 SUẤT
              </span>
            </div>

            <div className="space-y-2.5 pt-1 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Nhận trọn bộ 16 Pitch Decks & Báo cáo Thẩm định</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Tham dự Private Networking Dinner cùng các General Partners</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Q&A 1-1 riêng biệt cùng Founder & Đồng sáng lập</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onScrollToRegister}
            className={`w-full mt-3 px-6 py-3.5 rounded-xl text-sm font-semibold shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 ${theme.btnPrimary}`}
          >
            <span>{content.ctaButtonText || 'Đăng Ký Tham Dự Summit'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bento 3: Accreditation Seal & Investor Tier (Col-span 3) */}
        <div className="md:col-span-3 rounded-2xl p-5 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/30 text-white space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-2 text-center pt-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shadow-lg">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <div className="font-heading font-bold text-sm text-amber-200">ACCREDITED INVESTOR</div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Dành riêng cho các nhà đầu tư thiên thần, quỹ mạo hiểm và các nhà sáng lập.
            </p>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-center text-xs">
            <span className="text-slate-400">Xác nhận giữ chỗ: </span>
            <strong className="text-amber-300">{registeredCount > 0 ? registeredCount : 42} nhà đầu tư</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
