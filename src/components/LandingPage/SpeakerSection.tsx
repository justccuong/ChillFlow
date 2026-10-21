import React from 'react';
import type { EventInput, ThemeConfig } from '../../types';
import { Camera, Award, CheckCircle } from 'lucide-react';

interface SpeakerSectionProps {
  input: EventInput;
  theme: ThemeConfig;
  onOpenSpeakerImagePicker: () => void;
}

export const SpeakerSection: React.FC<SpeakerSectionProps> = ({
  input,
  theme,
  onOpenSpeakerImagePicker,
}) => {
  const speakerPhoto = input.speakerAvatarUrl || theme.speakerImage;

  return (
    <section className="py-24 px-4 md:px-8 bg-slate-950 text-white relative overflow-hidden">
      <div className="hairline-divider absolute top-0 inset-x-0"></div>

      {/* Ambient background glow */}
      <div className={`ambient-glow-orb top-1/3 right-1/4 w-[500px] h-[400px] bg-gradient-to-tr ${theme.glowGradient} opacity-20`}></div>

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-slate-500 font-bold">
            CHUYÊN GIA DẪN DẮT
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading text-white">
            Gặp Gỡ Diễn Giả Chính
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 max-w-4xl mx-auto">
          {/* Speaker Portrait with Ambient Floating Ring */}
          <div className="relative shrink-0">
            <div
              onClick={onOpenSpeakerImagePicker}
              className="w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1.5 bg-gradient-to-tr from-slate-700 via-slate-600 to-amber-500/50 shadow-2xl cursor-pointer relative group/avatar overflow-hidden"
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

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {input.speakerName}
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              {input.speakerBio ||
                `Chuyên gia có nhiều năm kinh nghiệm thực chiến trong lĩnh vực ${input.targetAudience || 'công nghệ và chuyển đổi số'}. Đã tham gia đào tạo và chia sẻ kiến thức cho hàng ngàn người trong cộng đồng.`}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle className="w-4 h-4" /> Case study người thật việc thật
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle className="w-4 h-4" /> Đối thoại Q&A 1-1
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
