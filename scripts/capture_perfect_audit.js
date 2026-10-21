import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve(__dirname, '../../screenshots');
const ARTIFACT_DIR = 'C:\\Users\\ROG_Zephyrus_G14\\.gemini\\antigravity\\brain\\614d51b3-f094-4082-8727-65ba246d3e6f';

function copyToArtifact(fileName) {
  try {
    const src = path.join(OUTPUT_DIR, fileName);
    const dst = path.join(ARTIFACT_DIR, fileName);
    if (fs.existsSync(src) && fs.existsSync(ARTIFACT_DIR)) {
      fs.copyFileSync(src, dst);
      console.log(`Copied ${fileName} to brain artifact dir.`);
    }
  } catch (e) {
    console.error(`Error copying ${fileName}:`, e);
  }
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox'],
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  page.on('dialog', async d => {
    console.log('ALERT DIALOG:', d.message());
    await d.dismiss();
  });

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Check if on form. If yes, click submit
  const isOnForm = await page.evaluate(() => !document.querySelector('main'));
  if (isOnForm) {
    console.log('On form. Submitting pre-filled event data...');
    // Submit using evaluate to directly trigger form submit
    await page.evaluate(() => {
      const form = document.querySelector('form');
      if (form) {
        form.requestSubmit();
      }
    });
    console.log('Triggered form.requestSubmit(), waiting for main...');
    await page.waitForSelector('main', { timeout: 15000 });
    await new Promise(r => setTimeout(r, 1500));
  }

  // Ensure Dark Mode is active first
  const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  if (!isDark) {
    console.log('Switching to Dark Mode for initial audit...');
    await page.evaluate(() => {
      const btn = document.querySelector('button[aria-label="Toggle Theme Mode"]');
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 600));
  }

  // --- PART 1: DARK MODE AUDIT ---
  console.log('Capturing Dark Mode Hero...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_v4_dark_hero.png') });
  copyToArtifact('audit_v4_dark_hero.png');

  // 2. Dark Mode Marquee
  console.log('Capturing Dark Mode Sponsors Marquee...');
  await page.evaluate(() => {
    const el = document.querySelector('section[data-reveal]');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_v4_dark_marquee.png') });
  copyToArtifact('audit_v4_dark_marquee.png');

  // 3. Sponsor Editor Modal
  console.log('Opening Sponsor Editor Modal...');
  await page.evaluate(() => {
    for (const b of document.querySelectorAll('button')) {
      if (b.textContent && b.textContent.includes('Chỉnh sửa đối tác')) {
        b.click();
        break;
      }
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_v4_sponsor_modal.png') });
  copyToArtifact('audit_v4_sponsor_modal.png');

  // Close modal
  await page.evaluate(() => {
    for (const b of document.querySelectorAll('div.fixed button')) {
      if (b.textContent && b.textContent.includes('Lưu thay đổi')) {
        b.click();
        break;
      }
    }
  });
  await new Promise(r => setTimeout(r, 600));

  // 4. Dark Mode Agenda Timeline
  console.log('Capturing Dark Mode Agenda Timeline...');
  await page.evaluate(() => {
    const el = document.getElementById('agenda');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_v4_dark_timeline.png') });
  copyToArtifact('audit_v4_dark_timeline.png');

  // --- PART 2: LIGHT MODE AUDIT ---
  console.log('Toggling to Light Mode...');
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Toggle Theme Mode"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  // 5. Light Mode Hero & Countdown
  console.log('Capturing Light Mode Hero...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_v4_light_hero.png') });
  copyToArtifact('audit_v4_light_hero.png');

  // 6. Light Mode Sponsors Marquee
  console.log('Capturing Light Mode Sponsors Marquee...');
  await page.evaluate(() => {
    const el = document.querySelector('section[data-reveal]');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_v4_light_marquee.png') });
  copyToArtifact('audit_v4_light_marquee.png');

  // 7. Light Mode Agenda Timeline
  console.log('Capturing Light Mode Agenda Timeline...');
  await page.evaluate(() => {
    const el = document.getElementById('agenda');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_v4_light_timeline.png') });
  copyToArtifact('audit_v4_light_timeline.png');

  // 8. Light Mode Form
  console.log('Switching to Form tab in Light Mode...');
  await page.evaluate(() => {
    for (const b of document.querySelectorAll('header button')) {
      if (b.textContent && b.textContent.includes('Chỉnh sửa')) {
        b.click();
        break;
      }
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_v4_light_form.png') });
  copyToArtifact('audit_v4_light_form.png');

  await browser.close();
  console.log('Audit complete! All 8 screenshots captured successfully.');
}

run().catch(e => {
  console.error('Audit run error:', e);
  process.exit(1);
});
