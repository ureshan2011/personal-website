// The DOM layer over the canvas: intro, HUD, find card, the CV page being typeset, settings and
// the lights-on ending. All markup lives in cv/index.html; this file only fills and toggles it.
import { ITEMS, SECTIONS } from './data.js';

const $ = (id) => document.getElementById(id);
const fmt = (s) => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

export function createUI(root, settings) {
  const handlers = {};
  const emit = (name, arg) => (handlers[name] || []).forEach((fn) => fn(arg));
  const el = {
    intro: $('cvr-intro'), loadBar: $('cvr-load-bar'), loadText: $('cvr-load-text'), startClock: $('cvr-start-clock'), startChill: $('cvr-start-chill'),
    hud: $('cvr-hud'), count: $('cvr-count'), clock: $('cvr-clock'), warm: $('cvr-warm'), warmLabel: $('cvr-warm-label'),
    reticle: $('cvr-reticle'), ring: $('cvr-ring'), toast: $('cvr-toast'), hint: $('cvr-hint'), live: $('cvr-live'),
    page: $('cvr-page'), pageBody: $('cvr-page-body'), pageCount: $('cvr-page-count'), pageToggle: $('cvr-btn-page'),
    settings: $('cvr-settings'), end: $('cvr-end'), endTitle: $('cvr-end-title'), endSub: $('cvr-end-sub'), endList: $('cvr-end-list'),
    photo: $('cvr-photo'), help: $('cvr-help'),
  };

  // ----- the CV page: one skeleton row per hidden item -----
  const rows = {};
  for (const sec of SECTIONS) {
    const wrap = document.createElement('div'); wrap.className = 'cvr-sec';
    const h = document.createElement('h3'); h.textContent = sec.n + ' · ' + sec.label; wrap.appendChild(h);
    for (const it of ITEMS.filter((i) => i.section === sec.key)) {
      const row = document.createElement('p'); row.className = 'cvr-row'; row.dataset.state = 'empty';
      row.innerHTML = '<span class="cvr-bar" style="width:' + (52 + ((it.title.length * 7) % 40)) + '%"></span>';
      wrap.appendChild(row); rows[it.id] = row;
    }
    el.pageBody.appendChild(wrap);
  }
  function setRow(def, fresh) {
    const row = rows[def.id]; if (!row) return;
    row.dataset.state = fresh ? 'fresh' : 'set';
    row.textContent = '';
    const strong = document.createElement('strong'); strong.textContent = def.title;
    row.appendChild(strong);
    const meta = [def.org, def.years].filter(Boolean).join(', ');
    if (meta) row.appendChild(document.createTextNode(' · ' + meta));
  }
  function resetRows() {
    for (const it of ITEMS) {
      const row = rows[it.id]; row.dataset.state = 'empty';
      row.innerHTML = '<span class="cvr-bar" style="width:' + (52 + ((it.title.length * 7) % 40)) + '%"></span>';
    }
  }

  // ----- wiring -----
  el.startClock.addEventListener('click', () => emit('start', { timed: true }));
  el.startChill.addEventListener('click', () => emit('start', { timed: false }));
  root.querySelectorAll('[data-act]').forEach((b) => b.addEventListener('click', (e) => {
    const act = b.dataset.act;
    if (act === 'settings') { openSettings(true); return; }
    if (act === 'settings-close') { openSettings(false); return; }
    if (act === 'page') { togglePage(); return; }
    if (act === 'photo-close') { el.photo.hidden = true; return; }
    if (act === 'end-close') { el.end.dataset.min = el.end.dataset.min === '1' ? '0' : '1'; b.setAttribute('aria-expanded', el.end.dataset.min !== '1'); return; }
    emit(act, e);
  }));
  root.querySelectorAll('[data-setting]').forEach((b) => {
    const key = b.dataset.setting;
    const sync = () => b.setAttribute('aria-checked', settings[key] ? 'true' : 'false');
    sync();
    b.addEventListener('click', () => { settings[key] = !settings[key]; sync(); emit('setting', key); });
  });
  let lastFocus = null;
  function openSettings(open) {
    el.settings.hidden = !open;
    if (open) { lastFocus = document.activeElement; el.settings.querySelector('button').focus(); } else if (lastFocus) lastFocus.focus();
    emit('pause', open);
  }
  el.settings.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { openSettings(false); return; }
    if (e.key !== 'Tab') return; // keep focus inside the dialog while it is open
    const f = el.settings.querySelectorAll('button');
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  function togglePage(force) {
    const open = force !== undefined ? force : el.page.dataset.open !== '1';
    el.page.dataset.open = open ? '1' : '0';
    el.pageToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  let toastTimer = 0, hintTimer = 0, lastWarm = -1, lastClock = '', lastRing = -1;
  const warmWords = ['Cold', 'Cool', 'Warm', 'Warmer', 'Hot'];

  return {
    on(name, fn) { (handlers[name] = handlers[name] || []).push(fn); },
    progress(f) { if (el.intro.dataset.ready === '1') return; el.loadBar.style.transform = 'scaleX(' + Math.min(1, f).toFixed(3) + ')'; el.loadText.textContent = 'Lighting the room… ' + Math.round(f * 100) + '%'; },
    ready() {
      el.intro.dataset.ready = '1'; el.loadText.textContent = 'Ready.';
      el.startClock.disabled = false; el.startChill.disabled = false;
    },
    fail(message) { $('cvr-fallback').hidden = false; $('cvr-fallback-text').textContent = message; el.intro.hidden = true; },
    play({ timed, total }) {
      el.intro.hidden = true; el.end.hidden = true; el.hud.hidden = false; el.page.hidden = false; el.photo.hidden = true;
      el.clock.hidden = false; el.count.textContent = 'Found 0 / ' + total; el.pageCount.textContent = '0 of ' + total + ' lines set';
      root.dataset.phase = 'play'; root.dataset.timed = timed ? '1' : '0';
      resetRows(); lastWarm = -1;
      if (window.matchMedia('(min-width: 900px)').matches) togglePage(true); else togglePage(false);
      el.help.dataset.show = '1'; setTimeout(() => { el.help.dataset.show = '0'; }, 9000);
    },
    found(def, where, note, count, total, elapsed) {
      el.count.textContent = 'Found ' + count + ' / ' + total;
      el.pageCount.textContent = count + ' of ' + total + ' lines set';
      for (const id in rows) if (rows[id].dataset.state === 'fresh') rows[id].dataset.state = 'set';
      setRow(def, true);
      el.toast.querySelector('.t-where').textContent = 'Found · ' + where;
      el.toast.querySelector('.t-title').textContent = def.title;
      el.toast.querySelector('.t-org').textContent = [def.org, def.years].filter(Boolean).join(' · ');
      el.toast.querySelector('.t-detail').textContent = def.detail;
      el.toast.querySelector('.t-note').textContent = note || def.note;
      el.toast.hidden = false; el.toast.dataset.show = '1';
      clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.toast.dataset.show = '0'; }, 7500);
      el.live.textContent = 'Found ' + count + ' of ' + total + ': ' + def.title + (def.org ? ', ' + def.org : '') + '.';
      el.pageToggle.dataset.pulse = '1'; setTimeout(() => { el.pageToggle.dataset.pulse = '0'; }, 1200);
    },
    hint(text) {
      el.hint.textContent = text; el.hint.dataset.show = '1'; el.live.textContent = text;
      clearTimeout(hintTimer); hintTimer = setTimeout(() => { el.hint.dataset.show = '0'; }, 3200);
    },
    timeUp(found, total) {
      el.clock.textContent = '0:00';
      this.hint('Time. ' + found + ' of ' + total + ' found. Keep looking, or switch the lights on.');
    },
    clock(seconds, timed) {
      const s = fmt(seconds) + (timed ? ' left' : '');
      if (s !== lastClock) { lastClock = s; el.clock.textContent = s; }
    },
    aim(progress, warmth) {
      const ring = Math.round(progress * 50);
      if (ring !== lastRing) { lastRing = ring; el.ring.style.strokeDashoffset = String(100 - ring * 2); el.reticle.dataset.on = ring > 0 ? '1' : '0'; }
      const level = settings.hints ? Math.min(4, Math.floor(warmth * 5)) : -1;
      if (level !== lastWarm) {
        lastWarm = level; el.warm.parentElement.hidden = level < 0;
        if (level >= 0) { el.warm.dataset.level = String(level + 1); el.warmLabel.textContent = warmWords[level]; }
      }
    },
    pointer(x, y) { el.reticle.style.transform = 'translate(' + x + 'px,' + y + 'px)'; },
    photo(data) {
      const p = data.post, d = data.decor;
      el.photo.querySelector('.p-title').textContent = p ? (p.caption || 'From Instagram') : d.title;
      el.photo.querySelector('.p-text').textContent = p ? '@yasassri.me' + (p.timestamp ? ' · ' + new Date(p.timestamp).toLocaleDateString('en-NZ', { year: 'numeric', month: 'long' }) : '') : d.text;
      const a = el.photo.querySelector('a');
      a.href = p ? (/^https:\/\/www\.instagram\.com\//.test(p.permalink) ? p.permalink : 'https://www.instagram.com/yasassri.me') : d.href; a.textContent = p ? 'Open on Instagram ↗' : d.cta + ' →';
      if (p) { a.target = '_blank'; a.rel = 'noopener'; } else { a.removeAttribute('target'); a.removeAttribute('rel'); }
      el.photo.hidden = false;
    },
    end({ reason, found, total, time, timed, items }) {
      root.dataset.phase = 'end';
      el.hud.hidden = false; el.toast.dataset.show = '0'; el.clock.hidden = true;
      for (const it of items) setRow(it.def, false);
      el.pageCount.textContent = total + ' of ' + total + ' lines set';
      el.endTitle.textContent = found === total ? "That's the whole CV." : 'Lights on.';
      el.endSub.textContent = found === total
        ? 'All ' + total + ' found in ' + fmt(time) + '.'
        : found + ' found, ' + (total - found) + ' revealed. Each one is numbered where it was hiding.';
      el.endList.textContent = '';
      for (const it of items) {
        const li = document.createElement('li'); li.dataset.found = it.found ? '1' : '0';
        const n = document.createElement('span'); n.className = 'n'; n.textContent = String(it.n).padStart(2, '0');
        const tx = document.createElement('span'); tx.className = 'tx';
        const b = document.createElement('strong'); b.textContent = it.def.title; tx.appendChild(b);
        tx.appendChild(document.createTextNode(' — ' + it.where));
        li.append(n, tx); el.endList.appendChild(li);
      }
      el.end.hidden = false; el.end.dataset.min = '0';
      el.end.querySelector('.cvr-end-toggle').setAttribute('aria-expanded', 'true');
      el.live.textContent = el.endTitle.textContent + ' ' + el.endSub.textContent;
      togglePage(false);
    },
    showIntro() { el.intro.hidden = false; el.end.hidden = true; el.hud.hidden = true; el.page.hidden = true; root.dataset.phase = 'intro'; },
  };
}
