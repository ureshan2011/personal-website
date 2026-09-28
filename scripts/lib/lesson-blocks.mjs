/* ==========================================================================
   lesson-blocks.mjs — extracted lesson text → readable HTML

   Takes the block list that extract-lesson-text.mjs saves (headings,
   paragraphs, lists, tables, code, small-caps labels) and lays it out as an
   article: headings renumbered from h2 down with ids for the contents list,
   labels folded into the heading they sit over, runs of short fragments
   gathered into one list, tables wrapped so they scroll on a phone instead of
   widening the page.

   Block `html` is already escaped by the extractor and only carries
   <strong>, <em> and <code>, so it goes into the page as-is; `text` (code)
   is escaped here.
   ========================================================================== */

import { esc } from './site-shell.mjs';

const plain = (h) =>
  String(h ?? '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();
const norm = (h) => plain(h).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const wordCount = (h) => plain(h).split(/\s+/).filter(Boolean).length;
const slugify = (s) =>
  String(s).toLowerCase().replace(/&[a-z]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 60) || 'part';

/* A fragment: short, and not a sentence. Three or more in a row read as a list. */
const isFragment = (b) => b.t === 'p' && wordCount(b.html) <= 9 && !/[.!?:]$/.test(plain(b.html));

/* Drops the lesson's own hero (title, byline, chips) from the top of the text:
   the page already has a hero, and repeating it pushes the lesson down. */
function trimHero(blocks, title, lead) {
  // The page lead is often the lesson's own lede, word for word.
  if (lead) blocks = blocks.filter((b) => !(b.t === 'p' && norm(b.html) === norm(lead)));
  const firstH = blocks.findIndex((b) => b.t === 'h');
  if (firstH < 0 || firstH > 3) return blocks;
  const t = norm(title);
  const h = norm(blocks[firstH].html);
  const sameTitle = h === t || t.includes(h) || h.includes(t) || /^let s make sense of/.test(h);
  if (!sameTitle) return blocks;
  let out = blocks.slice(firstH + 1);
  // The deck lede and its emoji chips repeat the page lead.
  while (out.length && (out[0].t === 'eyebrow' || (out[0].t === 'p' && /^\p{Extended_Pictographic}/u.test(plain(out[0].html))))) out = out.slice(1);
  return out;
}

export function renderBlocks(rawBlocks, { title = '', lead = '', idPrefix = '' } = {}) {
  const blocks = trimHero(rawBlocks, title, lead);
  const levels = blocks.filter((b) => b.t === 'h').map((b) => b.level);
  const count = (l) => levels.filter((x) => x === l).length;
  const distinct = [...new Set(levels)].sort((a, b) => a - b);
  // The shallowest level that is used as sections becomes h2, the next h3,
  // anything deeper h4. A lone heading above a run of sections (a deck's
  // title slide) is not the level the sections are counted from.
  let top = distinct[0] ?? 2;
  while (count(top) === 1 && distinct.some((l) => l > top && count(l) >= 3)) top = distinct.find((l) => l > top);
  const tag = (level) => `h${Math.max(2, Math.min(4, 2 + (level - top)))}`;

  const toc = [];
  const used = new Set();
  const out = [];
  let words = 0;
  let pendingKicker = null;
  let lastWasHeading = false;

  const flushKicker = () => {
    if (pendingKicker) out.push(`<p class="lp-label">${pendingKicker}</p>`);
    pendingKicker = null;
  };

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.t === 'eyebrow') {
      flushKicker();
      const next = blocks[i + 1];
      if (next && next.t === 'h') pendingKicker = b.html;
      else out.push(`<p class="lp-label">${b.html}</p>`);
      continue;
    }
    if (b.t === 'h') {
      const t = tag(b.level);
      let id = '';
      if (t === 'h2') {
        id = `${idPrefix}${slugify(plain(b.html))}`;
        while (used.has(id)) id += '-2';
        used.add(id);
        toc.push({ id, text: plain(b.html) });
      }
      const kicker = pendingKicker ? `<span class="lp-kicker">${pendingKicker}</span>` : '';
      pendingKicker = null;
      out.push(`<${t}${id ? ` id="${id}"` : ''}>${kicker}${b.html}</${t}>`);
      lastWasHeading = true;
      continue;
    }
    flushKicker();
    lastWasHeading = false;
    if (b.t === 'p' && isFragment(b) && blocks[i + 1] && isFragment(blocks[i + 1]) && blocks[i + 2] && isFragment(blocks[i + 2])) {
      const items = [];
      while (blocks[i] && isFragment(blocks[i])) items.push(blocks[i++].html);
      i--;
      words += items.reduce((n, h) => n + wordCount(h), 0);
      out.push(`<ul class="lp-bits">${items.map((h) => `<li>${h}</li>`).join('')}</ul>`);
      continue;
    }
    switch (b.t) {
      case 'p':
        words += wordCount(b.html);
        out.push(`<p>${b.html}</p>`);
        break;
      case 'quote':
        words += wordCount(b.html);
        out.push(`<blockquote><p>${b.html}</p></blockquote>`);
        break;
      case 'pre':
        words += wordCount(b.text);
        out.push(`<pre><code>${esc(b.text)}</code></pre>`);
        break;
      case 'ul':
      case 'ol':
        words += b.items.reduce((n, h) => n + wordCount(h), 0);
        out.push(`<${b.t}>${b.items.map((h) => `<li>${h}</li>`).join('')}</${b.t}>`);
        break;
      case 'table': {
        const rows = b.rows.filter((r) => r.some((c) => plain(c)));
        if (!rows.length) break;
        words += rows.flat().reduce((n, h) => n + wordCount(h), 0);
        const width = Math.max(...rows.map((r) => r.length));
        const headed = b.head || (rows.length > 1 && rows[0].every((c) => wordCount(c) <= 4));
        const cells = (r, tagName) =>
          r.map((c, j) => `<${tagName}${r.length === 1 && width > 1 ? ` colspan="${width}"` : ''}>${c}</${tagName}>`).join('');
        const head = headed ? `<thead><tr>${cells(rows[0], 'th')}</tr></thead>` : '';
        const bodyRows = (headed ? rows.slice(1) : rows).map((r) => `<tr>${cells(r, 'td')}</tr>`).join('');
        out.push(`<div class="lp-table" tabindex="0" role="region" aria-label="Table"><table>${head}<tbody>${bodyRows}</tbody></table></div>`);
        break;
      }
    }
  }
  flushKicker();
  // A heading with nothing under it (a quiz title whose questions are buttons).
  while (lastWasHeading && out.length && /^<h[2-4]/.test(out[out.length - 1])) {
    const h = out.pop();
    const id = h.match(/ id="([^"]+)"/)?.[1];
    if (id) toc.splice(toc.findIndex((t) => t.id === id), 1);
  }
  return { html: out.join('\n'), toc, words };
}

export { plain, wordCount, slugify };
