import React, { useState, useEffect } from 'react';
import type { SponsorItem } from '../types';
import { X, Plus, Trash2, ShieldCheck, Check, Sparkles, RefreshCw } from 'lucide-react';

interface SponsorEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  sponsors: SponsorItem[];
  onSaveSponsors: (sponsors: SponsorItem[]) => void;
}

export const SPONSOR_PRESET_LIBRARY: SponsorItem[] = [
  { id: 'lib-openai', name: 'OpenAI', logoUrl: '/brands/openai.svg', role: 'AI Ecosystem Partner' },
  { id: 'lib-google', name: 'Google Cloud', logoUrl: '/brands/google.svg', role: 'Cloud Infrastructure' },
  { id: 'lib-microsoft', name: 'Microsoft', logoUrl: '/brands/microsoft.svg', role: 'Enterprise Partner' },
  { id: 'lib-claude', name: 'Anthropic Claude', logoUrl: '/brands/claude.svg', role: 'LLM Innovation' },
  { id: 'lib-meta', name: 'Meta', logoUrl: '/brands/meta.svg', role: 'Open Source AI' },
  { id: 'lib-stripe', name: 'Stripe', logoUrl: '/brands/stripe.svg', role: 'Payment Platform' },
  { id: 'lib-adobe', name: 'Adobe', logoUrl: '/brands/adobe.svg', role: 'Creative Tools' },
  { id: 'lib-perplexity', name: 'Perplexity', logoUrl: '/brands/perplexity.svg', role: 'AI Search Engine' },
  { id: 'lib-reddit', name: 'Reddit', logoUrl: '/brands/reddit.svg', role: 'Developer Community' },
  { id: 'lib-airbnb', name: 'Airbnb', logoUrl: '/brands/airbnb.svg', role: 'Hospitality Partner' },
];

export const SponsorEditorModal: React.FC<SponsorEditorModalProps> = ({
  isOpen,
  onClose,
  sponsors,
  onSaveSponsors,
}) => {
  const [currentList, setCurrentList] = useState<SponsorItem[]>(
    sponsors && sponsors.length > 0 ? sponsors : SPONSOR_PRESET_LIBRARY.slice(0, 8)
  );
  const [customName, setCustomName] = useState('');
  const [customRole, setCustomRole] = useState('');
  const [customLogo, setCustomLogo] = useState('');

  // Sync whenever modal opens or sponsors prop changes
  useEffect(() => {
    if (isOpen) {
      setCurrentList(sponsors && sponsors.length > 0 ? sponsors : SPONSOR_PRESET_LIBRARY.slice(0, 8));
    }
  }, [isOpen, sponsors]);

  if (!isOpen) return null;

  const handleAddPreset = (preset: SponsorItem) => {
    // Avoid duplicate names
    if (currentList.some(s => s.name.toLowerCase() === preset.name.toLowerCase())) {
      return;
    }
    const newItem: SponsorItem = {
      ...preset,
      id: 'sp-' + Date.now() + Math.random().toString(36).substring(2, 5),
    };
    setCurrentList([...currentList, newItem]);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newItem: SponsorItem = {
      id: 'sp-custom-' + Date.now(),
      name: customName.trim(),
      role: customRole.trim() || 'Đồng hành chuyên môn',
      logoUrl: customLogo.trim() || '/brands/openai.svg',
    };

    setCurrentList([...currentList, newItem]);
    setCustomName('');
    setCustomRole('');
    setCustomLogo('');
  };

  const handleDelete = (id: string) => {
    setCurrentList(currentList.filter(s => s.id !== id));
  };

  const handleResetDefault = () => {
    setCurrentList(SPONSOR_PRESET_LIBRARY.slice(0, 8));
  };

  const handleSave = () => {
    onSaveSponsors(currentList);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-colors">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Chỉnh Sửa Nhà Tài Trợ & Đối Tác</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Thêm, xóa hoặc tùy biến logo và danh vị đối tác hiển thị trên dải marquee</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* 1. Quick Add from Library */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Thêm nhanh từ thư viện thương hiệu:
              </span>
              <button
                type="button"
                onClick={handleResetDefault}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Mặc định
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {SPONSOR_PRESET_LIBRARY.map(item => {
                const isSelected = currentList.some(s => s.name.toLowerCase() === item.name.toLowerCase());
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleAddPreset(item)}
                    disabled={isSelected}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-50 cursor-not-allowed'
                        : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-500 cursor-pointer'
                    }`}
                  >
                    <img src={item.logoUrl} alt={item.name} className="h-3.5 w-auto object-contain dark:invert" />
                    <span>{item.name}</span>
                    {isSelected ? <Check className="w-3 h-3 text-emerald-500" /> : <Plus className="w-3 h-3 text-slate-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Add Custom Sponsor Form */}
          <form onSubmit={handleAddCustom} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Thêm đối tác tùy chỉnh khác:</span>
            <div className="grid sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Tên thương hiệu (VD: FPT Software)"
                value={customName}
                onChange={e => setCustomName(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Vai trò (VD: Cố vấn công nghệ)"
                value={customRole}
                onChange={e => setCustomRole(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="URL Logo (SVG hoặc ảnh)"
                  value={customLogo}
                  onChange={e => setCustomLogo(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!customName.trim()}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold shrink-0 disabled:opacity-50 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>

          {/* 3. Current Sponsors List */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
              Danh sách hiển thị trên Marquee ({currentList.length} đối tác):
            </span>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {currentList.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-750 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center p-1.5 shrink-0">
                      <img src={item.logoUrl} alt={item.name} className="max-h-full max-w-full object-contain dark:invert" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</div>
                      <div className="text-xs text-amber-600 dark:text-amber-400/90">{item.role}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Xóa đối tác này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
          >
            Lưu thay đổi ({currentList.length})
          </button>
        </div>
      </div>
    </div>
  );
};
