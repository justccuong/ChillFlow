import React, { useState } from 'react';
import type { FaqItem, ThemeConfig } from '../../types';
import { HelpCircle, Plus, Minus, Trash2 } from 'lucide-react';
import { InlineEditable } from './InlineEditable';

interface FaqSectionProps {
  faqs: FaqItem[];
  theme: ThemeConfig;
  isEditMode?: boolean;
  onUpdateFaqItem?: (index: number, field: keyof FaqItem, value: string) => void;
  onAddFaqItem?: () => void;
  onRemoveFaqItem?: (index: number) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  faqs = [],
  theme,
  isEditMode = false,
  onUpdateFaqItem,
  onAddFaqItem,
  onRemoveFaqItem,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  if ((!faqs || faqs.length === 0) && !isEditMode) return null;

  return (
    <section className="py-24 px-4 md:px-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors border-t border-slate-200/60 dark:border-slate-850">
      <div className="hairline-divider absolute top-0 inset-x-0"></div>

      <div className="max-w-3xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-[0.25em] text-slate-500 font-bold flex items-center justify-center gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>HỖ TRỢ & THẮC MẮC</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white">
            Câu hỏi thường gặp
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-md mx-auto">
            Mọi thông tin cần thiết về lịch trình, tài liệu và hình thức tham gia.
          </p>
        </div>

        {/* Clean Editorial Accordion List */}
        <div className="divide-y divide-slate-200 dark:divide-slate-800/80 border-y border-slate-200 dark:border-slate-800/80">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="transition-colors py-2 relative group/faq">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 py-4 text-left font-semibold text-base sm:text-lg">
                    <InlineEditable
                      value={faq.question}
                      isEditMode={isEditMode}
                      onSave={(val) => onUpdateFaqItem?.(idx, 'question', val)}
                      className={isOpen ? theme.accentColor : 'text-slate-900 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-300'}
                    />
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {isEditMode && onRemoveFaqItem && faqs.length > 1 && (
                      <button
                        type="button"
                        title="Xóa câu hỏi này"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFaqItem(idx);
                        }}
                        className="p-1.5 rounded-md text-red-400 hover:text-red-600 hover:bg-red-500/10 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                      aria-label={isOpen ? 'Thu gọn' : 'Mở rộng'}
                    >
                      {isOpen ? (
                        <Minus className={`w-5 h-5 ${theme.accentColor}`} />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {(isOpen || isEditMode) && (
                  <div className="pb-5 pr-8 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                    <InlineEditable
                      value={faq.answer}
                      isEditMode={isEditMode}
                      multiline
                      onSave={(val) => onUpdateFaqItem?.(idx, 'answer', val)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add FAQ Button in Edit Mode */}
        {isEditMode && onAddFaqItem && (
          <div className="pt-4 text-center">
            <button
              type="button"
              onClick={onAddFaqItem}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-dashed border-amber-500/40 text-amber-600 dark:text-amber-400 hover:text-amber-500 hover:border-amber-400 hover:bg-amber-500/10 font-semibold text-sm transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm câu hỏi FAQ</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
