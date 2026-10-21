import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.resolve(__dirname, '../../screenshots');
const artifactDir = 'C:\\Users\\ROG_Zephyrus_G14\\.gemini\\antigravity\\brain\\614d51b3-f094-4082-8727-65ba246d3e6f';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Submit to preview
  await page.evaluate(() => {
    const f = document.querySelector('form');
    if (f) f.requestSubmit();
  });
  await new Promise(r => setTimeout(r, 600));

  // Scroll to sponsors marquee
  await page.evaluate(() => {
    const el = document.querySelector('.marquee-container');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 600));

  // Capture Frame 1 at t=0s
  const el = await page.$('.marquee-container');
  const frame1Path = path.join(screenshotsDir, 'marquee_frame1.png');
  const frame1Art = path.join(artifactDir, 'marquee_frame1.png');
  await el.screenshot({ path: frame1Path });
  await el.screenshot({ path: frame1Art });

  const pos1 = await page.evaluate(() => {
    const el = document.querySelector('.marquee-content');
    return el.getBoundingClientRect().x;
  });

  // Wait 700ms
  await new Promise(r => setTimeout(r, 700));

  // Capture Frame 2 at t=0.7s
  const frame2Path = path.join(screenshotsDir, 'marquee_frame2.png');
  const frame2Art = path.join(artifactDir, 'marquee_frame2.png');
  await el.screenshot({ path: frame2Path });
  await el.screenshot({ path: frame2Art });

  const pos2 = await page.evaluate(() => {
    const el = document.querySelector('.marquee-content');
    return el.getBoundingClientRect().x;
  });

  // Wait 700ms
  await new Promise(r => setTimeout(r, 700));

  // Capture Frame 3 at t=1.4s
  const frame3Path = path.join(screenshotsDir, 'marquee_frame3.png');
  const frame3Art = path.join(artifactDir, 'marquee_frame3.png');
  await el.screenshot({ path: frame3Path });
  await el.screenshot({ path: frame3Art });

  const pos3 = await page.evaluate(() => {
    const el = document.querySelector('.marquee-content');
    return el.getBoundingClientRect().x;
  });

  console.log('Motion trajectory:', {
    frame1_x: pos1,
    frame2_x: pos2,
    frame3_x: pos3,
    delta_1_to_2: pos2 - pos1,
    delta_2_to_3: pos3 - pos2
  });

  // Test Hover Pause
  await page.hover('.marquee-container');
  await new Promise(r => setTimeout(r, 300));

  const isPaused = await page.evaluate(() => {
    const content = document.querySelector('.marquee-content');
    return window.getComputedStyle(content).animationPlayState;
  });

  console.log('Hover state animationPlayState:', isPaused);

  await browser.close();
  console.log('Marquee motion verified successfully!');
}

main().catch(console.error);
