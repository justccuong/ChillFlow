import React from 'react';
import type { EventInput, GeneratedContent, ThemeConfig } from '../../../types';
import { CountdownTimer } from '../../CountdownTimer';
import { InlineEditable } from '../InlineEditable';
import { formatEventDate } from '../../../utils/date';
import { Calendar, MapPin, ArrowRight, Users, Flame, Award, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  input: EventInput;
  content: GeneratedContent;
  theme: ThemeConfig;
  headlineToDisplay: string;
  onScrollToRegister: () => void;
  registeredCount?: number;
  isEditMode?: boolean;
  onUpdateContentField?: (field: keyof GeneratedContent, val: any) => void;
  onUpdateInputField?: (field: keyof EventInput, val: any) => void;
}

export const MasterclassHero: React.FC<HeroProps> = ({
  input,
  content,
  theme,
  headlineToDisplay,
  onScrollToRegister,
  registeredCount = 0,
  isEditMode = false,
  onUpdateContentField,
  onUpdateInputField,
}) => {
  const maxSeats = input.maxCapacity || 120;
  const takenSeats = Math.min(maxSeats, 72);
  const percentTaken = Math.round((takenSeats / maxSeats) * 100);
  const speakerPhoto = input.speakerAvatarUrl || theme.speakerImage || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80';

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 text-center space-y-6">
      {/* Category Pill with Shimmer effect */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-xs font-semibold backdrop-blur-sm shadow-sm animate-shimmer">
        <Flame className="w-4 h-4 text-amber-500" />
        <InlineEditable
          value={content.earlyBirdBadge || 'CHƯƠNG TRÌNH ĐÀO TẠO MASTERCLASS 2026'}
          onSave={(val) => onUpdateContentField?.('earlyBirdBadge', val)}
          isEditMode={isEditMode}
          as="span"
          className="text-amber-700 dark:text-amber-300 font-bold"
        />
      </div>

      {/* Majestic Panoramic Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading leading-[1.15] text-slate-900 dark:text-white max-w-4xl mx-auto drop-shadow-sm">
        <InlineEditable
          value={headlineToDisplay}
          onSave={(val) => onUpdateContentField?.('headline', val)}
          isEditMode={isEditMode}
          as="span"
        />
      </h1>

      {/* Sub-headline */}
      <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-sans leading-relaxed max-w-2xl mx-auto">
        <InlineEditable
          value={content.subHeadline}
          onSave={(val) => onUpdateContentField?.('subHeadline', val)}
          isEditMode={isEditMode}
          as="span"
          multiline
        />
      </p>

      {/* Event Key Badges: Date & Location */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm">
          <Calendar className="w-4 h-4 text-amber-500" />
          <span className="font-semibold">{formatEventDate(input.eventDate)}</span>
        </div>
        <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm">
          <MapPin className="w-4 h-4 text-amber-500" />
          <InlineEditable
            value={input.location}
            onSave={(val) => onUpdateInputField?.('location', val)}
            isEditMode={isEditMode}
            as="span"
            className="font-semibold"
          />
        </div>
      </div>

      {/* Centered Prominent Hero Countdown */}
      <div className="pt-2 max-w-2xl mx-auto">
        <CountdownTimer targetDate={input.eventDate} size="hero" />
      </div>

      {/* CTA Button & Live Scarcity Meter */}
      <div className="space-y-3 max-w-md mx-auto pt-2">
        <button
          type="button"
          onClick={onScrollToRegister}
          className={`w-full px-8 py-4 rounded-2xl text-base font-black shadow-[0_10px_30px_-5px_rgba(245,158,11,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5 group ${theme.btnPrimary}`}
        >
          <InlineEditable
            value={content.ctaButtonText || 'Nhận Vé Masterclass Ngay'}
            onSave={(val) => onUpdateContentField?.('ctaButtonText', val)}
            isEditMode={isEditMode}
            as="span"
          />
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Live Seat Scarcity Meter */}
        <div className="space-y-1.5 bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-amber-500/20 shadow-sm text-xs">
          <div className="flex items-center justify-between font-semibold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-500" />
              Đã có người giữ chỗ
            </span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">{percentTaken}% ({takenSeats}/{maxSeats} vé)</span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-1000 rounded-full"
              style={{ width: `${percentTaken}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-1">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Cam kết hoàn tiền 100% nếu không hài lòng</span>
        </div>
      </div>

      {/* Masterclass Key Instructor Ribbon */}
      <div className="pt-4 max-w-xl mx-auto">
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex items-center gap-4 text-left shadow-xl">
          <img
            src={speakerPhoto}
            alt={input.speakerName}
            className="w-14 h-14 rounded-xl object-cover border border-amber-500/30 shrink-0"
          />
          <div className="space-y-0.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Giảng Viên Trưởng
            </div>
            <div className="font-extrabold text-white text-sm sm:text-base">{input.speakerName}</div>
            <div className="text-xs text-slate-400 line-clamp-1">{input.speakerRole}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
