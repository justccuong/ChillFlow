import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox']
});
const page = await browser.newPage();
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

await page.evaluate(() => {
  const btn = document.querySelector('button[aria-label="Toggle Theme Mode"]');
  if (btn) btn.click();
});
await new Promise(r => setTimeout(r, 400));

const res = await page.evaluate(() => {
  const card = document.querySelector('form').closest('div');
  const matched = [];
  for (const s of document.styleSheets) {
    try {
      for (const r of s.cssRules) {
        if (r.selectorText && card.matches(r.selectorText)) {
          if (r.cssText.includes('background')) {
            matched.push({ selector: r.selectorText, css: r.cssText });
          }
        }
      }
    } catch(e) {}
  }
  return {
    matched,
    computed: window.getComputedStyle(card).backgroundColor
  };
});
console.log('FORM CARD MATCHED BG RULES:', JSON.stringify(res, null, 2));

await browser.close();
