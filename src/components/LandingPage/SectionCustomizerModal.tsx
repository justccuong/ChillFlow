import React, { useState } from 'react';
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
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Eye,
} from 'lucide-react';
import type { SectionVisibilityConfig, EventInput, GeneratedContent, CROEvaluation } from '../../types';
import { getSectionLayoutMetadata, SectionWireframePreview } from './SectionWireframePreview';
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
  description: string;
  icon: React.FC<{ className?: string }>;
}

const SECTION_DEFS: SectionDef[] = [
  {
    key: 'hero',
    label: 'Hero Banner',
    description: 'Tiêu đề chính, đếm ngược thời gian, hình ảnh chủ đạo và nút đăng ký nhanh',
    icon: Layout,
  },
  {
    key: 'trustBar',
    label: 'Nhà tài trợ & Đối tác',
    description: 'Logo các đơn vị đồng hành, bảo trợ truyền thông tăng độ uy tín',
    icon: Award,
  },
  {
    key: 'benefits',
    label: 'Quyền lợi & Lợi ích',
    description: 'Các điểm nổi bật, giá trị thực tiễn nhận được khi tham dự sự kiện',
    icon: CheckCircle2,
  },
  {
    key: 'categorySection',
    label: 'Nội dung chuyên ngành',
    description: 'Phần hiển thị đặc thù (Showcase 3D, Code Sandbox, Syllabus, Pitch Roster...)',
    icon: Sparkles,
  },
  {
    key: 'speaker',
    label: 'Diễn giả & Khách mời',
    description: 'Chân dung, danh xưng, tiểu sử và kinh nghiệm của diễn giả/khách mời',
    icon: User,
  },
  {
    key: 'agenda',
    label: 'Lịch trình sự kiện',
    description: 'Lộ trình làm việc, khung giờ chi tiết các phiên và hands-on workshop',
    icon: Clock,
  },
  {
    key: 'testimonials',
    label: 'Đánh giá & Cảm nhận',
    description: 'Lời chứng thực, đánh giá chất lượng từ khách mời các mùa trước',
    icon: MessageSquare,
  },
  {
    key: 'gallery',
    label: 'Bento Gallery ảnh',
    description: 'Hình ảnh thực tế hội trường, sân khấu và không khí sôi động',
    icon: Image,
  },
  {
    key: 'faq',
    label: 'Câu hỏi thường gặp',
    description: 'Giải đáp thắc mắc về tài liệu, hình thức tham gia và ưu đãi',
    icon: HelpCircle,
  },
  {
    key: 'registration',
    label: 'Form đăng ký vé',
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
  const [expandedSectionKey, setExpandedSectionKey] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'sections' | 'preview'>('sections');

  if (!isOpen) return null;

  const enabledCount = Object.values(visibility).filter(Boolean).length;

  const toggleExpand = (key: string) => {
    setExpandedSectionKey(prev => (prev === key ? null : key));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-lenis-prevent
      aria-labelledby="customizer-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-5xl lg:max-w-6xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 id="customizer-modal-title" className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                Tùy biến Bố cục & Section
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Đang bật {enabledCount}/{SECTION_DEFS.length} phần trên trang sự kiện • Bản thu nhỏ live cập nhật theo thao tác
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="px-6 py-3 bg-slate-100/60 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSetAll(true)}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 shadow-sm transition-all cursor-pointer"
            >
              Bật tất cả
            </button>
            <button
              type="button"
              onClick={onResetDefaults}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 shadow-sm transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Mặc định</span>
            </button>
          </div>
          <span className="text-slate-500 dark:text-slate-400 text-[11px] hidden sm:inline">
            Bật/tắt để thấy trang live cập nhật trực quan bên cạnh
          </span>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="md:hidden flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 px-4 py-2 gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setMobileTab('sections')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              mobileTab === 'sections'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            ⚙️ Cấu hình Section ({enabledCount})
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === 'preview'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>👁 Xem trước trang</span>
          </button>
        </div>

        {/* Main Content Area: Split 2 columns on md+ */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          {/* Left Column: Section List */}
          <div
            data-lenis-prevent
            className={`p-6 overflow-y-auto space-y-3.5 flex-1 divide-y divide-slate-100 dark:divide-slate-800/60 ${
              mobileTab === 'preview' ? 'hidden md:block' : 'block'
            }`}
          >
            {SECTION_DEFS.map((def) => {
              const isEnabled = visibility[def.key] ?? true;
              const IconComponent = def.icon;
              const isExpanded = expandedSectionKey === def.key;
              const layoutMeta = getSectionLayoutMetadata(def.key);

              return (
                <div key={def.key} className="pt-3.5 first:pt-0 group">
                  <div className="flex items-center justify-between gap-4">
                    <div
                      onClick={() => toggleExpand(def.key)}
                      className="flex items-start gap-3.5 min-w-0 cursor-pointer flex-1"
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isEnabled
                          ? 'bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold transition-colors ${
                            isEnabled ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500 line-through'
                          }`}>
                            {def.label}
                          </span>
                          {isEnabled && (
                            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              Hiển thị
                            </span>
                          )}
                          <span className="text-slate-400 dark:text-slate-500 hover:text-amber-500 text-xs flex items-center gap-0.5 ml-auto sm:ml-2">
                            <Eye className="w-3 h-3" />
                            <span className="text-[10px] font-medium hidden sm:inline">Chi tiết mẫu</span>
                            {isExpanded ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug line-clamp-1 mt-0.5">
                          {def.description}
                        </p>
                      </div>
                    </div>

                    {/* Switch Toggle */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isEnabled}
                      onClick={() => onToggleSection(def.key)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                        isEnabled ? 'bg-amber-500 dark:bg-amber-400' : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                      aria-label={`Bật/tắt ${def.label}`}
                    >
                      <div
                        className={`bg-white dark:bg-slate-900 w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                          isEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Visual Wireframe Preview Accordion Drawer */}
                  {isExpanded && (
                    <div className="mt-3 pl-12 pr-2 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Bản xem trước wireframe bố cục:
                        </span>
                        <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
                          <Lightbulb className="w-3 h-3" /> Chuẩn Awwwards & CRO
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {layoutMeta.layouts.map((layout) => (
                          <div
                            key={layout.id}
                            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900/90 space-y-2 hover:border-amber-500/50 transition-colors"
                          >
                            <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100">
                              <span>{layout.label}</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                                {layout.wireframeType}
                              </span>
                            </div>

                            {/* Mini Wireframe Visual Preview */}
                            <SectionWireframePreview wireframeType={layout.wireframeType} />

                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                              {layout.description}
                            </p>

                            <div className="text-[10px] text-amber-700 dark:text-amber-300/90 bg-amber-500/10 dark:bg-amber-400/10 rounded-lg p-1.5 flex items-start gap-1">
                              <span className="font-bold shrink-0">CRO:</span>
                              <span>{layout.croTip}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Mini Live Preview of Full Landing Page */}
          <div
            data-lenis-prevent
            className={`md:w-[380px] lg:w-[430px] md:border-l border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-950/40 p-4 flex flex-col overflow-y-auto shrink-0 ${
              mobileTab === 'sections' ? 'hidden md:flex' : 'flex'
            }`}
          >
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-200/80 dark:border-slate-800/80 shrink-0">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Bản xem trước trực tiếp
                </span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                Live Auto-sync
              </span>
            </div>

            {input && content ? (
              <div className="flex-1 flex justify-center w-full">
                <MiniLivePreview
                  input={input}
                  content={content}
                  cro={cro}
                  registeredCount={registeredCount}
                  visibility={visibility}
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
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-md"
          >
            Hoàn tất
          </button>
        </div>
      </div>
    </div>
  );
};
export default SectionCustomizerModal;
