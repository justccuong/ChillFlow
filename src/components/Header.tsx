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
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight font-heading text-slate-900 dark:text-white">
              ConvertFlow
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              AI Summit Edition
            </span>
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
