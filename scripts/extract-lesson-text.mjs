#!/usr/bin/env node
/* ==========================================================================
   extract-lesson-text.mjs — the words of every Blended Teaching lesson

   WHY THIS EXISTS
   The 40 lessons live on the thisisnotalms site, which is hash-routed
   (…/thisisnotalms/#/scrum-simulation). Search engines ignore everything
   after the "#", so to Google all 40 lessons are one page. This script opens
   each lesson in headless Chromium, reads its rendered text in reading order
   (headings, paragraphs, lists, tables, code, embedded videos) and saves it
   to content/lesson-text/<slug>.json. build-lesson-pages.mjs turns those
   snapshots into real, crawlable pages at /lessons/<slug>.html, each with a
   button into the interactive lesson.

   Interactive controls (buttons, inputs, canvases, SVG diagrams) are skipped:
   the static page describes the lesson, the lessons site is where you use it.
   Slide decks that render one slide at a time are paged through with the
   arrow keys until no new text appears.

   Usage:
     node scripts/extract-lesson-text.mjs                       # live site
     node scripts/extract-lesson-text.mjs --base http://localhost:8766/thisisnotalms/
     node scripts/extract-lesson-text.mjs --only scrum-simulation,er-mapping

     node scripts/extract-lesson-text.mjs --decks --site http://localhost:8765/

   --decks reads this site's own ten lesson decks instead (app/#/lessons/deck/
   <slug>, built from app/lessons-src) into content/lesson-text/decks/, for
   build-seo-pages.mjs. --site is where this site is served, e.g.
   `python3 -m http.server` at the repo root.

   --base points at any copy of the lessons site, e.g. a local `npm run build`
   of thisisnotalms served under /thisisnotalms/. Needs Playwright
   (`npm i --no-save playwright`); add --route-via-node behind a
   TLS-inspecting proxy that Chromium doesn't trust.
   ========================================================================== */

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SNAPSHOT = join(ROOT, 'content/blended-teaching.json');
const STATUS = join(ROOT, 'content/blended-status.json');
const OUT_DIR = join(ROOT, 'content/lesson-text');

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const log = (...m) => console.log('[lesson-text]', ...m);

/* A deck that shows under this many words is paged through slide by slide. */
const THIN = 400;

