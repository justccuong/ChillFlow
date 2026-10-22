import React from 'react';
import { X, Sparkles, Check, ArrowRight, Palette, Layers } from 'lucide-react';
import { TEMPLATE_LIBRARY, TemplateDefinition } from '../services/templateRegistry';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
                <Palette className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white flex items-center gap-2">
                Kho Template Sự Kiện Độc Quyền
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Mỗi template sở hữu cấu trúc bố cục, nhịp điệu thị giác và các section chuyên biệt hoàn toàn khác biệt.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Recommendation Banner if eventName exists */}
        {eventName && (
          <div className="px-6 py-3 bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border-b border-indigo-500/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
              <span>
                <strong>AI Matcher:</strong> Dựa trên chủ đề <span className="text-amber-300 font-semibold">"{eventName}"</span>, AI đề xuất template tối ưu nhất:
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 font-bold uppercase tracking-wider text-[11px]">
              {TEMPLATE_LIBRARY.find(t => t.id === recommendedCategory)?.name || 'Cyber Summit'}
            </span>
          </div>
        )}

        {/* Template Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    ? 'bg-slate-850 border-cyan-400 shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)] ring-2 ring-cyan-400/30'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850/80 hover:shadow-xl'
                }`}
              >
                {/* Thumbnail Cover */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={tpl.previewThumbnail}
                    alt={tpl.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-black/70 backdrop-blur-md border border-white/20 text-white">
                      {tpl.badge}
                    </span>

                    {isRecommended && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 flex items-center gap-1 shadow-md">
                        <Sparkles className="w-3 h-3 fill-slate-950" /> AI Đề Xuất
                      </span>
                    )}
                  </div>

                  {/* Bottom title in thumbnail */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {tpl.categoryLabel}
                    </div>
                    <h3 className="text-lg font-black text-white tracking-tight">
                      {tpl.name}
                    </h3>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {tpl.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                    <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" /> Điểm đặc trưng:
                    </div>
                    <ul className="space-y-1 pl-1">
                      {tpl.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-slate-300">
                          <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 font-black'
                          : 'bg-white/10 group-hover:bg-white/20 text-white'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Đang áp dụng</span>
                        </>
                      ) : (
                        <>
                          <span>Chọn Template này</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Tất cả template đều tối ưu tỉ lệ chuyển đổi CRO & hỗ trợ Visual CMS trực tiếp.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
