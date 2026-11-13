#!/usr/bin/env node
/**
 * sync-instagram-wall.mjs - keeps the Instagram "photo wall" of the /cv/ room up to date.
 *
 * Writes:
 *   content/cv-room/instagram.json          manifest read by the 3D room at runtime
 *   assets/cv-room/instagram/<id>.jpg       one image per post (<= 1080px, q84, no metadata)
 *
 * USAGE
 *   node scripts/sync-instagram-wall.mjs                      # sync
 *   node scripts/sync-instagram-wall.mjs --add <post-url>     # prepend a post (repeatable), then sync
 *   node scripts/sync-instagram-wall.mjs --remove <url|id>    # drop a post and delete its image (repeatable)
 *
 * ENV
 *   INSTAGRAM_TOKEN   optional long-lived Instagram API (Instagram Login) token for the owner's account.
 *
 * MODES
 *   With token:    newest MAX_POSTS items come from graph.instagram.com/me/media (official API);
 *                  caption (first line, <=140 chars) and timestamp are filled from the API. The token's
 *                  life is also extended via refresh_access_token (only success/failure is logged).
 *                  Posts given with --add are prepended to the API list.
 *   Without token: the posts already in the manifest are kept; missing image files are re-downloaded
 *                  from the unofficial `<permalink>media/?size=l` URL (may stop working at any time).
 *                  Captions and timestamps are left as they are.
 *
 * GUARANTEES
 *   - Idempotent: the manifest (and its `updated` stamp) is rewritten only if something changed.
 *   - Every download is checked by magic bytes (jpeg/png/webp) and size (> 5 KB). Anything else
 *     (HTML, login page, error JSON) is skipped with a warning; an existing image is kept.
 *   - Image files not referenced by the manifest are deleted.
 *   - Exit 0 as long as the existing wall is intact; non-zero only for a real failure that left
 *     things worse (unreadable manifest, I/O error, wall emptied by the run).
 *
 * Node built-ins only. Uses `curl` first (honours the HTTPS proxy), falls back to fetch.
 * Uses ImageMagick `convert`/`identify` when present, otherwise stores the original JPEG bytes.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

// ---------------------------------------------------------------- config
const MAX_POSTS = 9;          // wall capacity
const MAX_SIDE = 1080;        // px, longest side
const JPEG_QUALITY = 84;
const MIN_BYTES = 5 * 1024;   // anything smaller is an error page / placeholder
const HANDLE = 'yasassri.me';
const PROFILE = `https://www.instagram.com/${HANDLE}`;
const CAPTION_MAX = 140;

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST = path.join(ROOT, 'content/cv-room/instagram.json');
const IMG_DIR = path.join(ROOT, 'assets/cv-room/instagram');
const IMG_REL = 'assets/cv-room/instagram';

const TOKEN = (process.env.INSTAGRAM_TOKEN || '').trim();
const IN_ACTIONS = process.env.GITHUB_ACTIONS === 'true';

// ---------------------------------------------------------------- logging (never leaks the token)
const scrub = (s) => {
  s = String(s);
  return TOKEN ? s.split(TOKEN).join('***') : s;
};
const log = (m) => console.log(scrub(m));
const warn = (m) => {
  console.warn(scrub(`WARN: ${m}`));
  if (IN_ACTIONS) console.log(`::warning::${scrub(m).replace(/[\r\n]+/g, ' ')}`);
};

// ---------------------------------------------------------------- args
function parseArgs(argv) {
  const out = { add: [], remove: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--add' || a === '--remove') {
      const v = argv[++i];
      if (!v) { console.error(`${a} needs a value`); process.exit(2); }
      out[a.slice(2)].push(v);
    } else if (a.startsWith('--add=')) out.add.push(a.slice(6));
    else if (a.startsWith('--remove=')) out.remove.push(a.slice(9));
    else { console.error(`Unknown argument: ${a}`); process.exit(2); }
  }
  // Empty strings (e.g. unset workflow inputs) are ignored.
  out.add = out.add.map((s) => s.trim()).filter(Boolean);
  out.remove = out.remove.map((s) => s.trim()).filter(Boolean);
  return out;
}

/** Shortcode from /p/<code>/, /reel/<code>/, /tv/<code>/ or a bare code. */
function shortcodeOf(input) {
  const m = /instagram\.com\/(?:[\w.]+\/)?(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)/.exec(input);
  if (m) return m[1];
  return /^[A-Za-z0-9_-]{5,}$/.test(input) ? input : null;
}
const permalinkOf = (id) => `https://www.instagram.com/p/${id}/`;

