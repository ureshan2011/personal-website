#!/usr/bin/env node
/* ==========================================================================
   build-seo-pages.mjs — G1 static-snapshot generator (GEO/AEO)

   WHY THIS EXISTS
   The /app/ SPA is hash-routed (app/#/blog/:slug, app/#/lessons/deck/:slug,
   app/#/lessons/article/:slug). Everything after "#" is invisible to search
   engines and to every AI crawler that doesn't execute JS (GPTBot, ClaudeBot,
   PerplexityBot typically don't). This script closes that gap by emitting
   real, crawlable, static HTML pages with their own <title>, description,
   canonical, and Article/LearningResource JSON-LD — each linking back into
   the interactive SPA route for the full experience.

   THREE INDEPENDENT SOURCES, ALL HANDLED BY THIS ONE SCRIPT
   1. Interactive lesson decks (app/lessons/<slug>.html)
      Source: app/lessons-src/src/lessons/*.tsx — the small page-wrapper
      files (apa-referencing.tsx, database-concepts.tsx, ...) that pass
      eyebrow/title/subtitle/pills props into <LessonShell>. These are
      static repo files, so this always runs, no credentials needed.
      Slugs are cross-checked against LESSON_DECKS in app/js/app.js.

   2. Firestore blog posts (app/blog/<slug>.html)
      Source: Firestore collection "posts" (fields: slug, title,
      description/excerpt, contentMarkdown, publishedAt, tags, author),
      OR a local JSON export (see --posts-dir below).

   3. Firestore Markdown lesson articles (app/lessons/<slug>.html)
      Source: Firestore collection "lessons" where status == "published"
      (fields match scripts/import-lessons.js's output: slug, title,
      subtitle, objectives[], content, tags, readingTime), OR a local JSON
      export (see --lessons-dir below). Skipped (with a warning) if the
      slug collides with one of the 10 static decks in (1).

   THIS SANDBOX HAS NO FIRESTORE CREDENTIALS, so (2) and (3) run against
   whatever local JSON files exist (none, by default) and simply report
   "0 found" — that's expected. (1) always runs and needs no credentials,
   since deck metadata lives in the repo as plain .tsx source.

   ONE-LINE COMMAND THE SITE OWNER RUNS LOCALLY (with real Firestore access)
   to pull live blog posts + published lesson articles and regenerate every
   static snapshot in one pass:

     npm install firebase-admin --no-save && \
       node scripts/build-seo-pages.mjs --service-account=/path/to/service-account.json

   (Get a service-account.json the same way as scripts/import-lessons.js and
   scripts/upload-book.js: Firebase console -> Project settings -> Service
   accounts -> Generate new private key. Treat it like a password; delete it
   after the run.)

   Without --service-account, the script still regenerates the 10 deck pages
   from .tsx source and looks for local JSON exports at the --posts-dir /
   --lessons-dir paths below (both default to empty, committed directories)
   — useful for previewing a hand-written JSON export before it's live in
   Firestore, or for CI environments that intentionally have no credentials.

   USAGE
     node scripts/build-seo-pages.mjs [options]

   OPTIONS
     --service-account=<path>   Pull posts + published lesson articles
                                 live from Firestore using this key.
     --posts-dir=<path>         Local JSON export of blog posts, used when
                                 --service-account is not given.
                                 Default: content/seo-import/posts
     --lessons-dir=<path>       Local JSON export of published lesson
                                 articles, used when --service-account is
                                 not given.
                                 Default: content/seo-import/lesson-articles
     --no-sitemap                Skip the sitemap.xml sync step.
     --dry-run                   Print what would be written, write nothing.

   LOCAL JSON EXPORT SCHEMA (one file per item; filename is ignored)
     Blog post:
       {
         "slug": "my-post",
         "title": "My Post Title",
         "description": "One or two sentence summary for meta description.",
         "contentMarkdown": "## Heading\n\nBody text in Markdown...",
         "publishedAt": "2026-06-01",
         "updatedAt": "2026-06-03",
         "author": "Dr. Yasas Sri Wickramasinghe",
         "tags": ["augmented-reality", "hci"]
       }
     Lesson article (mirrors scripts/import-lessons.js Firestore doc shape):
       {
         "slug": "my-lesson",
         "title": "My Lesson Title",
         "subtitle": "One-line subtitle.",
         "objectives": ["Objective one", "Objective two"],
         "content": "Markdown lesson body...",
         "tags": ["sql"],
         "readingTime": 6,
         "status": "published"
       }

   Every generated page is idempotent: re-running this script simply
   overwrites its own output files. It never touches hand-written pages
   (index.html, research.html, etc.) or files outside app/blog/ and
   app/lessons/.
   ========================================================================== */
