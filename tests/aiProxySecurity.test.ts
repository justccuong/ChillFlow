import { describe, it, expect } from 'vitest';
import handler from '../api/ai-proxy';

describe('Task 2: AI Proxy Security Hardening', () => {
  it('does not send Access-Control-Allow-Credentials with wildcard origin', async () => {
    const headers: Record<string, string> = {};
    const req = {
      method: 'OPTIONS',
      headers: {},
    };
    const res = {
      setHeader: (k: string, v: string) => { headers[k] = v; },
      status: () => ({ end: () => {} }),
    };
    await handler(req, res);
    expect(headers['Access-Control-Allow-Credentials']).toBeUndefined();
    expect(headers['Access-Control-Allow-Origin']).toBe('*');
  });

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
