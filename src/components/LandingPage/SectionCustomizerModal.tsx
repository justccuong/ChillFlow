import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Sliders,
  RotateCcw,
  Layout,
  Award,
  CheckCircle2,
  User,
  Clock,
  Sparkles,
  Image,
  MessageSquare,
  HelpCircle,
  FileText,
} from 'lucide-react';
import type { SectionVisibilityConfig, EventInput, GeneratedContent, CROEvaluation } from '../../types';
import { MiniLivePreview } from './MiniLivePreview';

interface SectionCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  visibility: SectionVisibilityConfig;
  onToggleSection: (key: keyof SectionVisibilityConfig) => void;
  onSetAll: (enable: boolean) => void;
  onResetDefaults: () => void;
  input?: EventInput;
  content?: GeneratedContent;
  cro?: CROEvaluation;
  registeredCount?: number;
}

interface SectionDef {
  key: keyof SectionVisibilityConfig;
  label: string;
  shortLabel: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}

const SECTION_DEFS: SectionDef[] = [
  {
    key: 'hero',
    label: 'Hero Banner',
    shortLabel: 'Hero Banner',
    description: 'Tiêu đề chính, đếm ngược thời gian, hình ảnh chủ đạo và nút đăng ký nhanh',
    icon: Layout,
  },
  {
    key: 'trustBar',
    label: 'Nhà tài trợ & Đối tác',
    shortLabel: 'Nhà tài trợ',
    description: 'Logo các đơn vị đồng hành, bảo trợ truyền thông tăng độ uy tín',
    icon: Award,
  },
  {
    key: 'benefits',
    label: 'Quyền lợi & Lợi ích',
    shortLabel: 'Quyền lợi',
    description: 'Các điểm nổi bật, giá trị thực tiễn nhận được khi tham dự sự kiện',
    icon: CheckCircle2,
  },
  {
    key: 'categorySection',
    label: 'Nội dung chuyên ngành',
    shortLabel: 'Chuyên ngành',
    description: 'Phần hiển thị đặc thù (Showcase 3D, Code Sandbox, Syllabus, Pitch Roster...)',
    icon: Sparkles,
  },
  {
    key: 'speaker',
    label: 'Diễn giả & Khách mời',
    shortLabel: 'Diễn giả',
    description: 'Chân dung, danh xưng, tiểu sử và kinh nghiệm của diễn giả/khách mời',
    icon: User,
  },
  {
    key: 'agenda',
    label: 'Lịch trình sự kiện',
    shortLabel: 'Lịch trình',
    description: 'Lộ trình làm việc, khung giờ chi tiết các phiên và hands-on workshop',
    icon: Clock,
  },
  {
    key: 'testimonials',
    label: 'Đánh giá & Cảm nhận',
    shortLabel: 'Đánh giá',
    description: 'Lời chứng thực, đánh giá chất lượng từ khách mời các mùa trước',
    icon: MessageSquare,
  },
  {
    key: 'gallery',
    label: 'Bento Gallery ảnh',
    shortLabel: 'Bento Gallery',
    description: 'Hình ảnh thực tế hội trường, sân khấu và không khí sôi động',
    icon: Image,
  },
  {
    key: 'faq',
    label: 'Câu hỏi thường gặp',
    shortLabel: 'Hỏi đáp FAQ',
    description: 'Giải đáp thắc mắc về tài liệu, hình thức tham gia và ưu đãi',
    icon: HelpCircle,
  },
  {
    key: 'registration',
    label: 'Form đăng ký vé',
    shortLabel: 'Đăng ký vé',
    description: 'Biểu mẫu điền thông tin, giữ chỗ và tạo mã vé điện tử',
    icon: FileText,
  },
];

