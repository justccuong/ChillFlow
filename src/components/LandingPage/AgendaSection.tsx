import React from 'react';
import type { AgendaItem, ThemeConfig } from '../../types';
import { Clock } from 'lucide-react';

interface AgendaSectionProps {
  agenda: AgendaItem[];
  eventName: string;
  theme: ThemeConfig;
  speakerName: string;
  speakerPhoto: string;
}

export const AgendaSection: React.FC<AgendaSectionProps> = ({
  agenda,
  theme,
  speakerName,
  speakerPhoto,
}) => {
  const getSessionBadge = (index: number) => {
    switch (index) {
      case 0:
        return { label: 'Đón tiếp & Check-in', color: 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700' };
      case 1:
        return { label: 'Keynote & Xu hướng', color: `${theme.badgeText} ${theme.badgeBg} ${theme.accentBorder}` };
      case 2:
        return { label: 'Hands-on Workshop', color: 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
      default:
        return { label: 'Q&A & Quà tặng', color: 'text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/30' };
    }
  };

  return (
    <section id="agenda" className="py-24 px-4 md:px-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors">
      <div className="hairline-divider absolute top-0 inset-x-0"></div>

      {/* Subtle ambient light */}
      <div className={`ambient-glow-orb top-1/2 right-10 w-96 h-96 bg-gradient-to-tr ${theme.glowGradient} opacity-10 dark:opacity-20`}></div>

      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-[0.25em] text-slate-500 font-bold flex items-center justify-center gap-2">
            <Clock className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>LỘ TRÌNH CHI TIẾT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white">
            Lịch trình sự kiện
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
            Lộ trình làm việc cô đọng, tối đa hóa thời gian tiếp thu và thực hành ứng dụng thực tế.
          </p>
        </div>

        {/* 1. Mobile View (< sm): Clean 1-Column Centered Layout (No Bezel Clipping) */}
        <div className="sm:hidden space-y-4">
          {agenda.map((item, index) => {
            const badge = getSessionBadge(index);
            const isSpeakerSession = index === 1;

            return (
              <div key={index} className="flex flex-col items-center">
                <div className="w-full rounded-2xl p-5 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm space-y-3 text-center transition-all hover:border-indigo-500/50">
                  {/* Time + Badge Centered */}
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="text-xl font-mono font-black text-slate-900 dark:text-white tracking-tight">
                      {item.time}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Speaker Pill */}
                  {isSpeakerSession && (
                    <div className="pt-1 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <img
                        src={speakerPhoto}
                        alt={speakerName}
                        className="w-5 h-5 rounded-full object-cover border border-slate-300 dark:border-slate-700 shadow-sm"
                      />
                      <span className="text-slate-700 dark:text-slate-300 font-semibold text-xs">
                        {item.speaker || speakerName}
                      </span>
                    </div>
                  )}
                </div>

                {/* Centered Connector Line between items */}
                {index < agenda.length - 1 && (
                  <div className="h-6 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500/50 my-1 rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* 2. Desktop / Tablet View (>= sm): Sleek Timeline with Exact Mathematical Alignment */}
        <div className="hidden sm:block relative pl-12 space-y-12 before:absolute before:left-[19px] before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500/50 before:to-slate-300 dark:before:to-slate-800">
          {agenda.map((item, index) => {
            const badge = getSessionBadge(index);
            const isSpeakerSession = index === 1;

            return (
              <div key={index} className="relative group">
                {/* Glowing Timeline Dot - Center of 16px dot aligns at 20px (left: -37px + pl-12(48px) = 11px to 27px, center = 19px) */}
                <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-2 border-indigo-500 dark:border-indigo-400 group-hover:border-amber-500 dark:group-hover:border-amber-400 group-hover:scale-125 transition-all shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>

                {/* Session Content */}
                <div className="space-y-3 pb-8 border-b border-slate-200 dark:border-slate-900 group-last:border-b-0 group-last:pb-0">
                  {/* Time + Badge Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl sm:text-2xl font-mono font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors tracking-tight">
                        {item.time}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>

                    {isSpeakerSession && (
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <img
                          src={speakerPhoto}
                          alt={speakerName}
                          className="w-6 h-6 rounded-full object-cover border border-slate-300 dark:border-slate-700 shadow-sm"
                        />
                        <span className="text-slate-700 dark:text-slate-300 font-semibold">{item.speaker || speakerName}</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 max-w-2xl">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
