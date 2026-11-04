import React from 'react';
import type { ThemeConfig, TestimonialItem } from '../../types';
import { Star, Quote, Award, Plus, Trash2 } from 'lucide-react';
import { InlineEditable } from './InlineEditable';

interface TestimonialsSectionProps {
  theme: ThemeConfig;
  targetAudience?: string;
  testimonials?: TestimonialItem[];
  isEditMode?: boolean;
  onUpdateTestimonial?: (index: number, field: keyof TestimonialItem, value: any) => void;
  onAddTestimonial?: () => void;
  onRemoveTestimonial?: (index: number) => void;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    name: 'Nguyễn Văn Minh',
    role: 'Principal Engineer',
    company: 'FPT Software',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    quote: 'Nội dung thực chiến, không lý thuyết suông. Mình áp dụng ngay mô hình workflow vào dự án công ty ngay tuần sau đó và giảm 40% thời gian xử lý!',
    rating: 5,
  },
  {
    name: 'Trần Thị Thu Hà',
    role: 'Head of Growth',
    company: 'Fintech Startup',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    quote: 'Phần Q&A 1-1 với diễn giả cực kỳ giá trị. Bài toán hóc búa của team mình được gỡ rối ngay tại chỗ chỉ trong 15 phút trao đổi.',
    rating: 5,
  },
  {
    name: 'Lê Hoàng Long',
    role: 'AI Product Lead',
    company: 'Tech Corp',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    quote: 'Bộ slide và tài liệu tặng kèm đáng giá hơn cả tiền vé. Sự kiện được tổ chức chuyên nghiệp, networking chất lượng với nhiều founder và kỹ sư hàng đầu.',
    rating: 5,
  },
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  theme,
  testimonials,
  isEditMode = false,
  onUpdateTestimonial,
  onAddTestimonial,
  onRemoveTestimonial,
}) => {
  const list = testimonials && testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;

  return (
    <section id="testimonials" className="py-24 px-4 md:px-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors border-t border-slate-200/60 dark:border-slate-850">
      <div className="hairline-divider absolute top-0 inset-x-0"></div>

      {/* Subtle ambient light */}
      <div className={`ambient-glow-orb top-1/2 left-1/3 w-96 h-96 bg-gradient-to-tr ${theme.glowGradient} opacity-15 dark:opacity-20`}></div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header - Editorial */}
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-[0.25em] text-slate-500 font-bold flex items-center justify-center gap-2">
            <Award className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <InlineEditable
              value="ĐÁNH GIÁ TỪ CỘNG ĐỒNG"
              isEditMode={isEditMode}
              as="span"
            />
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white">
            <InlineEditable
              value="Cảm nhận từ người tham gia"
              isEditMode={isEditMode}
              as="span"
            />
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
            <InlineEditable
              value="Hơn 98% người tham dự đánh giá chương trình vượt mong đợi và sẵn sàng giới thiệu cho đồng nghiệp."
              isEditMode={isEditMode}
              as="span"
              multiline
            />
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {list.map((t, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-850 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 hover:-translate-y-1.5 shadow-md hover:shadow-xl dark:shadow-2xl flex flex-col justify-between group"
            >
              {/* Delete button in edit mode */}
              {isEditMode && onRemoveTestimonial && list.length > 1 && (
                <button
                  type="button"
                  title="Xóa đánh giá này"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveTestimonial(idx);
                  }}
                  className="absolute top-3 left-3 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors z-20 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              {/* Watermark Quote Icon */}
              <div className="absolute top-4 right-4 text-slate-200 dark:text-slate-800 group-hover:text-amber-500/20 transition-colors">
                <Quote className="w-8 h-8" />
              </div>

              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {/* Quote */}
                <div className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-sans italic">
                  <InlineEditable
                    value={t.quote}
                    isEditMode={isEditMode}
                    multiline
                    onSave={(val) => onUpdateTestimonial?.(idx, 'quote', val)}
                  />
                </div>
              </div>

              {/* Author info */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-850 flex items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700 shadow-sm shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                    <InlineEditable
                      value={t.name}
                      isEditMode={isEditMode}
                      onSave={(val) => onUpdateTestimonial?.(idx, 'name', val)}
                    />
                  </h4>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 flex-wrap">
                    <InlineEditable
                      value={t.role}
                      isEditMode={isEditMode}
                      onSave={(val) => onUpdateTestimonial?.(idx, 'role', val)}
                    />
                    <span>•</span>
                    <InlineEditable
                      value={t.company}
                      isEditMode={isEditMode}
                      onSave={(val) => onUpdateTestimonial?.(idx, 'company', val)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Testimonial in Edit Mode */}
        {isEditMode && onAddTestimonial && (
          <div className="pt-8 text-center">
            <button
              type="button"
              onClick={onAddTestimonial}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-dashed border-amber-500/40 text-amber-600 dark:text-amber-400 hover:text-amber-500 hover:border-amber-400 hover:bg-amber-500/10 font-semibold text-sm transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm cảm nhận / Đánh giá</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
