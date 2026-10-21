import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox']
});
const page = await browser.newPage();
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

// Click preset 0
const buttons = await page.$$('button');
for (const b of buttons) {
  const text = await page.evaluate(el => el.textContent, b);
  if (text && text.includes('AI Agent Summit 2026')) {
    await b.click();
    break;
  }
}
await new Promise(r => setTimeout(r, 400));
const submit = await page.$('button[type="submit"]');
if (submit) await submit.click();
await page.waitForSelector('main', { timeout: 15000 });

// Toggle Light Mode
const toggle = await page.$('button[aria-label="Toggle Theme Mode"]');
if (toggle) await toggle.click();
await new Promise(r => setTimeout(r, 800));

// Inspect elements in hero
const report = await page.evaluate(() => {
  const sec = document.querySelector('section');
  const results = [];
  results.push({ tag: 'section', class: sec.className, bg: window.getComputedStyle(sec).backgroundColor });
  for (const child of sec.querySelectorAll('div')) {
    const bg = window.getComputedStyle(child).backgroundColor;
    const bgImg = window.getComputedStyle(child).backgroundImage;
    if (bg !== 'rgba(0, 0, 0, 0)' || bgImg !== 'none') {
      results.push({
        class: child.className.substring(0, 80),
        bg,
        bgImg: bgImg.substring(0, 60)
      });
    }
  }
  return results;
});

console.log('HERO ELEMENTS WITH BACKGROUNDS IN LIGHT MODE:');
console.log(JSON.stringify(report, null, 2));

await browser.close();
