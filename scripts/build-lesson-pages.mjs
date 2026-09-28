#!/usr/bin/env node
/* ==========================================================================
   build-lesson-pages.mjs — one crawlable page per Blended Teaching lesson

   WHY THIS EXISTS
   The lessons site is hash-routed, so Google sees its 40 lessons as a single
   URL. This writes a real page for each lesson at /lessons/<slug>.html: the
   lesson's own words (from content/lesson-text/, see extract-lesson-text.mjs),
   its screenshot, its course, the lessons either side of it, LearningResource
   and BreadcrumbList structured data, and a button into the interactive
   version. lessons.html links its cards here, so the site's internal links
   point at pages that can rank.

   WHAT GETS A PAGE
   - Lessons with at least MIN_WORDS of extracted text that are neither
     offline nor behind a class password (content/blended-status.json).
   - Not the eight lessons that already have a page on this site at
     /app/lessons/<slug>.html (the ER and SQL decks and their friends, built
     by build-seo-pages.mjs): two pages with the same lesson would compete
     with each other, so those cards link to the existing page instead.
   - A lesson listed under two courses, or published twice under two slugs
     with the same content (the Business Model Canvas), gets one page that
     names both courses.

   Usage:
     node scripts/build-lesson-pages.mjs            # write pages + sitemap
     node scripts/build-lesson-pages.mjs --dry-run

   sync-blended-lessons.mjs runs this after every sync, so a new lesson
   appears here once its text has been extracted.
   ========================================================================== */

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, unlinkSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { pageShell, crumbs, breadcrumbLd, esc, SITE_URL } from './lib/site-shell.mjs';
import { renderBlocks, plain } from './lib/lesson-blocks.mjs';
import { accentVars } from './lib/blended.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TEXT_DIR = join(ROOT, 'content/lesson-text');
const OUT_DIR = join(ROOT, 'lessons');
const SHOT_DIR = join(ROOT, 'assets/images/lessons');
const DECK_DIR = join(ROOT, 'app/lessons-src/src/lessons');

const MIN_WORDS = 150;

const readJson = (p, fallback) => {
  try {
    return JSON.parse(readFileSync(p, 'utf8'));
  } catch {
    return fallback;
  }
};

/* Slugs that already have a page at /app/lessons/<slug>.html. */
export function deckSlugs() {
  if (!existsSync(DECK_DIR)) return new Set();
  return new Set(readdirSync(DECK_DIR).filter((f) => /^[a-z0-9-]+\.tsx$/.test(f)).map((f) => f.replace(/\.tsx$/, '')));
}

const textOf = (slug) => readJson(join(TEXT_DIR, `${slug}.json`), null);

/* Two lesson texts that share nearly every block are the same lesson. */
function sameLesson(a, b) {
  if (!a || !b) return false;
  const key = (x) => JSON.stringify(x);
  const sa = new Set(a.blocks.map(key));
  const shared = b.blocks.filter((x) => sa.has(key(x))).length;
  return shared / Math.max(a.blocks.length, b.blocks.length) >= 0.9;
}

/* Every lesson, one entry per page, with the courses it appears in. */
export function planPages(snap, status = readJson(join(ROOT, 'content/blended-status.json'), {})) {
  const blocked = new Set([...(status.offline || []), ...(status.gated || [])]);
  const decks = deckSlugs();
  const bySlug = new Map();
  const add = (l, course) => {
    const e = bySlug.get(l.slug) || { ...l, courses: [] };
    e.courses.push({ code: course?.code || 'Shared', name: course?.name || 'All four courses', slug: course?.slug, accent: course?.accent || 'shared', n: l.n, total: course ? course.lessons.length : snap.general.length });
    bySlug.set(l.slug, e);
  };
  for (const c of snap.courses) for (const l of c.lessons) add(l, c);
  for (const l of snap.general) add(l, null);

  // Fold a lesson published twice under two slugs into the first.
  const alias = new Map();
  const entries = [...bySlug.values()];
  for (let i = 0; i < entries.length; i++) {
    for (let j = 0; j < i; j++) {
      if (alias.has(entries[j].slug) || entries[i].title !== entries[j].title) continue;
      if (sameLesson(textOf(entries[j].slug), textOf(entries[i].slug))) {
        alias.set(entries[i].slug, entries[j].slug);
        entries[j].courses.push(...entries[i].courses);
        bySlug.delete(entries[i].slug);
        break;
      }
    }
  }

  const href = new Map(); // slug → site-root-relative href, or the lessons-site URL
  for (const e of bySlug.values()) {
    e.text = textOf(e.slug);
    if (decks.has(e.slug)) e.home = `app/lessons/${e.slug}.html`;
    // A near-empty page (a video list that loads from the database) would
    // be thin content; its card keeps linking to the lessons site instead.
    else if (!blocked.has(e.slug) && e.text && e.text.words >= MIN_WORDS) e.home = `lessons/${e.slug}.html`;
    e.page = e.home?.startsWith('lessons/') || false;
    href.set(e.slug, e.home || null);
  }
  for (const [from, to] of alias) href.set(from, href.get(to));
  return { pages: [...bySlug.values()], href, alias };
}

