import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
  size?: 'hero' | 'compact';
  align?: 'center' | 'left';
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
}) => {
  const calculateTimeRemaining = (): TimeRemaining => {
    let targetTime = new Date(targetDate).getTime();

    // Đảm bảo luôn luôn có số đếm ngược sống động
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

  return (
    <div
      className={`w-full flex flex-col ${
        isLeft ? 'items-start text-left' : 'items-center justify-center text-center'
      } ${isCompact ? 'my-3' : 'my-6 md:my-10'} select-none`}
    >
      {/* Title with wide tracking - Chuẩn phong cách ảnh mẫu TemplateFlip */}
      <div
        className={`${
          isCompact ? 'text-[11px] mb-2' : 'text-xs sm:text-sm md:text-base mb-4 md:mb-6'
        } uppercase tracking-[0.25em] text-slate-800 dark:text-slate-300 font-bold`}
      >
        SỰ KIỆN SẼ BẮT ĐẦU TRONG
      </div>

      {/* 4 CỘT SỐ NGUYÊN BẢN - KHÔNG VIỀN, KHÔNG NỀN, KHÔNG KHUNG DIV */}
      <div
        className={`flex items-start ${
          isLeft ? 'justify-start' : 'justify-center'
        } ${isCompact ? 'gap-4 sm:gap-7 md:gap-9' : 'gap-6 sm:gap-12 md:gap-16 lg:gap-20'}`}
      >
        {/* NGÀY */}
        <div className="flex flex-col items-center">
          <span
            className={`${
              isCompact
                ? 'text-3xl sm:text-4xl md:text-5xl'
                : 'text-5xl sm:text-7xl md:text-8xl lg:text-9xl'
            } font-light tracking-tight text-slate-900 dark:text-white tabular-nums drop-shadow-md leading-none`}
          >
            {String(time.days).padStart(2, '0')}
          </span>
          <span
            className={`${
              isCompact ? 'text-[9px] sm:text-[10px] mt-1' : 'text-[10px] sm:text-xs md:text-sm mt-2 md:mt-3'
            } tracking-[0.25em] uppercase text-slate-500 dark:text-slate-400 font-medium`}
          >
            NGÀY
          </span>
        </div>

        {/* GIỜ */}
        <div className="flex flex-col items-center">
          <span
            className={`${
              isCompact
                ? 'text-3xl sm:text-4xl md:text-5xl'
                : 'text-5xl sm:text-7xl md:text-8xl lg:text-9xl'
            } font-light tracking-tight text-slate-900 dark:text-white tabular-nums drop-shadow-md leading-none`}
          >
            {String(time.hours).padStart(2, '0')}
          </span>
          <span
            className={`${
              isCompact ? 'text-[9px] sm:text-[10px] mt-1' : 'text-[10px] sm:text-xs md:text-sm mt-2 md:mt-3'
            } tracking-[0.25em] uppercase text-slate-500 dark:text-slate-400 font-medium`}
          >
            GIỜ
          </span>
        </div>

        {/* PHÚT */}
        <div className="flex flex-col items-center">
          <span
            className={`${
              isCompact
                ? 'text-3xl sm:text-4xl md:text-5xl'
                : 'text-5xl sm:text-7xl md:text-8xl lg:text-9xl'
            } font-light tracking-tight text-slate-900 dark:text-white tabular-nums drop-shadow-md leading-none`}
          >
            {String(time.minutes).padStart(2, '0')}
          </span>
          <span
            className={`${
              isCompact ? 'text-[9px] sm:text-[10px] mt-1' : 'text-[10px] sm:text-xs md:text-sm mt-2 md:mt-3'
            } tracking-[0.25em] uppercase text-slate-500 dark:text-slate-400 font-medium`}
          >
            PHÚT
          </span>
        </div>

        {/* GIÂY */}
        <div className="flex flex-col items-center">
          <span
            className={`${
              isCompact
                ? 'text-3xl sm:text-4xl md:text-5xl'
                : 'text-5xl sm:text-7xl md:text-8xl lg:text-9xl'
            } font-light tracking-tight text-emerald-500 dark:text-emerald-400 tabular-nums drop-shadow-md leading-none animate-pulse-subtle`}
          >
            {String(time.seconds).padStart(2, '0')}
          </span>
          <span
            className={`${
              isCompact ? 'text-[9px] sm:text-[10px] mt-1' : 'text-[10px] sm:text-xs md:text-sm mt-2 md:mt-3'
            } tracking-[0.25em] uppercase text-slate-500 dark:text-slate-400 font-medium`}
          >
            GIÂY
          </span>
        </div>
      </div>
    </div>
  );
};
