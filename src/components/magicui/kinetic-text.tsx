import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface KineticTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
  charClassName?: string;
  hoverScale?: number;
  hoverWeight?: number;
  baseWeight?: number;
}

export function KineticText({
  text,
  as: Component = 'h1',
  className,
  charClassName,
  hoverScale = 1.15,
  hoverWeight = 900,
  baseWeight = 400,
}: KineticTextProps) {
  const characters = text.split('');

  const Tag = Component as any;

  return (
    <Tag
      className={cn(
        'inline-flex flex-wrap items-center cursor-default [font-optical-sizing:auto]',
        className
      )}
    >
      {characters.map((char, index) => {
        if (char === ' ') {
          return (
            <span key={index} className="inline-block whitespace-pre">
              {' '}
            </span>
          );
        }

        return (
          <motion.span
            key={index}
            className={cn('inline-block transition-colors duration-150', charClassName)}
            initial={{ fontWeight: baseWeight, scale: 1 }}
            whileHover={{
              fontWeight: hoverWeight,
              scale: hoverScale,
              transition: { duration: 0.15, ease: [0.6, 0.08, 0.02, 0.99] },
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </Tag>
  );
}
