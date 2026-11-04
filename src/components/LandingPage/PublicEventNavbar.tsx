import React, { useState, useEffect } from 'react';
import { Sparkles, Ticket, ShieldCheck, Menu, X } from 'lucide-react';
import type { ThemeConfig } from '../../types';
import { AnimatedThemeToggler } from '../magicui';

export interface PublicEventNavbarProps {
  eventName: string;
  theme: ThemeConfig;
  onScrollToRegister: () => void;
  isOwner?: boolean;
  matchingProjectId?: string;
  themeMode: 'dark' | 'light';
  onToggleTheme: () => void;
  hasFreeTierBanner?: boolean;
}

export const PublicEventNavbar: React.FC<PublicEventNavbarProps> = ({
  eventName,
  theme,
  onScrollToRegister,
  isOwner = false,
  matchingProjectId,
  themeMode,
  onToggleTheme,
  hasFreeTierBanner = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Lợi ích', href: '#benefits' },
    { label: 'Diễn giả', href: '#speaker' },
    { label: 'Lịch trình', href: '#agenda' },
    { label: 'Không gian', href: '#gallery' },
    { label: 'Hỏi đáp', href: '#faqs' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToAdmin = () => {
    if (typeof window !== 'undefined') {
      if (matchingProjectId) {
        window.location.hash = `#/project/${matchingProjectId}`;
      } else {
        window.location.hash = '';
      }
    }
  };

  return (
    <header
      className={`sticky ${hasFreeTierBanner ? 'top-9' : 'top-0'} inset-x-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm'
          : 'bg-white/60 dark:bg-slate-950/60 backdrop-blur-sm border-b border-slate-200/40 dark:border-slate-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Brand / Event Title */}
        <button
          type="button"
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0 max-w-[200px] sm:max-w-xs md:max-w-sm truncate"
          title="Về đầu trang"
        >
          <div className={`w-8 h-8 rounded-xl ${theme.badgeBg} ${theme.badgeText} flex items-center justify-center shrink-0 border ${theme.accentBorder} group-hover:scale-105 transition-transform`}>
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight truncate">
            {eventName || 'ConvertFlow Event'}
          </span>
        </button>

        {/* Desktop Anchor Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Controls: Theme Toggle & Role-Based Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Theme Toggle (Available to all visitors & attendees) */}
          <AnimatedThemeToggler
            theme={themeMode}
            onThemeChange={onToggleTheme}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs cursor-pointer transition-colors shadow-sm active:scale-95 flex items-center justify-center"
            title="Đổi giao diện Sáng / Tối"
          />

          {/* Role-based separation */}
          {isOwner ? (
            /* ORGANIZER CONTROLS: Show link back to Dashboard / Builder */
            <button
              type="button"
              onClick={handleGoToAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-md hover:shadow-indigo-500/25 transition-all cursor-pointer"
              title="Bạn là ban tổ chức sự kiện này. Bấm để vào trang quản trị / chỉnh sửa."
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Quản trị sự kiện</span>
              <span className="sm:hidden">Sửa</span>
            </button>
          ) : (
            /* REGULAR ATTENDEE CONTROLS: Show Register Ticket CTA */
            <button
              type="button"
              onClick={onScrollToRegister}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl ${theme.btnPrimary} text-xs font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer`}
            >
              <Ticket className="w-3.5 h-3.5 shrink-0" />
              <span>Đăng ký vé</span>
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            title="Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 py-3 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:text-indigo-500 dark:hover:text-cyan-400"
              >
                {link.label}
              </a>
            ))}
          </div>
          {isOwner && (
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Vai trò: <strong>Ban tổ chức (Chủ sự kiện)</strong></span>
              <button
                type="button"
                onClick={handleGoToAdmin}
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
              >
                Vào Dashboard →
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
