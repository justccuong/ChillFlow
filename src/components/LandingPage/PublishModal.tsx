import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Globe, Sparkles, ShieldCheck, Download } from 'lucide-react';
import { PublishedPageRecord } from '../../types';
import { getPublicShareUrl } from '../../services/publishService';
import confetti from 'canvas-confetti';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: PublishedPageRecord | null;
  onOpenCustomDomain: () => void;
  onExportSource: () => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  onClose,
  record,
  onOpenCustomDomain,
  onExportSource,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !record) return null;

  const publicUrl = getPublicShareUrl(record.slug);

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenLive = () => {
    window.open(publicUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Top vibrant gradient */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Xuất bản Online Thành Công</span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
            Trang Sự Kiện Của Bạn Đã Lên Sóng!
          </h3>
          <p className="mt-1 text-xs text-emerald-100 max-w-sm mx-auto">
            Người tham dự có thể truy cập, xem chương trình và đăng ký vé ngay lập tức.
          </p>
        </div>

        {/* Modal body */}
        <div className="p-6 md:p-8 space-y-6">
          
          {/* Shareable Link Box */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Đường link công khai chính thức
            </label>
            <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <input
                type="text"
                readOnly
                value={publicUrl}
                className="flex-1 bg-transparent text-xs font-mono text-slate-800 dark:text-slate-200 px-2 outline-none select-all truncate"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleOpenLive}
              className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs transition-all shadow flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
              <span>Mở trang trực tiếp</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCustomDomain();
              }}
              className="py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2"
            >
              <Globe className="w-4 h-4 text-indigo-500" />
              <span>Trỏ Custom Domain</span>
            </button>
          </div>

          {/* VIP Source Code Export Option */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Download className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Xuất mã nguồn trọn gói</span>
                  <span className="text-[10px] bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 font-extrabold px-1.5 py-0.2 rounded">VIP</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Tải 1 file HTML hoàn chỉnh tự chạy không cần server
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onExportSource();
              }}
              className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition-all shrink-0"
            >
              Tải HTML
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Tự động tối ưu SEO, OpenGraph và chuẩn di động</span>
          </div>

        </div>
      </div>
    </div>
  );
};
