import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface KineticTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  charClassName?: string;
  hoverScale?: number;
  hoverWeight?: number;
  baseWeight?: number;
}

export function KineticText({
  text,
  as: Component = 'span',
  className,
  charClassName,
  hoverScale = 1.15,
  hoverWeight = 950,
  baseWeight = 800,
}: KineticTextProps) {
  // Split into words first to prevent breaking words across lines awkwardly
  const words = text.split(' ');
  const Tag = Component as any;

  return (
    <Tag
      className={cn(
        'inline-flex flex-wrap items-baseline gap-x-[0.25em] cursor-pointer select-none [font-optical-sizing:auto]',
        className
      )}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIdx) => (
            <motion.span
              key={charIdx}
              className={cn(
                'inline-block origin-bottom transition-colors duration-150',
                charClassName
              )}
              initial={{ fontWeight: baseWeight, scale: 1 }}
              whileHover={{
                fontWeight: hoverWeight,
                scale: hoverScale,
                transition: { duration: 0.12, ease: [0.6, 0.08, 0.02, 0.99] },
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 22,
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