/* ----------------------------------------------------------------- render */

const shotPath = (slug, w) => `assets/images/lessons/${slug}-${w}.webp`;
const hasShot = (slug) => existsSync(join(SHOT_DIR, `${slug}-640.webp`));

const readingMinutes = (words) => Math.max(3, Math.round(words / 210));

const INFO_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>';

/* The bullets under "By the end of this lesson you can…", if the lesson has them. */
function objectivesOf(blocks) {
  const i = blocks.findIndex((b) => b.t === 'eyebrow' && /by the end|you will|you can|objectives|outcomes/i.test(plain(b.html)));
  const list = i >= 0 ? blocks.slice(i + 1, i + 3).find((b) => b.t === 'ul' || b.t === 'ol') : null;
  return list ? list.items.map(plain) : [];
}

function card(e, fromDepth, primaryCode) {
  const up = '../'.repeat(fromDepth);
  const c = e.courses.find((x) => x.code === primaryCode) || e.courses[0];
  const href = e.home ? up + e.home : e.url;
  const ext = !e.home;
  const media = hasShot(e.slug)
    ? `<img src="${up}${shotPath(e.slug, 640)}" width="640" height="400" alt="" loading="lazy" decoding="async"/>`
    : `<b>${esc(c.code)}</b>`;
  return `
        <a class="lp-card" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''} style="${accentVars(c.accent)}">
          <span class="lp-card-media">${media}</span>
          <span class="lp-card-body">
            <span class="lp-card-meta">${esc(c.code)} · ${esc(e.kind)}</span>
            <span class="lp-card-title">${esc(e.title)}</span>
            <span class="lp-card-blurb">${esc(e.blurb)}</span>
            <span class="lp-card-cta">${ext ? 'Open on the lessons site ↗' : 'Read the lesson →'}</span>
          </span>
        </a>`;
}

