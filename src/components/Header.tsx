import React from 'react';
import { Plus, Users, Key, Eye, Edit3, Zap, Sun, Moon, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  currentTab: 'form' | 'preview';
  onChangeTab: (tab: 'form' | 'preview') => void;
  onResetNewEvent: () => void;
  onOpenAttendees: () => void;
  onOpenApiKeyModal: () => void;
  registeredCount: number;
  hasGeneratedPage: boolean;
  apiKeyPresent: boolean;
  themeMode?: 'dark' | 'light';
  onToggleTheme?: () => void;
  userProfile?: UserProfile;
  onOpenAuthModal?: () => void;
  onOpenPricingModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onChangeTab,
  onResetNewEvent,
  onOpenAttendees,
  onOpenApiKeyModal,
  registeredCount,
  hasGeneratedPage,
  apiKeyPresent,
  themeMode = 'dark',
  onToggleTheme,
  userProfile,
  onOpenAuthModal,
  onOpenPricingModal,
}) => {
  const tier = userProfile?.tier || 'free';
  const pageLimit = (userProfile?.freePagesLimit || 2) + (userProfile?.extraCredits || 0);
  const pagesCount = userProfile?.publishedPageSlugs?.length || 0;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight font-heading text-slate-900 dark:text-white">
                ConvertFlow
              </span>
              <button
                type="button"
                onClick={onOpenPricingModal}
                title="Bấm để xem Bảng giá & Nâng cấp"
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider transition-all cursor-pointer ${
                  tier === 'vip'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300/40 hover:scale-105'
                    : tier === 'pro'
                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-300/40 hover:scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                }`}
              >
                {tier === 'free' ? `FREE (${pagesCount}/${pageLimit})` : tier.toUpperCase()}
              </button>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        {hasGeneratedPage && (
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => onChangeTab('preview')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                currentTab === 'preview'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Xem trang</span>
            </button>

            <button
              type="button"
              onClick={() => onChangeTab('form')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                currentTab === 'form'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Chỉnh sửa</span>
            </button>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Upgrade / Pricing Button */}
          {onOpenPricingModal && (
            <button
              type="button"
              onClick={onOpenPricingModal}
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-indigo-500/10 hover:from-amber-500/20 hover:to-indigo-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Gói cước</span>
            </button>
          )}

          {/* User Auth Profile Avatar Button */}
          {userProfile && onOpenAuthModal && (
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={`Đăng nhập: ${userProfile.name} (${userProfile.email})`}
            >
              <img
                src={userProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={userProfile.name}
                className="w-7 h-7 rounded-lg object-cover border border-slate-300 dark:border-slate-700"
              />
            </button>
          )}

          {/* Light / Dark Mode Toggle Button */}
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs cursor-pointer transition-colors"
              title={themeMode === 'dark' ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
              aria-label="Toggle Theme Mode"
            >
              {themeMode === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={onOpenAttendees}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{registeredCount} đăng ký</span>
          </button>

          <button
            type="button"
            onClick={onOpenApiKeyModal}
            className={`p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
              apiKeyPresent
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            title={apiKeyPresent ? 'Gemini API: Đã kết nối' : 'Cấu hình API Key'}
          >
            <Key className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onResetNewEvent}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-sm cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tạo trang mới</span>
          </button>
        </div>
      </div>
    </header>
  );
};