// ---------------------------------------------------------------- HTTP
/** GET a URL. Returns { status, contentType, body: Buffer }. curl first, fetch as fallback. */
async function httpGet(url) {
  let curlMissing = false;
  const tmp = path.join(os.tmpdir(), `igwall-${process.pid}-${Math.random().toString(36).slice(2)}`);
  try {
    const meta = execFileSync(
      'curl',
      ['-sSL', '--max-time', '60', '--max-filesize', String(30 * 1024 * 1024),
        '-o', tmp, '-w', '%{http_code}\n%{content_type}', url],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
    );
    const [status, ...ct] = meta.trim().split('\n');
    return { status: Number(status), contentType: ct.join('\n'), body: fs.readFileSync(tmp) };
  } catch (e) {
    if (e.code === 'ENOENT') curlMissing = true;
    else log(`curl failed (${scrub(String(e.message).split('\n')[0])}); trying fetch`);
  } finally {
    fs.rmSync(tmp, { force: true });
  }
  void curlMissing;
  const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(60_000) });
  return {
    status: res.status,
    contentType: res.headers.get('content-type') || '',
    body: Buffer.from(await res.arrayBuffer()),
  };
}

async function getJson(url) {
  const r = await httpGet(url);
  let json = null;
  try { json = JSON.parse(r.body.toString('utf8')); } catch { /* not JSON */ }
  return { status: r.status, json };
}

// ---------------------------------------------------------------- images
function sniff(buf) {
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpeg';
  if (buf.length > 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'png';
  if (buf.length > 12 && buf.toString('latin1', 0, 4) === 'RIFF' && buf.toString('latin1', 8, 12) === 'WEBP') return 'webp';
  return null;
}

const haveMagick = (() => {
  try { execFileSync('convert', ['-version'], { stdio: 'ignore' }); return true; } catch { return false; }
})();

/** Width/height of a JPEG from its header (SOFn marker). */
function jpegSize(buf) {
  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    if (marker === 0xff) { i++; continue; }
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  return null;
}

function sizeOfFile(file) {
  if (haveMagick) {
    try {
      const [w, h] = execFileSync('identify', ['-format', '%w %h', `${file}[0]`], { encoding: 'utf8' }).trim().split(/\s+/).map(Number);
      if (w > 0 && h > 0) return { width: w, height: h };
    } catch { /* fall through */ }
  }
  return jpegSize(fs.readFileSync(file));
}

/**
 * Validate downloaded bytes and turn them into the final JPEG bytes.
 * Returns a Buffer, or throws Error with a human reason.
 */
function processImage(buf) {
  if (buf.length < MIN_BYTES) throw new Error(`only ${buf.length} bytes (< ${MIN_BYTES})`);
  const kind = sniff(buf);
  if (!kind) throw new Error('not a jpeg/png/webp (magic bytes) - probably an HTML/login/error page');

  if (haveMagick) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'igwall-img-'));
    const inFile = path.join(dir, `in.${kind}`);
    const outFile = path.join(dir, 'out.jpg');
    try {
      fs.writeFileSync(inFile, buf);
      execFileSync('convert', [
        `${inFile}[0]`, '-auto-orient', '-resize', `${MAX_SIDE}x${MAX_SIDE}>`,
        '-background', 'white', '-alpha', 'remove', '-alpha', 'off',
        '-strip', '-quality', String(JPEG_QUALITY), outFile,
      ], { stdio: 'ignore' });
      const out = fs.readFileSync(outFile);
      if (out.length < 1024 || sniff(out) !== 'jpeg') throw new Error('conversion produced no valid JPEG');
      return out;
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }

  // No ImageMagick: keep the original bytes, but only when they are a JPEG we can measure.
  if (kind !== 'jpeg') throw new Error(`${kind} image and ImageMagick not available`);
  const s = jpegSize(buf);
  if (!s) throw new Error('could not read JPEG dimensions');
  if (Math.max(s.width, s.height) > MAX_SIDE) warn('ImageMagick not found: saving original size (larger than 1080px)');
  return buf;
}

/**
 * Download `url`, validate, and store as assets/cv-room/instagram/<id>.jpg.
 * Returns { ok, changed }. On failure the previous file (if any) is left untouched.
 */
async function fetchImage(id, url) {
  const file = path.join(IMG_DIR, `${id}.jpg`);
  try {
    const r = await httpGet(url);
    if (r.status === 403 || r.status === 407) {
      throw new Error(`HTTP ${r.status} (refused; not retrying another route)`);
    }
    if (r.status !== 200) throw new Error(`HTTP ${r.status}`);
    const out = processImage(r.body);
    if (fs.existsSync(file) && fs.readFileSync(file).equals(out)) return { ok: true, changed: false };
    fs.mkdirSync(IMG_DIR, { recursive: true });
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, out);
    fs.renameSync(tmp, file);
    return { ok: true, changed: true };
  } catch (e) {
    warn(`${id}: image download skipped - ${e.message}${fs.existsSync(file) ? ' (keeping previous image)' : ''}`);
    return { ok: fs.existsSync(file), changed: false };
  }
}

