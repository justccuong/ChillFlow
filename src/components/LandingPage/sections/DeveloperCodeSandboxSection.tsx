import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';
import type { ThemeConfig } from '../../../types';

interface DevProps {
  theme: ThemeConfig;
}

export const DeveloperCodeSandboxSection: React.FC<DevProps> = ({ theme }) => {
  const [copied, setCopied] = useState(false);

  const sampleSnippet = `// Production AI Agent Worker Pipeline
import { AgentRunner, ModelRouter, VectorStore } from '@eventflow/core';

export async function bootstrapCluster() {
  const router = new ModelRouter({ fallback: 'gemini-1.5-flash', latencyThresholdMs: 80 });
  const runner = new AgentRunner({ router, memory: new VectorStore('redis://cluster:6379') });

  // Execute distributed reasoning pipeline
  const result = await runner.dispatch({
    task: 'autonomous-conversion-optimization',
    concurrency: 16,
    onStep: (step) => console.log(\`[AGENT_STEP]: \${step.id} completed in \${step.durationMs}ms\`)
  });

  return result.metrics;
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-white font-mono relative overflow-hidden transition-colors border-t border-slate-200/60 dark:border-slate-850" data-reveal>
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-12 relative z-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" /> SOURCE CODE & BENCHMARK ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
            Học trực tiếp qua mã nguồn thực tế
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-sans">
            Không slide lý thuyết. Cùng bẻ khóa kiến trúc distributed agents và live-debug trên bài toán production chịu tải.
          </p>
        </div>

        {/* Interactive Code Window */}
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden bg-slate-900 dark:bg-black/90 border border-slate-700/80 dark:border-emerald-500/30 shadow-2xl">
          {/* Mac Header */}
          <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-mono text-slate-400 text-[11px]">agent-runner.pipeline.ts</span>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 transition-colors cursor-pointer text-[11px]"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" /> COPIED!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" /> COPY CODE
                </>
              )}
            </button>
          </div>

          {/* Syntax Highlighter Viewport */}
          <div className="p-6 overflow-x-auto text-xs sm:text-sm leading-relaxed font-mono text-emerald-400 bg-slate-950/90">
            <pre className="text-slate-300">
              <code>{sampleSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
