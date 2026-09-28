// Rebuilds the speaker one-sheet PDF and its preview image from one-sheet.html.
// Needs Playwright and the repo root served on http://localhost:8765
// (e.g. `python3 -m http.server 8765` from the repo root).
import { chromium } from 'playwright';

const base = 'http://localhost:8765/';
const out = 'assets/files/speaker-kit/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
await page.goto(base + 'scripts/speaker-one-sheet/one-sheet.html', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: out + 'yasas-sri-wickramasinghe-speaker-one-sheet.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
await page.screenshot({ path: out + 'speaker-one-sheet-preview.jpg', type: 'jpeg', quality: 86, clip: { x: 0, y: 0, width: 794, height: 596 } });
await browser.close();
console.log('Wrote one-sheet PDF and preview');
