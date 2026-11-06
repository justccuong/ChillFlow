import { InlineEditable } from '../InlineEditable';
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Copy, Check, RotateCcw, Play, Sparkles } from 'lucide-react';
import type { ThemeConfig, DeveloperSandboxConfig } from '../../../types';

export const DEFAULT_CURRICULUM_CODE = `// 🚀 LỘ TRÌNH THỰC CHIẾN WORKSHOP: BẠN SẼ ĐƯỢC HỌC QUA
import { VibeCodingFramework, AIAgents } from '@workshop/core';

export async function whatYouWillLearn() {
  const curriculum = [
    "1. Tư duy Vibe Coding & cách làm chủ AI Coding Assistant từ số 0",
    "2. Kiến trúc Multi-Agent Systems & Tool Calling tự động hóa quy trình",
    "3. Xây dựng Vector Memory (RAG), Search & Tối ưu chi phí Token",
    "4. Live-debugging trên hệ thống thực tế & Tối ưu chịu tải Production",
    "5. Đóng gói Container Docker, CI/CD & Deploy sản phẩm lên Cloud"
  ];

  return await AIAgents.handsOnPractice({
    curriculum,
    target: "Tự tay làm chủ & đóng gói sản phẩm AI thực chiến ngay tại chỗ!",
    status: "100% Thực hành - Không lý thuyết suông"
  });
}`;

const DEFAULT_TITLE = 'Học trực tiếp qua mã nguồn thực tế';
const DEFAULT_SUBTITLE = 'Không slide lý thuyết. Cùng bẻ khóa kiến trúc distributed agents và live-debug trên bài toán production chịu tải.';

interface DevProps {
  isEditMode?: boolean;
  theme: ThemeConfig;
  sandboxConfig?: DeveloperSandboxConfig;
  onUpdateSandbox?: (config: DeveloperSandboxConfig) => void;
}

