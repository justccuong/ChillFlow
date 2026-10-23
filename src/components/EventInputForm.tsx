import React, { useState } from 'react';
import type { EventInput, EventCategory } from '../types';
import { PRESETS } from '../services/aiService';
import { CATEGORIES } from '../services/themeEngine';
import { detectBestTemplate } from '../services/templateRegistry';
import { Calendar, MapPin, User, Gift, Target, Users, Sparkles, Layers, Cpu, TrendingUp, Rocket, Code2, Palette, GraduationCap } from 'lucide-react';

const renderCategoryIcon = (id: EventCategory, className = 'w-6 h-6') => {
  switch (id) {
    case 'ai-tech':
      return <Cpu className={`${className} text-cyan-400`} />;
    case 'marketing':
      return <TrendingUp className={`${className} text-amber-400`} />;
    case 'startup':
      return <Rocket className={`${className} text-purple-400`} />;
    case 'developer':
      return <Code2 className={`${className} text-emerald-400`} />;
    case 'design':
      return <Palette className={`${className} text-pink-400`} />;
    case 'education':
      return <GraduationCap className={`${className} text-blue-400`} />;
    case 'studio-3d':
      return <Sparkles className={`${className} text-amber-300`} />;
    default:
      return <Sparkles className={`${className} text-indigo-400`} />;
  }
};

const renderPresetIcon = (iconType: string) => {
  switch (iconType) {
    case 'ai': return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
    case 'marketing': return <TrendingUp className="w-3.5 h-3.5 text-amber-400" />;
    case 'startup': return <Rocket className="w-3.5 h-3.5 text-purple-400" />;
    case 'design': return <Palette className="w-3.5 h-3.5 text-pink-400" />;
    case 'studio': return <Sparkles className="w-3.5 h-3.5 text-amber-300" />;
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

  // Sync when initialData arrives from parent
  React.useEffect(() => {
    if (initialData && initialData.eventName) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleApplyPreset = (index: number) => {
    setActivePresetIndex(index);
    setFormData(PRESETS[index].data);
  };

  const handleCategorySelect = (cat: EventCategory) => {
    setFormData(prev => ({ ...prev, category: cat }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxCapacity' ? (value ? parseInt(value) : 100) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.eventName || !formData.eventDate || !formData.location || !formData.speakerName) {
      alert('Vui lòng điền đầy đủ: Tên sự kiện, Thời gian, Địa điểm và Diễn giả');
      return;
    }
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
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
                activePresetIndex === idx
                  ? 'bg-indigo-600 text-white border-indigo-500 font-medium shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
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
        {/* Category / Theme Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" /> Loại sự kiện & Phong cách Theme
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                  formData.category === cat.id
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/15 text-indigo-900 dark:text-white ring-1 ring-indigo-500 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="mb-2 group-hover:scale-110 transition-transform">
                  {renderCategoryIcon(cat.id)}
                </div>
                <div className="text-xs font-bold leading-tight">{cat.label}</div>
              </button>
            ))}
          </div>

          {/* AI Auto-Detection Helper */}
          {formData.eventName && formData.category !== detectBestTemplate(formData.eventName, formData.targetAudience).id && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-700 dark:text-indigo-300 animate-in fade-in">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>
                  AI phân tích chủ đề hợp nhất với Template: <strong>{detectBestTemplate(formData.eventName, formData.targetAudience).name}</strong> ({detectBestTemplate(formData.eventName, formData.targetAudience).categoryLabel})
                </span>
              </span>
              <button
                type="button"
                onClick={() => setFormData(p => ({ ...p, category: detectBestTemplate(formData.eventName, formData.targetAudience).id }))}
                className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] transition-colors shrink-0 ml-2 cursor-pointer"
              >
                Tự động áp dụng
              </button>
            </div>
          )}
        </div>

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

          {/* Ưu đãi đăng ký sớm */}
          <div className="md:col-span-2 space-y-1.5">
            <label htmlFor="earlyBirdDiscount" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5 text-amber-500" /> Ưu đãi đăng ký sớm (Early Bird) <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <input
              id="earlyBirdDiscount"
              name="earlyBirdDiscount"
              type="text"
              required
              value={formData.earlyBirdDiscount}
              onChange={handleChange}
              placeholder="VD: Giảm 40% vé tham dự cho 50 người đăng ký đầu tiên"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
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
                Đang khởi tạo trang...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                Tạo trang sự kiện & Tối ưu chuyển đổi
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
