import React from 'react';
import type { ThemeConfig, GalleryPhoto } from '../../types';
import { Camera, MapPin, Plus, Trash2 } from 'lucide-react';
import { InlineEditable } from './InlineEditable';

export interface EventGallerySectionProps {
  theme: ThemeConfig;
  location: string;
  photos?: GalleryPhoto[];
  isEditMode?: boolean;
  onUpdatePhoto?: (index: number, field: keyof GalleryPhoto, val: string) => void;
  onOpenImagePicker?: (index: number) => void;
  onAddPhoto?: () => void;
  onRemovePhoto?: (index: number) => void;
}

export function getGalleryGridColSpan(index: number, totalCount: number): string {
  if (totalCount === 1) return 'md:col-span-12';
  if (totalCount === 2) return 'md:col-span-6';
  if (index === 0) return 'md:col-span-7';
  return 'md:col-span-5';
}

export const EventGallerySection: React.FC<EventGallerySectionProps> = ({
  theme,
  location,
  photos,
  isEditMode = false,
  onUpdatePhoto,
  onOpenImagePicker,
  onAddPhoto,
  onRemovePhoto,
}) => {
  const effectivePhotos = photos && photos.length > 0 ? photos : (theme.galleryPhotos || []);

  if (effectivePhotos.length === 0) return null;

  const totalCount = effectivePhotos.length;

  return (
    <section className="py-20 px-4 md:px-8 bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative border-t border-slate-200 dark:border-slate-900 transition-colors bg-dot-grid">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 text-xs font-semibold border border-slate-200 dark:border-slate-800">
              <Camera className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>Hình ảnh thực tế</span>
            </div>

            {isEditMode && (
              <button
                type="button"
                onClick={onAddPhoto}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs font-semibold border border-indigo-200 dark:border-indigo-800 transition-all cursor-pointer shadow-sm hover:scale-105"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm ảnh vào Gallery</span>
              </button>
            )}
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white">
            Không khí & trải nghiệm sự kiện
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto flex items-center justify-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>Không gian tổ chức chuyên nghiệp tại {location}</span>
          </p>
        </div>

        {/* Gallery Bento Grid Layout */}
        {totalCount <= 2 ? (
          // 1 or 2 photos layout
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {effectivePhotos.map((photo, idx) => {
              const spanClass = getGalleryGridColSpan(idx, totalCount);
              return (
                <div
                  key={idx}
                  className={`${spanClass} rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 relative group ${totalCount === 1 ? 'h-80 md:h-[400px]' : 'h-72 md:h-96'} shadow-xl bg-slate-900`}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Visual CMS Action Overlay */}
                  {isEditMode && (
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenImagePicker?.(idx)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-900/85 hover:bg-indigo-600 text-white backdrop-blur-md border border-white/20 transition-all text-xs font-semibold flex items-center gap-1.5 shadow-lg hover:scale-105 cursor-pointer"
                        title="Đổi ảnh hoặc tải ảnh mới"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Đổi ảnh</span>
                      </button>
                      {totalCount > 1 && (
                        <button
                          type="button"
                          onClick={() => onRemovePhoto?.(idx)}
                          className="p-1.5 rounded-xl bg-rose-950/85 hover:bg-rose-600 text-rose-200 hover:text-white backdrop-blur-md border border-rose-500/30 transition-all text-xs shadow-lg hover:scale-105 cursor-pointer"
                          title="Xóa ảnh này khỏi Gallery"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent p-6 flex flex-col justify-end">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} w-max mb-2 border ${theme.accentBorder}`}>
                      {isEditMode ? (
                        <InlineEditable
                          value={photo.tag}
                          onSave={(val) => onUpdatePhoto?.(idx, 'tag', val)}
                          isEditMode={isEditMode}
                          placeholder="Tag..."
                        />
                      ) : (
                        photo.tag
                      )}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-white drop-shadow">
                      {isEditMode ? (
                        <InlineEditable
                          value={photo.title}
                          onSave={(val) => onUpdatePhoto?.(idx, 'title', val)}
                          isEditMode={isEditMode}
                          className="text-white"
                          placeholder="Tiêu đề ảnh..."
                        />
                      ) : (
                        photo.title
                      )}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // 3+ photos layout: Bento top grid + bottom overflow grid
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Primary Bento Photo (Span 7) */}
              {effectivePhotos[0] && (
                <div className="md:col-span-7 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 relative group h-72 md:h-96 shadow-xl bg-slate-900">
                  <img
                    src={effectivePhotos[0].url}
                    alt={effectivePhotos[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {isEditMode && (
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenImagePicker?.(0)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-900/85 hover:bg-indigo-600 text-white backdrop-blur-md border border-white/20 transition-all text-xs font-semibold flex items-center gap-1.5 shadow-lg hover:scale-105 cursor-pointer"
                        title="Đổi ảnh hoặc tải ảnh mới"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Đổi ảnh</span>
                      </button>
                      {totalCount > 1 && (
                        <button
                          type="button"
                          onClick={() => onRemovePhoto?.(0)}
                          className="p-1.5 rounded-xl bg-rose-950/85 hover:bg-rose-600 text-rose-200 hover:text-white backdrop-blur-md border border-rose-500/30 transition-all text-xs shadow-lg hover:scale-105 cursor-pointer"
                          title="Xóa ảnh này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent p-6 flex flex-col justify-end">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} w-max mb-2 border ${theme.accentBorder}`}>
                      {isEditMode ? (
                        <InlineEditable
                          value={effectivePhotos[0].tag}
                          onSave={(val) => onUpdatePhoto?.(0, 'tag', val)}
                          isEditMode={isEditMode}
                          placeholder="Tag..."
                        />
                      ) : (
                        effectivePhotos[0].tag
                      )}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-white drop-shadow">
                      {isEditMode ? (
                        <InlineEditable
                          value={effectivePhotos[0].title}
                          onSave={(val) => onUpdatePhoto?.(0, 'title', val)}
                          isEditMode={isEditMode}
                          className="text-white"
                          placeholder="Tiêu đề ảnh..."
                        />
                      ) : (
                        effectivePhotos[0].title
                      )}
                    </h3>
                  </div>
                </div>
              )}

              {/* Side Stacked Bento Photos (Span 5) */}
              <div className="md:col-span-5 grid grid-cols-1 gap-4">
                {effectivePhotos.slice(1, 3).map((photo, sliceIdx) => {
                  const actualIdx = sliceIdx + 1;
                  return (
                    <div
                      key={actualIdx}
                      className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 relative group h-36 md:h-[184px] shadow-lg bg-slate-900"
                    >
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {isEditMode && (
                        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onOpenImagePicker?.(actualIdx)}
                            className="px-2 py-1 rounded-lg bg-slate-900/85 hover:bg-indigo-600 text-white backdrop-blur-md border border-white/20 transition-all text-[11px] font-semibold flex items-center gap-1 shadow-md hover:scale-105 cursor-pointer"
                            title="Đổi ảnh hoặc tải ảnh mới"
                          >
                            <Camera className="w-3 h-3" />
                            <span>Đổi ảnh</span>
                          </button>
                          {totalCount > 1 && (
                            <button
                              type="button"
                              onClick={() => onRemovePhoto?.(actualIdx)}
                              className="p-1 rounded-lg bg-rose-950/85 hover:bg-rose-600 text-rose-200 hover:text-white backdrop-blur-md border border-rose-500/30 transition-all text-xs shadow-md hover:scale-105 cursor-pointer"
                              title="Xóa ảnh này"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent p-4 flex flex-col justify-end">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${theme.badgeBg} ${theme.badgeText} w-max mb-1 border ${theme.accentBorder}`}>
                          {isEditMode ? (
                            <InlineEditable
                              value={photo.tag}
                              onSave={(val) => onUpdatePhoto?.(actualIdx, 'tag', val)}
                              isEditMode={isEditMode}
                              placeholder="Tag..."
                            />
                          ) : (
                            photo.tag
                          )}
                        </span>
                        <h4 className="text-sm md:text-base font-bold text-white drop-shadow">
                          {isEditMode ? (
                            <InlineEditable
                              value={photo.title}
                              onSave={(val) => onUpdatePhoto?.(actualIdx, 'title', val)}
                              isEditMode={isEditMode}
                              className="text-white"
                              placeholder="Tiêu đề ảnh..."
                            />
                          ) : (
                            photo.title
                          )}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Additional Photos Grid for 4+ items */}
            {effectivePhotos.length > 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {effectivePhotos.slice(3).map((photo, sliceIdx) => {
                  const actualIdx = sliceIdx + 3;
                  return (
                    <div
                      key={actualIdx}
                      className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 relative group h-56 shadow-lg bg-slate-900"
                    >
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {isEditMode && (
                        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onOpenImagePicker?.(actualIdx)}
                            className="px-2 py-1 rounded-lg bg-slate-900/85 hover:bg-indigo-600 text-white backdrop-blur-md border border-white/20 transition-all text-[11px] font-semibold flex items-center gap-1 shadow-md hover:scale-105 cursor-pointer"
                            title="Đổi ảnh hoặc tải ảnh mới"
                          >
                            <Camera className="w-3 h-3" />
                            <span>Đổi ảnh</span>
                          </button>
                          {totalCount > 1 && (
                            <button
                              type="button"
                              onClick={() => onRemovePhoto?.(actualIdx)}
                              className="p-1 rounded-lg bg-rose-950/85 hover:bg-rose-600 text-rose-200 hover:text-white backdrop-blur-md border border-rose-500/30 transition-all text-xs shadow-md hover:scale-105 cursor-pointer"
                              title="Xóa ảnh này"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent p-4 flex flex-col justify-end">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${theme.badgeBg} ${theme.badgeText} w-max mb-1 border ${theme.accentBorder}`}>
                          {isEditMode ? (
                            <InlineEditable
                              value={photo.tag}
                              onSave={(val) => onUpdatePhoto?.(actualIdx, 'tag', val)}
                              isEditMode={isEditMode}
                              placeholder="Tag..."
                            />
                          ) : (
                            photo.tag
                          )}
                        </span>
                        <h4 className="text-sm md:text-base font-bold text-white drop-shadow">
                          {isEditMode ? (
                            <InlineEditable
                              value={photo.title}
                              onSave={(val) => onUpdatePhoto?.(actualIdx, 'title', val)}
                              isEditMode={isEditMode}
                              className="text-white"
                              placeholder="Tiêu đề ảnh..."
                            />
                          ) : (
                            photo.title
                          )}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventGallerySection;
