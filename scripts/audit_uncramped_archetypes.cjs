const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function auditUncrampedArchetypes() {
  const artifactDir = 'C:\\Users\\ROG_Zephyrus_G14\\.gemini\\antigravity\\brain\\614d51b3-f094-4082-8727-65ba246d3e6f';

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 15000 });

    // Submit form to enter preview
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      console.log('Submitting initial event form to enter preview mode...');
      await submitBtn.click();
      await new Promise(r => setTimeout(r, 2000));
    }

    await page.waitForSelector('select', { timeout: 5000 });

    const categories = ['ai-tech', 'marketing', 'startup', 'developer', 'design', 'education'];

    for (const cat of categories) {
      console.log(`Auditing category: ${cat}`);
      await page.select('select', cat);
      await new Promise(r => setTimeout(r, 1000));

      // Scroll to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await new Promise(r => setTimeout(r, 400));

      // Capture hero screenshot
      const heroPath = path.join(artifactDir, `uncramped_${cat}_hero.png`);
      await page.screenshot({ path: heroPath, clip: { x: 0, y: 64, width: 1440, height: 750 } });
      console.log(`Saved hero screenshot to: ${heroPath}`);
    }

    console.log('All 6 archetypes successfully audited and captured!');
  } catch (err) {
    console.error('Audit failed:', err);
  } finally {
    await browser.close();
  }
}

auditUncrampedArchetypes();
