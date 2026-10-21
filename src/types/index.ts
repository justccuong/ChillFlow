export type EventCategory =
  | 'ai-tech'
  | 'marketing'
  | 'startup'
  | 'developer'
  | 'design'
  | 'education';

export type TemplateLayout =
  | 'conference'
  | 'masterclass'
  | 'terminal'
  | 'executive'
  | 'creative'
  | 'academy';

export interface GalleryPhoto {
  title: string;
  tag: string;
  url: string;
}

export interface SponsorItem {
  id: string;
  name: string;
  role: string;
  logoUrl: string;
}

export interface EventInput {
  eventName: string;
  category: EventCategory;
  eventDate: string;
  location: string;
  speakerName: string;
  speakerRole: string;
  speakerBio?: string;
  speakerAvatarUrl?: string; // Custom or chosen speaker photo
  heroImageUrl?: string; // Custom or chosen hero backdrop photo
  sponsors?: SponsorItem[]; // Customizable event sponsors
  earlyBirdDiscount: string;
  targetAudience?: string;
  maxCapacity?: number;
}

export interface BenefitItem {
  title: string;
  description: string;
  iconName: 'zap' | 'target' | 'award' | 'book' | 'users' | 'trending-up';
  imageUrl?: string; // Accompanying photo/illustration for visual richness
}

export interface AgendaItem {
  time: string;
  title: string;
  description: string;
  speaker?: string;
  tag?: string; // e.g. "Keynote", "Workshop", "Networking"
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GeneratedContent {
  headline: string;
  alternativeHeadline: string;
  subHeadline: string;
  description: string;
  benefits: BenefitItem[];
  agenda: AgendaItem[];
  faqs: FaqItem[];
  earlyBirdBadge: string;
  ctaButtonText: string;
  tagline: string;
}

export interface CROEvaluation {
  totalScore: number;
  headlineScore: number;
  urgencyScore: number;
  clarityScore: number;
  authorityScore: number;
  verdict: string;
  aiSuggestions: string[];
}

export interface Attendee {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  registeredAt: string;
  ticketType: 'early-bird' | 'standard';
  notes?: string;
}

export interface ThemeConfig {
  id: EventCategory;
  name: string;
  layout: TemplateLayout;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  btnPrimary: string;
  badgeBg: string;
  badgeText: string;
  glowGradient: string;
  heroImage: string;
  speakerImage: string;
  galleryPhotos: GalleryPhoto[]; // Rich real-life event photos
  trustLogos: string[];
  // Archetype-specific features
  terminalSnippet?: {
    filename: string;
    language: string;
    code: string;
    runCommand: string;
  };
  statsHighlight?: {
    value: string;
    label: string;
    subtext: string;
  }[];
  certificateInfo?: {
    certTitle: string;
    issuer: string;
    hours: number;
    accreditation: string;
  };
  dealMetrics?: {
    capitalPool: string;
    startupsCount: number;
    investorCount: number;
  };
  creativeTags?: string[];
  curriculumModules?: {
    moduleNum: string;
    title: string;
    duration: string;
    topics: string[];
  }[];
}

export type UserTier = 'free' | 'pro' | 'vip';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  tier: UserTier;
  freePagesLimit: number;
  extraCredits: number; // e.g. from watching rewarded ads
  publishedPageSlugs: string[];
  createdAt: string;
}

export interface PublishedPageRecord {
  slug: string;
  eventName: string;
  input: EventInput;
  content: GeneratedContent;
  theme: ThemeConfig;
  userTier: UserTier;
  publishedAt: string;
  customDomain?: string;
  viewsCount: number;
  conversionsCount: number;
}

