# Local-First Hardening & Codebase Hygiene Implementation Plan (Localhost Focus)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Optimize ChillFlow for a rock-solid, zero-backend "Local-First / Localhost Demo" experience by eliminating XSS in single-file export, hardening the local/serverless AI proxy, unifying Vietnamese diacritic URL slugs, clarifying Local-First storage in the UI, and clearing lint warnings.

**Architecture:** Embrace Local-First as an intentional design strength rather than a mock cloud deficiency. Sanitize exported standalone HTML against XSS/script injection, unify slugification across localhost hash routing, make cloud sync gracefully announce local offline storage, and update documentation to showcase 187+ unit tests.

**Tech Stack:** TypeScript 5.8+, Vite, React 19, Vitest 5.0.5, Tailwind CSS, Vercel Serverless Function (optional local/remote proxy).

**Spec:** User audit report refocusing implementation on localhost/local-first execution.

## Global Constraints

- Local-first architecture: zero mandatory external database or backend servers needed to run on localhost.
- Preserve all 187 existing Vitest tests; all new tests must pass.
- Single-file HTML export must remain 100% self-contained and safe from script injection.
- Zero breaking changes to Visual CMS in-place editing or template styles.

## Review Focus

1. **Standalone HTML Export Script Injection**: Unescaped user/AI strings breaking exported portable HTML files.
2. **Vietnamese URL Routing on Localhost**: Discrepancy between `slugify()` and `App.tsx` regex breaking `/#/p/:slug` on localhost.
3. **AI Proxy Insecure CORS Headers**: Invalid credentials + wildcard origin in `api/ai-proxy.ts`.
4. **Cloud Sync False Positives**: `supabaseService.ts` hiding network failures instead of transparently confirming local-first persistence.
5. **README Drift**: Outdated documentation claiming 146 tests instead of the real 187+ tests.

---

### Task 1: Security Hardening for Exporter & Safe JSON-LD (`sourceExporter.ts`, `seo.ts`)

**Files:**
- Modify: `src/utils/sourceExporter.ts`
- Modify: `src/utils/seo.ts`
- Test: `tests/xssAndSafeExport.test.ts`

**Interfaces:**
- Consumes: Raw event strings from user or AI generator.
- Produces: Sanitized HTML entity escaped strings for static export and `\u003c`/`\u003e` escaped JSON-LD scripts.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/xssAndSafeExport.test.ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run --prefix ChillFlow_Repo test tests/xssAndSafeExport.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement escaping in `sourceExporter.ts` and `seo.ts`**

- In `src/utils/seo.ts`: export `safeJsonLdStringify(obj: any): string` replacing `<` with `\u003c` and `>` with `\u003e`.
- In `src/utils/sourceExporter.ts`: wrap interpolated fields in `escapeHtml()`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run --prefix ChillFlow_Repo test tests/xssAndSafeExport.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/utils/sourceExporter.ts src/utils/seo.ts tests/xssAndSafeExport.test.ts
git commit -m "fix(security): prevent XSS injection in standalone HTML export and safely escape JSON-LD scripts"
```

---

### Task 2: AI Proxy Cleanup & Header Fix (`api/ai-proxy.ts`)

**Files:**
- Modify: `api/ai-proxy.ts`
- Test: `tests/aiProxySecurity.test.ts`

**Interfaces:**
- Consumes: Request from client or local dev proxy.
- Produces: Standard CORS headers without invalid credentials wildcard, model allowlist, and header-based key transmission.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/aiProxySecurity.test.ts
import { describe, it, expect } from 'vitest';
import handler from '../api/ai-proxy';

describe('Task 2: AI Proxy Security Hardening', () => {
  it('rejects disallowed models not in the whitelist', async () => {
    let statusCode = 0;
    let jsonResult: any = null;
    const req = {
      method: 'POST',
      body: { model: 'malicious-or-arbitrary-model', body: { contents: [] } },
      headers: { 'x-api-key': 'test-key' }
    };
    const res = {
      setHeader: () => {},
      status: (code: number) => { statusCode = code; return { json: (data: any) => { jsonResult = data; } }; }
    };
    await handler(req, res);
    expect(statusCode).toBe(400);
    expect(jsonResult.error).toBe('INVALID_MODEL');
  });

  it('rejects oversized request payloads > 100KB', async () => {
    let statusCode = 0;
    let jsonResult: any = null;
    const largeString = 'a'.repeat(120 * 1024);
    const req = {
      method: 'POST',
      body: { model: 'gemini-2.5-flash', body: { contents: [{ parts: [{ text: largeString }] }] } },
      headers: { 'x-api-key': 'test-key' }
    };
    const res = {
      setHeader: () => {},
      status: (code: number) => { statusCode = code; return { json: (data: any) => { jsonResult = data; } }; }
    };
    await handler(req, res);
    expect(statusCode).toBe(413);
    expect(jsonResult.error).toBe('PAYLOAD_TOO_LARGE');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run --prefix ChillFlow_Repo test tests/aiProxySecurity.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement security controls in `api/ai-proxy.ts`**

- Remove invalid `Access-Control-Allow-Credentials: true` with wildcard `*`.
- Enforce model allowlist (`gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-1.5-flash`, `gemini-1.5-pro`, `gemini-3.5-flash`, `gemini-3.5-flash-lite`, `gemini-3.8-flash`).
- Enforce max payload 100KB.
- Forward key via `x-goog-api-key` header to Google.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run --prefix ChillFlow_Repo test tests/aiProxySecurity.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add api/ai-proxy.ts tests/aiProxySecurity.test.ts
git commit -m "fix(proxy): harden serverless proxy with model allowlist, payload limits, and correct CORS"
```

