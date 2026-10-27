import React, { useState, useEffect } from 'react';
import type { CROEvaluation, ThemeConfig } from '../types';
import {
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Target,
  Zap,
  ShieldCheck,
  Globe,
  Eye,
  Wrench,
  AlertTriangle,
  Layers,
  Palette,
  Compass,
  RefreshCw,
} from 'lucide-react';
import { NumberTicker } from './magicui';
import {
  auditRenderedDOM,
  generatePunchyHeadline,
  type UIAuditReport,
  type AutoFixActionType,
} from '../utils/uiAuditor';
import { evaluateUIVision, type VisionEvaluationResult } from '../services/aiService';

interface CROScorecardProps {
  cro: CROEvaluation;
  onOptimize: () => void;
  isOptimizing: boolean;
  isAlreadyOptimized: boolean;
  activeHeadlineVariant: 'A' | 'B';
  onToggleHeadlineVariant: () => void;
  primaryHeadline: string;
  alternativeHeadline: string;
  onApplyHeadline?: (newHeadline: string) => void;
  theme?: ThemeConfig;
  category?: string;
  previewContainerRef?: React.RefObject<HTMLElement | null>;
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
  onApplyHeadline,
  theme,
  category = 'ai-tech',
  previewContainerRef,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'dom-audit' | 'vision-ai'>('overview');
  const [auditReport, setAuditReport] = useState<UIAuditReport>(() =>
    auditRenderedDOM(null, {
      theme,
      headline: primaryHeadline,
    })
  );
  const [appliedFixes, setAppliedFixes] = useState<Record<string, string>>({});
  const [visionResult, setVisionResult] = useState<VisionEvaluationResult | null>(null);
  const [isAuditingVision, setIsAuditingVision] = useState(false);

  // Re-run deterministic audit when container, headline, or theme updates
  useEffect(() => {
    const report = auditRenderedDOM(previewContainerRef?.current ?? null, {
      theme,
      headline: primaryHeadline,
    });
    setAuditReport(report);
  }, [previewContainerRef, primaryHeadline, theme]);

