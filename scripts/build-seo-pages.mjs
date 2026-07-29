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
import vm from "node:vm";
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
const writingDir = path.resolve(REPO_ROOT, flag("writing-dir", "content/writing"));
const skipSitemap = has("no-sitemap");
const dryRun = has("dry-run");

const today = new Date().toISOString().slice(0, 10);

/* ---------- tiny helpers ------------------------------------------------ */

const esc = s => String(s ?? "")
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

/* Rendered-page word count, used as a floor check on extraction. */
const countWords = html =>
  String(html).replace(/<[^>]*>/g, " ").replace(/&[a-z]+;/gi, " ")
    .split(/\s+/).filter(Boolean).length;

/* A generated deck page below this is thin enough that extraction almost
   certainly broke — the pre-extraction stubs were ~230 words. */
const MIN_DECK_WORDS = 500;

function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80) || "page";
}

/* Narrow Markdown -> HTML converter. Not a general parser — it covers exactly
   what this project's content uses: headings, paragraphs, bold/italic, inline
   code, links, images, bullet and numbered lists, blockquotes, fenced code
   blocks and horizontal rules. Everything is escaped before formatting, so no
   raw HTML from a source file reaches the page. */
function mdToHtml(md) {
  const lines = String(md || "")
    .replace(/\r\n/g, "\n")
    // Linked images arrive from the converters split across several lines:
    //   [
    //   ![alt](img)
    //   ](href)
    // Collapse both halves back onto one line so the construct parses as a
    // single linked image instead of leaving stray "[" and "](href)" paragraphs.
    // Both joins are anchored to their neighbouring token so ordinary
    // "[text](url)" links are left alone.
    .replace(/\[[ \t]*\n\s*(?=!\[)/g, "[")
    .replace(/\)[ \t]*\n\s*(?=\]\()/g, ")")
    // Embedded link-preview cards arrive as a bare "[", several lines of card
    // metadata (title, then domain), then "](href)". Collapse each to a plain
    // link labelled with the card's title — its first meaningful line.
    .replace(/\[[ \t]*\n([\s\S]{0,600}?)\n[ \t]*\]\((https?:[^\s)]+)\)/g, (_m, inner, href) => {
      const label = inner.split("\n").map(s => s.trim()).filter(Boolean)[0] || href;
      return `[${label.replace(/[[\]]/g, "")}](${href})`;
    })
    .split("\n");
  const out = [];
  let listTag = null;      // "ul" | "ol" | null
  let inQuote = false;
  let fence = null;        // language of the open fence, or null
  let fenceLines = [];

  const closeList = () => { if (listTag) { out.push(`</${listTag}>`); listTag = null; } };
  const closeQuote = () => { if (inQuote) { out.push("</blockquote>"); inQuote = false; } };
  const openList = tag => {
    if (listTag === tag) return;
    closeList();
    out.push(`<${tag}>`);
    listTag = tag;
  };

  const inline = t => esc(t)
    // Linked images first: "[![alt](src)](href)" would otherwise be split by
    // the image rule into markup the link rule can no longer recognise.
    .replace(/\[!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)\]\((https?:\/\/[^\s)]+)\)/g,
      (_m, alt, src, href) =>
        `<a href="${href}" target="_blank" rel="noopener"><img src="${src}" alt="${alt}" loading="lazy" decoding="async"/></a>`)
    // Images before links — the syntax differs only by the leading "!".
    .replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g,
      (_m, alt, src) => `<img src="${src}" alt="${alt}" loading="lazy" decoding="async"/>`)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  for (const raw of lines) {
    // Inside a fenced block everything is literal until the closing fence.
    if (fence !== null) {
      if (/^\s*```/.test(raw)) {
        const cls = fence ? ` class="language-${esc(fence)}"` : "";
        out.push(`<pre><code${cls}>${esc(fenceLines.join("\n"))}</code></pre>`);
        fence = null; fenceLines = [];
      } else fenceLines.push(raw);
      continue;
    }

    const line = raw.trim();

    const openFence = line.match(/^```\s*([A-Za-z0-9+#-]*)\s*$/);
    if (openFence) { closeList(); closeQuote(); fence = openFence[1] || ""; fenceLines = []; continue; }

    if (!line) { closeList(); closeQuote(); continue; }

    if (/^(\*\s*\*\s*\*|---+|___+)$/.test(line)) { closeList(); closeQuote(); out.push("<hr/>"); continue; }

    const h = line.match(/^(#{2,4})\s+(.*)$/);
    if (h) { closeList(); closeQuote(); out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); continue; }

    const quote = line.match(/^>\s?(.*)$/);
    if (quote) {
      closeList();
      if (!inQuote) { out.push("<blockquote>"); inQuote = true; }
      out.push(`<p>${inline(quote[1])}</p>`);
      continue;
    }
    closeQuote();

    const ul = line.match(/^[-*]\s+(.*)$/);
    if (ul) { openList("ul"); out.push(`<li>${inline(ul[1])}</li>`); continue; }

    const ol = line.match(/^\d+[.)]\s+(.*)$/);
    if (ol) { openList("ol"); out.push(`<li>${inline(ol[1])}</li>`); continue; }

    closeList();
    // A standalone image, linked or not, gets its own figure rather than <p>.
    if (/^\[?!\[[^\]]*\]\(https?:\/\/[^\s)]+\)(\]\(https?:\/\/[^\s)]+\))?$/.test(line)) {
      out.push(`<figure>${inline(line)}</figure>`);
      continue;
    }
    out.push(`<p>${inline(line)}</p>`);
  }

  if (fence !== null) out.push(`<pre><code>${esc(fenceLines.join("\n"))}</code></pre>`);
  closeList();
  closeQuote();
  return out.join("\n");
}

