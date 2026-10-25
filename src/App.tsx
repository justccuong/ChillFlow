import { useState, useEffect } from 'react';
import type { EventInput, GeneratedContent, CROEvaluation, Attendee, UserProfile } from './types';
import { Header } from './components/Header';
import { EventInputForm } from './components/EventInputForm';
import { LandingPagePreview } from './components/LandingPage/LandingPagePreview';
import { AttendeeListModal } from './components/AttendeeListModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { AuthModal } from './components/AuthModal';
import { PricingModal } from './components/PricingModal';
import { PublicStandalonePage } from './components/LandingPage/PublicStandalonePage';
import { Particles } from './components/ui/particles';
import { generateLandingPageContent, PRESETS } from './services/aiService';
import { useThemeMode } from './hooks/useThemeMode';
import { extractSlugFromLocation, getPublishedEvent } from './services/publishService';
import { Globe } from 'lucide-react';
import {
  getCurrentUser,
  subscribeAuthChange,
  canPublishOrSavePage,
} from './services/authService';
import {
  getStoredAttendees,
  saveAttendee,
  getSavedEventState,
  saveCurrentEventState,
  clearEventState,
  getSavedApiKey,
} from './services/storageService';

export function App() {
  const [eventInput, setEventInput] = useState<EventInput | null>(() => PRESETS[0].data);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [cro, setCro] = useState<CROEvaluation | null>(null);
  const [currentTab, setCurrentTab] = useState<'form' | 'preview'>('form');

  const [isLoading, setIsLoading] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isAlreadyOptimized, setIsAlreadyOptimized] = useState(false);

  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [isAttendeeModalOpen, setIsAttendeeModalOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');

  // Public Standalone Route State
  const [publicSlug, setPublicSlug] = useState<string | null>(() => extractSlugFromLocation());

  // Auth & Pricing state
  const [userProfile, setUserProfile] = useState<UserProfile>(getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [pricingReason, setPricingReason] = useState<string | undefined>(undefined);

  // Global Toast Feedback State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 4000);
  };

  const { mode: themeMode, toggleMode } = useThemeMode();

  // Listen to routing changes (hash, history popstate)
  useEffect(() => {
    const handleLocationChange = () => {
      setPublicSlug(extractSlugFromLocation());
    };
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Initial load from localStorage & subscribe to auth updates
  useEffect(() => {
    const unsubscribe = subscribeAuthChange((updatedUser) => {
      setUserProfile(updatedUser);
    });

    const savedState = getSavedEventState();
    const loadedApiKey = getSavedApiKey();
    setApiKey(loadedApiKey);

    if (savedState.input && savedState.content && savedState.cro) {
      setEventInput(savedState.input);
      setContent(savedState.content);
      setCro(savedState.cro);
      setCurrentTab('preview');
      setAttendees(getStoredAttendees(savedState.input.eventName));
    } else {
      setEventInput(PRESETS[0].data);
      setAttendees(getStoredAttendees('default'));
    }

    return () => unsubscribe();
  }, []);

  // If viewing a public published standalone route (/p/:slug or #/p/:slug)
  if (publicSlug) {
    const published = getPublishedEvent(publicSlug);
    if (published) {
      return <PublicStandalonePage page={published} />;
    }
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 shadow-xl">
          <Globe className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold font-heading">Không tìm thấy trang sự kiện</h1>
        <p className="text-sm text-slate-400 mt-2 max-w-md">
          Trang <code className="text-indigo-400 font-mono">/p/{publicSlug}</code> chưa được xuất bản hoặc liên kết không chính xác.
        </p>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = '';
            setPublicSlug(null);
          }}
          className="mt-6 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg hover:shadow-indigo-500/25"
        >
          Quay lại trang chủ tạo sự kiện
        </a>
      </div>
    );
  }

  // Form submit handler: AI Generates copy & CRO score
  const handleFormSubmit = async (input: EventInput) => {
    // Check quota before creating/saving new page
    const quotaCheck = canPublishOrSavePage(input.eventName);
    if (!quotaCheck.allowed) {
      setPricingReason(quotaCheck.reason);
      setIsPricingModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateLandingPageContent(input, apiKey, false);
      setEventInput(input);
      setContent(result.content);
      setCro(result.cro);
      setIsAlreadyOptimized(false);
      setCurrentTab('preview');
      window.scrollTo(0, 0);

      const currentAttendees = getStoredAttendees(input.eventName);
      setAttendees(currentAttendees);

      saveCurrentEventState(input, result.content, result.cro);

      if (result.source === 'gemini-api') {
        showToast('⚡ Google Gemini AI (3.5 Flash) đã sinh nội dung thành công!', 'success');
      } else {
        showToast('💡 Đã khởi tạo nội dung qua Smart Offline Engine', 'info');
      }
    } catch (err) {
      console.error('Error generating landing page:', err);
      showToast('Có lỗi xảy ra khi tạo trang, vui lòng thử lại', 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  // 1-Click CRO Optimization
  const handleOptimizeCRO = async () => {
    if (!eventInput) return;
    setIsOptimizing(true);
    try {
      const result = await generateLandingPageContent(eventInput, apiKey, true);
      setContent(result.content);
      setCro(result.cro);
      setIsAlreadyOptimized(true);

      saveCurrentEventState(eventInput, result.content, result.cro);
      showToast('🚀 Đã tối ưu hóa tỷ lệ chuyển đổi (CRO) thành công!', 'success');
    } catch (err) {
      console.error('Error optimizing CRO:', err);
      showToast('Không thể tối ưu hóa nội dung lúc này', 'warning');
    } finally {
      setIsOptimizing(false);
    }
  };

  // Nút "Tạo trang mới"
  const handleResetNewEvent = () => {
    clearEventState();
    setEventInput({
      eventName: '',
      category: 'ai-tech',
      eventDate: '',
      location: '',
      speakerName: '',
      speakerRole: '',
      speakerBio: '',
      earlyBirdDiscount: '',
      targetAudience: '',
      maxCapacity: 100,
    });
    setContent(null);
    setCro(null);
    setIsAlreadyOptimized(false);
    setCurrentTab('form');
    showToast('Đã làm mới dữ liệu sự kiện', 'info');
  };

  // Register attendee
  const handleRegisterSuccess = (attendeeData: Omit<Attendee, 'id' | 'registeredAt'>) => {
    const eventId = eventInput?.eventName || 'default';
    const updatedList = saveAttendee(attendeeData, eventId);
    setAttendees(updatedList);
    showToast(`Đăng ký vé thành công cho ${attendeeData.fullName}!`, 'success');
  };

  const handleClearAttendees = () => {
    const eventId = eventInput?.eventName || 'default';
    localStorage.removeItem(`convertflow_attendees_${eventId}`);
    setAttendees([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans overflow-x-hidden">
      <Header
        currentTab={currentTab}
        onChangeTab={setCurrentTab}
        onResetNewEvent={handleResetNewEvent}
        onOpenAttendees={() => setIsAttendeeModalOpen(true)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        registeredCount={attendees.length}
        hasGeneratedPage={Boolean(content && eventInput)}
        apiKeyPresent={Boolean(apiKey && apiKey.trim() !== '')}
        themeMode={themeMode}
        onToggleTheme={toggleMode}
        userProfile={userProfile}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenPricingModal={() => {
          setPricingReason(undefined);
          setIsPricingModalOpen(true);
        }}
      />

      <div className="flex-1">
        {currentTab === 'form' || !content || !eventInput ? (
          <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-6">
            <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 text-center space-y-3 border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-white/80 via-white/40 to-white/90 dark:from-slate-900/90 dark:via-slate-900/50 dark:to-slate-950/90 backdrop-blur-xl shadow-xl shadow-slate-200/40 dark:shadow-black/40">
              <Particles
                className="absolute inset-0 z-0"
                quantity={60}
                ease={70}
                size={0.5}
                staticity={35}
                color={themeMode === 'dark' ? '#cbd5e1' : '#64748b'}
                refresh
              />
              <div className="relative z-10 space-y-2">
                <h1 className="text-2xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
                  Tạo Trang Đích Sự Kiện & Tối Ưu Chuyển Đổi
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto">
                  Điền thông tin để tạo landing page chuẩn chuyển đổi kèm phân tích CRO tự động.
                </p>
              </div>
            </div>

            <EventInputForm
              initialData={eventInput}
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <LandingPagePreview
            input={eventInput}
            content={content}
            cro={cro!}
            registeredCount={attendees.length}
            onRegisterSuccess={handleRegisterSuccess}
            onOpenAttendeeList={() => setIsAttendeeModalOpen(true)}
            onOptimizeCRO={handleOptimizeCRO}
            isOptimizing={isOptimizing}
            isAlreadyOptimized={isAlreadyOptimized}
            onEditForm={() => setCurrentTab('form')}
            onUpdateInput={setEventInput}
            onUpdateContent={setContent}
            userProfile={userProfile}
            onTriggerUpgrade={(reason) => {
              setPricingReason(reason);
              setIsPricingModalOpen(true);
            }}
          />
        )}
      </div>

      <AttendeeListModal
        isOpen={isAttendeeModalOpen}
        onClose={() => setIsAttendeeModalOpen(false)}
        attendees={attendees}
        eventName={eventInput?.eventName || 'Event'}
        onClearAll={handleClearAttendees}
      />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        currentKey={apiKey}
        onKeySaved={setApiKey}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(updated) => setUserProfile(updated)}
      />

      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        reason={pricingReason}
        onUpgraded={(updated) => setUserProfile(updated)}
      />

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-md animate-fade-in transition-all bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
          <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
            toast.type === 'success' ? 'bg-emerald-500 animate-pulse' : toast.type === 'warning' ? 'bg-rose-500' : 'bg-indigo-500'
          }`} />
          <span className="text-xs font-semibold">{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
