#!/usr/bin/env node
/* ==========================================================================
   sync-blended-lessons.mjs — Blended Teaching Content → yasassri.me

   WHY THIS EXISTS
   The interactive lessons for MBI800, MBI802, MBI804 and MBI806B live in the
   "thisisnotalms" repo and are served from GitHub Pages
   (https://ureshan2011.github.io/thisisnotalms/). That repo keeps ONE course
   registry, src/content/courses.ts, which its own four course home pages are
   generated from. This script reads the same registry so the showcase on
   this site can never drift from what the lessons site actually publishes:
   publish a lesson there, re-run this, and it appears here.

   WHAT IT DOES
   1. Loads courses.ts — from a local checkout (--from) or, by default, raw
      from GitHub main. It is evaluated with Node's built-in TypeScript type
      stripping, not pattern-matched, so a reworded blurb can't break it.
      If both fail it falls back to the committed snapshot and says so.
   2. Writes content/blended-teaching.json, the snapshot every render uses.
   3. With --shots, opens every lesson in headless Chromium (Playwright) and
      saves a 640w and 1280w WebP of its first screen to
      assets/images/lessons/<slug>-<w>.webp. Without --shots existing images
      are kept; a lesson with no image renders a typographic poster instead.
   4. Re-renders the generated regions of lessons.html, index.html,
      teaching.html and llms-full.txt — everything between <!-- bt:NAME:start --> and
      <!-- bt:NAME:end -->. Hand-written copy outside the markers is never
      touched. A missing marker THROWS rather than silently skipping a page.

   Usage:
     node scripts/sync-blended-lessons.mjs                 # fetch + render
     node scripts/sync-blended-lessons.mjs --from ../thisisnotalms
     node scripts/sync-blended-lessons.mjs --shots         # + screenshots
     node scripts/sync-blended-lessons.mjs --shots --only scrum-simulation,mbi804
     node scripts/sync-blended-lessons.mjs --render-only   # snapshot → HTML

   Needs Node 22.6+ (type stripping). --shots also needs Playwright
   (`npm i -D playwright` then `npx playwright install chromium`). Behind a
   TLS-inspecting proxy that Chromium doesn't trust, add --route-via-node.
   ========================================================================== */

