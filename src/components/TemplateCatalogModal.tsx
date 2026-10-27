import React from 'react';
import { X, Sparkles, Check, ArrowRight, Palette, Layers, Award } from 'lucide-react';
import { TEMPLATE_LIBRARY } from '../services/templateRegistry';
import { EventCategory } from '../types';

interface TemplateCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCategory: EventCategory;
  recommendedCategory?: EventCategory;
  onSelectTemplate: (cat: EventCategory) => void;
  eventName?: string;
}

export const TemplateCatalogModal: React.FC<TemplateCatalogModalProps> = ({
  isOpen,
  onClose,
  currentCategory,
  recommendedCategory = 'ai-tech',
  onSelectTemplate,
  eventName,
}) => {
  if (!isOpen) return null;

  // Split standard archetypes (first 6) and featured flagship (studio-3d)
  const standardTemplates = TEMPLATE_LIBRARY.filter(t => t.id !== 'studio-3d');
  const featuredTemplate = TEMPLATE_LIBRARY.find(t => t.id === 'studio-3d');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-900 dark:text-white transition-colors">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                <Palette className="w-4 h-4" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-heading tracking-tight text-slate-900 dark:text-white">
                Kho template sự kiện độc quyền
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Mỗi template sở hữu cấu trúc bố cục, nhịp điệu thị giác và các section chuyên biệt hoàn toàn khác biệt.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors shrink-0"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* AI Recommendation Banner if eventName exists */}
        {eventName && (
          <div className="px-5 sm:px-6 py-3 bg-indigo-50/70 dark:bg-indigo-950/40 border-b border-indigo-100 dark:border-indigo-900/50 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 animate-pulse" />
              <span className="text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-white">AI Matcher:</strong> Dựa trên chủ đề <span className="text-indigo-600 dark:text-indigo-300 font-bold">"{eventName}"</span>, đề xuất giao diện tối ưu:
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-indigo-600 text-white font-bold uppercase tracking-wider text-[11px] shadow-sm">
              {TEMPLATE_LIBRARY.find(t => t.id === recommendedCategory)?.name || 'Cyber Summit'}
            </span>
          </div>
        )}

        {/* Scrollable Template List */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 bg-slate-50/50 dark:bg-slate-950/40">
          
          {/* 6 Standard Archetypes (Neat 3x2 Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {standardTemplates.map((tpl) => {
              const isSelected = currentCategory === tpl.id;
              const isRecommended = recommendedCategory === tpl.id;

              return (
                <div
                  key={tpl.id}
                  onClick={() => {
                    onSelectTemplate(tpl.id);
                    onClose();
                  }}
                  className={`group relative rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer flex flex-col justify-between hover:-translate-y-0.5 ${
                    isSelected
                      ? 'bg-cyan-50/30 dark:bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/40 shadow-lg'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md'
                  }`}
                >
                  {/* Clean Visual Thumbnail Preview */}
                  <div className="relative h-36 w-full overflow-hidden bg-slate-900 shrink-0">
                    <img
                      src={tpl.previewThumbnail}
                      alt={tpl.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30" />

                    {/* Badge Chips floating on image */}
                    <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md border border-white/20 text-white shadow-sm">
                        {tpl.badge}
                      </span>

                      {isRecommended && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 flex items-center gap-1 shadow-sm shrink-0">
                          <Sparkles className="w-3 h-3 fill-slate-950" /> Đề xuất
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category Pill & Archetype Title */}
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] font-bold text-indigo-600 dark:text-cyan-400 uppercase tracking-wider">
                          {tpl.categoryLabel}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                            Đang dùng
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                        {tpl.name}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mt-1.5">
                        {tpl.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                      <div className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-indigo-500 dark:text-cyan-400" /> Điểm đặc trưng:
                      </div>
                      <ul className="space-y-1">
                        {tpl.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                            <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400 shrink-0" />
                            <span className="truncate">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <div
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-indigo-600 group-hover:text-white'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Đang kích hoạt</span>
                          </>
                        ) : (
                          <>
                            <span>Chọn giao diện này</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Featured Flagship Card: Cinematic 3D Studio (Full Width Banner) */}
          {featuredTemplate && (() => {
            const isSelected = currentCategory === featuredTemplate.id;
            const isRecommended = recommendedCategory === featuredTemplate.id;

            return (
              <div
                onClick={() => {
                  onSelectTemplate(featuredTemplate.id);
                  onClose();
                }}
                className={`group relative rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer flex flex-col md:flex-row hover:-translate-y-0.5 ${
                  isSelected
                    ? 'bg-cyan-50/40 dark:bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/40 shadow-xl'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg'
                }`}
              >
                {/* Horizontal Left Thumbnail Banner */}
                <div className="relative md:w-80 h-44 md:h-auto overflow-hidden bg-slate-950 shrink-0">
                  <img
                    src={featuredTemplate.previewThumbnail}
                    alt={featuredTemplate.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md border border-amber-400/40 text-amber-300 shadow-sm flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-400" /> AWWWARDS SOTD
                    </span>

                    {isRecommended && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3 fill-slate-950" /> Đề xuất
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> {featuredTemplate.categoryLabel}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                          Đang kích hoạt
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {featuredTemplate.name}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1 max-w-2xl">
                      {featuredTemplate.description}
                    </p>
                  </div>

                  {/* Feature Highlights Grid */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {featuredTemplate.features.slice(0, 4).map((f, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                          <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400 shrink-0" />
                          <span className="truncate">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-1 flex items-center justify-end">
                    <div
                      className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Đang kích hoạt không gian này</span>
                        </>
                      ) : (
                        <>
                          <span>Kích hoạt giao diện Cinematic 3D Studio</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Tất cả template đều tối ưu tỉ lệ chuyển đổi CRO và hỗ trợ Visual CMS chỉnh sửa trực tiếp.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold cursor-pointer transition-colors"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};

export default TemplateCatalogModal;
