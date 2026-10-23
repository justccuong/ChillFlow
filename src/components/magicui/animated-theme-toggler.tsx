import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '../../utils/cn';

export type TransitionVariant =
  | 'circle'
  | 'square'
  | 'triangle'
  | 'diamond'
  | 'hexagon'
  | 'rectangle'
  | 'star';

export interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<'button'> {
  duration?: number;
  variant?: TransitionVariant;
  /** When true, the transition expands from the viewport center instead of the button center. */
  fromCenter?: boolean;
  /**
   * Controlled theme value. When provided, the parent owns persistence
   * (e.g. `useThemeMode`) and this component will not write to localStorage directly.
   */
  theme?: 'light' | 'dark';
  /** Called on toggle. Pair with `theme` for controlled usage. */
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

function polygonCollapsed(point: string, vertexCount: number): string {
  const pairs = Array.from({ length: vertexCount }, () => point).join(', ');
  return `polygon(${pairs})`;
}

function getThemeTransitionClipPaths(
  variant: TransitionVariant,
  cx: number,
  cy: number,
  maxRadius: number,
  viewportWidth: number,
  viewportHeight: number
): [string, string] {
  const toX = (x: number) => `${(x / viewportWidth) * 100}%`;
  const toY = (y: number) => `${(y / viewportHeight) * 100}%`;
  const point = (x: number, y: number) => `${toX(x)} ${toY(y)}`;
  const toRadius = (r: number) =>
    `${(r / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%`;

  switch (variant) {
    case 'circle':
    default:
      return [
        `circle(0% at ${point(cx, cy)})`,
        `circle(${toRadius(maxRadius)} at ${point(cx, cy)})`,
      ];
    case 'square': {
      const halfW = Math.max(cx, viewportWidth - cx);
      const halfH = Math.max(cy, viewportHeight - cy);
      const halfSide = Math.max(halfW, halfH) * 1.05;
      const end = [
        point(cx - halfSide, cy - halfSide),
        point(cx + halfSide, cy - halfSide),
        point(cx + halfSide, cy + halfSide),
        point(cx - halfSide, cy + halfSide),
      ].join(', ');
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`];
    }
    case 'diamond': {
      const R = maxRadius * Math.SQRT2;
      const end = [
        point(cx, cy - R),
        point(cx + R, cy),
        point(cx, cy + R),
        point(cx - R, cy),
      ].join(', ');
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`];
    }
  }
}

export const AnimatedThemeToggler: React.FC<AnimatedThemeTogglerProps> = ({
  className,
  duration = 260,
  variant = 'circle',
  fromCenter = false,
  theme,
  onThemeChange,
  ...props
}) => {
  const shape = variant ?? 'circle';
  const isControlled = theme !== undefined;
  const [internalIsDark, setInternalIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const isDark = isControlled ? theme === 'dark' : internalIsDark;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const activeAnimRef = useRef<Animation | null>(null);

  const cancelAnim = useCallback(() => {
    if (activeAnimRef.current) {
      activeAnimRef.current.cancel();
      activeAnimRef.current = null;
    }
    const root = document.documentElement;
    delete root.dataset.magicuiThemeVt;
    root.style.removeProperty('--magicui-theme-toggle-vt-duration');
    root.style.removeProperty('--magicui-theme-vt-clip-from');
  }, []);

  useEffect(() => {
    return () => {
      cancelAnim();
    };
  }, [cancelAnim]);

  useEffect(() => {
    if (isControlled) return;

    const updateTheme = () => {
      setInternalIsDark(document.documentElement.classList.contains('dark'));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [isControlled]);

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    // If an animation is currently running, cancel it immediately so subsequent clicks are NEVER ignored!
    cancelAnim();

    const nextIsDark = !isDark;
    const nextTheme = nextIsDark ? 'dark' : 'light';

    // 1. Synchronously mutate DOM classes (pure DOM mutation takes < 0.05ms with 0 React freeze)
    const applyDomClasses = () => {
      if (nextIsDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    };

    // 2. Update React state asynchronously (does not block browser frame)
    const applyReactState = () => {
      if (isControlled) {
        onThemeChange?.(nextTheme);
      } else {
        setInternalIsDark(nextIsDark);
        localStorage.setItem('convertflow-theme-mode', nextTheme);
      }
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fast path: If View Transitions is not supported or user prefers reduced motion, toggle instantly!
    if (
      !('startViewTransition' in document) ||
      typeof (document as any).startViewTransition !== 'function' ||
      prefersReducedMotion
    ) {
      applyDomClasses();
      applyReactState();
      return;
    }

    // View Transition path: Compute coordinates and trigger smooth circular reveal
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x: number;
    let y: number;
    if (fromCenter) {
      x = viewportWidth / 2;
      y = viewportHeight / 2;
    } else {
      const rect = button.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y)
    );

    const clipPath = getThemeTransitionClipPaths(
      shape,
      x,
      y,
      maxRadius,
      viewportWidth,
      viewportHeight
    );

    const root = document.documentElement;
    root.dataset.magicuiThemeVt = 'active';
    root.style.setProperty('--magicui-theme-toggle-vt-duration', `${duration}ms`);
    root.style.setProperty('--magicui-theme-vt-clip-from', clipPath[0]);

    try {
      // NOTE: We only put the pure DOM class mutation inside startViewTransition!
      // This eliminates synchronous React tree re-rendering freeze (0ms freeze)!
      const transition = (document as any).startViewTransition(() => {
        applyDomClasses();
      });

      // Update React state outside startViewTransition so React batches re-renders smoothly
      applyReactState();

      if (typeof transition?.finished?.finally === 'function') {
        transition.finished.finally(() => {
          cancelAnim();
        }).catch(() => {
          cancelAnim();
        });
      }

      const ready = transition?.ready;
      if (ready && typeof ready.then === 'function') {
        ready
          .then(() => {
            const anim = document.documentElement.animate(
              {
                clipPath,
              },
              {
                duration,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                fill: 'forwards',
                pseudoElement: '::view-transition-new(root)',
              }
            );
            activeAnimRef.current = anim;
          })
          .catch(() => {
            cancelAnim();
          });
      }
    } catch {
      applyDomClasses();
      applyReactState();
      cancelAnim();
    }
  }, [shape, fromCenter, duration, isDark, isControlled, onThemeChange, cancelAnim]);

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center justify-center transition-all active:scale-90 select-none overflow-hidden',
        className
      )}
      title={isDark ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
      aria-label="Toggle theme mode"
      {...props}
    >
      <span className="relative flex items-center justify-center w-4 h-4">
        <Sun
          className={cn(
            'w-4 h-4 text-amber-500 transition-all duration-200 transform absolute',
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : 'rotate-90 scale-0 opacity-0 pointer-events-none'
          )}
        />
        <Moon
          className={cn(
            'w-4 h-4 text-indigo-600 dark:text-indigo-400 transition-all duration-200 transform absolute',
            isDark
              ? '-rotate-90 scale-0 opacity-0 pointer-events-none'
              : 'rotate-0 scale-100 opacity-100'
          )}
        />
      </span>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
