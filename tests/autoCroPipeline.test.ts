import { describe, it, expect } from 'vitest';
import { generateLandingPageContent } from '../src/services/aiService';
import { EventInput } from '../src/types';
import fs from 'fs';
import path from 'path';

describe('Automated 2-Phase Generation & Instant CRO Optimization Pipeline', () => {
  const sampleInput: EventInput = {
    eventName: 'AI Frontier 2026',
    category: 'ai-tech',
    eventDate: '2026-10-15',
    location: 'Hà Nội',
    speakerName: 'Dr. Jane Doe',
    speakerRole: 'AI Research Director',
    targetAudience: 'Software Engineers',
  };

  it('generates high CRO score (>= 90) when forceOptimized is enabled on initial pipeline', async () => {
    const result = await generateLandingPageContent(sampleInput, undefined, true);
    expect(result.cro.totalScore).toBeGreaterThanOrEqual(90);
    expect(result.cro.headlineScore).toBeGreaterThanOrEqual(90);
    expect(result.cro.urgencyScore).toBeGreaterThanOrEqual(90);
    expect(result.cro.clarityScore).toBeGreaterThanOrEqual(90);
    expect(result.content.headline).toBeTruthy();
  });

  it('App.tsx invokes generateLandingPageContent with forceOptimized = true on form submit and sets isAlreadyOptimized to true', () => {
    const appPath = path.resolve(__dirname, '../src/App.tsx');
    const appSource = fs.readFileSync(appPath, 'utf8');

    // App.tsx handleFormSubmit should call generateLandingPageContent with forceOptimized = true
    expect(appSource).toMatch(/generateLandingPageContent\s*\(\s*input\s*,\s*apiKey\s*,\s*true\s*\)/);
    // App.tsx should set isAlreadyOptimized(true) upon initial generation
    expect(appSource).toMatch(/setIsAlreadyOptimized\s*\(\s*true\s*\)/);
  });

  it('EventInputForm displays CRO optimization progress messaging in loading state', () => {
    const formPath = path.resolve(__dirname, '../src/components/EventInputForm.tsx');
    const formSource = fs.readFileSync(formPath, 'utf8');

    expect(formSource).toMatch(/tối ưu.*CRO|CRO.*tối ưu/i);
  });
});
