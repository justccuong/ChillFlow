import React, { useState } from 'react';
import type { EventInput, GeneratedContent, ThemeConfig } from '../../../types';
import { CountdownTimer } from '../../CountdownTimer';
import { Calendar, MapPin, ArrowRight, Terminal, Copy, Check, Code2, Cpu, GitBranch } from 'lucide-react';

interface HeroProps {
  input: EventInput;
  content: GeneratedContent;
  theme: ThemeConfig;
  headlineToDisplay: string;
  onScrollToRegister: () => void;
  registeredCount: number;
}

export const TerminalHero: React.FC<HeroProps> = ({
  input,
  content,
  theme,
  headlineToDisplay,
  onScrollToRegister,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'config'>('code');

  const snippet = theme.terminalSnippet || {
    filename: 'ai_agent_runtime.py',
    language: 'python',
    runCommand: 'npx create-eventflow-agent@v2.6',
    code: `import asyncio
from eventflow.agents import AutonomousAgent, ToolRegistry

agent = AutonomousAgent(
    model="gemini-2.5-pro",
    tools=ToolRegistry.load_all(),
    temperature=0.2
)

async def main():
    print("[EVENTFLOW] Initializing live workshop session...")
    stream = await agent.run_live_mission(
        topic="Full-Stack AI Engineering 2026",
        mode="hands_on_debug"
    )
    async for event in stream:
        print(f">> {event.stage}: {event.summary}")

if __name__ == "__main__":
    asyncio.run(main())`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.runCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left font-sans">
      {/* Left Column: Developer Monospace Copy */}
      <div className="lg:col-span-6 space-y-6">
        {/* Hacker Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>v2.6 // DEV_WORKSHOP // HANDS_ON</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading leading-tight text-slate-900 dark:text-white">
          {headlineToDisplay}
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
          {content.subHeadline}
        </p>

        {/* Run Command Quick Pill */}
        <div className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400">
          <span className="text-slate-500 select-none">$</span>
          <span className="flex-1 truncate">{snippet.runCommand}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Sao chép lệnh"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Date & Location Pill */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700 dark:text-slate-300 font-mono">
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-lg shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>{input.eventDate}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-lg shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{input.location}</span>
          </div>
        </div>

        {/* Floating Countdown */}
        <div className="pt-2">
          <CountdownTimer targetDate={input.eventDate} />
        </div>

        {/* CTA Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            type="button"
            onClick={onScrollToRegister}
            className={`px-8 py-3.5 rounded-xl text-base shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group ${theme.btnPrimary}`}
          >
            <span>{content.ctaButtonText || 'Đăng Ký Slot Live Coding'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
            <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
            Yêu cầu laptop có cài đặt Node/Python
          </span>
        </div>
      </div>

      {/* Right Column: Real Dark Code Terminal Window */}
      <div className="lg:col-span-6">
        <div className="rounded-2xl bg-[#0b101b] border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs">
          {/* Terminal Window Header Bar with macOS Buttons */}
          <div className="px-4 py-3 bg-[#070b13] border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 text-slate-400 text-[11px] font-sans font-medium">bash - workshop-runtime</span>
            </div>
            {/* Tabs */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('code')}
                className={`px-2.5 py-1 rounded text-[11px] cursor-pointer transition-colors ${
                  activeTab === 'code' ? 'bg-slate-800 text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {snippet.filename}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('config')}
                className={`px-2.5 py-1 rounded text-[11px] cursor-pointer transition-colors ${
                  activeTab === 'config' ? 'bg-slate-800 text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                requirements.txt
              </button>
            </div>
          </div>

          {/* Terminal Code Content */}
          <div className="p-4 sm:p-5 overflow-x-auto text-slate-300 leading-relaxed font-mono text-[11px] sm:text-xs min-h-[280px]">
            {activeTab === 'code' ? (
              <pre className="whitespace-pre">
                <code>
                  {snippet.code.split('\n').map((line, idx) => (
                    <div key={idx} className="table-row">
                      <span className="table-cell pr-4 text-slate-600 select-none text-right">{idx + 1}</span>
                      <span className="table-cell">{line}</span>
                    </div>
                  ))}
                </code>
              </pre>
            ) : (
              <div className="space-y-1 text-slate-400">
                <p># Python Dependencies for Event Workshop</p>
                <p className="text-emerald-400">langchain&gt;=0.2.0</p>
                <p className="text-emerald-400">google-genai&gt;=1.0.0</p>
                <p className="text-emerald-400">pydantic&gt;=2.8.0</p>
                <p className="text-emerald-400">fastapi&gt;=0.111.0</p>
                <p className="text-emerald-400">uvicorn&gt;=0.30.0</p>
                <p className="text-slate-500 pt-4"># Ready for hands-on deployment</p>
              </div>
            )}
          </div>

          {/* Terminal Footer Info */}
          <div className="px-4 py-2 bg-[#070b13] border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5 text-cyan-400" /> UTF-8 // LF</span>
            <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-emerald-400" /> Python 3.12 Runtime</span>
          </div>
        </div>
      </div>
    </div>
  );
};
