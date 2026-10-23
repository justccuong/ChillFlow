import React, { useState, useRef, useImperativeHandle } from 'react';
import { cn } from '../../utils/cn';

export type DirectionalButtonVariant = 'primary' | 'outline' | 'glass' | 'dark-luxe';
export type DirectionalButtonSize = 'sm' | 'md' | 'lg';

export interface DirectionalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: DirectionalButtonVariant;
  size?: DirectionalButtonSize;
  animateChars?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  pill?: boolean;
  circleClassName?: string;
  children?: React.ReactNode;
}

const VARIANT_CONFIGS: Record<
  DirectionalButtonVariant,
  {
    button: string;
    circle: string;
    textBase: string;
    textHover: string;
  }
> = {
  'dark-luxe': {
    button:
      'bg-neutral-950/95 border-neutral-800/90 hover:border-amber-400/40 shadow-[0_8px_30px_rgb(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.08)]',
    circle: 'bg-gradient-to-r from-amber-200 via-white to-amber-400',
    textBase: 'text-neutral-100',
    textHover: 'text-neutral-950 font-bold',
  },
  primary: {
    button:
      'bg-indigo-600 border-indigo-400/40 shadow-[0_10px_25px_-5px_rgba(99,102,241,0.5)] hover:border-indigo-300/60',
    circle: 'bg-gradient-to-r from-violet-600 via-indigo-500 to-fuchsia-600',
    textBase: 'text-white',
    textHover: 'text-white font-bold',
  },
  outline: {
    button:
      'bg-transparent border-white/20 hover:border-white/50 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)]',
    circle: 'bg-white',
    textBase: 'text-neutral-200',
    textHover: 'text-neutral-950 font-bold',
  },
  glass: {
    button:
      'bg-white/[0.08] border-white/15 hover:border-white/35 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]',
    circle: 'bg-white/25 backdrop-blur-xl border border-white/30',
    textBase: 'text-white',
    textHover: 'text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]',
  },
};

const SIZE_CONFIGS: Record<
  DirectionalButtonSize,
  {
    padding: string;
    fontSize: string;
    gap: string;
    iconSize: string;
  }
> = {
  sm: {
    padding: 'px-4 py-2',
    fontSize: 'text-xs tracking-wider uppercase font-semibold',
    gap: 'gap-2',
    iconSize: 'w-3.5 h-3.5',
  },
  md: {
    padding: 'px-6 py-3',
    fontSize: 'text-sm tracking-wide font-medium',
    gap: 'gap-2.5',
    iconSize: 'w-4 h-4',
  },
  lg: {
    padding: 'px-8 py-4',
    fontSize: 'text-base tracking-wide font-medium',
    gap: 'gap-3',
    iconSize: 'w-5 h-5',
  },
};

export const DirectionalButton = React.forwardRef<
  HTMLButtonElement,
  DirectionalButtonProps
>(
  (
    {
      variant = 'dark-luxe',
      size = 'md',
      animateChars = true,
      icon,
      iconPosition = 'right',
      pill = true,
      circleClassName,
      className,
      children,
      onMouseEnter,
      onMouseLeave,
      type = 'button',
      disabled = false,
      style,
      ...restProps
    },
    ref
  ) => {
    const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    const buttonInternalRef = useRef<HTMLButtonElement | null>(null);
    const circleInternalRef = useRef<HTMLSpanElement | null>(null);

    useImperativeHandle(ref, () => buttonInternalRef.current as HTMLButtonElement);

    const updateCoordinates = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setCoords({ x, y });

      if (circleInternalRef.current) {
        circleInternalRef.current.style.left = `${x.toFixed(2)}%`;
        circleInternalRef.current.style.top = `${y.toFixed(2)}%`;
      }
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      updateCoordinates(e);
      setIsHovered(true);
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      updateCoordinates(e);
      setIsHovered(false);
      onMouseLeave?.(e);
    };

    const variantCfg = VARIANT_CONFIGS[variant] || VARIANT_CONFIGS['dark-luxe'];
    const sizeCfg = SIZE_CONFIGS[size] || SIZE_CONFIGS.md;

    const renderTextContent = (text: string) => {
      if (!animateChars) {
        return <span>{text}</span>;
      }

      const chars = text.split('');
      return (
        <span className="inline-flex items-center select-none overflow-hidden py-0.5">
          {chars.map((char, i) => (
            <span
              key={i}
              className={cn(
                'inline-block transition-transform duration-300 will-change-transform',
                isHovered ? '-translate-y-[2px]' : 'translate-y-0'
              )}
              style={{
                transitionDelay: `${i * 15}ms`,
                transitionTimingFunction: 'cubic-bezier(0.6, 0.08, 0.02, 0.99)',
                whiteSpace: char === ' ' ? 'pre' : 'normal',
              }}
            >
              {char}
            </span>
          ))}
        </span>
      );
    };

    const renderChildren = () => {
      if (typeof children === 'string') {
        return renderTextContent(children);
      }
      if (typeof children === 'number') {
        return renderTextContent(String(children));
      }
      return children;
    };

    return (
      <button
        ref={buttonInternalRef}
        type={type}
        disabled={disabled}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'group relative isolate overflow-hidden border inline-flex items-center justify-center cursor-pointer',
          'transition-all duration-300 active:scale-[0.98] select-none',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
          'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
          pill ? 'rounded-full' : 'rounded-2xl',
          variantCfg.button,
          sizeCfg.padding,
          sizeCfg.fontSize,
          sizeCfg.gap,
          className
        )}
        style={style}
        {...restProps}
      >
        {/* Directional Hover Expansion Circle */}
        <span
          ref={circleInternalRef}
          aria-hidden="true"
          className={cn(
            'btn__circle pointer-events-none absolute rounded-full aspect-square',
            'w-[340%] will-change-transform z-0',
            variantCfg.circle,
            circleClassName
          )}
          style={{
            left: `${coords.x.toFixed(2)}%`,
            top: `${coords.y.toFixed(2)}%`,
            transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0})`,
            transition: 'transform 650ms cubic-bezier(0.6, 0.08, 0.02, 0.99), opacity 400ms ease',
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Content Container (Layered above circle) */}
        <span
          className={cn(
            'relative z-10 inline-flex items-center justify-center pointer-events-none transition-colors duration-300',
            sizeCfg.gap,
            isHovered ? variantCfg.textHover : variantCfg.textBase
          )}
        >
          {icon && iconPosition === 'left' && (
            <span
              className={cn(
                'inline-flex items-center justify-center transition-transform duration-300 will-change-transform',
                sizeCfg.iconSize,
                isHovered ? '-translate-x-1' : 'translate-x-0'
              )}
              style={{ transitionTimingFunction: 'cubic-bezier(0.6, 0.08, 0.02, 0.99)' }}
            >
              {icon}
            </span>
          )}

          {renderChildren()}

          {icon && iconPosition === 'right' && (
            <span
              className={cn(
                'inline-flex items-center justify-center transition-transform duration-300 will-change-transform',
                sizeCfg.iconSize,
                isHovered ? 'translate-x-1' : 'translate-x-0'
              )}
              style={{ transitionTimingFunction: 'cubic-bezier(0.6, 0.08, 0.02, 0.99)' }}
            >
              {icon}
            </span>
          )}
        </span>
      </button>
    );
  }
);

DirectionalButton.displayName = 'DirectionalButton';