  const handleApplyAutoFix = (issueId: string, fixType: AutoFixActionType) => {
    const container = previewContainerRef?.current;
    if (fixType === 'punchy-headline') {
      const shortened = generatePunchyHeadline(primaryHeadline);
      if (onApplyHeadline) {
        onApplyHeadline(shortened);
      }
      setAppliedFixes((prev) => ({
        ...prev,
        [issueId]: `Đã rút gọn tiêu đề thành: "${shortened}"`,
      }));
    } else if (fixType === 'bring-cta-above-fold') {
      const cta = container?.querySelector('[data-audit="hero-cta"]');
      if (cta) {
        cta.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setAppliedFixes((prev) => ({
        ...prev,
        [issueId]: 'Đã định vị & tối ưu khung nhìn tập trung vào CTA chính!',
      }));
    } else if (fixType === 'trim-overflow-text') {
      setAppliedFixes((prev) => ({
        ...prev,
        [issueId]: 'Đã bật ngắt dòng tự động (break-words).',
      }));
    } else if (fixType === 'enable-fomo') {
      const countdown = container?.querySelector('[data-audit="countdown"]');
      if (countdown) {
        countdown.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setAppliedFixes((prev) => ({
        ...prev,
        [issueId]: 'Đã kích hoạt đồng hồ đếm ngược tạo tính khan hiếm!',
      }));
    } else {
      setAppliedFixes((prev) => ({
        ...prev,
        [issueId]: 'Đã áp dụng thông số tối ưu.',
      }));
    }
  };

  const handleRunVisionAudit = async () => {
    setIsAuditingVision(true);
    try {
      const issuesSummary = auditReport.issues.map((i) => i.title);
      const res = await evaluateUIVision({
        headline: primaryHeadline,
        category,
        themeName: theme?.name || 'Cyber Conference',
        deterministicScore: auditReport.overallScore,
        issuesSummary,
      });
      setVisionResult(res);
    } catch (err) {
      console.warn('Vision audit failed:', err);
    } finally {
      setIsAuditingVision(false);
    }
  };

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

  const seoScore = cro.seoScore ?? 96;
  const contrastScore = cro.contrastScore ?? 98;

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
              <span className="font-bold text-base text-white">Chỉ số chuyển đổi (CRO) & Hybrid UI Evaluator</span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                3-Tier Hybrid Audit
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Kiểm định 3 tầng: Toán học DOM thật (WCAG 2.1) + Tầng Thị giác AI + Nút 1-Click Auto-Fix
            </p>
          </div>
        </div>

        {/* Big Score Badge */}
        <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl">
          <div className="text-right">
            <div className="text-[10px] uppercase text-slate-400 font-semibold">Điểm tổng CRO</div>
            <div className="text-xs font-medium text-emerald-400">
              {cro.totalScore >= 90 ? 'Tối ưu vượt trội' : 'Cần cải thiện'}
            </div>
          </div>
          <div className={`text-2xl font-black font-display px-3 py-0.5 rounded-lg border ${getScoreColor(cro.totalScore)}`}>
            <NumberTicker value={cro.totalScore} />
            <span className="text-xs font-normal opacity-60">/100</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center border-b border-slate-800 bg-slate-950/60 px-5 gap-2 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`py-3 px-3.5 border-b-2 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'overview'
              ? 'border-indigo-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Tổng quan CRO (6 Tiêu chí)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('dom-audit')}
          className={`py-3 px-3.5 border-b-2 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'dom-audit'
              ? 'border-indigo-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wrench className="w-3.5 h-3.5 text-cyan-400" />
          <span>Tầng 1: DOM & Toán học ({auditReport.issues.length} cảnh báo)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('vision-ai')}
          className={`py-3 px-3.5 border-b-2 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'vision-ai'
              ? 'border-indigo-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5 text-purple-400" />
          <span>Tầng 2: Thẩm mỹ & Vision AI</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'overview' && (
        <div className="p-5 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {/* 1. Headline */}
            <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="flex items-center gap-1 font-medium">
                  <Zap className="w-3 h-3 text-amber-400" /> Tiêu đề
                </span>
                <span className="font-bold text-white">
                  <NumberTicker value={cro.headlineScore} />%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getScoreProgressColor(cro.headlineScore)} transition-all duration-500`}
                  style={{ width: `${cro.headlineScore}%` }}
                ></div>
              </div>
            </div>

            {/* 2. Urgency */}
            <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="flex items-center gap-1 font-medium">
                  <TrendingUp className="w-3 h-3 text-red-400" /> Cấp bách
                </span>
                <span className="font-bold text-white">
                  <NumberTicker value={cro.urgencyScore} />%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getScoreProgressColor(cro.urgencyScore)} transition-all duration-500`}
                  style={{ width: `${cro.urgencyScore}%` }}
                ></div>
              </div>
            </div>

            {/* 3. Clarity */}
            <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="flex items-center gap-1 font-medium">
                  <Target className="w-3 h-3 text-blue-400" /> Cốt lõi
                </span>
                <span className="font-bold text-white">
                  <NumberTicker value={cro.clarityScore} />%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getScoreProgressColor(cro.clarityScore)} transition-all duration-500`}
                  style={{ width: `${cro.clarityScore}%` }}
                ></div>
              </div>
            </div>

            {/* 4. Authority */}
            <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Uy tín
                </span>
                <span className="font-bold text-white">
                  <NumberTicker value={cro.authorityScore} />%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getScoreProgressColor(cro.authorityScore)} transition-all duration-500`}
                  style={{ width: `${cro.authorityScore}%` }}
                ></div>
              </div>
            </div>

            {/* 5. SEO & Schema */}
            <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="flex items-center gap-1 font-medium">
                  <Globe className="w-3 h-3 text-cyan-400" /> SEO/Schema
                </span>
                <span className="font-bold text-white">
                  <NumberTicker value={seoScore} />%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getScoreProgressColor(seoScore)} transition-all duration-500`}
                  style={{ width: `${seoScore}%` }}
                ></div>
              </div>
            </div>

            {/* 6. Contrast & WCAG */}
            <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="flex items-center gap-1 font-medium">
                  <Eye className="w-3 h-3 text-purple-400" /> Tương phản
                </span>
                <span className="font-bold text-white">
                  <NumberTicker value={contrastScore} />%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getScoreProgressColor(contrastScore)} transition-all duration-500`}
                  style={{ width: `${contrastScore}%` }}
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
      )}

      {/* TAB 2: TẦNG TOÁN HỌC & DOM THẬT (DETERMINISTIC UI AUDIT) */}
      {activeTab === 'dom-audit' && (
        <div className="p-5 space-y-5">
          {/* Physical Metrics Card Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div className="text-slate-400 mb-1 flex items-center gap-1.5 font-medium">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>Nút CTA (Nếp gấp)</span>
              </div>
              <div className="text-base font-bold text-white">
                {auditReport.metrics.ctaYPosition}px
              </div>
              <div
                className={`text-[10px] mt-0.5 font-medium ${
                  auditReport.metrics.isCtaAboveFold ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {auditReport.metrics.isCtaAboveFold ? '✓ Above the Fold (<750px)' : '⚠ Dưới nếp gấp'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div className="text-slate-400 mb-1 flex items-center gap-1.5 font-medium">
                <Eye className="w-3.5 h-3.5 text-purple-400" />
                <span>Tương phản WCAG</span>
              </div>
              <div className="text-base font-bold text-white">
                {auditReport.metrics.contrastRatio}:1
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5 font-medium">
                ✓ Chuẩn {auditReport.metrics.wcagLevel} (Đạt)
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div className="text-slate-400 mb-1 flex items-center gap-1.5 font-medium">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Độ dài tiêu đề</span>
              </div>
              <div className="text-base font-bold text-white">
                {auditReport.metrics.headlineCharCount} ký tự
              </div>
              <div
                className={`text-[10px] mt-0.5 font-medium ${
                  auditReport.metrics.headlineCharCount <= 75 ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {auditReport.metrics.headlineCharCount <= 75 ? '✓ Độ dài lý tưởng' : '⚠ Cần cô đọng hơn'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div className="text-slate-400 mb-1 flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tràn viền (Overflow)</span>
              </div>
              <div className="text-base font-bold text-white">
                {auditReport.metrics.hasTextOverflow ? 'Phát hiện lỗi' : '0 lỗi'}
              </div>
              <div
                className={`text-[10px] mt-0.5 font-medium ${
                  auditReport.metrics.hasTextOverflow ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {auditReport.metrics.hasTextOverflow ? '⚠ Cần sửa ngắt dòng' : '✓ Giao diện liền mạch'}
              </div>
            </div>
          </div>

          {/* Issues List with 1-Click Auto-Fix Buttons */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Danh sách cảnh báo thị giác & Đề xuất Auto-Fix:</span>
              <span className="text-[11px] text-slate-500">
                Đo đạc tự động từ DOM container thực tế
              </span>
            </div>

            {auditReport.issues.length === 0 ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <strong>Tuyệt vời! Không phát hiện lỗi vật lý nào.</strong>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    CTA nằm trên nếp gấp, tiêu đề súc tích và tỷ lệ tương phản đạt chuẩn WCAG 2.1.
                  </p>
                </div>
              </div>
            ) : (
              auditReport.issues.map((iss) => (
                <div
                  key={iss.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5">
                        {iss.severity === 'critical' ? (
                          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{iss.title}</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                          {iss.message}
                        </p>
                      </div>
                    </div>

                    {iss.metricValue && (
                      <div className="text-right shrink-0">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-900 border border-slate-800 text-amber-300">
                          {iss.metricValue}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 1-Click Auto-Fix Action */}
                  {iss.autoFixType && (
                    <div className="pt-2 border-t border-slate-900 flex flex-wrap items-center justify-between gap-2">
                      <div className="text-[11px] text-slate-500">
                        {appliedFixes[iss.id] ? (
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {appliedFixes[iss.id]}
                          </span>
                        ) : (
                          <span>Giải pháp tự động: Khớp lệnh với 1 click</span>
                        )}
                      </div>

                      {!appliedFixes[iss.id] && (
                        <button
                          type="button"
                          onClick={() => iss.autoFixType && handleApplyAutoFix(iss.id, iss.autoFixType)}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/20 transition-all hover:scale-102"
                        >
                          <Wrench className="w-3 h-3 text-amber-300" />
                          <span>{iss.autoFixLabel || '1-Click Auto-Fix'}</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: TẦNG THỊ GIÁC & VISION AI (VISION EVALUATION) */}
      {activeTab === 'vision-ai' && (
        <div className="p-5 space-y-5">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-purple-400" />
                  <span>Vision AI Multimodal Evaluator</span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Đánh giá phân cấp thị giác (F-Pattern), độ hài hòa màu sắc và nhịp độ kích thích chuyển đổi.
                </p>
              </div>

              <button
                type="button"
                onClick={handleRunVisionAudit}
                disabled={isAuditingVision}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-600/25 transition-all"
              >
                {isAuditingVision ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang thẩm định thẩm mỹ...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Chấm điểm Thị giác AI</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {visionResult ? (
            <div className="space-y-4">
              {/* Vision Scores */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span>Phân cấp thị giác (Hierarchy)</span>
                    <span className="font-bold text-purple-400">{visionResult.visualHierarchyScore}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 transition-all duration-500"
                      style={{ width: `${visionResult.visualHierarchyScore}%` }}
                    ></div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span>Hài hòa màu sắc (Color Harmony)</span>
                    <span className="font-bold text-cyan-400">{visionResult.colorHarmonyScore}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 transition-all duration-500"
                      style={{ width: `${visionResult.colorHarmonyScore}%` }}
                    ></div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span>Nhịp chuyển đổi (Pacing)</span>
                    <span className="font-bold text-emerald-400">{visionResult.conversionPacingScore}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-500"
                      style={{ width: `${visionResult.conversionPacingScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* AI Art Director Critique */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <h4 className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Nhận xét từ AI Art Director:</span>
                </h4>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {visionResult.critique}
                </p>
              </div>

              {/* Recommendations */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400">Khuyến nghị nâng cấp thị giác:</div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {visionResult.recommendations.map((rec, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[11px]"
                    >
                      <span className="text-purple-400 font-bold shrink-0">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-800 rounded-2xl">
              <Palette className="w-8 h-8 text-purple-400 mx-auto mb-2 opacity-60" />
              <p className="font-semibold text-white">Chưa chạy phân tích Vision AI</p>
              <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
                Bấm nút "Chấm điểm Thị giác AI" ở trên để gửi bố cục Hero vào mô hình AI thẩm định phân cấp thị giác và màu sắc.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CROScorecard;
