import React from 'react';
import type { EventInput, ThemeConfig } from '../../types';
import { Camera, Award, CheckCircle } from 'lucide-react';

interface SpeakerSectionProps {
  input: EventInput;
  theme: ThemeConfig;
  onOpenSpeakerImagePicker?: () => void;
}

export const SpeakerSection: React.FC<SpeakerSectionProps> = ({
  input,
  theme,
  onOpenSpeakerImagePicker,
}) => {
  const speakerPhoto = input.speakerAvatarUrl || theme.speakerImage;

  return (
    <section className="py-24 px-4 md:px-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors border-t border-slate-200/60 dark:border-slate-850">
      <div className="hairline-divider absolute top-0 inset-x-0"></div>

      {/* Ambient background glow */}
      <div className={`ambient-glow-orb top-1/3 right-1/4 w-[500px] h-[400px] bg-gradient-to-tr ${theme.glowGradient} opacity-15 dark:opacity-20`}></div>

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-slate-500 font-bold">
            CHUYÊN GIA DẪN DẮT
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white">
            Gặp gỡ diễn giả chính
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 max-w-4xl mx-auto">
          {/* Speaker Portrait with Ambient Floating Ring */}
          <div className="relative shrink-0">
            <div
              onClick={onOpenSpeakerImagePicker}
              className="w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1.5 bg-gradient-to-tr from-slate-300 via-slate-400 to-amber-500/50 dark:from-slate-700 dark:via-slate-600 dark:to-amber-500/50 shadow-2xl cursor-pointer relative group/avatar overflow-hidden"
              title="Nhấp để đổi ảnh chân dung diễn giả"
            >
              <img
                src={speakerPhoto}
                alt={input.speakerName}
                className="w-full h-full object-cover rounded-full group-hover/avatar:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 rounded-full bg-slate-950/60 opacity-0 group-hover/avatar:opacity-100 flex flex-col items-center justify-center transition-opacity text-xs font-bold text-white gap-1">
                <Camera className="w-5 h-5 text-amber-400" />
                <span>Đổi ảnh</span>
              </div>
            </div>
          </div>

          {/* Speaker Info - Editorial style, NO box! */}
          <div className="space-y-4 text-center md:text-left max-w-xl">
            {input.speakerRole && (
              <div className={`text-xs font-bold uppercase tracking-widest ${theme.accentColor}`}>
                {input.speakerRole}
              </div>
            )}

            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white">
              {input.speakerName}
            </h3>

            {input.speakerBio && (
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
                {input.speakerBio}
              </p>
            )}

            {/* Credibility Checklist */}
            <div className="pt-2 flex flex-wrap gap-4 justify-center md:justify-start text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>10+ năm kinh nghiệm thực chiến</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Cố vấn cho hàng chục doanh nghiệp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