/* Front matter is a small fixed set of `key: value` lines between --- fences,
   with JSON-quoted values where the text may contain colons. */
function parseFrontMatter(src) {
  const m = String(src).match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: String(src) };
  const meta = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([A-Za-z][A-Za-z0-9_]*):\s*(.*)$/);
    if (!kv) continue;
    const raw = kv[2].trim();
    let val = raw;
    if (raw.startsWith('"')) { try { val = JSON.parse(raw); } catch { /* keep raw */ } }
    meta[kv[1]] = val;
  }
  return { meta, body: m[2] };
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

/* ---------- deck slide extraction --------------------------------------- */

/* Each deck implementation file (ERDiagramsDeck.tsx and friends) keeps its
   slides in one top-level array literal:

     const SLIDES: { classes: string; label: string; html: string }[] = [
       { classes: "dark", label: "01 Title", html: `<div class="inner">...` },
     ];

   The `html` values are plain HTML template literals with no ${} interpolation,
   so the array is pure data and can be evaluated exactly rather than scraped.
   That matters — quoting style differs between decks ("01 Title" in some,
   '01 Title' in others), which a regex would have to guess at.

   Extraction failures throw. Quietly falling back to the old ~230-word stub
   would regress a good page to a thin one without anyone noticing, which is
   the one outcome worth failing the build over. */

function sliceArrayLiteral(src, openIdx) {
  // Walk from the opening "[" tracking string/template state, so brackets
  // inside slide markup or CSS selectors don't close the array early.
  let depth = 0, quote = null;
  for (let i = openIdx; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (c === "\\") { i++; continue; }
      if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { quote = c; continue; }
    if (c === "[") depth++;
    else if (c === "]" && --depth === 0) return src.slice(openIdx, i + 1);
  }
  return null;
}

function findArrayLiteral(src, name) {
  const decl = new RegExp(`(?:^|\\n)\\s*const\\s+${name}\\b[^=\\n]*=\\s*\\[`).exec(src);
  if (!decl) return null;
  return sliceArrayLiteral(src, decl.index + decl[0].length - 1);
}

function evalArrayLiteral(literal, label) {
  // Some arrays reference outer consts (accent colours, imported icon
  // components) and hold arrow functions. A permissive sandbox lets those
  // resolve to harmless stubs rather than throwing — only string fields are read.
  const sandbox = new Proxy({}, {
    has: () => true,
    get: (_t, k) => (k === Symbol.unscopables ? undefined : "")
  });
  try {
    return vm.runInNewContext(`(${literal})`, sandbox, { timeout: 2000 });
  } catch (e) {
    throw new Error(`could not evaluate ${label}: ${e.message}`);
  }
}

/* Tags worth preserving inside extracted prose — they carry meaning a crawler
   uses. Everything else is presentational and gets dropped. */
const KEEP_INLINE = /^(strong|em|b|i|code|sub|sup)$/i;
const BLOCK_TAGS = /<\/?(div|p|li|ul|ol|h[1-6]|section|header|footer|td|th|tr|table|br|figcaption|blockquote)\b[^>]*>/gi;

