import type { EventInput, GeneratedContent, CROEvaluation } from '../types';

export interface SavedProject {
  id: string;
  slug: string;
  name: string;
  category: string;
  updatedAt: string;
  input: EventInput;
  content: GeneratedContent;
  cro: CROEvaluation;
  syncStatus: 'local' | 'synced' | 'pending';
}

const PROJECTS_STORAGE_KEY = 'convertflow_saved_projects';
export const PROJECTS_CHANGE_EVENT = 'convertflow_projects_changed';

// In-memory fallback if localStorage is unavailable (e.g. Node test environment)
const memoryStore = new Map<string, string>();

function getStorage() {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  if (typeof globalThis !== 'undefined' && (globalThis as any).localStorage) {
    return (globalThis as any).localStorage;
  }
  return {
    getItem: (key: string) => memoryStore.get(key) ?? null,
    setItem: (key: string, val: string) => memoryStore.set(key, val),
    removeItem: (key: string) => memoryStore.delete(key),
    clear: () => memoryStore.clear(),
  };
}

export function getAllSavedProjects(): SavedProject[] {
  try {
    const storage = getStorage();
    const raw = storage.getItem(PROJECTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Return sorted newest first
    return parsed.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  } catch (err) {
    console.error('Failed to load saved projects:', err);
    return [];
  }
}

export function getProjectById(id: string): SavedProject | undefined {
  const projects = getAllSavedProjects();
  return projects.find((p) => p.id === id);
}

export function extractProjectIdFromLocation(): string | null {
  if (typeof window === 'undefined') return null;
  // 1. Hash route: #/project/:id
  const hash = window.location.hash;
  const hashMatch = hash.match(/#\/project\/([a-zA-Z0-9_-]+)/);
  if (hashMatch) return hashMatch[1];

  // 2. Query param: ?project=:id or ?id=:id
  const search = window.location.search;
  const queryMatch = search.match(/[?&](?:project|id)=([a-zA-Z0-9_-]+)/);
  if (queryMatch) return queryMatch[1];

  return null;
}

function notifyProjectsChanged(projects: SavedProject[]) {
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent(PROJECTS_CHANGE_EVENT, { detail: projects }));
  }
}

export function saveProject(
  data: Omit<SavedProject, 'id' | 'updatedAt'>,
  existingId?: string
): SavedProject {
  const projects = getAllSavedProjects();
  const now = new Date().toISOString();
  const storage = getStorage();

  if (existingId) {
    const index = projects.findIndex((p) => p.id === existingId);
    if (index !== -1) {
      const updated: SavedProject = {
        ...projects[index],
        ...data,
        id: existingId,
        updatedAt: now,
      };
      projects[index] = updated;
      storage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
      notifyProjectsChanged(projects);
      return updated;
    }
  }

  // Create new project
  const newProject: SavedProject = {
    ...data,
    id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    updatedAt: now,
  };

  const updatedProjects = [newProject, ...projects];
  storage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));
  notifyProjectsChanged(updatedProjects);
  return newProject;
}

export function cloneProject(id: string): SavedProject | null {
  const project = getProjectById(id);
  if (!project) return null;

  const clonedName = `[Bản sao] ${project.name}`;
  const clonedSlug = `${project.slug}-copy-${Date.now().toString().slice(-4)}`;

  return saveProject({
    slug: clonedSlug,
    name: clonedName,
    category: project.category,
    input: {
      ...project.input,
      eventName: clonedName,
    },
    content: JSON.parse(JSON.stringify(project.content)),
    cro: JSON.parse(JSON.stringify(project.cro)),
    syncStatus: 'local',
  });
}

export function deleteProject(id: string): boolean {
  const projects = getAllSavedProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;

  const storage = getStorage();
  storage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(filtered));
  notifyProjectsChanged(filtered);
  return true;
}
