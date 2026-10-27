/**
 * ChillFlow (ConvertFlow AI) - Hybrid AI Proxy Serverless Function
 * Deployed on Vercel to protect system Gemini API Key.
 *
 * Supports:
 * - Server-side GEMINI_API_KEY environment variable (Default Zero-Config)
 * - BYOK (Bring Your Own Key) via 'x-api-key' header or request body
 * - Cascading model selection
 */

export default async function handler(req: any, res: any) {
  // CORS Headers for API calls
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-api-key'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const serverApiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  const clientKey = req.headers?.['x-api-key'] || req.body?.apiKey;
  const keyToUse = clientKey || serverApiKey;

  if (!keyToUse) {
    return res.status(400).json({
      error: 'NO_API_KEY',
      message: 'Hệ thống chưa được cấu hình GEMINI_API_KEY trên server và chưa có BYOK từ người dùng.',
    });
  }

  const { body, model = 'gemini-3.5-flash-lite' } = req.body || {};
  const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${keyToUse}`;

  try {
    const upstreamRes = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body || {}),
    });

    const data = await upstreamRes.json();
    return res.status(upstreamRes.status).json(data);
  } catch (err: any) {
    return res.status(500).json({
      error: 'UPSTREAM_PROXY_ERROR',
      message: err.message || 'Lỗi kết nối tới máy chủ Google Gemini',
    });
  }
}
