import { EventInput, GeneratedContent, ThemeConfig, UserTier } from '../types';
import { slugify } from '../services/publishService';

export function generateStandaloneHtml(
  input: EventInput,
  content: GeneratedContent,
  theme: ThemeConfig,
  userTier: UserTier
): string {
  const speakerPhoto = input.speakerAvatarUrl || theme.speakerImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
  const category = input.category || 'ai-tech';

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
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@600;700;800&family=JetBrains+Mono:wght@500;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    h1, h2, h3, .font-heading { font-family: 'Space Grotesk', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans selection:bg-cyan-500 selection:text-black">

  <!-- Clean Top Nav -->
  <nav class="h-16 border-b border-slate-900 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <span class="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
      <span class="font-extrabold tracking-tight text-white font-heading">${input.eventName}</span>
    </div>
    <a href="#registration" class="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-md">
      Giữ chỗ ngay
    </a>
  </nav>

  <!-- Hero Section -->
  <header class="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      <div class="lg:col-span-8 space-y-6 text-left">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold">
          ⚡ ${content.earlyBirdBadge || 'Ưu đãi đăng ký sớm'}
        </div>
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          ${content.headline}
        </h1>
        <p class="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          ${content.subHeadline}
        </p>

        <div class="flex flex-wrap items-center gap-3 text-xs text-slate-300">
          <div class="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 font-semibold">
            📅 ${input.eventDate}
          </div>
          <div class="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 font-semibold">
            📍 ${input.location}
          </div>
        </div>

        <!-- Prominent Hero Countdown Timer -->
        <div class="pt-4">
          <div class="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-3 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            SỰ KIỆN SẼ BẮT ĐẦU TRONG
          </div>
          <div class="flex items-center gap-3 text-center">
            <div class="w-24 sm:w-28 py-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-xl">
              <span id="timer-days" class="text-4xl sm:text-5xl font-black font-mono text-white block">14</span>
              <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">NGÀY</span>
            </div>
            <span class="text-2xl font-mono text-slate-500 font-bold">:</span>
            <div class="w-24 sm:w-28 py-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-xl">
              <span id="timer-hours" class="text-4xl sm:text-5xl font-black font-mono text-white block">08</span>
              <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">GIỜ</span>
            </div>
            <span class="text-2xl font-mono text-slate-500 font-bold">:</span>
            <div class="w-24 sm:w-28 py-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-xl">
              <span id="timer-minutes" class="text-4xl sm:text-5xl font-black font-mono text-white block">45</span>
              <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">PHÚT</span>
            </div>
            <span class="text-2xl font-mono text-slate-500 font-bold">:</span>
            <div class="w-24 sm:w-28 py-4 rounded-2xl bg-slate-900/90 border border-cyan-400/40 shadow-[0_4px_25px_-5px_rgba(6,182,212,0.3)] backdrop-blur-xl">
              <span id="timer-seconds" class="text-4xl sm:text-5xl font-black font-mono text-cyan-400 block">30</span>
              <span class="text-[10px] font-bold tracking-widest text-cyan-300 uppercase">GIÂY</span>
            </div>
          </div>
        </div>

        <div class="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <a href="#registration" class="px-8 py-4 rounded-2xl text-base font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-xl shadow-cyan-500/20 transition-all hover:scale-105 text-center">
            ${content.ctaButtonText || 'Đăng ký tham gia ngay'} →
          </a>
          <span class="text-xs text-slate-400">🛡️ Vé chính hãng & Hỗ trợ xuất VAT</span>
        </div>
      </div>

      <div class="lg:col-span-4 flex justify-center">
        <div class="relative max-w-sm w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
          <img src="${speakerPhoto}" alt="${input.speakerName}" class="w-full aspect-[4/5] object-cover object-top">
          <div class="p-5 bg-slate-900/95 text-white space-y-1">
            <span class="text-[10px] font-bold uppercase tracking-wider text-cyan-300">Keynote Speaker</span>
            <h3 class="text-lg font-bold">${input.speakerName}</h3>
            <p class="text-xs text-slate-400">${input.speakerRole}</p>
          </div>
        </div>
      </div>
    </div>
  </header>

  ${category === 'marketing' ? `
  <!-- Marketing Before / After Breakdown -->
  <section class="max-w-6xl mx-auto py-16 px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-3">
        <h4 class="text-sm font-bold text-red-400 uppercase tracking-widest">❌ Cách làm truyền thống</h4>
        <p class="text-xs text-slate-300">Đốt ngân sách vào quảng cáo Facebook/Google nhưng tỉ lệ chuyển đổi dưới 1%, khách hàng rời đi nhanh chóng.</p>
      </div>
      <div class="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/40 space-y-3">
        <h4 class="text-sm font-bold text-amber-400 uppercase tracking-widest">✅ Framework tăng trưởng mới</h4>
        <p class="text-xs text-slate-300">Tối ưu từng điểm chạm trong phễu CRO, nâng ROI trung bình lên +340%, sở hữu 50+ Playbooks thực chiến.</p>
      </div>
    </div>
  </section>
  ` : ''}

  <!-- Benefits Section -->
  <section class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-extrabold text-white font-heading">Giá trị cốt lõi</h2>
      <p class="text-slate-400 text-sm mt-2">Những kiến thức và đặc quyền thực chiến nhận được</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${(content.benefits || []).map(b => `
        <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all">
          <h3 class="text-lg font-bold text-white mb-2">${b.title}</h3>
          <p class="text-sm text-slate-400 leading-relaxed">${b.description}</p>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Agenda Section -->
  <section class="max-w-5xl mx-auto py-16 px-4 sm:px-6 border-t border-slate-900">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-extrabold text-white font-heading">Lịch trình chi tiết</h2>
    </div>
    <div class="space-y-4">
      ${(content.agenda || []).map(a => `
        <div class="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <span class="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">${a.time}</span>
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
    <div class="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-indigo-950/60 border border-cyan-500/30 shadow-2xl text-center">
      <h2 class="text-3xl font-extrabold text-white mb-3 font-heading">Đăng ký giữ chỗ ngay hôm nay</h2>
      <p class="text-slate-300 text-sm max-w-lg mx-auto mb-8">
        Số lượng vé ưu đãi có giới hạn. Vui lòng hoàn tất thông tin bên dưới để nhận mã vé qua email.
      </p>
      <form onsubmit="event.preventDefault(); alert('Đăng ký thành công! Ban tổ chức sẽ liên hệ qua email.');" class="max-w-md mx-auto space-y-4 text-left">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Họ và tên</label>
          <input type="text" required placeholder="Nguyễn Văn An" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Email nhận vé</label>
          <input type="email" required placeholder="name@company.com" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Số điện thoại</label>
          <input type="tel" required placeholder="0901234567" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500">
        </div>
        <button type="submit" class="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 font-bold text-slate-950 shadow-xl shadow-cyan-500/20 transition-all text-sm mt-2">
          Xác nhận giữ chỗ ngay
        </button>
      </form>
    </div>
  </section>

  <!-- Clean Footer -->
  <footer class="mt-auto bg-slate-950 border-t border-slate-900 py-10 px-4 text-center text-xs text-slate-500">
    <p class="font-bold text-slate-300">${input.eventName}</p>
    <p class="mt-1">© 2026. Mọi quyền được bảo lưu.</p>
  </footer>

  <!-- Vanilla JS Countdown Script -->
  <script>
    (function() {
      let targetTime = new Date('${input.eventDate}').getTime();
      if (isNaN(targetTime) || targetTime <= Date.now()) {
        targetTime = Date.now() + 14 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000 + 45 * 60 * 1000;
      }
      function update() {
        const diff = Math.max(0, targetTime - Date.now());
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        document.getElementById('timer-days').innerText = String(d).padStart(2, '0');
        document.getElementById('timer-hours').innerText = String(h).padStart(2, '0');
        document.getElementById('timer-minutes').innerText = String(m).padStart(2, '0');
        document.getElementById('timer-seconds').innerText = String(s).padStart(2, '0');
      }
      update();
      setInterval(update, 1000);
    })();
  </script>

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
