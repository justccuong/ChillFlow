import React, { useState, useEffect } from 'react';
import type { EventInput, GeneratedContent, CROEvaluation, Attendee, EventCategory, SponsorItem } from '../../types';
import { getThemeForCategory, CATEGORIES } from '../../services/themeEngine';
import { saveCurrentEventState } from '../../services/storageService';
import { HeroSection } from './HeroSection';
import { TrustBarSection } from './TrustBarSection';
import { BenefitsSection } from './BenefitsSection';
import { EventGallerySection } from './EventGallerySection';
import { SpeakerSection } from './SpeakerSection';
import { TestimonialsSection } from './TestimonialsSection';
import { AgendaSection } from './AgendaSection';
import { FaqSection } from './FaqSection';
import { RegistrationSection } from './RegistrationSection';
import { StickyBottomCta } from './StickyBottomCta';
import { CROScorecard } from '../CROScorecard';
import { ImagePickerModal } from '../ImagePickerModal';
import { SponsorEditorModal } from '../SponsorEditorModal';
import { MasterclassStatsSection } from './sections/MasterclassStatsSection';
import { TerminalCodeSection } from './sections/TerminalCodeSection';
import { ExecutivePitchesSection } from './sections/ExecutivePitchesSection';
import { CreativeMasonrySection } from './sections/CreativeMasonrySection';
import { AcademySyllabusSection } from './sections/AcademySyllabusSection';
import { MarketingBeforeAfterSection } from './sections/MarketingBeforeAfterSection';
import { StartupPitchingRosterSection } from './sections/StartupPitchingRosterSection';
import { DeveloperCodeSandboxSection } from './sections/DeveloperCodeSandboxSection';
import { TemplateCatalogModal } from '../TemplateCatalogModal';
import { TEMPLATE_LIBRARY, detectBestTemplate, getTemplateById } from '../../services/templateRegistry';
import { ExitIntentModal } from './ExitIntentModal';
import { SocialProofTicker } from './SocialProofTicker';
import { PublishModal } from './PublishModal';
import { CustomDomainModal } from '../CustomDomainModal';
import { publishEvent } from '../../services/publishService';
import { exportStandaloneHtml } from '../../utils/sourceExporter';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Sparkles, ArrowUp, BarChart3, Edit3, Palette, Globe, Send, Download, X, Layers } from 'lucide-react';
import type { UserProfile, PublishedPageRecord } from '../../types';

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
  onTriggerUpgrade?: (reason: string) => void;
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

  const recommendedTemplate = detectBestTemplate(input.eventName, input.targetAudience);
  const currentTemplateDef = getTemplateById(currentCategory);

  // Publishing & Domain Modals State
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [publishedRecord, setPublishedRecord] = useState<PublishedPageRecord | null>(null);
  const [isCustomDomainOpen, setIsCustomDomainOpen] = useState(false);

  // In-place Visual CMS field update handlers
  const handleUpdateContentField = (field: keyof GeneratedContent, val: any) => {
    const updated = { ...content, [field]: val };
    if (onUpdateContent) onUpdateContent(updated);
    saveCurrentEventState(input, updated, cro);
  };

  const handleUpdateInputField = (field: keyof EventInput, val: any) => {
    const updated: EventInput = { ...input, category: currentCategory, [field]: val };
    onUpdateInput(updated);
    saveCurrentEventState(updated, content, cro);
  };

  // Luôn reset cuộn lên đầu trang khi vào preview
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Image Picker state
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [imagePickerType, setImagePickerType] = useState<'hero' | 'speaker'>('hero');

  // Sponsor Editor state
  const [isSponsorEditorOpen, setIsSponsorEditorOpen] = useState(false);

  // Smooth scroll reveal observer (from awesome-landing-pages)
  useScrollReveal([currentCategory, content, input.sponsors]);

  // Deterministic Theme Engine mapping
  const theme = getThemeForCategory(currentCategory);

  const handlePublishOnline = () => {
    const result = publishEvent(
      { ...input, category: currentCategory },
      content,
      theme,
      userProfile?.tier || 'free'
    );

    if (!result.success) {
      if (onTriggerUpgrade) {
        onTriggerUpgrade(result.error || 'Đã hết hạn mức trang miễn phí. Vui lòng nâng cấp gói!');
      }
      return;
    }

    setPublishedRecord(result.record || null);
    setIsPublishModalOpen(true);
  };

  const handleExportSource = () => {
    exportStandaloneHtml(
      { ...input, category: currentCategory },
      content,
      theme,
      userProfile?.tier || 'free'
    );
  };

  const activeHeadline =
    headlineVariant === 'A' ? content.headline : content.alternativeHeadline || content.headline;

  const scrollToRegistration = () => {
    const el = document.getElementById('registration');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans pb-24">
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
          <span>Kho 6 Templates Sự Kiện</span>
        </button>
      </div>

      {/* Visual CMS Helper Banner */}
      {isEditMode && (
        <div className="sticky top-16 z-30 bg-emerald-600 text-white px-4 py-2 text-center text-xs font-medium flex items-center justify-center gap-2 shadow-sm animate-in fade-in duration-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>
            <strong>Chế độ Visual CMS đang hoạt động:</strong> Rê chuột vào các tiêu đề, địa điểm hoặc tên diễn giả để sửa chữ trực tiếp. Mọi thay đổi sẽ tự động lưu!
          </span>
        </div>
      )}

      {/* Floating Modern Studio Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 sm:gap-2.5 p-2 rounded-2xl bg-slate-950/92 backdrop-blur-2xl border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] text-white text-xs max-w-[96vw] shrink-0">
        {/* Kho Template Trigger Button */}
        <button
          type="button"
          onClick={() => setIsTemplateModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 font-semibold cursor-pointer transition-all shrink-0"
          title="Mở Kho 6 Templates Sự Kiện Độc Quyền"
        >
          <Palette className="w-3.5 h-3.5 text-cyan-400" />
          <span>Kho Template</span>
        </button>

        {/* Template Selector Quick Dropdown */}
        <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1.5 rounded-xl border border-white/10 shrink-0">
          <select
            value={currentCategory}
            onChange={e => setCurrentCategory(e.target.value as EventCategory)}
            className="bg-transparent border-none text-white text-xs font-semibold focus:outline-none cursor-pointer pr-1"
          >
            {CATEGORIES.map(c => (
              <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* CRO Score Pill Button */}
        <button
          type="button"
          onClick={() => setShowCRODrawer(!showCRODrawer)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 font-semibold cursor-pointer transition-all shrink-0"
          title="Bấm để xem phân tích CRO chi tiết"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">CRO:</span>
          <span className="font-bold text-white">{cro.totalScore}/100</span>
        </button>

        <div className="w-[1px] h-4 bg-white/20 mx-0.5 shrink-0 hidden sm:block"></div>

        {/* Visual CMS In-place Edit Toggle */}
        <button
          type="button"
          onClick={() => setIsEditMode(!isEditMode)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold cursor-pointer transition-all shrink-0 ${
            isEditMode
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
              : 'hover:bg-white/10 text-slate-300'
          }`}
          title="Bật/Tắt chế độ Visual CMS sửa chữ trực tiếp"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isEditMode ? 'Visual CMS (Bật)' : 'Sửa trực tiếp'}</span>
        </button>

        {/* Sửa form */}
        <button
          type="button"
          onClick={onEditForm}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/10 text-slate-300 font-semibold cursor-pointer transition-all shrink-0"
        >
          <span>Sửa form</span>
        </button>

        {/* 1-Click Online Publishing Button */}
        <button
          type="button"
          onClick={handlePublishOnline}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold cursor-pointer shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 shrink-0"
          title="Xuất bản online và lấy link chia sẻ"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Xuất bản</span>
        </button>

        {/* HTML Export Button */}
        <button
          type="button"
          onClick={handleExportSource}
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-semibold cursor-pointer transition-all shrink-0"
          title="Tải mã nguồn HTML trọn gói"
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          <span>Tải HTML</span>
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
            />
          </div>
        </div>
      )}

      {/* Main Landing Page Rendered Sections with Scroll Reveal Animations */}
      <main className="flex-1">
        {/* 1. Hero Section (Two-Column Split + Real Photo + Social Proof Avatars) */}
        <HeroSection
          input={{ ...input, category: currentCategory }}
          content={content}
          theme={theme}
          headlineToDisplay={activeHeadline}
          onScrollToRegister={scrollToRegistration}
          registeredCount={registeredCount}
          onOpenHeroImagePicker={handleOpenHeroPicker}
          onOpenSpeakerImagePicker={handleOpenSpeakerPicker}
          isEditMode={isEditMode}
          onUpdateContentField={handleUpdateContentField}
          onUpdateInputField={handleUpdateInputField}
        />

        {/* ========================================================
            CATEGORY 1: AI & TECH (Cyber Summit 2026)
            ======================================================== */}
        {currentCategory === 'ai-tech' && (
          <>
            <div data-reveal>
              <TrustBarSection
                theme={theme}
                sponsors={input.sponsors}
                onOpenSponsorEditor={() => setIsSponsorEditorOpen(true)}
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
          <>
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
          </>
        )}

        {/* ========================================================
            CATEGORY 3: DEVELOPER (Terminal Broadsheet & Telemetry)
            ======================================================== */}
        {currentCategory === 'developer' && (
          <>
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
          </>
        )}

        {/* ========================================================
            CATEGORY 4: STARTUP (Executive Dealflow & Pitching Roster)
            ======================================================== */}
        {currentCategory === 'startup' && (
          <>
            <div data-reveal data-reveal-delay="100">
              <ExecutivePitchesSection theme={theme} />
            </div>
            <div data-reveal data-reveal-delay="100">
              <StartupPitchingRosterSection
                theme={theme}
                onScrollToRegister={scrollToRegistration}
              />
            </div>
          </>
        )}

        {/* ========================================================
            CATEGORY 5: DESIGN (Creative Avant-Garde & Mood Canvas)
            ======================================================== */}
        {currentCategory === 'design' && (
          <>
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
          </>
        )}

        {/* ========================================================
            CATEGORY 6: EDUCATION (Academic Syllabus & ISO Accreditation)
            ======================================================== */}
        {currentCategory === 'education' && (
          <>
            <div data-reveal data-reveal-delay="100">
              <AcademySyllabusSection theme={theme} />
            </div>
            <div data-reveal data-reveal-delay="100">
              <BenefitsSection benefits={content.benefits} theme={theme} />
            </div>
            <div data-reveal data-reveal-delay="100">
              <FaqSection faqs={content.faqs} theme={theme} />
            </div>
          </>
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
      <footer className="bg-slate-950 border-t border-slate-900 py-10 px-4 text-center text-xs text-slate-500 space-y-2">
        <div className="font-semibold text-slate-300">
          {input.eventName}
        </div>
        <p className="text-slate-500">
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

      {/* Image Customizer Modal (Presets / Upload file / URL) */}
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

      {/* Sponsor Customizer Modal (Interactive editability from awesome-landing-pages) */}
      <SponsorEditorModal
        isOpen={isSponsorEditorOpen}
        onClose={() => setIsSponsorEditorOpen(false)}
        sponsors={input.sponsors || []}
        onSaveSponsors={handleSaveSponsors}
      />

      {/* ConvertFlow Exit-Intent Retention Modal */}
      <ExitIntentModal
        eventName={input.eventName}
        onClaimOffer={scrollToRegistration}
      />

      {/* ConvertFlow Social Proof Live Ticker */}
      <SocialProofTicker />

      {/* 1-Click Publish Success & Share Modal */}
      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        record={publishedRecord}
        onOpenCustomDomain={() => setIsCustomDomainOpen(true)}
        onExportSource={handleExportSource}
      />

      {/* Custom Domain Setup Guide Modal */}
      <CustomDomainModal
        isOpen={isCustomDomainOpen}
        onClose={() => setIsCustomDomainOpen(false)}
        eventName={input.eventName}
      />

      {/* Exclusive 6-Template Catalog Modal */}
      <TemplateCatalogModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        currentCategory={currentCategory}
        recommendedCategory={recommendedTemplate.id}
        onSelectTemplate={(newCat) => {
          setCurrentCategory(newCat);
          const updated: EventInput = { ...input, category: newCat };
          onUpdateInput(updated);
          saveCurrentEventState(updated, content, cro);
        }}
        eventName={input.eventName}
      />
    </div>
  );
};