/* Runs inside the page. Returns the lesson as a flat list of blocks. */
function readLesson() {
  const SKIP = [
    'button', 'svg', 'canvas', 'input', 'select', 'textarea', 'label', 'script', 'style',
    'noscript', 'nav', 'footer', 'form', '[role="navigation"]', '[role="tablist"]',
    '[aria-hidden="true"]', '[hidden]', '.sst__stage', '.sst__tl', '.sr-only',
  ].join(',');
  const BLOCK = /^(ADDRESS|ARTICLE|ASIDE|BLOCKQUOTE|DD|DETAILS|DIV|DL|DT|FIELDSET|FIGCAPTION|FIGURE|H[1-6]|HEADER|LI|MAIN|OL|P|PRE|SECTION|SUMMARY|TABLE|UL)$/;
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const tidy = (s) => s.replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim();

  // Inline HTML with only strong/em/code kept, so the page can restyle it.
  const inline = (el) => {
    let s = '';
    for (const n of el.childNodes) {
      if (n.nodeType === 3) { s += esc(n.data); continue; }
      if (n.nodeType !== 1 || n.matches(SKIP)) continue;
      if (n.tagName === 'BR') { s += ' '; continue; }
      const inner = inline(n);
      if (!inner.trim()) continue;
      const t = n.tagName;
      // Chips and flex rows are spans too; only true inline text runs on.
      const pad = BLOCK.test(t) || !/^inline$|^contents$/.test(getComputedStyle(n).display) ? ' ' : '';
      if (t === 'B' || t === 'STRONG') s += `<strong>${inner.trim()}</strong> `;
      else if (t === 'EM' || t === 'I') s += `<em>${inner.trim()}</em> `;
      else if (t === 'CODE' || t === 'KBD') s += `<code>${inner.trim()}</code> `;
      else s += pad + inner + pad;
    }
    return s;
  };
  const html = (el) => tidy(inline(el)).replace(/<\/(strong|em|code)> ([,.;:!?)])/g, '</$1>$2');
  const hasBlockChild = (el) => [...el.children].some((c) => BLOCK.test(c.tagName) && !c.matches(SKIP));
  const isMono = (el) => /mono|courier|consolas|menlo/i.test(getComputedStyle(el).fontFamily);
  // Small capitals over a section ("SECTION 3.1 · THE SIMULATION").
  const isEyebrow = (el) => getComputedStyle(el).textTransform === 'uppercase' && el.textContent.trim().length < 70;
  // Largest type inside a block, so a slide title set in a <div> can be told
  // from body text (see the heading promotion in main()).
  const px = (c) => Math.round(Math.max(...[c, ...c.querySelectorAll('*')].map((e) => parseFloat(getComputedStyle(e).fontSize) || 0)));
  const textBlock = (c) => {
    if (isEyebrow(c) && !c.innerText.trim().includes('\n')) return { t: 'eyebrow', html: html(c), px: px(c) };
    if (isMono(c)) return { t: 'pre', text: c.innerText.replace(/\s+$/, '') };
    return { t: 'p', html: html(c), px: px(c) };
  };

  const blocks = [];
  const videos = [];
  const push = (b) => {
    const text = b.items ? b.items.join(' ') : b.rows ? b.rows.flat().join(' ') : b.html ?? b.text;
    const plain = text ? text.replace(/<[^>]+>/g, '').trim() : '';
    if (plain && !/^©|All Rights Reserved$/i.test(plain)) blocks.push(b);
  };

  const walk = (el) => {
    for (const c of el.children) {
      if (c.matches(SKIP)) continue;
      const t = c.tagName;
      if (/^H[1-6]$/.test(t)) push({ t: 'h', level: +t[1], html: html(c) });
      else if (t === 'P' || t === 'FIGCAPTION') push(textBlock(c));
      else if (t === 'BLOCKQUOTE') push({ t: 'quote', html: html(c) });
      else if (t === 'PRE') push({ t: 'pre', text: c.innerText.replace(/\s+$/, '') || c.textContent });
      else if (t === 'UL' || t === 'OL') {
        const items = [...c.children].filter((li) => li.tagName === 'LI' && !li.matches(SKIP)).map(html).filter(Boolean);
        if (items.length) push({ t: t.toLowerCase(), items });
      } else if (t === 'DL') {
        const items = [];
        for (const row of c.querySelectorAll('dt')) {
          const dd = row.nextElementSibling?.tagName === 'DD' ? row.nextElementSibling : null;
          items.push(`<strong>${html(row)}</strong> ${dd ? html(dd) : ''}`.trim());
        }
        if (!items.length) walk(c);
        else push({ t: 'ul', items });
      } else if (t === 'TABLE') {
        const rows = [...c.rows].map((r) => [...r.cells].map(html));
        if (rows.length) push({ t: 'table', rows, head: !!c.tHead });
      } else if (t === 'IFRAME') {
        const src = c.getAttribute('src') || '';
        const m = src.match(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{11})/);
        if (m) videos.push({ id: m[1], title: c.getAttribute('title') || '' });
      } else if (t === 'DETAILS') {
        const s = c.querySelector('summary');
        if (s) push({ t: 'h', level: 4, html: html(s) });
        walk(c);
      } else if (!hasBlockChild(c) && BLOCK.test(t)) {
        // A leaf <div> of running text, as slide decks and cards use.
        if (c.textContent.trim().length >= 24) push(textBlock(c));
      } else walk(c);
    }
  };
  const root = document.querySelector('main') || document.body;
  walk(root);
  // Videos sit behind a thumbnail button until clicked, so read the thumbnail.
  for (const img of root.querySelectorAll('img[src*="ytimg.com/vi/"], img[src*="youtube.com/vi/"]')) {
    const id = img.getAttribute('src').match(/\/vi\/([\w-]{11})\//)?.[1];
    const btn = img.closest('button');
    const title = (btn?.getAttribute('aria-label') || img.alt || '').replace(/^Play video:\s*/i, '');
    if (id && !videos.some((v) => v.id === id)) videos.push({ id, title });
  }
  return { blocks, videos, title: document.title };
}

