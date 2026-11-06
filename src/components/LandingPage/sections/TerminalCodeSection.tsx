import { InlineEditable } from '../InlineEditable';
import React, { useState, useEffect } from 'react';
import type { ThemeConfig, TechStackConfig, TechStackItem } from '../../../types';
import { Cpu, CheckCircle2, Box, Plus, Trash2 } from 'lucide-react';

const DEFAULT_TECH_ITEMS: TechStackItem[] = [
  { name: 'Python 3.12', role: 'Runtime Core', tag: 'FastAPI / Async' },
  { name: 'LangChain & LlamaIndex', role: 'Agent Framework', tag: 'Tool Calling' },
  { name: 'Gemini 2.5 Pro', role: 'Reasoning Engine', tag: 'Multi-Modal LLM' },
  { name: 'Docker & Compose', role: 'Containerization', tag: 'DevOps Sandbox' },
  { name: 'ChromaDB & pgvector', role: 'Memory & Retrieval', tag: 'Vector Store' },
  { name: 'Next.js 15 & Tailwind', role: 'Frontend UI', tag: 'Full-Stack' },
];

const DEFAULT_TITLE = 'Hệ sinh thái công nghệ sử dụng trong workshop';
const DEFAULT_SUBTITLE = 'Toàn bộ mã nguồn, Dockerfile và pipeline mẫu sẽ được chia sẻ trực tiếp qua repository GitHub riêng tư.';

interface TerminalProps {
  isEditMode?: boolean;
  theme: ThemeConfig;
  techStack?: TechStackConfig;
  onUpdateTechStack?: (config: TechStackConfig) => void;
}

export const TerminalCodeSection: React.FC<TerminalProps> = ({
  isEditMode = false,
  techStack,
  onUpdateTechStack,
}) => {
  const [title, setTitle] = useState(techStack?.title || DEFAULT_TITLE);
  const [subTitle, setSubTitle] = useState(techStack?.subTitle || DEFAULT_SUBTITLE);
  const [items, setItems] = useState<TechStackItem[]>(techStack?.items || DEFAULT_TECH_ITEMS);

  useEffect(() => {
    if (techStack?.title) setTitle(techStack.title);
    if (techStack?.subTitle) setSubTitle(techStack.subTitle);
    if (techStack?.items && techStack.items.length > 0) setItems(techStack.items);
  }, [techStack]);

  const handleSaveTitle = (newTitle: string) => {
    setTitle(newTitle);
    onUpdateTechStack?.({ title: newTitle, subTitle, items });
  };

  const handleSaveSubTitle = (newSub: string) => {
    setSubTitle(newSub);
    onUpdateTechStack?.({ title, subTitle: newSub, items });
  };

  const handleUpdateItem = (index: number, field: keyof TechStackItem, value: string) => {
    const updated = items.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    setItems(updated);
    onUpdateTechStack?.({ title, subTitle, items: updated });
  };

  const handleAddItem = () => {
    const newItem: TechStackItem = {
      name: 'Công nghệ mới',
      role: 'Kiến trúc chuyên sâu',
      tag: 'Hands-on',
    };
    const updated = [...items, newItem];
    setItems(updated);
    onUpdateTechStack?.({ title, subTitle, items: updated });
  };

  const handleDeleteItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    onUpdateTechStack?.({ title, subTitle, items: updated });
  };

  return (
    <section className="py-16 bg-slate-50 dark:bg-[#070b13] border-y border-emerald-500/20 text-slate-900 dark:text-slate-200 relative overflow-hidden font-mono transition-colors" data-reveal>
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5 uppercase tracking-wider">
            <Cpu className="w-4 h-4" /> TECH_STACK // PREREQUISITES
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            <InlineEditable
              value={title}
              onSave={handleSaveTitle}
              isEditMode={isEditMode}
              as="span"
            />
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-sans">
            <InlineEditable
              value={subTitle}
              onSave={handleSaveSubTitle}
              isEditMode={isEditMode}
              as="span"
              multiline
            />
          </p>
        </div>

        {/* Tech Stack Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((tech, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-[#0d1424] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 shadow-sm transition-all space-y-3 group relative"
            >
              {isEditMode && (
                <button
                  type="button"
                  onClick={() => handleDeleteItem(idx)}
                  className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors z-20 cursor-pointer"
                  title="Xóa công nghệ này"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}

              <div className="flex items-center justify-between pr-5">
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <Box className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <InlineEditable
                    value={tech.name}
                    onSave={(val) => handleUpdateItem(idx, 'name', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20 font-semibold">
                  <InlineEditable
                    value={tech.tag}
                    onSave={(val) => handleUpdateItem(idx, 'tag', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
                <InlineEditable
                  value={tech.role}
                  onSave={(val) => handleUpdateItem(idx, 'role', val)}
                  isEditMode={isEditMode}
                  as="span"
                />
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span>Setup: 1-Click Script</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>

        {isEditMode && (
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={handleAddItem}
              className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm công nghệ vào Workshop</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TerminalCodeSection;
