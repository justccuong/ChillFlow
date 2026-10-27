import { describe, it, expect } from 'vitest';
import { calculateWeightedCROScore } from '../src/utils/croCalculator';

describe('CRO Calculation Engine (croCalculator.ts)', () => {
  it('calculates score within [0, 100] for standard baseline input', () => {
    const score = calculateWeightedCROScore({
      headlineScore: 78,
      urgencyScore: 72,
      clarityScore: 82,
      authorityScore: 80,
      seoScore: 90,
      contrastScore: 92,
    });

    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
    expect(score).toBe(81);
  });

  it('calculates high score for optimized landing page inputs', () => {
    const score = calculateWeightedCROScore({
      headlineScore: 96,
      urgencyScore: 92,
      clarityScore: 95,
      authorityScore: 94,
      seoScore: 98,
      contrastScore: 98,
    });

    expect(score).toBeGreaterThanOrEqual(90);
    expect(score).toBeLessThanOrEqual(100);
    expect(score).toBe(95);
  });

  it('clamps extreme inputs (> 100) safely to 100', () => {
    const score = calculateWeightedCROScore({
      headlineScore: 150,
      urgencyScore: 200,
      clarityScore: 999,
      authorityScore: 500,
      seoScore: 120,
      contrastScore: 110,
    });

    expect(score).toBe(100);
  });

  it('clamps negative inputs (< 0) safely to 0', () => {
    const score = calculateWeightedCROScore({
      headlineScore: -50,
      urgencyScore: -20,
      clarityScore: -10,
      authorityScore: -5,
      seoScore: -100,
      contrastScore: -200,
    });

    expect(score).toBe(0);
  });

  it('safely handles missing, undefined, or empty object by applying robust defaults', () => {
    const emptyScore = calculateWeightedCROScore({});
    expect(emptyScore).toBeGreaterThanOrEqual(0);
    expect(emptyScore).toBeLessThanOrEqual(100);
  });

  it('safely handles NaN values without returning NaN', () => {
    const score = calculateWeightedCROScore({
      headlineScore: NaN,
      urgencyScore: NaN,
      clarityScore: NaN,
      authorityScore: NaN,
    });

    expect(isNaN(score)).toBe(false);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });
});