import { readFile, writeFile, mkdir, mkdtemp, rm, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SNAPSHOT = join(ROOT, 'content/blended-teaching.json');
// What the last --shots run found on each page: `offline` (the lessons site
// serves its "Platform Notice" there) or `gated` (it opens on a password).
const STATUS = join(ROOT, 'content/blended-status.json');
const SHOT_DIR = join(ROOT, 'assets/images/lessons');
const SHOT_WIDTHS = [640, 1280];

const LMS_BASE = 'https://ureshan2011.github.io/thisisnotalms/';
const RAW_REGISTRY =
  'https://raw.githubusercontent.com/ureshan2011/thisisnotalms/main/src/content/courses.ts';

/* Each course keeps the hue it has on the lessons site (src/styles/blend.css)
   so a reader crossing between the two sites never sees a course change
   colour. `on` is the 300 step, for text and dots on the dark surfaces. */
const ACCENTS = {
  planning: { c: '#514ca8', soft: '#eeeefb', on: '#a9a6ec' },
  default: { c: '#f4551e', soft: '#fff1ea', on: '#ff9a6b' },
  project: { c: '#ab355c', soft: '#fceef2', on: '#e889a6' },
  analytics: { c: '#0f766e', soft: '#eaf7f4', on: '#5fcfbd' },
  shared: { c: '#2f6bff', soft: '#e9f0ff', on: '#8fb0ff' },
};

/* One lesson per course for the "where to start" spotlight, each with a
   short hook. The hooks are the only lesson descriptions here that aren't
   the registry's own words, so they stick to what each blurb already says. */
const FEATURED = [
  {
    slug: 'scrum-simulation',
    hook: 'Watch a Scrum team build a parcel drone over three one-week Sprints, in 3D. Pause it, scrub back and forth, and click on anyone to see what their job is.',
  },
  {
    slug: 'security-lab',
    hook: "A shop I built to be insecure on purpose, with twenty vulnerabilities hidden in it. You find them, break in, and then explain how you'd fix each one.",
  },
  {
    slug: 'predicting-with-data',
    hook: 'Three ways to make a prediction, with no maths. Drag a line until it fits, grow a tree until it cheats, watch nine trees outvote it, and then run real Python in the page.',
  },
  {
    slug: 'intro-to-sisp',
    hook: 'Run a sales loop for twelve months and watch the obvious fix backfire. Then take a real outage apart, one layer of the Iceberg Model at a time.',
  },
];

/* The three windows fanned in the hero, front to back. */
const HERO_SLUGS = ['intro-to-sisp', 'scrum-simulation', 'intro-to-dbms'];

/* ------------------------------------------------------------------------ */

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

const log = (...m) => console.log('[blended]', ...m);

async function loadRegistrySource() {
  const from = opt('from');
  if (from) {
    const file = join(resolve(from), 'src/content/courses.ts');
    log('registry from', file);
    return { source: await readFile(file, 'utf8'), origin: `local:${file}` };
  }
  log('registry from', RAW_REGISTRY);
  const res = await fetch(RAW_REGISTRY);
  if (!res.ok) throw new Error(`GET ${RAW_REGISTRY} → ${res.status}`);
  return { source: await res.text(), origin: RAW_REGISTRY };
}

/* courses.ts only imports a type, which type stripping erases, so the file
   evaluates on its own. It runs in a child process because the flag has to
   be on the process that does the import. */
async function evaluateRegistry(source) {
  const dir = await mkdtemp(join(tmpdir(), 'blended-'));
  const file = join(dir, 'courses.mts');
  await writeFile(file, source);
  const script = `
    const m = await import(${JSON.stringify(pathToFileURL(file).href)});
    process.stdout.write(JSON.stringify({
      codes: m.COURSE_CODES, courses: m.COURSES, general: m.GENERAL_RESOURCES,
    }));`;
  try {
    const out = execFileSync(
      process.execPath,
      ['--experimental-strip-types', '--no-warnings', '--input-type=module', '-e', script],
      { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 },
    );
    return JSON.parse(out);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

function slugOf(lesson) {
  if (lesson.to) return lesson.to.replace(/^\//, '');
  return lesson.href.replace(/\.html$/, '');
}
function urlOf(lesson) {
  return lesson.to ? `${LMS_BASE}#${lesson.to}` : `${LMS_BASE}${lesson.href}`;
}
const firstSentence = (s) => (s.match(/^.*?[.?!](?=\s|$)/) || [s])[0];

function buildSnapshot(reg, origin) {
  const toLesson = (l, i) => ({
    id: l.id,
    slug: slugOf(l),
    n: i + 1,
    title: l.title,
    blurb: l.blurb,
    kind: l.kind,
    url: urlOf(l),
  });
  const courses = reg.codes.map((code) => {
    const c = reg.courses[code];
    const slug = code.toLowerCase();
    return {
      code,
      slug,
      name: c.name,
      accent: c.accent,
      lede: c.lede,
      summary: firstSentence(c.lede),
      // "Yasas Sri Wickramasinghe · 15 credits, Level 8 · …" — the name is
      // redundant on his own site; keep the course facts.
      facts: c.meta.split(' · ').slice(1).join(' · '),
      keyline: c.keyline,
      outcomes: c.outcomes,
      assessments: c.assessments,
      content: c.content,
      home: `${LMS_BASE}#/${slug}`,
      lessons: c.lessons.map(toLesson),
    };
  });
  return {
    syncedAt: new Date().toISOString().slice(0, 10),
    source: origin,
    base: LMS_BASE,
    courses,
    general: reg.general.map(toLesson),
  };
}

/* ------------------------------------------------------------------ shots */

async function captureShots(snap) {
  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    throw new Error('--shots needs Playwright: npm i -D playwright && npx playwright install chromium');
  }
  const only = opt('only')?.split(',').map((s) => s.trim());
  const targets = new Map();
  for (const c of snap.courses) {
    targets.set(c.slug, c.home);
    for (const l of c.lessons) targets.set(l.slug, l.url);
  }
  for (const l of snap.general) targets.set(l.slug, l.url);

  await mkdir(SHOT_DIR, { recursive: true });
  const status = await readStatus();
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  if (flag('route-via-node')) {
    // For sandboxes whose TLS-inspecting proxy Chromium doesn't trust but
    // Node does (NODE_EXTRA_CA_CERTS): Node makes every request, with
    // certificate checks intact, and hands the response to the page.
    await ctx.route(/^https?:/, async (route) => {
      const req = route.request();
      try {
        const res = await fetch(req.url(), {
          method: req.method(),
          headers: req.headers(),
          body: req.postDataBuffer() ?? undefined,
        });
        const headers = Object.fromEntries(res.headers);
        delete headers['content-encoding']; // fetch has already decoded it
        delete headers['content-length'];
        await route.fulfill({ status: res.status, headers, body: Buffer.from(await res.arrayBuffer()) });
      } catch {
        await route.abort();
      }
    });
  }
  const enc = await ctx.newPage();
  await enc.setContent('<!doctype html><title>enc</title>');
  const page = await ctx.newPage();

  for (const [slug, url] of targets) {
    if (only && !only.includes(slug)) continue;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      // Scroll-in reveals and web fonts settle within a couple of seconds.
      await page.waitForTimeout(2800);
      const state = await page.evaluate(() => {
        if (/Platform Notice/i.test(document.body.innerText)) return 'offline';
        const pw = [...document.querySelectorAll('input[type="password"]')];
        return pw.some((i) => i.offsetParent !== null) ? 'gated' : 'ok';
      });
      status.offline = status.offline.filter((x) => x !== slug);
      status.gated = status.gated.filter((x) => x !== slug);
      if (state !== 'ok') {
        // A password box or a notice is not a picture of the lesson; the
        // card falls back to its poster and says what the reader will meet.
        status[state].push(slug);
        for (const w of SHOT_WIDTHS) await unlink(join(SHOT_DIR, `${slug}-${w}.webp`)).catch(() => {});
        log(`shot skipped (${state})`, slug);
        continue;
      }
      const png = await page.screenshot({ type: 'png' });
      const out = await enc.evaluate(
        async ({ b64, widths }) => {
          const img = new Image();
          img.src = `data:image/png;base64,${b64}`;
          await img.decode();
          const res = {};
          for (const w of widths) {
            const h = Math.round((w * img.height) / img.width);
            const cv = document.createElement('canvas');
            cv.width = w;
            cv.height = h;
            const g = cv.getContext('2d');
            g.imageSmoothingQuality = 'high';
            g.drawImage(img, 0, 0, w, h);
            res[w] = cv.toDataURL('image/webp', 0.8).split(',')[1];
          }
          return res;
        },
        { b64: png.toString('base64'), widths: SHOT_WIDTHS },
      );
      for (const w of SHOT_WIDTHS) {
        await writeFile(join(SHOT_DIR, `${slug}-${w}.webp`), Buffer.from(out[w], 'base64'));
      }
      log('shot', slug);
    } catch (e) {
      console.warn('[blended] shot FAILED', slug, e.message);
      process.exitCode = 1;
    }
  }
  await browser.close();
  status.checkedAt = new Date().toISOString().slice(0, 10);
  status.offline.sort();
  status.gated.sort();
  await writeFile(STATUS, JSON.stringify(status, null, 2) + '\n');
  if (status.offline.length) log('offline on the lessons site:', status.offline.join(', '));
  if (status.gated.length) log('behind a password:', status.gated.join(', '));
}

async function readStatus() {
  try {
    const s = JSON.parse(await readFile(STATUS, 'utf8'));
    return { checkedAt: s.checkedAt, offline: s.offline || [], gated: s.gated || [] };
  } catch {
    return { checkedAt: null, offline: [], gated: [] };
  }
}

/* ----------------------------------------------------------------- render */

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
const pad = (n) => String(n).padStart(2, '0');
const prettyDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-NZ', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
let PAGE_STATE = new Map(); // slug → 'offline' | 'gated', from blended-status.json
const stateOf = (slug) => PAGE_STATE.get(slug) || 'ok';
const hasShot = (slug) => existsSync(join(SHOT_DIR, `${slug}-640.webp`));
const accentVars = (a) => {
  const x = ACCENTS[a] || ACCENTS.shared;
  return `--c:${x.c};--c-soft:${x.soft};--c-on:${x.on}`;
};

function allLessons(snap) {
  // A lesson listed under two courses (the study pack) is one lesson.
  const seen = new Map();
  for (const c of snap.courses) for (const l of c.lessons) if (!seen.has(l.url)) seen.set(l.url, { ...l, course: c });
  for (const l of snap.general) if (!seen.has(l.url)) seen.set(l.url, { ...l, course: null });
  return [...seen.values()];
}

function stats(snap) {
  const lessons = allLessons(snap);
  const hands = lessons.filter((l) => ['Lab', 'Practice'].includes(l.kind)).length;
  return { courses: snap.courses.length, lessons: lessons.length, hands };
}

/** A lesson's first screen — or, when there is no picture worth showing, a
 *  poster: the Blended rings drawn large in the course colour, with a note
 *  saying what the reader will meet (a password, an offline notice). */
function shot(slug, { code, sizes, eager = false, cls = 'bl-shot', uid = '' }) {
  const state = stateOf(slug);
  if (state === 'ok' && hasShot(slug)) {
    const src = (w) => `assets/images/lessons/${slug}-${w}.webp`;
    return `<img class="${cls}" src="${src(640)}" srcset="${src(640)} 640w, ${src(1280)} 1280w" sizes="${sizes}" width="640" height="400" alt="" ${
      eager ? 'fetchpriority="high"' : 'loading="lazy"'
    } decoding="async"/>`;
  }
  const note =
    state === 'offline' ? 'Not available right now' : state === 'gated' ? 'Opens with a class password' : code || '';
  const id = `lens-${slug}${uid}`;
  return `<span class="${cls} bl-poster" aria-hidden="true"><svg viewBox="0 0 200 120"><defs><clipPath id="${id}"><circle cx="114" cy="60" r="40"/></clipPath></defs><circle cx="86" cy="60" r="40"/><circle cx="114" cy="60" r="40"/><circle class="bl-poster-lens" cx="86" cy="60" r="40" clip-path="url(#${id})"/></svg><span>${esc(note)}</span></span>`;
}

const ARROW_OUT = '<span class="bl-arrow" aria-hidden="true">↗</span>';

function renderHeroStage(snap) {
  const bySlug = new Map(allLessons(snap).map((l) => [l.slug, l]));
  return HERO_SLUGS.map((slug, i) => {
    const l = bySlug.get(slug);
    if (!l) throw new Error(`hero lesson "${slug}" is not in the registry`);
    if (stateOf(slug) !== 'ok') throw new Error(`hero lesson "${slug}" is ${stateOf(slug)} — pick another in HERO_SLUGS`);
    return `
        <figure class="bl-window bl-window--${i + 1}" style="${accentVars(l.course?.accent || 'shared')}">
          <div class="bl-window-bar"><i></i><i></i><i></i><span>${esc(l.course?.code || '')} · ${esc(l.title)}</span></div>
          ${shot(slug, { code: l.course?.code, sizes: '(max-width: 940px) 88vw, 560px', eager: i === 0 })}
        </figure>`;
  }).join('');
}

function renderHeroCourses(snap) {
  return snap.courses
    .map(
      (c) => `
          <li><a href="#${c.slug}" style="${accentVars(c.accent)}"><i></i>${esc(c.code)}<span>${esc(c.name)}</span></a></li>`,
    )
    .join('');
}

function renderStats(snap) {
  const s = stats(snap);
  const row = (n, label, count = true) =>
    `
        <div class="bl-stat"><span class="bl-stat-n">${count ? `<span class="count" data-target="${n}">${n}</span>` : n}</span><span class="bl-stat-l">${label}</span></div>`;
  return (
    row(s.courses, 'Postgraduate courses') +
    row(s.lessons, 'Interactive lessons') +
    row(s.hands, 'Hands-on labs &amp; practice') +
    row('0', 'Logins or installs needed', false)
  );
}

function renderCourses(snap) {
  return snap.courses
    .map((c, i) => {
      const los = c.outcomes.length
        ? `<ul class="bl-course-los">${c.outcomes
            .map((o) => `<li><b>${esc(o.n)}</b>${esc(o.short)}</li>`)
            .join('')}</ul>`
        : `<ul class="bl-course-topics">${c.content
            .slice(0, 3)
            .map((t) => `<li>${esc(t)}</li>`)
            .join('')}</ul>`;
      return `
      <article class="bl-course reveal" style="${accentVars(c.accent)};--d:${(i * 0.06).toFixed(2)}s">
        <div class="bl-course-top">
          <span class="bl-code">${esc(c.code)}</span>
          <span class="bl-course-count"><b>${c.lessons.length}</b> lessons</span>
        </div>
        <h3>${esc(c.name)}</h3>
        <p class="bl-course-summary">${esc(c.summary)}</p>
        ${los}
        <p class="bl-course-facts">${esc(c.facts)}</p>
        <div class="bl-course-actions">
          <a class="bl-btn bl-btn--c" href="#${c.slug}">See the lessons <span aria-hidden="true">↓</span></a>
          <a class="bl-link" href="${esc(c.home)}" target="_blank" rel="noopener">Course home ${ARROW_OUT}</a>
        </div>
        <div class="bl-course-peek" aria-hidden="true">${shot(c.slug, { code: c.code, sizes: '(max-width: 760px) 80vw, 420px' })}</div>
      </article>`;
    })
    .join('');
}

function renderFeatured(snap) {
  const bySlug = new Map(allLessons(snap).map((l) => [l.slug, l]));
  return FEATURED.map(({ slug, hook }, i) => {
    const l = bySlug.get(slug);
    if (!l) throw new Error(`featured lesson "${slug}" is not in the registry`);
    if (stateOf(slug) !== 'ok') throw new Error(`featured lesson "${slug}" is ${stateOf(slug)} — pick another in FEATURED`);
    const c = l.course;
    return `
      <a class="bl-feature${i === 0 ? ' bl-feature--lead' : ''} reveal" style="${accentVars(c?.accent || 'shared')};--d:${(i * 0.06).toFixed(2)}s" href="${esc(l.url)}" target="_blank" rel="noopener">
        <span class="bl-feature-media">${shot(slug, {
          code: c?.code,
          sizes: i === 0 ? '(max-width: 940px) 92vw, 700px' : '(max-width: 940px) 92vw, 460px',
        })}</span>
        <span class="bl-feature-body">
          <span class="bl-feature-meta"><span class="bl-code">${esc(c?.code || 'Shared')}</span><span class="bl-kind">${esc(l.kind)}</span></span>
          <span class="bl-feature-title">${esc(l.title)}</span>
          <span class="bl-feature-hook">${esc(hook)}</span>
          <span class="bl-feature-cta">Open the lesson ${ARROW_OUT}</span>
        </span>
      </a>`;
  }).join('');
}

function renderFilters(snap) {
  const s = stats(snap);
  const kinds = [];
  for (const l of allLessons(snap)) if (!kinds.includes(l.kind)) kinds.push(l.kind);
  const order = ['Lesson', 'Lab', 'Practice', 'Video', 'Reference', 'Pack'];
  kinds.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  const course = (id, label, n, accent) =>
    `<button type="button" class="bl-pill${id === 'all' ? ' is-on' : ''}" data-course="${id}" aria-pressed="${id === 'all'}"${
      accent ? ` style="${accentVars(accent)}"` : ''
    }>${accent ? '<i></i>' : ''}${label}<span class="bl-pill-n">${n}</span></button>`;
  const kind = (id, label) =>
    `<button type="button" class="bl-chip${id === 'all' ? ' is-on' : ''}" data-kind="${id}" aria-pressed="${id === 'all'}">${label}</button>`;
  return `
        <div class="bl-pills" role="group" aria-label="Filter by course">
          ${course('all', 'All', s.lessons)}
          ${snap.courses.map((c) => course(c.code, c.code, c.lessons.length, c.accent)).join('\n          ')}
          ${course('shared', 'Shared', snap.general.length, 'shared')}
        </div>
        <div class="bl-toolbar-row">
          <div class="bl-chips" role="group" aria-label="Filter by format">
            ${kind('all', 'Every format')}
            ${kinds.map((k) => kind(k, k)).join('\n            ')}
          </div>
          <label class="bl-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
            <input type="search" placeholder="Search lessons — try “SQL” or “risk”" aria-label="Search lessons" autocomplete="off"/>
          </label>
        </div>`;
}

function lessonCard(l, code, accent) {
  const search = `${l.title} ${l.blurb} ${l.kind} ${code}`.toLowerCase();
  const state = stateOf(l.slug);
  // An offline lesson stays listed — it is part of the course — but is not a
  // link, because the lessons site would only show its platform notice.
  const tag = state === 'offline' ? 'div' : 'a';
  const attrs =
    state === 'offline'
      ? 'aria-disabled="true"'
      : `href="${esc(l.url)}" target="_blank" rel="noopener"`;
  const badge =
    state === 'offline'
      ? '<span class="bl-badge bl-badge--offline">Offline for now</span>'
      : state === 'gated'
        ? '<span class="bl-badge bl-badge--gated" title="Opens on a class password">Class password</span>'
        : '';
  const cta = state === 'offline' ? 'Not available right now' : `Open lesson ${ARROW_OUT}`;
  return `
          <${tag} class="bl-card${state === 'offline' ? ' is-offline' : ''}" ${attrs} data-course="${code === 'Shared' ? 'shared' : code}" data-kind="${esc(l.kind)}" data-search="${esc(search)}" style="${accentVars(accent)}">
            <span class="bl-card-media">${shot(l.slug, { code, uid: `-${code}`, sizes: '(max-width: 640px) 92vw, (max-width: 1040px) 46vw, 372px' })}</span>
            <span class="bl-card-body">
              <span class="bl-card-meta"><span class="bl-num">${pad(l.n)}</span><span class="bl-kind">${esc(l.kind)}</span>${badge}</span>
              <span class="bl-card-title">${esc(l.title)}</span>
              <span class="bl-card-blurb">${esc(l.blurb)}</span>
              <span class="bl-card-cta">${cta}</span>
            </span>
          </${tag}>`;
}

function renderLibrary(snap) {
  const groups = snap.courses.map(
    (c) => `
      <section class="bl-group" id="${c.slug}" data-group="${c.code}" style="${accentVars(c.accent)}" aria-labelledby="${c.slug}-title">
        <header class="bl-group-head">
          <span class="bl-group-code">${esc(c.code)}</span>
          <div class="bl-group-text">
            <h3 id="${c.slug}-title">${esc(c.name)}</h3>
            <p>${esc(c.keyline)}</p>
          </div>
          <a class="bl-link" href="${esc(c.home)}" target="_blank" rel="noopener">Course home ${ARROW_OUT}</a>
        </header>
        <div class="bl-grid">${c.lessons.map((l) => lessonCard(l, c.code, c.accent)).join('')}
        </div>
      </section>`,
  );
  groups.push(`
      <section class="bl-group" id="shared" data-group="shared" style="${accentVars('shared')}" aria-labelledby="shared-title">
        <header class="bl-group-head">
          <span class="bl-group-code">All four</span>
          <div class="bl-group-text">
            <h3 id="shared-title">Shared across every course</h3>
            <p>These two aren't tied to one course, so every class gets them.</p>
          </div>
        </header>
        <div class="bl-grid">${snap.general.map((l) => lessonCard(l, 'Shared', 'shared')).join('')}
        </div>
      </section>`);
  return groups.join('');
}

function renderJsonLd(snap) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Blended Teaching Content — interactive lessons by Dr. Yasas Sri Wickramasinghe',
    url: 'https://www.yasassri.me/lessons.html',
    numberOfItems: snap.courses.length,
    itemListElement: snap.courses.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        name: c.name,
        courseCode: c.code,
        description: c.summary,
        url: c.home,
        educationalLevel: 'Postgraduate (NZQF Level 8)',
        inLanguage: 'en',
        isAccessibleForFree: true,
        instructor: { '@id': 'https://www.yasassri.me/#yasas' },
        hasPart: c.lessons.map((l) => ({
          '@type': 'LearningResource',
          name: l.title,
          url: l.url,
          learningResourceType: l.kind,
          description: l.blurb,
          isAccessibleForFree: true,
        })),
      },
    })),
  };
  return `
<script type="application/ld+json">
${JSON.stringify(data, null, 2)}
</script>
`;
}

