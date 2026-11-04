import React from 'react';
import type { EventInput, GeneratedContent, ThemeConfig } from '../../../types';
import { CountdownTimer } from '../../CountdownTimer';
import { formatEventDate } from '../../../utils/date';
import { InlineEditable } from '../InlineEditable';
import { Calendar, MapPin, ArrowRight, GraduationCap, Star, Award, ShieldCheck, BookOpen, Layers } from 'lucide-react';

interface HeroProps {
  input: EventInput;
  content: GeneratedContent;
  theme: ThemeConfig;
  headlineToDisplay: string;
  onScrollToRegister: () => void;
  registeredCount: number;
  isEditMode?: boolean;
  onUpdateContentField?: (field: keyof GeneratedContent, val: any) => void;
  onUpdateInputField?: (field: keyof EventInput, val: any) => void;
  onSaveHeadline?: (val: string) => void;
}

export const AcademyHero: React.FC<HeroProps> = ({
  input,
  content,
  theme,
  headlineToDisplay,
  onScrollToRegister,
  registeredCount: _registeredCount,
  isEditMode = false,
  onUpdateContentField,
  onUpdateInputField,
  onSaveHeadline,
}) => {
  const cert = theme.certificateInfo || {
    certTitle: 'Professional Specialist Certificate',
    issuer: 'ConvertFlow Academy & FPT University EdTech Board',
    hours: 36,
    accreditation: 'Global Standard ISO/IEC 17024 Accredited',
  };

  const syllabusModules = [
    { week: 'Mod 01', title: 'Nền tảng & Tư duy kiến trúc', desc: 'Lý thuyết chuyên sâu và phân tích case studies' },
    { week: 'Mod 02', title: 'Thực hành Hands-on Lab', desc: 'Trực tiếp xây dựng sản phẩm mẫu cùng Mentor' },
    { week: 'Mod 03', title: 'Tối ưu Production & Capstone', desc: 'Triển khai dự án thực tế và bảo vệ đồ án' },
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-8">
      {/* Top Panoramic Editorial Header: Centered & Majestic */}
      <div className="max-w-5xl mx-auto text-center space-y-5">
        {/* Rating & Accreditation Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-bold text-blue-600 dark:text-blue-400">
            <GraduationCap className="w-4 h-4 text-blue-500" />
            <InlineEditable
              value={content.earlyBirdBadge || 'KHÓA HỌC THỰC CHIẾN // CHỨNG CHỈ QUỐC TẾ'}
              onSave={(val) => onUpdateContentField?.('earlyBirdBadge', val)}
              isEditMode={isEditMode}
              as="span"
              category={input.category}
            />
          </div>
          <div className="inline-flex items-center gap-1 text-xs text-amber-500 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>5.0 (420+ Học viên đánh giá)</span>
          </div>
        </div>

        {/* Majestic Centered Headline (Large & Impactful, Zero Kinetic Jitter) */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight font-heading leading-[1.12] text-slate-900 dark:text-white max-w-5xl mx-auto drop-shadow-sm text-center">
          <InlineEditable
            value={headlineToDisplay}
            onSave={(val) => (onSaveHeadline ? onSaveHeadline(val) : onUpdateContentField?.('headline', val))}
            isEditMode={isEditMode}
            as="h1"
            category={input.category}
            className="text-center"
          />
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-sans leading-relaxed max-w-3xl mx-auto text-center">
          <InlineEditable
            value={content.subHeadline}
            onSave={(val) => onUpdateContentField?.('subHeadline', val)}
            isEditMode={isEditMode}
            as="p"
            multiline
            category={input.category}
            className="text-center"
          />
        </p>

        {/* Date & Location Pill - Centered */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700 dark:text-slate-300 pt-1">
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-sm">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span className="font-semibold">{formatEventDate(input.eventDate)}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-sm">
            <MapPin className="w-4 h-4 text-blue-500" />
            <InlineEditable
              value={input.location}
              onSave={(val) => onUpdateInputField?.('location', val)}
              isEditMode={isEditMode}
              as="span"
              className="font-semibold"
              category={input.category}
            />
          </div>
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-sm">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span className="font-semibold">{cert.hours} giờ đào tạo thực chiến</span>
          </div>
        </div>
      </div>

      {/* Main Action & Roadmap Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto pt-2">
        {/* Left Column: CTA & Centered Hero Countdown (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6 text-center sm:text-left">
          {/* Prominent Academic Countdown */}
          <div className="flex justify-center sm:justify-start">
            <CountdownTimer targetDate={input.eventDate} size="hero" align="left" />
          </div>

          {/* CTA Button Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 justify-center sm:justify-start">
            <button
              type="button"
              onClick={onScrollToRegister}
              className={`w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5 group ${theme.btnPrimary}`}
            >
              <InlineEditable
                value={content.ctaButtonText || 'Đăng ký tham gia khóa học'}
                onSave={(val) => onUpdateContentField?.('ctaButtonText', val)}
                isEditMode={isEditMode}
                as="span"
                category={input.category}
              />
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Cấp chứng chỉ và tài liệu độc quyền trọn đời</span>
          </p>
        </div>

        {/* Right Column: Syllabus Roadmap Timeline Preview (lg:col-span-5) */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl p-5 bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-950 dark:to-blue-950/40 border border-blue-200 dark:border-blue-500/30 shadow-xl dark:shadow-2xl text-slate-900 dark:text-white space-y-4 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs">
              <span className="font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> LỘ TRÌNH ĐÀO TẠO
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 text-[10px] font-bold">
                ISO 17024
              </span>
            </div>

            {/* Modules List */}
            <div className="space-y-3">
              {syllabusModules.map((mod, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-blue-600 dark:text-blue-300">{mod.title}</span>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{mod.week}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">{mod.desc}</p>
                </div>
              ))}
            </div>

            {/* Official Certification Seal */}
            <div className="pt-2 flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-amber-600 dark:text-amber-300">Chứng nhận hoàn thành</div>
                <div className="text-[10px] text-slate-600 dark:text-slate-300">Cấp mã định danh xác thực quốc tế</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
