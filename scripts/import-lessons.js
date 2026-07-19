#!/usr/bin/env node
/* ==========================================================================
   One-time migration: reads the Markdown lesson content from a local
   checkout of the "thisisnotalms" (YooBees) repo's study-pack, strips every
   course code and Yoobee-specific identifier, copies referenced diagram
   SVGs into this repo, and writes each lesson into the `lessons` Firestore
   collection as a DRAFT (never auto-published — review and publish each
   one via the admin UI at /app/#/admin, "Lessons" tab).

   Sanitization rules (see sanitize() / assertClean() below):
     - Course codes matching /\bMBI80\d\b/i  -> replaced with "the course"
     - "Yoobee" / "YooBees" (any case)       -> stripped
     - "for enrolled students only"          -> stripped
     - Any yoobeecolleges/yoobeestudent URL  -> stripped
   After sanitizing, assertClean() re-scans the result and THROWS instead
   of writing if anything still matches -- that lesson needs a manual look
   rather than silently publishing a leftover identifier.

   Usage:
     npm install firebase-admin --no-save
     node scripts/import-lessons.js /path/to/thisisnotalms/checkout --dry-run
     node scripts/import-lessons.js /path/to/thisisnotalms/checkout /path/to/service-account.json

   --dry-run prints each lesson's sanitized title/subtitle/content to
   stdout instead of touching Firestore or copying any files -- always run
   this first and read the output before doing a real import.

   Getting a service account key:
     Firebase console -> Project settings -> Service accounts ->
     Generate new private key. Treat the downloaded JSON like a password --
     never commit it. Delete it once this script has run.
   ========================================================================== */
"use strict";

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const positional = args.filter(a => a !== "--dry-run");
const sourceRepoPath = positional[0];
const keyPath = positional[1];

if (!sourceRepoPath) {
  console.error("Usage: node scripts/import-lessons.js <path-to-thisisnotalms-checkout> [service-account.json] [--dry-run]");
  process.exit(1);
}
if (!dryRun && !keyPath) {
  console.error("A service-account.json path is required unless --dry-run is passed.");
  process.exit(1);
}

const contentDir = path.join(sourceRepoPath, "study-pack", "content");
if (!fs.existsSync(contentDir)) {
  console.error("Couldn't find study-pack/content under", sourceRepoPath);
  process.exit(1);
}

const REPO_ROOT = path.join(__dirname, "..");
const DIAGRAMS_OUT_ROOT = path.join(REPO_ROOT, "assets", "img", "lessons");

/* ---------- sanitization --------------------------------------------------- */

const COURSE_CODE_RE = /\bMBI80\d\b/gi;
const COURSE_CODE_CHECK_RE = /\bMBI80\d\b/i;
const YOOBEE_RE = /\byoobees?\b/gi;
const YOOBEE_CHECK_RE = /yoobee/i;
const ENROLLED_RE = /for enrolled students only/gi;
const ENROLLED_CHECK_RE = /enrolled students only/i;
const YOOBEE_LINK_RE = /https?:\/\/[^\s)]*yoobee[^\s)]*/gi;

function sanitize(text) {
  return String(text || "")
    .replace(YOOBEE_LINK_RE, "")
    .replace(COURSE_CODE_RE, "the course")
    .replace(YOOBEE_RE, "")
    .replace(ENROLLED_RE, "")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function assertClean(text, label) {
  if (COURSE_CODE_CHECK_RE.test(text) || YOOBEE_CHECK_RE.test(text) || ENROLLED_CHECK_RE.test(text)) {
    throw new Error(`Residual course code / Yoobee identifier survived sanitization in ${label} -- fix the source text and re-run.`);
  }
}

const slugify = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80) || "lesson";
const readingTime = md => Math.max(1, Math.round(String(md).trim().split(/\s+/).length / 200));

/* ---------- minimal frontmatter parser --------------------------------------
   Handles exactly the shape used by these lesson files:
     ---
     number: 1
     title: Some Title
     subtitle: Some subtitle text
     objectives:
       - First objective
       - Second objective
     ---
   Not a general YAML parser -- deliberately narrow to this known shape.  */
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const [, fmText, body] = m;
  const meta = {};
  const lines = fmText.split("\n");
  let i = 0;
  while (i < lines.length) {
    const kv = lines[i].match(/^(\w+):\s*(.*)$/);
    if (kv) {
      const [, key, val] = kv;
      if (val.trim() === "") {
        const items = [];
        let j = i + 1;
        while (j < lines.length && /^\s*-\s+/.test(lines[j])) {
          items.push(lines[j].replace(/^\s*-\s+/, "").trim());
          j++;
        }
        meta[key] = items;
        i = j;
        continue;
      }
      meta[key] = val.trim();
    }
    i++;
  }
  return { meta, body };
}