/* Home and Teaching carry the same teaser; `tone` picks the surface. */
function renderTeaser(snap, tone) {
  const s = stats(snap);
  const bySlug = new Map(allLessons(snap).map((l) => [l.slug, l]));
  const windows = HERO_SLUGS.map((slug, i) => {
    const l = bySlug.get(slug);
    return `
        <figure class="bt-win bt-win--${i + 1}" style="${accentVars(l.course?.accent || 'shared')}">
          <div class="bt-win-bar"><i></i><i></i><i></i><span>${esc(l.course?.code || '')} · ${esc(l.title)}</span></div>
          ${shot(slug, { code: l.course?.code, sizes: '(max-width: 940px) 80vw, 460px', cls: 'bt-win-img', uid: `-${tone}` })}
        </figure>`;
  }).join('');
  const rows = snap.courses
    .map(
      (c) => `
          <li><a href="lessons.html#${c.slug}" style="${accentVars(c.accent)}"><span class="bt-code">${esc(c.code)}</span><span class="bt-name">${esc(c.name)}</span><span class="bt-n">${c.lessons.length} lessons</span><span class="bt-go" aria-hidden="true">→</span></a></li>`,
    )
    .join('');
  return `
<section class="section bt-teaser bt-teaser--${tone}" id="blended-teaching" aria-labelledby="bt-teaser-title">
  <div class="container bt-teaser-grid">
    <div class="bt-teaser-copy reveal">
      <span class="bt-brand">${brandMark()}<span>Blended <b>Teaching</b> Content</span></span>
      <h2 id="bt-teaser-title">You can try my lessons <em>right now</em>.</h2>
      <p class="bt-teaser-lede">I've built ${s.lessons} interactive lessons for the ${WORDS[s.courses] || s.courses} Master of Business Informatics courses I teach. They run in your browser, they're free, and you don't have to sign up for anything.</p>
      <ul class="bt-rows">${rows}
      </ul>
      <div class="bt-teaser-actions">
        <a class="btn btn-solid" href="lessons.html">See all ${s.lessons} lessons <span class="arrow">→</span></a>
        <a class="link-arrow" href="lessons.html#scrum-studio">Or play with the 3D Scrum studio →</a>
      </div>
    </div>
    <a class="bt-stage reveal" style="--d:.12s" href="lessons.html" aria-label="See every lesson">${windows}
    </a>
  </div>
</section>
`;
}

