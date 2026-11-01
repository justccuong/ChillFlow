import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Task 6: Minimalist Borderless Spatial Core 3D with Slower Rotation', () => {
  it('ensures CinematicStudioHero does not render borders, badges, or instructions around the 3D core', () => {
    const heroContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/heroes/CinematicStudioHero.tsx'),
      'utf-8'
    );

    // No hardcoded badges or instructions
    expect(heroContent).not.toContain('SPATIAL_CORE_V3');
    expect(heroContent).not.toContain('120 FPS');
    expect(heroContent).not.toContain('Lăn chuột hoặc kéo để xoay 360');

    // No card borders or heavy background
    expect(heroContent).not.toContain('border-slate-200 dark:border-white/10 shadow-xl');
  });

  it('ensures scroll-driven rotation physics is decelerated for slower, smoother rotation', () => {
    const heroContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/heroes/CinematicStudioHero.tsx'),
      'utf-8'
    );

    // Damped velocity and impulse
    expect(heroContent).toContain('0.0012');
    expect(heroContent).toContain('0.0006');
    expect(heroContent).not.toContain('deltaY * 0.0035');
  });
});