---

### Task 3: Unified Vietnamese Diacritic Slug Utility & README Alignment

**Files:**
- Create: `src/utils/slug.ts`
- Modify: `src/services/publishService.ts`
- Modify: `src/App.tsx:435-442`
- Modify: `README.md`
- Test: `tests/slugConsistency.test.ts`

**Interfaces:**
- Consumes: Any event name with Vietnamese accents.
- Produces: Consistent clean ASCII URL slug for localhost hash routing `/#/p/:slug`.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/slugConsistency.test.ts
import { describe, it, expect } from 'vitest';
import { slugify } from '../src/utils/slug';

describe('Task 3: Unified Vietnamese Diacritic Slug Generation', () => {
  it('correctly transliterates Vietnamese accents to ASCII slugs without data loss', () => {
    const eventName = 'Hội thảo Trí tuệ Nhân tạo & Vibe Coding 2026';
    const slug = slugify(eventName);
    expect(slug).toBe('hoi-thao-tri-tue-nhan-tao-vibe-coding-2026');
  });

  it('handles strings with numbers, symbols, and trims hyphens', () => {
    expect(slugify('  Đổi Mới Sáng Tạo (Workshop #1)  ')).toBe('doi-moi-sang-tao-workshop-1');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run --prefix ChillFlow_Repo test tests/slugConsistency.test.ts`
Expected: FAIL (`src/utils/slug.ts` not found).

- [ ] **Step 3: Implement `slugify` and use across `App.tsx` and `publishService.ts`**

- Create `src/utils/slug.ts`.
- In `src/App.tsx` line 435: replace inline regex with `slugify(eventInput?.eventName || '')`.
- Re-export `slugify` in `publishService.ts` from `src/utils/slug.ts`.
- In `README.md`: update test counts from 146 to 187+ unit tests, and frame ChillFlow as a Zero-Config Local-First Landing Page Generator.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run --prefix ChillFlow_Repo test tests/slugConsistency.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/utils/slug.ts src/services/publishService.ts src/App.tsx README.md tests/slugConsistency.test.ts
git commit -m "fix(routing): unify Vietnamese slug generation across app and update test stats in README"
```

---

### Task 4: Local-First Storage Transparency & Supabase Graceful Handling

**Files:**
- Modify: `src/services/supabaseService.ts`
- Modify: `src/components/LandingPage/PublishModal.tsx`
- Modify: `src/components/LandingPage/PublicStandalonePage.tsx`
- Modify: `src/components/AuthModal.tsx`
- Test: `tests/localFirstTransparency.test.ts`

**Interfaces:**
- Consumes: Browser local storage state.
- Produces: Transparent UI indicating local browser persistence ("Chế độ Local-First / Demo"), and graceful handling when remote sync is not configured.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/localFirstTransparency.test.ts
import { describe, it, expect, vi } from 'vitest';
import { syncProjectsToSupabase } from '../src/services/supabaseService';
import fs from 'fs';
import path from 'path';

describe('Task 4: Local-First Storage Transparency', () => {
  it('returns success: false when Supabase network fails', async () => {
    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network disconnected'));

    const result = await syncProjectsToSupabase([
      { id: '1', name: 'Test', updatedAt: 123, input: {} as any, content: {} as any, cro: {} as any }
    ]);

    expect(result.success).toBe(false);
    expect(result.message).toContain('Local Storage');

    global.fetch = originalFetch;
  });

  it('PublishModal informs user that page is saved in local browser storage', () => {
    const content = fs.readFileSync(
      path.resolve(__dirname, '../src/components/LandingPage/PublishModal.tsx'),
      'utf-8'
    );
    expect(content).toContain('Local');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run --prefix ChillFlow_Repo test tests/localFirstTransparency.test.ts`
Expected: FAIL.

- [ ] **Step 3: Update `supabaseService.ts`, `PublishModal.tsx`, `PublicStandalonePage.tsx`, `AuthModal.tsx`**

- In `src/services/supabaseService.ts`: in catch block, set `success: false` and message clarifying local-first safe storage.
- In `PublishModal.tsx`: add clean notice stating the link operates in Local-First browser storage on localhost. Mention export HTML for external sharing.
- In `AuthModal.tsx`: label as "Đăng nhập mô phỏng (Local Demo)".

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run --prefix ChillFlow_Repo test tests/localFirstTransparency.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/services/supabaseService.ts src/components/LandingPage/PublishModal.tsx src/components/LandingPage/PublicStandalonePage.tsx src/components/AuthModal.tsx tests/localFirstTransparency.test.ts
git commit -m "feat(ui): clarify local-first storage in modals and fix supabase sync error response"
```

---

### Task 5: Code Hygiene & Lint Warnings Cleanup

**Files:**
- Modify: `src/services/storageService.ts`
- Modify: `src/utils/antiSpam.ts`
- Modify: `src/components/LandingPage/BenefitsSection.tsx`
- Modify: `src/components/LandingPage/LandingPagePreview.tsx`
- Modify: `src/services/publishService.ts`

- [ ] **Step 1: Check lint warnings**

Run: `npm run --prefix ChillFlow_Repo lint`

- [ ] **Step 2: Fix unused imports and variables**

- `src/services/storageService.ts`: remove unused `DEFAULT_ATTENDEES`, rename unused `_e`.
- `src/utils/antiSpam.ts`: replace `[\s\-\.]` with `[\s\-.]`.
- `src/components/LandingPage/BenefitsSection.tsx`: remove unused `Award` and `Target` imports.
- `src/services/publishService.ts`: remove unused `canPublishOrSavePage`.
- `src/components/LandingPage/LandingPagePreview.tsx`: clean unused params/variables.

- [ ] **Step 3: Verify clean lint**

Run: `npm run --prefix ChillFlow_Repo lint`
Expected: Zero errors.

- [ ] **Step 4: Commit**

```bash
git add src/services/storageService.ts src/utils/antiSpam.ts src/components/LandingPage/BenefitsSection.tsx src/services/publishService.ts src/components/LandingPage/LandingPagePreview.tsx
git commit -m "chore(quality): eliminate unused variables, redundant regex escapes, and unused imports"
```

---

### Task 6: Full Regression Verification & Build Check

**Files:**
- Test: All unit test suites

- [ ] **Step 1: Run complete test suite**

Run: `npm run --prefix ChillFlow_Repo test`
Expected: 190+ tests pass across 40 test files.

- [ ] **Step 2: Run TypeScript build check**

Run: `npx --prefix ChillFlow_Repo tsc -b`
Expected: Zero errors.

- [ ] **Step 3: Run Vite build**

Run: `npm run --prefix ChillFlow_Repo build`
Expected: Clean build in `dist/`.
