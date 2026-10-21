import puppeteer from 'puppeteer-core';

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.resolve(__dirname, '../../screenshots');
const artifactDir = 'C:\\Users\\ROG_Zephyrus_G14\\.gemini\\antigravity\\brain\\614d51b3-f094-4082-8727-65ba246d3e6f';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox']
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

// Submit to go to preview
await page.evaluate(() => document.querySelector('form').requestSubmit());
await new Promise(r => setTimeout(r, 600));

// Toggle theme to light
await page.evaluate(() => document.querySelector('button[aria-label="Toggle Theme Mode"]').click());
await new Promise(r => setTimeout(r, 400));
console.log('Class after toggle to light:', await page.evaluate(() => document.documentElement.className));

// Click Chỉnh sửa
await page.evaluate(() => {
  for (const b of document.querySelectorAll('header button')) {
    if (b.textContent && b.textContent.includes('Chỉnh sửa')) b.click();
  }
});
await new Promise(r => setTimeout(r, 400));
console.log('Class after clicking Chỉnh sửa:', await page.evaluate(() => document.documentElement.className));

const outPath1 = path.join(screenshotsDir, 'real_light_form.png');
const outPath2 = path.join(artifactDir, 'real_light_form.png');
await page.screenshot({ path: outPath1 });
await page.screenshot({ path: outPath2 });
console.log('Saved real_light_form.png to screenshots and artifacts');
await browser.close();
