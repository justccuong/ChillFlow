import { CROEvaluation } from '../types';

/**
 * Calculates a normalized, weighted CRO Score in range [0, 100].
 * Incorporates:
 * - Headline Strength (25%)
 * - Urgency & Scarcity (20%)
 * - Clarity & Value Proposition (20%)
 * - Authority & Social Proof (15%)
 * - SEO & Schema Structured Data (10%)
 * - Visual Accessibility & Contrast (10%)
 */
export function calculateWeightedCROScore(cro: Partial<CROEvaluation>): number {
  const clamp = (val: number | undefined, fallback: number) => {
    if (typeof val !== 'number' || isNaN(val)) return fallback;
    return Math.min(100, Math.max(0, val));
  };

  const headline = clamp(cro.headlineScore, 75);
  const urgency = clamp(cro.urgencyScore, 70);
  const clarity = clamp(cro.clarityScore, 80);
  const authority = clamp(cro.authorityScore, 80);
  const seo = clamp(cro.seoScore, 95);
  const contrast = clamp(cro.contrastScore, 98);

  const weighted = Math.round(
    headline * 0.25 +
    urgency * 0.20 +
    clarity * 0.20 +
    authority * 0.15 +
    seo * 0.10 +
    contrast * 0.10
  );

  return Math.min(100, Math.max(0, weighted));
}
