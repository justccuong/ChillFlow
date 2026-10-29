import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import type { EventInput, GeneratedContent, CROEvaluation, Attendee, EventCategory, SponsorItem } from '../../types';
import { getThemeForCategory, CATEGORIES } from '../../services/themeEngine';
import { saveCurrentEventState } from '../../services/storageService';
import { HeroSection } from './HeroSection';
import { TrustBarSection } from './TrustBarSection';
import { BenefitsSection } from './BenefitsSection';
import { SpeakerSection } from './SpeakerSection';
import { TestimonialsSection } from './TestimonialsSection';
import { AgendaSection } from './AgendaSection';
import { FaqSection } from './FaqSection';
import { RegistrationSection } from './RegistrationSection';
import { CROScorecard } from '../CROScorecard';
import { detectBestTemplate, getTemplateById } from '../../services/templateRegistry';
import { SocialProofTicker } from './SocialProofTicker';
import { publishEvent } from '../../services/publishService';
import { exportStandaloneHtml } from '../../utils/sourceExporter';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Sparkles, ArrowUp, Edit3, Palette, Send, X, Undo2, Redo2 } from 'lucide-react';
import { NumberTicker } from '../magicui';
import type { UserProfile, PublishedPageRecord } from '../../types';
import { useLandingPageStore } from '../../store/useLandingPageStore';
import { useUndoRedoKeyboard } from '../../hooks/useUndoRedoKeyboard';

// Code Splitting: Lazy-load Modals
const ImagePickerModal = lazy(() => import('../ImagePickerModal'));
const SponsorEditorModal = lazy(() => import('../SponsorEditorModal'));
const TemplateCatalogModal = lazy(() => import('../TemplateCatalogModal'));
const ExitIntentModal = lazy(() => import('./ExitIntentModal'));
const PublishModal = lazy(() => import('./PublishModal'));
const CustomDomainModal = lazy(() => import('../CustomDomainModal'));

// Code Splitting: Lazy-load 9 Category-specific Section Variants
const MasterclassStatsSection = lazy(() => import('./sections/MasterclassStatsSection'));
const TerminalCodeSection = lazy(() => import('./sections/TerminalCodeSection'));
const ExecutivePitchesSection = lazy(() => import('./sections/ExecutivePitchesSection'));
const CreativeMasonrySection = lazy(() => import('./sections/CreativeMasonrySection'));
const AcademySyllabusSection = lazy(() => import('./sections/AcademySyllabusSection'));
const MarketingBeforeAfterSection = lazy(() => import('./sections/MarketingBeforeAfterSection'));
const StartupPitchingRosterSection = lazy(() => import('./sections/StartupPitchingRosterSection'));
const DeveloperCodeSandboxSection = lazy(() => import('./sections/DeveloperCodeSandboxSection'));
const CinematicShowcaseSection = lazy(() => import('./sections/CinematicShowcaseSection'));

function SectionFallback() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 animate-pulse">
      <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-xl mb-4 mx-auto" />
      <div className="h-36 bg-slate-100 dark:bg-slate-900/60 rounded-2xl mx-auto" />
    </div>
  );
}

interface LandingPagePreviewProps {
  input: EventInput;
  content: GeneratedContent;
  cro: CROEvaluation;
  registeredCount: number;
  onRegisterSuccess: (attendee: Omit<Attendee, 'id' | 'registeredAt'>) => void;
  onOpenAttendeeList: () => void;
  onOptimizeCRO: () => void;
  isOptimizing: boolean;
  isAlreadyOptimized: boolean;
  onEditForm: () => void;
  onUpdateInput: (updatedInput: EventInput) => void;
  onUpdateContent?: (updatedContent: GeneratedContent) => void;
  userProfile?: UserProfile;
  onTriggerUpgrade?: (reason?: string) => void;
}