export const DeveloperCodeSandboxSection: React.FC<DevProps> = ({
  theme,
  isEditMode = false,
  sandboxConfig,
  onUpdateSandbox,
}) => {
  const [copied, setCopied] = useState(false);
  const [title, setTitle] = useState(sandboxConfig?.title || DEFAULT_TITLE);
  const [subTitle, setSubTitle] = useState(sandboxConfig?.subTitle || DEFAULT_SUBTITLE);
  const [code, setCode] = useState(sandboxConfig?.code || DEFAULT_CURRICULUM_CODE);
  const [filename, setFilename] = useState(sandboxConfig?.filename || 'curriculum.pipeline.ts');

  // Typewriter effect state
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  // Sync with external sandboxConfig
  useEffect(() => {
    if (sandboxConfig?.title) setTitle(sandboxConfig.title);
    if (sandboxConfig?.subTitle) setSubTitle(sandboxConfig.subTitle);
    if (sandboxConfig?.code) setCode(sandboxConfig.code);
    if (sandboxConfig?.filename) setFilename(sandboxConfig.filename);
  }, [sandboxConfig]);

  // Start typing when section comes into viewport or on mount
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStartedTyping) {
          setHasStartedTyping(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStartedTyping]);

  // Typewriter interval
  useEffect(() => {
    if (!hasStartedTyping) return;
    if (displayedLength >= code.length) {
      setIsTypingComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      // Advance by 2 chars each tick for smooth & responsive typing
      setDisplayedLength((prev) => Math.min(prev + 2, code.length));
    }, 12);

    return () => clearTimeout(timer);
  }, [hasStartedTyping, displayedLength, code.length]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReplayTyping = () => {
    setDisplayedLength(0);
    setIsTypingComplete(false);
    setHasStartedTyping(true);
  };

  const handleCompleteImmediately = () => {
    setDisplayedLength(code.length);
    setIsTypingComplete(true);
  };

  const handleSaveTitle = (val: string) => {
    setTitle(val);
    onUpdateSandbox?.({ title: val, subTitle, code, filename });
  };

  const handleSaveSubTitle = (val: string) => {
    setSubTitle(val);
    onUpdateSandbox?.({ title, subTitle: val, code, filename });
  };

  const handleSaveFilename = (val: string) => {
    setFilename(val);
    onUpdateSandbox?.({ title, subTitle, code, filename: val });
  };

  const handleSaveCode = (val: string) => {
    setCode(val);
    setDisplayedLength(val.length);
    setIsTypingComplete(true);
    onUpdateSandbox?.({ title, subTitle, code: val, filename });
  };

  const displayedText = isEditMode ? code : code.slice(0, displayedLength);
  const displayedLines = displayedText.split('\n');

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-white font-mono relative overflow-hidden transition-colors border-t border-slate-200/60 dark:border-slate-850"
      data-reveal
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-12 relative z-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" /> SOURCE CODE & BENCHMARK ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
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

        {/* Interactive Code Window with Mac Bar */}
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden bg-slate-900 dark:bg-black/90 border border-slate-700/80 dark:border-emerald-500/30 shadow-2xl">
          {/* Mac Header */}
          <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-mono text-slate-400 text-[11px] flex items-center gap-1.5">
                <InlineEditable
                  value={filename}
                  onSave={handleSaveFilename}
                  isEditMode={isEditMode}
                  as="span"
                />
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Typing Controls */}
              {!isTypingComplete && (
                <button
                  type="button"
                  onClick={handleCompleteImmediately}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors cursor-pointer"
                  title="Hiện toàn bộ mã ngay"
                >
                  Hiện hết
                </button>
              )}

              {isTypingComplete && (
                <button
                  type="button"
                  onClick={handleReplayTyping}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                  title="Gõ lại code"
                >
                  <RotateCcw className="w-3 h-3" /> Gõ lại
                </button>
              )}

              {/* Copy Code */}
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 transition-colors cursor-pointer text-[11px] font-semibold"
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
          </div>

          {/* Syntax Highlighter Viewport with Typewriter Animation */}
          <div
            className="p-6 overflow-x-auto text-xs sm:text-sm leading-relaxed font-mono bg-slate-950/90 relative cursor-text select-text"
            onClick={() => {
              if (!isTypingComplete) handleCompleteImmediately();
            }}
          >
            {isEditMode ? (
              <div className="space-y-2">
                <span className="text-[11px] text-emerald-400 font-semibold block">
                  // Bạn có thể chỉnh sửa nội dung mã nguồn lộ trình học bên dưới:
                </span>
                <textarea
                  value={code}
                  onChange={(e) => handleSaveCode(e.target.value)}
                  rows={14}
                  className="w-full p-4 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-y"
                />
              </div>
            ) : (
              <pre className="text-slate-300 relative">
                <code>
                  {displayedLines.map((line, idx) => {
                    const trimmed = line.trimStart();
                    let lineClass = 'text-slate-300';
                    if (trimmed.startsWith('//')) {
                      lineClass = 'text-emerald-400/80 italic font-semibold';
                    } else if (
                      trimmed.startsWith('import ') ||
                      trimmed.startsWith('export ') ||
                      trimmed.startsWith('const ') ||
                      trimmed.startsWith('return ') ||
                      trimmed.startsWith('await ')
                    ) {
                      lineClass = 'text-cyan-400 font-semibold';
                    } else if (trimmed.startsWith('"') && trimmed.includes('",')) {
                      lineClass = 'text-amber-300';
                    }

                    return (
                      <div key={idx} className="table-row">
                        <span className="table-cell pr-4 text-slate-600 select-none text-right w-8 text-[11px]">
                          {idx + 1}
                        </span>
                        <span className={`table-cell ${lineClass}`}>{line}</span>
                      </div>
                    );
                  })}
                </code>
                {!isTypingComplete && (
                  <span
                    className="inline-block w-2 h-4 bg-emerald-400 ml-1 animate-pulse align-middle"
                    aria-hidden="true"
                  />
                )}
              </pre>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperCodeSandboxSection;
