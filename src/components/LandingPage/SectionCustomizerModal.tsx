import React from 'react';
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
import type { SectionVisibilityConfig } from '../../types';

interface SectionCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  visibility: SectionVisibilityConfig;
  onToggleSection: (key: keyof SectionVisibilityConfig) => void;
  onSetAll: (enable: boolean) => void;
  onResetDefaults: () => void;
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
}) => {
  if (!isOpen) return null;

  const enabledCount = Object.values(visibility).filter(Boolean).length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="customizer-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
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
                Đang bật {enabledCount}/{SECTION_DEFS.length} phần trên trang sự kiện
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
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">
            Thay đổi được áp dụng ngay lập tức
          </span>
        </div>

        {/* Section List */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1 divide-y divide-slate-100 dark:divide-slate-800/60">
          {SECTION_DEFS.map((def) => {
            const isEnabled = visibility[def.key] ?? true;
            const IconComponent = def.icon;

            return (
              <div
                key={def.key}
                className="pt-3.5 first:pt-0 flex items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isEnabled
                      ? 'bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
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
            );
          })}
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
