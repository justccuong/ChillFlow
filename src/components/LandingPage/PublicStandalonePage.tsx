import React, { useEffect, useState } from 'react';
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
import { ExitIntentModal } from './ExitIntentModal';
import { SocialProofTicker } from './SocialProofTicker';
import { MasterclassStatsSection } from './sections/MasterclassStatsSection';
import { TerminalCodeSection } from './sections/TerminalCodeSection';
import { ExecutivePitchesSection } from './sections/ExecutivePitchesSection';
import { CreativeMasonrySection } from './sections/CreativeMasonrySection';
import { AcademySyllabusSection } from './sections/AcademySyllabusSection';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { recordView, recordConversion } from '../../services/publishService';
import { saveAttendee } from '../../services/storageService';
import { Zap, ArrowUp } from 'lucide-react';

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
  }, [slug, input.eventName]);

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

  const handleRegisterSuccess = (attendeeData: Omit<Attendee, 'id' | 'registeredAt'>) => {
    saveAttendee(attendeeData, input.eventName);
    recordConversion(slug);
    setRegisteredCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      
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
          isEditMode={false}
        />

        {/* 3. Sponsors / Trust Bar */}
        <div data-reveal>
          <TrustBarSection
            theme={theme}
            sponsors={input.sponsors}
            onOpenSponsorEditor={() => {}}
          />
        </div>

        {/* 4. Benefits */}
        <div data-reveal data-reveal-delay="100">
          <BenefitsSection benefits={content.benefits} theme={theme} />
        </div>

        {/* 5. Archetype Interactive Sections */}
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
        <div id="registration" data-reveal data-reveal-delay="100">
          <RegistrationSection
            input={input}
            content={content}
            theme={theme}
            onRegisterSuccess={handleRegisterSuccess}
            registeredCount={registeredCount}
          />
        </div>

        {/* 9. Testimonials */}
        <div data-reveal data-reveal-delay="100">
          <TestimonialsSection theme={theme} targetAudience={input.targetAudience} />
        </div>

        {/* 10. FAQs */}
        <div data-reveal data-reveal-delay="100">
          <FaqSection faqs={content.faqs} theme={theme} />
        </div>
      </main>

      {/* Sticky Bottom CTA */}
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

      {/* VIRAL LOOP WATERMARK BADGE (Free Tier Only) */}
      {userTier === 'free' && (
        <aside aria-label="ConvertFlow AI Attribution" className="fixed bottom-4 left-4 z-40">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/95 hover:bg-black text-white border border-indigo-500/40 shadow-2xl backdrop-blur-md transition-all hover:scale-105 group"
          >
            <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              <Zap className="w-3 h-3 fill-white" />
            </div>
            <div className="text-[11px] leading-tight">
              <span className="text-slate-400 block">Tạo bởi <strong className="text-white group-hover:text-indigo-300">ConvertFlow AI</strong></span>
              <span className="text-indigo-400 font-semibold underline decoration-indigo-400/40">Tạo trang miễn phí</span>
            </div>
          </a>
        </aside>
      )}

      {/* ConvertFlow CRO Power Pack Elements */}
      <ExitIntentModal
        eventName={input.eventName}
        onClaimOffer={scrollToRegistration}
      />
      <SocialProofTicker />
    </div>
  );
};
