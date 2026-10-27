import { EventInput, GeneratedContent, ThemeConfig, UserTier } from '../types';
import { slugify } from '../services/publishService';
import { generateOpenGraphMetaHtml } from './seo';

export function generateStandaloneHtml(
  input: EventInput,
  content: GeneratedContent,
  theme: ThemeConfig,
  userTier: UserTier = 'free'
): string {
  const speakerPhoto = input.speakerAvatarUrl || theme.speakerImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
  const category = input.category || 'ai-tech';
  const ogAndSchemaMeta = generateOpenGraphMetaHtml(input, content, theme);

  return `<!DOCTYPE html>
<html lang="vi" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${ogAndSchemaMeta}
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

  ${userTier === 'free' ? `
  <!-- Free Tier Watermark Badge -->
  <div class="bg-indigo-950/80 border-b border-indigo-800/40 text-indigo-300 text-xs py-1.5 px-4 text-center font-medium">
    ⚡ Trang sự kiện tạo tự động bằng <strong class="text-white">ConvertFlow AI</strong>.
  </div>
  ` : ''}

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
        <p class="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
          ${content.subHeadline}
        </p>

        <!-- Event Key Meta Tags -->
        <div class="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300 pt-2">
          <div class="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            📅 <span>${input.eventDate || 'Sắp diễn ra'}</span>
          </div>
          <div class="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            📍 <span>${input.location || 'Online / Offline'}</span>
          </div>
          <div class="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            🎟️ <span>Còn lại ${input.maxCapacity ? Math.round(input.maxCapacity * 0.18) : 18} vé</span>
          </div>
        </div>

        <div class="pt-4 flex flex-wrap gap-4 items-center">
          <a href="#registration" class="px-8 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-xl shadow-cyan-500/20 transition-all">
            ${content.ctaButtonText || 'Đăng ký tham gia ngay'}
          </a>
        </div>
      </div>

      <!-- Hero Visual Card with Countdown -->
      <div class="lg:col-span-4">
        <div class="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-2xl space-y-6">
          <div class="relative aspect-video rounded-2xl overflow-hidden border border-slate-800">
            <img src="${input.heroImageUrl || theme.heroImage}" alt="${input.eventName}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
          </div>

          <div class="text-center space-y-3">
            <span class="text-xs uppercase font-bold tracking-wider text-cyan-400">Thời gian còn lại</span>
            <div class="grid grid-cols-4 gap-2 text-center" id="countdown-timer">
              <div class="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <span class="block text-2xl font-black text-white font-mono" id="timer-days">14</span>
                <span class="text-[10px] text-slate-400 font-semibold">Ngày</span>
              </div>
              <div class="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <span class="block text-2xl font-black text-white font-mono" id="timer-hours">08</span>
                <span class="text-[10px] text-slate-400 font-semibold">Giờ</span>
              </div>
              <div class="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <span class="block text-2xl font-black text-white font-mono" id="timer-minutes">45</span>
                <span class="text-[10px] text-slate-400 font-semibold">Phút</span>
              </div>
              <div class="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <span class="block text-2xl font-black text-white font-mono" id="timer-seconds">12</span>
                <span class="text-[10px] text-slate-400 font-semibold">Giây</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Benefits Section -->
  <section class="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-900 bg-slate-900/30">
    <div class="max-w-7xl mx-auto space-y-12">
      <div class="text-center max-w-2xl mx-auto space-y-2">
        <h2 class="text-2xl sm:text-4xl font-black text-white">Giá trị bạn sẽ nhận được</h2>
        <p class="text-sm text-slate-400">Trang bị kiến thức và kỹ năng thực chiến đón đầu làn sóng 2026</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        ${content.benefits.map((b, i) => `
          <div class="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3">
            <span class="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
              0${i + 1}
            </span>
            <h3 class="text-base font-bold text-white">${b.title}</h3>
            <p class="text-xs text-slate-400 leading-relaxed">${b.description}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Speaker Section -->
  ${input.speakerName ? `
  <section class="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
    <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
      <img src="${speakerPhoto}" alt="${input.speakerName}" class="w-32 h-32 rounded-2xl object-cover border-2 border-cyan-500/30 shadow-lg">
      <div class="space-y-2 text-center md:text-left">
        <span class="text-xs font-bold text-cyan-400 tracking-wider uppercase">Keynote Speaker</span>
        <h3 class="text-2xl font-black text-white">${input.speakerName}</h3>
        <p class="text-xs font-medium text-indigo-400">${input.speakerRole || 'Chuyên gia ngành'}</p>
        <p class="text-xs text-slate-400 leading-relaxed pt-2">${input.speakerBio || ''}</p>
      </div>
    </div>
  </section>
  ` : ''}

  <!-- Agenda Section -->
  <section class="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-900 bg-slate-900/20">
    <div class="max-w-4xl mx-auto space-y-8">
      <div class="text-center space-y-2">
        <h2 class="text-2xl sm:text-4xl font-black text-white">Lịch trình chi tiết</h2>
        <p class="text-sm text-slate-400">Nội dung đúc kết, cô đọng và thực chiến</p>
      </div>

      <div class="space-y-4">
        ${content.agenda.map(a => `
          <div class="flex items-start gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span class="px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono text-xs font-bold shrink-0">
              ${a.time}
            </span>
            <div>
              <h4 class="text-sm font-bold text-white">${a.title}</h4>
              <p class="text-xs text-slate-400 mt-0.5">${a.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Registration Section -->
  <section id="registration" class="py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-xl mx-auto rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 p-8 sm:p-10 shadow-2xl text-center space-y-6">
      <div class="space-y-2">
        <span class="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold">
          Chỉ còn ít suất ưu đãi
        </span>
        <h2 class="text-2xl sm:text-3xl font-black text-white">Đăng ký giữ chỗ sự kiện</h2>
        <p class="text-xs text-slate-400">Điền thông tin để nhận vé mời và mã QR check-in qua email.</p>
      </div>

      <form class="space-y-4 text-left" onsubmit="event.preventDefault(); alert('Đăng ký vé thành công! Chúng tôi đã gửi xác nhận đến email của bạn.');">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Họ và tên</label>
          <input type="text" required placeholder="Nguyễn Văn A" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500">
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
    ${userTier === 'free' ? '<p class="mt-2 text-[11px] text-slate-600">Created with ConvertFlow AI Landing Page Generator</p>' : ''}
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
        const elD = document.getElementById('timer-days');
        const elH = document.getElementById('timer-hours');
        const elM = document.getElementById('timer-minutes');
        const elS = document.getElementById('timer-seconds');
        if (elD) elD.innerText = String(d).padStart(2, '0');
        if (elH) elH.innerText = String(h).padStart(2, '0');
        if (elM) elM.innerText = String(m).padStart(2, '0');
        if (elS) elS.innerText = String(s).padStart(2, '0');
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
export default exportStandaloneHtml;
