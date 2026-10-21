import React, { useState } from 'react';
import type { FaqItem, ThemeConfig } from '../../types';
import { ChevronDown, HelpCircle, Plus, Minus } from 'lucide-react';

interface FaqSectionProps {
  faqs: FaqItem[];
  theme: ThemeConfig;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs, theme }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-24 px-4 md:px-8 bg-slate-950 text-white relative overflow-hidden">
      <div className="hairline-divider absolute top-0 inset-x-0"></div>

      <div className="max-w-3xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-[0.25em] text-slate-500 font-bold flex items-center justify-center gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>HỖ TRỢ & THẮC MẮC</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading text-white">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
            Mọi thông tin cần thiết về lịch trình, tài liệu và hình thức tham gia.
          </p>
        </div>

        {/* Clean Editorial Accordion List - NO bulky card boxes */}
        <div className="divide-y divide-slate-800/80 border-y border-slate-800/80">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="transition-colors py-2">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 text-left font-semibold text-base sm:text-lg text-white flex items-center justify-between gap-4 cursor-pointer hover:text-amber-300 transition-colors"
                >
                  <span className={isOpen ? theme.accentColor : 'text-slate-100'}>
                    {faq.question}
                  </span>
                  <div className="shrink-0 text-slate-400">
                    {isOpen ? (
                      <Minus className={`w-5 h-5 ${theme.accentColor}`} />
                    ) : (
                      <Plus className="w-5 h-5 group-hover:text-white" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="pb-5 pr-8 text-sm text-slate-400 leading-relaxed font-sans animate-fade-in">
                    {faq.answer}
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
