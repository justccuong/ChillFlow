import React from 'react';
import type { ThemeConfig } from '../../../types';
import { Terminal, Cpu, GitBranch, Layers, CheckCircle2, Box, Sparkles } from 'lucide-react';

interface TerminalProps {
  theme: ThemeConfig;
}

export const TerminalCodeSection: React.FC<TerminalProps> = () => {
  const techStack = [
    { name: 'Python 3.12', role: 'Runtime Core', tag: 'FastAPI / Async' },
    { name: 'LangChain & LlamaIndex', role: 'Agent Framework', tag: 'Tool Calling' },
    { name: 'Gemini 2.5 Pro', role: 'Reasoning Engine', tag: 'Multi-Modal LLM' },
    { name: 'Docker & Compose', role: 'Containerization', tag: 'DevOps Sandbox' },
    { name: 'ChromaDB & pgvector', role: 'Memory & Retrieval', tag: 'Vector Store' },
    { name: 'Next.js 15 & Tailwind', role: 'Frontend UI', tag: 'Full-Stack' },
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-[#070b13] border-y border-emerald-500/20 text-slate-900 dark:text-slate-200 relative overflow-hidden font-mono transition-colors" data-reveal>
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5 uppercase tracking-wider">
            <Cpu className="w-4 h-4" /> TECH_STACK // PREREQUISITES
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Hệ sinh thái công nghệ sử dụng trong workshop
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-sans">
            Toàn bộ mã nguồn, Dockerfile và pipeline mẫu sẽ được chia sẻ trực tiếp qua repository GitHub riêng tư.
          </p>
        </div>

        {/* 6 Tech Stack Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {techStack.map((tech, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-[#0d1424] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 shadow-sm transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <Box className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> {tech.name}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20 font-semibold">
                  {tech.tag}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">{tech.role}</p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span>Setup: 1-Click Script</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TerminalCodeSection;
