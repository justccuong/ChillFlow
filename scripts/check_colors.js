import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox']
});
const page = await browser.newPage();
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

const before = await page.evaluate(() => ({
  storage: localStorage.getItem('convertflow-theme-mode'),
  htmlClass: document.documentElement.className
}));
console.log('BEFORE CLICK:', before);

await page.evaluate(() => {
  const btn = document.querySelector('button[aria-label="Toggle Theme Mode"]');
  if (btn) btn.click();
});
await new Promise(r => setTimeout(r, 600));

const after = await page.evaluate(() => ({
  storage: localStorage.getItem('convertflow-theme-mode'),
  htmlClass: document.documentElement.className,
  bg: window.getComputedStyle(document.querySelector('.min-h-screen')).backgroundColor
}));
console.log('AFTER CLICK:', after);

await browser.close();