const stripTags = s => String(s).replace(/<[^>]*>/g, "");
const norm = s => stripTags(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/* Flattens one slide's markup into an ordered list of prose blocks.

   A selector-based approach loses content here: several slides carry their
   body text in styled <div>s with no <p> or <li> at all. Marking every
   block-level boundary and then stripping tags recovers those. */
function slideBlocks(html) {
  let h = String(html || "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "");
  h = h.replace(BLOCK_TAGS, " ");
  h = h.replace(/<(\/?)([a-z0-9]+)\b[^>]*>/gi, (_m, close, tag) =>
    KEEP_INLINE.test(tag) ? `<${close}${tag.toLowerCase()}>` : "");
  return h.split(" ")
    .map(t => t.replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim())
    .filter(t => {
      const bare = stripTags(t);
      if (!/[a-z]/i.test(bare)) return false;              // pure decoration
      if (/^©\s*Yasas/i.test(bare)) return false;          // per-slide copyright
      return bare.split(/\s+/).filter(Boolean).length >= 2;
    });
}

/* "04 What Is ER" -> "What Is ER". The ordinal is deck navigation, not a title. */
const slideHeading = label => String(label || "").replace(/^\s*\d+\s*[.\-–—)·|]?\s+/, "").trim();

/* Cover, divider and sign-off slides carry no teaching content — their text is
   the deck title and tagline, which the page lead already states. */
const CHROME_SLIDE = /^(title|end\s*title|end|cover|thanks?|thank you|questions?|q\s*&\s*a)$/i;
/* Kickers like "Section 01" label the slide, they don't title it. */
const KICKER_ONLY = /^(section|part|step|module)\s*\d+$/i;

/* Headings are rendered as plain text and escaped downstream, so entities
   carried over from the slide markup have to be decoded once here — otherwise
   "&amp;" ships as "&amp;amp;". Body blocks keep theirs, being real HTML. */
const decodeEntities = s => String(s)
  .replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

/* The label is often an internal deck code ("Sec What Why"); the slide's own
   on-screen title reads better. Slides run kicker → title → body, so the first
   short non-kicker block is the title. */
function pickHeading(blocks, label) {
  const title = blocks
    .slice(0, 3)
    .map(b => decodeEntities(stripTags(b)).trim())
    .find(t => !KICKER_ONLY.test(t) && t.split(/\s+/).filter(Boolean).length <= 12);
  return title || slideHeading(label);
}

function extractDeckSections(implSrc, file) {
  const literal = findArrayLiteral(implSrc, "SLIDES");
  if (!literal) throw new Error(`${file}: no top-level "const SLIDES = [...]" found`);
  const slides = evalArrayLiteral(literal, `${file} SLIDES`);
  if (!Array.isArray(slides) || !slides.length) throw new Error(`${file}: SLIDES evaluated to no slides`);

  return slides.map((slide, i) => {
    if (CHROME_SLIDE.test(slideHeading(slide.label))) return null;
    const blocks = slideBlocks(slide.html);
    if (!blocks.length) return null;
    const heading = pickHeading(blocks, slide.label) || `Part ${i + 1}`;
    // Drop the block the heading came from, plus any kicker above it, so the
    // heading isn't immediately echoed back in the body.
    const body = blocks.filter(b =>
      norm(b) !== norm(heading) && !KICKER_ONLY.test(decodeEntities(stripTags(b)).trim()));
    return { id: slugify(heading) || `part-${i + 1}`, heading, blocks: body };
  }).filter(s => s && s.blocks.length);
}

/* The four interactive lessons (DatabaseConceptsLesson and friends) are React
   components rather than slide decks — their teaching content lives in named
   top-level arrays of plain objects. Same evaluation trick, different shape. */
const COMPONENT_CONTENT_ARRAYS = [
  "TABLE_STEPS", "TYPE_SCENARIOS", "COL_POSITIONS", "COUNT_FILTERS",
  "STAGES", "PRESETS", "certs", "whyLinkedIn", "bonusResources"
];

const HEADING_KEYS = ["title", "name", "q", "front", "label", "stage"];
const PROSE_KEYS = ["explain", "body", "blurb", "desc", "description", "text",
  "answer", "back", "why", "detail", "summary", "activityTask"];
const LIST_KEYS = ["notes", "points", "bullets", "items"];

function itemToSection(item, i) {
  if (!item || typeof item !== "object") return null;
  const headingRaw = HEADING_KEYS.map(k => item[k]).find(v => typeof v === "string" && v.trim());
  const heading = slideHeading(headingRaw || "") || `Part ${i + 1}`;
  const blocks = [];
  for (const k of PROSE_KEYS) {
    const v = item[k];
    if (typeof v === "string" && v.trim().split(/\s+/).filter(Boolean).length >= 2) blocks.push(v.trim());
  }
  for (const k of LIST_KEYS) {
    if (!Array.isArray(item[k])) continue;
    for (const v of item[k]) if (typeof v === "string" && v.trim()) blocks.push(v.trim());
  }
  const code = typeof item.code === "string" && item.code.trim() ? item.code.trim() : null;
  if (!blocks.length && !code) return null;
  return { id: slugify(heading) || `part-${i + 1}`, heading, blocks, code };
}

function extractComponentSections(implSrc, file) {
  const sections = [];
  for (const name of COMPONENT_CONTENT_ARRAYS) {
    const literal = findArrayLiteral(implSrc, name);
    if (!literal) continue;
    let items;
    try { items = evalArrayLiteral(literal, `${file} ${name}`); }
    catch (e) { console.warn(`  ! ${file}: skipping ${name} — ${e.message}`); continue; }
    if (!Array.isArray(items)) continue;
    items.forEach(item => {
      const s = itemToSection(item, sections.length);
      if (s) sections.push(s);
    });
  }
  return sections;
}

/* ---------- lesson FAQs and topic clusters ------------------------------ */

/* Two decks already ship question/answer data built for their own quiz and
   flashcard UI. Reused verbatim rather than rewritten.

   For QUIZ_QUESTIONS only `q` and `explain` are published — `explain` is a
   complete standalone answer, while `options`/`correct` are the answer key and
   are deliberately left in the interactive deck. */
function extractFaq(implSrc, file) {
  const out = [];
  const read = (name, qKey, aKey) => {
    const literal = findArrayLiteral(implSrc, name);
    if (!literal) return;
    let items;
    try { items = evalArrayLiteral(literal, `${file} ${name}`); }
    catch (e) { console.warn(`  ! ${file}: skipping ${name} FAQ — ${e.message}`); return; }
    if (!Array.isArray(items)) return;
    for (const it of items) {
      if (it && typeof it[qKey] === "string" && typeof it[aKey] === "string" && it[qKey].trim() && it[aKey].trim()) {
        out.push({ q: it[qKey].trim(), a: it[aKey].trim() });
      }
    }
  };
  read("QUIZ_QUESTIONS", "q", "explain");
  read("FLASHCARDS", "front", "back");
  return out;
}

/* Hand-written answers to the questions students actually search for. These
   merge with (and lead) anything auto-derived above. */
const DECK_FAQ = {
  "er-diagrams": [
    { q: "What is an ER diagram?", a: "An entity-relationship diagram is a blueprint for a database, drawn before any code is written. It shows the real-world things you want to store (entities), their properties (attributes), and how they connect (relationships). Peter Chen introduced the notation in 1976 and it is language-neutral, so any team can read it." },
    { q: "What is the difference between Chen's notation and Crow's Foot?", a: "Chen's notation uses distinct geometric shapes — rectangles for entities, ellipses for attributes, diamonds for relationships — and labels cardinality with 1, N and M. Crow's Foot draws entities as boxes listing their attributes and encodes cardinality in the line ending itself. Chen's is clearer for teaching the concepts; Crow's Foot is more compact and more common in industry tooling." },
    { q: "How do you read 1:1, 1:N and M:N cardinality?", a: "1:1 means each instance on one side matches exactly one on the other. 1:N means one instance on the left side can match many on the right, but each of those matches only one on the left. M:N means instances on both sides can match many on the other, and it always becomes a separate junction table when you build the database." },
    { q: "How does an ER diagram map to actual database tables?", a: "Each entity becomes a table, each attribute becomes a column, and each key attribute becomes the primary key. One-to-many relationships become a foreign key on the many side; many-to-many relationships become a new junction table holding both foreign keys." }
  ],
  "er-attributes": [
    { q: "What is the difference between a composite and a multivalued attribute?", a: "A composite attribute is one value split into parts — Name is First plus Last. A multivalued attribute is several separate values of the same kind — a customer with three phone numbers. They use different notation and map to the database differently: composites become multiple columns, multivalued attributes become a separate table." },
    { q: "What is a derived attribute?", a: "An attribute whose value is calculated from other stored data rather than stored itself — age derived from date of birth, or order total derived from line items. It is drawn with a dashed ellipse, and is normally computed on read instead of being stored, so it cannot fall out of sync." }
  ],
  "er-advanced": [
    { q: "What is a weak entity?", a: "An entity that cannot be identified by its own attributes alone and depends on another entity to exist. A hotel room number only makes sense alongside the hotel it belongs to. It is drawn with a double rectangle and connects to its owner through an identifying relationship, drawn as a double diamond." },
    { q: "When do you need a ternary relationship?", a: "When three entities genuinely participate in one relationship at the same time and splitting it into separate binary relationships would lose meaning — for example a supplier supplying a specific part to a specific project. If the fact only holds when all three are considered together, it is genuinely ternary." }
  ],
  "sql-programming": [
    { q: "What is the difference between CREATE DATABASE and CREATE TABLE?", a: "CREATE DATABASE makes an empty container to hold tables. CREATE TABLE defines the actual structure — the columns, their data types, and the constraints — inside that container. You run CREATE DATABASE once, then CREATE TABLE for each table you need." },
    { q: "What order do the parts of a SELECT statement go in?", a: "SELECT columns, FROM table, WHERE row conditions, GROUP BY grouping, HAVING conditions on groups, then ORDER BY sorting. The database does not execute them in that order — FROM and WHERE run before SELECT — which is why you cannot use a column alias defined in SELECT inside a WHERE clause." }
  ],
  "database-concepts": [
    { q: "What is a foreign key and why does it matter?", a: "A foreign key is a column that points at the primary key of another table, which is how two tables get linked. It also enforces referential integrity: the database refuses to store a row pointing at a record that does not exist, and can stop you deleting a record other rows still depend on." },
    { q: "How do you protect a database against SQL injection?", a: "Never build a query by concatenating user input into a string. Use parameterised queries or prepared statements so the input is always treated as a value, never as executable SQL. Validating input and limiting the database account's permissions reduce the damage if something does get through, but parameterisation is the actual fix." }
  ],
  "apa-referencing": [
    { q: "How do you cite a source with three or more authors in APA 7?", a: "Use the first author's surname followed by et al. from the very first citation. This changed in APA 7 — APA 6 required listing all authors up to five on the first mention." },
    { q: "What is the difference between a reference list and a bibliography?", a: "A reference list contains only the sources you actually cited in the text, and every in-text citation must have a matching entry. A bibliography can include background reading you consulted but never cited. APA uses a reference list." }
  ],
  "er-activities": [
    { q: "How do you practise drawing ER diagrams?", a: "Work from a written scenario. Underline the nouns to find candidate entities, underline the descriptive phrases to find attributes, and underline the verbs connecting nouns to find relationships. Then decide cardinality by asking, for each side, whether one instance can relate to more than one on the other side." },
    { q: "How do you know when an ER diagram is finished?", a: "Read it back as sentences and check it against the original scenario: every fact the scenario states should be expressible from the diagram, and every entity should have a key attribute. If a requirement cannot be read off the diagram, something is missing; if a shape does not correspond to anything in the scenario, it is probably invented." }
  ],
  "sql-certifications": [
    { q: "Which SQL certification is worth taking first?", a: "It depends where you want to work rather than which is hardest. Vendor certifications from Oracle and Microsoft carry weight if you are targeting shops built on those platforms; vendor-neutral options are more portable. For most students the value is in the structured study path and the evidence on a CV, not in the certificate itself." },
    { q: "Is a SQL certification worth it without work experience?", a: "It is worth more when paired with something you have actually built. A certificate proves you studied; a small project with a real schema, sensible keys and queries you can explain proves you can apply it. Employers hiring graduates tend to ask about the project, so treat the certification as the study plan rather than the outcome." }
  ],
  "jira-certifications": [
    { q: "Do Jira certifications actually help getting hired?", a: "They help most as supporting evidence when you already have project experience to point at. On their own they rarely move a hiring decision, but they signal familiarity with agile tooling and give you vocabulary for interviews — which matters for graduate roles where you have little else to show." },
    { q: "What is the difference between the Atlassian certifications?", a: "They split by role. User-level certifications cover working inside Jira day to day — boards, workflows, reporting. Administrator certifications cover configuring projects, permissions and schemes for other people. Pick the one matching the job you are applying for; the administrator track assumes you already know the user-level material." }
  ],
  "vibe-to-production": [
    { q: "What does it take to move an AI-generated prototype to production?", a: "The prototype proves the idea works; production adds everything it skipped — error handling, input validation, authentication, tests, monitoring, and a deployment path someone else can run. Expect the hardening to take longer than the original build, and treat generated code as a first draft you own rather than finished work." },
    { q: "What usually breaks first when a prototype meets real users?", a: "Input you did not anticipate and state you did not persist. Prototypes are demonstrated on the happy path with one user, so the first real failures are unhandled edge cases, missing validation, and data that vanishes on refresh. Close those before performance work — performance problems are rarely what stops an early product." }
  ]
};

/* Related-lesson clusters. Ten pages that link to nothing become two dense
   topical hubs, which is where much of the ranking lift comes from. */
const DECK_CLUSTERS = [
  ["er-diagrams", "er-attributes", "er-advanced", "er-activities"],
  ["sql-programming", "database-concepts", "sql-certifications"],
  ["apa-referencing"],
  ["vibe-to-production", "jira-certifications"]
];

function relatedSlugs(slug) {
  const cluster = DECK_CLUSTERS.find(c => c.includes(slug)) || [];
  const siblings = cluster.filter(s => s !== slug);
  if (siblings.length) return siblings;
  // Singleton cluster — link one page from each other cluster so it isn't orphaned.
  return DECK_CLUSTERS.filter(c => !c.includes(slug)).map(c => c[0]);
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
      pills,
      ...loadDeckContent(src, file)
    });
  }
  decks.sort((a, b) => a.slug.localeCompare(b.slug));
  deckIndex.clear();
  for (const d of decks) deckIndex.set(d.slug, d);
  return decks;
}

