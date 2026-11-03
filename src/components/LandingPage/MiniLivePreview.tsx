import React, { useRef, useState, useEffect } from 'react';
import type { EventInput, GeneratedContent, CROEvaluation, SectionVisibilityConfig } from '../../types';
import { getThemeForCategory } from '../../services/themeEngine';
import { HeroSection } from './HeroSection';
import { TrustBarSection } from './TrustBarSection';
import { BenefitsSection } from './BenefitsSection';
import { SpeakerSection } from './SpeakerSection';
import { TestimonialsSection } from './TestimonialsSection';
import { AgendaSection } from './AgendaSection';
import { FaqSection } from './FaqSection';
import { RegistrationSection } from './RegistrationSection';
import { EventGallerySection } from './EventGallerySection';
import { EventFooterSection } from './EventFooterSection';

const INNER_WIDTH = 1280;
const ESTIMATED_HEIGHT = 4800;

interface MiniLivePreviewProps {
  input: EventInput;
  content: GeneratedContent;
  cro?: CROEvaluation;
  registeredCount?: number;
  scale?: number;
  className?: string;
  visibility?: SectionVisibilityConfig;
  highlightedSection?: string | null;
}

export const MiniLivePreview: React.FC<MiniLivePreviewProps> = ({
  input,
  content,
  registeredCount = 0,
  scale = 0.32,
  className = '',
  visibility,
  highlightedSection,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dynamicScale, setDynamicScale] = useState(scale);
  const theme = getThemeForCategory(input.category);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w > 0) setDynamicScale(w / INNER_WIDTH);
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Smooth scroll highlighted section into view inside preview container
  useEffect(() => {
    if (!highlightedSection) return;
    const el = document.getElementById(`mini-section-${highlightedSection}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightedSection]);

  const displayHeight = Math.round(ESTIMATED_HEIGHT * dynamicScale);

  const isVisible = (key: keyof SectionVisibilityConfig) => {
    if (!visibility) return true;
    return visibility[key] ?? true;
  };

  const renderHighlightAura = (key: string) => {
    if (highlightedSection !== key) return null;
    return (
      <div
        aria-hidden="true"
        className="absolute -inset-2 sm:-inset-4 bg-amber-400/20 dark:bg-amber-400/30 border-4 sm:border-8 border-amber-500 rounded-3xl pointer-events-none z-30 shadow-[0_0_80px_rgba(245,158,11,0.8)] animate-pulse"
      />
    );
  };

  return (
    <div
      ref={containerRef}
      className={`mini-live-preview-wrapper overflow-hidden relative rounded-xl border border-slate-200 dark:border-slate-700 bg-white shadow-xl ${className}`}
      style={{ width: '100%', height: displayHeight }}
    >
      <div
        className="mini-live-preview-inner absolute top-0 left-0"
        style={{
          width: INNER_WIDTH,
          transform: `scale(${dynamicScale})`,
          transformOrigin: 'top left',
          pointerEvents: 'none',
        }}
      >
        {/* Theme wrapper — matches LandingPagePreview's root section styles */}
        <div className="bg-white font-sans text-slate-900">
          {isVisible('hero') && (
            <div id="mini-section-hero" className="relative transition-all duration-300">
              {renderHighlightAura('hero')}
              <HeroSection
                input={input}
                content={content}
                theme={theme}
                headlineToDisplay={content.headline}
                onScrollToRegister={() => undefined}
                registeredCount={registeredCount}
                onOpenHeroImagePicker={() => undefined}
                onOpenSpeakerImagePicker={() => undefined}
                isEditMode={false}
              />
            </div>
          )}
          {isVisible('trustBar') && (
            <div id="mini-section-trustBar" className="relative transition-all duration-300">
              {renderHighlightAura('trustBar')}
              <TrustBarSection
                theme={theme}
                sponsors={input.sponsors}
              />
            </div>
          )}
          {isVisible('benefits') && (
            <div id="mini-section-benefits" className="relative transition-all duration-300">
              {renderHighlightAura('benefits')}
              <BenefitsSection
                benefits={content.benefits || []}
                theme={theme}
                isEditMode={false}
                category={input.category}
              />
            </div>
          )}
          {isVisible('speaker') && (
            <div id="mini-section-speaker" className="relative transition-all duration-300">
              {renderHighlightAura('speaker')}
              <SpeakerSection
                input={input}
                theme={theme}
                isEditMode={false}
              />
            </div>
          )}
          {isVisible('testimonials') && (
            <div id="mini-section-testimonials" className="relative transition-all duration-300">
              {renderHighlightAura('testimonials')}
              <TestimonialsSection
                testimonials={content.testimonials}
                theme={theme}
                isEditMode={false}
              />
            </div>
          )}
          {isVisible('agenda') && (
            <div id="mini-section-agenda" className="relative transition-all duration-300">
              {renderHighlightAura('agenda')}
              <AgendaSection
                agenda={content.agenda || []}
                eventName={input.eventName}
                theme={theme}
                speakerName={input.speakerName}
                speakerPhoto={input.speakerAvatarUrl || theme.speakerImage}
                isEditMode={false}
              />
            </div>
          )}
          {isVisible('gallery') && (
            <div id="mini-section-gallery" className="relative transition-all duration-300">
              {renderHighlightAura('gallery')}
              <EventGallerySection
                theme={theme}
                location={input.location || 'Địa điểm tổ chức'}
                photos={content.galleryPhotos || theme.galleryPhotos}
                isEditMode={false}
              />
            </div>
          )}
          {isVisible('faq') && (
            <div id="mini-section-faq" className="relative transition-all duration-300">
              {renderHighlightAura('faq')}
              <FaqSection
                faqs={content.faqs || []}
                theme={theme}
                isEditMode={false}
              />
            </div>
          )}
          {isVisible('registration') && (
            <div id="mini-section-registration" className="relative transition-all duration-300">
              {renderHighlightAura('registration')}
              <RegistrationSection
                input={input}
                content={content}
                theme={theme}
                registeredCount={registeredCount}
                onRegisterSuccess={() => undefined}
                isEditMode={false}
              />
            </div>
          )}
          <div id="mini-section-footer" className="relative transition-all duration-300">
            {renderHighlightAura('footer')}
            <EventFooterSection
              input={input}
              content={content}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniLivePreview;
