// Renders the NZGDC 2026 Instagram post from post.html.
// Needs Playwright and the repo root served on http://localhost:8765
// (e.g. `python3 -m http.server 8765` from the repo root).
// Writes a 1080×1350 PNG for upload and a 2160×2700 JPG for other uses.
import { chromium } from 'playwright';

const base = 'http://localhost:8765/';
const out = 'assets/files/nzgdc-2026/';
const browser = await chromium.launch();
for (const [scale, file, opts] of [
  [1, 'instagram-post-nzgdc-2026.png', { type: 'png' }],
  [2, 'instagram-post-nzgdc-2026@2x.jpg', { type: 'jpeg', quality: 92 }],
]) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: scale });
  await page.goto(base + 'scripts/nzgdc-instagram/post.html', { waitUntil: 'networkidle' });
  await page.waitForSelector('html[data-ready="1"]');
  await page.locator('#post').screenshot({ path: out + file, ...opts });
  await page.close();
}
await browser.close();
console.log('Wrote Instagram post PNG and @2x JPG');