/* slug -> deck, so a page can name and link its related lessons. */
const deckIndex = new Map();

/* Resolves the wrapper's deck component (`import ERDiagramsDeck from
   './ERDiagramsDeck'`) and pulls its teaching content out of the source. */
function loadDeckContent(wrapperSrc, wrapperFile) {
  const imports = [...wrapperSrc.matchAll(/import\s+([A-Z][A-Za-z0-9_]*)\s+from\s+['"]\.\/([^'"]+)['"]/g)];
  for (const [, , rel] of imports) {
    const implPath = path.join(LESSONS_SRC_DIR, `${rel}.tsx`);
    if (!fs.existsSync(implPath)) continue;
    const implSrc = fs.readFileSync(implPath, "utf8");
    const implFile = `${rel}.tsx`;

    const faq = extractFaq(implSrc, implFile);
    if (findArrayLiteral(implSrc, "SLIDES")) {
      return { sections: extractDeckSections(implSrc, implFile), faq, sourceFile: implFile };
    }
    const sections = extractComponentSections(implSrc, implFile);
    if (sections.length) return { sections, faq, sourceFile: implFile };
    throw new Error(
      `${implFile}: no SLIDES array and none of the known content arrays ` +
      `(${COMPONENT_CONTENT_ARRAYS.join(", ")}) yielded prose. ` +
      `If this deck was restructured, teach loadDeckContent() its new shape — ` +
      `do not let it silently regenerate a thin page.`
    );
  }
  throw new Error(`${wrapperFile}: could not resolve a deck component import`);
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
<link rel="preload" href="${up}assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin=""/>
<link href="${up}assets/css/fonts.css" rel="stylesheet"/>
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

  const sections = deck.sections || [];
  // Hand-written questions lead — they target real search queries. Deck-derived
  // quiz and flashcard entries follow, de-duplicated by question text.
  const seen = new Set();
  const faq = [...(DECK_FAQ[deck.slug] || []), ...(deck.faq || [])]
    .filter(item => { const k = norm(item.q); if (seen.has(k)) return false; seen.add(k); return true; });
  const related = relatedSlugs(deck.slug)
    .map(s => deckIndex.get(s))
    .filter(Boolean);

  const jsonLd = [{
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": deck.title,
    "description": deck.subtitle || deck.shortSubtitle,
    "url": canonical,
    "learningResourceType": ["Lesson", "Presentation", "Interactive Resource"],
    "teaches": topics,
    "keywords": topics.join(", "),
    "isAccessibleForFree": true,
    "inLanguage": "en",
    "educationalUse": ["instruction", "self study"],
    "timeRequired": `PT${Math.max(5, Math.round(sections.length * 1.5))}M`,
    "dateModified": today,
    "about": deck.eyebrow || undefined,
    "author": { "@type": "Person", "name": "Dr. Yasas Sri Wickramasinghe", "url": SITE_URL + "/" },
    "provider": { "@type": "Organization", "name": "Dr. Yasas Sri Wickramasinghe — Academic Platform", "url": SITE_URL + "/app/" },
    "isPartOf": { "@type": "WebSite", "@id": SITE_URL + "/#website" },
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
    "hasPart": sections.map(s => ({
      "@type": "LearningResource", "name": s.heading, "url": `${canonical}#${s.id}`
    }))
  }, breadcrumbLd([
    ["Home", `${SITE_URL}/`],
    ["Teaching", `${SITE_URL}/teaching.html`],
    ["Lessons", `${SITE_URL}/app/#/lessons`],
    [deck.title, canonical]
  ])];

  if (faq.length >= 2) jsonLd.push(faqLd(faq));

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
      This is the full written version of an interactive, slide-by-slide lesson deck used in
      teaching. Everything covered in the deck is below — open the interactive version to work
      through it with live diagrams, worked examples and a practice quiz where included.
    </p>
  </div>
</section>
${sections.length ? `<section class="section">
  <div class="container">
    <div class="section-head reveal">
      <span class="idx">02</span>
      <h2>Lesson <em>contents</em></h2>
    </div>
    <ol style="max-width:70ch; line-height:1.9; color:var(--text-dim);">
      ${sections.map(s => `<li><a href="#${esc(s.id)}">${esc(s.heading)}</a></li>`).join("\n      ")}
    </ol>
  </div>
</section>
<section class="section">
  <div class="container" style="max-width:74ch;">
    ${sections.map(s => renderSection(s)).join("\n    ")}
  </div>
</section>` : ""}
${faq.length ? `<section class="section">
  <div class="container" style="max-width:74ch;">
    <div class="section-head reveal">
      <h2>Common <em>questions</em></h2>
    </div>
    ${faq.map(f => `<h3>${esc(f.q)}</h3>\n    <p>${esc(f.a)}</p>`).join("\n    ")}
  </div>
</section>` : ""}
${related.length ? `<section class="section">
  <div class="container">
    <div class="section-head reveal">
      <h2>Related <em>lessons</em></h2>
    </div>
    <ul class="feat" style="grid-template-columns:1fr 1fr;">
      ${related.map(r => `<li><a href="${esc(r.slug)}.html">${esc(r.title)}</a> — ${esc(r.shortSubtitle || r.subtitle)}</li>`).join("\n      ")}
    </ul>
  </div>
</section>` : ""}
<section class="section">
  <div class="container">
    <div class="section-head reveal">
      <h2>Work through it <em>interactively</em></h2>
    </div>
    <p style="color:var(--text-dim); font-weight:300; max-width:70ch;">
      The interactive deck adds live diagrams, step-by-step reveals and practice activities
      that this written version can't carry.
    </p>
    <div class="hero-actions reveal" style="margin-top:24px;">
      <a class="btn btn-solid" href="${esc(spaUrl)}">Open the Interactive Deck <span class="arrow">→</span></a>
      <a class="btn" href="../../teaching.html">See how I teach <span class="arrow">→</span></a>
      <a class="btn" href="../#/newsletter">Get new lessons by email <span class="arrow">→</span></a>
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

function faqLd(faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };
}

