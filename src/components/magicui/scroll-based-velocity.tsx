import React, { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useAnimationFrame,
  useMotionValue,
  wrap,
} from 'framer-motion';
import { cn } from '../../utils/cn';

interface VelocityScrollProps {
  text?: string;
  default_velocity?: number;
  className?: string;
  numRows?: number;
  children?: React.ReactNode;
  pauseOnHover?: boolean;
}

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
  className?: string;
  pauseOnHover?: boolean;
}

function ParallaxRow({
  children,
  baseVelocity = 1,
  className,
  pauseOnHover = true,
}: ParallaxProps) {
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewRef = useRef(true);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Map scroll speed from [0, 1000] to a smooth multiplier [0, 3]
  const smoothVelocity = useTransform(scrollVelocity, [0, 1000], [0, 3], {
    clamp: false,
  });

  const isHovered = useRef(false);

  // Infinite wrap percentage from 0 to -50% (since we duplicate children twice)
  const x = useTransform(baseX, (v) => `${wrap(0, -50, v)}%`);

  const directionFactor = useRef<number>(1);

  // Pause RAF when offscreen to save 100% CPU/GPU
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (!isInViewRef.current) {
      return;
    }

    if (isHovered.current && pauseOnHover) {
      return;
    }

    // Gentle base drift (~10% of previous speed for a luxurious, readable pace)
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000) * 1.2;

    const currentVelocity = smoothVelocity.get();
    if (currentVelocity < -0.1) {
      directionFactor.current = -1;
    } else if (currentVelocity > 0.1) {
      directionFactor.current = 1;
    }

    if (currentVelocity) {
      // Subtle scroll acceleration (10% of previous multiplier)
      moveBy += directionFactor.current * Math.abs(currentVelocity) * (delta / 1000) * 1.8;
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden whitespace-nowrap flex flex-nowrap select-none"
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
    >
      <motion.div
        className={cn('inline-flex flex-nowrap items-center shrink-0 will-change-transform', className)}
        style={{ x, translateZ: 0 }}
      >
        <div className="inline-flex items-center gap-6 sm:gap-10 shrink-0 px-3">
          {children}
        </div>
        <div className="inline-flex items-center gap-6 sm:gap-10 shrink-0 px-3" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export function ScrollBasedVelocity({
  text,
  default_velocity = 1.0,
  className,
  numRows = 2,
  children,
  pauseOnHover = true,
}: VelocityScrollProps) {
  const content = children || (
    <span className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white mr-6">
      {text}{' '}
    </span>
  );

  return (
    <div className="relative w-full overflow-hidden flex flex-col gap-3 sm:gap-5 py-2">
      {Array.from({ length: numRows }).map((_, i) => (
        <ParallaxRow
          key={i}
          baseVelocity={i % 2 === 0 ? default_velocity : -default_velocity}
          className={className}
          pauseOnHover={pauseOnHover}
        >
          {content}
        </ParallaxRow>
      ))}
    </div>
  );
}

export const VelocityScroll = ScrollBasedVelocity;