// ---------------------------------------------------------------- manifest
function readManifest() {
  if (!fs.existsSync(MANIFEST)) return { posts: [] };
  try {
    const m = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
    if (!Array.isArray(m.posts)) throw new Error('"posts" is not an array');
    return m;
  } catch (e) {
    console.error(`ERROR: cannot read ${path.relative(ROOT, MANIFEST)}: ${e.message}`);
    process.exit(1);
  }
}

const normPost = (p) => ({
  id: p.id,
  permalink: permalinkOf(p.id), // always rebuilt from the shortcode; never trusted from the API or a hand edit
  image: `${IMG_REL}/${p.id}.jpg`,
  width: p.width || 0,
  height: p.height || 0,
  caption: p.caption || '',
  timestamp: p.timestamp || '',
});

// `pinned` are posts added by hand with --add; `excluded` are posts removed with --remove.
// Both survive the daily token-mode sync, which otherwise rebuilds the wall from the API.
function buildManifest(posts, updated, pinned, excluded) {
  return { handle: HANDLE, profile: PROFILE, updated, pinned, excluded, posts };
}
const ID_RE = /^[A-Za-z0-9_-]{5,40}$/;
const idList = (v) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string' && ID_RE.test(x)) : []);

const firstLine = (s) => String(s || '').split(/\r?\n/).find((l) => l.trim()) ?.trim().slice(0, CAPTION_MAX).trimEnd() || '';

// ---------------------------------------------------------------- Instagram API
async function apiPosts() {
  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
  const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=25&access_token=${encodeURIComponent(TOKEN)}`;
  const { status, json } = await getJson(url);
  if (status !== 200 || !json || !Array.isArray(json.data)) {
    const msg = json?.error?.message ? scrub(json.error.message) : 'no details';
    throw new Error(`Instagram API returned HTTP ${status} (${msg}). If the token has expired, create a new one and update the INSTAGRAM_TOKEN secret.`);
  }
  const items = [];
  for (const m of json.data) {
    const id = shortcodeOf(m.permalink || '');
    // VIDEO -> thumbnail; IMAGE / CAROUSEL_ALBUM -> media_url (an album's first image).
    const img = m.media_type === 'VIDEO' ? m.thumbnail_url : m.media_url;
    if (!id || !img) continue;
    items.push({ id, permalink: m.permalink, imageUrl: img, caption: firstLine(m.caption), timestamp: m.timestamp || '' });
  }
  items.sort((a, b) => (b.timestamp > a.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0));
  return items;
}

async function refreshToken() {
  try {
    const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(TOKEN)}`;
    const { status, json } = await getJson(url);
    if (status === 200 && json?.access_token) {
      const days = json.expires_in ? Math.round(json.expires_in / 86400) : '?';
      log(`Token refresh: OK (valid for about ${days} more days)`);
    } else {
      warn(`Token refresh failed (HTTP ${status}${json?.error?.message ? `: ${json.error.message}` : ''}). A new token may be needed.`);
    }
  } catch (e) {
    warn(`Token refresh failed: ${e.message}`);
  }
}

