const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function verifyLayouts() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 15000 });
    console.log('Page loaded successfully.');

    // If on form, submit form to enter preview
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      console.log('Submitting initial event form to enter preview mode...');
      await submitBtn.click();
      await new Promise(r => setTimeout(r, 2000));
    }

    // Now look for category select in preview toolbar
    await page.waitForSelector('select', { timeout: 5000 });
    console.log('Found category selector.');

    const categories = ['ai-tech', 'marketing', 'startup', 'developer', 'design', 'education'];
    const results = {};

    for (const cat of categories) {
      await page.select('select', cat);
      await new Promise(r => setTimeout(r, 800));

      const headlineData = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        if (!h1) return null;
        const rect = h1.getBoundingClientRect();
        const computed = window.getComputedStyle(h1);
        const text = h1.innerText;
        const lineHeight = parseFloat(computed.lineHeight) || parseFloat(computed.fontSize) * 1.2;
        const lineCount = Math.round(rect.height / lineHeight);
        const parent = h1.parentElement;
        const parentWidth = parent ? Math.round(parent.getBoundingClientRect().width) : 0;
        return {
          text: text.substring(0, 45) + '...',
          width: Math.round(rect.width),
          parentWidth: parentWidth,
          height: Math.round(rect.height),
          lineHeight: Math.round(lineHeight),
          estimatedLines: lineCount
        };
      });

      results[cat] = headlineData;
      console.log(`[Category: ${cat}]`, headlineData);
    }
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    await browser.close();
  }
}

verifyLayouts();
