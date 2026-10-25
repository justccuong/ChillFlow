import React, { useState } from 'react';
import type { EventInput, GeneratedContent, ThemeConfig } from '../../../types';
import { CountdownTimer } from '../../CountdownTimer';
import { formatEventDate } from '../../../utils/date';
import { InlineEditable } from '../InlineEditable';
import { Calendar, MapPin, ArrowRight, Terminal, Copy, Check, Code2, Cpu, GitBranch, Layers, CheckCircle2 } from 'lucide-react';

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

export const TerminalHero: React.FC<HeroProps> = ({
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
  const [copied, setCopied] = useState(false);

  const runCommand = `npx create-vibe-event@2026 --register --session=${encodeURIComponent(input.eventName || 'devcon')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(runCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-left space-y-7 font-sans">
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3 font-mono text-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <Terminal className="w-3.5 h-3.5 text-emerald-500" />
          <span>DEVCON_PROTOCOL://2026_ACTIVE</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-[11px]">
          <span>ENV: PRODUCTION</span>
          <span>LATENCY: 12ms</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">ALL_SYSTEMS_OPERATIONAL</span>
        </div>
      </div>

      {/* Broad, Un-cramped Developer Headline */}
      <div className="space-y-4 max-w-4xl">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
          <span>// KEYNOTE INAUGURATION</span>
          <span className="inline-block w-2 h-4 bg-emerald-500 animate-pulse"></span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-mono text-slate-900 dark:text-white leading-[1.16]">
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
      </div>

      {/* 1-Click Interactive CLI Command Pill */}
      <div className="max-w-3xl flex items-center gap-3 bg-slate-900 dark:bg-black/90 p-3.5 rounded-xl border border-emerald-500/30 shadow-lg text-xs font-mono text-emerald-400">
        <span className="text-slate-500 select-none">$</span>
        <span className="flex-1 truncate select-all">{runCommand}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-semibold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105"
          title="Sao chép lệnh cài đặt"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>COPIED!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>

      {/* Event Details: Date, Location, CTA & Compact Countdown */}
      <div className="space-y-4 max-w-4xl pt-1">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-sm text-slate-700 dark:text-slate-300">
            <Calendar className="w-4 h-4 text-emerald-500" />
            <span>{formatEventDate(input.eventDate)}</span>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-sm text-slate-700 dark:text-slate-300">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <InlineEditable
              value={input.location}
              onSave={(val) => onUpdateInputField?.('location', val)}
              isEditMode={isEditMode}
              as="span"
              category={input.category}
            />
          </div>
        </div>

        {/* CTA & Registered Engineer Count */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            type="button"
            onClick={onScrollToRegister}
            className={`px-8 py-4 rounded-xl text-base shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5 group font-mono ${theme.btnPrimary}`}
          >
            <InlineEditable
              value={content.ctaButtonText || 'git checkout --register-vip'}
              onSave={(val) => onUpdateContentField?.('ctaButtonText', val)}
              isEditMode={isEditMode}
              as="span"
              category={input.category}
            />
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Đã cấp vé tham dự cho {registeredCount > 0 ? registeredCount : 96}+ kỹ sư</span>
          </div>
        </div>

        {/* Prominent Developer Countdown */}
        <div className="pt-3">
          <CountdownTimer targetDate={input.eventDate} size="hero" align="left" />
        </div>
      </div>

      {/* Horizontal Developer Telemetry Bar (4-Col Grid) */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <Code2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>STACK</span>
          </div>
          <div className="font-mono font-bold text-sm text-slate-900 dark:text-white">React 19 / Vite / WASM</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <GitBranch className="w-3.5 h-3.5 text-cyan-500" />
            <span>COMMITS</span>
          </div>
          <div className="font-mono font-bold text-sm text-slate-900 dark:text-white">1,480+ Production PRs</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <Cpu className="w-3.5 h-3.5 text-purple-500" />
            <span>ARCHITECTURE</span>
          </div>
          <div className="font-mono font-bold text-sm text-slate-900 dark:text-white">Event-Driven / Local AI</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span>WORKSHOP</span>
          </div>
          <div className="font-mono font-bold text-sm text-slate-900 dark:text-white">100% Live Coding Lab</div>
        </div>
      </div>
    </div>
  );
};
