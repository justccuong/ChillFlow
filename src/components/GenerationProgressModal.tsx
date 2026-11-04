import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, Loader2, Brain, Zap, Palette, ShieldCheck } from 'lucide-react';

export interface GenerationStep {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const GENERATION_STEPS: GenerationStep[] = [
  {
    id: 1,
    title: 'Phân tích đối tượng & insight ngành',
    subtitle: 'Nghiên cứu insight tâm lý khách hàng và phân tích phân khúc mục tiêu',
    icon: Brain,
  },
  {
    id: 2,
    title: 'Tạo nội dung & thông điệp chuyển đổi',
    subtitle: 'Khởi tạo headline, agenda thực chiến, diễn giả và lợi ích độc quyền',
    icon: Zap,
  },
  {
    id: 3,
    title: 'Kiểm định & Tối ưu hóa CRO tự động (Score 90+)',
    subtitle: 'Phân tích ma trận tâm lý AIDA, tối ưu nút kêu gọi hành động & độ uy tín',
    icon: ShieldCheck,
  },
  {
    id: 4,
    title: 'Khớp nối giao diện & kho 12 Template',
    subtitle: 'Tự động chọn bố cục giao diện đỉnh cao phù hợp nhất với sự kiện',
    icon: Palette,
  },
];

interface GenerationProgressModalProps {
  isOpen: boolean;
  currentStep?: number;
  eventName?: string;
}

export const GenerationProgressModal: React.FC<GenerationProgressModalProps> = ({
  isOpen,
  currentStep = 1,
  eventName = 'Sự kiện của bạn',
}) => {
  const [internalStep, setInternalStep] = useState(currentStep);

  // Smooth automatic step progression simulation while waiting for generation
  useEffect(() => {
    if (!isOpen) {
      setInternalStep(1);
      return;
    }

    setInternalStep(Math.max(1, currentStep));

    const t1 = setTimeout(() => setInternalStep((s) => Math.max(s, 2)), 1100);
    const t2 = setTimeout(() => setInternalStep((s) => Math.max(s, 3)), 2400);
    const t3 = setTimeout(() => setInternalStep((s) => Math.max(s, 4)), 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen, currentStep]);

  if (!isOpen) return null;

  const activeStep = Math.min(4, Math.max(1, Math.max(currentStep, internalStep)));
  const progressPercent = Math.min(100, Math.round((activeStep / 4) * 100));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fade-in"
      data-lenis-prevent
    >
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>AI Pipeline & Auto-CRO Engine</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading">
            Đang khởi tạo trang sự kiện
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium truncate max-w-md mx-auto">
            {eventName ? `"${eventName}"` : 'Đang xử lý nội dung tối ưu...'}
          </p>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="relative z-10 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>Tiến độ hoàn thiện</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-mono">{progressPercent}%</span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-600 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 4 Generation Steps Stepper */}
        <div className="relative z-10 space-y-3 pt-2">
          {GENERATION_STEPS.map((step) => {
            const isCompleted = activeStep > step.id;
            const isCurrent = activeStep === step.id;
            const StepIcon = step.icon;

            return (
              <div
                key={step.id}
                className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 ${
                  isCurrent
                    ? 'bg-indigo-500/10 dark:bg-indigo-500/15 border-indigo-500/40 shadow-sm scale-[1.01]'
                    : isCompleted
                    ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                    : 'bg-transparent border-transparent opacity-40'
                }`}
              >
                {/* Step Status Icon */}
                <div className="shrink-0 mt-0.5">
                  {isCompleted ? (
                    <div className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-7 h-7 rounded-full bg-indigo-500 border border-indigo-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400 text-xs font-bold">
                      {step.id}
                    </div>
                  )}
                </div>

                {/* Step Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold ${
                        isCurrent
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : isCompleted
                          ? 'text-slate-800 dark:text-slate-200'
                          : 'text-slate-400'
                      }`}
                    >
                      Bước {step.id}: {step.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {step.subtitle}
                  </p>
                </div>

                {/* Sub icon */}
                <div className="shrink-0 hidden sm:block">
                  <StepIcon
                    className={`w-4 h-4 ${
                      isCurrent
                        ? 'text-indigo-500 animate-pulse'
                        : isCompleted
                        ? 'text-emerald-500'
                        : 'text-slate-400'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <p className="text-center text-[11px] text-slate-400 font-medium pt-1">
          Hệ thống đang áp dụng mô hình tâm lý AIDA để đảm bảo điểm CRO đạt tối thiểu 90/100
        </p>
      </div>
    </div>
  );
};
export default GenerationProgressModal;
