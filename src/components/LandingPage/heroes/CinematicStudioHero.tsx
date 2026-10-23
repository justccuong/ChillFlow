import React, { useEffect, useRef, useState } from 'react';
import type { EventInput, GeneratedContent, ThemeConfig } from '../../../types';
import { CountdownTimer } from '../../CountdownTimer';
import { InlineEditable } from '../InlineEditable';
import { formatEventDate } from '../../../utils/date';
import { Calendar, MapPin, ArrowRight, Award, ShieldCheck, Box, RefreshCw } from 'lucide-react';
import { DirectionalButton } from '../../common/DirectionalButton';
import { SoundWaveWidget } from '../../common/SoundWaveWidget';

interface HeroProps {
  input: EventInput;
  content: GeneratedContent;
  theme: ThemeConfig;
  headlineToDisplay: string;
  onScrollToRegister: () => void;
  registeredCount: number;
  onOpenHeroImagePicker?: () => void;
  onOpenSpeakerImagePicker?: () => void;
  isEditMode?: boolean;
  onUpdateContentField?: (field: keyof GeneratedContent, val: any) => void;
  onUpdateInputField?: (field: keyof EventInput, val: any) => void;
  onSaveHeadline?: (val: string) => void;
}

export const CinematicStudioHero: React.FC<HeroProps> = ({
  input,
  content,
  theme,
  headlineToDisplay,
  onScrollToRegister,
  registeredCount,
  isEditMode = false,
  onUpdateContentField,
  onUpdateInputField,
  onSaveHeadline,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0.3, y: 0.6 });
  const mousePos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0.003, y: 0.005 });

  // Real-time 3D Double-Buffered Canvas Engine (Inspired by mdx.so Canvas Scrubber)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferCanvas = document.createElement('canvas');
    const bufferCtx = bufferCanvas.getContext('2d');
    if (!bufferCtx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = bufferCanvas.width = rect.width * dpr;
      canvas.height = bufferCanvas.height = rect.height * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    // 3D Geometry: Icosahedron / Geodesic Sphere Vertices & Edges
    const t = (1.0 + Math.sqrt(5.0)) / 2.0;
    const rawVertices = [
      [-1,  t,  0], [ 1,  t,  0], [-1, -t,  0], [ 1, -t,  0],
      [ 0, -1,  t], [ 0,  1,  t], [ 0, -1, -t], [ 0,  1, -t],
      [ t,  0, -1], [ t,  0,  1], [-t,  0, -1], [-t,  0,  1]
    ];
    // Normalize to unit sphere
    const vertices = rawVertices.map(([x, y, z]) => {
      const len = Math.hypot(x, y, z);
      return [x / len, y / len, z / len];
    });

    const edges = [
      [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
      [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
      [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
      [4, 9], [9, 8], [8, 6], [6, 2], [2, 4],
      [1, 9], [5, 4], [11, 2], [10, 6], [7, 8],
      [0, 3], [1, 8], [5, 9], [11, 4], [10, 2]
    ];

    // 20 Triangular Facets for realistic 3D volumetric glass shading
    const faces = [
      [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
      [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
      [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
    ];

    // Star/dust particles
    const particles = Array.from({ length: 45 }, () => ({
      x: (Math.random() - 0.5) * 2.5,
      y: (Math.random() - 0.5) * 2.5,
      z: (Math.random() - 0.5) * 2.5,
      size: Math.random() * 1.5 + 0.5,
      pulse: Math.random() * Math.PI,
    }));

    let currentRotX = rotation.x;
    let currentRotY = rotation.y;

    // Scroll & Wheel reactivity (Inspired by mdx.so - "lăn thì xoay")
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let scrollImpulseX = 0;
    let scrollImpulseY = 0;

    const handleWindowScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Impart rotational momentum on scroll
      scrollImpulseY += deltaY * 0.0035;
      scrollImpulseX += deltaY * 0.0018;
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    // Wheel event directly on canvas container for trackball scrub
    const handleCanvasWheel = (e: WheelEvent) => {
      scrollImpulseY += e.deltaY * 0.003;
      scrollImpulseX += (e.deltaX || e.deltaY * 0.4) * 0.0015;
    };
    canvas.addEventListener('wheel', handleCanvasWheel, { passive: true });

    // IntersectionObserver: Completely STOP canvas rendering when scrolled off-screen to save 100% GPU
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (!wasVisible && isVisible) {
          cancelAnimationFrame(animId);
          animId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) {
        return;
      }

      // Apply scroll momentum with smooth inertia damping
      currentRotX += scrollImpulseX;
      currentRotY += scrollImpulseY;
      scrollImpulseX *= 0.91;
      scrollImpulseY *= 0.91;

      if (!isDragging) {
        currentRotX += velocity.current.x;
        currentRotY += velocity.current.y;
        velocity.current.x = velocity.current.x * 0.96 + 0.0015 * 0.04;
        velocity.current.y = velocity.current.y * 0.96 + 0.0035 * 0.04;
      }

      const w = bufferCanvas.width;
      const h = bufferCanvas.height;
      bufferCtx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.32;

      // Draw ambient backdrop glow
      const grad = bufferCtx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.4);
      grad.addColorStop(0, 'rgba(251, 191, 36, 0.14)'); // Amber glow
      grad.addColorStop(0.5, 'rgba(168, 85, 247, 0.08)'); // Purple haze
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      bufferCtx.fillStyle = grad;
      bufferCtx.fillRect(0, 0, w, h);

      // Rotate matrix math
      const sinX = Math.sin(currentRotX);
      const cosX = Math.cos(currentRotX);
      const sinY = Math.sin(currentRotY);
      const cosY = Math.cos(currentRotY);

      const project = (vx: number, vy: number, vz: number): [number, number, number] => {
        // Rotate Y
        const x1 = vx * cosY - vz * sinY;
        const z1 = vx * sinY + vz * cosY;
        // Rotate X
        const y2 = vy * cosX - z1 * sinX;
        const z2 = vy * sinX + z1 * cosX;

        const distance = 2.4;
        const fov = 1 / (distance - z2);
        return [cx + x1 * fov * radius * 1.7, cy + y2 * fov * radius * 1.7, z2];
      };

      // Draw ambient particle dust
      particles.forEach((p) => {
        p.pulse += 0.02;
        const [px, py, pz] = project(p.x, p.y, p.z);
        const alpha = Math.max(0.1, (pz + 1) / 2) * (0.5 + 0.5 * Math.sin(p.pulse));
        bufferCtx.beginPath();
        bufferCtx.arc(px, py, p.size * dpr, 0, Math.PI * 2);
        bufferCtx.fillStyle = `rgba(251, 191, 36, ${alpha})`;
        bufferCtx.fill();
      });

      // Project 3D vertices
      const projected = vertices.map(([x, y, z]) => project(x, y, z));

      // Draw 3D Crystal Facets with dynamic lighting (Face normal back-face culling)
      faces.forEach(([i1, i2, i3]) => {
        const p1 = projected[i1];
        const p2 = projected[i2];
        const p3 = projected[i3];
        if (!p1 || !p2 || !p3) return;

        const normalZ = (p2[0] - p1[0]) * (p3[1] - p1[1]) - (p2[1] - p1[1]) * (p3[0] - p1[0]);
        if (normalZ > 0) {
          const avgZ = (p1[2] + p2[2] + p3[2]) / 3;
          const lightFactor = Math.max(0.04, Math.min(0.22, (avgZ + 1) * 0.11));

          bufferCtx.beginPath();
          bufferCtx.moveTo(p1[0], p1[1]);
          bufferCtx.lineTo(p2[0], p2[1]);
          bufferCtx.lineTo(p3[0], p3[1]);
          bufferCtx.closePath();
          bufferCtx.fillStyle = `rgba(251, 191, 36, ${lightFactor})`;
          bufferCtx.fill();
        }
      });

      // Zero-blur, ultra-fast glowing edges (zero Gaussian blur passes)
      edges.forEach(([i1, i2]) => {
        const p1 = projected[i1];
        const p2 = projected[i2];
        if (!p1 || !p2) return;

        const avgZ = (p1[2] + p2[2]) / 2;
        const alpha = Math.max(0.18, (avgZ + 1) * 0.45);

        // Halo outer line for neon glow look without expensive shadowBlur
        if (avgZ > 0) {
          bufferCtx.beginPath();
          bufferCtx.moveTo(p1[0], p1[1]);
          bufferCtx.lineTo(p2[0], p2[1]);
          bufferCtx.strokeStyle = `rgba(251, 191, 36, ${alpha * 0.28})`;
          bufferCtx.lineWidth = 3.6 * dpr;
          bufferCtx.stroke();
        }

        // Core crisp line
        bufferCtx.beginPath();
        bufferCtx.moveTo(p1[0], p1[1]);
        bufferCtx.lineTo(p2[0], p2[1]);
        bufferCtx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
        bufferCtx.lineWidth = (avgZ > 0 ? 1.6 : 0.8) * dpr;
        bufferCtx.stroke();
      });

      // Draw vertex nodes (outer glow halo + crisp inner core, zero shadowBlur)
      projected.forEach(([x, y, z]) => {
        const alpha = Math.max(0.3, (z + 1) * 0.5);
        if (z > 0) {
          bufferCtx.beginPath();
          bufferCtx.arc(x, y, 6 * dpr, 0, Math.PI * 2);
          bufferCtx.fillStyle = `rgba(251, 191, 36, ${alpha * 0.3})`;
          bufferCtx.fill();
        }
        bufferCtx.beginPath();
        bufferCtx.arc(x, y, (z > 0 ? 3.0 : 1.8) * dpr, 0, Math.PI * 2);
        bufferCtx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        bufferCtx.fill();
      });

      // Inner core sphere with pure radial gradient (zero blur overhead)
      bufferCtx.beginPath();
      bufferCtx.arc(cx, cy, radius * 0.22, 0, Math.PI * 2);
      const coreGrad = bufferCtx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.22);
      coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      coreGrad.addColorStop(0.35, 'rgba(251, 191, 36, 0.7)');
      coreGrad.addColorStop(1, 'rgba(217, 119, 6, 0)');
      bufferCtx.fillStyle = coreGrad;
      bufferCtx.fill();

      // Blit to main canvas with smoothing disabled for high performance
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(bufferCanvas, 0, 0);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleWindowScroll);
      canvas.removeEventListener('wheel', handleCanvasWheel);
    };
  }, [isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    mousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - mousePos.current.x;
    const dy = e.clientY - mousePos.current.y;
    mousePos.current = { x: e.clientX, y: e.clientY };

    velocity.current = { x: dy * 0.005, y: dx * 0.005 };
    setRotation((prev) => ({
      x: prev.x + dy * 0.008,
      y: prev.y + dx * 0.008,
    }));
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 text-slate-900 dark:text-white transition-colors">
      {/* Background Ambient Blur Overlays */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-32 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Dark Luxe Editorial Headline & Copy */}
        <div className="lg:col-span-7 text-left space-y-6">
          {/* Top Status & Audio Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Awwwards Winner Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-white/5 border border-amber-400/30 text-xs font-semibold backdrop-blur-xl shadow-sm">
              <Award className="w-3.5 h-3.5 text-amber-500 dark:text-amber-300 animate-pulse" />
              <span className="text-amber-700 dark:text-amber-200 tracking-wider uppercase text-[10px] font-bold">
                Awwwards Site of the Day • Studio Edition
              </span>
            </div>

            {/* Sound Wave Widget */}
            <SoundWaveWidget />
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black font-heading tracking-tight leading-[1.12] text-slate-900 dark:text-white max-w-3xl drop-shadow-sm">
            <InlineEditable
              value={headlineToDisplay}
              onSave={(val) => (onSaveHeadline ? onSaveHeadline(val) : onUpdateContentField?.('headline', val))}
              isEditMode={isEditMode}
              as="span"
              category={input.category}
            />
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 font-sans leading-relaxed max-w-2xl">
            <InlineEditable
              value={content.subHeadline}
              onSave={(val) => onUpdateContentField?.('subHeadline', val)}
              isEditMode={isEditMode}
              as="span"
              multiline
              category={input.category}
            />
          </p>

          {/* Event Key Badges: Date & Location */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-2 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200 dark:border-zinc-800 px-4 py-2.5 rounded-2xl shadow-sm text-slate-700 dark:text-zinc-300">
              <Calendar className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span className="font-semibold">{formatEventDate(input.eventDate)}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200 dark:border-zinc-800 px-4 py-2.5 rounded-2xl shadow-sm text-slate-700 dark:text-zinc-300">
              <MapPin className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <InlineEditable
                value={input.location}
                onSave={(val) => onUpdateInputField?.('location', val)}
                isEditMode={isEditMode}
                as="span"
                className="font-semibold"
              />
            </div>
          </div>

          {/* Action Row: Directional CTA Button */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <DirectionalButton
                onClick={onScrollToRegister}
                variant="dark-luxe"
                className="text-base py-3.5 px-8 font-black tracking-wide"
                icon={<ArrowRight className="w-4 h-4 text-amber-500 dark:text-amber-300" />}
              >
                {content.ctaButtonText || 'Khám Phá & Đặt Chỗ Ngay'}
              </DirectionalButton>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 px-2">
                <ShieldCheck className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span>Vé giới hạn & Chứng nhận độc quyền</span>
              </div>
            </div>

            {/* Live Social Proof Badge */}
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-zinc-400">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span className="font-medium text-slate-700 dark:text-zinc-300">
                {registeredCount > 0 ? `${registeredCount} nhà sáng tạo đã ghi danh` : 'Hơn 180 nghệ sĩ số & studio đã đăng ký'}
              </span>
              <span className="inline-block w-1 h-1 rounded-full bg-slate-300 dark:bg-zinc-700" />
              <span className="text-amber-600 dark:text-amber-300 font-semibold">Chỉ còn 24 suất trải nghiệm 3D</span>
            </div>
          </div>

          {/* Minimalist Obsidian Countdown Timer */}
          <div className="pt-2">
            <CountdownTimer targetDate={input.eventDate} size="hero" align="left" />
          </div>
        </div>

        {/* Right Column: 360-Degree Interactive Canvas Viewport */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
          {/* Glass Viewport Container */}
          <div
            className="relative w-full aspect-square max-w-[420px] rounded-3xl bg-slate-100/90 dark:bg-zinc-950/70 border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden cursor-grab active:cursor-grabbing group select-none transition-colors"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* Top Viewport Header */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-[11px] text-slate-600 dark:text-zinc-400 font-mono pointer-events-none">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 dark:bg-black/50 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm">
                <Box className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>SPATIAL_CORE_V3</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                <span>120 FPS</span>
              </div>
            </div>

            {/* The 3D Render Canvas */}
            <canvas
              ref={canvasRef}
              className="w-full h-full block"
            />

            {/* Bottom Interaction Guide Pill */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/60 border border-slate-200 dark:border-white/15 text-[11px] text-slate-800 dark:text-zinc-300 backdrop-blur-md pointer-events-none shadow-md group-hover:border-amber-400/40 transition-colors">
              <RefreshCw className="w-3 h-3 text-amber-500 dark:text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Lăn chuột hoặc kéo để xoay 360° • Scroll-Driven 3D</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