/* The same index as plain Markdown for llms-full.txt, so AI assistants can
   cite a specific lesson rather than only the page. */
function renderLlms(snap) {
  const s = stats(snap);
  const line = (l) => {
    const st = stateOf(l.slug);
    const note = st === 'offline' ? ' (currently offline on the lessons site)' : st === 'gated' ? ' (opens with a class password)' : '';
    return `- ${l.title} (${l.kind})${note}: ${l.url} — ${l.blurb}`;
  };
  const courses = snap.courses
    .map(
      (c) => `### ${c.code} — ${c.name} (${c.lessons.length} lessons)

Course home: ${c.home}
${c.keyline}

${c.lessons.map(line).join('\n')}`,
    )
    .join('\n\n');
  return `
## Lessons — https://www.yasassri.me/lessons.html

Blended Teaching Content is the set of ${s.lessons} interactive lessons Dr. Yasas Sri Wickramasinghe built for the ${WORDS[s.courses] || s.courses} Master of Business Informatics (MBI) courses he teaches at Yoobee College: MBI800, MBI802, MBI804 and MBI806B. The lessons are hosted on his lessons site (${snap.base}) and open free in any browser, with no login and nothing to install; the lessons page on this site showcases and links to every one. Lessons are simulations, labs, practice sets and knowledge checks in which every wrong answer is explained. Synced from the lessons site's course registry on ${snap.syncedAt}.

${courses}

### Shared across every course

${snap.general.map(line).join('\n')}
`;
}

