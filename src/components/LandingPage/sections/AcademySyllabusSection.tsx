import React, { useState } from 'react';
import type { ThemeConfig } from '../../../types';
import { BookOpen, ChevronDown, ChevronUp, CheckCircle, Clock, GraduationCap } from 'lucide-react';

interface AcademyProps {
  theme: ThemeConfig;
}

export const AcademySyllabusSection: React.FC<AcademyProps> = ({ theme }) => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const modules = theme.curriculumModules || [
    {
      moduleNum: '01',
      title: 'Nền tảng & tư duy nguyên lý đầu tiên (First Principles)',
      duration: 'Tuần 1 (8 giờ)',
      topics: [
        'Hiểu bản chất và các giới hạn công nghệ hiện tại',
        'Xây dựng mental model phân tích bài toán thực tế',
        'Thiết lập môi trường làm việc chuẩn quốc tế',
      ],
    },
    {
      moduleNum: '02',
      title: 'Kỹ thuật chuyên sâu & thực hành hands-on lab',
      duration: 'Tuần 2 (10 giờ)',
      topics: [
        'Trực tiếp thao tác và giải quyết ca bệnh thực tế',
        'Debug, tối ưu hóa hiệu năng và đo lường chỉ số',
        'Quy trình Code Review và Mentorship 1-1',
      ],
    },
    {
      moduleNum: '03',
      title: 'Dự án tốt nghiệp & thẩm định thực tế (Capstone Project)',
      duration: 'Tuần 3 & 4 (18 giờ)',
      topics: [
        'Xây dựng sản phẩm hoàn chỉnh giải quyết vấn đề doanh nghiệp',
        'Báo cáo và phản biện trước Hội đồng Giám khảo',
        'Lễ trao Chứng chỉ Hoàn thành khóa học chính thức',
      ],
    },
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950 border-y border-blue-500/20 text-slate-900 dark:text-slate-100 relative overflow-hidden" data-reveal>
      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-500 flex items-center justify-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-500" /> KHUNG CHƯƠNG TRÌNH ĐÀO TẠO
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Lộ trình học chi tiết & chuẩn đầu ra
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Chương trình được thiết kế cô đọng, cân bằng giữa 30% lý thuyết nền tảng và 70% thời lượng thực chiến trên dự án thật.
          </p>
        </div>

        {/* Modules Accordion */}
        <div className="space-y-4">
          {modules.map((mod, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-heading font-black text-lg flex items-center justify-center">
                      {mod.moduleNum}
                    </span>
                    <div>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 dark:text-white">{mod.title}</h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-blue-500" /> {mod.duration}
                      </span>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 space-y-2.5">
                    {mod.topics.map((top, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{top}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
