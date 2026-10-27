import React from 'react';
import type { ThemeConfig, SponsorItem } from '../../types';
import { ShieldCheck, SlidersHorizontal, Sparkles } from 'lucide-react';
import { SPONSOR_PRESET_LIBRARY } from '../../constants/sponsors';
import { ScrollBasedVelocity } from '../magicui';

interface TrustBarSectionProps {
  theme: ThemeConfig;
  sponsors?: SponsorItem[];
  onOpenSponsorEditor?: () => void;
}

export const TrustBarSection: React.FC<TrustBarSectionProps> = ({
  theme,
  sponsors = SPONSOR_PRESET_LIBRARY.slice(0, 8),
  onOpenSponsorEditor,
}) => {
  const activeSponsors = sponsors && sponsors.length > 0 ? sponsors : SPONSOR_PRESET_LIBRARY.slice(0, 8);

  return (
    <section
      className="py-12 sm:py-16 bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden group/trust transition-colors border-y border-slate-200/70 dark:border-slate-800/80"
      data-reveal
    >
      {/* Ambient background glow */}
      <div
        className={`ambient-glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[280px] bg-gradient-to-r ${theme.glowGradient} opacity-15 dark:opacity-20 pointer-events-none`}
      ></div>

      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 text-center relative z-10 px-4">
        {/* Title & Edit Button Header */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-700 dark:text-slate-300 shadow-sm transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>ĐỒNG HÀNH & BẢO TRỢ CHUYÊN MÔN BỞI CÁC ĐỐI TÁC CÔNG NGHỆ</span>
          </div>

          {onOpenSponsorEditor && (
            <button
              type="button"
              onClick={onOpenSponsorEditor}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/90 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 text-[11px] font-semibold transition-all cursor-pointer shadow-sm hover:scale-105"
              title="Thêm, xóa hoặc đổi logo nhà tài trợ"
            >
              <SlidersHorizontal className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
              <span>Chỉnh sửa đối tác ({activeSponsors.length})</span>
            </button>
          )}
        </div>

        {/* Magic UI Scroll-Based Velocity Marquee */}
        <div className="py-2">
          {/* Lane 1: Partner Brand Cards gliding with positive scroll velocity */}
          <ScrollBasedVelocity default_velocity={1.0} numRows={1} pauseOnHover={true}>
            <div className="flex items-center gap-5 sm:gap-8">
              {activeSponsors.concat(activeSponsors).map((brand, idx) => (
                <div
                  key={`lane1-${idx}`}
                  onClick={onOpenSponsorEditor}
                  title={`${brand.name} - ${brand.role} (Bấm để tùy chỉnh)`}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-50/90 hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-800/90 border border-slate-200 dark:border-slate-800/90 hover:border-indigo-400 dark:hover:border-indigo-500 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className="h-6 sm:h-7 max-w-[120px] object-contain dark:invert filter transition-all group-hover:scale-105"
                  />
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-none">
                      {brand.name}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {brand.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollBasedVelocity>

          {/* Lane 2: Reverse Direction Velocity Ribbon */}
          <ScrollBasedVelocity default_velocity={-0.8} numRows={1} pauseOnHover={true}>
            <div className="flex items-center gap-5 sm:gap-8">
              {activeSponsors.concat(activeSponsors).map((brand, idx) => (
                <div
                  key={`lane2-${idx}`}
                  onClick={onOpenSponsorEditor}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/60 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer group"
                >
                  <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-400 shrink-0 group-hover:rotate-12 transition-transform" />
                  <span className="font-semibold text-slate-900 dark:text-slate-200">{brand.name}</span>
                  <span className="text-slate-400 dark:text-slate-600">•</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">{brand.role}</span>
                </div>
              ))}
            </div>
          </ScrollBasedVelocity>
        </div>
      </div>
    </section>
  );
};
