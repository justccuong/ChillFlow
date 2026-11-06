import { describe, it, expect } from 'vitest';
import { exportStandaloneHtml } from '../src/utils/sourceExporter';
import { safeJsonLdStringify } from '../src/utils/seo';

describe('Task 1: HTML & JSON-LD Injection Prevention for Localhost Export', () => {
  it('escapes dangerous HTML characters in exported standalone file', () => {
    const maliciousInput: any = {
      eventName: 'CyberCon <script>alert("xss")</script>',
      category: 'ai-tech',
      location: '"><img src=x onerror=alert(1)>',
      eventDate: '2026-12-01',
      earlyBirdDiscount: '50%'
    };
    const content: any = {
      headline: 'Normal Headline <iframe src="evil.com"></iframe>',
      subHeadline: 'Test',
      benefits: [],
      agenda: [],
      faqs: [],
      earlyBirdBadge: 'Test'
    };
    const html = exportStandaloneHtml(maliciousInput, content, 'pro');
    expect(html).not.toContain('<script>alert("xss")</script>');
    expect(html).toContain('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    expect(html).not.toContain('<iframe src="evil.com"></iframe>');
  });

  it('safely serializes JSON-LD preventing </script> script tag termination', () => {
    const maliciousData = {
      title: '</script><script>window.pwned=1</script>'
    };
    const serialized = safeJsonLdStringify(maliciousData);
    expect(serialized).not.toContain('</script>');
    expect(serialized).toContain('\\u003c/script\\u003e');
  });
});
