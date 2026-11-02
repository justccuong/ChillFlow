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
}

export const MiniLivePreview: React.FC<MiniLivePreviewProps> = ({
  input,
  content,
  registeredCount = 0,
  scale = 0.32,
  className = '',
  visibility,
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

  const displayHeight = Math.round(ESTIMATED_HEIGHT * dynamicScale);

  const isVisible = (key: keyof SectionVisibilityConfig) => {
    if (!visibility) return true;
    return visibility[key] ?? true;
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
          )}
          {isVisible('trustBar') && (
            <TrustBarSection
              theme={theme}
              sponsors={input.sponsors}
            />
          )}
          {isVisible('benefits') && (
            <BenefitsSection
              benefits={content.benefits || []}
              theme={theme}
              isEditMode={false}
              category={input.category}
            />
          )}
          {isVisible('speaker') && (
            <SpeakerSection
              input={input}
              theme={theme}
              isEditMode={false}
            />
          )}
          {isVisible('testimonials') && (
            <TestimonialsSection
              testimonials={content.testimonials}
              theme={theme}
              isEditMode={false}
            />
          )}
          {isVisible('agenda') && (
            <AgendaSection
              agenda={content.agenda || []}
              eventName={input.eventName}
              theme={theme}
              speakerName={input.speakerName}
              speakerPhoto={input.speakerAvatarUrl || theme.speakerImage}
              isEditMode={false}
            />
          )}
          {isVisible('faq') && (
            <FaqSection
              faqs={content.faqs || []}
              theme={theme}
              isEditMode={false}
            />
          )}
          {isVisible('registration') && (
            <RegistrationSection
              input={input}
              content={content}
              theme={theme}
              registeredCount={registeredCount}
              onRegisterSuccess={() => undefined}
              isEditMode={false}
            />
          )}
          <EventFooterSection
            input={input}
            content={content}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};

export default MiniLivePreview;
