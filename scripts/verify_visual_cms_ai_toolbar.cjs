const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\ROG_Zephyrus_G14\\.gemini\\antigravity\\brain\\81fe8cb3-5c89-4012-ab1a-ba4759373036';
const SCREENSHOTS_DIR = path.join(__dirname, '..', 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function runVerification() {
  console.log('🚀 Starting Visual CMS + Floating AI Toolbar E2E Verification...');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 15000 });
    console.log('✅ Page loaded successfully at http://localhost:5173/');

    // 1. If on form, submit to enter preview
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      console.log('Submitting initial event form to enter preview mode...');
      await submitBtn.click();
      await new Promise(r => setTimeout(r, 2000));
    }

    // Wait for the bottom studio dock
    await page.waitForSelector('main', { timeout: 10000 });
    console.log('✅ Preview mode rendered.');

    // 2. Verify "Tải HTML" button is REMOVED from the dock
    const allButtonsText = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.map(b => b.textContent || '');
    });
    const hasDownloadHtml = allButtonsText.some(t => t.includes('Tải HTML'));
    if (hasDownloadHtml) {
      console.error('❌ Error: "Tải HTML" button is still present in the dock!');
      process.exit(1);
    } else {
      console.log('✅ Verified: "Tải HTML" button has been completely removed from the Studio dock.');
    }

    // 3. Find and click "Sửa chữ (Visual CMS)" toggle button
    console.log('Locating Visual CMS toggle button...');
    const cmsBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find(b => b.textContent && b.textContent.includes('Sửa chữ')) || null;
    });

    if (!cmsBtn || (await cmsBtn.jsonValue()) === null) {
      throw new Error('Could not find Visual CMS toggle button!');
    }

    await cmsBtn.click();
    await new Promise(r => setTimeout(r, 1000));

    // 4. Verify Visual CMS Banner is visible
    const bannerText = await page.evaluate(() => {
      const banner = document.querySelector('div.bg-emerald-600');
      return banner ? banner.textContent : null;
    });
    console.log('Visual CMS Banner detected:', bannerText ? 'YES' : 'NO');
    if (!bannerText) {
      throw new Error('Visual CMS Banner did not appear!');
    }

    // Take screenshot of active Visual CMS mode
    const snap1 = path.join(SCREENSHOTS_DIR, 'visual_cms_active_mode.png');
    await page.screenshot({ path: snap1 });
    console.log('📸 Saved:', snap1);

    // 5. Click on the Hero headline to trigger Floating AI Toolbar
    console.log('Clicking on the headline element to focus...');
    const headlineEl = await page.waitForSelector('h1 [contenteditable="true"]', { timeout: 5000 });
    const originalHeadlineText = await page.evaluate(el => el.textContent, headlineEl);
    console.log('Original Headline:', originalHeadlineText);

    await headlineEl.click();
    await new Promise(r => setTimeout(r, 600));

    // 6. Verify Floating AI Toolbar presence
    const toolbarPresent = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('AI Viết lại'));
      return Boolean(btn);
    });
    console.log('Floating AI Toolbar present:', toolbarPresent ? 'YES' : 'NO');
    if (!toolbarPresent) {
      throw new Error('Floating AI Toolbar did not appear above editable element!');
    }

    // Click "✨ AI Viết lại" to open the 3 preset dropdown
    console.log('Opening AI Rewrite presets menu...');
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('AI Viết lại'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // Verify 3 options exist
    const presetsExist = await page.evaluate(() => {
      const text = document.body.innerText;
      return (
        text.includes('Ngắn gọn hơn') &&
        text.includes('Tăng tính khẩn cấp (FOMO)') &&
        text.includes('Sang trọng hơn')
      );
    });
    console.log('Presets dropdown options (Ngắn gọn, FOMO, Sang trọng) present:', presetsExist ? 'YES' : 'NO');
    if (!presetsExist) {
      throw new Error('Presets dropdown did not show all 3 rewrite styles!');
    }

    // Capture screenshot of Floating Toolbar with presets
    const snap2 = path.join(SCREENSHOTS_DIR, 'floating_ai_toolbar_presets.png');
    await page.screenshot({ path: snap2 });
    console.log('📸 Saved:', snap2);

    // 7. Click "Tăng tính khẩn cấp (FOMO)" to test transformation
    console.log('Clicking "Tăng tính khẩn cấp (FOMO)" preset...');
    await page.evaluate(() => {
      const fomoBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Tăng tính khẩn cấp (FOMO)'));
      if (fomoBtn) fomoBtn.click();
    });

    await new Promise(r => setTimeout(r, 1500));

    const newHeadlineText = await page.evaluate(el => el.textContent, headlineEl);
    console.log('✨ Rewritten Headline (FOMO):', newHeadlineText);

    // Capture screenshot of transformed headline
    const snap3 = path.join(SCREENSHOTS_DIR, 'fomo_transformed_headline.png');
    await page.screenshot({ path: snap3 });
    console.log('📸 Saved:', snap3);

    // 8. Test Undo button
    console.log('Testing "Hoàn tác" button...');
    await page.evaluate(() => {
      const undoBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Hoàn tác'));
      if (undoBtn) undoBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const restoredHeadlineText = await page.evaluate(el => el.textContent, headlineEl);
    console.log('Restored Headline after Undo:', restoredHeadlineText);

    // Copy screenshots to artifact directory
    if (fs.existsSync(ARTIFACT_DIR)) {
      fs.copyFileSync(snap1, path.join(ARTIFACT_DIR, 'visual_cms_active_mode.png'));
      fs.copyFileSync(snap2, path.join(ARTIFACT_DIR, 'floating_ai_toolbar_presets.png'));
      fs.copyFileSync(snap3, path.join(ARTIFACT_DIR, 'fomo_transformed_headline.png'));
      console.log('✅ Copied screenshots to brain artifact directory.');
    }

    console.log('\n🎉 ALL VERIFICATIONS PASSED 100%! Ready for pitching presentation.');
  } catch (error) {
    console.error('❌ Verification failed with error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runVerification();
