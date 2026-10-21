import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
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

  return (
    <div className="w-full flex flex-col items-center justify-center my-6 md:my-10 text-center select-none">
      {/* Title with wide tracking - Chuẩn phong cách ảnh mẫu TemplateFlip */}
      <div className="text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] text-slate-800 dark:text-slate-300 font-bold mb-4 md:mb-6">
        SỰ KIỆN SẼ BẮT ĐẦU TRONG
      </div>

      {/* 4 CỘT SỐ NGUYÊN BẢN - KHÔNG VIỀN, KHÔNG NỀN, KHÔNG KHUNG DIV */}
      <div className="flex items-start justify-center gap-6 sm:gap-12 md:gap-16 lg:gap-20">
        {/* NGÀY */}
        <div className="flex flex-col items-center">
          <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-slate-900 dark:text-white tabular-nums drop-shadow-lg leading-none">
            {String(time.days).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs md:text-sm tracking-[0.25em] uppercase text-slate-500 dark:text-slate-400 font-medium mt-2 md:mt-3">
            NGÀY
          </span>
        </div>

        {/* GIỜ */}
        <div className="flex flex-col items-center">
          <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-slate-900 dark:text-white tabular-nums drop-shadow-lg leading-none">
            {String(time.hours).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs md:text-sm tracking-[0.25em] uppercase text-slate-500 dark:text-slate-400 font-medium mt-2 md:mt-3">
            GIỜ
          </span>
        </div>

        {/* PHÚT */}
        <div className="flex flex-col items-center">
          <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-slate-900 dark:text-white tabular-nums drop-shadow-lg leading-none">
            {String(time.minutes).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs md:text-sm tracking-[0.25em] uppercase text-slate-500 dark:text-slate-400 font-medium mt-2 md:mt-3">
            PHÚT
          </span>
        </div>

        {/* GIÂY */}
        <div className="flex flex-col items-center">
          <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-emerald-500 dark:text-emerald-400 tabular-nums drop-shadow-lg leading-none animate-pulse-subtle">
            {String(time.seconds).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs md:text-sm tracking-[0.25em] uppercase text-slate-500 dark:text-slate-400 font-medium mt-2 md:mt-3">
            GIÂY
          </span>
        </div>
      </div>
    </div>
  );
};
