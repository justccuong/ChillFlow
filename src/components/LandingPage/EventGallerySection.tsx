import React from 'react';
import type { ThemeConfig } from '../../types';
import { Camera, MapPin } from 'lucide-react';

interface EventGallerySectionProps {
  theme: ThemeConfig;
  location: string;
}

export const EventGallerySection: React.FC<EventGallerySectionProps> = ({ theme, location }) => {
  const photos = theme.galleryPhotos || [];

  if (photos.length === 0) return null;

  return (
    <section className="py-20 px-4 md:px-8 bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative border-t border-slate-200 dark:border-slate-900 transition-colors bg-dot-grid">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 text-xs font-semibold border border-slate-200 dark:border-slate-800">
            <Camera className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            <span>Hình ảnh thực tế</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white">
            Không khí & trải nghiệm sự kiện
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto flex items-center justify-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>Không gian tổ chức chuyên nghiệp tại {location}</span>
          </p>
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Main Big Photo (Span 7) */}
          {photos[0] && (
            <div className="md:col-span-7 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 relative group h-72 md:h-96 shadow-xl">
              <img
                src={photos[0].url}
                alt={photos[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-6 flex flex-col justify-end">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} w-max mb-2 border ${theme.accentBorder}`}>
                  {photos[0].tag}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white drop-shadow">
                  {photos[0].title}
                </h3>
              </div>
            </div>
          )}

          {/* Side Stacked Photos (Span 5) */}
          <div className="md:col-span-5 grid grid-cols-1 gap-4">
            {photos.slice(1, 3).map((photo, idx) => (
              <div
                key={idx}
                className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 relative group h-36 md:h-[184px] shadow-lg"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-4 flex flex-col justify-end">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${theme.badgeBg} ${theme.badgeText} w-max mb-1 border ${theme.accentBorder}`}>
                    {photo.tag}
                  </span>
                  <h4 className="text-sm md:text-base font-bold text-white drop-shadow">
                    {photo.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
