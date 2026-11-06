import React from 'react';
import type { EventInput, GeneratedContent, ThemeConfig } from '../../types';
import { formatEventDate } from '../../utils/date';
import { Calendar, MapPin, User, Mail, Phone, ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';

export interface EventFooterSectionProps {
  input: EventInput;
  content: GeneratedContent;
  theme: ThemeConfig;
  isEditMode?: boolean;
  onUpdateInput?: (field: keyof EventInput, val: unknown) => void;
  onUpdateContent?: (field: keyof GeneratedContent, val: unknown) => void;
  onScrollToSection?: (sectionId: string) => void;
}

export function getEventSupportEmail(eventName: string): string {
  if (!eventName || !eventName.trim()) return 'hotro@sukien.vn';
  const clean = eventName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  return `hotro@${clean || 'sukien'}.vn`;
}

export function getFooterQuickLinks() {
  return [
    { label: 'Lợi ích nổi bật', href: '#benefits' },
    { label: 'Diễn giả chuyên gia', href: '#speaker' },
    { label: 'Lịch trình chi tiết', href: '#agenda' },
    { label: 'Hình ảnh thực tế', href: '#gallery' },
    { label: 'Câu hỏi thường gặp', href: '#faq' },
    { label: 'Đăng ký vé sự kiện', href: '#registration' },
  ];
}

export const EventFooterSection: React.FC<EventFooterSectionProps> = ({
  input,
  content,
  theme,
  isEditMode: _isEditMode = false,
  onUpdateInput: _onUpdateInput,
  onUpdateContent: _onUpdateContent,
  onScrollToSection,
}) => {
  const currentYear = new Date().getFullYear();
  const supportEmail = getEventSupportEmail(input.eventName);
  const quickLinks = getFooterQuickLinks();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    if (onScrollToSection) {
      onScrollToSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 transition-colors text-slate-700 dark:text-slate-300">
      {/* Main 4-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Event Identity (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-xl ${theme.badgeBg} flex items-center justify-center border ${theme.accentBorder}`}>
                <Sparkles className={`w-4 h-4 ${theme.badgeText}`} />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                {input.eventName}
              </h3>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {content.tagline || content.subHeadline || 'Sự kiện chất lượng cao hàng đầu dành cho cộng đồng.'}
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${theme.badgeBg} ${theme.badgeText} border ${theme.accentBorder}`}>
                <ShieldCheck className="w-3.5 h-3.5" />
                {input.earlyBirdDiscount ? `Ưu đãi: ${input.earlyBirdDiscount}` : 'Xác thực ban tổ chức'}
              </span>
            </div>
          </div>

          {/* Column 2: Date, Time & Location (Span 3) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Thời gian & Địa điểm
            </h4>
            
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-slate-900 dark:text-slate-200 block">Thời gian diễn ra:</span>
                  <span>{formatEventDate(input.eventDate)}</span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-slate-900 dark:text-slate-200 block">Địa điểm tổ chức:</span>
                  <span>{input.location || 'Địa điểm tổ chức sự kiện'}</span>
                </div>
              </li>

              {input.speakerName && (
                <li className="flex items-start gap-2.5">
                  <User className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-slate-900 dark:text-slate-200 block">Chủ trì sự kiện:</span>
                    <span>{input.speakerName} ({input.speakerRole})</span>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Quick Navigation (Span 2) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Điều hướng
            </h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Organizer Support & Hotline (Span 3) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Liên hệ Ban tổ chức
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Mọi thắc mắc về quyền lợi tham dự, xuất hóa đơn VAT doanh nghiệp hoặc tài trợ xin liên hệ:
            </p>

            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
                <a
                  href={`mailto:${supportEmail}`}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium break-all"
                >
                  {supportEmail}
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  1900 6868 (08:30 - 18:00)
                </span>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-200/50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Đảm bảo giữ chỗ và hoàn tiền 100% nếu sự kiện thay đổi lịch trình bất khả kháng.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            © {currentYear} <span className="font-semibold text-slate-700 dark:text-slate-300">{input.eventName}</span>. Toàn bộ bản quyền thuộc về Ban tổ chức.
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Điều khoản tham dự</span>
            <span>•</span>
            <span className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Chính sách bảo mật</span>
            <span>•</span>
            <span className="text-indigo-500 dark:text-indigo-400 font-semibold">ConvertFlow AI Summit</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EventFooterSection;