async function main() {
  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    throw new Error('needs Playwright: npm i --no-save playwright');
  }
  const snap = JSON.parse(await readFile(SNAPSHOT, 'utf8'));
  const status = JSON.parse(await readFile(STATUS, 'utf8'));
  const skip = new Set([...(status.offline || []), ...(status.gated || [])]);
  const base = opt('base') || snap.base;
  const only = opt('only')?.split(',').map((s) => s.trim());

  const targets = new Map();
  const decks = flag('decks');
  const outDir = decks ? join(OUT_DIR, 'decks') : OUT_DIR;
  if (decks) {
    const site = (opt('site') || 'https://www.yasassri.me/').replace(/\/?$/, '/');
    const files = await readdir(join(ROOT, 'app/lessons-src/src/lessons'));
    for (const f of files.filter((f) => /^[a-z0-9-]+\.tsx$/.test(f))) {
      const slug = f.replace(/\.tsx$/, '');
      targets.set(slug, { slug, url: `${site}app/#/lessons/deck/${slug}` });
    }
  } else {
    for (const c of snap.courses) for (const l of c.lessons) targets.set(l.slug, l);
    for (const l of snap.general) targets.set(l.slug, l);
  }

  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  if (flag('route-via-node')) {
    await ctx.route(/^https?:/, async (route) => {
      const req = route.request();
      try {
        const res = await fetch(req.url(), { method: req.method(), headers: req.headers(), body: req.postDataBuffer() ?? undefined });
        const headers = Object.fromEntries(res.headers);
        delete headers['content-encoding'];
        delete headers['content-length'];
        await route.fulfill({ status: res.status, headers, body: Buffer.from(await res.arrayBuffer()) });
      } catch {
        await route.abort();
      }
    });
  }
  const page = await ctx.newPage();

  for (const [slug, l] of targets) {
    if (only && !only.includes(slug)) continue;
    if (!decks && skip.has(slug)) { log('skipped (offline or behind a password)', slug); continue; }
    const url = decks ? l.url : l.url.replace(snap.base, base);
    try {
      await page.goto('about:blank');
      await page.goto(url, { waitUntil: 'load', timeout: 60000 });
      await page.waitForTimeout(3000);
      // Lazy sections mount as they scroll into view.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 80));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(800);
      // A class-password gate, not an activity that happens to have a password box.
      const locked = await page.evaluate(() =>
        [...document.querySelectorAll('input[type="password"]')].some((i) => i.offsetParent !== null) &&
        document.body.innerText.split(/\s+/).length < 250);
      if (locked) { log('skipped (behind a password)', slug); continue; }
      let { blocks, videos, title } = await page.evaluate(readLesson);

      const words = (bs) => bs.map((b) => JSON.stringify(b)).join(' ').replace(/<[^>]+>/g, ' ').split(/\s+/).length;
      if (words(blocks) < THIN) {
        // Probably a deck: page through it and keep every slide's text.
        const keyOf = (b) => JSON.stringify({ ...b, px: undefined });
        const seen = new Set(blocks.map(keyOf));
        let quiet = 0;
        for (let i = 0; i < 80 && quiet < 3; i++) {
          await page.keyboard.press('ArrowRight');
          await page.waitForTimeout(350);
          const next = await page.evaluate(readLesson);
          let added = 0;
          for (const b of next.blocks) {
            const k = keyOf(b);
            if (!seen.has(k)) { seen.add(k); blocks.push(b); added++; }
          }
          for (const v of next.videos) if (!videos.some((x) => x.id === v.id)) videos.push(v);
          quiet = added ? 0 : quiet + 1;
        }
      }

      // The same sentence rendered twice (a caption and its panel) is kept once.
      const seen = new Set();
      blocks = blocks.filter((b) => {
        const k = JSON.stringify({ ...b, level: undefined, px: undefined });
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });

      // Slide decks set their titles in large <div>s, not headings. With next
      // to no real headings, text far larger than the body is a title.
      if (blocks.filter((b) => b.t === 'h').length < 4) {
        const sizes = blocks.filter((b) => b.t === 'p' && b.px).map((b) => b.px).sort((a, b) => a - b);
        const body = sizes[Math.floor(sizes.length / 2)] || 16;
        const short = (h) => h.replace(/<[^>]+>/g, '').split(/\s+/).length <= 12;
        blocks = blocks.map((b) =>
          (b.t === 'p' || b.t === 'eyebrow') && b.px >= body * 1.8 && short(b.html) ? { t: 'h', level: 2, html: b.html } : b);
      }
      for (const b of blocks) delete b.px;

      const out = { slug, url: l.url, title: l.title || title, pageTitle: title, extractedAt: new Date().toISOString().slice(0, 10), words: words(blocks), videos, blocks };
      await writeFile(join(outDir, `${slug}.json`), JSON.stringify(out, null, 1) + '\n');
      log(`${slug}: ${out.words} words, ${blocks.length} blocks, ${videos.length} videos`);
    } catch (e) {
      console.warn('[lesson-text] FAILED', slug, e.message);
      process.exitCode = 1;
    }
  }
  await browser.close();
}

main().catch((e) => {
  console.error('[lesson-text]', e.message);
  process.exit(1);
});
