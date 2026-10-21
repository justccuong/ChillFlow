import { useEffect } from 'react';

/**
 * Hook to trigger smooth reveal-up animations on scroll (inspired by SaaS-AI and SaaSyDark in awesome-landing-pages)
 * Queries all elements with `[data-reveal]` and fades them in with upward translation when entering viewport.
 */
export function useScrollReveal(dependencies: any[] = []) {
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
            setTimeout(() => {
              el.classList.add('reveal-active');
            }, parseInt(delay, 10));
            // Unobserve after revealing
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    // Initial query
    const elements = document.querySelectorAll('[data-reveal]:not(.reveal-active)');
    elements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, dependencies);
}
