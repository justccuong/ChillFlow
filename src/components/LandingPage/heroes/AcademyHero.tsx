import React from 'react';
import type { EventInput, GeneratedContent, ThemeConfig } from '../../../types';
import { CountdownTimer } from '../../CountdownTimer';
import { Calendar, MapPin, ArrowRight, GraduationCap, Star, Award, CheckCircle, ShieldCheck, BookOpen } from 'lucide-react';

interface HeroProps {
  input: EventInput;
  content: GeneratedContent;
  theme: ThemeConfig;
  headlineToDisplay: string;
  onScrollToRegister: () => void;
  registeredCount: number;
}

export const AcademyHero: React.FC<HeroProps> = ({
  input,
  content,
  theme,
  headlineToDisplay,
  onScrollToRegister,
}) => {
  const cert = theme.certificateInfo || {
    certTitle: 'Professional Specialist Certificate',
    issuer: 'ConvertFlow Academy & FPT University EdTech Board',
    hours: 36,
    accreditation: 'Global Standard ISO/IEC 17024 Accredited',
  };

  return (
    <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
      {/* Left Column: Academy Bootcamp Copy */}
      <div className="lg:col-span-7 space-y-6">
        {/* Rating & Accreditation Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-bold text-blue-600 dark:text-blue-400">
            <GraduationCap className="w-4 h-4 text-blue-500" />
            <span>KHÓA HỌC THỰC CHIẾN // CHỨNG CHỈ QUỐC TẾ</span>
          </div>
          <div className="inline-flex items-center gap-1 text-xs text-amber-500 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>5.0 (420+ Học viên đánh giá)</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight text-slate-900 dark:text-white">
          {headlineToDisplay}
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
          {content.subHeadline}
        </p>

        {/* Date & Location Pill */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-sm">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span className="font-semibold">{input.eventDate}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-sm">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="font-semibold">{input.location}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-sm">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span className="font-semibold">{cert.hours} Giờ đào tạo thực chiến</span>
          </div>
        </div>

        {/* Floating Countdown */}
        <div className="pt-2">
          <CountdownTimer targetDate={input.eventDate} />
        </div>

        {/* CTA Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            type="button"
            onClick={onScrollToRegister}
            className={`px-8 py-4 rounded-xl text-base shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group ${theme.btnPrimary}`}
          >
            <span>{content.ctaButtonText || 'Nhận Giáo Trình & Giữ Chỗ'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Cấp bằng và tài liệu độc quyền trọn đời
          </span>
        </div>
      </div>

      {/* Right Column: Official Certificate of Completion Card */}
      <div className="lg:col-span-5">
        <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950/40 border-2 border-amber-400/40 p-6 sm:p-7 shadow-2xl text-white space-y-5">
          {/* Top Seal */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">CERTIFICATE OF COMPLETION</span>
            </div>
            <span className="text-[10px] bg-amber-400/10 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded font-mono">
              VERIFIED
            </span>
          </div>

          {/* Certificate Inner Preview */}
          <div className="text-center space-y-3 py-2 bg-slate-850/90 rounded-xl p-4 border border-slate-800">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Chứng nhận trao tặng cho</p>
            <div className="font-heading text-xl font-bold text-amber-300 border-b border-dashed border-amber-500/40 pb-2">
              Học Viên Xuất Sắc
            </div>
            <p className="text-xs text-slate-300">
              Đã hoàn thành toàn bộ khóa học chuyên sâu và đạt tiêu chuẩn đánh giá của hội đồng chuyên môn:
            </p>
            <p className="font-bold text-sm text-white">{input.eventName}</p>
          </div>

          {/* Issuer details */}
          <div className="flex items-center justify-between pt-1 text-xs text-slate-400">
            <div>
              <span className="block text-[10px] text-slate-500 uppercase">Đơn vị cấp chứng chỉ</span>
              <span className="font-semibold text-slate-200">{cert.issuer}</span>
            </div>
            <div className="text-right">
              <span className="block text-[10px] text-slate-500 uppercase">Thời lượng</span>
              <span className="font-semibold text-amber-300">{cert.hours} Giờ thực chiến</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-emerald-400">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>Có giá trị tích lũy CV, hồ sơ xin việc và chứng thực kỹ năng</span>
          </div>
        </div>
      </div>
    </div>
  );
};
