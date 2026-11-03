import React, { useState } from 'react';
import {
  Wrench,
  Palette,
  Edit3,
  Rocket,
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuickTourGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TourStep {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  tip?: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    badge: 'Bước 1/4',
    title: 'Thanh công cụ Studio thông minh',
    subtitle: 'Tối ưu trải nghiệm trên cả Laptop và Điện thoại',
    description:
      'Trên máy tính, thanh công cụ được đặt gọn gàng ở dọc mép trái màn hình giúp bạn thao tác nhanh mà không bao giờ che khuất nội dung trang. Trên điện thoại, bạn có thể chạm vào nút "Công cụ" ở góc dưới bên trái để mở bảng điều khiển tiện lợi.',
    icon: Wrench,
    iconColor: 'text-indigo-500 dark:text-indigo-400',
    iconBg: 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800',
    tip: 'Mẹo: Có thể thu gọn thanh công cụ bất kỳ lúc nào để toàn màn hình.',
  },
  {
    badge: 'Bước 2/4',
    title: 'Kho 12 Templates chuẩn Awwwards',
    subtitle: 'Chuyển đổi giao diện tức thì theo từng ngành',
    description:
      'Nhấp vào biểu tượng Bảng màu để khám phá 12 phong cách thiết kế đỉnh cao (AI Tech Summit, Marathon thể thao, Lễ hội âm nhạc, Startup Demo Day, 3D Studio...). Toàn bộ nội dung sự kiện sẽ tự động hòa hợp vào phong cách mới mà không vỡ layout.',
    icon: Palette,
    iconColor: 'text-cyan-500 dark:text-cyan-400',
    iconBg: 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-800',
    tip: 'Mẹo: Mỗi template có bảng màu và hiệu ứng micro-interaction chuyên biệt.',
  },
  {
    badge: 'Bước 3/4',
    title: 'Chỉnh sửa trực tiếp (Visual CMS)',
    subtitle: 'Sửa chữ tại chỗ & Trợ lý AI Viết lại',
    description:
      'Bật biểu tượng Bút chì để nhấp chuột và sửa bất kỳ đoạn văn bản nào trực tiếp trên trang. Bạn cũng có thể dùng thanh công cụ nổi để nhờ AI viết lại câu chữ theo 3 phong cách (Ngắn gọn, FOMO, Sang trọng), cùng phím tắt Ctrl+Z / Ctrl+Y để hoàn tác tức thì.',
    icon: Edit3,
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
    tip: 'Mẹo: Mọi thay đổi đều được lưu tự động và bảo toàn khi chuyển template.',
  },
  {
    badge: 'Bước 4/4',
    title: 'Thẩm định CRO & Xuất bản đa nền tảng',
    subtitle: 'Tâm lý học chuyển đổi & Trình xuất HTML độc lập',
    description:
      'Theo dõi bảng điểm CRO Scorecard đánh giá độ khẩn cấp, độ tương phản WCAG và chuẩn hóa SEO Schema. Khi ưng ý, bấm "Xuất bản" để lấy liên kết chia sẻ trực tuyến hoặc tải về file HTML độc lập chạy offline không cần máy chủ.',
    icon: Rocket,
    iconColor: 'text-amber-500 dark:text-amber-400',
    iconBg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',
    tip: 'Mẹo: Bấm 1-click "Tối ưu hóa CRO" để đẩy điểm số lên trên 90/100.',
  },
];

export const STORAGE_KEY_SEEN_TOUR = 'chillflow_has_seen_quick_tour';

export const QuickTourGuide: React.FC<QuickTourGuideProps> = ({ isOpen, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const currentStep = TOUR_STEPS[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === TOUR_STEPS.length - 1;

  const handleFinish = () => {
    try {
      localStorage.setItem(STORAGE_KEY_SEEN_TOUR, 'true');
    } catch {
      // safe fallback if storage disabled
    }
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
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

  const handleNext = () => {
    if (isLast) {
      handleFinish();
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const StepIcon = currentStep.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 relative overflow-hidden animate-in zoom-in-95 duration-250"
        role="dialog"
        aria-modal="true"
        aria-label="Hướng dẫn nhanh ChillFlow Studio"
      >
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/15 dark:bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-500/15 dark:bg-teal-500/25 rounded-full blur-3xl pointer-events-none" />

        {/* Top bar with badge and Skip */}
        <div className="flex items-center justify-between gap-3 mb-5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
              {currentStep.badge}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Hướng dẫn nhanh 4 bước
            </span>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-medium px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
          >
            <span>Bỏ qua</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Step Visual & Header */}
        <div className="flex items-start gap-4 mb-4 relative z-10">
          <div
            className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 shadow-sm ${currentStep.iconBg}`}
          >
            <StepIcon className={`w-7 h-7 ${currentStep.iconColor}`} />
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-white leading-tight">
              {currentStep.title}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-1">
              {currentStep.subtitle}
            </p>
          </div>
        </div>

        {/* Step Description */}
        <div className="relative z-10 space-y-3 mb-6">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {currentStep.description}
          </p>

          {currentStep.tip && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{currentStep.tip}</span>
            </div>
          )}
        </div>

        {/* Step Progress Dots & Navigation */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 relative z-10">
          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentStepIndex
                    ? 'w-6 bg-indigo-600 dark:bg-indigo-400'
                    : 'w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'
                }`}
                aria-label={`Chuyển đến bước ${idx + 1}`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Trước</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 shadow-md shadow-indigo-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {isLast ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Bắt đầu trải nghiệm</span>
                </>
              ) : (
                <>
                  <span>Tiếp tục</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
