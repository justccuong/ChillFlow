import { describe, it, expect } from 'vitest';
import { syncProjectsToCloud, getCloudSyncStatus } from '../src/services/supabaseService';
import type { SavedProject } from '../src/services/projectStorageService';

describe('Cloud Sync BaaS (Supabase / Local-First Graceful Fallback)', () => {
  it('returns informative fallback status when cloud keys are not configured', async () => {
    const status = getCloudSyncStatus();
    expect(status).toHaveProperty('isConfigured');
    expect(status).toHaveProperty('provider');
    expect(status.provider).toBe('supabase');

    const sampleProjects: SavedProject[] = [
      {
        id: 'proj_1',
        slug: 'demo-slug',
        name: 'Demo Project',
        category: 'ai-tech',
        updatedAt: new Date().toISOString(),
        input: { eventName: 'Demo Project' } as any,
        content: {} as any,
        cro: {} as any,
        syncStatus: 'local',
      },
    ];

    const result = await syncProjectsToCloud('test_user', sampleProjects);
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('message');
    expect(result.message.length).toBeGreaterThan(0);
  });
});
