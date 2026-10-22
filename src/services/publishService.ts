import { EventInput, GeneratedContent, ThemeConfig, UserTier, PublishedPageRecord } from '../types';
import { canPublishOrSavePage, recordPublishedPage } from './authService';

const PUBLISHED_PAGES_KEY = 'eventflow_published_pages';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'event';
}

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

export function getPublishedEvent(slug: string): PublishedPageRecord | null {
  const reg = getRegistry();
  return reg[slug] || null;
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
  userTier: UserTier
): { success: boolean; record?: PublishedPageRecord; error?: string } {
  const slug = slugify(input.eventName);

  const registry = getRegistry();
  const existing = registry[slug];

  const record: PublishedPageRecord = {
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