// ---------------------------------------------------------------- main
async function main() {
  const args = parseArgs(process.argv.slice(2));
  const old = readManifest();
  const oldPosts = old.posts.filter((p) => p && typeof p.id === 'string' && ID_RE.test(p.id)).map(normPost);
  let pinned = idList(old.pinned);
  let excluded = idList(old.excluded);
  const listsBefore = JSON.stringify([pinned, excluded]);
  const oldBefore = JSON.stringify(old.posts);
  let imagesChanged = false;

  // Working list, newest first.
  let posts = oldPosts.map((p) => ({ ...p }));

  // --remove
  const removeIds = new Set(args.remove.map((r) => shortcodeOf(r)).filter(Boolean));
  for (const r of args.remove) if (!shortcodeOf(r)) warn(`--remove: cannot understand "${r}"`);
  if (removeIds.size) {
    posts = posts.filter((p) => !removeIds.has(p.id));
    pinned = pinned.filter((id) => !removeIds.has(id));
    for (const id of removeIds) if (!excluded.includes(id)) excluded.push(id);
  }

  // --add (processed so that the first --add ends up first)
  const added = [];
  for (const a of args.add) {
    const id = shortcodeOf(a);
    if (!id) { warn(`--add: cannot find a shortcode in "${a}"`); continue; }
    if (removeIds.has(id) || added.includes(id)) continue;
    added.push(id);
  }
  excluded = excluded.filter((id) => !added.includes(id));
  for (const id of added) if (!pinned.includes(id)) pinned.unshift(id);
  const addedPosts = added
    .filter((id) => !posts.some((p) => p.id === id))
    .map((id) => normPost({ id }));

  const failedNew = new Set();

  if (TOKEN) {
    // ---- token mode: API is the source of truth for the wall
    let items = null;
    try { items = await apiPosts(); } catch (e) { warn(e.message); }
    if (items) {
      const byId = new Map(oldPosts.map((p) => [p.id, p]));
      const fromApi = items.filter((i) => !excluded.includes(i.id)).map((i) => ({
        ...normPost({ ...(byId.get(i.id) || {}), id: i.id, caption: i.caption, timestamp: i.timestamp }),
        _url: i.imageUrl,
      }));
      // hand-pinned posts stay at the front even when they are no longer among the newest
      const front = [...addedPosts, ...oldPosts.filter((p) => pinned.includes(p.id) && !addedPosts.some((a) => a.id === p.id))];
      posts = [...front, ...fromApi.filter((p) => !front.some((a) => a.id === p.id))];
    } else {
      warn('Falling back to the posts already in the manifest.');
      posts = [...addedPosts, ...posts];
    }
    for (const p of posts) {
      const r = await fetchImage(p.id, p._url || `${p.permalink}media/?size=l`);
      if (r.changed) imagesChanged = true;
      if (!r.ok) failedNew.add(p.id);
    }
    await refreshToken();
  } else {
    // ---- no token: keep manifest posts, (re)download any whose image is missing
    posts = [...addedPosts, ...posts];
    for (const p of posts) {
      if (fs.existsSync(path.join(IMG_DIR, `${p.id}.jpg`)) && !addedPosts.some((a) => a.id === p.id)) continue;
      const r = await fetchImage(p.id, `${p.permalink}media/?size=l`);
      if (r.changed) imagesChanged = true;
      if (!r.ok) failedNew.add(p.id);
    }
  }

  // Drop posts that have no usable image, then cap.
  for (const p of posts) {
    if (!fs.existsSync(path.join(IMG_DIR, `${p.id}.jpg`))) {
      warn(`${p.id}: no image available, leaving it off the wall`);
      failedNew.add(p.id);
    }
  }
  posts = posts.filter((p) => !failedNew.has(p.id) || fs.existsSync(path.join(IMG_DIR, `${p.id}.jpg`)));
  posts = posts.slice(0, MAX_POSTS);

  // Real pixel size of every saved file.
  for (const p of posts) {
    const s = sizeOfFile(path.join(IMG_DIR, `${p.id}.jpg`));
    if (s) { p.width = s.width; p.height = s.height; }
  }
  posts = posts.map((p) => normPost(p));

  // Safety: never leave an emptied wall behind if there was one before.
  if (!posts.length && oldPosts.length) {
    console.error('ERROR: sync would leave the wall empty; manifest not modified.');
    process.exit(1);
  }

  // Delete unreferenced images (and stray temp files).
  const keep = new Set(posts.map((p) => `${p.id}.jpg`));
  if (fs.existsSync(IMG_DIR)) {
    for (const f of fs.readdirSync(IMG_DIR)) {
      if (f === '.gitkeep' || keep.has(f)) continue;
      fs.rmSync(path.join(IMG_DIR, f), { force: true });
      imagesChanged = true;
      log(`Deleted unreferenced ${IMG_REL}/${f}`);
    }
  }

  // Write the manifest only if something changed.
  pinned = pinned.filter((id) => posts.some((p) => p.id === id));
  const changed = JSON.stringify(posts) !== oldBefore || JSON.stringify([pinned, excluded]) !== listsBefore
    || old.handle !== HANDLE || old.profile !== PROFILE || !old.updated || !Array.isArray(old.pinned) || !Array.isArray(old.excluded);
  if (changed || imagesChanged) {
    fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
    const text = `${JSON.stringify(buildManifest(posts, new Date().toISOString(), pinned, excluded), null, 2)}\n`;
    const tmp = `${MANIFEST}.tmp`;
    fs.writeFileSync(tmp, text);
    fs.renameSync(tmp, MANIFEST);
    log(`Manifest updated: ${posts.length} post(s).`);
  } else {
    log(`No changes (${posts.length} post(s)).`);
  }
}

main().catch((e) => {
  console.error(scrub(`ERROR: ${e.stack || e.message}`));
  process.exit(1);
});
