import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve('..', 'screenshots');

async function capture() {
  console.log('Launching browser to capture effects...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox'],
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // 1. Submit form preset
  const presetButtons = await page.$$('button');
  for (const btn of presetButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('AI Agent Summit 2026')) {
      await btn.click();
      await new Promise(r => setTimeout(r, 200));
      break;
    }
  }

  const submitBtn = await page.$('button[type="submit"]');
  if (submitBtn) {
    await submitBtn.click();
    await new Promise(r => setTimeout(r, 2000));
  }

  // 2. Capture Hero + 3D Perspective Showcase
  await page.evaluate(() => window.scrollTo(0, 350));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'effect_01_hero_3d.png') });
  console.log('Captured effect_01_hero_3d.png');

  // 3. Scroll to Sponsors Bar with Real SVG Brand Logos
  await page.evaluate(() => window.scrollBy(0, 650));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'effect_02_sponsors_svg.png') });
  console.log('Captured effect_02_sponsors_svg.png');

  // 4. Scroll to Testimonials
  await page.evaluate(() => {
    const el = document.getElementById('testimonials');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'effect_03_testimonials.png') });
  console.log('Captured effect_03_testimonials.png');

  await browser.close();
  console.log('Done capturing effects!');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
