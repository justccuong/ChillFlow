import React from 'react';
import type { EventInput, GeneratedContent, ThemeConfig } from '../../../types';
import { CountdownTimer } from '../../CountdownTimer';
import { Calendar, MapPin, ArrowRight, Palette, Sparkles, Layers, PenTool, Eye } from 'lucide-react';

interface HeroProps {
  input: EventInput;
  content: GeneratedContent;
  theme: ThemeConfig;
  headlineToDisplay: string;
  onScrollToRegister: () => void;
  registeredCount: number;
}

export const CreativeHero: React.FC<HeroProps> = ({
  input,
  content,
  theme,
  headlineToDisplay,
  onScrollToRegister,
}) => {
  const tags = theme.creativeTags || ['Design Systems', 'Micro-Interactions', 'Spline 3D', 'Spatial UI'];

  return (
    <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
      {/* Left Column: Editorial Magazine Copy */}
      <div className="lg:col-span-7 space-y-6">
        {/* Floating Creative Stamp */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-xs font-bold text-purple-400">
          <Palette className="w-4 h-4 text-pink-400" />
          <span className="uppercase tracking-widest font-heading">STUDIO WORKSHOP // MASTERING DIGITAL CRAFT</span>
        </div>

        {/* Headline with Gradient Text Accent */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-heading leading-tight text-slate-900 dark:text-white">
          {headlineToDisplay}
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
          {content.subHeadline}
        </p>

        {/* Creative Discipline Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/70 dark:bg-slate-900/70 border border-purple-500/20 text-purple-600 dark:text-purple-300 shadow-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Date & Location Pill */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-sm">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span className="font-semibold">{input.eventDate}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-sm">
            <MapPin className="w-4 h-4 text-pink-400" />
            <span className="font-semibold">{input.location}</span>
          </div>
        </div>

        {/* Floating Countdown */}
        <div className="pt-2">
          <CountdownTimer targetDate={input.eventDate} />
        </div>

        {/* CTA Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            type="button"
            onClick={onScrollToRegister}
            className={`px-8 py-4 rounded-xl text-base shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group ${theme.btnPrimary}`}
          >
            <span>{content.ctaButtonText || 'Đăng Ký Khóa Studio Thực Chiến'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            Bao gồm 1-1 Portfolio Critique cùng Design Lead
          </span>
        </div>
      </div>

      {/* Right Column: Interactive Design Canvas & Showcase */}
      <div className="lg:col-span-5 relative">
        <div className="rounded-3xl p-5 bg-gradient-to-br from-purple-900/30 via-slate-900 to-pink-950/40 border border-purple-500/30 shadow-2xl space-y-4">
          {/* Canvas Top Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-purple-500/20">
            <span className="flex items-center gap-1.5 font-mono text-purple-300">
              <PenTool className="w-3.5 h-3.5" /> canvas_preview.fig
            </span>
            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">100% SCALE</span>
          </div>

          {/* Main Visual Showcase Tile */}
          <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 aspect-[4/3] group">
            <img
              src={input.heroImageUrl || theme.heroImage}
              alt="Design Canvas"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            
            {/* Floating Glassmorphic Tag */}
            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-purple-500/30 flex items-center justify-between text-xs text-white">
              <div>
                <p className="font-bold">{input.speakerName}</p>
                <p className="text-[11px] text-purple-300">{input.speakerRole}</p>
              </div>
              <span className="flex items-center gap-1 text-[11px] text-slate-300 bg-purple-500/20 px-2.5 py-1 rounded-lg">
                <Eye className="w-3.5 h-3.5 text-pink-400" /> Live Demo
              </span>
            </div>
          </div>

          {/* Small Feature Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-850/80 border border-slate-800 text-slate-300">
              <span className="text-[10px] text-purple-400 font-bold uppercase block">Thực hành</span>
              <p className="font-bold text-white mt-0.5">Xây Design System</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-850/80 border border-slate-800 text-slate-300">
              <span className="text-[10px] text-pink-400 font-bold uppercase block">Đầu ra</span>
              <p className="font-bold text-white mt-0.5">1 Case Study chuẩn chỉnh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
