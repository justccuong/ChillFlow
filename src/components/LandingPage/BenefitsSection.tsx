import React from 'react';
import type { BenefitItem, ThemeConfig } from '../../types';
import { Zap, Award, Target, ArrowRight } from 'lucide-react';

interface BenefitsSectionProps {
  benefits: BenefitItem[];
  theme: ThemeConfig;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ benefits, theme }) => {
  const b1 = benefits[0] || {
    title: 'Kiến Thức Thực Chiến 100%',
    description: 'Tiếp cận giải pháp và case study thực tế, áp dụng trực tiếp vào công việc ngay sau phiên học.',
  };
  const b2 = benefits[1] || {
    title: 'Đối Thoại Trực Tiếp Cùng Chuyên Gia',
    description: 'Hỏi đáp Q&A chuyên sâu 1-1 để giải quyết trực tiếp bài toán của bạn.',
  };
  const b3 = benefits[2] || {
    title: 'Tài Liệu & Bộ Công Cụ Độc Quyền',
    description: 'Toàn bộ slide, checklist và tài nguyên giá trị cao gửi trực tiếp về email của bạn.',
  };

  const items = [
    { num: '01', data: b1, icon: <Zap className="w-5 h-5" />, tag: 'Ứng dụng thực tiễn' },
    { num: '02', data: b2, icon: <Award className="w-5 h-5" />, tag: 'Đối thoại chuyên sâu' },
    { num: '03', data: b3, icon: <Target className="w-5 h-5" />, tag: 'Tài nguyên tải về' },
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors border-t border-slate-200/60 dark:border-slate-850">
      {/* Background ambient light */}
      <div className={`ambient-glow-orb top-1/2 -left-48 w-96 h-96 bg-gradient-to-tr ${theme.glowGradient} opacity-20 dark:opacity-30`}></div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header - Minimalist, No box */}
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.25em] text-slate-500 font-bold">
            GIÁ TRỊ CỐT LÕI
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white">
            Vì Sao Bạn Không Thể Bỏ Lỡ Sự Kiện Này?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Chương trình được thiết kế cô đọng, tập trung giải quyết trực tiếp những thách thức lớn nhất của bạn.
          </p>
        </div>

        {/* 3 Columns - Clean, Borderless, Typography & Watermark driven */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="relative group transition-all duration-300 hover:-translate-y-1"
            >
              {/* Subtle top hairline */}
              <div className="h-[2px] w-full bg-slate-200 dark:bg-slate-800/80 group-hover:bg-amber-400 transition-colors mb-6"></div>

              {/* Watermark Number */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl sm:text-5xl font-mono font-black text-slate-300 dark:text-slate-800 group-hover:text-amber-500 dark:group-hover:text-amber-400/90 transition-colors">
                  {item.num}
                </span>
                <div className={`w-9 h-9 rounded-full ${theme.accentBg} ${theme.accentColor} flex items-center justify-center`}>
                  {item.icon}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                  {item.data.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-sans">
                  {item.data.description}
                </p>
              </div>

              {/* Distinct contextual tag */}
              <div className="pt-4 flex items-center gap-1.5 text-xs text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                <span className="font-medium text-slate-500 dark:text-slate-400">{item.tag}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-amber-500 dark:text-amber-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
