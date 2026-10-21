import React from 'react';
import type { ThemeConfig } from '../../types';
import { Camera, Sparkles, MapPin, Users } from 'lucide-react';

interface EventGallerySectionProps {
  theme: ThemeConfig;
  location: string;
}

export const EventGallerySection: React.FC<EventGallerySectionProps> = ({ theme, location }) => {
  const photos = theme.galleryPhotos || [];

  if (photos.length === 0) return null;

  return (
    <section className="py-20 px-4 md:px-8 bg-slate-950 text-white relative border-t border-slate-900 bg-dot-grid">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-slate-400 text-xs font-semibold border border-slate-800">
            <Camera className="w-3.5 h-3.5 text-indigo-400" />
            <span>Hình ảnh thực tế</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
            Không Khí & Trải Nghiệm Sự Kiện
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto flex items-center justify-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Không gian tổ chức chuyên nghiệp tại {location}</span>
          </p>
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Main Big Photo (Span 7) */}
          {photos[0] && (
            <div className="md:col-span-7 rounded-3xl overflow-hidden border border-slate-800 relative group h-72 md:h-96 shadow-xl">
              <img
                src={photos[0].url}
                alt={photos[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-6 flex flex-col justify-end">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} w-max mb-2 border ${theme.accentBorder}`}>
                  {photos[0].tag}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white drop-shadow">
                  {photos[0].title}
                </h3>
              </div>
            </div>
          )}

          {/* Side Photo (Span 5) */}
          {photos[1] && (
            <div className="md:col-span-5 rounded-3xl overflow-hidden border border-slate-800 relative group h-72 md:h-96 shadow-xl">
              <img
                src={photos[1].url}
                alt={photos[1].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-6 flex flex-col justify-end">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} w-max mb-2 border ${theme.accentBorder}`}>
                  {photos[1].tag}
                </span>
                <h3 className="text-base md:text-lg font-bold text-white drop-shadow">
                  {photos[1].title}
                </h3>
              </div>
            </div>
          )}

          {/* Bottom Photo Left (Span 6) */}
          {photos[2] && (
            <div className="md:col-span-6 rounded-3xl overflow-hidden border border-slate-800 relative group h-64 shadow-xl">
              <img
                src={photos[2].url}
                alt={photos[2].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-5 flex flex-col justify-end">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} w-max mb-1.5 border ${theme.accentBorder}`}>
                  {photos[2].tag}
                </span>
                <h3 className="text-sm md:text-base font-bold text-white drop-shadow">
                  {photos[2].title}
                </h3>
              </div>
            </div>
          )}

          {/* Bottom Photo Right (Span 6) */}
          {photos[3] && (
            <div className="md:col-span-6 rounded-3xl overflow-hidden border border-slate-800 relative group h-64 shadow-xl">
              <img
                src={photos[3].url}
                alt={photos[3].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-5 flex flex-col justify-end">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} w-max mb-1.5 border ${theme.accentBorder}`}>
                  {photos[3].tag}
                </span>
                <h3 className="text-sm md:text-base font-bold text-white drop-shadow">
                  {photos[3].title}
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
