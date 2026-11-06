import { InlineEditable } from '../InlineEditable';
import React, { useState, useEffect } from 'react';
import type { ThemeConfig } from '../../../types';
import { Palette } from 'lucide-react';

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

const DEFAULT_PROCESS_STEPS: ProcessStep[] = [
  { step: '01', title: 'Khám phá & định vị visual', desc: 'Xây dựng Moodboard, phân tích Persona và xác lập quy chuẩn thẩm mỹ.' },
  { step: '02', title: 'Kiến trúc Design System', desc: 'Thiết lập Token, Typography Matrix, Spacing và thư viện Component tái sử dụng.' },
  { step: '03', title: 'Micro-Interactions & 3D UI', desc: 'Tích hợp animation tinh tế với GSAP, Framer Motion và Spline 3D viewport.' },
  { step: '04', title: 'Thử nghiệm & đóng gói case study', desc: 'Đánh giá khả năng tiếp cận (a11y), đo đạc CRO và hoàn thiện bài trình diễn Portfolio.' },
];

const DEFAULT_TITLE = 'Quy trình sáng tạo từ ý tưởng đến tác phẩm hoàn chỉnh';
const DEFAULT_SUBTITLE = 'Học viên sẽ được trực tiếp thực hành 4 giai đoạn thiết kế tiêu chuẩn studio quốc tế.';

interface CreativeProps {
  isEditMode?: boolean;
  theme: ThemeConfig;
  title?: string;
  subTitle?: string;
  steps?: ProcessStep[];
  onUpdateSteps?: (steps: ProcessStep[]) => void;
  onUpdateTitle?: (title: string) => void;
  onUpdateSubTitle?: (subTitle: string) => void;
}

export const CreativeMasonrySection: React.FC<CreativeProps> = ({
  isEditMode = false,
  title: propTitle,
  subTitle: propSubTitle,
  steps: propSteps,
  onUpdateSteps,
  onUpdateTitle,
  onUpdateSubTitle,
}) => {
  const [title, setTitle] = useState(propTitle || DEFAULT_TITLE);
  const [subTitle, setSubTitle] = useState(propSubTitle || DEFAULT_SUBTITLE);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(
    propSteps && propSteps.length > 0 ? propSteps : DEFAULT_PROCESS_STEPS
  );

  useEffect(() => {
    if (propTitle) setTitle(propTitle);
    if (propSubTitle) setSubTitle(propSubTitle);
    if (propSteps && propSteps.length > 0) setProcessSteps(propSteps);
  }, [propTitle, propSubTitle, propSteps]);

  const handleSaveTitle = (val: string) => {
    setTitle(val);
    onUpdateTitle?.(val);
  };

  const handleSaveSubTitle = (val: string) => {
    setSubTitle(val);
    onUpdateSubTitle?.(val);
  };

  const handleUpdateStep = (idx: number, field: keyof ProcessStep, val: string) => {
    const updated = processSteps.map((s, i) => (i === idx ? { ...s, [field]: val } : s));
    setProcessSteps(updated);
    onUpdateSteps?.(updated);
  };

  return (
    <section className="py-20 bg-transparent border-y border-purple-200/40 dark:border-white/10 text-slate-900 dark:text-slate-100 relative overflow-hidden transition-colors" data-reveal>
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-pink-600 dark:text-pink-400 flex items-center justify-center gap-1.5">
            <Palette className="w-4 h-4 text-pink-500" /> CREATIVE PROCESS CANVAS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
            <InlineEditable
              value={title}
              onSave={handleSaveTitle}
              isEditMode={isEditMode}
              as="span"
            />
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            <InlineEditable
              value={subTitle}
              onSave={handleSaveSubTitle}
              isEditMode={isEditMode}
              as="span"
              multiline
            />
          </p>
        </div>

        {/* 4 Process Steps: Transparent Background & Larger Typography */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((pr, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-transparent border border-purple-300/40 dark:border-white/15 hover:border-pink-500/60 hover:bg-white/[0.04] dark:hover:bg-white/[0.03] space-y-4 transition-all duration-300 hover:-translate-y-1 backdrop-blur-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-heading font-black text-white text-xl shadow-lg shadow-purple-500/20">
                <InlineEditable
                  value={pr.step}
                  onSave={(val) => handleUpdateStep(idx, 'step', val)}
                  isEditMode={isEditMode}
                  as="span"
                />
              </div>

              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white leading-snug">
                <InlineEditable
                  value={pr.title}
                  onSave={(val) => handleUpdateStep(idx, 'title', val)}
                  isEditMode={isEditMode}
                  as="span"
                />
              </h3>

              <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                <InlineEditable
                  value={pr.desc}
                  onSave={(val) => handleUpdateStep(idx, 'desc', val)}
                  isEditMode={isEditMode}
                  as="span"
                  multiline
                />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreativeMasonrySection;
