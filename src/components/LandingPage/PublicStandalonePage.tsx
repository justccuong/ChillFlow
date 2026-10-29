import React, { useEffect, useState, lazy, Suspense } from 'react';
import { PublishedPageRecord, Attendee } from '../../types';
import { HeroSection } from './HeroSection';
import { TrustBarSection } from './TrustBarSection';
import { BenefitsSection } from './BenefitsSection';
import { SpeakerSection } from './SpeakerSection';
import { TestimonialsSection } from './TestimonialsSection';
import { AgendaSection } from './AgendaSection';
import { FaqSection } from './FaqSection';
import { RegistrationSection } from './RegistrationSection';
import { StickyBottomCta } from './StickyBottomCta';
import { SocialProofTicker } from './SocialProofTicker';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { recordView, recordConversion } from '../../services/publishService';
import { saveAttendee } from '../../services/storageService';
import { Zap, ArrowUp } from 'lucide-react';
import { injectEventJsonLdAndMeta } from '../../utils/seo';

// Code Splitting: Lazy-load Archetype Interactive Sections & Exit Intent
const ExitIntentModal = lazy(() => import('./ExitIntentModal'));
const MasterclassStatsSection = lazy(() => import('./sections/MasterclassStatsSection'));
const TerminalCodeSection = lazy(() => import('./sections/TerminalCodeSection'));
const ExecutivePitchesSection = lazy(() => import('./sections/ExecutivePitchesSection'));
const CreativeMasonrySection = lazy(() => import('./sections/CreativeMasonrySection'));
const AcademySyllabusSection = lazy(() => import('./sections/AcademySyllabusSection'));

interface PublicStandalonePageProps {
  page: PublishedPageRecord;
}

export const PublicStandalonePage: React.FC<PublicStandalonePageProps> = ({ page }) => {
  const { input, content, theme, userTier, slug } = page;
  const [registeredCount, setRegisteredCount] = useState(128);

  useEffect(() => {
    // Record page view for analytics
    recordView(slug);
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = `${input.eventName} | ConvertFlow Event`;

    // Inject OpenGraph Meta & JSON-LD Event Schema
    const cleanupSeo = injectEventJsonLdAndMeta(input, content, theme);
    return () => {
      cleanupSeo();
    };
  }, [slug, input, content, theme]);

  useScrollReveal([theme.id, content]);

  const scrollToRegistration = () => {
    const el = document.getElementById('registration');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegisterSuccess = (attendee: Omit<Attendee, 'id' | 'registeredAt'>) => {
    saveAttendee(attendee, input.eventName);
    recordConversion(slug);
    setRegisteredCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* 1. Sticky ConvertFlow Badge for Free Tier */}
      {userTier === 'free' && (
        <aside className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md text-slate-300 text-xs py-2 px-4 border-b border-slate-800 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Trang sự kiện tạo tự động bằng <strong>ConvertFlow AI</strong></span>
          </div>
          <a
            href="/"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600/30 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all font-semibold"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Tự tạo trang miễn phí</span>
          </a>
        </aside>
      )}

      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection
          input={input}
          content={content}
          theme={theme}
          headlineToDisplay={content.headline}
          onScrollToRegister={scrollToRegistration}
          registeredCount={registeredCount}
          onOpenHeroImagePicker={() => {}}
          onOpenSpeakerImagePicker={() => {}}
        />

        {/* 3. Social Proof Trust Bar */}
        <div data-reveal>
          <TrustBarSection
            theme={theme}
            sponsors={input.sponsors}
          />
        </div>

        {/* 4. Core Benefits Bento */}
        <div data-reveal data-reveal-delay="100">
          <BenefitsSection benefits={content.benefits} theme={theme} />
        </div>

        {/* 5. Archetype Interactive Sections with Lazy Loading & Suspense */}
        <Suspense fallback={null}>
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
        </Suspense>

        {/* 6. Speaker Section */}
        <div data-reveal data-reveal-delay="100">
          <SpeakerSection input={input} theme={theme} />
        </div>

        {/* 7. Agenda Timeline */}
        <div data-reveal data-reveal-delay="100">
          <AgendaSection
            agenda={content.agenda}
            eventName={input.eventName}
            theme={theme}
            speakerName={input.speakerName}
            speakerPhoto={input.speakerAvatarUrl || theme.speakerImage}
          />
        </div>

        {/* 8. Registration Ticket Section */}
        <div data-reveal data-reveal-delay="100" id="registration">
          <RegistrationSection
            input={input}
            content={content}
            theme={theme}
            registeredCount={registeredCount}
            onRegisterSuccess={handleRegisterSuccess}
            onOpenAttendeeList={() => {}}
          />
        </div>

        {/* 9. Social Proof Testimonials */}
        <div data-reveal data-reveal-delay="100">
          <TestimonialsSection theme={theme} targetAudience={input.targetAudience} />
        </div>

        {/* 10. FAQ Accordion */}
        <div data-reveal data-reveal-delay="100">
          <FaqSection faqs={content.faqs} theme={theme} />
        </div>
      </main>

      {/* Modern High-Conversion Floating CTA */}
      <StickyBottomCta
        eventName={input.eventName}
        theme={theme}
        onScrollToRegister={scrollToRegistration}
        registeredCount={registeredCount}
        maxSeats={input.maxCapacity || 100}
      />

      {/* Clean Client Event Footer */}
      <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-12 px-4 text-center text-xs text-slate-500 space-y-3 transition-colors pb-24 md:pb-12">
        <div className="font-semibold text-slate-800 dark:text-slate-300 text-sm">
          {input.eventName}
        </div>
        <p className="max-w-md mx-auto text-slate-400">
          Trang đích sự kiện chính thức. Đăng ký để giữ chỗ và nhận tài liệu đào tạo sớm nhất.
        </p>
        <div className="pt-4 text-slate-400 text-[11px]">
          Powered by <a href="/" className="text-indigo-500 hover:underline font-semibold">ConvertFlow AI</a>
        </div>
      </footer>

      {/* Back to top floating button */}
      <button
        type="button"
        onClick={scrollToTop}
        className="fixed bottom-24 md:bottom-6 right-6 z-30 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-slate-300 border border-slate-700 shadow-xl cursor-pointer backdrop-blur-md transition-colors"
        title="Cuộn lên đầu trang"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* ConvertFlow Exit-Intent Retention Modal */}
      <Suspense fallback={null}>
        <ExitIntentModal
          eventName={input.eventName}
          onClaimOffer={scrollToRegistration}
        />
      </Suspense>

      {/* ConvertFlow Social Proof Live Ticker */}
      <SocialProofTicker />
    </div>
  );
};
export default PublicStandalonePage;
