import React from 'react';
import {
  Palette,
  Edit3,
  Rocket,
  X,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuickTourGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const STORAGE_KEY_SEEN_TOUR = 'chillflow_has_seen_quick_tour';

export const QuickTourGuide: React.FC<QuickTourGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleFinish = () => {
    try {
      localStorage.setItem(STORAGE_KEY_SEEN_TOUR, 'true');
    } catch {
      // safe fallback
    }
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { x: 0.1, y: 0.5 },
      });
    } catch {
      // ignore
    }
    onClose();
  };

  const handleSkip = () => {
    try {
      localStorage.setItem(STORAGE_KEY_SEEN_TOUR, 'true');
    } catch {
      // safe fallback
    }
    onClose();
  };

  const STEPS = [
    {
      step: 'Bước 1/4',
      icon: Palette,
      iconBg: 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400',
      badgeColor: 'text-indigo-500 dark:text-indigo-400 bg-indigo-500/10',
      title: '12 Templates Sự Kiện',
      desc: 'Chuyển đổi giao diện theo ngành',
    },
    {
      step: 'Bước 2/4',
      icon: Edit3,
      iconBg: 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400',
      badgeColor: 'text-emerald-500 dark:text-emerald-400 bg-emerald-500/10',
      title: 'Sửa trực tiếp & Đổi ảnh',
      desc: 'Nhấp để sửa chữ tại chỗ, Ctrl+Z hoàn tác',
    },
    {
      step: 'Bước 3/4',
      icon: Sparkles,
      iconBg: 'bg-amber-500/10 text-amber-500 dark:text-amber-400',
      badgeColor: 'text-amber-500 dark:text-amber-400 bg-amber-500/10',
      title: 'Điểm CRO & AI',
      desc: 'Tối ưu chuyển đổi vé lên ≥ 90 điểm',
    },
    {
      step: 'Bước 4/4',
      icon: Rocket,
      iconBg: 'bg-teal-500/10 text-teal-500 dark:text-teal-400',
      badgeColor: 'text-teal-500 dark:text-teal-400 bg-teal-500/10',
      title: 'Xuất bản & Tải mã',
      desc: 'Chia sẻ online hoặc lưu file HTML độc lập',
    },
  ];

  return (
    <>
      {/* Light backdrop on mobile */}
      <div
        className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
        onClick={handleSkip}
        aria-hidden="true"
      />

      {/* Floating Studio Guide Popover: Docked right next to the left toolbar */}
      <div
        className="fixed z-50 left-4 md:left-20 bottom-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2 w-[calc(100vw-2rem)] md:w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] p-4 text-slate-800 dark:text-white animate-in fade-in slide-in-from-left-4 duration-200"
        role="dialog"
        aria-label="Hướng dẫn công cụ Studio"
      >
        {/* Left Arrow pointer toward the vertical dock (visible on desktop) */}
        <div className="hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-slate-900 border-l border-b border-slate-200 dark:border-white/15 rotate-45 pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm font-heading leading-tight">
                Hướng dẫn nhanh Studio
              </h4>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            title="Đóng"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Feature Items - Ultra Concise */}
        <div className="space-y-1.5 text-xs">
          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/80 dark:bg-white/5 border border-slate-100/80 dark:border-white/5 hover:border-indigo-400/30 transition-colors"
              >
                <div
                  className={`w-7 h-7 rounded-lg ${item.iconBg} flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-1 py-0.2 rounded ${item.badgeColor}`}
                    >
                      {item.step}
                    </span>
                    <p className="font-semibold text-slate-900 dark:text-white text-[11px] sm:text-xs truncate">
                      {item.title}
                    </p>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-slate-100 dark:border-white/10">
          <button
            type="button"
            onClick={handleSkip}
            className="text-[11px] text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-medium px-2 py-1 cursor-pointer"
          >
            Bỏ qua
          </button>

          <button
            type="button"
            onClick={handleFinish}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 shadow-sm active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Bắt đầu trải nghiệm</span>
          </button>
        </div>
      </div>
    </>
  );
};
