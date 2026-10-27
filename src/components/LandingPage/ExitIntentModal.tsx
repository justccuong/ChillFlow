import React, { useState, useEffect } from 'react';
import { X, Sparkles, Tag, ArrowRight, Gift, Check, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExitIntentModalProps {
  eventName: string;
  onClaimOffer: () => void;
  couponCode?: string;
  discountPercent?: number;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({
  eventName,
  onClaimOffer,
  couponCode = 'VIBE2026',
  discountPercent = 20,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if exit intent was already shown in this session
    const shownKey = `cf_exit_shown_${eventName.replace(/\s+/g, '_')}`;
    if (sessionStorage.getItem(shownKey)) {
      return;
    }

    // 1. Desktop: mouse leaves viewport top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 15) {
        sessionStorage.setItem(shownKey, 'true');
        setIsOpen(true);
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    };

    // 2. Mobile: Trap back button with history state
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      window.history.pushState('cf_intent', '', window.location.href);
      const handlePopState = () => {
        if (!sessionStorage.getItem(shownKey)) {
          sessionStorage.setItem(shownKey, 'true');
          setIsOpen(true);
        }
      };
      window.addEventListener('popstate', handlePopState);
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        document.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('popstate', handlePopState);
      };
    }

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [eventName]);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaim = () => {
    setIsOpen(false);
    onClaimOffer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Top vibrant header */}
        <div className="bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 p-6 text-white text-center relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-wider mb-2">
            <Gift className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
            <span>Quà tặng độc quyền trước khi rời đi</span>
          </div>

          <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
            Khoan đã! Đừng bỏ lỡ {eventName}
          </h3>
          <p className="mt-1 text-xs md:text-sm text-indigo-100 max-w-sm mx-auto">
            Nhận ngay Voucher giảm thêm {discountPercent}% & tài liệu tóm tắt đặc biệt từ diễn giả!
          </p>
        </div>

        {/* Modal body */}
        <div className="p-6 md:p-8 space-y-5 text-center">
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                Mã ưu đãi giảm {discountPercent}%
              </span>
              <span className="font-mono text-xl font-extrabold text-slate-900 dark:text-white tracking-widest">
                {couponCode}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5 shadow-sm transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Tag className="w-4 h-4 text-indigo-500" />
                  <span>Sao chép mã</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <p>
              Mã giảm giá chỉ có hiệu lực trong <strong>15 phút tới</strong> cho 10 người đăng ký tiếp theo.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={handleClaim}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Áp dụng mã & đặt vé ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 py-1 transition-colors"
            >
              Bỏ qua ưu đãi này và tiếp tục xem
            </button>
          </div>

          <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Hoàn tiền 100% nếu đổi lịch
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentModal;
