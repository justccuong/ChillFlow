import React, { useState } from 'react';
import type { ThemeConfig } from '../../../types';
import { Sparkles, Award, ArrowUpRight, Play, X, Eye, Layers, Box, Flame } from 'lucide-react';
import { DirectionalButton } from '../../common/DirectionalButton';

interface CinematicShowcaseProps {
  theme: ThemeConfig;
  onScrollToRegister: () => void;
}

interface ProjectCard {
  id: string;
  title: string;
  category: string;
  awardBadge: string;
  year: string;
  description: string;
  coverImage: string;
  videoPreviewUrl?: string;
  tags: string[];
}

export const CinematicShowcaseSection: React.FC<CinematicShowcaseProps> = ({
  onScrollToRegister,
}) => {
  const [activeModalProject, setActiveModalProject] = useState<ProjectCard | null>(null);

  const projects: ProjectCard[] = [
    {
      id: 'proj-1',
      title: 'NeuraSphere Spatial Studio',
      category: 'Interactive 3D & WebGL Experience',
      awardBadge: 'Awwwards Site of the Month',
      year: '2026',
      description: 'Hệ thống tương tác không gian 3D đạt 120 FPS trên mọi thiết bị di động, tích hợp bộ tạo âm thanh Web Audio và thuật toán render double-buffered.',
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      tags: ['Spatial 3D', 'Double-Buffered', 'Web Audio API', 'GSAP'],
    },
    {
      id: 'proj-2',
      title: 'Cyber Kinetic Monolith',
      category: '360° AVIF Sequence Scrubber',
      awardBadge: 'FWA of the Day',
      year: '2026',
      description: 'Chuỗi 360 khung hình điện ảnh kết xuất từ Octane Render, nạp trước siêu tốc qua thuật toán 65% early-resolution.',
      coverImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
      tags: ['360° Orbit', 'Photorealism', 'Zero GPU Lag'],
    },
    {
      id: 'proj-3',
      title: 'Prism Lux Brand Identity',
      category: 'Motion Typography & Shader Design',
      awardBadge: 'CSS Design Awards Special Kudos',
      year: '2026',
      description: 'Quy chuẩn nhận diện thương hiệu cao cấp kết hợp hiệu ứng trỏ chuột đa hướng (Directional Hover) và typography động.',
      coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      tags: ['Directional Hover', 'Custom Easing', 'Micro-Interactions'],
    },
    {
      id: 'proj-4',
      title: 'Aetheria Virtual Concert Arena',
      category: 'Immersive Real-Time Showcase',
      awardBadge: 'Cannes Lions Digital Craft Nominee',
      year: '2026',
      description: 'Không gian hòa nhạc số siêu thực đón nhận hơn 50,000 người tham gia đồng thời với dải sóng âm SVG dao động thời gian thực.',
      coverImage: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
      tags: ['Massive Concurrency', 'SVG Waveform', 'Soundtrack Engine'],
    },
  ];

  return (
    <section className="py-20 bg-black text-white relative overflow-hidden border-t border-white/10" data-reveal>
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-800">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-amber-400/30 text-xs font-semibold text-amber-300">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span className="tracking-widest uppercase text-[10px] font-bold">
                EXPERIENTIAL SHOWCASE & CASE STUDIES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white leading-tight">
              Tác Phẩm 3D & Trải Nghiệm Số Đỉnh Cao
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
              Mỗi tác phẩm là sự giao thoa hoàn hảo giữa công nghệ đồ họa điện ảnh, thuật toán nạp mượt mà và âm học Web Audio tiên phong.
            </p>
          </div>

          <div className="shrink-0">
            <DirectionalButton
              onClick={onScrollToRegister}
              variant="outline"
              size="md"
              icon={<ArrowUpRight className="w-4 h-4 text-amber-300" />}
            >
              Đăng Ký Tham Quan Studio
            </DirectionalButton>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Card 1: Large Featured (Col-span 7) */}
          <div
            onClick={() => setActiveModalProject(projects[0])}
            className="lg:col-span-7 group relative rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800/80 hover:border-amber-400/50 shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-end min-h-[440px] p-6 sm:p-10"
          >
            {/* Image Layer with Zoom */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${projects[0].coverImage})` }}
            />
            {/* Gradient Mask Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-mono">
                {projects[0].awardBadge}
              </span>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-black transition-colors">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-3">
              <div className="flex flex-wrap gap-2">
                {projects[0].tags.map((t, idx) => (
                  <span key={idx} className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/10 text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-heading group-hover:text-amber-300 transition-colors">
                {projects[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
                {projects[0].description}
              </p>
            </div>
          </div>

          {/* Card 2: Right Top (Col-span 5) */}
          <div
            onClick={() => setActiveModalProject(projects[1])}
            className="lg:col-span-5 group relative rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800/80 hover:border-amber-400/50 shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-end min-h-[440px] p-6 sm:p-8"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${projects[1].coverImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-transparent" />

            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-mono">
                {projects[1].awardBadge}
              </span>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-black transition-colors">
                <Eye className="w-4 h-4" />
              </div>
            </div>

            <div className="relative z-10 space-y-2.5">
              <div className="flex flex-wrap gap-1.5">
                {projects[1].tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading group-hover:text-amber-300 transition-colors">
                {projects[1].title}
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {projects[1].description}
              </p>
            </div>
          </div>

          {/* Card 3: Left Bottom (Col-span 5) */}
          <div
            onClick={() => setActiveModalProject(projects[2])}
            className="lg:col-span-5 group relative rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800/80 hover:border-amber-400/50 shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-end min-h-[420px] p-6 sm:p-8"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${projects[2].coverImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-transparent" />

            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-mono">
                {projects[2].awardBadge}
              </span>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-black transition-colors">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <div className="relative z-10 space-y-2.5">
              <div className="flex flex-wrap gap-1.5">
                {projects[2].tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading group-hover:text-amber-300 transition-colors">
                {projects[2].title}
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {projects[2].description}
              </p>
            </div>
          </div>

          {/* Card 4: Right Bottom Wide (Col-span 7) */}
          <div
            onClick={() => setActiveModalProject(projects[3])}
            className="lg:col-span-7 group relative rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800/80 hover:border-amber-400/50 shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-end min-h-[420px] p-6 sm:p-10"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${projects[3].coverImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-mono">
                {projects[3].awardBadge}
              </span>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-black transition-colors">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
            </div>

            <div className="relative z-10 space-y-3">
              <div className="flex flex-wrap gap-2">
                {projects[3].tags.map((t, idx) => (
                  <span key={idx} className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/10 text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-heading group-hover:text-amber-300 transition-colors">
                {projects[3].title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
                {projects[3].description}
              </p>
            </div>
          </div>
        </div>

        {/* International Trust Marquee Ribbon */}
        <div className="pt-8 border-t border-zinc-800 space-y-4 text-center">
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-mono">
            Được Đề Cử & Chứng Nhận Bởi Các Hội Đồng Thẩm Mỹ Quốc Tế
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            {['AWWWARDS', 'FWA OF THE DAY', 'CANNES LIONS', 'CSS DESIGN AWARDS', 'BLENDER FOUNDATION'].map((brand, i) => (
              <span key={i} className="text-sm sm:text-base font-black tracking-widest text-zinc-300 font-heading">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Case Study Lightbox Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-amber-400 font-mono">{activeModalProject.awardBadge}</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">{activeModalProject.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Viewport */}
            <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
              <img
                src={activeModalProject.coverImage}
                alt={activeModalProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.6)] cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
                <span className="text-xs font-mono text-zinc-200 uppercase tracking-wider bg-black/60 px-3 py-1 rounded-full border border-white/15">
                  Bấm để xem video 4K Showreel
                </span>
              </div>
            </div>

            {/* Modal Footer Info */}
            <div className="p-6 space-y-4 bg-zinc-900/60">
              <p className="text-sm text-zinc-300 leading-relaxed">
                {activeModalProject.description}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-zinc-800 text-xs">
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.tags.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-amber-300 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveModalProject(null);
                    onScrollToRegister();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold transition-colors cursor-pointer"
                >
                  Đăng Ký Tham Gia Dự Án
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
