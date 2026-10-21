const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // 1. Initial page might be on form or preview. Let's check current tab
  // If on form, click the first preset to fill everything and submit
  const isSubmitBtnVisible = await page.$('button[type="submit"]');
  if (isSubmitBtnVisible) {
    console.log('On form tab, selecting first preset...');
    // Click preset 0 (AI Agent Summit)
    const presetBtns = await page.$$('button[type="button"]');
    for (const btn of presetBtns) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('AI Agent Summit 2026')) {
        await btn.click();
        break;
      }
    }
    await new Promise(r => setTimeout(r, 600));

    console.log('Submitting form to generate landing page...');
    await page.click('button[type="submit"]');
    // Wait for generation to complete and tab to switch
    await page.waitForSelector('main', { timeout: 15000 });
    await new Promise(r => setTimeout(r, 1500));
  }

  // Ensure screenshots dir exists
  const outDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Artifact directory
  const artifactDir = 'C:\\Users\\ROG_Zephyrus_G14\\.gemini\\antigravity\\brain\\614d51b3-f094-4082-8727-65ba246d3e6f';

  // 2. Capture Dark Mode Hero & Countdown
  console.log('Capturing Dark Mode Hero & Countdown...');
  await page.screenshot({ path: path.join(outDir, 'audit_v2_dark_hero.png') });
  if (fs.existsSync(artifactDir)) {
    fs.copyFileSync(path.join(outDir, 'audit_v2_dark_hero.png'), path.join(artifactDir, 'audit_v2_dark_hero.png'));
  }

  // 3. Scroll to Trust Bar & Marquee
  console.log('Scrolling to Trust Bar...');
  await page.evaluate(() => {
    const el = document.querySelector('section[data-reveal]');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'audit_v2_dark_marquee.png') });
  if (fs.existsSync(artifactDir)) {
    fs.copyFileSync(path.join(outDir, 'audit_v2_dark_marquee.png'), path.join(artifactDir, 'audit_v2_dark_marquee.png'));
  }

  // 4. Open Sponsor Editor Modal
  console.log('Opening Sponsor Editor Modal...');
  const editSponsorBtn = await page.$('button[title="Thêm, xóa hoặc đổi logo nhà tài trợ"]');
  if (editSponsorBtn) {
    await editSponsorBtn.click();
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(outDir, 'audit_v2_sponsor_modal.png') });
    if (fs.existsSync(artifactDir)) {
      fs.copyFileSync(path.join(outDir, 'audit_v2_sponsor_modal.png'), path.join(artifactDir, 'audit_v2_sponsor_modal.png'));
    }

    // Close modal
    const closeBtn = await page.$('button.transition-colors svg.lucide-x');
    if (closeBtn) {
      await page.evaluate(el => el.closest('button').click(), closeBtn);
      await new Promise(r => setTimeout(r, 600));
    }
  }

  // 5. Scroll to Timeline (Agenda)
  console.log('Scrolling to Agenda Timeline...');
  await page.evaluate(() => {
    const el = document.getElementById('agenda');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'audit_v2_dark_timeline.png') });
  if (fs.existsSync(artifactDir)) {
    fs.copyFileSync(path.join(outDir, 'audit_v2_dark_timeline.png'), path.join(artifactDir, 'audit_v2_dark_timeline.png'));
  }

  // 6. Toggle to Light Mode!
  console.log('Toggling Light Mode...');
  // Find theme toggle button
  const toggleBtn = await page.$('button[aria-label="Toggle Theme Mode"]');
  if (toggleBtn) {
    await toggleBtn.click();
    await new Promise(r => setTimeout(r, 1000));
  }

  // Scroll back to top for Light Mode Hero
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 800));
  console.log('Capturing Light Mode Hero...');
  await page.screenshot({ path: path.join(outDir, 'audit_v2_light_hero.png') });
  if (fs.existsSync(artifactDir)) {
    fs.copyFileSync(path.join(outDir, 'audit_v2_light_hero.png'), path.join(artifactDir, 'audit_v2_light_hero.png'));
  }

  // Scroll to Light Mode Marquee
  console.log('Capturing Light Mode Marquee...');
  await page.evaluate(() => {
    const el = document.querySelector('section[data-reveal]');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'audit_v2_light_marquee.png') });
  if (fs.existsSync(artifactDir)) {
    fs.copyFileSync(path.join(outDir, 'audit_v2_light_marquee.png'), path.join(artifactDir, 'audit_v2_light_marquee.png'));
  }

  // Switch to Form tab in Light Mode to verify Form appearance
  console.log('Switching to Form tab in Light Mode...');
  const editFormBtn = await page.$('button.transition-all span');
  const allBtns = await page.$$('button');
  for (const b of allBtns) {
    const txt = await page.evaluate(el => el.textContent, b);
    if (txt.includes('Chỉnh sửa') || txt.includes('Sửa form')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'audit_v2_light_form.png') });
  if (fs.existsSync(artifactDir)) {
    fs.copyFileSync(path.join(outDir, 'audit_v2_light_form.png'), path.join(artifactDir, 'audit_v2_light_form.png'));
  }

  await browser.close();
  console.log('Verification completed successfully!');
})();
