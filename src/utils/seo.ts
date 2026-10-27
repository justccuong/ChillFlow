import { EventInput, GeneratedContent, ThemeConfig } from '../types';

export interface EventSchemaJsonLd {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  startDate: string;
  eventStatus: string;
  eventAttendanceMode: string;
  location: {
    '@type': string;
    name: string;
    address?: {
      '@type': string;
      addressLocality: string;
      addressCountry: string;
    };
  };
  image: string[];
  performer?: {
    '@type': string;
    name: string;
    jobTitle?: string;
    image?: string;
  };
  organizer: {
    '@type': string;
    name: string;
    url?: string;
  };
  offers: {
    '@type': string;
    url: string;
    price: string;
    priceCurrency: string;
    availability: string;
    validFrom: string;
  };
}

export function buildEventSchemaJsonLd(
  input: EventInput,
  content: GeneratedContent,
  theme: ThemeConfig
): EventSchemaJsonLd {
  const isOnline =
    input.location?.toLowerCase().includes('online') ||
    input.location?.toLowerCase().includes('zoom') ||
    input.location?.toLowerCase().includes('meet') ||
    input.location?.toLowerCase().includes('livestream');

  const heroImage = input.heroImageUrl || theme.heroImage;
  const speakerImage = input.speakerAvatarUrl || theme.speakerImage;

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: input.eventName || 'Sự kiện ConvertFlow',
    description: content.subHeadline || content.headline || 'Sự kiện đặc biệt',
    startDate: input.eventDate || new Date().toISOString(),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: isOnline
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: input.location || (isOnline ? 'Online qua Zoom / Livestream' : 'Trung tâm Hội nghị'),
      address: {
        '@type': 'PostalAddress',
        addressLocality: input.location || 'Việt Nam',
        addressCountry: 'VN',
      },
    },
    image: [heroImage],
    ...(input.speakerName
      ? {
          performer: {
            '@type': 'Person',
            name: input.speakerName,
            jobTitle: input.speakerRole || 'Keynote Speaker',
            image: speakerImage,
          },
        }
      : {}),
    organizer: {
      '@type': 'Organization',
      name: 'ConvertFlow AI Event Engine',
      url: typeof window !== 'undefined' ? window.location.origin : 'https://convertflow.ai',
    },
    offers: {
      '@type': 'Offer',
      url: typeof window !== 'undefined' ? window.location.href : 'https://convertflow.ai',
      price: input.earlyBirdDiscount ? '0' : '0',
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
  };
}

export function generateOpenGraphMetaHtml(
  input: EventInput,
  content: GeneratedContent,
  theme: ThemeConfig
): string {
  const title = `${input.eventName} | ConvertFlow AI`;
  const description = content.subHeadline || content.headline;
  const image = input.heroImageUrl || theme.heroImage;
  const schema = JSON.stringify(buildEventSchemaJsonLd(input, content, theme), null, 2);

  return `
    <!-- Primary Meta Tags -->
    <title>${escapeHtml(title)}</title>
    <meta name="title" content="${escapeHtml(title)}">
    <meta name="description" content="${escapeHtml(description)}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="event">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:image" content="${escapeHtml(image)}">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${escapeHtml(image)}">

    <!-- JSON-LD Structured Data Schema (@type: "Event") -->
    <script type="application/ld+json">
${schema}
    </script>
  `.trim();
}

export function injectEventJsonLdAndMeta(
  input: EventInput,
  content: GeneratedContent,
  theme: ThemeConfig
): () => void {
  if (typeof document === 'undefined') return () => {};

  const title = `${input.eventName} | ConvertFlow AI`;
  const description = content.subHeadline || content.headline;
  const image = input.heroImageUrl || theme.heroImage;
  const url = window.location.href;

  const setMetaTag = (attrName: string, attrVal: string, contentVal: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', contentVal);
    return el;
  };

  const createdElements: Element[] = [];

  createdElements.push(setMetaTag('property', 'og:title', title));
  createdElements.push(setMetaTag('property', 'og:description', description));
  createdElements.push(setMetaTag('property', 'og:image', image));
  createdElements.push(setMetaTag('property', 'og:url', url));
  createdElements.push(setMetaTag('name', 'twitter:card', 'summary_large_image'));
  createdElements.push(setMetaTag('name', 'twitter:title', title));
  createdElements.push(setMetaTag('name', 'twitter:description', description));
  createdElements.push(setMetaTag('name', 'twitter:image', image));

  // JSON-LD Script tag
  const scriptId = 'convertflow-event-jsonld';
  let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = scriptId;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = JSON.stringify(buildEventSchemaJsonLd(input, content, theme), null, 2);
  createdElements.push(scriptEl);

  return () => {
    createdElements.forEach((el) => {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
