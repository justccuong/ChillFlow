import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SoundWaveWidgetProps {
  variant?: 'pill' | 'floating' | 'compact';
  floatingPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  label?: string;
  subLabel?: string;
  className?: string;
  autoPlayPrompt?: boolean;
}

interface AudioNodes {
  ctx: AudioContext;
  masterGain: GainNode;
  filter: BiquadFilterNode;
  oscillators: OscillatorNode[];
  lfo?: OscillatorNode;
  lfoGain?: GainNode;
}

const NUM_WAVE_POINTS = 28;
const SVG_WIDTH = 70;
const SVG_HEIGHT = 20;

export const SoundWaveWidget: React.FC<SoundWaveWidgetProps> = ({
  variant = 'pill',
  floatingPosition = 'bottom-right',
  label = 'Studio Soundtrack',
  subLabel,
  className,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [wavePoints, setWavePoints] = useState<string>('');

  // Audio references
  const audioNodesRef = useRef<AudioNodes | null>(null);
  const stopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Animation references
  const currentAmpRef = useRef<number>(0);
  const phaseRef = useRef<number>(0);

  // Initialize flat resting wave line
  const generateFlatLine = useCallback(() => {
    const points: string[] = [];
    const centerY = SVG_HEIGHT / 2;
    for (let i = 0; i < NUM_WAVE_POINTS; i++) {
      const x = (i / (NUM_WAVE_POINTS - 1)) * SVG_WIDTH;
      points.push(`${x.toFixed(1)},${centerY.toFixed(1)}`);
    }
    return points.join(' ');
  }, []);

  // Animation loop whenever isPlaying changes
  useEffect(() => {
    let animId: number;

    const render = () => {
      const targetAmp = isPlaying ? 6.5 : 0;
      // Smooth lerp toward target amplitude
      currentAmpRef.current += (targetAmp - currentAmpRef.current) * 0.08;
      phaseRef.current += 0.12;

      const centerY = SVG_HEIGHT / 2;
      const points: string[] = [];

      for (let i = 0; i < NUM_WAVE_POINTS; i++) {
        const normalizedX = i / (NUM_WAVE_POINTS - 1);
        const x = normalizedX * SVG_WIDTH;

        // Bell-shaped window envelope so endpoints taper smoothly to center baseline
        const envelope = Math.sin(normalizedX * Math.PI);

        // Multi-harmonic sine equation for lush organic movement
        const primary = Math.sin(i * 0.45 + phaseRef.current);
        const secondary = Math.sin(i * 0.9 - phaseRef.current * 0.6) * 0.35;
        const wave = (primary + secondary) * currentAmpRef.current * envelope;

        const y = centerY + wave;
        points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
      }

      setWavePoints(points.join(' '));

      // Keep running RAF while playing OR while dampening back to zero
      if (isPlaying || currentAmpRef.current > 0.02) {
        animId = requestAnimationFrame(render);
      } else {
        // Reached zero amplitude rest state
        currentAmpRef.current = 0;
        setWavePoints(generateFlatLine());
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying, generateFlatLine]);

  // Audio start logic (Ambient 432Hz cinematic drone synthesizer)
  const startAudio = async () => {
    try {
      if (stopTimeoutRef.current) {
        clearTimeout(stopTimeoutRef.current);
        stopTimeoutRef.current = null;
      }

      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      if (!AudioCtxClass) {
        console.warn('Web Audio API is not supported in this browser.');
        return;
      }

      let ctx = audioNodesRef.current?.ctx;
      if (!ctx || ctx.state === 'closed') {
        ctx = new AudioCtxClass();
      }

      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      // Warm Biquad lowpass filter (soft cutoff at 450Hz with 1.2 resonance)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);

      // Master Gain with 0.8s silky smooth linear fade-in
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.8);

      // Low Frequency Oscillator for subtle breathing cutoff motion
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.15, ctx.currentTime); // ~6.6s cycle
      lfoGain.gain.setValueAtTime(45, ctx.currentTime); // +/- 45Hz filter sweep
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      // Oscillators:
      // Osc 1: Deep Root ~110Hz (A2) - Warm sine wave
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(110.0, ctx.currentTime);

      // Osc 2: Harmonic Fifth ~164.81Hz (E3) - Warm triangle wave
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(164.81, ctx.currentTime);

      // Osc 3: Upper Octave ~220.5Hz (A3 with +4 cents detune for natural analog chorus shimmer)
      const osc3 = ctx.createOscillator();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(220.5, ctx.currentTime);

      // Connect graph: Oscillators -> Lowpass Filter -> Master Gain -> Audio Destination
      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      // Start sound generation
      osc1.start();
      osc2.start();
      osc3.start();

      audioNodesRef.current = {
        ctx,
        masterGain,
        filter,
        oscillators: [osc1, osc2, osc3],
        lfo,
        lfoGain,
      };

      setIsPlaying(true);
    } catch (err) {
      console.error('Failed to start Web Audio synthesizer:', err);
    }
  };

  // Audio stop logic with 0.5s fade-out
  const stopAudio = () => {
    const nodes = audioNodesRef.current;
    if (!nodes) {
      setIsPlaying(false);
      return;
    }

    try {
      const { ctx, masterGain, oscillators, lfo, lfoGain, filter } = nodes;
      const now = ctx.currentTime;

      // Smooth fade-out 0.5s ramp to zero
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setValueAtTime(masterGain.gain.value, now);
      masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);

      setIsPlaying(false);

      // Safely disconnect after ramp finishes
      stopTimeoutRef.current = setTimeout(() => {
        try {
          oscillators.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {
              // already stopped
            }
          });
          lfo?.stop();
          lfo?.disconnect();
          lfoGain?.disconnect();
          filter.disconnect();
          masterGain.disconnect();
          audioNodesRef.current = null;
        } catch {
          // ignore cleanup errors
        }
      }, 520);
    } catch (err) {
      console.error('Error during audio fade-out:', err);
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (stopTimeoutRef.current) {
        clearTimeout(stopTimeoutRef.current);
      }
      if (audioNodesRef.current) {
        try {
          audioNodesRef.current.oscillators.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {}
          });
          audioNodesRef.current.lfo?.stop();
          audioNodesRef.current.ctx.close();
        } catch {}
      }
    };
  }, []);

  // Floating position classes
  const floatingPosClasses = {
    'bottom-right': 'fixed bottom-6 right-6 z-50',
    'bottom-left': 'fixed bottom-6 left-6 z-50',
    'top-right': 'fixed top-20 right-6 z-50',
    'top-left': 'fixed top-20 left-6 z-50',
  }[floatingPosition];

  const effectiveSubLabel =
    subLabel || (isPlaying ? 'Ambient 432Hz' : 'Tap to Play');

  return (
    <div
      className={cn(
        variant === 'floating' && floatingPosClasses,
        'select-none transition-all duration-300'
      )}
    >
      <button
        type="button"
        onClick={toggleSound}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`${isPlaying ? 'Mute' : 'Play'} ${label}`}
        aria-pressed={isPlaying}
        className={cn(
          'group relative isolate flex items-center gap-3.5 px-4 py-2.5 rounded-full cursor-pointer',
          'bg-neutral-950/90 hover:bg-neutral-900/95 backdrop-blur-xl',
          'border border-neutral-800 hover:border-amber-400/40',
          'shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)]',
          'hover:shadow-[0_12px_40px_rgba(251,191,36,0.15)]',
          'transition-all duration-500 ease-[cubic-bezier(0.6,0.08,0.02,0.99)]',
          'active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400',
          className
        )}
      >
        {/* Pulsing Status Dot */}
        <div className="relative flex items-center justify-center w-2.5 h-2.5">
          {isPlaying ? (
            <>
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-400" />
              <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </>
          ) : (
            <span
              className={cn(
                'relative inline-flex w-2.5 h-2.5 rounded-full transition-colors duration-300',
                isHovered
                  ? 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]'
                  : 'bg-amber-400/70'
              )}
            />
          )}
        </div>

        {/* Speaker / Audio Icon */}
        <div
          className={cn(
            'flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300',
            isPlaying
              ? 'text-amber-300 bg-amber-400/10'
              : 'text-neutral-400 group-hover:text-amber-300 bg-white/5'
          )}
        >
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 animate-pulse" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
          )}
        </div>

        {/* Real-time Dynamic SVG Sine Waveform */}
        <div className="flex flex-col items-start justify-center">
          <div className="flex items-center gap-2">
            <svg
              width={SVG_WIDTH}
              height={SVG_HEIGHT}
              viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
              className="overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="soundwave-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#FDE68A" stopOpacity="1" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
                </linearGradient>
                <filter
                  id="soundwave-glow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="1.2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Sine Wave Polyline */}
              <polyline
                points={wavePoints || generateFlatLine()}
                fill="none"
                stroke="url(#soundwave-gradient)"
                strokeWidth={isPlaying ? '2.2' : '1.5'}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={isPlaying ? 'url(#soundwave-glow)' : undefined}
                className="transition-all duration-300"
              />
            </svg>
          </div>
        </div>

        {/* Badge Labels */}
        <div className="flex flex-col items-start pr-1 text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold tracking-wide text-neutral-100 group-hover:text-amber-200 transition-colors">
              {label}
            </span>
            {isPlaying && (
              <Sparkles className="w-2.5 h-2.5 text-amber-300 animate-pulse" />
            )}
          </div>
          <span className="text-[10px] tracking-wider uppercase font-medium text-neutral-400 group-hover:text-neutral-300 transition-colors">
            {effectiveSubLabel}
          </span>
        </div>
      </button>
    </div>
  );
};