function brandMark(id = 'bt') {
  // The lessons site's own mark: two rings, the overlap filled — the
  // "blended" idea drawn literally.
  return `<svg class="bt-mark" width="28" height="28" viewBox="0 0 32 32" aria-hidden="true"><defs><clipPath id="${id}-lens"><circle cx="19.4" cy="16" r="6.6"/></clipPath></defs><rect width="32" height="32" rx="9" fill="currentColor"/><circle cx="12.6" cy="16" r="6.6" fill="none" stroke="var(--mark-ring,#fff)" stroke-width="1.9"/><circle cx="19.4" cy="16" r="6.6" fill="none" stroke="var(--mark-ring,#fff)" stroke-width="1.9"/><circle class="bt-mark-lens" cx="12.6" cy="16" r="6.6" clip-path="url(#${id}-lens)"/></svg>`;
}

/* --------------------------------------------------------------- markers */

async function render(snap) {
  const status = await readStatus();
  PAGE_STATE = new Map([
    ...status.offline.map((slug) => [slug, 'offline']),
    ...status.gated.map((slug) => [slug, 'gated']),
  ]);
  const s = stats(snap);
  const pages = {
    'lessons.html': {
      'hero-stage': renderHeroStage(snap),
      'hero-courses': renderHeroCourses(snap),
      stats: renderStats(snap),
      courses: renderCourses(snap),
      featured: renderFeatured(snap),
      filters: renderFilters(snap),
      library: renderLibrary(snap),
      jsonld: renderJsonLd(snap),
      'lesson-count': String(s.lessons),
      synced: `This list was last updated from the lessons site on ${prettyDate(snap.syncedAt)}.`,
    },
    'index.html': { 'home-teaser': renderTeaser(snap, 'dark') },
    'teaching.html': { 'teaching-teaser': renderTeaser(snap, 'light') },
    'llms-full.txt': { 'llms-lessons': renderLlms(snap) },
  };
  for (const [file, regions] of Object.entries(pages)) {
    const path = join(ROOT, file);
    let html = await readFile(path, 'utf8');
    for (const [name, content] of Object.entries(regions)) {
      // A region may appear more than once (the lesson count does); a
      // missing one throws rather than leaving a page silently stale.
      const re = new RegExp(`(<!-- bt:${name}:start -->)[\\s\\S]*?(<!-- bt:${name}:end -->)`, 'g');
      if (!re.test(html)) throw new Error(`${file}: missing <!-- bt:${name}:start/end --> markers`);
      html = html.replace(re, (_, a, b) => `${a}${content}${b}`);
    }
    await writeFile(path, html);
    log('rendered', file);
  }
}

/* ------------------------------------------------------------------ main */

async function main() {
  let snap;
  if (flag('render-only')) {
    snap = JSON.parse(await readFile(SNAPSHOT, 'utf8'));
    log('rendering from snapshot', snap.syncedAt);
  } else {
    try {
      const { source, origin } = await loadRegistrySource();
      snap = buildSnapshot(await evaluateRegistry(source), origin);
      await mkdir(dirname(SNAPSHOT), { recursive: true });
      await writeFile(SNAPSHOT, JSON.stringify(snap, null, 2) + '\n');
      const s = stats(snap);
      log(`snapshot: ${s.courses} courses, ${s.lessons} lessons →`, SNAPSHOT);
    } catch (e) {
      console.warn('[blended] could not load the registry:', e.message);
      if (!existsSync(SNAPSHOT)) throw e;
      console.warn('[blended] falling back to the committed snapshot');
      snap = JSON.parse(await readFile(SNAPSHOT, 'utf8'));
      process.exitCode = 1;
    }
  }
  if (flag('shots')) await captureShots(snap);
  await render(snap);
}

main().catch((e) => {
  console.error('[blended]', e.message);
  process.exit(1);
});
