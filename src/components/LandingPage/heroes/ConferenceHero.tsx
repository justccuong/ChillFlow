import React from 'react';
import type { EventInput, GeneratedContent, ThemeConfig } from '../../../types';
import { CountdownTimer } from '../../CountdownTimer';
import { Calendar, MapPin, ArrowRight, Flame, Camera, Sparkles, Star, ShieldCheck, Users } from 'lucide-react';

interface HeroProps {
  input: EventInput;
  content: GeneratedContent;
  theme: ThemeConfig;
  headlineToDisplay: string;
  onScrollToRegister: () => void;
  registeredCount: number;
  onOpenHeroImagePicker: () => void;
  onOpenSpeakerImagePicker?: () => void;
}

export const ConferenceHero: React.FC<HeroProps> = ({
  input,
  content,
  theme,
  headlineToDisplay,
  onScrollToRegister,
  registeredCount,
  onOpenSpeakerImagePicker,
}) => {
  const formattedDate = () => {
    try {
      const d = new Date(input.eventDate);
      if (isNaN(d.getTime())) return input.eventDate;
      return d.toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return input.eventDate;
    }
  };

  const speakerPhoto =
    input.speakerAvatarUrl ||
    theme.speakerImage ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';

  const attendeeAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80',
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Un-cramped Editorial Headline & Copy (Matches User Sketch 'text' with 66% width) */}
        <div className="lg:col-span-8 text-left space-y-6">
          {/* Early bird pill with Shimmer effect */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 text-xs font-semibold backdrop-blur-sm shadow-sm animate-shimmer">
            <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
            <span className="text-indigo-700 dark:text-indigo-300 font-bold">
              {content.earlyBirdBadge || 'Ưu đãi đăng ký sớm'}
            </span>
          </div>

          {/* Majestic, Un-cramped Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-extrabold tracking-tight font-heading leading-[1.18] text-slate-900 dark:text-white max-w-4xl drop-shadow-sm">
            {headlineToDisplay}
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-sans leading-relaxed max-w-3xl">
            {content.subHeadline}
          </p>

          {/* Event Key Badges: Date & Location */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-sm">
              <Calendar className={`w-4 h-4 ${theme.accentColor}`} />
              <span className="font-semibold">{formattedDate()}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-sm">
              <MapPin className={`w-4 h-4 ${theme.accentColor}`} />
              <span className="font-semibold">{input.location}</span>
            </div>
          </div>

          {/* Floating Borderless Countdown */}
          <div className="pt-2">
            <CountdownTimer targetDate={input.eventDate} />
          </div>

          {/* CTA Button & Social Proof */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={onScrollToRegister}
                className={`px-8 py-4 rounded-xl text-base shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5 group ${theme.btnPrimary}`}
              >
                <span>{content.ctaButtonText || 'Giữ Chỗ Tham Gia Ngay'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 px-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Vé chính hãng & Hỗ trợ xuất VAT</span>
              </div>
            </div>

            {/* Live Social Proof Badge */}
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <div className="flex -space-x-2">
                {attendeeAvatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Attendee"
                    className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                  />
                ))}
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {registeredCount > 0 ? `${registeredCount} người đã đăng ký` : 'Hơn 120 người đã giữ chỗ'}
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Chỉ còn 38 vé Early Bird</span>
            </div>
          </div>
        </div>

        {/* Right Column: Organic Cutout Visual (Matches User Sketch 'ảnh' with 33% width) */}
        <div className="lg:col-span-4 relative flex justify-center items-center">
          {/* Atmospheric Glow */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/25 via-cyan-500/20 to-purple-500/20 rounded-[3rem] blur-3xl opacity-75 pointer-events-none"></div>

          {/* Organic Portrait Cutout Canvas */}
          <div className="relative w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/30 dark:border-white/10 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 group">
            {/* Speaker Image */}
            <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden">
              <img
                src={speakerPhoto}
                alt={input.speakerName}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter contrast-105"
              />

              {/* Smooth Bottom Gradient Fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              {/* Floating Change Photo Pill */}
              {onOpenSpeakerImagePicker && (
                <button
                  type="button"
                  onClick={onOpenSpeakerImagePicker}
                  className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-white border border-white/20 text-xs font-semibold backdrop-blur-md shadow-lg flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105"
                  title="Thay đổi ảnh diễn giả"
                >
                  <Camera className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Đổi ảnh</span>
                </button>
              )}

              {/* Floating Speaker Badge Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/10 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-white/10 text-white space-y-1 shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-cyan-300" /> Keynote Speaker
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-amber-300 font-semibold">
                    <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                    <span>4.98 / 5.0</span>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight">{input.speakerName}</h4>
                <p className="text-xs text-slate-300 line-clamp-1">{input.speakerRole}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
