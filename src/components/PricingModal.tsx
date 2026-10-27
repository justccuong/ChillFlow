import React, { useState } from 'react';
import { X, Check, Crown, Zap, PlayCircle, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Code } from 'lucide-react';
import { getCurrentUser, upgradeTier, addAdCredit } from '../services/authService';
import { UserProfile, UserTier } from '../types';
import confetti from 'canvas-confetti';
import { NumberTicker } from './magicui';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: string;
  onUpgraded?: (user: UserProfile) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  reason,
  onUpgraded
}) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(getCurrentUser());
  const [isWatchingAd, setIsWatchingAd] = useState(false);
  const [adProgress, setAdProgress] = useState(0);
  const [adSuccess, setAdSuccess] = useState(false);

  if (!isOpen) return null;

  const currentCount = currentUser.publishedPageSlugs?.length || 0;
  const maxFree = (currentUser.freePagesLimit || 2) + (currentUser.extraCredits || 0);

  const handleSelectTier = (tier: UserTier) => {
    const updated = upgradeTier(tier);
    setCurrentUser(updated);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
    if (onUpgraded) onUpgraded(updated);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleWatchRewardedAd = () => {
    setIsWatchingAd(true);
    setAdProgress(0);
    setAdSuccess(false);

    const interval = setInterval(() => {
      setAdProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          const updated = addAdCredit();
          setCurrentUser(updated);
          setIsWatchingAd(false);
          setAdSuccess(true);
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 }
            });
          } catch {}
          if (onUpgraded) onUpgraded(updated);
          return 100;
        }
        return prev + 25;
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Top Gradient Banner */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Mô hình thương mại & bảng giá SaaS</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Nâng cấp ConvertFlow AI để mở rộng sự kiện
          </h2>
          <p className="mt-1 text-sm text-indigo-100 max-w-xl mx-auto">
            {reason || `Bạn hiện đang dùng gói ${currentUser.tier.toUpperCase()} (${currentCount}/${maxFree} trang). Chọn gói phù hợp với quy mô sự kiện của bạn.`}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* TIER 1: FREE */}
            <div className={`relative rounded-2xl border p-6 flex flex-col justify-between transition-all ${
              currentUser.tier === 'free'
                ? 'border-indigo-400 dark:border-indigo-600 bg-indigo-50/30 dark:bg-indigo-950/20 shadow-md'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850'
            }`}>
              {currentUser.tier === 'free' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Gói hiện tại
                </div>
              )}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Free Starter</h3>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <Zap className="w-4 h-4" />
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white"><NumberTicker value={0} />đ</span>
                  <span className="text-xs text-slate-500 ml-1">/ trọn đời</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                  Tuyệt vời để trải nghiệm và tổ chức 1-2 sự kiện workshop hoặc buổi giao lưu nhỏ.
                </p>
                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>{maxFree} trang sự kiện</strong> hoạt động cùng lúc</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>7 Layout Archetypes độc bản</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>In-place Visual CMS sửa nhanh</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px]">✕</span>
                    <span>Có huy hiệu ConvertFlow AI</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px]">✕</span>
                    <span>Không hỗ trợ Custom Domain</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled={currentUser.tier === 'free'}
                onClick={() => handleSelectTier('free')}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                {currentUser.tier === 'free' ? 'Đang kích hoạt' : 'Hạ cấp về Free'}
              </button>
            </div>

            {/* TIER 2: PRO (BEST VALUE) */}
            <div className={`relative rounded-2xl border-2 p-6 flex flex-col justify-between transition-all ${
              currentUser.tier === 'pro'
                ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/30 shadow-xl'
                : 'border-indigo-500/80 bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl'
            }`}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
                {currentUser.tier === 'pro' ? 'Gói hiện tại' : 'Phổ biến nhất'}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Pro Creator</h3>
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Crown className="w-4 h-4" />
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white"><NumberTicker value={249000} />đ</span>
                  <span className="text-xs text-slate-500 ml-1">/ tháng</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                  Dành cho diễn giả, agency tổ chức sự kiện chuyên nghiệp và các trung tâm đào tạo.
                </p>
                <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-200 border-t border-slate-100 dark:border-slate-800 pt-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Không giới hạn</strong> số trang sự kiện</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Gỡ sạch 100% Watermark</strong> ConvertFlow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Trỏ tên miền riêng (CNAME)</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>ConvertFlow CRO Power Pack (FOMO + Exit-Intent)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Phân tích CRO thời gian thực nâng cao</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSelectTier('pro')}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs transition-all shadow-md hover:shadow-indigo-500/30 flex items-center justify-center gap-1.5"
              >
                <span>{currentUser.tier === 'pro' ? 'Đã kích hoạt Pro' : 'Nâng cấp Pro ngay (1-Click)'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* TIER 3: VIP LIFETIME */}
            <div className={`relative rounded-2xl border p-6 flex flex-col justify-between transition-all ${
              currentUser.tier === 'vip'
                ? 'border-amber-500 bg-amber-50/40 dark:bg-amber-950/30 shadow-xl'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850'
            }`}>
              {currentUser.tier === 'vip' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
                  Gói hiện tại
                </div>
              )}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">VIP Pass</h3>
                  <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <Code className="w-4 h-4" />
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white"><NumberTicker value={990000} />đ</span>
                  <span className="text-xs text-slate-500 ml-1">/ sự kiện hoặc trọn đời</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                  Cho doanh nghiệp lớn & nhà phát triển muốn sở hữu trọn vẹn mã nguồn để tự host.
                </p>
                <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-200 border-t border-slate-100 dark:border-slate-800 pt-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span><strong>Mở khóa xuất mã nguồn (HTML/Tailwind)</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Toàn bộ quyền lợi gói Pro Creator</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Đồng bộ CRM Webhook (Google Sheets, Notion)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Hạ tầng Uptime 99.9% cho sự kiện &gt; 10.000 vé</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSelectTier('vip')}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-all shadow-md hover:shadow-amber-500/25 flex items-center justify-center gap-1.5"
              >
                <span>{currentUser.tier === 'vip' ? 'Đã kích hoạt VIP' : 'Kích hoạt VIP Lifetime'}</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* REWARDED AD OPTION (ZERO BUDGET ALTERNATIVE) */}
          <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white border border-indigo-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shrink-0">
                <PlayCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <span>Chưa muốn chi tiền? Xem 1 video tài trợ ngắn</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                    +1 trang Free
                  </span>
                </h4>
                <p className="text-xs text-slate-300">
                  Ủng hộ nhà tài trợ 15 giây để nhận thêm 1 hạn mức trang mà không tốn phí.
                </p>
              </div>
            </div>

            <div className="w-full sm:w-auto shrink-0">
              {isWatchingAd ? (
                <div className="w-48 bg-slate-800 rounded-xl p-2 border border-slate-700">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-300">Đang phát clip...</span>
                    <span className="font-mono text-indigo-400">{adProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full transition-all duration-300"
                      style={{ width: `${adProgress}%` }}
                    />
                  </div>
                </div>
              ) : adSuccess ? (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-800/60">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đã nhận +1 trang thành công!</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleWatchRewardedAd}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs transition-all shadow hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <PlayCircle className="w-4 h-4 text-indigo-600" />
                  <span>Xem quảng cáo nhận Credit</span>
                </button>
              )}
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Thanh toán an toàn 100%
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-500" /> Hủy gói bất cứ lúc nào
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> Kích hoạt tính năng ngay lập tức
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
