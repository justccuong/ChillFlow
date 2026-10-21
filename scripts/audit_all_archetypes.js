import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve(__dirname, '../../screenshots');
const ARTIFACT_DIR = 'C:\\Users\\ROG_Zephyrus_G14\\.gemini\\antigravity\\brain\\614d51b3-f094-4082-8727-65ba246d3e6f';

const ARCHETYPES = [
  { id: 'ai-tech', label: 'Công nghệ & AI', layout: 'conference' },
  { id: 'marketing', label: 'Marketing & Growth', layout: 'masterclass' },
  { id: 'developer', label: 'Lập trình & Kỹ thuật', layout: 'terminal' },
  { id: 'startup', label: 'Startup & Kinh doanh', layout: 'executive' },
  { id: 'design', label: 'Thiết kế & Sáng tạo', layout: 'creative' },
  { id: 'education', label: 'Đào tạo & Workshop', layout: 'academy' },
];

function copyToArtifact(fileName) {
  try {
    const src = path.join(OUTPUT_DIR, fileName);
    const dst = path.join(ARTIFACT_DIR, fileName);
    if (fs.existsSync(src) && fs.existsSync(ARTIFACT_DIR)) {
      fs.copyFileSync(src, dst);
      console.log(`Copied ${fileName} to brain artifact dir.`);
    }
  } catch (e) {
    console.error(`Error copying ${fileName}:`, e);
  }
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox'],
    defaultViewport: { width: 1440, height: 950 },
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // If on form, submit to enter preview
  const isOnForm = await page.evaluate(() => !document.querySelector('main'));
  if (isOnForm) {
    console.log('Submitting initial form to enter Preview...');
    await page.evaluate(() => {
      const f = document.querySelector('form');
      if (f) f.requestSubmit();
    });
    await page.waitForSelector('main', { timeout: 15000 });
    await new Promise(r => setTimeout(r, 1000));
  }

  const results = [];

  for (const arc of ARCHETYPES) {
    console.log(`\n=== Testing Archetype: ${arc.id} (${arc.layout}) ===`);

    // Select the category in Template dropdown
    await page.evaluate((catId) => {
      const select = document.querySelector('select');
      if (select) {
        select.value = catId;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, arc.id);

    await new Promise(r => setTimeout(r, 800));

    // Scroll to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 400));

    // Inspect layout attribute
    const detectedLayout = await page.evaluate(() => {
      const hero = document.querySelector('section[data-archetype]');
      return hero ? hero.getAttribute('data-archetype') : 'not found';
    });

    console.log(`Expected layout: ${arc.layout}, Detected: ${detectedLayout}`);

    // Screenshot Hero
    const heroFileName = `archetype_${arc.id}_hero.png`;
    const heroFilePath = path.join(OUTPUT_DIR, heroFileName);
    await page.screenshot({ path: heroFilePath, clip: { x: 0, y: 0, width: 1440, height: 900 } });
    copyToArtifact(heroFileName);

    // Find the specific archetype section
    await page.evaluate(() => {
      // Find the specific section for this archetype
      const allSections = document.querySelectorAll('section');
      for (const s of allSections) {
        const text = s.textContent || '';
        if (
          text.includes('Con Số Biết Nói') ||
          text.includes('Hệ Sinh Thái Công Nghệ') ||
          text.includes('Lộ Trình Thẩm Định') ||
          text.includes('Quy Trình Sáng Tạo') ||
          text.includes('Khung Chương Trình') ||
          text.includes('Lộ Trình Học Chi Tiết')
        ) {
          s.scrollIntoView({ behavior: 'instant', block: 'center' });
          return;
        }
      }
      // fallback
      window.scrollTo(0, 1400);
    });
    await new Promise(r => setTimeout(r, 600));

    const sectionFileName = `archetype_${arc.id}_section.png`;
    const sectionFilePath = path.join(OUTPUT_DIR, sectionFileName);
    await page.screenshot({ path: sectionFilePath });
    copyToArtifact(sectionFileName);

    results.push({
      id: arc.id,
      layout: arc.layout,
      detectedLayout,
      matches: arc.layout === detectedLayout,
    });
  }

  console.log('\n=== AUDIT SUMMARY ===');
  console.table(results);

  await browser.close();
}

run().catch((e) => {
  console.error('Audit run error:', e);
  process.exit(1);
});
