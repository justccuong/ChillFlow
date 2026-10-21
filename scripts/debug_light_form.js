import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  console.log('Initial html class:', await page.evaluate(() => document.documentElement.className));

  // Submit form
  await page.evaluate(() => document.querySelector('form').requestSubmit());
  await new Promise(r => setTimeout(r, 600));

  // Toggle theme to light
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Toggle Theme Mode"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 500));
  console.log('After toggle html class:', await page.evaluate(() => document.documentElement.className));

  // Click Chỉnh sửa
  await page.evaluate(() => {
    for (const b of document.querySelectorAll('header button')) {
      if (b.textContent && b.textContent.includes('Chỉnh sửa')) {
        b.click();
        break;
      }
    }
  });
  await new Promise(r => setTimeout(r, 500));

  const info = await page.evaluate(() => {
    const rootDiv = document.querySelector('#root > div');
    const h1 = document.querySelector('h1');
    const formCard = document.querySelector('.max-w-4xl > div:last-child');
    
    const matched = [];
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(sheet.cssRules)) {
          if (rootDiv && rule.selectorText && rootDiv.matches(rule.selectorText)) {
            if (rule.style && rule.style.backgroundColor) {
              matched.push({ selector: rule.selectorText, bg: rule.style.backgroundColor });
            }
          }
        }
      } catch (e) {}
    }

    const matchedTransition = [];
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(sheet.cssRules)) {
          if (rootDiv && rule.selectorText && rootDiv.matches(rule.selectorText)) {
            if (rule.style && rule.style.transition) {
              matchedTransition.push({ selector: rule.selectorText, transition: rule.style.transition });
            }
          }
        }
      } catch (e) {}
    }

    const darkElements = Array.from(document.querySelectorAll('.dark')).map(el => el.tagName + (el.id ? '#' + el.id : '') + '.' + Array.from(el.classList).join('.'));
    function getAllRules(rules) {
      let result = [];
      for (const r of Array.from(rules || [])) {
        if (r.cssRules) {
          result = result.concat(getAllRules(r.cssRules));
        } else if (r.selectorText) {
          result.push(r);
        }
      }
      return result;
    }

    const allRules = [];
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        allRules.push(...getAllRules(sheet.cssRules));
      } catch (e) {}
    }

    const matchedRootAll = [];
    for (const r of allRules) {
      try {
        if (rootDiv && r.selectorText && rootDiv.matches(r.selectorText)) {
          if (r.style && (r.style.backgroundColor || r.style.color)) {
            matchedRootAll.push({
              selector: r.selectorText,
              bg: r.style.backgroundColor,
              color: r.style.color,
            });
          }
        }
      } catch (e) {}
    }

    const styleTags = Array.from(document.querySelectorAll('style')).map(s => ({
      id: s.getAttribute('data-vite-dev-id') || s.id,
      textLength: s.textContent.length,
      sample: s.textContent.substring(0, 200)
    }));

    // Find any rule containing 2, 6, 23 or rgb(2 6 23
    const foundBgMatches = [];
    for (const s of Array.from(document.querySelectorAll('style'))) {
      if (s.textContent.includes('2 6 23') || s.textContent.includes('2, 6, 23')) {
        foundBgMatches.push({
          id: s.getAttribute('data-vite-dev-id'),
          sample: s.textContent.match(/.*(2 6 23|2, 6, 23).*/g)?.slice(0, 5)
        });
      }
    }

    const text = document.querySelector('style').textContent;
    const idx = text.indexOf('.dark\\:bg-slate-950');
    const mediaIdx = text.lastIndexOf('@media', idx);
    const mediaHeader = mediaIdx !== -1 ? text.substring(mediaIdx, mediaIdx + 80) : 'none';

    return {
      htmlClass: document.documentElement.className,
      mediaHeader,
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      rootDivBg: rootDiv ? window.getComputedStyle(rootDiv).backgroundColor : null,
    };
  });
  console.log('Computed styles info:', JSON.stringify(info, null, 2));
  await browser.close();
}

main().catch(console.error);
