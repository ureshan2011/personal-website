// Rebuilds the NZGDC 2026 talk images from the HTML templates next to this file:
//   six-rules.html     → assets/files/nzgdc-2026/six-rules-shared-worlds.png (1080×1350)
//   closing-slide.html → assets/files/nzgdc-2026/closing-slide-nzgdc-2026.png (1920×1080)
// Needs Playwright and the repo root served on http://localhost:8765
// (e.g. `python3 -m http.server 8765` from the repo root).
import { chromium } from 'playwright';

const base = 'http://localhost:8765/scripts/nzgdc-2026/';
const out = 'assets/files/nzgdc-2026/';
const jobs = [
  ['six-rules.html', 'six-rules-shared-worlds.png', 1080, 1350],
  ['closing-slide.html', 'closing-slide-nzgdc-2026.png', 1920, 1080],
];
const browser = await chromium.launch();
for (const [src, png, width, height] of jobs) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(base + src, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out + png });
  await page.close();
  console.log('Wrote ' + out + png);
}
await browser.close();