export const LandingPagePreview: React.FC<LandingPagePreviewProps> = ({
  input,
  content,
  cro,
  registeredCount,
  onRegisterSuccess,
  onOpenAttendeeList,
  onOptimizeCRO,
  isOptimizing,
  isAlreadyOptimized,
  onEditForm,
  onUpdateInput,
  onUpdateContent,
  userProfile,
  onTriggerUpgrade,
}) => {
  const [headlineVariant, setHeadlineVariant] = useState<'A' | 'B'>('A');
  const [showCRODrawer, setShowCRODrawer] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<EventCategory>(input.category || 'ai-tech');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState<boolean>(false);
  const previewContainerRef = useRef<HTMLElement>(null);

  // Undo / Redo Global Store Integration
  const undo = useLandingPageStore((s) => s.undo);
  const redo = useLandingPageStore((s) => s.redo);
  const canUndo = useLandingPageStore((s) => s.history.length > 0);
  const canRedo = useLandingPageStore((s) => s.future.length > 0);

  // Register global Ctrl+Z / Ctrl+Y keyboard shortcuts
  useUndoRedoKeyboard();

  const handleUndo = () => {
    if (undo()) {
      const updated = useLandingPageStore.getState().content;
      if (updated && onUpdateContent) onUpdateContent(updated);
    }
  };

  const handleRedo = () => {
    if (redo()) {
      const updated = useLandingPageStore.getState().content;
      if (updated && onUpdateContent) onUpdateContent(updated);
    }
  };

  const recommendedTemplate = detectBestTemplate(input.eventName, input.targetAudience);
  const currentTemplateDef = getTemplateById(currentCategory);

  // Publishing & Domain Modals State
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [publishedRecord, setPublishedRecord] = useState<PublishedPageRecord | null>(null);
  const [isCustomDomainOpen, setIsCustomDomainOpen] = useState(false);

  // In-place Visual CMS field update handlers with Undo/Redo tracking
  const handleUpdateContentField = (field: keyof GeneratedContent, val: unknown) => {
    useLandingPageStore.getState().updateContentField(field, val);
    const updated = { ...content, [field]: val };
    if (onUpdateContent) onUpdateContent(updated);
    saveCurrentEventState(input, updated, cro);
  };

  const handleUpdateInputField = (field: keyof EventInput, val: unknown) => {
    const updated: EventInput = { ...input, category: currentCategory, [field]: val };
    onUpdateInput(updated);
    saveCurrentEventState(updated, content, cro);
  };

  // Reset scroll to top upon entering preview
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Image Picker state
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [imagePickerType, setImagePickerType] = useState<'hero' | 'speaker'>('hero');

  // Sponsor Editor state
  const [isSponsorEditorOpen, setIsSponsorEditorOpen] = useState(false);

  const theme = getThemeForCategory(currentCategory);

  // Initialize Scroll Reveal observer
  useScrollReveal([currentCategory, content.headline]);

  const activeHeadline = headlineVariant === 'B' && content.alternativeHeadline
    ? content.alternativeHeadline
    : content.headline;

  const scrollToRegistration = () => {
    const el = document.getElementById('registration-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle 1-Click Publishing
  const handlePublishOnline = () => {
    const res = publishEvent(
      { ...input, category: currentCategory },
      content,
      theme,
      userProfile?.tier || 'free'
    );

    if (!res.success) {
      if (onTriggerUpgrade) {
        onTriggerUpgrade(res.error || 'Bạn đã dùng hết lượt xuất bản miễn phí (2 trang). Hãy nâng cấp để xuất bản không giới hạn!');
      }
      return;
    }

    if (res.record) {
      setPublishedRecord(res.record);
      setIsPublishModalOpen(true);
    }
  };

  // Standalone HTML source export
  const handleExportSource = () => {
    exportStandaloneHtml(
      { ...input, category: currentCategory },
      content,
      theme,
      userProfile?.tier || 'free'
    );
  };

  const handleOpenHeroPicker = () => {
    setImagePickerType('hero');
    setIsImagePickerOpen(true);
  };

  const handleOpenSpeakerPicker = () => {
    setImagePickerType('speaker');
    setIsImagePickerOpen(true);
  };

  const handleSelectImage = (newUrl: string) => {
    const updated: EventInput = {
      ...input,
      category: currentCategory,
      ...(imagePickerType === 'hero' ? { heroImageUrl: newUrl } : { speakerAvatarUrl: newUrl }),
    };
    onUpdateInput(updated);
    saveCurrentEventState(updated, content, cro);
  };

  const handleSaveSponsors = (updatedSponsors: SponsorItem[]) => {
    const updated: EventInput = {
      ...input,
      category: currentCategory,
      sponsors: updatedSponsors,
    };
    onUpdateInput(updated);
    saveCurrentEventState(updated, content, cro);
  };

  const speakerPhoto = input.speakerAvatarUrl || theme.speakerImage;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans pb-24 overflow-x-hidden">
      {/* Top AI Match Notification Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-3 pb-1 flex flex-wrap items-center justify-between gap-3 text-xs w-full">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>
            <strong>AI Auto-Matched:</strong> Đã kích hoạt template <strong className="text-indigo-600 dark:text-indigo-200">"{currentTemplateDef.name}"</strong> ({currentTemplateDef.categoryLabel}) từ Kho Template.
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsTemplateModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold cursor-pointer transition-all shadow-sm"
        >
          <Palette className="w-3.5 h-3.5 text-cyan-500" />
          <span>Kho 7 Templates Sự Kiện</span>
        </button>
      </div>

      {/* Visual CMS Helper Banner */}
      {isEditMode && (
        <div className="sticky top-16 z-30 bg-emerald-600 text-white px-4 py-2 text-center text-xs font-medium flex items-center justify-center gap-2 shadow-sm animate-in fade-in duration-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>
            <strong>Chế độ Visual CMS đang hoạt động:</strong> Rê chuột vào các tiêu đề, địa điểm hoặc tên diễn giả để sửa chữ trực tiếp. Mọi thay đổi sẽ tự động lưu! (Hỗ trợ phím tắt <kbd className="px-1.5 py-0.5 rounded bg-black/30 font-mono text-[10px]">Ctrl+Z</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-black/30 font-mono text-[10px]">Ctrl+Y</kbd> để Hoàn tác / Làm lại).
          </span>
        </div>
      )}

      {/* Floating Modern Studio Dock */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 sm:gap-2.5 p-1.5 sm:p-2 rounded-2xl bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-slate-200 dark:border-white/15 shadow-[0_12px_40px_-5px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)] text-slate-800 dark:text-white text-xs max-w-[calc(100vw-1rem)] overflow-x-auto shrink-0 scrollbar-none transition-colors">
        {/* Kho Template Trigger Button */}
        <button
          type="button"
          onClick={() => setIsTemplateModalOpen(true)}
          className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/20 dark:hover:bg-indigo-500/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/40 font-semibold cursor-pointer transition-all shrink-0"
          title="Mở Kho 7 Templates Sự Kiện Độc Quyền"
        >
          <Palette className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400 shrink-0" />
          <span className="hidden sm:inline">Kho Template</span>
        </button>

        {/* Template Selector Quick Dropdown */}
        <div className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200/80 dark:bg-white/10 dark:hover:bg-white/15 px-2 sm:px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 shrink-0 transition-colors">
          <select
            value={currentCategory}
            onChange={e => setCurrentCategory(e.target.value as EventCategory)}
            className="bg-transparent border-none text-slate-900 dark:text-white text-xs font-semibold focus:outline-none cursor-pointer pr-1 max-w-[110px] sm:max-w-none truncate"
          >
            {CATEGORIES.map(c => (
              <option key={c.id} value={c.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium">
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* CRO Score Pill Button */}
        <button
          type="button"
          onClick={() => setShowCRODrawer(!showCRODrawer)}
          className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-transparent font-semibold cursor-pointer transition-all shrink-0"
          title="Bấm để xem phân tích CRO chi tiết"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
          <span className="hidden sm:inline">CRO:</span>
          <span className="font-bold text-slate-900 dark:text-white">
            <NumberTicker value={cro.totalScore} />/100
          </span>
        </button>

        <div className="w-[1px] h-4 bg-slate-300 dark:bg-white/20 mx-0.5 shrink-0 hidden sm:block"></div>

        {/* Visual CMS In-place Edit Toggle */}
        <button
          type="button"
          onClick={() => setIsEditMode(!isEditMode)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all shrink-0 ${
            isEditMode
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-500/50 scale-105'
              : 'bg-slate-100 hover:bg-slate-200/80 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-transparent'
          }`}
          title="Bật/Tắt chế độ Visual CMS sửa chữ trực tiếp và kích hoạt AI Viết lại"
        >
          <Edit3 className={`w-3.5 h-3.5 shrink-0 ${isEditMode ? 'text-white animate-pulse' : 'text-emerald-600 dark:text-emerald-400'}`} />
          <span>{isEditMode ? 'Sửa chữ (Đang bật)' : 'Sửa chữ (Visual CMS)'}</span>
        </button>

        {/* Undo Button (Ctrl+Z) */}
        <button
          type="button"
          onClick={handleUndo}
          disabled={!canUndo}
          className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl font-semibold cursor-pointer transition-all shrink-0 ${
            canUndo
              ? 'bg-slate-100 hover:bg-slate-200/80 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white'
              : 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-white/5 text-slate-400'
          }`}
          title="Hoàn tác chỉnh sửa (Ctrl+Z)"
        >
          <Undo2 className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden lg:inline text-[11px]">Undo</span>
        </button>

        {/* Redo Button (Ctrl+Y) */}
        <button
          type="button"
          onClick={handleRedo}
          disabled={!canRedo}
          className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl font-semibold cursor-pointer transition-all shrink-0 ${
            canRedo
              ? 'bg-slate-100 hover:bg-slate-200/80 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white'
              : 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-white/5 text-slate-400'
          }`}
          title="Làm lại chỉnh sửa (Ctrl+Y)"
        >
          <Redo2 className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden lg:inline text-[11px]">Redo</span>
        </button>

        {/* Sửa form */}
        <button
          type="button"
          onClick={onEditForm}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold cursor-pointer transition-all shrink-0"
        >
          <span>Sửa form</span>
        </button>

        {/* 1-Click Online Publishing Button */}
        <button
          type="button"
          onClick={handlePublishOnline}
          className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold cursor-pointer shadow-lg shadow-emerald-600/25 transition-all hover:scale-105 shrink-0"
          title="Xuất bản online và lấy link chia sẻ"
        >
          <Send className="w-3.5 h-3.5 shrink-0" />
          <span className="text-xs">Xuất bản</span>
        </button>
      </div>

      {/* Floating CRO Drawer Modal */}
      {showCRODrawer && (
        <div className="fixed inset-x-0 bottom-24 z-50 max-w-4xl mx-auto px-4 animate-in slide-in-from-bottom-6 duration-300">
          <div className="bg-slate-900/95 text-white backdrop-blur-2xl p-6 rounded-3xl border border-white/20 shadow-2xl relative max-h-[75vh] overflow-y-auto">
            <button
              onClick={() => setShowCRODrawer(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <CROScorecard
              cro={cro}
              onOptimize={onOptimizeCRO}
              isOptimizing={isOptimizing}
              isAlreadyOptimized={isAlreadyOptimized}
              activeHeadlineVariant={headlineVariant}
              onToggleHeadlineVariant={() => setHeadlineVariant(v => (v === 'A' ? 'B' : 'A'))}
              primaryHeadline={content.headline}
              alternativeHeadline={content.alternativeHeadline}
              onApplyHeadline={(newHeadline) => handleUpdateContentField('headline', newHeadline)}
              theme={theme}
              category={currentCategory}
              previewContainerRef={previewContainerRef}
            />
          </div>
        </div>
      )}

      {/* Main Landing Page Rendered Sections with Scroll Reveal Animations */}
      <main ref={previewContainerRef} className="flex-1">
        {/* 1. Hero Section (Two-Column Split + Real Photo + Social Proof Avatars) */}
        <HeroSection
          input={{ ...input, category: currentCategory }}
          content={content}
          theme={theme}
          headlineToDisplay={activeHeadline}
          headlineVariant={headlineVariant}
          onScrollToRegister={scrollToRegistration}
          registeredCount={registeredCount}
          onOpenHeroImagePicker={handleOpenHeroPicker}
          onOpenSpeakerImagePicker={handleOpenSpeakerPicker}
          isEditMode={isEditMode}
          onUpdateContentField={handleUpdateContentField}
          onUpdateInputField={handleUpdateInputField}
        />

        {/* Universal Magic UI Velocity Sponsors & Trust Bar */}
        <div data-reveal>
          <TrustBarSection
            theme={theme}
            sponsors={input.sponsors}
            onOpenSponsorEditor={() => setIsSponsorEditorOpen(true)}
          />
        </div>

        {/* ========================================================
            CATEGORY 1: AI & TECH (Cyber Summit 2026)
            ======================================================== */}
        {currentCategory === 'ai-tech' && (
          <>
            <div data-reveal data-reveal-delay="100">
              <BenefitsSection benefits={content.benefits} theme={theme} />
            </div>
            <div data-reveal data-reveal-delay="100">
              <SpeakerSection
                input={{ ...input, category: currentCategory }}
                theme={theme}
                onOpenSpeakerImagePicker={handleOpenSpeakerPicker}
              />
            </div>
            <div data-reveal data-reveal-delay="100">
              <AgendaSection
                agenda={content.agenda}
                eventName={input.eventName}
                theme={theme}
                speakerName={input.speakerName}
                speakerPhoto={speakerPhoto}
              />
            </div>
            <div data-reveal data-reveal-delay="100">
              <FaqSection faqs={content.faqs} theme={theme} />
            </div>
          </>
        )}

        {/* ========================================================
            CATEGORY 2: MARKETING & GROWTH (High-Conversion Masterclass)
            ======================================================== */}
        {currentCategory === 'marketing' && (
          <Suspense fallback={<SectionFallback />}>
            <div data-reveal data-reveal-delay="100">
              <MasterclassStatsSection theme={theme} />
            </div>
            <div data-reveal data-reveal-delay="100">
              <MarketingBeforeAfterSection
                theme={theme}
                onScrollToRegister={scrollToRegistration}
              />
            </div>
            <div data-reveal data-reveal-delay="100">
              <TestimonialsSection theme={theme} targetAudience={input.targetAudience} />
            </div>
            <div data-reveal data-reveal-delay="100">
              <FaqSection faqs={content.faqs} theme={theme} />
            </div>
          </Suspense>
        )}

        {/* ========================================================
            CATEGORY 3: DEVELOPER (Terminal Broadsheet & Telemetry)
            ======================================================== */}
        {currentCategory === 'developer' && (
          <Suspense fallback={<SectionFallback />}>
            <div data-reveal data-reveal-delay="100">
              <TerminalCodeSection theme={theme} />
            </div>
            <div data-reveal data-reveal-delay="100">
              <DeveloperCodeSandboxSection theme={theme} />
            </div>
            <div data-reveal data-reveal-delay="100">
              <SpeakerSection
                input={{ ...input, category: currentCategory }}
                theme={theme}
                onOpenSpeakerImagePicker={handleOpenSpeakerPicker}
              />
            </div>
            <div data-reveal data-reveal-delay="100">
              <AgendaSection
                agenda={content.agenda}
                eventName={input.eventName}
                theme={theme}
                speakerName={input.speakerName}
                speakerPhoto={speakerPhoto}
              />
            </div>
          </Suspense>
        )}

        {/* ========================================================
            CATEGORY 4: STARTUP (Executive Dealflow & Pitching Roster)
            ======================================================== */}
        {currentCategory === 'startup' && (
          <Suspense fallback={<SectionFallback />}>
            <div data-reveal data-reveal-delay="100">
              <ExecutivePitchesSection theme={theme} />
            </div>
            <div data-reveal data-reveal-delay="100">
              <StartupPitchingRosterSection
                theme={theme}
                onScrollToRegister={scrollToRegistration}
              />
            </div>
          </Suspense>
        )}

        {/* ========================================================
            CATEGORY 5: DESIGN (Creative Avant-Garde & Mood Canvas)
            ======================================================== */}
        {currentCategory === 'design' && (
          <Suspense fallback={<SectionFallback />}>
            <div data-reveal data-reveal-delay="100">
              <CreativeMasonrySection theme={theme} />
            </div>
            <div data-reveal data-reveal-delay="100">
              <BenefitsSection benefits={content.benefits} theme={theme} />
            </div>
            <div data-reveal data-reveal-delay="100">
              <SpeakerSection
                input={{ ...input, category: currentCategory }}
                theme={theme}
                onOpenSpeakerImagePicker={handleOpenSpeakerPicker}
              />
            </div>
          </Suspense>
        )}

        {/* ========================================================
            CATEGORY 6: EDUCATION (Academic Syllabus & ISO Accreditation)
            ======================================================== */}
        {currentCategory === 'education' && (
          <Suspense fallback={<SectionFallback />}>
            <div data-reveal data-reveal-delay="100">
              <AcademySyllabusSection theme={theme} />
            </div>
            <div data-reveal data-reveal-delay="100">
              <BenefitsSection benefits={content.benefits} theme={theme} />
            </div>
            <div data-reveal data-reveal-delay="100">
              <FaqSection faqs={content.faqs} theme={theme} />
            </div>
          </Suspense>
        )}

        {/* ========================================================
            CATEGORY 7: STUDIO 3D (Cinematic 3D Studio & Experiential Showcase)
            ======================================================== */}
        {currentCategory === 'studio-3d' && (
          <Suspense fallback={<SectionFallback />}>
            <div data-reveal data-reveal-delay="100">
              <CinematicShowcaseSection
                theme={theme}
                onScrollToRegister={scrollToRegistration}
              />
            </div>
            <div data-reveal data-reveal-delay="100">
              <BenefitsSection benefits={content.benefits} theme={theme} />
            </div>
            <div data-reveal data-reveal-delay="100">
              <SpeakerSection
                input={{ ...input, category: currentCategory }}
                theme={theme}
                onOpenSpeakerImagePicker={handleOpenSpeakerPicker}
              />
            </div>
            <div data-reveal data-reveal-delay="100">
              <FaqSection faqs={content.faqs} theme={theme} />
            </div>
          </Suspense>
        )}

        {/* 9. Registration Section */}
        <div data-reveal data-reveal-delay="100">
          <RegistrationSection
            input={{ ...input, category: currentCategory }}
            content={content}
            theme={theme}
            registeredCount={registeredCount}
            onRegisterSuccess={onRegisterSuccess}
            onOpenAttendeeList={onOpenAttendeeList}
          />
        </div>
      </main>

      {/* Clean Client Event Footer */}
      <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-10 px-4 text-center text-xs text-slate-600 dark:text-slate-400 space-y-2 transition-colors">
        <div className="font-semibold text-slate-900 dark:text-slate-200">
          {input.eventName}
        </div>
        <p className="text-slate-500 dark:text-slate-400">
          Mọi thắc mắc về sự kiện xin vui lòng liên hệ ban tổ chức.
        </p>
      </footer>

      {/* Back to top floating button */}
      <button
        type="button"
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-30 p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 shadow-lg cursor-pointer transition-colors"
        title="Cuộn lên đầu trang"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* Lazy-loaded Modals with Suspense */}
      <Suspense fallback={null}>
        {/* Image Customizer Modal */}
        {isImagePickerOpen && (
          <ImagePickerModal
            isOpen={isImagePickerOpen}
            onClose={() => setIsImagePickerOpen(false)}
            title={imagePickerType === 'hero' ? 'Thay đổi ảnh nền Hero' : 'Thay đổi ảnh chân dung diễn giả'}
            presetType={imagePickerType}
            currentImage={
              imagePickerType === 'hero'
                ? input.heroImageUrl || theme.heroImage
                : input.speakerAvatarUrl || theme.speakerImage
            }
            onSelectImage={handleSelectImage}
          />
        )}

        {/* Sponsor Customizer Modal */}
        {isSponsorEditorOpen && (
          <SponsorEditorModal
            isOpen={isSponsorEditorOpen}
            onClose={() => setIsSponsorEditorOpen(false)}
            sponsors={input.sponsors || []}
            onSaveSponsors={handleSaveSponsors}
          />
        )}

        {/* ConvertFlow Exit-Intent Retention Modal */}
        <ExitIntentModal
          eventName={input.eventName}
          onClaimOffer={scrollToRegistration}
        />

        {/* 1-Click Publish Success & Share Modal */}
        {isPublishModalOpen && (
          <PublishModal
            isOpen={isPublishModalOpen}
            onClose={() => setIsPublishModalOpen(false)}
            record={publishedRecord}
            onOpenCustomDomain={() => setIsCustomDomainOpen(true)}
            onExportSource={handleExportSource}
          />
        )}

        {/* Custom Domain Setup Guide Modal */}
        {isCustomDomainOpen && (
          <CustomDomainModal
            isOpen={isCustomDomainOpen}
            onClose={() => setIsCustomDomainOpen(false)}
            eventName={input.eventName}
          />
        )}

        {/* Exclusive 6-Template Catalog Modal */}
        {isTemplateModalOpen && (
          <TemplateCatalogModal
            isOpen={isTemplateModalOpen}
            onClose={() => setIsTemplateModalOpen(false)}
            currentCategory={currentCategory}
            recommendedCategory={recommendedTemplate.id}
            onSelectTemplate={(newCat) => {
              setCurrentCategory(newCat);
              handleUpdateInputField('category', newCat);
              setIsTemplateModalOpen(false);
            }}
          />
        )}
      </Suspense>

      {/* ConvertFlow Social Proof Live Ticker */}
      <SocialProofTicker />
    </div>
  );
};
export default LandingPagePreview;
