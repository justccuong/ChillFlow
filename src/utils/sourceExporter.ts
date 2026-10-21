import { EventInput, GeneratedContent, ThemeConfig, UserTier } from '../types';
import { slugify } from '../services/publishService';

export function generateStandaloneHtml(
  input: EventInput,
  content: GeneratedContent,
  theme: ThemeConfig,
  userTier: UserTier
): string {
  const isFree = userTier === 'free';
  const speakerPhoto = input.speakerAvatarUrl || theme.speakerImage;
  const heroPhoto = input.heroImageUrl || theme.heroImage;

  return `<!DOCTYPE html>
<html lang="vi" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${input.eventName} | ConvertFlow Event</title>
  <meta name="description" content="${content.subHeadline}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    h1, h2, h3, .font-heading { font-family: 'Space Grotesk', sans-serif; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col">

  <!-- Top Sticky Urgent FOMO Bar -->
  <div class="sticky top-0 z-40 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white border-b border-indigo-500/30 px-3 py-2 shadow-lg backdrop-blur-md">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
      <div class="flex items-center gap-2">
        <span class="font-bold text-amber-300">🔥 ${content.earlyBirdBadge || 'Ưu đãi đăng ký sớm'}:</span>
        <span class="text-slate-200">Chỉ còn <strong class="text-white underline decoration-amber-400">14 vé</strong> giá ưu đãi!</span>
      </div>
      <a href="#registration" class="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow">
        Giữ chỗ ngay →
      </a>
    </div>
  </div>

  <!-- Hero Section -->
  <header class="relative overflow-hidden pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
    <div class="absolute inset-0 z-0 pointer-events-none opacity-20">
      <img src="${heroPhoto}" alt="${input.eventName}" class="w-full h-full object-cover filter brightness-75 scale-105">
    </div>
    <div class="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      <div class="lg:col-span-8 space-y-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold">
          ⚡ ${content.earlyBirdBadge || 'Ưu đãi có hạn'}
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          ${content.headline}
        </h1>
        <p class="text-lg text-slate-300 max-w-3xl leading-relaxed">
          ${content.subHeadline}
        </p>
        <div class="flex flex-wrap items-center gap-4 text-sm text-slate-300">
          <div class="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800">
            📅 ${input.eventDate}
          </div>
          <div class="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800">
            📍 ${input.location}
          </div>
        </div>
        <div class="pt-2">
          <a href="#registration" class="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-105">
            ${content.ctaButtonText || 'Đăng Ký Tham Gia Ngay'} →
          </a>
        </div>
      </div>
      <div class="lg:col-span-4 flex justify-center">
        <div class="relative max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
          <img src="${speakerPhoto}" alt="${input.speakerName}" class="w-full aspect-[4/5] object-cover object-top">
          <div class="p-4 bg-slate-900/90 text-white">
            <h3 class="text-lg font-bold">${input.speakerName}</h3>
            <p class="text-xs text-slate-400">${input.speakerRole}</p>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Benefits Bento Grid -->
  <section class="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-extrabold text-white">Lợi Ích Dành Cho Bạn</h2>
      <p class="text-slate-400 text-sm mt-2">Những giá trị thực chiến và đột phá nhận được tại sự kiện</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${(content.benefits || []).map(b => `
        <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/50 transition-all">
          <h3 class="text-lg font-bold text-white mb-2">${b.title}</h3>
          <p class="text-sm text-slate-400 leading-relaxed">${b.description}</p>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Agenda Section -->
  <section class="max-w-5xl mx-auto py-16 px-4 sm:px-6 border-t border-slate-900">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-extrabold text-white">Lịch Trình Chi Tiết</h2>
    </div>
    <div class="space-y-4">
      ${(content.agenda || []).map(a => `
        <div class="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <span class="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider block">${a.time}</span>
            <h4 class="text-base font-bold text-white mt-1">${a.title}</h4>
            <p class="text-xs text-slate-400 mt-0.5">${a.description}</p>
          </div>
          <span class="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-medium shrink-0">
            ${a.tag || 'Phiên chính'}
          </span>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Registration Ticket Section -->
  <section id="registration" class="max-w-4xl mx-auto py-20 px-4">
    <div class="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-indigo-950/60 border border-indigo-500/30 shadow-2xl text-center">
      <h2 class="text-3xl font-extrabold text-white mb-3">Đăng Ký Giữ Chỗ Ngay Hôm Nay</h2>
      <p class="text-slate-300 text-sm max-w-lg mx-auto mb-8">
        Số lượng vé Early Bird ưu đãi có giới hạn. Vui lòng hoàn tất thông tin bên dưới để nhận vé qua email.
      </p>
      <form onsubmit="event.preventDefault(); alert('Đăng ký thành công! Ban tổ chức sẽ liên hệ qua email.');" class="max-w-md mx-auto space-y-4 text-left">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Họ và tên</label>
          <input type="text" required placeholder="Nguyễn Văn An" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Email nhận vé</label>
          <input type="email" required placeholder="name@company.com" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Số điện thoại</label>
          <input type="tel" required placeholder="0901234567" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
        </div>
        <button type="submit" class="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-white shadow-xl shadow-indigo-600/30 transition-all text-sm mt-2">
          Xác Nhận Giữ Chỗ Ngay
        </button>
      </form>
    </div>
  </section>

  <!-- Clean Footer -->
  <footer class="mt-auto bg-slate-950 border-t border-slate-900 py-10 px-4 text-center text-xs text-slate-500">
    <p class="font-bold text-slate-300">${input.eventName}</p>
    <p class="mt-1">© 2026. Mọi quyền được bảo lưu.</p>
  </footer>

  ${isFree ? `
  <!-- ConvertFlow Viral Watermark -->
  <div style="position: fixed; bottom: 16px; left: 16px; z-index: 50;">
    <a href="https://convertflow.site" target="_blank" style="display: flex; align-items: center; gap: 8px; background: rgba(15,23,42,0.95); color: #fff; padding: 8px 14px; border-radius: 9999px; border: 1px solid rgba(99,102,241,0.5); text-decoration: none; font-size: 11px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
      <span>⚡ Tạo bởi <strong>ConvertFlow AI</strong></span>
    </a>
  </div>
  ` : ''}

</body>
</html>`;
}

export function exportStandaloneHtml(
  input: EventInput,
  content: GeneratedContent,
  theme: ThemeConfig,
  userTier: UserTier
): void {
  const html = generateStandaloneHtml(input, content, theme, userTier);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const filename = `${slugify(input.eventName)}-landing-page.html`;
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
