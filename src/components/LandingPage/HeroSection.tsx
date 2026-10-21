import React from 'react';
import type { EventInput, GeneratedContent, ThemeConfig } from '../../types';
import { ConferenceHero } from './heroes/ConferenceHero';
import { MasterclassHero } from './heroes/MasterclassHero';
import { TerminalHero } from './heroes/TerminalHero';
import { ExecutiveHero } from './heroes/ExecutiveHero';
import { CreativeHero } from './heroes/CreativeHero';
import { AcademyHero } from './heroes/AcademyHero';

interface HeroSectionProps {
  input: EventInput;
  content: GeneratedContent;
  theme: ThemeConfig;
  headlineToDisplay: string;
  onScrollToRegister: () => void;
  registeredCount: number;
  onOpenHeroImagePicker: () => void;
  onOpenSpeakerImagePicker: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  input,
  content,
  theme,
  headlineToDisplay,
  onScrollToRegister,
  registeredCount,
  onOpenHeroImagePicker,
}) => {
  const heroPhoto = input.heroImageUrl || theme.heroImage;

  const renderHeroByLayout = () => {
    switch (theme.layout) {
      case 'masterclass':
        return (
          <MasterclassHero
            input={input}
            content={content}
            theme={theme}
            headlineToDisplay={headlineToDisplay}
            onScrollToRegister={onScrollToRegister}
            registeredCount={registeredCount}
          />
        );
      case 'terminal':
        return (
          <TerminalHero
            input={input}
            content={content}
            theme={theme}
            headlineToDisplay={headlineToDisplay}
            onScrollToRegister={onScrollToRegister}
            registeredCount={registeredCount}
          />
        );
      case 'executive':
        return (
          <ExecutiveHero
            input={input}
            content={content}
            theme={theme}
            headlineToDisplay={headlineToDisplay}
            onScrollToRegister={onScrollToRegister}
            registeredCount={registeredCount}
          />
        );
      case 'creative':
        return (
          <CreativeHero
            input={input}
            content={content}
            theme={theme}
            headlineToDisplay={headlineToDisplay}
            onScrollToRegister={onScrollToRegister}
            registeredCount={registeredCount}
          />
        );
      case 'academy':
        return (
          <AcademyHero
            input={input}
            content={content}
            theme={theme}
            headlineToDisplay={headlineToDisplay}
            onScrollToRegister={onScrollToRegister}
            registeredCount={registeredCount}
          />
        );
      case 'conference':
      default:
        return (
          <ConferenceHero
            input={input}
            content={content}
            theme={theme}
            headlineToDisplay={headlineToDisplay}
            onScrollToRegister={onScrollToRegister}
            registeredCount={registeredCount}
            onOpenHeroImagePicker={onOpenHeroImagePicker}
          />
        );
    }
  };

  return (
    <section
      data-archetype={theme.layout}
      className={`relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-16 sm:pt-20 pb-20 sm:pb-28 px-4 md:px-8 border-b border-slate-200 dark:border-slate-900 starfield-bg dots-bg bg-grid-lines transition-all`}
    >
      {/* Immersive Background Image with Dark Gradient & Cosmic Light */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={heroPhoto}
          alt={input.eventName}
          className="w-full h-full object-cover object-center opacity-15 dark:opacity-25 filter brightness-90 dark:brightness-75 scale-105"
        />
        <div className="hero-bg-gradient absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/95 to-slate-50 dark:from-slate-950/80 dark:via-slate-950/90 dark:to-slate-950"></div>
        <div
          className={`ambient-glow-orb top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-tr ${theme.glowGradient} opacity-25 dark:opacity-35`}
        ></div>
      </div>

      {/* Render the dynamically selected Hero Archetype */}
      {renderHeroByLayout()}
    </section>
  );
};
