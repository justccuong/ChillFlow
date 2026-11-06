import React, { useState } from 'react';
import { Sparkles, Zap, Flame, Crown, Undo2, Check, Loader2, ChevronDown } from 'lucide-react';
import { rewriteCopyContent, RewriteStyle } from '../../services/aiService';
import { getSavedApiKey } from '../../services/storageService';

interface FloatingAiToolbarProps {
  currentText: string;
  originalText: string;
  onApplyText: (newText: string) => void;
  onRestoreOriginal: () => void;
  onClose: () => void;
  category?: string;
}

export const FloatingAiToolbar: React.FC<FloatingAiToolbarProps> = ({
  currentText,
  originalText,
  onApplyText,
  onRestoreOriginal,
  onClose,
  category,
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastStyleApplied, setLastStyleApplied] = useState<RewriteStyle | null>(null);

  const canUndo = currentText !== originalText;

  const handleRewrite = async (style: RewriteStyle) => {
    setIsLoading(true);
    setIsOpenMenu(false);
    try {
      const apiKey = getSavedApiKey();
      const rewritten = await rewriteCopyContent({
        text: currentText,
        style,
        apiKey,
        category,
      });

      if (rewritten && rewritten.trim() !== '') {
        onApplyText(rewritten);
        setLastStyleApplied(style);
      }
    } catch (err) {
      console.error('Failed to rewrite text:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onMouseDown={(e) => {
        // Prevent stealing focus from the editable text element
        e.preventDefault();
        e.stopPropagation();
      }}
      className="absolute -top-12 left-0 z-50 flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-indigo-500/50 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(99,102,241,0.3)] text-white text-xs select-none animate-in fade-in zoom-in-95 duration-150 font-sans tracking-normal normal-case"
      style={{ backgroundColor: '#090d16', letterSpacing: '0px', wordSpacing: 'normal' }}
    >
      {/* AI Rewrite Main Pill */}
      <div className="relative font-sans tracking-normal normal-case" style={{ letterSpacing: '0px', wordSpacing: 'normal' }}>
        <button
          type="button"
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-[11px] shadow-sm transition-all cursor-pointer disabled:opacity-50 font-sans tracking-normal normal-case"
          style={{ letterSpacing: '0px', wordSpacing: 'normal' }}
          title="Bấm để chọn phong cách AI viết lại nhanh"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-300" />
              <span className="text-amber-200">Đang biến đổi...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
              <span className="font-sans tracking-normal">AI Viết lại</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isOpenMenu ? 'rotate-180' : ''}`} />
            </>
          )}
        </button>

        {/* 3 Quick Presets Dropdown */}
        {isOpenMenu && !isLoading && (
          <div
            className="absolute top-full left-0 mt-2 w-64 p-2.5 rounded-xl bg-slate-950 border border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-150 ring-1 ring-white/15 font-sans tracking-normal normal-case"
            style={{ backgroundColor: '#090d16', letterSpacing: '0px', wordSpacing: 'normal' }}
          >
            <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-0.5 tracking-wider font-sans">
              Chọn kiểu biến đổi:
            </div>

            {/* 1. Ngắn gọn hơn */}
            <button
              type="button"
              onClick={() => handleRewrite('concise')}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-xs font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors cursor-pointer group font-sans tracking-normal normal-case"
              style={{ letterSpacing: '0px', wordSpacing: 'normal' }}
            >
              <div className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Zap className="w-3 h-3" />
              </div>
              <div className="flex-1 min-w-0 font-sans tracking-normal" style={{ letterSpacing: '0px', wordSpacing: 'normal' }}>
                <div className="font-semibold text-slate-100 flex items-center justify-between font-sans tracking-normal" style={{ letterSpacing: '0px', wordSpacing: 'normal' }}>
                  <span>Ngắn gọn hơn</span>
                  {lastStyleApplied === 'concise' && <span className="text-[9px] text-cyan-400 font-bold">Vừa dùng</span>}
                </div>
                <div className="text-[10px] text-slate-400 font-sans tracking-normal" style={{ letterSpacing: '0px', wordSpacing: 'normal' }}>Cô đọng, súc tích, đanh thép</div>
              </div>
            </button>

            {/* 2. Tăng tính khẩn cấp (FOMO) */}
            <button
              type="button"
              onClick={() => handleRewrite('fomo')}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-xs font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors cursor-pointer group font-sans tracking-normal normal-case"
              style={{ letterSpacing: '0px', wordSpacing: 'normal' }}
            >
              <div className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Flame className="w-3 h-3" />
              </div>
              <div className="flex-1 min-w-0 font-sans tracking-normal" style={{ letterSpacing: '0px', wordSpacing: 'normal' }}>
                <div className="font-semibold text-slate-100 flex items-center justify-between font-sans tracking-normal" style={{ letterSpacing: '0px', wordSpacing: 'normal' }}>
                  <span>Tăng tính khẩn cấp (FOMO)</span>
                  {lastStyleApplied === 'fomo' && <span className="text-[9px] text-amber-400 font-bold">Vừa dùng</span>}
                </div>
                <div className="text-[10px] text-slate-400 font-sans tracking-normal" style={{ letterSpacing: '0px', wordSpacing: 'normal' }}>Giới hạn vé, kích thích đăng ký ngay</div>
              </div>
            </button>

            {/* 3. Sang trọng hơn */}
            <button
              type="button"
              onClick={() => handleRewrite('luxury')}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-xs font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors cursor-pointer group font-sans tracking-normal normal-case"
              style={{ letterSpacing: '0px', wordSpacing: 'normal' }}
            >
              <div className="w-5 h-5 rounded-md bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Crown className="w-3 h-3" />
              </div>
              <div className="flex-1 min-w-0 font-sans tracking-normal" style={{ letterSpacing: '0px', wordSpacing: 'normal' }}>
                <div className="font-semibold text-slate-100 flex items-center justify-between font-sans tracking-normal" style={{ letterSpacing: '0px', wordSpacing: 'normal' }}>
                  <span>Sang trọng hơn</span>
                  {lastStyleApplied === 'luxury' && <span className="text-[9px] text-purple-400 font-bold">Vừa dùng</span>}
                </div>
                <div className="text-[10px] text-slate-400 font-sans tracking-normal" style={{ letterSpacing: '0px', wordSpacing: 'normal' }}>Đẳng cấp C-Level, vị thế cao cấp</div>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Undo Button */}
      {canUndo && (
        <button
          type="button"
          onClick={onRestoreOriginal}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-[11px] font-semibold transition-all cursor-pointer"
          title="Hoàn tác về văn bản ban đầu"
        >
          <Undo2 className="w-3 h-3 text-amber-400" />
          <span>Hoàn tác</span>
        </button>
      )}

      {/* Finish / Done button */}
      <button
        type="button"
        onClick={onClose}
        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-semibold transition-all cursor-pointer border border-emerald-500/30"
        title="Lưu thay đổi"
      >
        <Check className="w-3 h-3 text-emerald-400" />
        <span>Xong</span>
      </button>
    </div>
  );
};
