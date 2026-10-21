import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve('..', 'screenshots');

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Submit preset
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

  // Scroll 350px on mobile to check countdown
  await page.evaluate(() => window.scrollBy(0, 380));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_08_mobile_countdown.png') });

  // Scroll to timeline on mobile
  await page.evaluate(() => {
    const el = document.getElementById('agenda');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_09_mobile_timeline.png') });

  await browser.close();
  console.log('Mobile screenshots captured');
}

capture();
