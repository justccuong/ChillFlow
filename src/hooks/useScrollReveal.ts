import { useEffect } from 'react';

/**
 * Hook to trigger smooth reveal-up animations on scroll.
 * Queries all elements with `[data-reveal]` and fades them in with upward translation when entering viewport.
 * Uses positive rootMargin (300px) and MutationObserver so dynamic and lazy-loaded components
 * are automatically observed and revealed, completely preventing blank white screens on first load.
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

    const checkAndObserve = (el: Element) => {
      if (el.classList.contains('reveal-active')) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;
      if (rect.top <= vh * 1.5) {
        el.classList.add('reveal-active');
      } else {
        observer.observe(el);
      }
    };

    // Initial query
    document.querySelectorAll('[data-reveal]:not(.reveal-active)').forEach(checkAndObserve);

    // MutationObserver to watch for newly mounted Suspense/Lazy components
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const elem = node as HTMLElement;
            if (elem.hasAttribute('data-reveal')) {
              checkAndObserve(elem);
            }
            elem.querySelectorAll?.('[data-reveal]:not(.reveal-active)').forEach(checkAndObserve);
          }
        });
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Safeguard timer: ensure any delayed renders within viewport are revealed
    const safetyTimer = setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.reveal-active)').forEach(checkAndObserve);
    }, 400);

    return () => {
      clearTimeout(safetyTimer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
