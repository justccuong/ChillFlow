import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox']
});
const page = await browser.newPage();
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

// Toggle theme
await page.evaluate(() => {
  const btn = document.querySelector('button[aria-label="Toggle Theme Mode"]');
  if (btn) btn.click();
});
await new Promise(r => setTimeout(r, 600));

const res = await page.evaluate(() => {
  const minH = document.querySelector('.min-h-screen');
  
  // Inspect which CSS declaration actually wins
  // In Chromium, we can test setting different classes or checking style sheets
  const declaredRules = [];
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from(sheet.cssRules)) {
        if (rule.selectorText && minH.matches(rule.selectorText)) {
          if (rule.style.backgroundColor) {
            declaredRules.push({
              selector: rule.selectorText,
              bgColor: rule.style.backgroundColor,
              parentStyleSheet: sheet.href || 'inline'
            });
          }
        }
      }
    } catch(e) {}
  }

  // Also check if an ancestor or anything is setting it
  return {
    declaredRules,
    computed: window.getComputedStyle(minH).backgroundColor
  };
});
console.log('WINNING BG RULE:', JSON.stringify(res, null, 2));
await browser.close();
