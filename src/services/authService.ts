import { UserProfile, UserTier } from '../types';

const STORAGE_KEY = 'eventflow_user_profile';
const AUTH_EVENT = 'eventflow_auth_changed';

function getDefaultUser(): UserProfile {
  return {
    id: 'usr_guest_demo',
    email: 'organizer@vibe-event.vn',
    name: 'Nguyễn Văn Minh (Organizer)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    tier: 'free',
    freePagesLimit: 2,
    extraCredits: 0,
    publishedPageSlugs: [],
    createdAt: new Date().toISOString()
  };
}

export function getCurrentUser(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const def = getDefaultUser();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(def));
      return def;
    }
    return JSON.parse(raw);
  } catch {
    return getDefaultUser();
  }
}

function saveAndNotify(user: UserProfile): UserProfile {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: user }));
  return user;
}

export function login(email: string, name?: string): UserProfile {
  const current = getCurrentUser();
  const updated: UserProfile = {
    ...current,
    id: `usr_${Date.now()}`,
    email,
    name: name || email.split('@')[0],
  };
  return saveAndNotify(updated);
}

export function loginWithGoogle(): UserProfile {
  const current = getCurrentUser();
  const updated: UserProfile = {
    ...current,
    id: `usr_google_${Date.now()}`,
    email: 'minh.eventpro@gmail.com',
    name: 'Trần Minh (Google Pro)',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  };
  return saveAndNotify(updated);
}

export function logout(): UserProfile {
  const def = getDefaultUser();
  return saveAndNotify(def);
}

export function upgradeTier(tier: UserTier): UserProfile {
  const current = getCurrentUser();
  const updated: UserProfile = {
    ...current,
    tier
  };
  return saveAndNotify(updated);
}

export function addAdCredit(): UserProfile {
  const current = getCurrentUser();
  const updated: UserProfile = {
    ...current,
    extraCredits: (current.extraCredits || 0) + 1
  };
  return saveAndNotify(updated);
}

export function canPublishOrSavePage(slug?: string): { allowed: boolean; reason?: string; currentCount: number; maxAllowed: number } {
  const user = getCurrentUser();
  const currentCount = user.publishedPageSlugs?.length || 0;
  const maxAllowed = (user.freePagesLimit || 2) + (user.extraCredits || 0);

  if (user.tier === 'pro' || user.tier === 'vip') {
    return { allowed: true, currentCount, maxAllowed: 9999 };
  }

  // If this slug was already published by user, editing it doesn't consume new quota
  if (slug && user.publishedPageSlugs?.includes(slug)) {
    return { allowed: true, currentCount, maxAllowed };
  }

  if (currentCount >= maxAllowed) {
    return {
      allowed: false,
      reason: `Bạn đã sử dụng hết hạn mức miễn phí (${currentCount}/${maxAllowed} trang). Hãy nâng cấp Pro hoặc xem 1 video tài trợ để mở khóa thêm!`,
      currentCount,
      maxAllowed
    };
  }

  return { allowed: true, currentCount, maxAllowed };
}

export function recordPublishedPage(slug: string): UserProfile {
  const current = getCurrentUser();
  const list = current.publishedPageSlugs || [];
  if (!list.includes(slug)) {
    list.push(slug);
  }
  const updated: UserProfile = {
    ...current,
    publishedPageSlugs: list
  };
  return saveAndNotify(updated);
}

export function subscribeAuthChange(callback: (user: UserProfile) => void): () => void {
  const handler = (e: Event) => {
    const custom = e as CustomEvent<UserProfile>;
    callback(custom.detail || getCurrentUser());
  };
  window.addEventListener(AUTH_EVENT, handler);
  return () => window.removeEventListener(AUTH_EVENT, handler);
}
