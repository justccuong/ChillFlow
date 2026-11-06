import React, { useState, useEffect } from 'react';
import type { EventInput, GeneratedContent, ThemeConfig } from '../../../types';
import { CountdownTimer } from '../../CountdownTimer';
import { formatEventDate } from '../../../utils/date';
import { InlineEditable } from '../InlineEditable';
import { Calendar, MapPin, ArrowRight, Palette, Sparkles, Plus, X } from 'lucide-react';
import { NumberTicker } from '../../magicui';

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

const DEFAULT_TAGS = [
  'Design Systems',
  'Micro-Interactions',
  'Spline 3D',
  'Spatial UI',
  'Typography Matrix',
];

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
  const [tags, setTags] = useState<string[]>(
    content.creativeTags && content.creativeTags.length > 0
      ? content.creativeTags
      : theme.creativeTags || DEFAULT_TAGS
  );

  useEffect(() => {
    if (content.creativeTags && content.creativeTags.length > 0) {
      setTags(content.creativeTags);
    }
  }, [content.creativeTags]);

  const handleUpdateTag = (idx: number, newVal: string) => {
    const updated = tags.map((t, i) => (i === idx ? newVal : t));
    setTags(updated);
    onUpdateContentField?.('creativeTags', updated);
  };

  const handleAddTag = () => {
    const updated = [...tags, 'Creative Concept'];
    setTags(updated);
    onUpdateContentField?.('creativeTags', updated);
  };

  const handleDeleteTag = (idx: number) => {
    const updated = tags.filter((_, i) => i !== idx);
    setTags(updated);
    onUpdateContentField?.('creativeTags', updated);
  };

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 font-sans">
      {/* Avant-Garde Sticker Header - Centered */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="-rotate-2 inline-flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider shadow-lg">
          <Palette className="w-3.5 h-3.5" />
          <InlineEditable
            value={content.earlyBirdBadge || 'DESIGN & CREATIVE FEST 2026'}
            onSave={(val) => onUpdateContentField?.('earlyBirdBadge', val)}
            isEditMode={isEditMode}
            as="span"
            category={input.category}
          />
        </span>
        <span className="rotate-1 inline-flex items-center gap-1 bg-purple-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider shadow-md">
          <Sparkles className="w-3 h-3 text-amber-300" />
          AWWWARDS STANDARD
        </span>
      </div>

      {/* Bold, Centered Headline & Subheadline */}
      <div className="space-y-5 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight font-heading leading-[1.12] text-slate-900 dark:text-white drop-shadow-sm text-center">
          <InlineEditable
            value={headlineToDisplay}
            onSave={(val) => (onSaveHeadline ? onSaveHeadline(val) : onUpdateContentField?.('headline', val))}
            isEditMode={isEditMode}
            as="h1"
            category={input.category}
            className="text-center"
          />
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-sans leading-relaxed max-w-3xl mx-auto text-center">
          <InlineEditable
            value={content.subHeadline}
            onSave={(val) => onUpdateContentField?.('subHeadline', val)}
            isEditMode={isEditMode}
            as="p"
            multiline
            category={input.category}
            className="text-center"
          />
        </p>

        {/* Editable Discipline Tags - Centered */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-pink-500/10 dark:bg-pink-500/20 border border-pink-500/30 text-pink-600 dark:text-pink-300 shadow-sm"
            >
              <span className="opacity-60 select-none">#</span>
              <InlineEditable
                value={tag}
                onSave={(val) => handleUpdateTag(i, val)}
                isEditMode={isEditMode}
                as="span"
              />
              {isEditMode && (
                <button
                  type="button"
                  onClick={() => handleDeleteTag(i)}
                  className="ml-1 p-0.5 rounded text-pink-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Xóa tag này"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </span>
          ))}

          {isEditMode && (
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-600 dark:text-purple-300 flex items-center gap-1 transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm tag</span>
            </button>
          )}
        </div>
      </div>

      {/* Date & Location Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700 dark:text-slate-300 pt-2">
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl shadow-sm">
          <Calendar className="w-4 h-4 text-pink-500" />
          <span className="font-semibold">{formatEventDate(input.eventDate)}</span>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl shadow-sm">
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

      {/* Primary CTA Button (without the 1-on-1 tag) */}
      <div className="flex flex-col items-center justify-center gap-3 pt-1">
        <button
          type="button"
          onClick={onScrollToRegister}
          className={`px-10 py-4 rounded-xl text-base font-bold shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5 group uppercase tracking-wide ${theme.btnPrimary}`}
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

        {/* Live Attendance Counter */}
        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Số lượng giới hạn: {input.maxCapacity || 40} chỗ</span>
          <span>•</span>
          <span>
            {registeredCount > 0 ? (
              <>
                <NumberTicker value={registeredCount} /> đã giữ chỗ thành công
              </>
            ) : (
              'Đang mở cổng đăng ký sớm'
            )}
          </span>
        </div>
      </div>

      {/* Avant-Garde Countdown Timer Centered */}
      <div className="pt-2 flex justify-center">
        <CountdownTimer targetDate={input.eventDate} size="hero" align="center" />
      </div>
    </div>
  );
};

export default CreativeHero;
