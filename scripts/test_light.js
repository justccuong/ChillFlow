import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox']
});
const page = await browser.newPage();
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

const isPreview = await page.evaluate(() => Boolean(document.querySelector('main')));
console.log('Is on Preview?:', isPreview);

if (!isPreview) {
  console.log('On form, populating preset and generating...');
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('AI Agent Summit 2026')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 500));
  const submit = await page.$('form button[type="submit"]');
  if (submit) await submit.click();
  await page.waitForSelector('main', { timeout: 10000 });
}

// Click toggle
console.log('Toggling theme mode...');
await page.click('button[aria-label="Toggle Theme Mode"]');
await new Promise(r => setTimeout(r, 600));

const info = await page.evaluate(() => {
  const sec = document.querySelector('section');
  const h1 = document.querySelector('h1');
  const firstDigit = document.querySelector('.tabular-nums');
  return {
    htmlClass: document.documentElement.className,
    themeInStorage: localStorage.getItem('convertflow-theme-mode'),
    sectionBg: sec ? window.getComputedStyle(sec).backgroundColor : null,
    h1Color: h1 ? window.getComputedStyle(h1).color : null,
    digitColor: firstDigit ? window.getComputedStyle(firstDigit).color : null,
    bodyBg: window.getComputedStyle(document.body).backgroundColor
  };
});
console.log('LIGHT MODE DIAGNOSTICS:', JSON.stringify(info, null, 2));

// Take a fresh screenshot of light hero
await page.screenshot({ path: '../screenshots/diagnose_light_hero.png' });
console.log('Saved diagnose_light_hero.png');

await browser.close();
