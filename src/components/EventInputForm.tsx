import React, { useState } from 'react';
import type { EventInput, EventCategory } from '../types';
import { PRESETS } from '../services/aiService';
import { CATEGORIES } from '../services/themeEngine';
import { detectBestTemplate } from '../services/templateRegistry';
import { Calendar, MapPin, User, Target, Users, Sparkles, Layers, Cpu, TrendingUp, Rocket, Code2, Palette, GraduationCap, Box, Music, Activity, UtensilsCrossed, Globe, AlertCircle } from 'lucide-react';

const renderCategoryIcon = (id: EventCategory, className = 'w-6 h-6') => {
  switch (id) {
    case 'ai-tech':
      return <Cpu className={`${className} text-cyan-500`} />;
    case 'marketing':
      return <TrendingUp className={`${className} text-amber-500`} />;
    case 'startup':
      return <Rocket className={`${className} text-purple-500`} />;
    case 'developer':
      return <Code2 className={`${className} text-emerald-500`} />;
    case 'design':
      return <Palette className={`${className} text-pink-500`} />;
    case 'education':
      return <GraduationCap className={`${className} text-blue-500`} />;
    case 'studio-3d':
      return <Box className={`${className} text-amber-500`} />;
    case 'festival-music':
      return <Music className={`${className} text-fuchsia-500`} />;
    case 'sports-marathon':
      return <Activity className={`${className} text-orange-500`} />;
    case 'culinary-lifestyle':
      return <UtensilsCrossed className={`${className} text-yellow-500`} />;
    case 'community-career':
      return <Users className={`${className} text-sky-500`} />;
    case 'universal-showcase':
      return <Globe className={`${className} text-indigo-500`} />;
    default:
      return <Sparkles className={`${className} text-indigo-400`} />;
  }
};

const renderPresetIcon = (iconType: string) => {
  switch (iconType) {
    case 'ai': return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
    case 'marketing': return <TrendingUp className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />;
    case 'startup': return <Rocket className="w-3.5 h-3.5 text-purple-400" />;
    case 'design': return <Palette className="w-3.5 h-3.5 text-pink-400" />;
    case 'studio': return <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-300" />;
    default: return <Sparkles className="w-3.5 h-3.5 text-indigo-400" />;
  }
};

interface EventInputFormProps {
  initialData?: EventInput | null;
  onSubmit: (data: EventInput) => void;
  isLoading: boolean;
}