function breadcrumbLd(pairs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": pairs.map(([name, item], i) => ({
      "@type": "ListItem", "position": i + 1, "name": name, "item": item
    }))
  };
}

/* Renders one extracted section. Short blocks read as list items, longer ones
   as paragraphs — the decks mix both and forcing either alone reads badly.
   Blocks already carry only whitelisted inline tags, so they are not re-escaped. */
function renderSection(s) {
  const out = [`<h2 id="${esc(s.id)}">${esc(s.heading)}</h2>`];
  let list = [];
  const flush = () => {
    if (!list.length) return;
    out.push(`<ul>\n      ${list.map(b => `<li>${b}</li>`).join("\n      ")}\n    </ul>`);
    list = [];
  };
  for (const b of s.blocks) {
    if (stripTags(b).split(/\s+/).filter(Boolean).length < 15) list.push(b);
    else { flush(); out.push(`<p>${b}</p>`); }
  }
  flush();
  if (s.code) out.push(`<pre><code>${esc(s.code)}</code></pre>`);
  return out.join("\n    ");
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

/* Articles repatriated from readclub.me, Medium and Level Up Coding.

   These are self-canonical: the whole point is that the writing earns ranking
   for this domain rather than someone else's. Each keeps a visible credit line
   linking the original, and lives at depth 1 under writing/ rather than in
   app/blog/, whose pages link into an SPA route these articles don't have. */
function renderWritingArticlePage(article) {
  const { slug, title, summary, category, originalUrl, originalSource, body } = article;
  const canonical = `${SITE_URL}/writing/${slug}.html`;
  const pageTitle = `${title} | Dr. Yasas Sri Wickramasinghe`;

  const jsonLd = [{
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": summary,
    "url": canonical,
    "inLanguage": "en",
    "articleSection": category || undefined,
    "author": { "@type": "Person", "name": "Dr. Yasas Sri Wickramasinghe", "url": SITE_URL + "/" },
    "publisher": { "@type": "Person", "name": "Dr. Yasas Sri Wickramasinghe", "url": SITE_URL + "/" },
    "isPartOf": { "@type": "WebSite", "@id": SITE_URL + "/#website" },
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonical }
  }, breadcrumbLd([
    ["Home", `${SITE_URL}/`],
    ["Writing", `${SITE_URL}/blogs.html`],
    [title, canonical]
  ])];

  const bodyHtml = `
    <span class="eyebrow reveal">${esc(category || "Writing")}</span>
    <h1 class="reveal" style="--d:.1s">${esc(title)}</h1>
    <p class="lead reveal" style="--d:.2s">${esc(summary)}</p>
  </div>
</header>
<section class="section">
  <div class="container prose" style="max-width:72ch;">
    ${mdToHtml(body)}
    ${originalUrl ? `<hr/>
    <p style="color:var(--text-dim); font-weight:300; font-size:14px;">
      Originally published on <a href="${esc(originalUrl)}" target="_blank" rel="noopener">${esc(originalSource || "another site")}</a>.
    </p>` : ""}
    <div class="hero-actions reveal" style="margin-top:32px;">
      <a class="btn" href="../blogs.html">More writing <span class="arrow">→</span></a>
      <a class="btn btn-solid" href="../app/#/newsletter">Get new posts by email <span class="arrow">→</span></a>
    </div>
  </div>
</section>`;

  return pageShell({
    depth: 1,
    title: pageTitle,
    description: summary,
    canonical,
    ogImage: `${SITE_URL}/assets/images/og-card.png`,
    jsonLd,
    bodyHtml,
    breadcrumbLabel: `Writing / ${title}`
  });
}

