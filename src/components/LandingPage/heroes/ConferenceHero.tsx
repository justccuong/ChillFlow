import React from 'react';
import type { EventInput, GeneratedContent, ThemeConfig } from '../../../types';
import { CountdownTimer } from '../../CountdownTimer';
import { Calendar, MapPin, ArrowRight, Flame, Camera, Users, Shield, Award } from 'lucide-react';

interface HeroProps {
  input: EventInput;
  content: GeneratedContent;
  theme: ThemeConfig;
  headlineToDisplay: string;
  onScrollToRegister: () => void;
  registeredCount: number;
  onOpenHeroImagePicker: () => void;
}

export const ConferenceHero: React.FC<HeroProps> = ({
  input,
  content,
  theme,
  headlineToDisplay,
  onScrollToRegister,
  registeredCount,
  onOpenHeroImagePicker,
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

  const heroPhoto = input.heroImageUrl || theme.heroImage;

  const attendeeAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80',
  ];

  return (
    <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
      {/* Floating Change Background Button */}
      <div className="absolute top-0 right-0 z-20">
        <button
          type="button"
          onClick={onOpenHeroImagePicker}
          className="px-3.5 py-1.5 rounded-xl bg-white/90 hover:bg-slate-100 dark:bg-slate-900/90 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/80 text-xs font-semibold backdrop-blur-md shadow-xl flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105"
        >
          <Camera className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
          <span>Đổi ảnh nền</span>
        </button>
      </div>

      {/* Early bird pill with Shimmer effect */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 text-xs font-semibold backdrop-blur-sm shadow-lg animate-shimmer">
        <Flame className="w-4 h-4 text-amber-500 dark:text-amber-400 animate-bounce" />
        <span className="text-amber-700 dark:text-amber-300 font-bold">{content.earlyBirdBadge || 'Ưu đãi đăng ký sớm'}</span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-heading leading-tight text-slate-900 dark:text-white max-w-4xl mx-auto drop-shadow-sm dark:drop-shadow-md">
        {headlineToDisplay}
      </h1>

      {/* Sub-headline */}
      <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-sans leading-relaxed max-w-2xl mx-auto">
        {content.subHeadline}
      </p>

      {/* Event Key Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm">
          <Calendar className={`w-3.5 h-3.5 ${theme.accentColor}`} />
          <span className="font-medium">{formattedDate()}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm">
          <MapPin className={`w-3.5 h-3.5 ${theme.accentColor}`} />
          <span className="font-medium">{input.location}</span>
        </div>
      </div>

      {/* Giant Centered Floating Countdown */}
      <div className="pt-3 pb-2">
        <CountdownTimer targetDate={input.eventDate} />
      </div>

      {/* CTA Button & Social Proof */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={onScrollToRegister}
            className={`w-full sm:w-auto px-8 py-4 rounded-xl text-base shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group ${theme.btnPrimary}`}
          >
            <span>{content.ctaButtonText || 'Giữ Chỗ Tham Gia Ngay'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Live Social Proof Badge */}
        <div className="flex items-center justify-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex -space-x-2">
            {attendeeAvatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Attendee"
                className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 object-cover"
              />
            ))}
          </div>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {registeredCount > 0 ? `${registeredCount} người đã giữ chỗ` : 'Hơn 120 người đã giữ chỗ'}
          </span>
          <span className="inline-block w-1 h-1 rounded-full bg-slate-400"></span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">Chỉ còn 38 vé Early Bird</span>
        </div>
      </div>

      {/* 3D Perspective Tilt Showcase */}
      <div className="pt-6 sm:pt-10 max-w-4xl mx-auto [perspective:1200px]">
        <div className="relative mx-auto rounded-2xl p-1.5 border-gradient-glow shadow-2xl transition-all duration-700 hover:[transform:rotateX(0deg)] [transform:rotateX(12deg)]">
          <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-700/60 aspect-[16/8] sm:aspect-[21/9]">
            <img
              src={heroPhoto}
              alt="Event Stage"
              className="w-full h-full object-cover filter brightness-90 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="font-bold text-white tracking-wide uppercase text-[11px]">{input.eventName}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-cyan-400" /> {input.maxCapacity || 120} Chỗ ngồi</span>
                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-indigo-400" /> Q&A 1-1 Trực tiếp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
