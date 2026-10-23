import React from 'react';
import { XCircle, CheckCircle2, Zap } from 'lucide-react';
import type { ThemeConfig } from '../../../types';

interface MarketingBeforeAfterProps {
  theme: ThemeConfig;
  onScrollToRegister: () => void;
}

export const MarketingBeforeAfterSection: React.FC<MarketingBeforeAfterProps> = ({
  theme,
  onScrollToRegister,
}) => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors border-t border-slate-200/60 dark:border-slate-850" data-reveal>
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> BỨT PHÁ TĂNG TRƯỞNG THỰC CHIẾN
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-slate-900 dark:text-white">
            Sự khác biệt giữa cách làm cũ & framework mới
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Tại sao 90% chiến dịch marketing thất bại vì phụ thuộc vào ads, và cách các Unicorn scale doanh thu với ngân sách 0đ.
          </p>
        </div>

        {/* Before vs After Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CỘT CŨ (BEFORE) */}
          <div className="p-8 rounded-3xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-500/30 space-y-6 relative shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-red-200 dark:border-red-500/20">
              <span className="text-xs font-extrabold uppercase tracking-widest text-red-600 dark:text-red-400 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" /> CÁCH LÀM TRUYỀN THỐNG
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300">TỐN KÉM & BẾ TẮC</span>
            </div>

            <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>Đốt ngân sách vào chạy quảng cáo Facebook/Google nhưng tỉ lệ chuyển đổi dưới 1%.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>Khách hàng vào một lần rồi rời đi, chi phí CAC ngày càng tăng cao ăn mòn lợi nhuận.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>Không có quy trình phễu tự động, phụ thuộc hoàn toàn vào cảm tính cá nhân.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>Đội ngũ mất hàng tháng loay hoay thử nghiệm mà không có benchmark rõ ràng.</span>
              </li>
            </ul>
          </div>

          {/* CỘT MỚI (AFTER) */}
          <div className="p-8 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 space-y-6 relative shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-200 dark:border-emerald-500/20">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> GROWTH FRAMEWORK 2026
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">ĐỘT PHÁ & BỀN VỮNG</span>
            </div>

            <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Xây dựng Offer không thể từ chối và Landing Page tối ưu CRO đẩy CR vượt mốc 12%.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Chiến lược Viral Referral & Content Engine giúp kéo hàng nghìn Lead tự nhiên không tốn tiền ads.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Hệ thống Email Marketing & Nurturing Automation chuyển hóa khách hàng lạnh thành Fan trung thành.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Sở hữu trọn bộ 50+ Growth Templates & SOPs sẵn sàng áp dụng ngay sau workshop.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={onScrollToRegister}
            className={`px-8 py-4 rounded-xl font-bold text-base shadow-xl transition-all hover:scale-105 cursor-pointer ${theme.btnPrimary}`}
          >
            Đăng ký khóa học để áp dụng framework mới
          </button>
        </div>
      </div>
    </section>
  );
};
