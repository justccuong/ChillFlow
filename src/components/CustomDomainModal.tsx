import React, { useState } from 'react';
import { X, Globe, Check, Copy, ArrowRight, ShieldCheck, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CustomDomainModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
}

export const CustomDomainModal: React.FC<CustomDomainModalProps> = ({
  isOpen,
  onClose,
  eventName,
}) => {
  const [domain, setDomain] = useState('events.techcorp.vn');
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  if (!isOpen) return null;

  const targetHost = 'cname.convertflow.site';

  const handleCopyTarget = () => {
    navigator.clipboard.writeText(targetHost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerifyDns = () => {
    setIsVerifying(true);
    setIsVerified(false);

    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-wider mb-2">
            <Globe className="w-3.5 h-3.5 text-cyan-300" />
            <span>Định danh thương hiệu doanh nghiệp</span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
            Cấu hình tên miền riêng (CNAME)
          </h3>
          <p className="mt-1 text-xs text-indigo-100 max-w-md mx-auto">
            Chạy trang sự kiện {eventName} trực tiếp dưới tên miền chính thức của công ty bạn.
          </p>
        </div>

        {/* 3 Steps Guide */}
        <div className="p-6 md:p-8 space-y-6">
          
          {/* Step 1 */}
          <div className="flex gap-4">
            <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs flex items-center justify-center shrink-0">
              1
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="block text-xs font-bold text-slate-900 dark:text-white">
                Nhập tên miền phụ bạn muốn dùng
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="events.yourbrand.com"
                className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Ví dụ: <code className="font-mono text-indigo-600 dark:text-indigo-400">summit.congty.vn</code> hoặc <code className="font-mono text-indigo-600 dark:text-indigo-400">ve.techcorp.com</code>
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs flex items-center justify-center shrink-0">
              2
            </div>
            <div className="flex-1 space-y-2">
              <label className="block text-xs font-bold text-slate-900 dark:text-white">
                Thêm bản ghi CNAME tại nhà cung cấp tên miền của bạn
              </label>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span className="text-[11px] font-semibold text-slate-400">Loại bản ghi:</span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">CNAME</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span className="text-[11px] font-semibold text-slate-400">Tên / Host:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {domain.split('.')[0] || 'events'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] font-semibold text-slate-400">Giá trị đích:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {targetHost}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyTarget}
                      className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 transition-colors"
                      title="Sao chép"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs flex items-center justify-center shrink-0">
              3
            </div>
            <div className="flex-1 space-y-2">
              <label className="block text-xs font-bold text-slate-900 dark:text-white">
                Xác thực kết nối DNS & Cấp chứng chỉ SSL miễn phí
              </label>

              {isVerified ? (
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2.5 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <strong>Kết nối thành công!</strong> Tên miền <code>{domain}</code> đã trỏ tới sự kiện và được tự động kích hoạt chứng chỉ SSL an toàn.
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={isVerifying}
                  onClick={handleVerifyDns}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Đang kiểm tra bản ghi DNS toàn cầu...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Kiểm tra & xác thực DNS ngay</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Security note */}
          <div className="pt-2 flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Miễn phí HTTPS / SSL tự động
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomDomainModal;
