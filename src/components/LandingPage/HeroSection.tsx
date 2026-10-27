import React, { lazy, Suspense } from 'react';
import type { EventInput, GeneratedContent, ThemeConfig } from '../../types';
import { Particles } from '../magicui';
import { useThemeMode } from '../../hooks/useThemeMode';

// Dynamic lazy imports for the 7 Hero Archetypes
const ConferenceHero = lazy(() => import('./heroes/ConferenceHero').then((m) => ({ default: m.ConferenceHero })));
const MasterclassHero = lazy(() => import('./heroes/MasterclassHero').then((m) => ({ default: m.MasterclassHero })));
const TerminalHero = lazy(() => import('./heroes/TerminalHero').then((m) => ({ default: m.TerminalHero })));
const ExecutiveHero = lazy(() => import('./heroes/ExecutiveHero').then((m) => ({ default: m.ExecutiveHero })));
const CreativeHero = lazy(() => import('./heroes/CreativeHero').then((m) => ({ default: m.CreativeHero })));
const AcademyHero = lazy(() => import('./heroes/AcademyHero').then((m) => ({ default: m.AcademyHero })));
const CinematicStudioHero = lazy(() => import('./heroes/CinematicStudioHero').then((m) => ({ default: m.CinematicStudioHero })));

interface HeroSectionProps {
  input: EventInput;
  content: GeneratedContent;
  theme: ThemeConfig;
  headlineToDisplay: string;
  onScrollToRegister: () => void;
  registeredCount: number;
  onOpenHeroImagePicker: () => void;
  onOpenSpeakerImagePicker: () => void;
  isEditMode?: boolean;
  onUpdateContentField?: (field: keyof GeneratedContent, val: unknown) => void;
  onUpdateInputField?: (field: keyof EventInput, val: unknown) => void;
  headlineVariant?: 'A' | 'B';
}

function HeroSkeleton() {
  return (
    <div className="relative z-10 max-w-7xl mx-auto py-16 animate-pulse">
      <div className="h-8 w-48 bg-slate-300 dark:bg-slate-800 rounded-full mb-6 mx-auto" />
      <div className="h-16 w-3/4 max-w-2xl bg-slate-300 dark:bg-slate-800 rounded-2xl mb-4 mx-auto" />
      <div className="h-6 w-1/2 max-w-lg bg-slate-200 dark:bg-slate-800/60 rounded-xl mb-8 mx-auto" />
      <div className="flex justify-center gap-4">
        <div className="h-14 w-40 bg-indigo-500/20 rounded-xl" />
        <div className="h-14 w-36 bg-slate-300 dark:bg-slate-800 rounded-xl" />
      </div>
    </div>
  );
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  input,
  content,
  theme,
  headlineToDisplay,
  onScrollToRegister,
  registeredCount,
  onOpenHeroImagePicker,
  onOpenSpeakerImagePicker,
  isEditMode = false,
  onUpdateContentField,
  onUpdateInputField,
  headlineVariant = 'A',
}) => {
  const { isDark } = useThemeMode();
  const heroPhoto = input.heroImageUrl || theme.heroImage;

  const handleSaveHeadline = (val: string) => {
    if (headlineVariant === 'B') {
      onUpdateContentField?.('alternativeHeadline', val);
    } else {
      onUpdateContentField?.('headline', val);
    }
  };

  const sharedHeroProps = {
    input,
    content,
    theme,
    headlineToDisplay,
    onScrollToRegister,
    registeredCount,
    onOpenHeroImagePicker,
    onOpenSpeakerImagePicker,
    isEditMode,
    onUpdateContentField,
    onUpdateInputField,
    onSaveHeadline: handleSaveHeadline,
  };

  const renderHeroByLayout = () => {
    switch (theme.layout) {
      case 'masterclass':
        return <MasterclassHero {...sharedHeroProps} />;
      case 'terminal':
        return <TerminalHero {...sharedHeroProps} />;
      case 'executive':
        return <ExecutiveHero {...sharedHeroProps} />;
      case 'creative':
        return <CreativeHero {...sharedHeroProps} />;
      case 'academy':
        return <AcademyHero {...sharedHeroProps} />;
      case 'cinematic':
        return <CinematicStudioHero {...sharedHeroProps} />;
      case 'conference':
      default:
        return <ConferenceHero {...sharedHeroProps} />;
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
        {/* Magic UI Interactive Particles */}
        <Particles
          className="absolute inset-0 z-0"
          quantity={90}
          ease={70}
          size={0.6}
          staticity={35}
          color={isDark ? '#e2e8f0' : '#475569'}
          refresh
        />
      </div>

      {/* Render the dynamically selected Hero Archetype */}
      <Suspense fallback={<HeroSkeleton />}>
        {renderHeroByLayout()}
      </Suspense>
    </section>
  );
};
