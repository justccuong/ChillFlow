import React from 'react';
import type { ThemeConfig, SponsorItem } from '../../types';
import { ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { SPONSOR_PRESET_LIBRARY } from '../SponsorEditorModal';

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
    <section className="py-14 bg-slate-50 dark:bg-slate-950 relative overflow-hidden group/trust transition-colors" data-reveal>
      <div className="hairline-divider absolute top-0 inset-x-0"></div>

      {/* Ambient center backlight glow */}
      <div className={`ambient-glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-gradient-to-r ${theme.glowGradient} opacity-15 dark:opacity-20`}></div>

      <div className="max-w-6xl mx-auto space-y-7 text-center relative z-10 px-4">
        {/* Title & Edit Button Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-600 dark:text-slate-400 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>ĐỒNG HÀNH & BẢO TRỢ CHUYÊN MÔN BỞI CÁC ĐỐI TÁC CÔNG NGHỆ</span>
          </div>

          {onOpenSponsorEditor && (
            <button
              type="button"
              onClick={onOpenSponsorEditor}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 text-[11px] font-semibold transition-all cursor-pointer shadow-sm hover:scale-105"
              title="Thêm, xóa hoặc đổi logo nhà tài trợ"
            >
              <SlidersHorizontal className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
              <span>Chỉnh sửa đối tác ({activeSponsors.length})</span>
            </button>
          )}
        </div>

        {/* Dual Infinite Running Marquee with SVG Logos & Hover Color Shift */}
        <div className="marquee-container py-2">
          {/* Lane 1 */}
          <div className="marquee-content">
            {activeSponsors.concat(activeSponsors).map((brand, idx) => (
              <div
                key={idx}
                className="brand-logo-item group relative"
                title={`${brand.name} - ${brand.role}`}
                onClick={onOpenSponsorEditor}
              >
                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="h-8 max-w-[130px] object-contain dark:invert filter transition-all duration-300"
                />
                {/* Floating Role Tooltip on Hover */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-[10px] text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-20">
                  {brand.role}
                </div>
              </div>
            ))}
          </div>

          {/* Lane 1 Duplicate for Seamless Loop */}
          <div className="marquee-content" aria-hidden="true">
            {activeSponsors.concat(activeSponsors).map((brand, idx) => (
              <div
                key={idx + '-dup'}
                className="brand-logo-item group relative"
                title={`${brand.name} - ${brand.role}`}
                onClick={onOpenSponsorEditor}
              >
                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="h-8 max-w-[130px] object-contain dark:invert filter transition-all duration-300"
                />
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-[10px] text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-20">
                  {brand.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hairline-divider absolute bottom-0 inset-x-0"></div>
    </section>
  );
};
