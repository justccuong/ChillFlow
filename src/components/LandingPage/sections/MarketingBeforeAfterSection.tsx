import React from 'react';
import { XCircle, CheckCircle2, TrendingUp, ShieldCheck, ArrowRight, Zap, Target } from 'lucide-react';
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
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden" data-reveal>
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center justify-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> BỨT PHÁ TĂNG TRƯỞNG THỰC CHIẾN
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
            Sự Khác Biệt Giữa Cách Làm Cũ & Framework Mới
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Tại sao 90% chiến dịch marketing thất bại vì phụ thuộc vào ads, và cách các Unicorn scale doanh thu với ngân sách 0đ.
          </p>
        </div>

        {/* Before vs After Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CỘT CŨ (BEFORE) */}
          <div className="p-8 rounded-3xl bg-red-950/20 border border-red-500/30 space-y-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-red-500/20">
              <span className="text-xs font-extrabold uppercase tracking-widest text-red-400 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-400" /> CÁCH LÀM TRUYỀN THỐNG
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300">TỐN KÉM & BẾ TẮC</span>
            </div>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span>Đốt ngân sách vào chạy quảng cáo Facebook/Google nhưng tỉ lệ chuyển đổi dưới 1%.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span>Khách hàng vào một lần rồi rời đi, chi phí CAC ngày càng tăng cao ăn mòn lợi nhuận.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span>Không có quy trình phễu tự động, phụ thuộc hoàn toàn vào cảm tính cá nhân.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span>Đội ngũ mất hàng tháng loay hoay thử nghiệm mà không có benchmark rõ ràng.</span>
              </li>
            </ul>
          </div>

          {/* CỘT MỚI (AFTER) */}
          <div className="p-8 rounded-3xl bg-amber-950/20 border border-amber-500/40 space-y-6 relative shadow-2xl shadow-amber-500/10">
            <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" /> GROWTH HACKING FRAMEWORK 2026
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/30 text-amber-300">HIỆU QUẢ KIỂM CHỨNG</span>
            </div>

            <ul className="space-y-4 text-sm text-slate-200">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>Xây dựng vòng lặp tự sinh trưởng (Viral & Referral Loop) thu hút hàng ngàn users tự nhiên.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>Tối ưu từng điểm chạm trong phễu CRO, nâng ROI trung bình lên **+340%**.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>Sở hữu trọn bộ **50+ Playbooks** có thể áp dụng sao chép trực tiếp vào doanh nghiệp ngay ngày hôm sau.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>Được cố vấn trực tiếp 1-1 từ Head of Growth từng scale sản phẩm 50,000+ MAU.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 4 Chặng Lộ Trình Tăng Trưởng */}
        <div className="space-y-6 pt-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl sm:text-3xl font-extrabold text-white font-heading">
              Lộ Trình Đào Tạo 4 Chặng Tinh Gọn
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Được thiết kế cô đọng trong phiên Masterclass thực chiến để bạn làm chủ toàn bộ tư duy tăng trưởng.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Thu Hút (Acquisition)', desc: 'Chiến thuật kéo traffic chất lượng cao từ các kênh ngách với chi phí 0đ.' },
              { step: '02', title: 'Kích Hoạt (Activation)', desc: 'Thiết kế khoảnh khắc Aha! Moment giữ chân 70% người dùng mới ngay phiên đầu.' },
              { step: '03', title: 'Doanh Thu (Monetization)', desc: 'Tối ưu giá trị đơn hàng và chiến lược định giá tối đa hoá dòng tiền.' },
              { step: '04', title: 'Lan Tỏa (Retention & Viral)', desc: 'Xây dựng cơ chế giới thiệu tự nhiên biến khách hàng thành đại sứ thương hiệu.' },
            ].map((st, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 relative">
                <div className="text-2xl font-black font-mono text-amber-400/60">{st.step}</div>
                <h4 className="font-bold text-white text-sm">{st.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cam kết Hoàn tiền 100% */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Cam Kết 100% Hoàn Tiền — Rủi Ro Bằng 0</h4>
              <p className="text-xs text-slate-400 max-w-xl">
                Nếu bạn tham gia trọn vẹn buổi học và cảm thấy kiến thức không áp dụng được cho dự án của mình, ban tổ chức cam kết hoàn tiền 100% mà không hỏi thêm câu nào.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onScrollToRegister}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl transition-all cursor-pointer hover:scale-105 shrink-0 flex items-center gap-2"
          >
            <span>Đăng Ký Nhận Vé Ngay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
