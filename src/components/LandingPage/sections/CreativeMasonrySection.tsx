import React from 'react';
import type { ThemeConfig } from '../../../types';
import { Palette, Layers, Sparkles, PenTool, Eye } from 'lucide-react';

interface CreativeProps {
  theme: ThemeConfig;
}

export const CreativeMasonrySection: React.FC<CreativeProps> = () => {
  const processSteps = [
    { step: '01', title: 'Khám Phá & Định Vị Visual', desc: 'Xây dựng Moodboard, phân tích Persona và xác lập quy chuẩn thẩm mỹ.' },
    { step: '02', title: 'Kiến Trúc Design System', desc: 'Thiết lập Token, Typography Matrix, Spacing và thư viện Component tái sử dụng.' },
    { step: '03', title: 'Micro-Interactions & 3D UI', desc: 'Tích hợp animation tinh tế với GSAP, Framer Motion và Spline 3D viewport.' },
    { step: '04', title: 'Thử Nghiệm & Đóng Gói Case Study', desc: 'Đánh giá khả năng tiếp cận (a11y), đo đạc CRO và hoàn thiện bài trình diễn Portfolio.' },
  ];

  return (
    <section className="py-16 bg-slate-900/40 dark:bg-slate-950 border-y border-purple-500/20 text-slate-100 relative overflow-hidden" data-reveal>
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-pink-400 flex items-center justify-center gap-1.5">
            <Palette className="w-4 h-4 text-pink-400" /> CREATIVE PROCESS CANVAS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
            Quy Trình Sáng Tạo Từ Ý Tưởng Đến Tác Phẩm Hoàn Chỉnh
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Học viên sẽ được trực tiếp thực hành 4 giai đoạn thiết kế tiêu chuẩn studio quốc tế.
          </p>
        </div>

        {/* 4 Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((pr, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-purple-500/20 hover:border-pink-500/40 shadow-xl space-y-3 transition-transform hover:-translate-y-1"
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
