import React, { useState } from 'react';
import { Terminal, Copy, Check, GitCommit, Cpu, Zap, Code2 } from 'lucide-react';
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
    <section className="py-20 bg-[#0B0F17] text-white font-mono relative overflow-hidden" data-reveal>
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-12 relative z-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center justify-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" /> SOURCE CODE & BENCHMARK ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-mono">
            Học Trực Tiếp Qua Mã Nguồn Thực Tế
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-sans">
            Không slide lý thuyết. Cùng bẻ khóa kiến trúc distributed agents và live-debug trên bài toán production chịu tải.
          </p>
        </div>

        {/* Interactive Code Window */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1117] shadow-2xl overflow-hidden">
          {/* Top terminal bar */}
          <div className="px-4 py-3 bg-[#161B22] border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span className="text-slate-400 font-mono text-[11px] ml-2">agent_cluster_worker.ts</span>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>

          {/* Code text */}
          <div className="p-6 overflow-x-auto text-xs leading-relaxed text-slate-300">
            <pre className="font-mono">
              <code>{sampleSnippet}</code>
            </pre>
          </div>
        </div>

        {/* 3 Tech Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <Cpu className="w-4 h-4" /> ZERO-OVERHEAD WASM
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Biên dịch các module tính toán nặng sang WebAssembly chạy trực tiếp trên browser hoặc edge worker.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
              <Zap className="w-4 h-4" /> LATENCY SUB-50MS
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Tối ưu luồng event-driven streaming response, giảm thời gian phản hồi dưới 50ms cho các tác vụ real-time.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <GitCommit className="w-4 h-4" /> PRODUCTION REPO ACCESS
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Cấp quyền truy cập private repository trọn gói bao gồm Docker compose, Terraform scripts và CI/CD templates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
