import React from 'react';
import { X, Sparkles, Check, ArrowRight, Palette, Layers } from 'lucide-react';
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-900 dark:text-white transition-colors">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-400/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Palette className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
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
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Recommendation Banner if eventName exists */}
        {eventName && (
          <div className="px-6 py-3 bg-gradient-to-r from-indigo-50 via-purple-50 to-slate-50 dark:from-indigo-900/60 dark:via-purple-900/40 dark:to-slate-900 border-b border-indigo-200 dark:border-indigo-500/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0 animate-pulse" />
              <span className="text-slate-700 dark:text-slate-200">
                <strong>AI Matcher:</strong> Dựa trên chủ đề <span className="text-indigo-600 dark:text-amber-300 font-semibold">"{eventName}"</span>, AI đề xuất template tối ưu nhất:
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 dark:bg-indigo-500/30 border border-indigo-400/40 text-indigo-700 dark:text-indigo-200 font-bold uppercase tracking-wider text-[11px]">
              {TEMPLATE_LIBRARY.find(t => t.id === recommendedCategory)?.name || 'Cyber Summit'}
            </span>
          </div>
        )}

        {/* Template Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-50/50 dark:bg-transparent">
          {TEMPLATE_LIBRARY.map((tpl) => {
            const isSelected = currentCategory === tpl.id;
            const isRecommended = recommendedCategory === tpl.id;

            return (
              <div
                key={tpl.id}
                onClick={() => {
                  onSelectTemplate(tpl.id);
                  onClose();
                }}
                className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white dark:bg-slate-850 border-cyan-500 shadow-xl ring-2 ring-cyan-500/30'
                    : 'bg-white dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg'
                }`}
              >
                {/* Thumbnail Cover */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={tpl.previewThumbnail}
                    alt={tpl.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-black/70 backdrop-blur-md border border-white/20 text-white">
                      {tpl.badge}
                    </span>

                    {isRecommended && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 flex items-center gap-1 shadow-md">
                        <Sparkles className="w-3 h-3 fill-slate-950" /> AI đề xuất
                      </span>
                    )}
                  </div>

                  {/* Bottom title in thumbnail */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                      {tpl.categoryLabel}
                    </div>
                    <h3 className="text-lg font-black text-white tracking-tight">
                      {tpl.name}
                    </h3>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {tpl.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                    <div className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Điểm đặc trưng:
                    </div>
                    <ul className="space-y-1 pl-1">
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
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 shadow-md'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:bg-indigo-600 group-hover:text-white'
                      }`}
                    >
                      <span>{isSelected ? 'Đang kích hoạt' : 'Chọn giao diện này'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
