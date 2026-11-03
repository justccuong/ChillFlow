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
        particleCount: 50,
        spread: 60,
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

  return (
    <>
      {/* Light click-away backdrop on mobile only (no dark dimming on desktop) */}
      <div
        className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
        onClick={handleSkip}
        aria-hidden="true"
      />

      {/* Floating Studio Guide Popover: Docked right next to the left toolbar */}
      <div
        className="fixed z-50 left-4 md:left-20 bottom-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2 w-[calc(100vw-2rem)] md:w-96 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-white/15 rounded-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] p-5 text-slate-800 dark:text-white animate-in fade-in slide-in-from-left-4 duration-200"
        role="dialog"
        aria-label="Hướng dẫn công cụ Studio"
      >
        {/* Left Arrow pointer toward the vertical dock (visible on desktop) */}
        <div className="hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-slate-900 border-l border-b border-slate-200 dark:border-white/15 rotate-45 pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm font-heading leading-tight">
                Mẹo sử dụng thanh công cụ Studio
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Toàn quyền tùy biến trang sự kiện của bạn
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            title="Bỏ qua"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Subtitle intro */}
        <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
          Bạn có thể sử dụng các công cụ được bố trí trên thanh dọc bên trái:
        </p>

        {/* 4 Feature Items */}
        <div className="space-y-2.5 text-xs">
          {/* Step 1 */}
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <div className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
              <Palette className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 mr-1.5">Bước 1/4</span>
                Kho 12 Templates Sự Kiện
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Bấm vào để đổi qua lại giữa 12 mẫu giao diện chuẩn Awwwards theo từng ngành mà không lo vỡ layout.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Edit3 className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 mr-1.5">Bước 2/4</span>
                Chỉnh sửa trực tiếp (Visual CMS) & Đổi ảnh
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Bật nút Bút chì để nhấp vào bất kỳ đoạn chữ nào để sửa tại chỗ, hoặc nhấp nút "Đổi ảnh" trên thẻ diễn giả. Hỗ trợ Ctrl+Z hoàn tác 0ms.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400 mr-1.5">Bước 3/4</span>
                Điểm CRO & Tối ưu hóa chuyển đổi
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Theo dõi thang điểm tâm lý chuyển đổi (độ khẩn cấp, WCAG, SEO Schema) và tối ưu 1-click lên ≥ 90 điểm.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <div className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
              <Rocket className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                <span className="text-[10px] font-bold uppercase text-teal-600 dark:text-teal-400 mr-1.5">Bước 4/4</span>
                Xuất bản online & Tải HTML độc lập
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Xuất link chia sẻ công khai hoặc tải về file Single-File HTML độc lập chạy offline không cần máy chủ.
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-200 dark:border-white/10">
          <button
            type="button"
            onClick={handleSkip}
            className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-medium px-2 py-1"
          >
            Bỏ qua
          </button>

          <button
            type="button"
            onClick={handleFinish}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 shadow-md shadow-indigo-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Bắt đầu trải nghiệm</span>
          </button>
        </div>
      </div>
    </>
  );
};
