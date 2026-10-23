import React, { useState } from 'react';
import type { EventInput, GeneratedContent, Attendee, ThemeConfig } from '../../types';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, Flame, Users, Gift, ShieldCheck } from 'lucide-react';

interface RegistrationSectionProps {
  input: EventInput;
  content: GeneratedContent;
  theme: ThemeConfig;
  registeredCount: number;
  onRegisterSuccess: (attendee: Omit<Attendee, 'id' | 'registeredAt'>) => void;
  onOpenAttendeeList?: () => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  input,
  content,
  theme,
  registeredCount,
  onRegisterSuccess,
  onOpenAttendeeList,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    ticketType: 'early-bird' as 'early-bird' | 'standard',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastTicketId, setLastTicketId] = useState<string>('');

  const maxSeats = input.maxCapacity || 120;
  const remainingSeats = Math.max(0, maxSeats - registeredCount);
  const percentFilled = Math.min(100, Math.round((registeredCount / maxSeats) * 100));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Vui lòng điền đầy đủ thông tin: Họ tên, Email và Số điện thoại');
      return;
    }

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }

    const ticketId = 'TKT-' + Math.floor(100000 + Math.random() * 900000);
    setLastTicketId(ticketId);

    onRegisterSuccess({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      ticketType: formData.ticketType,
      notes: formData.notes,
    });

    setIsSubmitted(true);
  };

  const handleRegisterAnother = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      ticketType: 'early-bird',
      notes: '',
    });
    setIsSubmitted(false);
  };

  return (
    <section id="registration" className="py-20 px-4 md:px-8 bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-heading text-slate-900 dark:text-white">
            Đăng ký tham gia
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto">
            Điền thông tin để nhận vé mời và tài liệu sự kiện.
          </p>
        </div>

        {/* Live Attendance Scarcity Card */}
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-lg space-y-4 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${theme.accentBg} ${theme.accentColor} flex items-center justify-center`}>
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Số lượng người đăng ký</div>
                <div className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className={theme.accentColor}>{registeredCount}</span>
                  <span className="text-slate-500 text-sm font-normal">/ {maxSeats} suất</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenAttendeeList}
              className="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
            >
              <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              Danh sách ({registeredCount})
            </button>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Đã đăng ký {percentFilled}%</span>
              <span className={`${theme.accentColor} font-semibold`}>Còn lại {remainingSeats} vé</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${theme.btnPrimary.includes('from-') ? theme.btnPrimary.split(' ')[0].replace('bg-', 'bg-') : 'bg-indigo-500'}`}
                style={{ width: `${percentFilled}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl transition-colors">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Đăng ký thành công!
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Thông tin xác nhận đã được gửi tới <strong className="text-slate-900 dark:text-white">{formData.email}</strong>.
                </p>
              </div>

              {/* Digital ticket card */}
              <div className="max-w-sm mx-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-left space-y-2 shadow-sm">
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Mã vé</span>
                  <span className={`text-sm font-mono font-bold ${theme.accentColor}`}>{lastTicketId}</span>
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <div><strong>Khách mời:</strong> {formData.fullName}</div>
                  <div><strong>Hạng vé:</strong> {formData.ticketType === 'early-bird' ? 'Early Bird' : 'Tiêu chuẩn'}</div>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleRegisterAnother}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-medium text-xs cursor-pointer transition-colors"
                >
                  Đăng ký vé khác
                </button>
                <button
                  type="button"
                  onClick={onOpenAttendeeList}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs cursor-pointer transition-colors shadow-sm"
                >
                  Xem danh sách tham gia
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {input.earlyBirdDiscount && (
                <div className={`p-3.5 rounded-xl ${theme.badgeBg} border ${theme.accentBorder} flex items-center gap-2.5 ${theme.badgeText} text-xs`}>
                  <Gift className="w-4 h-4 shrink-0" />
                  <span>
                    <strong>Ưu đãi Early Bird:</strong> {input.earlyBirdDiscount}
                  </span>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="reg-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="reg-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="reg-phone" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="reg-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0912345678"
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Hạng vé
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, ticketType: 'early-bird' })}
                      className={`p-2 rounded-xl border text-xs font-medium text-left transition-colors cursor-pointer ${
                        formData.ticketType === 'early-bird'
                          ? `border-indigo-500 bg-indigo-500/15 text-indigo-700 dark:text-white ring-1 ring-indigo-500 font-bold`
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      Early Bird
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, ticketType: 'standard' })}
                      className={`p-2 rounded-xl border text-xs font-medium text-left transition-colors cursor-pointer ${
                        formData.ticketType === 'standard'
                          ? `border-indigo-500 bg-indigo-500/15 text-indigo-700 dark:text-white ring-1 ring-indigo-500 font-bold`
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      Tiêu chuẩn
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${theme.btnPrimary}`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Xác nhận đăng ký giữ chỗ</span>
                </button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mt-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Vé mời sẽ được gửi tự động qua email.</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
