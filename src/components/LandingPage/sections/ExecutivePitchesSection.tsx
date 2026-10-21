import React from 'react';
import type { ThemeConfig } from '../../../types';
import { Briefcase, Building2, DollarSign, Handshake, Shield, Sparkles } from 'lucide-react';

interface ExecutiveProps {
  theme: ThemeConfig;
}

export const ExecutivePitchesSection: React.FC<ExecutiveProps> = () => {
  const tracks = [
    {
      num: '01',
      title: 'Phiên Báo Cáo Thị Trường & Keynote VCs',
      time: '08:30 - 10:30',
      desc: 'Bức tranh toàn cảnh dòng vốn đầu tư mạo hiểm Đông Nam Á 2026 và các tiêu chí thẩm định Series A.',
    },
    {
      num: '02',
      title: 'Sân Khấu Pitching: 16 Startups Tuyển Chọn',
      time: '10:45 - 15:30',
      desc: 'Mỗi đội có 5 phút thuyết trình mô hình kinh doanh & traction, 5 phút hỏi đáp trực tiếp cùng Hội đồng Quỹ.',
    },
    {
      num: '03',
      title: 'Deal Room 1-1 & Tiệc Tối Networking Kín',
      time: '16:00 - 19:30',
      desc: 'Không gian riêng tư ký kết Term Sheet, trao đổi định giá và thảo luận điều khoản cam kết giải ngân.',
    },
  ];

  return (
    <section className="py-16 bg-slate-900/80 dark:bg-slate-950 border-y border-amber-400/20 text-slate-100 relative overflow-hidden" data-reveal>
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400 flex items-center justify-center gap-1.5">
            <Handshake className="w-4 h-4 text-amber-400" /> PITCH TRACK // ROADMAP
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
            Lộ Trình Thẩm Định & Kết Nối Vốn Đầu Tư
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Quy trình chuẩn mực được thiết kế để tối ưu hóa thời gian thẩm định của quỹ và tối đa hóa khả năng chốt deal cho startup.
          </p>
        </div>

        {/* 3 Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tracks.map((tr, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-850/90 border border-slate-800 hover:border-amber-400/40 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-heading text-amber-400">{tr.num}</span>
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  {tr.time}
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-white">{tr.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{tr.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
