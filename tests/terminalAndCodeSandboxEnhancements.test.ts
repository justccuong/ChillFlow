import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Terminal Hero, Tech Stack Editability & Developer Code Sandbox Typewriter', () => {
  it('TerminalHero: replaces copy with interactive RUN button with 300ms delay and scroll', () => {
    const heroContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/heroes/TerminalHero.tsx'),
      'utf-8'
    );

    // Verify RUN button presence & icon
    expect(heroContent).toContain('handleRun');
    expect(heroContent).toContain('Play');
    expect(heroContent).toContain('RUN');
    expect(heroContent).toContain('Loader2');
    expect(heroContent).toContain('CheckCircle2');
    expect(heroContent).toContain('Chạy thành công!');
    expect(heroContent).toContain('300'); // 300ms delay
    expect(heroContent).toContain('onScrollToRegister()');
  });

  it('TerminalCodeSection: allows full editing of title, subtitle, and tech cards in Visual CMS', () => {
    const terminalCodeContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/sections/TerminalCodeSection.tsx'),
      'utf-8'
    );

    expect(terminalCodeContent).toContain('InlineEditable');
    expect(terminalCodeContent).toContain('isEditMode');
    expect(terminalCodeContent).toContain('handleSaveTitle');
    expect(terminalCodeContent).toContain('handleSaveSubTitle');
    expect(terminalCodeContent).toContain('handleUpdateItem');
    expect(terminalCodeContent).toContain('handleAddItem');
    expect(terminalCodeContent).toContain('handleDeleteItem');
    expect(terminalCodeContent).toContain('Thêm công nghệ');
  });

  it('DeveloperCodeSandboxSection: has curriculum "bạn sẽ được học qua" and typewriter effect', () => {
    const devCodeContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/sections/DeveloperCodeSandboxSection.tsx'),
      'utf-8'
    );

    // Verify curriculum content
    expect(devCodeContent).toContain('BẠN SẼ ĐƯỢC HỌC QUA');
    expect(devCodeContent).toContain('whatYouWillLearn');
    expect(devCodeContent).toContain('curriculum');

    // Verify typewriter effect
    expect(devCodeContent).toContain('displayedLength');
    expect(devCodeContent).toContain('isTypingComplete');
    expect(devCodeContent).toContain('handleReplayTyping');
    expect(devCodeContent).toContain('handleCompleteImmediately');
    expect(devCodeContent).toContain('animate-pulse'); // Blinking cursor
  });

  it('LandingPagePreview passes techStack and sandboxConfig state handlers', () => {
    const previewContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/LandingPagePreview.tsx'),
      'utf-8'
    );

    expect(previewContent).toContain('techStack={content.techStack}');
    expect(previewContent).toContain('onUpdateTechStack');
    expect(previewContent).toContain('sandboxConfig={content.developerSandbox}');
    expect(previewContent).toContain('onUpdateSandbox');
  });

  it('CreativeHero: removes clunky AI mockup card and 1-on-1 tag, supports editable tags', () => {
    const heroContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/heroes/CreativeHero.tsx'),
      'utf-8'
    );

    // Verify removed clunky AI mockup and 1-on-1 text
    expect(heroContent).not.toContain('canvas_showcase.fig');
    expect(heroContent).not.toContain('1-on-1 Portfolio Critique');

    // Verify editable tags
    expect(heroContent).toContain('handleUpdateTag');
    expect(heroContent).toContain('handleAddTag');
    expect(heroContent).toContain('handleDeleteTag');
    expect(heroContent).toContain('Thêm tag');
  });

  it('CreativeMasonrySection: cards use transparent background, larger fonts, and InlineEditable', () => {
    const masonryContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/sections/CreativeMasonrySection.tsx'),
      'utf-8'
    );

    expect(masonryContent).toContain('bg-transparent');
    expect(masonryContent).toContain('text-lg sm:text-xl');
    expect(masonryContent).toContain('handleUpdateStep');
    expect(masonryContent).toContain('InlineEditable');
  });

  it('SpeakerSection: allows editing speaker experience checklist in Visual CMS', () => {
    const speakerContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/SpeakerSection.tsx'),
      'utf-8'
    );

    expect(speakerContent).toContain('handleUpdateExperience');
    expect(speakerContent).toContain('handleAddExperience');
    expect(speakerContent).toContain('handleDeleteExperience');
    expect(speakerContent).toContain('Thêm kinh nghiệm');
  });
});