export const EventInputForm: React.FC<EventInputFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState<EventInput>(
    initialData || {
      eventName: '',
      category: 'ai-tech',
      eventDate: '',
      location: '',
      speakerName: '',
      speakerRole: '',
      speakerBio: '',
      earlyBirdDiscount: '',
      targetAudience: '',
      maxCapacity: 100,
    }
  );

  const [activePresetIndex, setActivePresetIndex] = useState<number | null>(0);
  const [formError, setFormError] = useState<string | null>(null);

  // Sync when initialData arrives from parent
  React.useEffect(() => {
    if (initialData && initialData.eventName) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleApplyPreset = (index: number) => {
    setActivePresetIndex(index);
    setFormData(PRESETS[index].data);
    setFormError(null);
  };

  const handleCategorySelect = (cat: EventCategory) => {
    setFormData(prev => ({ ...prev, category: cat }));
    setFormError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxCapacity' ? (value ? parseInt(value) : 100) : value,
    }));
    if (formError) setFormError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.eventName || !formData.eventName.trim()) {
      setFormError('Vui lòng nhập tên sự kiện hợp lệ.');
      return;
    }
    if (!formData.eventDate) {
      setFormError('Vui lòng chọn thời gian diễn ra sự kiện.');
      return;
    }
    if (!formData.location || !formData.location.trim()) {
      setFormError('Vui lòng nhập địa điểm tổ chức sự kiện.');
      return;
    }
    if (!formData.speakerName || !formData.speakerName.trim()) {
      setFormError('Vui lòng nhập tên diễn giả hoặc người dẫn dắt.');
      return;
    }
    if (formData.maxCapacity !== undefined && formData.maxCapacity <= 0) {
      setFormError('Sức chứa tối đa (số lượng vé) phải lớn hơn 0.');
      return;
    }
    setFormError(null);
    onSubmit(formData);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Header bar */}
      <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Thông tin sự kiện
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            AI sẽ sinh nội dung và Rule Engine tự động phối màu & bộ ảnh tương ứng
          </p>
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-500 dark:text-slate-400">Gợi ý mẫu:</span>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(idx)}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                activePresetIndex === idx
                  ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30 font-semibold'
                  : 'bg-slate-100/70 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 border-slate-200/60 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {renderPresetIcon(p.iconType)}
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form body */}
      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        {formError && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="font-medium">{formError}</span>
            </div>
            <button
              type="button"
              onClick={() => setFormError(null)}
              className="text-rose-500 hover:text-rose-700 dark:hover:text-rose-200 text-xs font-bold px-1.5 py-0.5 rounded cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Tên sự kiện */}
          <div className="md:col-span-2 space-y-1.5">
            <label htmlFor="eventName" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Tên sự kiện <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <input
              id="eventName"
              name="eventName"
              type="text"
              required
              value={formData.eventName}
              onChange={handleChange}
              placeholder="VD: Hội thảo Công nghệ & AI Summit 2026"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Thời gian */}
          <div className="space-y-1.5">
            <label htmlFor="eventDate" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" /> Thời gian tổ chức <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <input
              id="eventDate"
              name="eventDate"
              type="datetime-local"
              required
              value={formData.eventDate}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Địa điểm */}
          <div className="space-y-1.5">
            <label htmlFor="location" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" /> Địa điểm <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="VD: Toà nhà Innovation, Cầu Giấy hoặc Online qua Zoom"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

        </div>

        {/* Category / Theme Selector - Option A: Compact Icon Chips */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" /> Loại sự kiện & phong cách theme
            </label>

            {/* Muted Inline AI Recommendation */}
            {formData.eventName && formData.category !== detectBestTemplate(formData.eventName, formData.targetAudience).id && (
              <div className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 px-2.5 py-1 rounded-lg animate-in fade-in">
                <Sparkles className="w-3 h-3 text-amber-500 shrink-0 animate-pulse" />
                <span>AI đề xuất: <strong className="text-indigo-600 dark:text-indigo-300">{detectBestTemplate(formData.eventName, formData.targetAudience).name}</strong></span>
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, category: detectBestTemplate(formData.eventName, formData.targetAudience).id }))}
                  className="text-indigo-600 dark:text-cyan-400 hover:underline font-bold text-[11px] cursor-pointer ml-0.5"
                >
                  Áp dụng
                </button>
              </div>
            )}
          </div>

          {/* Compact Icon Chips (Option A) */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => {
              const isSelected = formData.category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm shadow-indigo-500/25 ring-2 ring-indigo-500/20'
                      : 'bg-slate-100/80 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {renderCategoryIcon(cat.id, 'w-3.5 h-3.5')}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Diễn giả */}
          <div className="space-y-1.5">
            <label htmlFor="speakerName" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" /> Diễn giả chính <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <input
              id="speakerName"
              name="speakerName"
              type="text"
              required
              value={formData.speakerName}
              onChange={handleChange}
              placeholder="VD: TS. Nguyễn Minh Hoàng"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Chức danh diễn giả */}
          <div className="space-y-1.5">
            <label htmlFor="speakerRole" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Chức danh / Tổ chức
            </label>
            <input
              id="speakerRole"
              name="speakerRole"
              type="text"
              value={formData.speakerRole}
              onChange={handleChange}
              placeholder="VD: Trưởng bộ phận AI Research"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

                    {/* Đối tượng mục tiêu & Sức chứa */}
          <div className="space-y-1.5">
            <label htmlFor="targetAudience" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" /> Khán giả mục tiêu
            </label>
            <input
              id="targetAudience"
              name="targetAudience"
              type="text"
              value={formData.targetAudience}
              onChange={handleChange}
              placeholder="VD: Software Engineers, Marketers"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="maxCapacity" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" /> Giới hạn số lượng vé
            </label>
            <input
              id="maxCapacity"
              name="maxCapacity"
              type="number"
              min={10}
              max={1000}
              value={formData.maxCapacity || 100}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Đang phân tích thông tin & tối ưu CRO...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                Tạo trang sự kiện & tối ưu chuyển đổi
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
