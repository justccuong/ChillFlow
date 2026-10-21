import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve('..', 'screenshots');

async function capture() {
  console.log('Launching Chrome for deep visual audit...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // 1. Click AI preset
  const presetButtons = await page.$$('button');
  for (const btn of presetButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('AI Agent Summit 2026')) {
      await btn.click();
      await new Promise(r => setTimeout(r, 300));
      break;
    }
  }

  // 2. Click submit
  const submitBtn = await page.$('button[type="submit"]');
  if (submitBtn) {
    await submitBtn.click();
    await new Promise(r => setTimeout(r, 2000));
  }

  // 3. Hero section (Viewport)
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_01_hero.png') });
  console.log('Captured audit_01_hero.png');

  // 4. Scroll to Trust Bar & Benefits
  await page.evaluate(() => window.scrollBy(0, 750));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_02_benefits.png') });
  console.log('Captured audit_02_benefits.png');

  // 5. Scroll to Gallery
  await page.evaluate(() => window.scrollBy(0, 800));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_03_gallery.png') });
  console.log('Captured audit_03_gallery.png');

  // 6. Scroll to Speaker
  await page.evaluate(() => window.scrollBy(0, 700));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_04_speaker.png') });
  console.log('Captured audit_04_speaker.png');

  // 7. Scroll to Agenda Timeline
  await page.evaluate(() => {
    const el = document.getElementById('agenda');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_05_agenda_timeline.png') });
  console.log('Captured audit_05_agenda_timeline.png');

  // 8. Scroll to FAQ & Registration
  await page.evaluate(() => {
    const el = document.getElementById('registration');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_06_registration.png') });
  console.log('Captured audit_06_registration.png');

  // 9. Mobile View
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_07_mobile_hero.png') });
  console.log('Captured audit_07_mobile_hero.png');

  await browser.close();
  console.log('Visual audit capture complete!');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
