import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Task 8: Visual CMS InlineEditable wrapping in Specialty Sections', () => {
  const sections = [
    'AcademySyllabusSection.tsx',
    'CinematicShowcaseSection.tsx',
    'CreativeMasonrySection.tsx',
    'DeveloperCodeSandboxSection.tsx',
    'ExecutivePitchesSection.tsx',
    'MarketingBeforeAfterSection.tsx',
    'MasterclassStatsSection.tsx',
    'StartupPitchingRosterSection.tsx',
    'TerminalCodeSection.tsx',
  ];

  it.each(sections)('ensures %s imports and uses InlineEditable', (file) => {
    const content = fs.readFileSync(
      path.resolve(__dirname, `../src/components/LandingPage/sections/${file}`),
      'utf-8'
    );
    expect(content).toContain('InlineEditable');
    expect(content).toContain('isEditMode');
  });

  it('ensures RegistrationSection supports isEditMode and wraps section title in InlineEditable', () => {
    const regContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/RegistrationSection.tsx'),
      'utf-8'
    );
    expect(regContent).toContain('InlineEditable');
    expect(regContent).toContain('isEditMode');
  });

  it('ensures LandingPagePreview passes isEditMode to specialty sections and RegistrationSection', () => {
    const previewContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/LandingPagePreview.tsx'),
      'utf-8'
    );
    expect(previewContent).toContain('<AcademySyllabusSection theme={theme} isEditMode={isEditMode}');
    expect(previewContent).toContain('<RegistrationSection');
    expect(previewContent).toContain('isEditMode={isEditMode}');
  });
});
