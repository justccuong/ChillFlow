import { useState, useEffect, lazy, Suspense } from 'react';
import type { EventInput, GeneratedContent, CROEvaluation, Attendee, UserProfile } from './types';
import { Header } from './components/Header';
import { GenerationProgressModal } from './components/GenerationProgressModal';
import { EventInputForm } from './components/EventInputForm';
import { LandingPagePreview } from './components/LandingPage/LandingPagePreview';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { PublicStandalonePage } from './components/LandingPage/PublicStandalonePage';
import { Particles } from './components/magicui';
import { generateLandingPageContent, PRESETS } from './services/aiService';
import { useThemeMode } from './hooks/useThemeMode';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { extractSlugFromLocation, getPublishedEvent } from './services/publishService';
import { Globe } from 'lucide-react';
import { useLandingPageStore } from './store/useLandingPageStore';
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
import {
  getAllSavedProjects,
  getProjectById,
  saveProject,
  extractProjectIdFromLocation,
  PROJECTS_CHANGE_EVENT,
  type SavedProject,
} from './services/projectStorageService';
import { getThemeForCategory } from './services/themeEngine';

// Code Splitting: Lazy-load modals and admin dashboard
const AttendeeListModal = lazy(() => import('./components/AttendeeListModal'));
const ApiKeyModal = lazy(() => import('./components/ApiKeyModal'));
const AuthModal = lazy(() => import('./components/AuthModal'));
const PricingModal = lazy(() => import('./components/PricingModal'));
const MyProjectsModal = lazy(() => import('./components/MyProjectsModal'));
const OrganizerDashboard = lazy(() => import('./components/Admin/OrganizerDashboard'));