export const SectionCustomizerModal: React.FC<SectionCustomizerModalProps> = ({
  isOpen,
  onClose,
  visibility,
  onToggleSection,
  onSetAll,
  onResetDefaults,
  input,
  content,
  cro,
  registeredCount = 0,
}) => {
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  const [highlightColor, setHighlightColor] = useState<'amber' | 'red'>('amber');
  const [turningOffSectionKey, setTurningOffSectionKey] = useState<string | null>(null);
  const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const turningOffTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
      if (turningOffTimerRef.current) clearTimeout(turningOffTimerRef.current);
    };
  }, []);

  if (!isOpen) return null;

  const enabledCount = Object.values(visibility).filter(Boolean).length;

  const triggerHighlight = (key: string, color: 'amber' | 'red' = 'amber', durationMs = 600) => {
    if (highlightTimerRef.current) {
      clearTimeout(highlightTimerRef.current);
    }
    setHighlightColor(color);
    setHighlightedSection(key);
    highlightTimerRef.current = setTimeout(() => {
      setHighlightedSection(null);
    }, durationMs);
  };

  const handleTurnOff = (key: keyof SectionVisibilityConfig) => {
    if (turningOffTimerRef.current) {
      clearTimeout(turningOffTimerRef.current);
    }
    setTurningOffSectionKey(key);
    setHighlightColor('red');
    setHighlightedSection(key);

    // Phát sáng đỏ trong preview 500ms, rồi mới chính thức ẩn section (tương tự như xuất hiện)
    turningOffTimerRef.current = setTimeout(() => {
      onToggleSection(key);
      setTurningOffSectionKey(null);
      setHighlightedSection(null);
    }, 500);
  };

  const handleTurnOn = (key: keyof SectionVisibilityConfig) => {
    onToggleSection(key);
    triggerHighlight(key, 'amber', 700);
  };

  const handleSectionRowClick = (key: keyof SectionVisibilityConfig) => {
    if (turningOffSectionKey === key) return;
    const isCurrentlyEnabled = visibility[key] ?? true;

    if (!isCurrentlyEnabled) {
      handleTurnOn(key);
    } else {
      triggerHighlight(key, 'amber', 600);
    }
  };

  const handleToggleClick = (e: React.MouseEvent, key: keyof SectionVisibilityConfig) => {
    e.stopPropagation();
    if (turningOffSectionKey === key) return;
    const isCurrentlyEnabled = visibility[key] ?? true;

    if (isCurrentlyEnabled) {
      handleTurnOff(key);
    } else {
      handleTurnOn(key);
    }
  };

  const handleMouseEnter = (key: string) => {
    if (turningOffSectionKey) return;
    if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
    setHighlightColor('amber');
    setHighlightedSection(key);
  };

  const handleMouseLeave = () => {
    if (turningOffSectionKey) return;
    setHighlightedSection(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-lenis-prevent
      aria-labelledby="customizer-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-5xl lg:max-w-6xl h-[92vh] sm:h-[88vh] bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-3 sm:px-5 py-2.5 sm:py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <h3 id="customizer-modal-title" className="text-xs sm:text-sm md:text-base font-bold text-slate-900 dark:text-white font-heading">
                Tùy biến Bố cục & Section
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 hidden xs:block">
                Bật/tắt hiện hiệu ứng sáng trực quan trên trang xem trước
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* UNIFIED 2-COLUMN SPLIT VIEW (Unified on Mobile & Desktop) */}
        <div className="flex-1 flex flex-row min-h-0 overflow-hidden">
          {/* Left Column: Narrow Button Column (Tên + Icon + Switch) */}
          <div
            data-lenis-prevent
            className="w-[140px] xs:w-[160px] sm:w-[200px] md:w-[245px] shrink-0 border-r border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/60 p-2 sm:p-3 overflow-y-auto flex flex-col gap-1.5"
          >
            {/* Quick Actions at Top of Column */}
            <div className="flex items-center gap-1 pb-1.5 mb-0.5 border-b border-slate-200 dark:border-slate-800/80 shrink-0">
              <button
                type="button"
                onClick={() => onSetAll(true)}
                className="flex-1 py-1 px-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-[10px] sm:text-xs border border-slate-200 dark:border-slate-700 shadow-xs transition-all text-center cursor-pointer"
                title="Bật tất cả các section"
              >
                Bật tất cả
              </button>
              <button
                type="button"
                onClick={onResetDefaults}
                className="py-1 px-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-[10px] sm:text-xs border border-slate-200 dark:border-slate-700 shadow-xs transition-all flex items-center justify-center cursor-pointer"
                title="Khôi phục mặc định"
              >
                <RotateCcw className="w-3 h-3 text-slate-400" />
              </button>
            </div>

            {/* Section Items */}
            <div className="space-y-1.5 flex-1">
              {SECTION_DEFS.map((def) => {
                const isTurningOff = turningOffSectionKey === def.key;
                const isEnabled = isTurningOff ? true : (visibility[def.key] ?? true);
                const isHighlighted = highlightedSection === def.key;
                const IconComponent = def.icon;

                return (
                  <div
                    key={def.key}
                    onMouseEnter={() => handleMouseEnter(def.key)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleSectionRowClick(def.key)}
                    className={`w-full flex items-center justify-between gap-1 sm:gap-1.5 px-2 py-2 sm:px-2.5 sm:py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer select-none group ${
                      isTurningOff
                        ? 'bg-rose-500/15 dark:bg-rose-500/25 border-rose-500 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/50 scale-[1.02] shadow-sm'
                        : isHighlighted
                        ? 'bg-amber-500/15 dark:bg-amber-500/25 border-amber-500 text-amber-900 dark:text-amber-200 ring-2 ring-amber-500/50 scale-[1.02] shadow-sm'
                        : isEnabled
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-700/80 hover:border-amber-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-xs'
                        : 'bg-slate-100/60 dark:bg-slate-900/40 text-slate-400 dark:text-slate-500 border border-slate-200/40 dark:border-slate-800/40 opacity-60 hover:opacity-90'
                    }`}
                    role="button"
                    tabIndex={0}
                    title={
                      isEnabled
                        ? "Bấm để sáng vùng trên bản xem trước (hover trên laptop, chạm trên điện thoại)"
                        : "Bấm để bật section này"
                    }
                  >
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                      <IconComponent
                        className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                          isTurningOff
                            ? 'text-rose-500 scale-110'
                            : isHighlighted
                            ? 'text-amber-500 scale-110'
                            : isEnabled
                            ? 'text-amber-500/90 dark:text-amber-400'
                            : 'text-slate-400'
                        }`}
                      />
                      <span
                        className={`text-[11px] sm:text-xs font-semibold truncate transition-colors ${
                          !isEnabled && !isTurningOff ? 'line-through opacity-70' : ''
                        }`}
                      >
                        <span className="sm:hidden">{def.shortLabel}</span>
                        <span className="hidden sm:inline">{def.label}</span>
                      </span>
                    </div>

                    {/* Sleek Mini Switch */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isEnabled && !isTurningOff}
                      onClick={(e) => handleToggleClick(e, def.key)}
                      className={`w-6 h-3.5 sm:w-7 sm:h-4 rounded-full p-0.5 shrink-0 transition-colors cursor-pointer focus:outline-none focus:ring-1 ${
                        isTurningOff
                          ? 'bg-rose-500'
                          : isEnabled
                          ? 'bg-amber-500 dark:bg-amber-400'
                          : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                      aria-label={`Bật/tắt ${def.label}`}
                    >
                      <div
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white shadow-xs transform transition-transform ${
                          isEnabled && !isTurningOff ? 'translate-x-2.5 sm:translate-x-3' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Mini Live Preview of Full Landing Page */}
          <div
            data-lenis-prevent
            className="flex-1 bg-slate-100/80 dark:bg-slate-950/60 p-2 sm:p-4 flex flex-col min-w-0 overflow-y-auto scroll-smooth"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/80 dark:border-slate-800/80 shrink-0 text-xs">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      highlightColor === 'red' ? 'bg-rose-400' : 'bg-emerald-400'
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      highlightColor === 'red' ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                  />
                </span>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider truncate">
                  Xem trước giao diện
                </span>
              </div>
              <span
                className={`text-[10px] font-medium shrink-0 transition-colors ${
                  highlightColor === 'red'
                    ? 'text-rose-500 font-semibold'
                    : highlightedSection
                    ? 'text-amber-500 font-semibold'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {turningOffSectionKey
                  ? 'Đang tắt vùng section...'
                  : highlightedSection
                  ? 'Đang sáng vùng được chọn'
                  : 'Tự động cập nhật'}
              </span>
            </div>

            {input && content ? (
              <div className="flex-1 flex justify-center w-full min-h-0">
                <MiniLivePreview
                  input={input}
                  content={content}
                  cro={cro}
                  registeredCount={registeredCount}
                  visibility={visibility}
                  highlightedSection={highlightedSection}
                  highlightColor={highlightColor}
                  className="w-full shadow-lg"
                />
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                Chưa có dữ liệu để xem trước
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 sm:py-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shrink-0 z-10 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            Đang bật <strong className="text-amber-600 dark:text-amber-400">{enabledCount}/{SECTION_DEFS.length}</strong> phần
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-md text-center"
          >
            Hoàn tất
          </button>
        </div>
      </div>
    </div>
  );
};
export default SectionCustomizerModal;
