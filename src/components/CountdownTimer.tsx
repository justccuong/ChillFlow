import React, { useState, useEffect, useMemo } from 'react';
import { calculateTimeRemaining, normalizeEventDate, type TimeRemaining } from '../utils/date';

interface CountdownTimerProps {
  targetDate: string;
  size?: 'hero' | 'compact';
  align?: 'center' | 'left';
  label?: string;
  variant?: 'card' | 'transparent';
  showLabels?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  size = 'hero',
  align = 'center',
  label = 'SỰ KIỆN SẼ BẮT ĐẦU TRONG',
  variant = 'transparent',
  showLabels = true,
}) => {
  // Stable resolved target timestamp to ensure timer ticks down continuously even if targetDate is invalid or in the past
  const resolvedTarget = useMemo(() => {
    const sanitized = normalizeEventDate(targetDate);
    const t = new Date(sanitized).getTime();
    const now = Date.now();
    if (isNaN(t) || t <= now) {
      // 14 days, 8 hours, 45 minutes fixed into the future from render time
      return now + 14 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000 + 45 * 60 * 1000;
    }
    return t;
  }, [targetDate]);

  const [time, setTime] = useState<TimeRemaining>(() => calculateTimeRemaining(resolvedTarget));

  useEffect(() => {
    setTime(calculateTimeRemaining(resolvedTarget));
    const timer = setInterval(() => {
      setTime(calculateTimeRemaining(resolvedTarget));
    }, 1000);
    return () => clearInterval(timer);
  }, [resolvedTarget]);

  const isCompact = size === 'compact';
  const isLeft = align === 'left';
  const isTransparent = variant === 'transparent';

  const units = [
    { label: 'NGÀY', value: String(time.days).padStart(2, '0'), isSeconds: false },
    { label: 'GIỜ', value: String(time.hours).padStart(2, '0'), isSeconds: false },
    { label: 'PHÚT', value: String(time.minutes).padStart(2, '0'), isSeconds: false },
    { label: 'GIÂY', value: String(time.seconds).padStart(2, '0'), isSeconds: true },
  ];

  // Chiều cao khung chứa số để đồng bộ chuẩn xác với dấu phân cách (separator) ở chính giữa
  const digitBoxHeightClass = isCompact
    ? 'h-8 sm:h-10'
    : 'h-12 xs:h-14 sm:h-20 md:h-24 lg:h-28';

  return (
    <div
      data-audit="countdown"
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

      {/* Countdown Grid (Transparent Minimalist by default, borderless numbers) */}
      <div
        className={`flex items-start ${
          isLeft ? 'justify-start' : 'justify-center'
        } gap-1 xs:gap-1.5 sm:gap-3 md:gap-4 max-w-full`}
      >
        {units.map((unit, idx) => (
          <React.Fragment key={unit.label}>
            {/* Unit Column: Gồm cụm số phía trên và nhãn thời gian độc lập phía dưới */}
            <div
              className={`flex flex-col items-center justify-start ${
                isTransparent
                  ? 'min-w-[56px] xs:min-w-[70px] sm:min-w-[96px] md:min-w-[110px]'
                  : isCompact
                    ? 'w-[56px] xs:w-[68px] sm:w-[84px] md:w-[92px]'
                    : 'w-[62px] xs:w-[72px] sm:w-[102px] md:w-[124px] lg:w-[136px]'
              }`}
            >
              {/* Digit Box: Khung chứa số - Trong suốt, không viền */}
              <div
                className={`relative flex items-center justify-center transition-all duration-300 w-full ${digitBoxHeightClass} ${
                  isTransparent
                    ? 'bg-transparent border-none shadow-none'
                    : `flex-col py-2 sm:py-3 rounded-xl sm:rounded-2xl ${
                        unit.isSeconds
                          ? 'bg-white/95 dark:bg-slate-900/90 border border-cyan-500/40 dark:border-cyan-400/30 shadow-[0_4px_25px_-5px_rgba(6,182,212,0.25)] backdrop-blur-xl'
                          : 'bg-white/85 dark:bg-slate-900/75 border border-slate-200/80 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/30 backdrop-blur-xl'
                      }`
                }`}
              >
                {!isTransparent && (
                  <div className="absolute top-0 inset-x-0 h-[1.5px] rounded-t-2xl bg-gradient-to-r from-transparent via-white/30 dark:via-white/20 to-transparent pointer-events-none"></div>
                )}

                {/* Number Digits */}
                <span
                  className={`font-black font-mono tracking-tight tabular-nums leading-none ${
                    unit.isSeconds
                      ? 'text-cyan-600 dark:text-cyan-400'
                      : 'text-slate-900 dark:text-white'
                  } ${
                    isCompact
                      ? 'text-xl sm:text-3xl md:text-4xl'
                      : 'text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-sm'
                  }`}
                >
                  {unit.value}
                </span>
              </div>

              {/* Nhãn thời gian nằm RIÊNG BIỆT bên dưới khung số, không làm lệch tâm dấu phân cách */}
              {showLabels && (
                <span
                  className={`font-bold tracking-[0.2em] uppercase select-none ${
                    unit.isSeconds
                      ? 'text-cyan-700 dark:text-cyan-300/90'
                      : 'text-slate-500 dark:text-slate-400'
                  } ${
                    isCompact
                      ? 'text-[8px] sm:text-[10px] mt-1'
                      : 'text-[9px] xs:text-[10px] sm:text-xs md:text-sm mt-1.5 sm:mt-2'
                  }`}
                >
                  {unit.label}
                </span>
              )}
            </div>

            {/* Dấu hai chấm (Separator) căn thẳng hàng với chiều cao khung số, nằm chính giữa các con số */}
            {idx < units.length - 1 && (
              <div
                data-testid="countdown-separator"
                className={`countdown-separator flex flex-col items-center justify-center select-none ${digitBoxHeightClass} ${
                  isCompact ? 'gap-1 px-0.5' : 'gap-1.5 sm:gap-2.5 md:gap-3 px-1 sm:px-2'
                }`}
                aria-hidden="true"
              >
                <span
                  className={`rounded-full bg-slate-400 dark:bg-slate-500 transition-colors ${
                    isCompact
                      ? 'w-1 h-1'
                      : 'w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5'
                  } ${idx % 2 === 0 ? 'animate-pulse' : ''}`}
                />
                <span
                  className={`rounded-full bg-slate-400 dark:bg-slate-500 transition-colors ${
                    isCompact
                      ? 'w-1 h-1'
                      : 'w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5'
                  } ${idx % 2 === 0 ? 'animate-pulse' : ''}`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