/* ---------- gather + sanitize lessons --------------------------------------- */

// Course folder names in the source repo are the course codes themselves
// (mbi800, mbi802) -- never reuse them in any output path (asset folders,
// image URLs). Map each to a generic topic slug instead. Add an entry here
// if the source repo ever gains another course folder.
const COURSE_TOPIC_SLUGS = {
  mbi800: "strategic-planning",
  mbi802: "databases"
};
function topicSlugFor(course) {
  const slug = COURSE_TOPIC_SLUGS[course];
  if (!slug) throw new Error(`No topic slug mapped for course folder "${course}" -- add one to COURSE_TOPIC_SLUGS before running (never reuse the raw course code in output paths).`);
  return slug;
}

const courses = fs.readdirSync(contentDir).filter(d => fs.statSync(path.join(contentDir, d)).isDirectory());
const lessons = [];

for (const course of courses) {
  const topicSlug = topicSlugFor(course);
  const lessonsDir = path.join(contentDir, course, "lessons");
  const diagramsDir = path.join(contentDir, course, "diagrams");
  if (!fs.existsSync(lessonsDir)) continue;

  const diagramsOutDir = path.join(DIAGRAMS_OUT_ROOT, topicSlug);
  if (fs.existsSync(diagramsDir)) {
    if (!dryRun) fs.mkdirSync(diagramsOutDir, { recursive: true });
    for (const f of fs.readdirSync(diagramsDir)) {
      if (!dryRun) fs.copyFileSync(path.join(diagramsDir, f), path.join(diagramsOutDir, f));
    }
  }

  const files = fs.readdirSync(lessonsDir).filter(f => f.endsWith(".md") && !f.endsWith(".revision.md"));
  for (const file of files) {
    const label = `${course}/${file}`;
    const raw = fs.readFileSync(path.join(lessonsDir, file), "utf8");
    const { meta, body } = parseFrontmatter(raw);

    const title = sanitize(meta.title);
    const subtitle = sanitize(meta.subtitle);
    const objectives = (meta.objectives || []).map(sanitize).filter(Boolean);
    let content = sanitize(body);
    content = content.replace(/\]\(diagrams\/([^)\s]+)\)/g, `](/assets/img/lessons/${topicSlug}/$1)`);

    assertClean(title, `${label} (title)`);
    assertClean(subtitle, `${label} (subtitle)`);
    objectives.forEach((o, idx) => assertClean(o, `${label} (objective ${idx + 1})`));
    assertClean(content, `${label} (content)`);

    if (!title || !content) {
      console.warn(`Skipping ${label}: missing title or content after parsing.`);
      continue;
    }

    lessons.push({
      _label: label,
      _order: meta.number ? Number(meta.number) : null,
      title,
      subtitle,
      objectives,
      content,
      slug: slugify(title),
      tags: [],
      readingTime: readingTime(content),
      status: "draft"
    });
  }
}

lessons.sort((a, b) => (a._order || 0) - (b._order || 0));

console.log(`Found ${lessons.length} lesson(s) across ${courses.length} course folder(s).`);

if (dryRun) {
  for (const l of lessons) {
    console.log("\n" + "=".repeat(78));
    console.log(`${l._label}  ->  slug: ${l.slug}`);
    console.log("-".repeat(78));
    console.log(`TITLE: ${l.title}`);
    console.log(`SUBTITLE: ${l.subtitle}`);
    console.log(`OBJECTIVES:\n  - ${l.objectives.join("\n  - ")}`);
    console.log(`READING TIME: ${l.readingTime} min`);
    console.log("-".repeat(78));
    console.log(l.content.slice(0, 1200) + (l.content.length > 1200 ? "\n... (truncated)" : ""));
  }
  console.log(`\nDry run complete -- nothing was written to Firestore or copied to disk.`);
  console.log(`Diagrams would be copied to: ${DIAGRAMS_OUT_ROOT}/<course>/`);
  process.exit(0);
}

/* ---------- write to Firestore ----------------------------------------------- */

const admin = require("firebase-admin");
const serviceAccount = JSON.parse(fs.readFileSync(keyPath, "utf8"));
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

async function main() {
  let written = 0;
  for (const l of lessons) {
    const { _label, _order, ...doc } = l;
    doc.createdAt = admin.firestore.FieldValue.serverTimestamp();
    await db.collection("lessons").add(doc);
    written++;
    console.log(`Imported (draft): ${_label} -> ${doc.slug}`);
  }
  console.log(`\nDone. Imported ${written} lesson(s) as drafts.`);
  console.log(`Review and publish each one at /app/#/admin ("Lessons" tab).`);
}

main().catch(e => { console.error(e); process.exit(1); });