function loadWritingArticles() {
  if (!fs.existsSync(writingDir)) return [];
  return fs.readdirSync(writingDir)
    .filter(f => f.endsWith(".md"))
    .map(f => {
      const { meta, body } = parseFrontMatter(fs.readFileSync(path.join(writingDir, f), "utf8"));
      const slug = meta.slug || slugify(meta.title || f.replace(/\.md$/, ""));
      if (!meta.title) { console.warn(`  ! ${f}: no title in front matter — skipping`); return null; }
      return { ...meta, slug, body };
    })
    .filter(Boolean)
    .sort((a, b) => a.slug.localeCompare(b.slug));
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
  console.log(`\n[1/4] Lesson decks: found ${decks.length} page-wrapper file(s) in app/lessons-src/src/lessons/`);
  const lessonsOutDir = path.join(REPO_ROOT, "app", "lessons");
  if (!dryRun) fs.mkdirSync(lessonsOutDir, { recursive: true });
  const newUrls = [];
  const thin = [];
  for (const deck of decks) {
    const outPath = path.join(lessonsOutDir, `${deck.slug}.html`);
    const html = renderLessonDeckPage(deck);
    const words = countWords(html);
    if (words < MIN_DECK_WORDS) thin.push(`${deck.slug} (${words} words, from ${deck.sourceFile})`);
    if (!dryRun) fs.writeFileSync(outPath, html);
    console.log(`  ${dryRun ? "(dry-run) would write" : "wrote"} app/lessons/${deck.slug}.html` +
      `  — ${deck.sections.length} section(s), ${words} words`);
    newUrls.push(`${SITE_URL}/app/lessons/${deck.slug}.html`);
  }
  if (thin.length) {
    console.error(`\n  ! These pages fell below the ${MIN_DECK_WORDS}-word floor, which means extraction`);
    console.error(`    probably failed for them rather than the lesson genuinely being short:`);
    for (const t of thin) console.error(`      - ${t}`);
    process.exitCode = 1;
  }

  // (2) & (3) Blog posts + lesson articles — Firestore (if creds given) or local JSON export.
  let posts = [];
  let lessonArticles = [];
  if (serviceAccountPath) {
    console.log(`\n[2/4] Pulling live data from Firestore using ${serviceAccountPath} ...`);
    ({ posts, lessonArticles } = await fetchFromFirestore(serviceAccountPath));
  } else {
    console.log(`\n[2/4] No --service-account given. Looking for local JSON export at:`);
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

  // (3) Repatriated writing — markdown in content/writing/, no credentials needed.
  const writing = loadWritingArticles();
  console.log(`\n[3/4] Writing: found ${writing.length} article(s) in ${path.relative(REPO_ROOT, writingDir)}`);
  if (writing.length) {
    const writingOutDir = path.join(REPO_ROOT, "writing");
    if (!dryRun) fs.mkdirSync(writingOutDir, { recursive: true });
    for (const article of writing) {
      const outPath = path.join(writingOutDir, `${article.slug}.html`);
      const html = renderWritingArticlePage(article);
      if (!dryRun) fs.writeFileSync(outPath, html);
      console.log(`  ${dryRun ? "(dry-run) would write" : "wrote"} writing/${article.slug}.html  — ${countWords(html)} words`);
      newUrls.push(`${SITE_URL}/writing/${article.slug}.html`);
    }
  }

  // (4) sitemap.xml sync
  console.log(`\n[4/4] sitemap.xml`);
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
