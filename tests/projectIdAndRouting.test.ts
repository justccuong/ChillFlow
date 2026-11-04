import { describe, it, expect, beforeEach } from 'vitest';
import {
  generate12CharId,
  saveProject,
  getProjectById,
  getAllSavedProjects,
  extractProjectIdFromLocation,
} from '../src/services/projectStorageService';
import { extractSlugFromLocation, getPublicShareUrl, getPublishedEvent } from '../src/services/publishService';

// Mock localStorage for test environment
const storageMap = new Map<string, string>();
const mockLocalStorage = {
  getItem: (key: string) => storageMap.get(key) ?? null,
  setItem: (key: string, val: string) => storageMap.set(key, val),
  removeItem: (key: string) => storageMap.delete(key),
  clear: () => storageMap.clear(),
};
(globalThis as any).localStorage = mockLocalStorage;

describe('12-Character Project IDs & Public Routing', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  it('generates a 12-character alphanumeric ID with hyphen format xxxx-xxxx-xxxx', () => {
    const id = generate12CharId();
    expect(id).toMatch(/^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$/);
    expect(id.replace(/-/g, '').length).toBe(12);
  });

  it('generates unique random IDs across multiple calls', () => {
    const ids = new Set<string>();
    for (let i = 0; i < 50; i++) {
      ids.add(generate12CharId());
    }
    expect(ids.size).toBe(50);
  });

  it('saves project with 12-char ID and retrieves it accurately', () => {
    const newProj = saveProject({
      slug: 'test-event',
      name: 'Test Event',
      category: 'ai-tech',
      input: { eventName: 'Test Event', category: 'ai-tech' } as any,
      content: { headline: 'Hello' } as any,
      cro: { totalScore: 90 } as any,
      syncStatus: 'local',
    });
    expect(newProj.id).toMatch(/^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$/);
    const found = getProjectById(newProj.id);
    expect(found?.name).toBe('Test Event');
  });

  it('extractSlugFromLocation correctly parses /p/:id and #/p/:id', () => {
    // 1. Hash route
    (globalThis as any).window = {
      location: {
        hash: '#/p/abc1-def2-123c',
        search: '',
        pathname: '/',
        origin: 'https://chillflow.app',
      },
    };
    expect(extractSlugFromLocation()).toBe('abc1-def2-123c');

    // 2. Path route
    (globalThis as any).window.location = {
      hash: '',
      search: '',
      pathname: '/p/abc1-def2-123c',
      origin: 'https://chillflow.app',
    };
    expect(extractSlugFromLocation()).toBe('abc1-def2-123c');

    // 3. Query param
    (globalThis as any).window.location = {
      hash: '',
      search: '?p=abc1-def2-123c',
      pathname: '/',
      origin: 'https://chillflow.app',
    };
    expect(extractSlugFromLocation()).toBe('abc1-def2-123c');
  });

  it('extractProjectIdFromLocation correctly parses #/p/:id, #/project/:id and /p/:id', () => {
    (globalThis as any).window = {
      location: {
        hash: '#/p/abc1-def2-123c',
        search: '',
        pathname: '/',
      },
    };
    expect(extractProjectIdFromLocation()).toBe('abc1-def2-123c');

    (globalThis as any).window.location = {
      hash: '#/project/abc1-def2-123c',
      search: '',
      pathname: '/',
    };
    expect(extractProjectIdFromLocation()).toBe('abc1-def2-123c');
  });

  it('resolves published event directly by 12-char project id from saved projects', () => {
    const saved = saveProject({
      slug: 'event-demo',
      name: 'Event Demo',
      category: 'ai-tech',
      input: { eventName: 'Event Demo', category: 'ai-tech' } as any,
      content: { headline: 'Demo Headline' } as any,
      cro: { totalScore: 95 } as any,
      syncStatus: 'local',
    });

    const event = getPublishedEvent(saved.id);
    expect(event).not.toBeNull();
    expect(event?.eventName).toBe('Event Demo');
  });
});
