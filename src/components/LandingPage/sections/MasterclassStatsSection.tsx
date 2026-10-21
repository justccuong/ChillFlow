import React from 'react';
import type { ThemeConfig } from '../../../types';
import { TrendingUp, Users, BookOpen, ShieldCheck, Award } from 'lucide-react';

interface StatsProps {
  theme: ThemeConfig;
}

export const MasterclassStatsSection: React.FC<StatsProps> = ({ theme }) => {
  const stats = theme.statsHighlight || [
    { value: '+340%', label: 'Tăng trưởng ROI', subtext: 'Đo lường sau 30 ngày áp dụng funnel' },
    { value: '10,000+', label: 'Học viên & Leader', subtext: 'Đã tham gia chuỗi Masterclass' },
    { value: '50+ Playbooks', label: 'Tài liệu thực chiến', subtext: 'Tải về và triển khai ngay lập tức' },
    { value: '0 VNĐ', label: 'Chi phí ẩn', subtext: 'Cam kết 100% hoàn tiền nếu không hài lòng' },
  ];

  return (
    <section className="py-16 bg-slate-900/60 dark:bg-slate-950/80 border-y border-amber-500/20 relative overflow-hidden" data-reveal>
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center justify-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" /> HIỆU QUẢ ĐO LƯỜNG THỰC TẾ
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Con Số Biết Nói Từ Các Khóa Masterclass Trước
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Không lý thuyết suông. Mọi chiến lược đều được kiểm chứng qua dữ liệu thực chiến và case study thành công.
          </p>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((st, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-2 text-center transition-transform hover:-translate-y-1"
            >
              <div className="text-3xl sm:text-4xl font-black font-heading bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                {st.value}
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{st.label}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{st.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
