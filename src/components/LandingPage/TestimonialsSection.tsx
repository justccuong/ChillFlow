import React from 'react';
import type { ThemeConfig } from '../../types';
import { Star, Quote, Award } from 'lucide-react';

interface TestimonialsSectionProps {
  theme: ThemeConfig;
  targetAudience?: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
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

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ theme }) => {
  return (
    <section id="testimonials" className="py-24 px-4 md:px-8 bg-slate-950 text-white relative overflow-hidden">
      <div className="hairline-divider absolute top-0 inset-x-0"></div>

      {/* Subtle ambient light */}
      <div className={`ambient-glow-orb top-1/2 left-1/3 w-96 h-96 bg-gradient-to-tr ${theme.glowGradient} opacity-20`}></div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header - Editorial */}
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-[0.25em] text-slate-500 font-bold flex items-center justify-center gap-2">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>ĐÁNH GIÁ TỪ CỘNG ĐỒNG</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading text-white">
            Cảm Nhận Từ Khách Mời Các Mùa Trước
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
            Hơn 98% người tham dự đánh giá chương trình vượt mong đợi và sẵn sàng giới thiệu cho đồng nghiệp.
          </p>
        </div>

        {/* 3 Columns Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between group"
            >
              {/* Watermark Quote Icon */}
              <div className="absolute top-4 right-4 text-slate-800 group-hover:text-amber-500/20 transition-colors">
                <Quote className="w-8 h-8" />
              </div>

              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-300 text-sm leading-relaxed font-sans italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author info */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-slate-700 shadow-sm"
                />
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {t.name}
                  </h4>
                  <div className="text-xs text-slate-400">
                    {t.role} · <span className="text-slate-300 font-medium">{t.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
