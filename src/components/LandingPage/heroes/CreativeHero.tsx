import React from 'react';
import type { EventInput, GeneratedContent, ThemeConfig } from '../../../types';
import { CountdownTimer } from '../../CountdownTimer';
import { formatEventDate } from '../../../utils/date';
import { InlineEditable } from '../InlineEditable';
import { Calendar, MapPin, ArrowRight, Palette, Sparkles, PenTool, Zap } from 'lucide-react';

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

export const CreativeHero: React.FC<HeroProps> = ({
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
  const tags = theme.creativeTags || ['Design Systems', 'Micro-Interactions', 'Spline 3D', 'Spatial UI'];

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-left space-y-7 font-sans">
      {/* Avant-Garde Sticker Header */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="-rotate-2 inline-flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider shadow-lg">
          <Palette className="w-3.5 h-3.5" />
          DESIGN & CREATIVE FEST 2026
        </span>
        <span className="rotate-1 inline-flex items-center gap-1 bg-purple-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider shadow-md">
          <Sparkles className="w-3 h-3 text-amber-300" />
          AWWWARDS STANDARD
        </span>
      </div>

      {/* Bold, Un-cramped Neo-Brutalist Headline */}
      <div className="space-y-4 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-heading leading-[1.22] text-slate-900 dark:text-white drop-shadow-sm">
          <InlineEditable
            value={headlineToDisplay}
            onSave={(val) => (onSaveHeadline ? onSaveHeadline(val) : onUpdateContentField?.('headline', val))}
            isEditMode={isEditMode}
            as="span"
            category={input.category}
            useKineticText
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

        {/* Creative Discipline Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/10 dark:bg-pink-500/20 border border-pink-500/30 text-pink-600 dark:text-pink-300 shadow-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* 2-Column Creative Flow: Details & Visual Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-1">
        {/* Left Column: Dates, CTA & Compact Countdown (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-sm">
              <Calendar className="w-4 h-4 text-pink-500" />
              <span className="font-semibold">{formatEventDate(input.eventDate)}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-sm">
              <MapPin className="w-4 h-4 text-purple-500" />
              <InlineEditable
                value={input.location}
                onSave={(val) => onUpdateInputField?.('location', val)}
                isEditMode={isEditMode}
                as="span"
                className="font-semibold"
                category={input.category}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <button
              type="button"
              onClick={onScrollToRegister}
              className={`px-8 py-3.5 rounded-xl text-base font-bold shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5 group uppercase tracking-wide ${theme.btnPrimary}`}
            >
              <InlineEditable
                value={content.ctaButtonText || 'Đăng ký tham gia studio'}
                onSave={(val) => onUpdateContentField?.('ctaButtonText', val)}
                isEditMode={isEditMode}
                as="span"
                category={input.category}
              />
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 px-1">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500 dark:text-amber-400 dark:fill-amber-400" />
              1-on-1 Portfolio Critique cùng Design Director
            </span>
          </div>

          {/* Prominent Avant-Garde Countdown */}
          <div className="pt-2">
            <CountdownTimer targetDate={input.eventDate} size="hero" align="left" />
          </div>
        </div>

        {/* Right Column: Creative Mood Canvas with Floating Overlays (lg:col-span-5) */}
        <div className="lg:col-span-5 relative">
          {/* Ambient Glow */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-70 pointer-events-none"></div>

          <div className="relative rounded-3xl p-5 bg-white dark:bg-gradient-to-br dark:from-purple-950/40 dark:via-slate-900 dark:to-pink-950/40 border border-purple-200 dark:border-purple-500/30 shadow-xl dark:shadow-2xl space-y-4 overflow-hidden transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-purple-100 dark:border-purple-500/20">
              <span className="flex items-center gap-1.5 font-mono text-pink-600 dark:text-pink-300">
                <PenTool className="w-3.5 h-3.5" /> canvas_showcase.fig
              </span>
              <span className="px-2 py-0.5 rounded bg-pink-500/10 dark:bg-pink-500/20 text-pink-600 dark:text-pink-300 text-[10px] font-bold">LIVE PREVIEW</span>
            </div>

            {/* Overlapping Visual Stickers */}
            <div className="relative h-44 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden p-4">
              <div className="text-center space-y-2 z-10">
                <div className="font-heading font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-400 uppercase tracking-tighter">
                  NO BORING WEBSITES
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Design Systems • Motion • 3D Canvas</p>
              </div>

              {/* Angle Badge 1 */}
              <div className="absolute top-2 left-2 -rotate-6 px-2.5 py-0.5 rounded bg-pink-500 text-white text-[10px] font-black uppercase shadow-md">
                PARIS // TOKYO
              </div>

              {/* Angle Badge 2 */}
              <div className="absolute bottom-2 right-2 rotate-3 px-2.5 py-0.5 rounded bg-emerald-500 text-white text-[10px] font-black uppercase shadow-md">
                100% PRACTICAL
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 pt-1">
              <span className="font-semibold text-pink-600 dark:text-pink-300">Số lượng giới hạn: 40 chỗ</span>
              <span className="text-slate-500 dark:text-slate-400">{registeredCount > 0 ? `${registeredCount} đã giữ chỗ` : 'Đang mở đăng ký'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