export function renderLessonPage(e, snap, plan) {
  const depth = 1;
  const up = '../';
  const primary = e.courses[0];
  const course = snap.courses.find((c) => c.code === primary.code);
  const canonical = `${SITE_URL}/lessons/${e.slug}.html`;
  const { html, toc, words } = renderBlocks(e.text.blocks, { title: e.title, lead: e.blurb });
  const minutes = readingMinutes(words);
  const objectives = objectivesOf(e.text.blocks);
  const image = hasShot(e.slug) ? `${SITE_URL}/${shotPath(e.slug, 1280)}` : `${SITE_URL}/assets/images/og-card.png`;
  const codes = e.courses.map((c) => c.code);
  const title = `${e.title} | ${codes.join(' & ')} Lesson`;
  const description = e.blurb.length > 160 ? `${e.blurb.slice(0, 157).replace(/\s+\S*$/, '')}…` : e.blurb;

  // The lessons either side, and the rest of the course.
  const siblings = (course ? course.lessons : snap.general)
    .map((l) => plan.pages.find((p) => p.slug === (plan.alias.get(l.slug) || l.slug)))
    .filter((p, i, a) => p && a.indexOf(p) === i);
  const at = siblings.indexOf(e);
  const prev = at > 0 ? siblings[at - 1] : null;
  const next = at >= 0 && at < siblings.length - 1 ? siblings[at + 1] : null;
  const more = siblings.filter((p) => p !== e).slice(0, 6);
  const pagerLink = (p, label, cls) => {
    if (!p) return '';
    const href = p.home ? up + p.home : p.url;
    return `<a class="${cls}" href="${esc(href)}"${p.home ? '' : ' target="_blank" rel="noopener"'}><small>${label}</small><b>${esc(p.title)}</b></a>`;
  };

  const courseCrumb = course ? [[course.code, `lessons.html#${course.slug}`]] : [['Shared', 'lessons.html#shared']];
  const crumbPairs = [['Home', 'index.html'], ['Teaching', 'teaching.html'], ['Lessons', 'lessons.html'], ...courseCrumb, [e.title, '']];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      '@id': `${canonical}#lesson`,
      name: e.title,
      description: e.blurb,
      url: canonical,
      image,
      learningResourceType: e.kind,
      educationalLevel: 'Postgraduate (NZQF Level 8)',
      inLanguage: 'en',
      isAccessibleForFree: true,
      timeRequired: `PT${minutes}M`,
      ...(objectives.length ? { teaches: objectives } : {}),
      dateModified: e.text.extractedAt,
      author: { '@type': 'Person', '@id': `${SITE_URL}/#yasas`, name: 'Dr. Yasas Sri Wickramasinghe', url: `${SITE_URL}/` },
      isPartOf: e.courses
        .filter((c) => c.slug)
        .map((c) => {
          const full = snap.courses.find((x) => x.code === c.code);
          return {
            '@type': 'Course',
            name: full.name,
            courseCode: full.code,
            description: full.summary,
            url: `${SITE_URL}/lessons.html#${full.slug}`,
            provider: { '@type': 'Person', '@id': `${SITE_URL}/#yasas`, name: 'Dr. Yasas Sri Wickramasinghe' },
          };
        }),
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    },
    breadcrumbLd(crumbPairs.map(([name, href], i) => [name, i === crumbPairs.length - 1 ? canonical : `${SITE_URL}/${href}`.replace(/\/index\.html$/, '/')])),
  ];

  const tags = [
    ...e.courses.map((c) =>
      c.slug
        ? `<a class="lp-tag lp-tag--course" href="${up}lessons.html#${c.slug}" style="${accentVars(c.accent)}">${esc(c.code)}</a>`
        : `<span class="lp-tag lp-tag--course">All courses</span>`,
    ),
    `<span class="lp-tag">${esc(e.kind)}</span>`,
  ].join('');

  const facts = [
    course ? `<span><b>${esc(course.name)}</b></span>` : '',
    `<span>${minutes} min read</span>`,
    `<span>Free, no login</span>`,
  ].join('');

  const videos = e.text.videos?.length
    ? `
<section class="lp-section soft">
  <div class="container">
    <div class="lp-section-head"><h2>Videos in this lesson</h2><p>They play inside the interactive lesson; here they open on YouTube.</p></div>
    <div class="lp-videos">${e.text.videos
      .map(
        (v) => `
      <a class="lp-video" href="https://www.youtube.com/watch?v=${esc(v.id)}" target="_blank" rel="noopener"><img src="https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg" width="480" height="360" alt="" loading="lazy" decoding="async"/><span>${esc(v.title || 'Watch on YouTube')}</span></a>`,
      )
      .join('')}
    </div>
  </div>
</section>`
    : '';

  const body = `
<header class="lp-hero" style="${accentVars(primary.accent)}">
  <div class="container lp-hero-grid">
    <div>
      ${crumbs(depth, crumbPairs)}
      <div class="lp-tags">${tags}</div>
      <h1>${esc(e.title)}</h1>
      <p class="lp-lead">${esc(e.blurb)}</p>
      <div class="lp-facts">${facts}</div>
      <div class="lp-actions">
        <a class="btn btn-solid lp-go" href="${esc(e.url)}" target="_blank" rel="noopener">Open the interactive lesson <span class="arrow">↗</span></a>
        <a class="btn" href="#lesson">Read it here <span class="arrow">↓</span></a>
      </div>
    </div>
    ${
      hasShot(e.slug)
        ? `<a class="lp-window" href="${esc(e.url)}" target="_blank" rel="noopener" aria-label="Open ${esc(e.title)} on the lessons site">
      <span class="lp-window-bar"><i></i><i></i><i></i><span>${esc(codes.join(' · '))} · ${esc(e.title)}</span></span>
      <img src="${up}${shotPath(e.slug, 640)}" srcset="${up}${shotPath(e.slug, 640)} 640w, ${up}${shotPath(e.slug, 1280)} 1280w" sizes="(max-width: 980px) 92vw, 520px" width="640" height="400" alt="The first screen of ${esc(e.title)}" fetchpriority="high" decoding="async"/>
    </a>`
        : ''
    }
  </div>
</header>

<div class="lp-body" id="lesson" style="${accentVars(primary.accent)}">
  <div class="container lp-layout${toc.length >= 3 ? '' : ' is-solo'}">
    ${
      toc.length >= 3
        ? `<aside class="lp-toc" aria-label="On this page">
      <details open>
        <summary>On this page</summary>
        <p class="lp-toc-title">On this page</p>
        <ol>${toc.map((t) => `<li><a href="#${t.id}">${esc(t.text)}</a></li>`).join('')}</ol>
      </details>
      <a class="lp-toc-go" href="${esc(e.url)}" target="_blank" rel="noopener">Open the interactive lesson ↗</a>
    </aside>`
        : ''
    }
    <article class="lp-article">
      <p class="lp-note">${INFO_ICON}<span>This is the written version of ${esc(e.title)}, taken from the lesson itself. The simulations, drag-and-drop activities and quizzes only work in <a href="${esc(e.url)}" target="_blank" rel="noopener">the interactive lesson</a>.</span></p>
      <div class="lp-prose">
${html}
      </div>
      ${prev || next ? `<nav class="lp-pager" aria-label="More in this course">${pagerLink(prev, 'Previous lesson', 'is-prev')}${pagerLink(next, 'Next lesson', 'is-next')}</nav>` : ''}
    </article>
  </div>
</div>
${videos}
<section class="lp-cta">
  <div class="container lp-section lp-cta-inner" style="border:0">
    <div>
      <h2>Now try the real thing.</h2>
      <p>Everything above is on one page so you can read it anywhere. The lesson itself runs in your browser: no login, no install.</p>
    </div>
    <div class="lp-actions" style="margin-top:0">
      <a class="btn btn-solid lp-go" href="${esc(e.url)}" target="_blank" rel="noopener" style="${accentVars(primary.accent)}">Open the interactive lesson <span class="arrow">↗</span></a>
      <a class="btn" href="${up}lessons.html">All lessons <span class="arrow">→</span></a>
    </div>
  </div>
</section>
${
  more.length
    ? `
