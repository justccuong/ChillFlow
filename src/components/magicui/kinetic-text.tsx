import React from 'react';
import { cn } from '../../utils/cn';

type As = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

export type KineticTextProps = React.HTMLAttributes<HTMLElement> & {
  text: string;
  as?: As;
  baseWeight?: number;
  hoverWeight?: number;
  hoverScale?: number;
};

/**
 * Official Magic UI Kinetic Text Component
 * Sourced directly from Magic UI Registry (https://magicui.design/r/kinetic-text.json)
 * Uses advanced CSS :has() & adjacent sibling combinators for smooth weight ripple waves.
 */
export function KineticText({
  text,
  as: Tag = 'h1',
  className = '',
  style,
  ...rest
}: KineticTextProps) {
  const mergedStyle = {
    '--hover-padding': 'calc(1em / 14)',
    '--text-stroke-width': 'calc(1em * 125 / 6000)',
    ...(style as React.CSSProperties | undefined),
  } as React.CSSProperties;

  // Split into words first to maintain natural line wrapping for long event titles
  const words = text.split(' ');

  return (
    <Tag
      {...rest}
      className={cn(
        'inline-flex flex-wrap items-baseline gap-x-[0.25em] font-[400] cursor-default select-none tracking-tight',
        className
      )}
      style={mergedStyle}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-flex whitespace-nowrap">
          {word.split('').map((letter, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="inline-block [will-change:font-weight,-webkit-text-stroke-width,padding] [-webkit-text-stroke-color:transparent] [-webkit-text-stroke-width:var(--text-stroke-width)] [transition:font-weight_0.35s,_-webkit-text-stroke-color_0.35s,_padding_0.35s] hover:[padding-inline:var(--hover-padding)] hover:font-[900] hover:[-webkit-text-stroke-color:currentcolor] hover:[-webkit-text-stroke-width:calc(var(--text-stroke-width)*2)] has-[+span+span:hover]:font-[500] has-[+span:hover]:[padding-inline:var(--hover-padding)] has-[+span:hover]:font-[700] [:hover+&]:[padding-inline:var(--hover-padding)] [:hover+&]:font-[700] [:hover+span+&]:font-[500]"
            >
              {letter}
            </span>
          ))}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
