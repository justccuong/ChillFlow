import { EventInput, GeneratedContent, ThemeConfig, UserTier } from '../types';
import { slugify } from './slug';
import { generateOpenGraphMetaHtml, escapeHtml } from './seo';

export function generateStandaloneHtml(
  input: EventInput,
  content: GeneratedContent,
  theme: ThemeConfig,
  userTier: UserTier = 'free'
): string {
  const speakerPhoto = input.speakerAvatarUrl || theme.speakerImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
  const category = escapeHtml(input.category || 'ai-tech');
  const safeEventName = escapeHtml(input.eventName);
  const safeHeadline = escapeHtml(content.headline);
  const safeSubHeadline = escapeHtml(content.subHeadline);
  const safeEarlyBirdBadge = escapeHtml(content.earlyBirdBadge || 'Ưu đãi đăng ký sớm');
  const safeLocation = escapeHtml(input.location || 'Online / Offline');
  const safeEventDate = escapeHtml(input.eventDate || 'Sắp diễn ra');
  const safeCtaText = escapeHtml(content.ctaButtonText || 'Đăng ký tham gia ngay');
  const safeSpeakerName = escapeHtml(input.speakerName);
  const safeSpeakerRole = escapeHtml(input.speakerRole || 'Chuyên gia ngành');
  const safeSpeakerBio = escapeHtml(input.speakerBio || '');
  const safeTagline = escapeHtml(content.tagline || content.subHeadline || 'Sự kiện chuyên nghiệp hàng đầu đón đầu xu hướng.');
  const safeDiscount = escapeHtml(input.earlyBirdDiscount || '');
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
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans selection:bg-cyan-500 selection:text-black" data-category="${category}">

  ${userTier === 'free' ? `
  <!-- Free Tier Watermark Badge -->
  <div class="bg-indigo-950/80 border-b border-indigo-800/40 text-indigo-300 text-xs py-1.5 px-4 text-center font-medium">
    ⚡ Trang sự kiện tạo tự động bằng <strong class="text-white">ChillFlow AI</strong>.
  </div>
  ` : ''}

  <!-- Clean Top Nav -->
  <nav class="h-16 border-b border-slate-900 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <span class="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
      <span class="font-extrabold tracking-tight text-white font-heading">${safeEventName}</span>
      <span class="hidden sm:inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 ml-2">
        ${category}
      </span>
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
          ⚡ ${safeEarlyBirdBadge}
        </div>
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          ${safeHeadline}
        </h1>
        <p class="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
          ${safeSubHeadline}
        </p>

        <!-- Event Key Meta Tags -->
        <div class="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300 pt-2">
          <div class="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <span class="text-indigo-400 font-semibold">•</span> <span>${safeEventDate}</span>
          </div>
          <div class="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <span class="text-emerald-400 font-semibold">•</span> <span>${safeLocation}</span>
          </div>
          <div class="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            🎟️ <span>Còn lại ${input.maxCapacity ? Math.round(input.maxCapacity * 0.18) : 18} vé</span>
          </div>
        </div>

        <div class="pt-4 flex flex-wrap gap-4 items-center">
          <a href="#registration" class="px-8 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-xl shadow-cyan-500/20 transition-all">
            ${safeCtaText}
          </a>
        </div>
      </div>

      <!-- Hero Visual Card with Countdown -->
      <div class="lg:col-span-4">
        <div class="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-2xl space-y-6">
          <div class="relative aspect-video rounded-2xl overflow-hidden border border-slate-800">
            <img src="${input.heroImageUrl || theme.heroImage}" alt="${safeEventName}" class="w-full h-full object-cover">
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

      <div class="flex flex-wrap justify-center gap-6">
        ${content.benefits.map((b, i) => `
          <div class="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3 w-full ${content.benefits.length === 1 ? 'max-w-xl' : (content.benefits.length === 2 || content.benefits.length === 4) ? 'md:w-[calc(50%-1rem)] max-w-lg' : 'md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] max-w-md'}">
            <span class="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
              0${i + 1}
            </span>
            <h3 class="text-base font-bold text-white">${escapeHtml(b.title)}</h3>
            <p class="text-xs text-slate-400 leading-relaxed">${escapeHtml(b.description)}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Speaker Section -->
  ${input.speakerName ? `
  <section class="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
    <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
      <img src="${speakerPhoto}" alt="${safeSpeakerName}" class="w-32 h-32 rounded-2xl object-cover border-2 border-cyan-500/30 shadow-lg">
      <div class="space-y-2 text-center md:text-left">
        <span class="text-xs font-bold text-cyan-400 tracking-wider uppercase">Keynote Speaker</span>
        <h3 class="text-2xl font-black text-white">${safeSpeakerName}</h3>
        <p class="text-xs font-medium text-indigo-400">${safeSpeakerRole}</p>
        <p class="text-xs text-slate-400 leading-relaxed pt-2">${safeSpeakerBio}</p>
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
              ${escapeHtml(a.time)}
            </span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="text-sm font-bold text-white">${escapeHtml(a.title)}</h4>
                ${a.tag ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">${escapeHtml(a.tag)}</span>` : ''}
              </div>
              <p class="text-xs text-slate-400 mt-0.5">${escapeHtml(a.description)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  ${content.testimonials && content.testimonials.length > 0 ? `
  <section class="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-900 bg-slate-900/40">
    <div class="max-w-6xl mx-auto space-y-10">
      <div class="text-center space-y-2">
        <h2 class="text-2xl sm:text-4xl font-black text-white">Cảm nhận từ khách mời</h2>
        <p class="text-sm text-slate-400">Đánh giá thực tế từ người tham gia các mùa trước</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${content.testimonials.map(t => `
          <div class="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div class="flex text-amber-400 text-sm">★★★★★</div>
            <p class="text-xs text-slate-300 italic leading-relaxed">"${escapeHtml(t.quote)}"</p>
            <div class="pt-4 border-t border-slate-800 flex items-center gap-3">
              <img src="${t.avatar}" alt="${escapeHtml(t.name)}" class="w-10 h-10 rounded-full object-cover border border-slate-700">
              <div>
                <h4 class="text-xs font-bold text-white">${escapeHtml(t.name)}</h4>
                <p class="text-[11px] text-slate-400">${escapeHtml(t.role)} • ${escapeHtml(t.company)}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- FAQs Section -->
  ${content.faqs && content.faqs.length > 0 ? `
  <section class="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-900 bg-slate-900/20">
    <div class="max-w-3xl mx-auto space-y-8">
      <div class="text-center space-y-2">
        <h2 class="text-2xl sm:text-4xl font-black text-white">Câu hỏi thường gặp</h2>
        <p class="text-sm text-slate-400">Mọi thông tin cần thiết về lịch trình, tài liệu và hình thức tham gia</p>
      </div>
      <div class="space-y-4">
        ${content.faqs.map(f => `
          <div class="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 class="text-sm font-bold text-cyan-400">${escapeHtml(f.question)}</h4>
            <p class="text-xs text-slate-300 leading-relaxed">${escapeHtml(f.answer)}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- Real Event Gallery -->
  ${(content.galleryPhotos || theme.galleryPhotos || []).length > 0 ? `
  <section id="gallery" class="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-900 bg-slate-950">
    <div class="max-w-6xl mx-auto space-y-8">
      <div class="text-center space-y-2">
        <span class="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-bold">
          Hình ảnh thực tế
        </span>
        <h2 class="text-2xl sm:text-4xl font-black text-white">Không khí & trải nghiệm sự kiện</h2>
        <p class="text-xs sm:text-sm text-slate-400">Không gian tổ chức chuyên nghiệp tại ${input.location || 'địa điểm chỉ định'}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
        ${((content.galleryPhotos || theme.galleryPhotos) || []).map((photo, i) => `
          <div class="${i === 0 ? 'md:col-span-7 h-72 md:h-96' : 'md:col-span-5 h-72 md:h-96'} rounded-3xl overflow-hidden border border-slate-800 relative group shadow-xl">
            <img src="${photo.url}" alt="${photo.title}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-6 flex flex-col justify-end">
              <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 w-max mb-2 border border-indigo-500/30">
                ${photo.tag}
              </span>
              <h3 class="text-lg font-bold text-white">${photo.title}</h3>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

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

  <!-- Rich Detailed Client Event Footer -->
  <footer class="mt-auto bg-slate-950 border-t border-slate-900 py-16 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="space-y-3">
        <h3 class="font-black text-base text-white tracking-tight">${safeEventName}</h3>
        <p class="text-slate-400 leading-relaxed">${safeTagline}</p>
        <span class="inline-block px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-[11px] font-semibold">
          ${safeDiscount ? 'Ưu đãi: ' + safeDiscount : 'Đảm bảo quyền lợi tham gia'}
        </span>
      </div>
      <div class="space-y-2">
        <h4 class="font-bold text-white uppercase tracking-wider text-[11px]">Thời gian & Địa điểm</h4>
        <p class="text-slate-300"><span class="text-indigo-400 font-semibold">•</span> ${input.eventDate ? new Date(input.eventDate).toLocaleDateString('vi-VN') : 'Sắp diễn ra'}</p>
        <p class="text-slate-300"><span class="text-emerald-400 font-semibold">•</span> ${safeLocation}</p>
        ${input.speakerName ? `<p class="text-slate-400"><span class="text-sky-400 font-semibold">•</span> Chủ trì: ${safeSpeakerName} (${safeSpeakerRole})</p>` : ''}
      </div>
      <div class="space-y-2">
        <h4 class="font-bold text-white uppercase tracking-wider text-[11px]">Điều hướng nhanh</h4>
        <p><a href="#benefits" class="hover:text-indigo-400 transition-colors">Lợi ích sự kiện</a></p>
        <p><a href="#agenda" class="hover:text-indigo-400 transition-colors">Lịch trình chi tiết</a></p>
        <p><a href="#faq" class="hover:text-indigo-400 transition-colors">Hỏi đáp (FAQ)</a></p>
        <p><a href="#registration" class="hover:text-indigo-400 transition-colors">Đăng ký tham gia</a></p>
      </div>
      <div class="space-y-2">
        <h4 class="font-bold text-white uppercase tracking-wider text-[11px]">Liên hệ Ban tổ chức</h4>
        <p><span class="text-indigo-400 font-semibold">•</span> Email: hotro@sukien.vn</p>
        <p><span class="text-emerald-400 font-semibold">•</span> Hotline: 1900 6868 (08:30 - 18:00)</p>
        <p class="text-[11px] text-slate-500">Bảo mật thông tin & hoàn tiền 100% nếu có thay đổi bất khả kháng.</p>
      </div>
    </div>
    <div class="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
      <p>© 2026 ${safeEventName}. Toàn bộ bản quyền thuộc Ban tổ chức.</p>
      <p>${userTier === 'free' ? 'Được tạo bởi ChillFlow AI Event Generator' : 'ChillFlow Enterprise Edition'}</p>
    </div>
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
): string {
  const html = generateStandaloneHtml(input, content, theme, userTier);
  if (typeof document !== 'undefined') {
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
  return html;
}
export default exportStandaloneHtml;
