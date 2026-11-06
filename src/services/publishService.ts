import { getProjectById } from './projectStorageService';
import { getThemeForCategory } from './themeEngine';
import { EventInput, GeneratedContent, ThemeConfig, UserTier, PublishedPageRecord } from '../types';
import { recordPublishedPage } from './authService';
import { slugify } from '../utils/slug';

export { slugify };

const PUBLISHED_PAGES_KEY = 'eventflow_published_pages';

function getRegistry(): Record<string, PublishedPageRecord> {
  try {
    const raw = localStorage.getItem(PUBLISHED_PAGES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveRegistry(registry: Record<string, PublishedPageRecord>): void {
  localStorage.setItem(PUBLISHED_PAGES_KEY, JSON.stringify(registry));
}

export function getPublishedEvent(slugOrId: string): PublishedPageRecord | null {
  const reg = getRegistry();
  if (reg[slugOrId]) return reg[slugOrId];
  const byId = Object.values(reg).find((r) => r.id === slugOrId || r.slug === slugOrId);
  if (byId) return byId;

  const project = getProjectById(slugOrId);
  if (project) {
    const theme = getThemeForCategory(project.input.category || 'ai-tech');
    return {
      id: project.id,
      slug: project.slug,
      eventName: project.name,
      input: project.input,
      content: project.content,
      theme,
      userTier: 'free',
      publishedAt: project.updatedAt,
      viewsCount: 1,
      conversionsCount: 0,
    };
  }
  return null;
}

export function getAllPublishedEvents(): PublishedPageRecord[] {
  const reg = getRegistry();
  return Object.values(reg);
}

export function getPublicShareUrl(slug: string): string {
  const origin = window.location.origin;
  // Use hash routing by default for universal compatibility across local dev & static hosts
  return `${origin}/#/p/${slug}`;
}

export function publishEvent(
  input: EventInput,
  content: GeneratedContent,
  theme: ThemeConfig,
  userTier: UserTier,
  projectId?: string
): { success: boolean; record?: PublishedPageRecord; error?: string } {
  const slug = slugify(input.eventName);

  const registry = getRegistry();
  const existing = registry[slug] || (projectId ? registry[projectId] : undefined);

  const generatedId = projectId || existing?.id || 'ev-' + Math.random().toString(36).substring(2, 9);
  const record: PublishedPageRecord = {
    id: generatedId,
    slug,
    eventName: input.eventName,
    input,
    content,
    theme,
    userTier,
    publishedAt: existing?.publishedAt || new Date().toISOString(),
    customDomain: existing?.customDomain,
    viewsCount: existing?.viewsCount || 1,
    conversionsCount: existing?.conversionsCount || 0,
  };

  if (record.id) {
    registry[record.id] = record;
  }
  registry[slug] = record;
  saveRegistry(registry);
  recordPublishedPage(slug);

  return {
    success: true,
    record
  };
}

export function recordView(slug: string): void {
  const registry = getRegistry();
  if (registry[slug]) {
    registry[slug].viewsCount = (registry[slug].viewsCount || 0) + 1;
    saveRegistry(registry);
  }
}

export function recordConversion(slug: string): void {
  const registry = getRegistry();
  if (registry[slug]) {
    registry[slug].conversionsCount = (registry[slug].conversionsCount || 0) + 1;
    saveRegistry(registry);
  }
}

export function extractSlugFromLocation(): string | null {
  // 1. Hash route: #/p/:slug
  const hash = window.location.hash;
  const hashMatch = hash.match(/#\/p\/([a-zA-Z0-9_-]+)/);
  if (hashMatch) return hashMatch[1];

  // 2. Query param: ?p=:slug
  const search = window.location.search;
  const queryMatch = search.match(/[?&]p=([a-zA-Z0-9_-]+)/);
  if (queryMatch) return queryMatch[1];

  // 3. Path route: /p/:slug
  const path = window.location.pathname;
  const pathMatch = path.match(/\/p\/([a-zA-Z0-9_-]+)/);
  if (pathMatch) return pathMatch[1];

  return null;
}