<section class="lp-section soft" style="${accentVars(primary.accent)}">
  <div class="container">
    <div class="lp-section-head"><h2>More from ${esc(course ? `${course.code}, ${course.name}` : 'the shared resources')}</h2></div>
    <div class="lp-cards">${more.map((p) => card(p, depth, primary.code)).join('')}
    </div>
  </div>
</section>`
    : ''
}`;

  return {
    html: pageShell({
      depth,
      title,
      description,
      canonical,
      ogImage: image,
      jsonLd,
      active: 'teaching',
      body,
      foot: `<script src="${up}assets/js/lesson-page.js" defer></script>\n`,
    }),
    words,
  };
}

/* ---------------------------------------------------------------- sitemap */

function syncSitemap(urls, dryRun) {
  const path = join(ROOT, 'sitemap.xml');
  let xml = readFileSync(path, 'utf8');
  const today = new Date().toISOString().slice(0, 10);
  // Drop lesson pages that no longer exist, then add or refresh the rest.
  xml = xml.replace(/  <url>\s*<loc>https:\/\/www\.yasassri\.me\/lessons\/[^<]+<\/loc>[\s\S]*?<\/url>\n/g, (m) => {
    const loc = m.match(/<loc>([^<]+)<\/loc>/)[1];
    return urls.includes(loc) ? m : '';
  });
  let added = 0;
  for (const loc of urls) {
    if (xml.includes(`<loc>${loc}</loc>`)) continue;
    xml = xml.replace(
      '</urlset>',
      `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n</urlset>`,
    );
    added++;
  }
  if (!dryRun) writeFileSync(path, xml);
  return added;
}

export function buildLessonPages(snap, { dryRun = false, log = console.log } = {}) {
  const plan = planPages(snap);
  if (!dryRun) mkdirSync(OUT_DIR, { recursive: true });
  const written = new Set();
  for (const e of plan.pages.filter((p) => p.page)) {
    const { html, words } = renderLessonPage(e, snap, plan);
    if (!dryRun) writeFileSync(join(OUT_DIR, `${e.slug}.html`), html);
    written.add(`${e.slug}.html`);
    log(`lessons/${e.slug}.html — ${words} words${e.courses.length > 1 ? ` (${e.courses.map((c) => c.code).join(', ')})` : ''}`);
  }
  // A lesson that went offline or was removed loses its page.
  for (const f of readdirSync(OUT_DIR).filter((f) => f.endsWith('.html') && !written.has(f))) {
    if (!dryRun) unlinkSync(join(OUT_DIR, f));
    log(`removed lessons/${f}`);
  }
  const added = syncSitemap([...written].sort().map((f) => `${SITE_URL}/lessons/${f}`), dryRun);
  log(`${written.size} lesson pages, ${added} new in sitemap.xml`);
  return plan;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const snap = readJson(join(ROOT, 'content/blended-teaching.json'));
  buildLessonPages(snap, { dryRun: process.argv.includes('--dry-run'), log: (...m) => console.log('[lesson-pages]', ...m) });
}