export function App() {
  const [eventInput, setEventInput] = useState<EventInput | null>(() => PRESETS[0].data);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [cro, setCro] = useState<CROEvaluation | null>(null);
  const [currentTab, setCurrentTab] = useState<'form' | 'preview' | 'admin'>('form');

  const [isLoading, setIsLoading] = useState(false);
  const [generationStep, setGenerationStep] = useState(1);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isAlreadyOptimized, setIsAlreadyOptimized] = useState(false);

  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [isAttendeeModalOpen, setIsAttendeeModalOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [savedProjectsCount, setSavedProjectsCount] = useState<number>(0);
  const [apiKey, setApiKey] = useState('');

  // Project ID State & Public Standalone Route State
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(() => extractProjectIdFromLocation());
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
  useSmoothScroll({ enabled: true, duration: 0.7, wheelMultiplier: 1.0 });

  // Listen to routing changes (hash, history popstate)
  useEffect(() => {
    const handleLocationChange = () => {
      const slug = extractSlugFromLocation();
      setPublicSlug(slug);

      if (!slug) {
        const routeProjectId = extractProjectIdFromLocation();
        if (routeProjectId) {
          const proj = getProjectById(routeProjectId);
          if (proj) {
            setCurrentProjectId(proj.id);
            setEventInput(proj.input);
            setContent(proj.content);
            setCro(proj.cro);
            setAttendees(getStoredAttendees(proj.input.eventName));
            setCurrentTab('preview');
            saveCurrentEventState(proj.input, proj.content, proj.cro);
            useLandingPageStore.getState().setInput(proj.input);
            useLandingPageStore.getState().setContent(proj.content, false);
            useLandingPageStore.getState().setCroEvaluation(proj.cro);
          }
        }
      }
    };
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Initial load from localStorage & subscribe to auth & projects updates
  useEffect(() => {
    const unsubscribe = subscribeAuthChange((updatedUser) => {
      setUserProfile(updatedUser);
    });

    const loadedApiKey = getSavedApiKey();
    setApiKey(loadedApiKey);

    setSavedProjectsCount(getAllSavedProjects().length);
    const handleProjectsChanged = () => {
      setSavedProjectsCount(getAllSavedProjects().length);
    };
    window.addEventListener(PROJECTS_CHANGE_EVENT, handleProjectsChanged);

    // 1. Check if there is an explicit project ID in URL route (#/project/:id or ?project=:id)
    const routeProjectId = extractProjectIdFromLocation();
    if (routeProjectId) {
      const proj = getProjectById(routeProjectId);
      if (proj) {
        setCurrentProjectId(proj.id);
        setEventInput(proj.input);
        setContent(proj.content);
        setCro(proj.cro);
        setCurrentTab('preview');
        setAttendees(getStoredAttendees(proj.input.eventName));
        useLandingPageStore.getState().setInput(proj.input);
        useLandingPageStore.getState().setContent(proj.content, false);
        useLandingPageStore.getState().setCroEvaluation(proj.cro);
        return () => {
          unsubscribe();
          window.removeEventListener(PROJECTS_CHANGE_EVENT, handleProjectsChanged);
        };
      }
    }

    // 2. Otherwise load last saved state from localStorage
    const savedState = getSavedEventState();
    if (savedState.input && savedState.content && savedState.cro) {
      setEventInput(savedState.input);
      setContent(savedState.content);
      setCro(savedState.cro);
      setCurrentTab('preview');
      setAttendees(getStoredAttendees(savedState.input.eventName));
      // Sync into central Zustand store
      useLandingPageStore.getState().setInput(savedState.input);
      useLandingPageStore.getState().setContent(savedState.content, false);
      useLandingPageStore.getState().setCroEvaluation(savedState.cro);

      // Find matching project ID if available
      const match = getAllSavedProjects().find(p => p.name === savedState.input?.eventName);
      if (match) {
        setCurrentProjectId(match.id);
      }
    } else {
      setEventInput(PRESETS[0].data);
      setAttendees(getStoredAttendees('default'));
    }

    return () => {
      unsubscribe();
      window.removeEventListener(PROJECTS_CHANGE_EVENT, handleProjectsChanged);
    };
  }, []);

  // If viewing a public published standalone route (/p/:slug or #/p/:slug)
  if (publicSlug) {
    let published = getPublishedEvent(publicSlug);
    if (!published) {
      // Auto-fallback: check saved projects by slug OR id
      const savedProj = getAllSavedProjects().find(
        (p) => p.slug === publicSlug || p.id === publicSlug
      );
      if (savedProj) {
        published = {
          slug: savedProj.slug,
          eventName: savedProj.name,
          publishedAt: savedProj.updatedAt,
          input: savedProj.input,
          content: savedProj.content,
          theme: getThemeForCategory(savedProj.input.category),
          userTier: 'free',
          viewsCount: 0,
          conversionsCount: 0,
        };
      }
    }
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
    setGenerationStep(1);
    try {
      // Automated 2-phase pipeline: generate and instantly optimize CRO
      const result = await generateLandingPageContent(input, apiKey, true);
      setEventInput(input);
      setContent(result.content);
      setCro(result.cro);
      setIsAlreadyOptimized(true);
      setCurrentTab('preview');
      window.scrollTo(0, 0);

      const currentAttendees = getStoredAttendees(input.eventName);
      setAttendees(currentAttendees);

      saveCurrentEventState(input, result.content, result.cro);
      useLandingPageStore.getState().setInput(input);
      useLandingPageStore.getState().setContent(result.content, true);
      useLandingPageStore.getState().setCroEvaluation(result.cro);

      // Save to Multi-project Local Storage with ID tracking
      const slug =
        input.eventName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
        `event-${Date.now()}`;
      const savedProj = saveProject({
        slug,
        name: input.eventName,
        category: input.category,
        input,
        content: result.content,
        cro: result.cro,
        syncStatus: 'local',
      }, currentProjectId || undefined);

      setCurrentProjectId(savedProj.id);
      if (typeof window !== 'undefined') {
        window.location.hash = `#/project/${savedProj.id}`;
      }

      if (result.source === 'gemini-api') {
        showToast('🚀 Google Gemini AI đã tạo trang & tối ưu hóa CRO tự động thành công!', 'success');
      } else {
        showToast('🚀 Smart Engine đã khởi tạo & tối ưu hóa tỷ lệ chuyển đổi (CRO) thành công!', 'success');
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
      useLandingPageStore.getState().setContent(result.content, true);
      useLandingPageStore.getState().setCroEvaluation(result.cro);

      // Update multi-project store with ID tracking
      const slug =
        eventInput.eventName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
        `event-${Date.now()}`;
      const updatedProj = saveProject({
        slug,
        name: eventInput.eventName,
        category: eventInput.category,
        input: eventInput,
        content: result.content,
        cro: result.cro,
        syncStatus: 'local',
      }, currentProjectId || undefined);
      setCurrentProjectId(updatedProj.id);

      showToast('🚀 Đã tối ưu hóa tỷ lệ chuyển đổi (CRO) thành công!', 'success');
    } catch (err) {
      console.error('Error optimizing CRO:', err);
      showToast('Không thể tối ưu hóa nội dung lúc này', 'warning');
    } finally {
      setIsOptimizing(false);
    }
  };

  // Select project from MyProjectsModal (Routed & Loaded by ID)
  const handleSelectProject = (project: SavedProject) => {
    setCurrentProjectId(project.id);
    setEventInput(project.input);
    setContent(project.content);
    setCro(project.cro);
    setAttendees(getStoredAttendees(project.input.eventName));
    setCurrentTab('preview');
    saveCurrentEventState(project.input, project.content, project.cro);
    useLandingPageStore.getState().setInput(project.input);
    useLandingPageStore.getState().setContent(project.content, false);
    useLandingPageStore.getState().setCroEvaluation(project.cro);

    // Sync to URL hash #/project/:id so it can be reloaded/shared anytime!
    if (typeof window !== 'undefined') {
      window.location.hash = `#/project/${project.id}`;
    }
    showToast(`Đã mở dự án "${project.name}"`, 'success');
  };

  // Nút "Tạo trang mới"
  const handleResetNewEvent = () => {
    clearEventState();
    setCurrentProjectId(null);
    if (typeof window !== 'undefined') {
      window.location.hash = '';
    }
    const emptyInput: EventInput = {
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
    };
    setEventInput(emptyInput);
    setContent(null);
    setCro(null);
    setIsAlreadyOptimized(false);
    setCurrentTab('form');
    useLandingPageStore.getState().resetAll();
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans overflow-x-clip">
      <Header
        currentTab={currentTab}
        onChangeTab={setCurrentTab}
        onResetNewEvent={handleResetNewEvent}
        onOpenAttendees={() => setIsAttendeeModalOpen(true)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onOpenProjects={() => setIsProjectsModalOpen(true)}
        savedProjectsCount={savedProjectsCount}
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
        {currentTab === 'admin' ? (
          <ErrorBoundary sectionName="Admin Quản trị sự kiện">
            <Suspense fallback={<div className="p-12 text-center text-sm text-slate-400">Đang tải Admin Dashboard...</div>}>
              <OrganizerDashboard
                eventInput={eventInput}
                cro={cro}
                attendees={attendees}
                onBackToBuilder={() => setCurrentTab(content && eventInput ? 'preview' : 'form')}
                onUpdateAttendees={(updated) => {
                  setAttendees(updated);
                  const eventId = eventInput?.eventName || 'default';
                  localStorage.setItem(`convertflow_attendees_${eventId}`, JSON.stringify(updated));
                  showToast('Đã cập nhật danh sách người tham dự', 'info');
                }}
                onCopyShareLink={() => {
                  const slug =
                    eventInput?.eventName
                      ? eventInput.eventName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                      : 'event';
                  const url = `${window.location.origin}${window.location.pathname}#/p/${slug}`;
                  navigator.clipboard.writeText(url);
                  showToast('Đã sao chép liên kết trang sự kiện vào bộ nhớ tạm!', 'success');
                }}
              />
            </Suspense>
          </ErrorBoundary>
        ) : currentTab === 'form' || !content || !eventInput ? (
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
          <ErrorBoundary sectionName="Bản xem trước">
            <LandingPagePreview
              key={currentProjectId || eventInput?.eventName || 'preview'}
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
              onUpdateInput={(updated) => {
                setEventInput(updated);
                useLandingPageStore.getState().setInput(updated);
                if (currentProjectId && content && cro) {
                  saveProject({
                    slug: updated.eventName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `event-${Date.now()}`,
                    name: updated.eventName,
                    category: updated.category,
                    input: updated,
                    content,
                    cro,
                    syncStatus: 'local',
                  }, currentProjectId);
                }
              }}
              onUpdateContent={(updated) => {
                setContent(updated);
                if (currentProjectId && eventInput && cro) {
                  saveProject({
                    slug: eventInput.eventName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `event-${Date.now()}`,
                    name: eventInput.eventName,
                    category: eventInput.category,
                    input: eventInput,
                    content: updated,
                    cro,
                    syncStatus: 'local',
                  }, currentProjectId);
                }
              }}
              userProfile={userProfile}
              onTriggerUpgrade={(reason) => {
                setPricingReason(reason);
                setIsPricingModalOpen(true);
              }}
            />
          </ErrorBoundary>
        )}
      </div>

      <Suspense fallback={null}>
        {isAttendeeModalOpen && (
          <AttendeeListModal
            isOpen={isAttendeeModalOpen}
            onClose={() => setIsAttendeeModalOpen(false)}
            attendees={attendees}
            eventName={eventInput?.eventName || 'Event'}
            onClearAll={handleClearAttendees}
          />
        )}

        {isApiKeyModalOpen && (
          <ApiKeyModal
            isOpen={isApiKeyModalOpen}
            onClose={() => setIsApiKeyModalOpen(false)}
            currentKey={apiKey}
            onKeySaved={setApiKey}
          />
        )}

        {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onSuccess={(updated) => setUserProfile(updated)}
          />
        )}

        {isPricingModalOpen && (
          <PricingModal
            isOpen={isPricingModalOpen}
            onClose={() => setIsPricingModalOpen(false)}
            reason={pricingReason}
            onUpgraded={(updated) => setUserProfile(updated)}
          />
        )}

        {isProjectsModalOpen && (
          <MyProjectsModal
            isOpen={isProjectsModalOpen}
            onClose={() => setIsProjectsModalOpen(false)}
            onSelectProject={handleSelectProject}
            onNewProject={handleResetNewEvent}
            userProfile={userProfile}
          />
        )}
      </Suspense>

      {/* Interactive AI Generation Progress Modal */}
      <GenerationProgressModal
        isOpen={isLoading}
        currentStep={generationStep}
        eventName={eventInput?.eventName || ''}
      />

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-md animate-fade-in transition-all bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
          <div
            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              toast.type === 'success' ? 'bg-emerald-500 animate-pulse' : toast.type === 'warning' ? 'bg-rose-500' : 'bg-indigo-500'
            }`}
          />
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