"use strict";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
const SITE_URL = "https://www.yasassri.me";

/* ---------- CLI args --------------------------------------------------- */

const args = process.argv.slice(2);
const flag = (name, def) => {
  const pre = `--${name}=`;
  const hit = args.find(a => a.startsWith(pre));
  return hit ? hit.slice(pre.length) : def;
};
const has = name => args.includes(`--${name}`);

const serviceAccountPath = flag("service-account", null);
const postsDir = path.resolve(REPO_ROOT, flag("posts-dir", "content/seo-import/posts"));
const lessonsDir = path.resolve(REPO_ROOT, flag("lessons-dir", "content/seo-import/lesson-articles"));
const skipSitemap = has("no-sitemap");
const dryRun = has("dry-run");

const today = new Date().toISOString().slice(0, 10);

/* ---------- tiny helpers ------------------------------------------------ */

const esc = s => String(s ?? "")
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80) || "page";
}

/* Deliberately narrow Markdown -> HTML converter — headings, paragraphs,
   bold/italic, links and "- " lists. Not a general Markdown parser; the
   lesson/blog content this project produces never uses more than this. */
function mdToHtml(md) {
  const lines = String(md || "").replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let inList = false;
  const closeList = () => { if (inList) { out.push("</ul>"); inList = false; } };
  const inline = t => esc(t)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { closeList(); continue; }
    const h = line.match(/^(#{2,4})\s+(.*)$/);
    if (h) { closeList(); const lvl = h[1].length; out.push(`<h${lvl}>${inline(h[2])}</h${lvl}>`); continue; }
    const li = line.match(/^-\s+(.*)$/);
    if (li) { if (!inList) { out.push("<ul>"); inList = true; } out.push(`<li>${inline(li[1])}</li>`); continue; }
    closeList();
    out.push(`<p>${inline(line)}</p>`);
  }
  closeList();
  return out.join("\n");
}

function readJsonDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".json"))
    .map(f => {
      try { return JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")); }
      catch (e) { console.warn(`  ! Skipping ${f}: invalid JSON (${e.message})`); return null; }
    })
    .filter(Boolean);
}

/* ---------- (1) lesson decks from app/lessons-src/src/lessons/*.tsx ---- */

const LESSONS_SRC_DIR = path.join(REPO_ROOT, "app", "lessons-src", "src", "lessons");
const APP_JS_PATH = path.join(REPO_ROOT, "app", "js", "app.js");

