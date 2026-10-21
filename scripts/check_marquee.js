import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Submit to go to preview
  await page.evaluate(() => {
    const f = document.querySelector('form');
    if (f) f.requestSubmit();
  });
  await new Promise(r => setTimeout(r, 600));

  const check = await page.evaluate(() => {
    let keyframeExists = false;
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(sheet.cssRules)) {
          if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name === 'marquee') {
            keyframeExists = true;
          }
        }
      } catch (e) {}
    }

    const container = document.querySelector('.marquee-container');
    const content = document.querySelector('.marquee-content');
    
    return {
      keyframeExists,
      containerFound: Boolean(container),
      contentFound: Boolean(content),
      animation: content ? window.getComputedStyle(content).animation : null,
      animationName: content ? window.getComputedStyle(content).animationName : null,
      animationPlayState: content ? window.getComputedStyle(content).animationPlayState : null,
      animationDuration: content ? window.getComputedStyle(content).animationDuration : null,
      transform: content ? window.getComputedStyle(content).transform : null,
    };
  });

  console.log('Marquee check:', JSON.stringify(check, null, 2));

  // Check movement over 1 second
  const pos1 = await page.evaluate(() => {
    const el = document.querySelector('.marquee-content');
    return el ? el.getBoundingClientRect().x : null;
  });
  await new Promise(r => setTimeout(r, 1000));
  const pos2 = await page.evaluate(() => {
    const el = document.querySelector('.marquee-content');
    return el ? el.getBoundingClientRect().x : null;
  });

  console.log('Position delta after 1s:', { pos1, pos2, delta: pos2 - pos1 });

  await browser.close();
}

main().catch(console.error);
