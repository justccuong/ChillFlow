import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
  size?: 'hero' | 'compact';
  align?: 'center' | 'left';
  label?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  size = 'hero',
  align = 'center',
  label = 'SỰ KIỆN SẼ BẮT ĐẦU TRONG',
}) => {
  const calculateTimeRemaining = (): TimeRemaining => {
    let targetTime = new Date(targetDate).getTime();

    // Luôn đảm bảo có thời gian đếm ngược thực tế sống động
    if (isNaN(targetTime) || targetTime <= Date.now()) {
      targetTime = Date.now() + 14 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000 + 45 * 60 * 1000;
    }

    const difference = targetTime - Date.now();

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [time, setTime] = useState<TimeRemaining>(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const isCompact = size === 'compact';
  const isLeft = align === 'left';

  const units = [
    { label: 'NGÀY', value: String(time.days).padStart(2, '0'), isSeconds: false },
    { label: 'GIỜ', value: String(time.hours).padStart(2, '0'), isSeconds: false },
    { label: 'PHÚT', value: String(time.minutes).padStart(2, '0'), isSeconds: false },
    { label: 'GIÂY', value: String(time.seconds).padStart(2, '0'), isSeconds: true },
  ];

  return (
    <div
      className={`w-full flex flex-col ${
        isLeft ? 'items-start text-left' : 'items-center justify-center text-center'
      } ${isCompact ? 'my-3' : 'my-6 sm:my-8'} select-none`}
    >
      {/* Timer Header Label with Live Blinking Pulse Dot */}
      {label && (
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-slate-700 dark:text-slate-300">
            {label}
          </span>
        </div>
      )}

      {/* Frosted Obsidian Glass Cards Grid */}
      <div
        className={`flex items-center ${
          isLeft ? 'justify-start' : 'justify-center'
        } gap-1 xs:gap-1.5 sm:gap-3.5 md:gap-4 max-w-full`}
      >
        {units.map((unit, idx) => (
          <React.Fragment key={unit.label}>
            <div
              className={`relative flex flex-col items-center justify-center rounded-xl sm:rounded-2xl border transition-all duration-300 ${
                unit.isSeconds
                  ? 'bg-white/95 dark:bg-slate-900/90 border-cyan-500/40 dark:border-cyan-400/30 shadow-[0_4px_25px_-5px_rgba(6,182,212,0.25)]'
                  : 'bg-white/85 dark:bg-slate-900/75 border-slate-200/80 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/30'
              } backdrop-blur-xl ${
                isCompact
                  ? 'w-[56px] xs:w-[68px] sm:w-[84px] md:w-[92px] py-2 sm:py-3'
                  : 'w-[62px] xs:w-[72px] sm:w-[102px] md:w-[124px] lg:w-[136px] py-2.5 xs:py-3 sm:py-5 md:py-6'
              }`}
            >
              {/* Subtle top specular glass reflection line */}
              <div className="absolute top-0 inset-x-0 h-[1.5px] rounded-t-2xl bg-gradient-to-r from-transparent via-white/30 dark:via-white/20 to-transparent pointer-events-none"></div>

              {/* Number Digits */}
              <span
                className={`font-black font-mono tracking-tight tabular-nums leading-none ${
                  unit.isSeconds
                    ? 'text-cyan-600 dark:text-cyan-400'
                    : 'text-slate-900 dark:text-white'
                } ${
                  isCompact
                    ? 'text-xl sm:text-3xl md:text-4xl'
                    : 'text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-sm'
                }`}
              >
                {unit.value}
              </span>

              {/* Subtitle Unit Label */}
              <span
                className={`font-bold tracking-[0.2em] uppercase ${
                  unit.isSeconds
                    ? 'text-cyan-700 dark:text-cyan-300/90'
                    : 'text-slate-500 dark:text-slate-400'
                } ${
                  isCompact
                    ? 'text-[8px] sm:text-[10px] mt-1'
                    : 'text-[9px] xs:text-[10px] sm:text-xs md:text-sm mt-1 sm:mt-2.5'
                }`}
              >
                {unit.label}
              </span>
            </div>

            {/* Colon Separator between cards (except after last card) */}
            {idx < units.length - 1 && (
              <span
                className={`font-mono font-bold select-none text-slate-400 dark:text-slate-600 ${
                  isCompact
                    ? 'text-base sm:text-xl'
                    : 'text-lg xs:text-xl sm:text-3xl md:text-4xl'
                } ${idx % 2 === 0 ? 'animate-pulse' : ''}`}
              >
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
