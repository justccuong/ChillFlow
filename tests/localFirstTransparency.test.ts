import { describe, it, expect, vi } from 'vitest';
import { syncProjectsToCloud } from '../src/services/supabaseService';
import fs from 'fs';
import path from 'path';

describe('Task 4: Local-First Storage Transparency', () => {
  it('returns success: false when Supabase network fails while configured', async () => {
    // Mock environment variables to make isConfigured true
    vi.stubEnv('VITE_SUPABASE_URL', 'https://mock.supabase.co');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'mock-key');

    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network connection failed'));

    const result = await syncProjectsToCloud('test_user', [
      {
        id: '1',
        slug: 'test',
        name: 'Test Event',
        category: 'ai-tech',
        updatedAt: '2026-11-06T00:00:00.000Z',
        input: {} as any,
        content: {} as any,
        cro: {} as any,
      },
    ]);

    expect(result.success).toBe(false);
    expect(result.message).toContain('Local Storage');

    global.fetch = originalFetch;
    vi.unstubAllEnvs();
  });

  it('PublishModal informs user that page is saved in local browser storage', () => {
    const modalContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/PublishModal.tsx'),
      'utf-8'
    );
    expect(modalContent).toContain('Local');
  });

  it('AuthModal clearly labels local demo mode', () => {
    const authContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/AuthModal.tsx'),
      'utf-8'
    );
    expect(authContent).toContain('Local Demo');
  });
});