function parseLessonDeckRegistry() {
  // Cross-check slugs/canonical short title+subtitle against the SPA's own
  // LESSON_DECKS table, so the static snapshot never drifts from the nav.
  const src = fs.readFileSync(APP_JS_PATH, "utf8");
  const block = src.match(/const LESSON_DECKS = \[([\s\S]*?)\n\];/);
  if (!block) return new Map();
  const registry = new Map();
  const re = /\{\s*slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*subtitle:\s*"((?:[^"\\]|\\.)*)",\s*accent:\s*"([^"]+)"\s*\}/g;
  let m;
  while ((m = re.exec(block[1]))) {
    registry.set(m[1], { slug: m[1], navTitle: m[2], navSubtitle: m[3].replace(/\\"/g, '"'), accent: m[4] });
  }
  return registry;
}

function attr(src, name) {
  const m = src.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`));
  return m ? m[1] : "";
}

function parsePills(src) {
  const block = src.match(/pills=\{\[([\s\S]*?)\]\}/);
  if (!block) return [];
  return [...block[1].matchAll(/\{\s*emoji:\s*'([^']*)',\s*name:\s*'([^']*)',\s*color:\s*'([^']*)'\s*\}/g)]
    .map(m => ({ emoji: m[1], name: m[2], color: m[3] }));
}

function loadLessonDecks() {
  const registry = parseLessonDeckRegistry();
  if (!fs.existsSync(LESSONS_SRC_DIR)) return [];

  // Page-wrapper files are the ones that import LessonShell and take a slug
  // name (database-concepts.tsx) as opposed to the PascalCase deck/lesson
  // implementation files (DatabaseConceptsLesson.tsx) that render the slides.
  const files = fs.readdirSync(LESSONS_SRC_DIR)
    .filter(f => f.endsWith(".tsx") && /^[a-z0-9-]+\.tsx$/.test(f));

  const decks = [];
  for (const file of files) {
    const slug = file.replace(/\.tsx$/, "");
    const src = fs.readFileSync(path.join(LESSONS_SRC_DIR, file), "utf8");
    if (!src.includes("LessonShell")) continue; // not a page wrapper

    const eyebrow = attr(src, "eyebrow");
    const titleLead = attr(src, "titleLead");
    const titleAccent = attr(src, "titleAccent");
    const accent = attr(src, "accent");
    const subtitle = attr(src, "subtitle");
    const pills = parsePills(src);
    const reg = registry.get(slug);

    if (!reg) {
      console.warn(`  ! ${file}: slug "${slug}" not found in app/js/app.js LESSON_DECKS — generating anyway, but this deck may not be reachable from the SPA's lesson listing yet.`);
    }

    decks.push({
      slug,
      title: (reg && reg.navTitle) || titleAccent.replace(/\.$/, ""),
      shortSubtitle: (reg && reg.navSubtitle) || subtitle,
      eyebrow,
      titleLead,
      titleAccent,
      accent: accent || (reg && reg.accent) || "#4b6bff",
      subtitle,
      pills
    });
  }
  return decks.sort((a, b) => a.slug.localeCompare(b.slug));
}

/* ---------- (2) & (3) Firestore (live, if --service-account given) ----- */

async function fetchFromFirestore(serviceAccountPath) {
  let admin;
  try {
    admin = (await import("firebase-admin")).default;
  } catch {
    console.error("firebase-admin is not installed. Run: npm install firebase-admin --no-save");
    process.exit(1);
  }
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  const db = admin.firestore();

  const postsSnap = await db.collection("posts").where("status", "==", "published").get().catch(async () => db.collection("posts").get());
  const posts = postsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

  const lessonsSnap = await db.collection("lessons").where("status", "==", "published").get();
  const lessonArticles = lessonsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

  return { posts, lessonArticles };
}

/* ---------- HTML templates ---------------------------------------------- */

function siteChrome({ depth }) {
  // depth = number of directory levels below repo root (app/blog/ and
  // app/lessons/ are both depth 2), used to build relative asset paths.
  const up = "../".repeat(depth);
  return { up };
}

function pageShell({ depth, title, description, canonical, ogImage, jsonLd, bodyHtml, breadcrumbLabel }) {
  const { up } = siteChrome({ depth });
  const ldBlocks = jsonLd.map(obj => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n</script>`).join("\n");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>${esc(title)}</title>
<meta name="author" content="Yasas Sri Wickramasinghe"/>
<meta name="description" content="${esc(description)}"/>
<link rel="icon" href="${up}assets/images/icons/favicon.png"/>
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
<meta name="theme-color" content="#4b6bff"/>
<link rel="canonical" href="${esc(canonical)}"/>
<link rel="alternate" type="application/rss+xml" href="${SITE_URL}/feed.xml"/>
<!-- Open Graph -->
<meta property="og:type" content="article"/>
<meta property="og:site_name" content="Dr. Yasas Sri Wickramasinghe"/>
<meta property="og:title" content="${esc(title)}"/>
<meta property="og:description" content="${esc(description)}"/>
<meta property="og:url" content="${esc(canonical)}"/>
<meta property="og:image" content="${esc(ogImage)}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:site" content="@sri_yasas"/>
${ldBlocks}
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
<link href="${up}assets/css/redesign.css" rel="stylesheet"/>
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-N2BH0F6SNE"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-N2BH0F6SNE');
</script>
</head>
<body>

<nav class="nav">
  <div class="nav-inner">
    <a class="nav-logo" href="${up}index.html">Yasas Sri <em>Wickramasinghe</em></a>
    <div class="nav-links">
      <a href="${up}index.html">Home</a>
      <a href="${up}research.html">Research</a>
      <a href="${up}teaching.html">Teaching</a>
      <a href="${up}products.html">Products</a>
      <a href="${up}news.html">News</a>
      <a href="${up}blogs.html">Writing</a>
      <a href="${up}app/#/">Platform</a>
      <a href="${up}contact.html">Contact</a>
    </div>
    <button class="nav-toggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
  </div>
</nav>

<header class="page-hero">
  <div class="container">
    <div class="app-crumb" style="margin-bottom:14px;"><a href="${up}app/#/" style="color:var(--muted)">Platform</a> / <span style="color:var(--muted)">${esc(breadcrumbLabel)}</span></div>
${bodyHtml}

<footer>
  <div class="container footer-inner">
    <div>
      <div class="footer-name">Yasas Sri <em>Wickramasinghe</em></div>
      <div class="footer-copy">&copy; <span class="year">2026</span> Yasas Sri Wickramasinghe. All rights reserved.</div>
    </div>
    <div class="footer-links">
      <a href="https://www.linkedin.com/in/yasassri" target="_blank" rel="noopener">LinkedIn</a>
      <a href="https://twitter.com/sri_yasas" target="_blank" rel="noopener">Twitter/X</a>
      <a href="${up}contact.html">Contact</a>
    </div>
  </div>
</footer>

</body>
</html>
`;
}

function renderLessonDeckPage(deck) {
  const canonical = `${SITE_URL}/app/lessons/${deck.slug}.html`;
  const spaUrl = `${SITE_URL}/app/#/lessons/deck/${deck.slug}`;
  const title = `${deck.title} — Interactive Lesson | Dr. Yasas Sri Wickramasinghe`;
  const description = deck.shortSubtitle || deck.subtitle;
  const topics = deck.pills.map(p => p.name);

  const jsonLd = [{
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": deck.title,
    "description": deck.subtitle || deck.shortSubtitle,
    "url": canonical,
    "learningResourceType": "Interactive lesson deck",
    "teaches": topics,
    "isAccessibleForFree": true,
    "inLanguage": "en",
    "about": deck.eyebrow || undefined,
    "author": { "@type": "Person", "name": "Dr. Yasas Sri Wickramasinghe", "url": SITE_URL + "/" },
    "provider": { "@type": "Organization", "name": "Dr. Yasas Sri Wickramasinghe — Academic Platform", "url": SITE_URL + "/app/" },
    "isPartOf": { "@type": "WebSite", "@id": SITE_URL + "/#website" }
  }];

  const bodyHtml = `
    <span class="eyebrow reveal">${esc(deck.eyebrow || "Interactive Lesson")}</span>
    <h1 class="reveal" style="--d:.1s">${esc(deck.titleLead || "Let's make sense of")} <em>${esc(deck.titleAccent || deck.title)}</em></h1>
    <p class="lead reveal" style="--d:.2s">${esc(deck.subtitle || deck.shortSubtitle)}</p>
    <div class="hero-actions reveal" style="--d:.3s">
      <a class="btn btn-solid" href="${esc(spaUrl)}">Open the Interactive Deck <span class="arrow">→</span></a>
      <a class="btn" href="../#/lessons">All Lessons <span class="arrow">→</span></a>
    </div>
  </div>
</header>
<section class="section">
  <div class="container">
    <div class="section-head reveal">
      <span class="idx">01</span>
      <h2>What you'll <em>learn</em></h2>
    </div>
    <ul class="feat" style="grid-template-columns:1fr 1fr;">
      ${topics.map(t => `<li>${esc(t)}</li>`).join("\n      ")}
    </ul>
    <p style="color:var(--text-dim); font-weight:300; margin-top:24px; max-width:70ch;">
      This page is a text summary of an interactive, slide-by-slide lesson deck built for
      the Yoobees teaching platform. Open the interactive version above to work through it
      with live examples, diagrams and a practice quiz where included.
    </p>
    <div class="reveal" style="margin-top:28px;">
      <a class="btn btn-solid" href="${esc(spaUrl)}">Open the Interactive Deck <span class="arrow">→</span></a>
    </div>
  </div>
</section>`;

  return pageShell({
    depth: 2,
    title,
    description,
    canonical,
    ogImage: `${SITE_URL}/assets/images/og-card.png`,
    jsonLd,
    bodyHtml,
    breadcrumbLabel: `Lessons / ${deck.title}`
  });
}

function renderBlogPostPage(post) {
  const slug = post.slug || slugify(post.title);
  const canonical = `${SITE_URL}/app/blog/${slug}.html`;
  const spaUrl = `${SITE_URL}/app/#/blog/${slug}`;
  const title = `${post.title} | Dr. Yasas Sri Wickramasinghe`;
  const description = post.description || post.excerpt || "";
  const published = post.publishedAt || today;
  const updated = post.updatedAt || published;

  const jsonLd = [{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": description,
    "url": canonical,
    "datePublished": published,
    "dateModified": updated,
    "inLanguage": "en",
    "author": { "@type": "Person", "name": post.author || "Dr. Yasas Sri Wickramasinghe", "url": SITE_URL + "/" },
    "publisher": { "@type": "Person", "name": "Dr. Yasas Sri Wickramasinghe", "url": SITE_URL + "/" },
    "keywords": (post.tags || []).join(", "),
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonical }
  }];

  const bodyHtml = `
    <span class="eyebrow reveal">Blog</span>
    <h1 class="reveal" style="--d:.1s">${esc(post.title)}</h1>
    <p class="lead reveal" style="--d:.2s">${esc(description)}</p>
    <p style="color:var(--muted); font-family:var(--mono); font-size:11px; letter-spacing:.1em; text-transform:uppercase;">Published ${esc(published)}${updated !== published ? ` · Updated ${esc(updated)}` : ""}</p>
  </div>
</header>
<section class="section">
  <div class="container" style="max-width:72ch;">
    ${mdToHtml(post.contentMarkdown || post.content || "")}
    <div class="reveal" style="margin-top:32px;">
      <a class="btn btn-solid" href="${esc(spaUrl)}">Discuss in the Forum / View in App <span class="arrow">→</span></a>
    </div>
  </div>
</section>`;

  return pageShell({
    depth: 2,
    title,
    description,
    canonical,
    ogImage: `${SITE_URL}/assets/images/og-card.png`,
    jsonLd,
    bodyHtml,
    breadcrumbLabel: `Blog / ${post.title}`
  });
}

function renderLessonArticlePage(article) {
  const slug = article.slug || slugify(article.title);
  const canonical = `${SITE_URL}/app/lessons/${slug}.html`;
  const spaUrl = `${SITE_URL}/app/#/lessons/article/${slug}`;
  const title = `${article.title} — Lesson | Dr. Yasas Sri Wickramasinghe`;
  const description = article.subtitle || "";
  const objectives = article.objectives || [];

  const jsonLd = [{
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": article.title,
    "description": description,
    "url": canonical,
    "learningResourceType": "Lesson article",
    "teaches": objectives,
    "isAccessibleForFree": true,
    "inLanguage": "en",
    "author": { "@type": "Person", "name": "Dr. Yasas Sri Wickramasinghe", "url": SITE_URL + "/" },
    "provider": { "@type": "Organization", "name": "Dr. Yasas Sri Wickramasinghe — Academic Platform", "url": SITE_URL + "/app/" }
  }];

  const bodyHtml = `
    <span class="eyebrow reveal">Lesson</span>
    <h1 class="reveal" style="--d:.1s">${esc(article.title)}</h1>
    <p class="lead reveal" style="--d:.2s">${esc(description)}</p>
  </div>
</header>
<section class="section">
  <div class="container" style="max-width:72ch;">
    ${objectives.length ? `<h2>Objectives</h2>\n<ul>${objectives.map(o => `<li>${esc(o)}</li>`).join("")}</ul>` : ""}
    ${mdToHtml(article.content || "")}
    <div class="reveal" style="margin-top:32px;">
      <a class="btn btn-solid" href="${esc(spaUrl)}">Open in App <span class="arrow">→</span></a>
    </div>
  </div>
</section>`;

  return pageShell({
    depth: 2,
    title,
    description,
    canonical,
    ogImage: `${SITE_URL}/assets/images/og-card.png`,
    jsonLd,
    bodyHtml,
    breadcrumbLabel: `Lessons / ${article.title}`
  });
}

/* ---------- sitemap.xml sync -------------------------------------------- */

function syncSitemap(newUrls) {
  const sitemapPath = path.join(REPO_ROOT, "sitemap.xml");
  let xml = fs.readFileSync(sitemapPath, "utf8");
  let added = 0;
  for (const loc of newUrls) {
    if (xml.includes(`<loc>${loc}</loc>`)) {
      xml = xml.replace(
        new RegExp(`(<loc>${loc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</loc>\\s*<lastmod>)[^<]*(</lastmod>)`),
        `$1${today}$2`
      );
      continue;
    }
    const entry = `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
    xml = xml.replace("</urlset>", `${entry}</urlset>`);
    added++;
  }
  if (!dryRun) fs.writeFileSync(sitemapPath, xml);
  return added;
}

/* ---------- main ---------------------------------------------------------- */

async function main() {
  console.log(`build-seo-pages.mjs — run date ${today}${dryRun ? " (dry run)" : ""}`);

  // (1) Lesson decks — always runs, no credentials needed.
  const decks = loadLessonDecks();
  console.log(`\n[1/3] Lesson decks: found ${decks.length} page-wrapper file(s) in app/lessons-src/src/lessons/`);
  const lessonsOutDir = path.join(REPO_ROOT, "app", "lessons");
  if (!dryRun) fs.mkdirSync(lessonsOutDir, { recursive: true });
  const newUrls = [];
  for (const deck of decks) {
    const outPath = path.join(lessonsOutDir, `${deck.slug}.html`);
    const html = renderLessonDeckPage(deck);
    if (!dryRun) fs.writeFileSync(outPath, html);
    console.log(`  ${dryRun ? "(dry-run) would write" : "wrote"} app/lessons/${deck.slug}.html`);
    newUrls.push(`${SITE_URL}/app/lessons/${deck.slug}.html`);
  }

  // (2) & (3) Blog posts + lesson articles — Firestore (if creds given) or local JSON export.
  let posts = [];
  let lessonArticles = [];
  if (serviceAccountPath) {
    console.log(`\n[2/3] Pulling live data from Firestore using ${serviceAccountPath} ...`);
    ({ posts, lessonArticles } = await fetchFromFirestore(serviceAccountPath));
  } else {
    console.log(`\n[2/3] No --service-account given. Looking for local JSON export at:`);
    console.log(`      posts:   ${path.relative(REPO_ROOT, postsDir)}`);
    console.log(`      lessons: ${path.relative(REPO_ROOT, lessonsDir)}`);
    posts = readJsonDir(postsDir);
    lessonArticles = readJsonDir(lessonsDir).filter(l => (l.status || "published") === "published");
  }
  console.log(`      found ${posts.length} blog post(s), ${lessonArticles.length} published lesson article(s)`);

  if (posts.length) {
    const blogOutDir = path.join(REPO_ROOT, "app", "blog");
    if (!dryRun) fs.mkdirSync(blogOutDir, { recursive: true });
    for (const post of posts) {
      const slug = post.slug || slugify(post.title);
      const outPath = path.join(blogOutDir, `${slug}.html`);
      if (!dryRun) fs.writeFileSync(outPath, renderBlogPostPage(post));
      console.log(`  ${dryRun ? "(dry-run) would write" : "wrote"} app/blog/${slug}.html`);
      newUrls.push(`${SITE_URL}/app/blog/${slug}.html`);
    }
  }

  const deckSlugs = new Set(decks.map(d => d.slug));
  if (lessonArticles.length) {
    for (const article of lessonArticles) {
      const slug = article.slug || slugify(article.title);
      if (deckSlugs.has(slug)) {
        console.warn(`  ! Skipping lesson article "${slug}": collides with a static deck slug.`);
        continue;
      }
      const outPath = path.join(lessonsOutDir, `${slug}.html`);
      if (!dryRun) fs.writeFileSync(outPath, renderLessonArticlePage(article));
      console.log(`  ${dryRun ? "(dry-run) would write" : "wrote"} app/lessons/${slug}.html`);
      newUrls.push(`${SITE_URL}/app/lessons/${slug}.html`);
    }
  }

  // (3) sitemap.xml sync
  console.log(`\n[3/3] sitemap.xml`);
  if (skipSitemap) {
    console.log("  skipped (--no-sitemap)");
  } else {
    const added = syncSitemap(newUrls);
    console.log(`  ${dryRun ? "(dry-run) would add/update" : "added/updated"} ${newUrls.length} URL(s), ${added} newly added`);
  }

  console.log(`\nDone. ${decks.length} deck page(s), ${posts.length} blog post page(s), ${lessonArticles.length - [...lessonArticles].filter(a => deckSlugs.has(a.slug || slugify(a.title))).length} lesson article page(s).`);
  if (!serviceAccountPath && posts.length === 0) {
    console.log(`\nNo blog posts were found locally, and no --service-account was given, so app/blog/ was not touched.`);
    console.log(`To pull live posts from Firestore, run:`);
    console.log(`  npm install firebase-admin --no-save && node scripts/build-seo-pages.mjs --service-account=/path/to/service-account.json`);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
