import React from 'react';
import type { ThemeConfig } from '../../../types';
import { Palette } from 'lucide-react';

interface CreativeProps {
  theme: ThemeConfig;
}

export const CreativeMasonrySection: React.FC<CreativeProps> = () => {
  const processSteps = [
    { step: '01', title: 'Khám phá & định vị visual', desc: 'Xây dựng Moodboard, phân tích Persona và xác lập quy chuẩn thẩm mỹ.' },
    { step: '02', title: 'Kiến trúc Design System', desc: 'Thiết lập Token, Typography Matrix, Spacing và thư viện Component tái sử dụng.' },
    { step: '03', title: 'Micro-Interactions & 3D UI', desc: 'Tích hợp animation tinh tế với GSAP, Framer Motion và Spline 3D viewport.' },
    { step: '04', title: 'Thử nghiệm & đóng gói case study', desc: 'Đánh giá khả năng tiếp cận (a11y), đo đạc CRO và hoàn thiện bài trình diễn Portfolio.' },
  ];

  return (
    <section className="py-16 bg-pink-50/40 dark:bg-slate-950 border-y border-purple-200 dark:border-purple-500/20 text-slate-900 dark:text-slate-100 relative overflow-hidden transition-colors" data-reveal>
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-pink-600 dark:text-pink-400 flex items-center justify-center gap-1.5">
            <Palette className="w-4 h-4 text-pink-500" /> CREATIVE PROCESS CANVAS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Quy trình sáng tạo từ ý tưởng đến tác phẩm hoàn chỉnh
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Học viên sẽ được trực tiếp thực hành 4 giai đoạn thiết kế tiêu chuẩn studio quốc tế.
          </p>
        </div>

        {/* 4 Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((pr, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-500/20 hover:border-pink-500/40 shadow-md dark:shadow-xl space-y-3 transition-transform hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-heading font-black text-white text-lg shadow-lg">
                {pr.step}
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">{pr.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{pr.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
