import React, { useState, useEffect } from 'react';
import { calculateTimeRemaining, type TimeRemaining } from '../utils/date';

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
  variant = 'card',
  showLabels = true,
}) => {
  const [time, setTime] = useState<TimeRemaining>(() => calculateTimeRemaining(targetDate));

  useEffect(() => {
    setTime(calculateTimeRemaining(targetDate));
    const timer = setInterval(() => {
      setTime(calculateTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const isCompact = size === 'compact';
  const isLeft = align === 'left';
  const isTransparent = variant === 'transparent';

  const units = [
    { label: 'NGÀY', value: String(time.days).padStart(2, '0'), isSeconds: false },
    { label: 'GIỜ', value: String(time.hours).padStart(2, '0'), isSeconds: false },
    { label: 'PHÚT', value: String(time.minutes).padStart(2, '0'), isSeconds: false },
    { label: 'GIÂY', value: String(time.seconds).padStart(2, '0'), isSeconds: true },
  ];

  // Đồng bộ chiều cao giữa Hộp Chứa Số và Dấu Hai Chấm (Colon) để dấu : luôn luôn nằm chính giữa các con số
  const digitBoxHeightClass = isTransparent
    ? isCompact
      ? 'h-8 sm:h-10'
      : 'h-[44px] xs:h-[54px] sm:h-[76px] md:h-[92px] lg:h-[106px]'
    : isCompact
      ? 'h-14 sm:h-20'
      : 'h-24 sm:h-32 md:h-36';

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

      {/* Countdown Grid (Glass Cards or Transparent Minimalist) */}
      <div
        className={`flex items-start ${
          isLeft ? 'justify-start' : 'justify-center'
        } gap-1 xs:gap-1.5 sm:gap-3 md:gap-4 max-w-full`}
      >
        {units.map((unit, idx) => (
          <React.Fragment key={unit.label}>
            {/* Unit Column: Gồm cụm số phía trên và nhãn thời gian phía dưới */}
            <div
              className={`flex flex-col items-center justify-start ${
                isTransparent
                  ? 'min-w-[56px] xs:min-w-[70px] sm:min-w-[96px] md:min-w-[110px]'
                  : isCompact
                    ? 'w-[56px] xs:w-[68px] sm:w-[84px] md:w-[92px]'
                    : 'w-[62px] xs:w-[72px] sm:w-[102px] md:w-[124px] lg:w-[136px]'
              }`}
            >
              {/* Digit Box: Khung chứa số */}
              <div
                className={`relative flex items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-300 w-full ${digitBoxHeightClass} ${
                  isTransparent
                    ? 'bg-transparent border border-transparent shadow-none'
                    : `flex-col py-2 sm:py-3 ${
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
                      : isTransparent
                        ? 'text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-sm'
                        : 'text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-sm'
                  }`}
                >
                  {unit.value}
                </span>

                {/* Khi là Card dạng khung cũ, nhãn nằm bên trong khung card */}
                {!isTransparent && showLabels && (
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
                )}
              </div>

              {/* Dạng Trong suốt: Nhãn nằm RIÊNG BIỆT bên dưới khung số, hoàn toàn không làm kéo lệch dấu 2 chấm : */}
              {isTransparent && showLabels && (
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

            {/* Dấu hai chấm (Colon) nằm trong khung có chiều cao CHÍNH XÁC bằng khung chứa số */}
            {idx < units.length - 1 && (
              <div
                className={`flex items-center justify-center select-none ${digitBoxHeightClass}`}
              >
                <span
                  className={`font-mono font-bold text-slate-400 dark:text-slate-600 leading-none -translate-y-[2px] sm:-translate-y-[4px] md:-translate-y-[6px] ${
                    isCompact
                      ? 'text-base sm:text-xl'
                      : isTransparent
                        ? 'text-2xl xs:text-3xl sm:text-5xl md:text-6xl'
                        : 'text-lg xs:text-xl sm:text-3xl md:text-4xl'
                  } ${idx % 2 === 0 ? 'animate-pulse' : ''}`}
                >
                  :
                </span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
