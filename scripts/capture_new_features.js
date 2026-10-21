import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve('..', 'screenshots');
const ARTIFACT_DIR = 'C:\\Users\\ROG_Zephyrus_G14\\.gemini\\antigravity\\brain\\614d51b3-f094-4082-8727-65ba246d3e6f';

function copyToArtifact(fileName) {
  try {
    const src = path.join(OUTPUT_DIR, fileName);
    const dst = path.join(ARTIFACT_DIR, fileName);
    if (fs.existsSync(src) && fs.existsSync(ARTIFACT_DIR)) {
      fs.copyFileSync(src, dst);
    }
  } catch (e) {
    console.error('Copy failed:', e);
  }
}

async function capture() {
  console.log('Launching browser to capture new features...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox'],
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // 1. If currently on preview tab, switch to form tab or vice versa
  console.log('Step 1: Check view state...');
  const submitBtn = await page.$('button[type="submit"]');
  if (submitBtn) {
    // We are on Form
    console.log('On form. Clicking Preset button to populate form fields...');
    const buttons = await page.$$('button');
    for (const b of buttons) {
      const text = await page.evaluate(el => el.textContent, b);
      if (text && text.includes('AI Agent Summit 2026')) {
        await b.click();
        break;
      }
    }
    await new Promise(r => setTimeout(r, 600));

    // Capture clean form with pure Lucide SVGs
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'feature_01_form_lucide_icons.png') });
    copyToArtifact('feature_01_form_lucide_icons.png');
    console.log('Captured feature_01_form_lucide_icons.png');

    // Submit form
    console.log('Submitting form...');
    const updatedSubmit = await page.$('button[type="submit"]');
    if (updatedSubmit) {
      await updatedSubmit.click();
      await page.waitForSelector('main', { timeout: 15000 });
      await new Promise(r => setTimeout(r, 1500));
    }
  }

  // 2. We are now on Landing Page Preview (Dark Mode)
  console.log('Step 2: Dark Mode Landing Page Hero & Borderless Countdown...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_v2_dark_hero.png') });
  copyToArtifact('audit_v2_dark_hero.png');

  // 3. Scroll to Sponsors Trust Bar
  console.log('Step 3: Scroll to Sponsors Marquee...');
  await page.evaluate(() => {
    const el = document.querySelector('section[data-reveal]');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_v2_dark_marquee.png') });
  copyToArtifact('audit_v2_dark_marquee.png');

  // 4. Open Sponsor Editor Modal
  console.log('Step 4: Opening Sponsor Editor Modal...');
  const allBtns = await page.$$('button');
  for (const b of allBtns) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Chỉnh sửa đối tác')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'feature_02_sponsor_editor_modal.png') });
  copyToArtifact('feature_02_sponsor_editor_modal.png');
  console.log('Captured feature_02_sponsor_editor_modal.png');

  // Add a preset from modal (e.g., click an unselected preset if available)
  const modalBtns = await page.$$('div.fixed button');
  for (const mb of modalBtns) {
    const text = await page.evaluate(el => el.textContent, mb);
    if (text && (text.includes('Adobe') || text.includes('Stripe'))) {
      await mb.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 400));

  // Save changes in modal
  for (const b of await page.$$('div.fixed button')) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Lưu thay đổi')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 600));

  // 5. Scroll to Agenda Timeline (Dark Mode)
  console.log('Step 5: Agenda Timeline (Dark Mode)...');
  await page.evaluate(() => {
    const el = document.getElementById('agenda');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_v2_dark_timeline.png') });
  copyToArtifact('audit_v2_dark_timeline.png');

  // 6. Toggle Light Mode!
  console.log('Step 6: Toggle Light Mode...');
  const themeToggle = await page.$('button[aria-label="Toggle Theme Mode"]');
  if (themeToggle) {
    await themeToggle.click();
    await new Promise(r => setTimeout(r, 1000));
  }

  // Scroll to Top for Light Mode Hero
  console.log('Step 7: Light Mode Hero...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'feature_04_light_mode_hero.png') });
  copyToArtifact('feature_04_light_mode_hero.png');

  // Scroll to Light Mode Sponsors
  console.log('Step 8: Light Mode Sponsors Marquee...');
  await page.evaluate(() => {
    const el = document.querySelector('section[data-reveal]');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'feature_05_light_mode_sponsors.png') });
  copyToArtifact('feature_05_light_mode_sponsors.png');

  // Scroll to Light Mode Agenda
  console.log('Step 9: Light Mode Agenda...');
  await page.evaluate(() => {
    const el = document.getElementById('agenda');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'audit_v2_light_timeline.png') });
  copyToArtifact('audit_v2_light_timeline.png');

  await browser.close();
  console.log('All screenshots captured and mirrored to brain artifact directory!');
}

capture().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
