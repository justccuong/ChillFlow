import React from 'react';
import type { CROEvaluation } from '../types';
import { Sparkles, TrendingUp, CheckCircle2, Target, Zap, ShieldCheck } from 'lucide-react';

interface CROScorecardProps {
  cro: CROEvaluation;
  onOptimize: () => void;
  isOptimizing: boolean;
  isAlreadyOptimized: boolean;
  activeHeadlineVariant: 'A' | 'B';
  onToggleHeadlineVariant: () => void;
  primaryHeadline: string;
  alternativeHeadline: string;
}

export const CROScorecard: React.FC<CROScorecardProps> = ({
  cro,
  onOptimize,
  isOptimizing,
  isAlreadyOptimized,
  activeHeadlineVariant,
  onToggleHeadlineVariant,
  primaryHeadline,
  alternativeHeadline,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 75) return 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10';
    return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  };

  const getScoreProgressColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-400';
    if (score >= 75) return 'bg-indigo-500';
    return 'bg-amber-400';
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden text-white">
      {/* Header Banner */}
      <div className="p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white">Chỉ số chuyển đổi (CRO)</span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                AI Audit
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Đánh giá hiệu quả thuyết phục của tiêu đề, nội dung và lời kêu gọi hành động
            </p>
          </div>
        </div>

        {/* Big Score Badge */}
        <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl">
          <div className="text-right">
            <div className="text-[10px] uppercase text-slate-400 font-semibold">Điểm tổng</div>
            <div className="text-xs font-medium text-emerald-400">
              {cro.totalScore >= 90 ? 'Tối ưu tốt' : 'Cần cải thiện'}
            </div>
          </div>
          <div className={`text-2xl font-black font-display px-3 py-0.5 rounded-lg border ${getScoreColor(cro.totalScore)}`}>
            {cro.totalScore}<span className="text-xs font-normal opacity-60">/100</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="p-5 space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span className="flex items-center gap-1 font-medium">
                <Zap className="w-3 h-3 text-amber-400" /> Tiêu đề
              </span>
              <span className="font-bold text-white">{cro.headlineScore}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full ${getScoreProgressColor(cro.headlineScore)} transition-all duration-500`}
                style={{ width: `${cro.headlineScore}%` }}
              ></div>
            </div>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span className="flex items-center gap-1 font-medium">
                <TrendingUp className="w-3 h-3 text-red-400" /> Tính cấp bách
              </span>
              <span className="font-bold text-white">{cro.urgencyScore}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full ${getScoreProgressColor(cro.urgencyScore)} transition-all duration-500`}
                style={{ width: `${cro.urgencyScore}%` }}
              ></div>
            </div>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span className="flex items-center gap-1 font-medium">
                <Target className="w-3 h-3 text-blue-400" /> Giá trị cốt lõi
              </span>
              <span className="font-bold text-white">{cro.clarityScore}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full ${getScoreProgressColor(cro.clarityScore)} transition-all duration-500`}
                style={{ width: `${cro.clarityScore}%` }}
              ></div>
            </div>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span className="flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Độ uy tín
              </span>
              <span className="font-bold text-white">{cro.authorityScore}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full ${getScoreProgressColor(cro.authorityScore)} transition-all duration-500`}
                style={{ width: `${cro.authorityScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Verdict */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <strong className="text-white block mb-1">Đánh giá nhanh:</strong>
          {cro.verdict}
        </div>

        {/* Suggestions & A/B testing */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400">Gợi ý cải thiện:</div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {cro.aiSuggestions.map((sug, i) => (
                <li key={i} className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-amber-400 font-bold shrink-0">•</span>
                  <span>{sug}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
              <span>Biến thể tiêu đề (A/B Test)</span>
              <button
                type="button"
                onClick={onToggleHeadlineVariant}
                className="text-indigo-400 hover:text-indigo-300 text-xs cursor-pointer"
              >
                Đổi sang bản {activeHeadlineVariant === 'A' ? 'B' : 'A'}
              </button>
            </div>

            <div className="space-y-2">
              <div
                onClick={() => activeHeadlineVariant !== 'A' && onToggleHeadlineVariant()}
                className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                  activeHeadlineVariant === 'A'
                    ? 'border-indigo-500 bg-indigo-500/10 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-300'
                }`}
              >
                <div className="text-[10px] text-slate-500 mb-0.5">Bản A (Tập trung giá trị)</div>
                <div>{primaryHeadline}</div>
              </div>

              <div
                onClick={() => activeHeadlineVariant !== 'B' && onToggleHeadlineVariant()}
                className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                  activeHeadlineVariant === 'B'
                    ? 'border-indigo-500 bg-indigo-500/10 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-300'
                }`}
              >
                <div className="text-[10px] text-slate-500 mb-0.5">Bản B (Tập trung tính cấp bách)</div>
                <div>{alternativeHeadline}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 1-Click Optimize Button */}
        <div>
          <button
            type="button"
            onClick={onOptimize}
            disabled={isOptimizing}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              isAlreadyOptimized
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {isOptimizing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Đang tối ưu hóa...
              </>
            ) : isAlreadyOptimized ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                Đã tối ưu hóa chuyển đổi (Bấm để tinh chỉnh lại)
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                Tự động tối ưu hóa chuyển đổi
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
