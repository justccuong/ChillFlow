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
import { StickyFomoBar } from './StickyFomoBar';
import { ExitIntentModal } from './ExitIntentModal';
import { SocialProofTicker } from './SocialProofTicker';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Sparkles, ArrowUp, BarChart3, Edit3, Palette } from 'lucide-react';

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
}) => {
  const [headlineVariant, setHeadlineVariant] = useState<'A' | 'B'>('A');
  const [showCRODrawer, setShowCRODrawer] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<EventCategory>(input.category || 'ai-tech');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Marketer Floating Toolbar */}
      <div className="sticky top-16 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-2 transition-colors">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowCRODrawer(!showCRODrawer)}
              className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-900 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 cursor-pointer"
              title="Bấm để xem phân tích CRO chi tiết"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span className="font-semibold text-slate-900 dark:text-slate-200">Điểm CRO:</span>
              <span className="font-bold text-indigo-700 dark:text-indigo-300">{cro.totalScore}/100</span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 hidden sm:inline">({showCRODrawer ? 'Thu gọn' : 'Xem chi tiết'})</span>
            </button>
          </div>

          {/* Instant Template Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-1">
            <span className="text-slate-600 dark:text-slate-400 px-1.5 flex items-center gap-1 text-[11px]">
              <Palette className="w-3 h-3 text-indigo-500 dark:text-indigo-400" /> Template:
            </span>
            <select
              value={currentCategory}
              onChange={e => setCurrentCategory(e.target.value as EventCategory)}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            {/* Visual CMS In-place Edit Toggle */}
            <button
              type="button"
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-3 py-1 rounded-lg border font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                isEditMode
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
              title="Bật/Tắt chế độ nhấp chuột trực tiếp lên trang để sửa chữ"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditMode ? 'Visual CMS (Đang bật)' : 'Sửa trực tiếp'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowCRODrawer(!showCRODrawer)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <BarChart3 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>{showCRODrawer ? 'Ẩn báo cáo' : 'Điểm CRO'}</span>
            </button>

            <button
              type="button"
              onClick={onEditForm}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Sửa form</span>
            </button>
          </div>
        </div>
      </div>

      {/* ConvertFlow Sticky FOMO Bar */}
      <StickyFomoBar
        targetDate={input.eventDate}
        onCtaClick={scrollToRegistration}
        earlyBirdBadge={content.earlyBirdBadge}
        ticketsLeft={38}
      />

      {/* Visual CMS Helper Banner */}
      {isEditMode && (
        <div className="bg-emerald-600 text-white px-4 py-2 text-center text-xs font-medium flex items-center justify-center gap-2 shadow-sm animate-in fade-in duration-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>
            <strong>Chế độ Visual CMS đang hoạt động:</strong> Rê chuột vào các tiêu đề, địa điểm hoặc tên diễn giả để sửa chữ trực tiếp. Mọi thay đổi sẽ tự động lưu!
          </span>
        </div>
      )}

      {/* Expandable CRO Panel */}
      {showCRODrawer && (
        <div className="bg-slate-50 dark:bg-slate-950 p-4 md:p-6 border-b border-slate-200 dark:border-slate-800 max-w-6xl mx-auto w-full transition-colors">
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

        {/* 2. Trust Bar / Social Proof Logos (Interactive SVG with Marquee & Editability) */}
        <div data-reveal>
          <TrustBarSection
            theme={theme}
            sponsors={input.sponsors}
            onOpenSponsorEditor={() => setIsSponsorEditorOpen(true)}
          />
        </div>

        {/* 3. 03 Bullet Benefits Section (Bento Grid) */}
        <div data-reveal data-reveal-delay="100">
          <BenefitsSection benefits={content.benefits} theme={theme} />
        </div>

        {/* 3.5. Distinct Archetype-Specific Interactive Sections */}
        {theme.layout === 'masterclass' && (
          <div data-reveal data-reveal-delay="100">
            <MasterclassStatsSection theme={theme} />
          </div>
        )}
        {theme.layout === 'terminal' && (
          <div data-reveal data-reveal-delay="100">
            <TerminalCodeSection theme={theme} />
          </div>
        )}
        {theme.layout === 'executive' && (
          <div data-reveal data-reveal-delay="100">
            <ExecutivePitchesSection theme={theme} />
          </div>
        )}
        {theme.layout === 'creative' && (
          <div data-reveal data-reveal-delay="100">
            <CreativeMasonrySection theme={theme} />
          </div>
        )}
        {theme.layout === 'academy' && (
          <div data-reveal data-reveal-delay="100">
            <AcademySyllabusSection theme={theme} />
          </div>
        )}

        {/* 4. Event Atmosphere & Real Photo Gallery Showcase */}
        <div data-reveal data-reveal-delay="100">
          <EventGallerySection theme={theme} location={input.location} />
        </div>

        {/* 5. Speaker Section + Real Speaker Portrait */}
        <div data-reveal data-reveal-delay="100">
          <SpeakerSection
            input={{ ...input, category: currentCategory }}
            theme={theme}
            onOpenSpeakerImagePicker={handleOpenSpeakerPicker}
          />
        </div>

        {/* 6. Community Testimonials & Social Proof */}
        <div data-reveal data-reveal-delay="100">
          <TestimonialsSection theme={theme} targetAudience={input.targetAudience} />
        </div>

        {/* 7. Agenda Section */}
        <div data-reveal data-reveal-delay="100">
          <AgendaSection
            agenda={content.agenda}
            eventName={input.eventName}
            theme={theme}
            speakerName={input.speakerName}
            speakerPhoto={speakerPhoto}
          />
        </div>

        {/* 8. FAQ Section */}
        <div data-reveal data-reveal-delay="100">
          <FaqSection faqs={content.faqs} theme={theme} />
        </div>

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

      {/* Sticky Bottom Conversion Bar */}
      <StickyBottomCta
        eventName={input.eventName}
        theme={theme}
        onScrollToRegister={scrollToRegistration}
        registeredCount={registeredCount}
        maxSeats={input.maxCapacity || 100}
      />

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
    </div>
  );
};
