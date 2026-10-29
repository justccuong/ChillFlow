import { useEffect } from 'react';

/**
 * Hook to trigger smooth reveal-up animations on scroll.
 * Queries all elements with `[data-reveal]` and fades them in with upward translation when entering viewport.
 * Uses positive rootMargin (300px) and threshold: 0 so elements are pre-revealed before user reaches them,
 * completely preventing blank "black void" screens.
 */
export function useScrollReveal(dependencies: unknown[] = []) {
  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('[data-reveal]').forEach(el => {
        el.classList.add('reveal-active');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.revealDelay || '0';
            const delayNum = parseInt(delay, 10);
            if (delayNum > 0) {
              setTimeout(() => {
                el.classList.add('reveal-active');
              }, delayNum);
            } else {
              el.classList.add('reveal-active');
            }
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '300px 0px 300px 0px',
      }
    );

    // Query all unrevealed elements
    const elements = document.querySelectorAll('[data-reveal]:not(.reveal-active)');
    const vh = window.innerHeight || document.documentElement.clientHeight || 800;

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      // If already within or near the viewport (or above it), reveal immediately
      if (rect.top <= vh * 1.5) {
        el.classList.add('reveal-active');
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
