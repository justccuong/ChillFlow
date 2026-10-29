import React, { useEffect, useRef } from 'react';
import type { AgendaItem, ThemeConfig } from '../../types';
import { Clock } from 'lucide-react';
import './LaserScrollTimeline.css';

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
  const cardRef = useRef<HTMLDivElement>(null);
  const laserBeamRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getSessionBadge = (index: number) => {
    switch (index) {
      case 0:
        return { label: 'ĐÓN TIẾP & CHECK-IN', color: 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700' };
      case 1:
        return { label: 'KEYNOTE & XU HƯỚNG', color: `${theme.badgeText} ${theme.badgeBg} ${theme.accentBorder}` };
      case 2:
        return { label: 'HANDS-ON WORKSHOP', color: 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
      default:
        return { label: 'Q&A & QUÀ TẶNG', color: 'text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/30' };
    }
  };

  useEffect(() => {
    let animId: number;
    let targetProgress = 0;
    let currentProgress = 0;
    let isRunning = false;

    const calculateProgress = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const triggerY = window.innerHeight * 0.72;
      const totalHeight = rect.height;
      const ratio = (triggerY - rect.top) / totalHeight;
      targetProgress = Math.max(0, Math.min(1, ratio));
    };

    // Smooth Lerp Physics Loop: x += (target - current) * 0.18
    const animate = () => {
      currentProgress += (targetProgress - currentProgress) * 0.18;
      const delta = Math.abs(targetProgress - currentProgress);
      if (delta < 0.0004) {
        currentProgress = targetProgress;
      }

      const percent = currentProgress * 100;

      if (laserBeamRef.current) {
        laserBeamRef.current.style.height = `${percent}%`;
      }

      if (sparkRef.current) {
        sparkRef.current.style.top = `${percent}%`;
        sparkRef.current.style.opacity = currentProgress > 0.01 ? '1' : '0';
      }

      if (ambientGlowRef.current) {
        ambientGlowRef.current.style.top = `${percent}%`;
      }

      agenda.forEach((_, idx) => {
        const itemEl = itemRefs.current[idx];
        if (itemEl) {
          const threshold = ((idx + 0.5) / Math.max(agenda.length, 1)) - 0.03;
          const isPassed = currentProgress >= threshold;
          if (isPassed && !itemEl.classList.contains('passed')) {
            itemEl.classList.add('passed');
            itemEl.classList.remove('upcoming');
          } else if (!isPassed && itemEl.classList.contains('passed')) {
            itemEl.classList.remove('passed');
            itemEl.classList.add('upcoming');
          }
        }
      });

      if (delta >= 0.0004) {
        animId = requestAnimationFrame(animate);
      } else {
        isRunning = false;
      }
    };

    const handleScrollOrResize = () => {
      calculateProgress();
      if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    handleScrollOrResize();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [agenda]);

  const handleMilestoneClick = (index: number) => {
    const item = itemRefs.current[index];
    if (item) {
      item.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="agenda" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors">
      <div className="hairline-divider absolute top-0 inset-x-0"></div>

      {/* Subtle ambient light */}
      <div className={`ambient-glow-orb top-1/2 right-10 w-96 h-96 bg-gradient-to-tr ${theme.glowGradient} opacity-10 dark:opacity-20`}></div>

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
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

        {/* Laser Scroll Canvas Card (Kune Studio Architecture) */}
        <div className="laser-timeline-canvas-card" ref={cardRef}>
          {/* Ambient Glow Orb */}
          <div className="laser-timeline-ambient-glow" ref={ambientGlowRef} />

          {/* Central Laser Rail Track */}
          <div className="laser-timeline-rail-track">
            <div className="laser-rail-guide-wire" />
            <div className="laser-rail-beam" ref={laserBeamRef} />
            <div className="laser-head-spark" ref={sparkRef} />
          </div>

          {/* Milestones List */}
          <div className="laser-timeline-list">
            {agenda.map((item, index) => {
              const isLeft = index % 2 === 0;
              const badge = getSessionBadge(index);
              const isSpeakerSession = index === 1;
              const formattedIdx = String(index + 1).padStart(2, '0');

              return (
                <div
                  key={index}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className={`laser-milestone-item upcoming ${isLeft ? 'side-left' : 'side-right'}`}
                  onClick={() => handleMilestoneClick(index)}
                >
                  {/* Node Anchor on the Rail */}
                  <div className="milestone-node-anchor">
                    <div className="node-outer-halo" />
                    <div className="node-ring-pulse" />
                    <div className="node-core-dot">
                      <span className="node-inner-idx">{formattedIdx}</span>
                    </div>
                  </div>

                  {/* Horizontal Branch Line connecting Rail to Content on Desktop */}
                  <div className="node-branch-line" />

                  {/* Milestone Content */}
                  <div className="milestone-content-flow space-y-3">
                    {/* Time & Phase Badge */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-xl sm:text-2xl font-mono font-black text-slate-900 dark:text-white tracking-tight">
                        {item.time}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-1.5">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>

                    {/* Speaker Pill */}
                    {isSpeakerSession && (
                      <div className="pt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <img
                          src={speakerPhoto}
                          alt={speakerName}
                          className="w-6 h-6 rounded-full object-cover border border-slate-300 dark:border-slate-700 shadow-sm"
                        />
                        <span className="text-slate-700 dark:text-slate-300 font-semibold">{item.speaker || speakerName}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
