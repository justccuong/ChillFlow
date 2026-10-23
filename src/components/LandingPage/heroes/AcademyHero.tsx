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
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Un-cramped Academy Copy (lg:col-span-8) */}
        <div className="lg:col-span-8 text-left space-y-5">
          {/* Rating & Accreditation Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-bold text-blue-600 dark:text-blue-400">
              <GraduationCap className="w-4 h-4 text-blue-500" />
              <span>KHÓA HỌC THỰC CHIẾN // CHỨNG CHỈ QUỐC TẾ</span>
            </div>
            <div className="inline-flex items-center gap-1 text-xs text-amber-500 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>5.0 (420+ Học viên đánh giá)</span>
            </div>
          </div>

          {/* Majestic, Un-cramped Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading leading-[1.18] text-slate-900 dark:text-white max-w-4xl drop-shadow-sm">
            <InlineEditable
              value={headlineToDisplay}
              onSave={(val) => (onSaveHeadline ? onSaveHeadline(val) : onUpdateContentField?.('headline', val))}
              isEditMode={isEditMode}
              as="span"
              category={input.category}
            />
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-sans leading-relaxed max-w-3xl">
            <InlineEditable
              value={content.subHeadline}
              onSave={(val) => onUpdateContentField?.('subHeadline', val)}
              isEditMode={isEditMode}
              as="span"
              multiline
              category={input.category}
            />
          </p>

          {/* Date & Location Pill */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
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
              <span className="font-semibold">{cert.hours} Giờ đào tạo thực chiến</span>
            </div>
          </div>

          {/* CTA Button Row */}
          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <button
              type="button"
              onClick={onScrollToRegister}
              className={`px-8 py-3.5 rounded-xl text-base shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5 group ${theme.btnPrimary}`}
            >
              <InlineEditable
                value={content.ctaButtonText || 'Đăng Ký Tham Gia Khóa Học'}
                onSave={(val) => onUpdateContentField?.('ctaButtonText', val)}
                isEditMode={isEditMode}
                as="span"
                category={input.category}
              />
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 px-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Cấp chứng chỉ và tài liệu độc quyền trọn đời
            </span>
          </div>

          {/* Prominent Academic Countdown */}
          <div className="pt-2">
            <CountdownTimer targetDate={input.eventDate} size="hero" align="left" />
          </div>
        </div>

        {/* Right Column: Syllabus Roadmap Timeline Preview (lg:col-span-4) */}
        <div className="lg:col-span-4 relative">
          <div className="relative rounded-3xl p-5 bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950/40 border border-blue-500/30 shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <span className="font-bold tracking-wider text-blue-400 uppercase flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> LỘ TRÌNH ĐÀO TẠO
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                ISO 17024
              </span>
            </div>

            {/* Modules List */}
            <div className="space-y-3">
              {syllabusModules.map((mod, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-blue-300">{mod.title}</span>
                    <span className="text-[10px] font-mono text-slate-400">{mod.week}</span>
                  </div>
                  <p className="text-[11px] text-slate-300">{mod.desc}</p>
                </div>
              ))}
            </div>

            {/* Official Certification Seal */}
            <div className="pt-2 flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-amber-300">Chứng nhận hoàn thành</div>
                <div className="text-[10px] text-slate-300">Cấp mã định danh xác thực quốc tế</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
