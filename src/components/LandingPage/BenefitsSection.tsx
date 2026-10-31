import React from 'react';
import type { BenefitItem, ThemeConfig } from '../../types';
import { Zap, Award, Target, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { InlineEditable } from './InlineEditable';

interface BenefitsSectionProps {
  benefits: BenefitItem[];
  theme: ThemeConfig;
  isEditMode?: boolean;
  onUpdateBenefit?: (index: number, field: keyof BenefitItem, val: string) => void;
  onAddBenefit?: () => void;
  onRemoveBenefit?: (index: number) => void;
  category?: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  benefits,
  theme,
  isEditMode = false,
  onUpdateBenefit,
  onAddBenefit,
  onRemoveBenefit,
  category = 'ai-tech',
}) => {
  const displayBenefits = benefits && benefits.length > 0 ? benefits : [
    {
      title: 'Kiến thức thực chiến 100%',
      description: 'Tiếp cận giải pháp và case study thực tế, áp dụng trực tiếp vào công việc ngay sau phiên học.',
      iconName: 'zap' as const,
    },
    {
      title: 'Đối thoại trực tiếp cùng chuyên gia',
      description: 'Hỏi đáp Q&A chuyên sâu 1-1 để giải quyết trực tiếp bài toán của bạn.',
      iconName: 'award' as const,
    },
    {
      title: 'Tài liệu & bộ công cụ độc quyền',
      description: 'Toàn bộ slide, checklist và tài nguyên giá trị cao gửi trực tiếp về email của bạn.',
      iconName: 'target' as const,
    },
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors border-t border-slate-200/60 dark:border-slate-850">
      {/* Background ambient light */}
      <div className={`ambient-glow-orb top-1/2 -left-48 w-96 h-96 bg-gradient-to-tr ${theme.glowGradient} opacity-20 dark:opacity-30`}></div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header - Minimalist */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] text-slate-500 font-bold">
              GIÁ TRỊ CỐT LÕI
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white">
              Vì sao bạn không thể bỏ lỡ sự kiện này?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Chương trình được thiết kế cô đọng, tập trung giải quyết trực tiếp những thách thức lớn nhất của bạn.
            </p>
          </div>

          {isEditMode && onAddBenefit && (
            <button
              type="button"
              onClick={onAddBenefit}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md self-start md:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm thẻ lợi ích</span>
            </button>
          )}
        </div>

        {/* Dynamic Responsive Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 relative">
          {displayBenefits.map((item, idx) => (
            <div
              key={idx}
              className="relative group transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Subtle top hairline */}
                <div className="h-[2px] w-full bg-slate-200 dark:bg-slate-800/80 group-hover:bg-amber-400 transition-colors mb-6"></div>

                {/* Watermark Number & Remove button */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl sm:text-5xl font-mono font-black text-slate-300 dark:text-slate-800 group-hover:text-amber-500 dark:group-hover:text-amber-400/90 transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-2">
                    {isEditMode && displayBenefits.length > 1 && onRemoveBenefit && (
                      <button
                        type="button"
                        onClick={() => onRemoveBenefit(idx)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                        title="Xóa thẻ lợi ích này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <div className={`w-9 h-9 rounded-full ${theme.accentBg} ${theme.accentColor} flex items-center justify-center`}>
                      <Zap className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Editable Title & Description */}
                <div className="space-y-2.5">
                  <InlineEditable
                    value={item.title}
                    onSave={(val) => onUpdateBenefit?.(idx, 'title', val)}
                    isEditMode={isEditMode}
                    as="h3"
                    className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors block"
                    category={category}
                  />
                  <InlineEditable
                    value={item.description}
                    onSave={(val) => onUpdateBenefit?.(idx, 'description', val)}
                    isEditMode={isEditMode}
                    as="p"
                    className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-sans block"
                    category={category}
                  />
                </div>
              </div>

              {/* Distinct contextual tag */}
              <div className="pt-5 flex items-center gap-1.5 text-xs text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                <span className="font-medium text-slate-500 dark:text-slate-400">Ứng dụng thực tiễn</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-amber-500 dark:text-amber-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default BenefitsSection;
