import React from 'react';
import { DollarSign, TrendingUp, Shield } from 'lucide-react';
import type { ThemeConfig } from '../../../types';

interface StartupPitchingProps {
  theme: ThemeConfig;
  onScrollToRegister: () => void;
}

export const StartupPitchingRosterSection: React.FC<StartupPitchingProps> = ({
  theme,
  onScrollToRegister,
}) => {
  const startups = [
    { name: 'OmniAgent.ai', sector: 'Enterprise AI & Automation', round: 'Seed ($1.2M)', traction: 'ARR $350K • 28 Khách hàng B2B' },
    { name: 'FinFlow Pay', sector: 'Cross-border B2B Payments', round: 'Pre-Series A ($2.0M)', traction: 'GMV $14M/tháng • Tăng trưởng 25% MoM' },
    { name: 'BioCure Health', sector: 'MedTech & AI Diagnosis', round: 'Seed ($800K)', traction: 'Đã thử nghiệm lâm sàng tại 4 bệnh viện' },
    { name: 'GreenLogistics', sector: 'Clean Energy & Fleet Management', round: 'Pre-Series A ($1.8M)', traction: '1,200 phương tiện điện đang vận hành' },
    { name: 'EduVerse XR', sector: 'Immersive EdTech', round: 'Seed ($600K)', traction: '45,000 người dùng hàng tháng' },
    { name: 'CyberShield Sec', sector: 'Cloud Security & Zero-Trust', round: 'Seed ($1.5M)', traction: 'Hợp đồng bảo mật với 3 ngân hàng lớn' },
  ];

  const investors = [
    'Mekong Ventures', 'Sequoia SEA Alpha', 'Golden Gate Ventures', 'Vertex Southeast Asia', '500 Emerging Startups', 'East Ventures'
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors border-t border-slate-200/60 dark:border-slate-850" data-reveal>
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-300 flex items-center justify-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5" /> DEALFLOW & PITCHING PIPELINE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-slate-900 dark:text-white">
            Danh mục 6 doanh nghiệp pitching tiêu biểu
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Được tuyển chọn khắt khe từ hơn 180 hồ sơ đăng ký tham gia vòng thẩm định deal kín.
          </p>
        </div>

        {/* Startups Table Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {startups.map((st, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 hover:border-amber-400/40 transition-all space-y-3 shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  DEAL #{i + 1}
                </span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
                  {st.round}
                </span>
              </div>

              <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{st.name}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{st.sector}</p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{st.traction}</span>
              </div>
            </div>
          ))}
        </div>

        {/* VC Partners Banner */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6 text-center shadow-sm">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
              Hội đồng quỹ đầu tư & đối tác VCs tham dự
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Các đối tác quản lý quỹ trực tiếp tham gia hội đồng thẩm định</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {investors.map((inv, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-300 hover:border-amber-400/30 transition-colors shadow-sm"
              >
                {inv}
              </span>
            ))}
          </div>
        </div>

        {/* NDA & VIP Registration Pass */}
        <div className="p-8 rounded-3xl bg-amber-500/5 dark:bg-slate-900 border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 flex items-center justify-center text-amber-500 dark:text-amber-300 shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Thỏa thuận bảo mật thông tin (NDA) bắt buộc</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Toàn bộ dữ liệu tài chính của các startup pitching được bảo mật theo tiêu chuẩn Venture NDA quốc tế.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onScrollToRegister}
            className={`px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl transition-all hover:scale-105 cursor-pointer shrink-0 ${theme.btnPrimary}`}
          >
            Đăng Ký Tham Gia Dealflow VIP
          </button>
        </div>
      </div>
    </section>
  );
};
