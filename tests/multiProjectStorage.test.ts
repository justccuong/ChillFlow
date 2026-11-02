import { describe, it, expect, beforeEach } from 'vitest';
import {
  getAllSavedProjects,
  saveProject,
  cloneProject,
  deleteProject,
  getProjectById,
} from '../src/services/projectStorageService';

describe('Guest-First Multi-Project Storage', () => {
  beforeEach(() => {
    // Clear storage before each test
    const all = getAllSavedProjects();
    all.forEach((p) => deleteProject(p.id));
  });

  it('saves and retrieves multiple landing pages for guests without login', () => {
    saveProject({
      slug: 'ai-summit-2026',
      name: 'AI Summit 2026',
      category: 'ai-tech',
      input: { eventName: 'AI Summit 2026' } as any,
      content: { hero: { title: 'Tương lai AI' } } as any,
      cro: { totalScore: 92 } as any,
      syncStatus: 'local',
    });

    saveProject({
      slug: 'growth-masterclass',
      name: 'Growth Masterclass',
      category: 'marketing',
      input: { eventName: 'Growth Masterclass' } as any,
      content: { hero: { title: 'Bứt phá doanh số' } } as any,
      cro: { totalScore: 88 } as any,
      syncStatus: 'local',
    });

    const projects = getAllSavedProjects();
    expect(projects.length).toBe(2);
    expect(projects[0].name).toBe('Growth Masterclass'); // Latest first
  });

  it('updates an existing project when existingId is provided', () => {
    const original = saveProject({
      slug: 'original-event',
      name: 'Original Event',
      category: 'startup',
      input: { eventName: 'Original Event' } as any,
      content: {} as any,
      cro: { totalScore: 90 } as any,
      syncStatus: 'local',
    });

    const updated = saveProject(
      {
        slug: 'original-event',
        name: 'Updated Event Title',
        category: 'startup',
        input: { eventName: 'Updated Event Title' } as any,
        content: {} as any,
        cro: { totalScore: 95 } as any,
        syncStatus: 'local',
      },
      original.id
    );

    expect(updated.id).toBe(original.id);
    expect(updated.name).toBe('Updated Event Title');
    const all = getAllSavedProjects();
    expect(all.length).toBe(1);
  });

  it('clones an existing project with a unique ID and cloned title', () => {
    const original = saveProject({
      slug: 'original-event',
      name: 'Original Event',
      category: 'startup',
      input: { eventName: 'Original Event' } as any,
      content: {} as any,
      cro: { totalScore: 90 } as any,
      syncStatus: 'local',
    });

    const cloned = cloneProject(original.id);
    expect(cloned).not.toBeNull();
    expect(cloned?.id).not.toBe(original.id);
    expect(cloned?.name).toContain('Bản sao');
    expect(getAllSavedProjects().length).toBe(2);
  });

  it('deletes a project by id correctly', () => {
    const p1 = saveProject({
      slug: 'p1',
      name: 'P1',
      category: 'ai-tech',
      input: {} as any,
      content: {} as any,
      cro: {} as any,
      syncStatus: 'local',
    });

    const success = deleteProject(p1.id);
    expect(success).toBe(true);
    expect(getProjectById(p1.id)).toBeUndefined();
    expect(getAllSavedProjects().length).toBe(0);
  });
});
