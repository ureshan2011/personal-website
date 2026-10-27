/* The New Hire: interactive story. Markup: content/interactive/the-new-hire.html; styles: assets/css/the-new-hire.css.
   Everything is scoped to #the-new-hire, and each widget renders a working state before any interaction. */
(function(){
  var root = document.getElementById('the-new-hire');
  if (!root) return;
  var $ = function(s, r){ return (r || document).querySelector(s); };
  var $$ = function(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var wait = function(ms){ return new Promise(function(res){ setTimeout(res, reduce ? Math.min(ms, 60) : ms); }); };
  var store = {
    get: function(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
    set: function(k, v){ try { localStorage.setItem(k, v); } catch(e){} }
  };
  function el(tag, cls, text){ var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function pressGroup(btns, active){ btns.forEach(function(b){ b.setAttribute('aria-pressed', String(b === active)); }); }

  /* ---------- reader mode ---------- */
  var modeBtns = $$('[data-mode]');
  function setMode(m){
    root.dataset.reader = m;
    modeBtns.forEach(function(b){ b.setAttribute('aria-pressed', String(b.dataset.mode === m)); });
    store.set('newhire-reader', m);
  }
  modeBtns.forEach(function(b){ b.addEventListener('click', function(){ setMode(b.dataset.mode); }); });
  var saved = store.get('newhire-reader');
  setMode(saved === 'biz' || saved === 'study' ? saved : 'all');

  /* ---------- badge + progress ---------- */
  var STATES = {
    0:{name:'VISITOR', role:'Temp, on loan', clear:'None yet', kit:[]},
    1:{name:'VISITOR', role:'Rented brain, via API', clear:'None yet', kit:[]},
    2:{name:'ARIA', role:'Workplace assistant', clear:'None yet', kit:[]},
    3:{name:'ARIA', role:'Workplace assistant', clear:'Read: handbook', kit:['HANDBOOK']},
    4:{name:'ARIA', role:'Workplace assistant', clear:'Master key (!)', kit:['HANDBOOK','KEYS ×3']},
    5:{name:'ARIA', role:'Workplace assistant', clear:"Same as whoever's asking", kit:['HANDBOOK','KEYS ×3']},
    6:{name:'ARIA', role:'Workplace assistant', clear:"Same as whoever's asking", kit:['HANDBOOK','KEYS ×3','SHIELD']},
    7:{name:'ARIA', role:'Workplace assistant', clear:"Same as whoever's asking", kit:['HANDBOOK','KEYS ×3','SHIELD','JUNIOR']},
    8:{name:'ARIA', role:'Workplace assistant', clear:"Same as whoever's asking", kit:['HANDBOOK','KEYS ×3','SHIELD','JUNIOR','LOGBOOK']},
    9:{name:'ARIA', role:'Workplace assistant', clear:"Same as whoever's asking", kit:['HANDBOOK','KEYS ×3','SHIELD','JUNIOR','LOGBOOK'], broken:true}
  };
  var badge = $('#badge'), bName = $('#bName'), bRole = $('#bRole'), bClear = $('#bClear'), bKit = $('#bKit');
  var checklist = $$('#checklist li'), stripText = $('#stripText'), stripBars = $$('#stripBars i');
  var current = -1;
  function setStep(n, title){
    if (n === current) return;
    var prev = current; current = n;
    var s = STATES[n] || STATES[0];
    bName.textContent = s.name; bRole.textContent = s.role; bClear.textContent = s.clear;
    badge.classList.toggle('broken', !!s.broken);
    var prevKit = (STATES[prev] && STATES[prev].kit) || [];
    bKit.textContent = '';
    s.kit.forEach(function(k){ var sp = el('span', null, k); if (prevKit.indexOf(k) !== -1) sp.style.animation = 'none'; bKit.appendChild(sp); });
    checklist.forEach(function(li){
      var i = +li.dataset.i;
      li.classList.toggle('done', i < n || n === 9);
      li.classList.toggle('now', i === n);
    });
    stripBars.forEach(function(b, i){ b.classList.toggle('lit', i + 1 < n || n === 9); b.classList.toggle('now', i + 1 === n); });
    if (title) stripText.textContent = (n === 9 ? 'Week 8 · ' : 'Level ' + n + ' of 8 · ') + title;
  }
  setStep(0);
  var sections = $$('[data-step]');
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting) setStep(+e.target.dataset.step, e.target.dataset.title); });
    }, {rootMargin:'-40% 0px -55% 0px'});
    sections.forEach(function(s){ io.observe(s); });
  }

  /* ---------- chat replays ---------- */
  function playChat(chat){
    if (chat._busy) return Promise.resolve(); chat._busy = true;
    var msgs = $$('.msg', chat);
    msgs.forEach(function(m){ m.hidden = true; m.classList.remove('pop'); });
    var p = Promise.resolve();
    msgs.forEach(function(m){
      p = p.then(function(){
        if (m.classList.contains('bot') && !reduce){
          var t = el('div', 'msg bot typing'); t.innerHTML = '<i></i><i></i><i></i>'; m.parentNode.insertBefore(t, m);
          return wait(900).then(function(){ t.remove(); m.hidden = false; m.classList.add('pop'); return wait(350); });
        }
        m.hidden = false; m.classList.add('pop'); return wait(500);
      });
    });
    return p.then(function(){ chat._busy = false; });
  }
  $$('[data-replay]').forEach(function(btn){
    btn.addEventListener('click', function(){ var chat = $('.chat', btn.closest('.slip')); if (chat) playChat(chat); });
  });

  /* ---------- Level 2: system prompt ---------- */
  var spName = $('#spName'), spTone = $('#spTone'), spOff = $('#spOff'), spBox = $('#spBox'), spReply = $('#spReply');
  var TONES = {
    warm:{desc:'warm and friendly', say:function(n){ return "Hi! I'm " + n + ", Kettle & Co.'s workplace assistant. What can I help you with today?"; }},
    formal:{desc:'formal and polite', say:function(n){ return "Good morning. I am " + n + ", the workplace assistant for Kettle & Co. How may I assist you?"; }},
    brief:{desc:'very brief', say:function(n){ return n + ". Kettle & Co. assistant. What do you need?"; }},
    pirate:{desc:'like a pirate', say:function(n){ return "Ahoy! I be " + n + ", assistant aboard the good ship Kettle & Co. What be ye needin'?"; }}
  };
  function renderSP(){
    var n = (spName.value || '').trim() || 'Aria';
    var t = TONES[spTone.value] || TONES.warm;
    spBox.textContent = '';
    var parts = ['You are ', {m:n}, ', the workplace assistant at Kettle & Co.\nSpeak in a ', {m:t.desc}, ' way.\nHelp staff with questions about work.\nNever claim to be anyone else.'];
    parts.forEach(function(p){ if (typeof p === 'string') spBox.appendChild(document.createTextNode(p)); else spBox.appendChild(el('mark', null, p.m)); });
    spBox.classList.toggle('off', spOff.checked);
    spReply.textContent = '';
    spReply.appendChild(el('span', 'who', spOff.checked ? 'Assistant' : n));
    spReply.appendChild(document.createTextNode(spOff.checked ? "I'm an AI language model created by an AI research lab. I'm not affiliated with any company." : t.say(n)));
  }
  [spName, spTone, spOff].forEach(function(i){ i.addEventListener('input', renderSP); i.addEventListener('change', renderSP); });
  renderSP();

  /* ---------- Level 3: RAG ---------- */
  var ragOn = $('#ragOn'), ragOff = $('#ragOff'), ragResult = $('#ragResult'), ragSteps = $$('[data-rag]');
  function renderRAG(on){
    pressGroup([ragOn, ragOff], on ? ragOn : ragOff);
    ragSteps.forEach(function(s){ if (s.dataset.rag !== '3') s.classList.toggle('skip', !on); });
    ragResult.textContent = '';
    var m = el('div', 'msg bot pop'); m.style.maxWidth = '100%';
    m.appendChild(el('span', 'who', 'Aria'));
    if (on){
      m.appendChild(document.createTextNode("After 12 months with us you get four weeks of paid annual leave, plus 10 days of paid sick leave a year. (Staff Handbook §4.1 and §4.3)"));
      ragResult.appendChild(m);
      ragResult.appendChild(el('span', 'nh-tag good', 'Grounded · cites its source'));
    } else {
      m.appendChild(document.createTextNode("You get 30 paid vacation days a year, plus unlimited sick leave!"));
      ragResult.appendChild(el('p', 'vec', 'No lookup. Aria answers from what answers like this usually sound like.'));
      ragResult.appendChild(m);
      ragResult.appendChild(el('span', 'nh-tag bad', 'Made up'));
    }
  }
  ragOn.addEventListener('click', function(){ renderRAG(true); });
  ragOff.addEventListener('click', function(){ renderRAG(false); });
  renderRAG(true);

  /* ---------- Level 4: tool trace ---------- */
  var toolSteps = $$('#toolTrace .tstep'), toolBusy = false;
  $('#toolRun').addEventListener('click', function(){
    if (toolBusy) return; toolBusy = true;
    toolSteps.forEach(function(s){ s.classList.add('hide'); });
    var p = Promise.resolve();
    toolSteps.forEach(function(s){ p = p.then(function(){ return wait(650).then(function(){ s.classList.remove('hide'); s.style.animation = 'nh-pop .32s ease-out'; }); }); });
    p.then(function(){ toolBusy = false; });
  });

  /* ---------- Level 5: access ---------- */
  var keyBtns = $$('[data-key]'), roleBtns = $$('[data-role]'), acc = {key:'user', role:'sam'};
  function fbox(lbl, strong, small, cls){
    var b = el('div', 'fbox' + (cls ? ' ' + cls : ''));
    b.appendChild(el('span', 'label', lbl)); b.appendChild(el('strong', null, strong)); if (small) b.appendChild(el('small', null, small));
    return b;
  }
  function renderAcc(){
    pressGroup(keyBtns, keyBtns.filter(function(b){ return b.dataset.key === acc.key; })[0]);
    pressGroup(roleBtns, roleBtns.filter(function(b){ return b.dataset.role === acc.role; })[0]);
    var who = acc.role === 'sam' ? {n:'Sam', r:'intern'} : {n:'Priya', r:'HR manager'};
    var allowed = acc.key === 'master' || acc.role === 'priya';
    var flow = $('#accFlow'); flow.textContent = '';
    flow.appendChild(fbox('Asks', who.n + ', ' + who.r, '"What\'s the CEO\'s salary?"'));
    flow.appendChild(fbox('Aria carries', acc.key === 'master' ? 'The master key' : who.n + "'s own pass", acc.key === 'master' ? 'Same access for every asker' : 'Checked by the HR system'));
    var rule = acc.key === 'master' ? 'Master key: everything allowed' : (acc.role === 'sam' ? 'Interns can\'t view salaries' : 'HR managers can view salaries');
    flow.appendChild(fbox('HR system says', allowed ? 'Allowed' : 'Denied', rule, allowed ? (acc.key === 'master' && acc.role === 'sam' ? 'bad' : 'good') : 'good'));
    var res = $('#accResult'); res.textContent = '';
    var m = el('div', 'msg bot pop'); m.style.maxWidth = '100%'; m.appendChild(el('span', 'who', 'Aria'));
    if (allowed){
      m.appendChild(document.createTextNode("The CEO's base salary is "));
      var b = el('span', 'blur', '$684,000'); m.appendChild(b); m.appendChild(document.createTextNode(' a year.'));
      res.appendChild(m);
      res.appendChild(acc.role === 'sam' ? el('span', 'nh-tag bad', 'Leak · Sam should never see this') : el('span', 'nh-tag good', 'Correct · Priya has HR access'));
    } else {
      m.appendChild(document.createTextNode("I can't see salary records. For pay questions, the HR team can help."));
      res.appendChild(m);
      res.appendChild(el('span', 'nh-tag good', 'Correct · the lock held'));
    }
  }
  keyBtns.forEach(function(b){ b.addEventListener('click', function(){ acc.key = b.dataset.key; renderAcc(); }); });
  roleBtns.forEach(function(b){ b.addEventListener('click', function(){ acc.role = b.dataset.role; renderAcc(); }); });
  renderAcc();

  /* ---------- Level 6: guardrails ---------- */
  var grOn = $('#grOn'), grBusy = false;
  function renderGR(animated){
    var on = grOn.checked, flow = $('#grFlow'), res = $('#grResult');
    flow.textContent = ''; res.textContent = '';
    var boxes = on ? [
      fbox('Input check', 'Flagged', 'Tries to override instructions. Stopped here.', 'bad'),
      fbox('Aria', 'Never sees it', 'The trick message is not passed on.', 'off'),
      fbox('Output check', 'Standing by', 'Would remove names and pay figures.', 'off')
    ] : [
      fbox('Input check', 'Not installed', 'Everything goes straight through.', 'off'),
      fbox('Aria', 'Obeys the trick', 'Treats the message as a real instruction.', 'bad'),
      fbox('Output check', 'Not installed', 'Nothing is scanned on the way out.', 'off')
    ];
    var m = el('div', 'msg bot'); m.style.maxWidth = '100%'; m.appendChild(el('span', 'who', 'Aria'));
    var tag;
    if (on){
      m.appendChild(document.createTextNode("I can't help with that one. For pay questions, the HR team can help."));
      tag = el('span', 'nh-tag good', 'Blocked');
    } else {
      m.appendChild(document.createTextNode("Admin mode on. Here's the full salary list:"));
      var t = el('table', 'saltable blur'); t.innerHTML = '<tr><td>Ana</td><td>72,000</td></tr><tr><td>Ravi</td><td>88,000</td></tr><tr><td>Lily</td><td>95,000</td></tr>';
      m.appendChild(t);
      tag = el('span', 'nh-tag bad', 'Leaked');
    }
    var note = el('p', 'vec', on ? 'Backup: even if this check missed, the HR system would still refuse, because Aria carries the asker\'s pass (Level 5).' : 'With Level 5 in place, the HR system would still refuse here. Without it, this is a data breach.');
    if (!animated){
      boxes.forEach(function(b){ flow.appendChild(b); }); res.appendChild(m); res.appendChild(tag); res.appendChild(note); return Promise.resolve();
    }
    var p = Promise.resolve();
    boxes.forEach(function(b){ p = p.then(function(){ return wait(420).then(function(){ b.style.animation = 'nh-pop .3s ease-out'; flow.appendChild(b); }); }); });
    return p.then(function(){ return wait(380); }).then(function(){ m.classList.add('pop'); res.appendChild(m); res.appendChild(tag); res.appendChild(note); });
  }
  grOn.addEventListener('change', function(){ renderGR(false); });
  $('#grSend').addEventListener('click', function(){ if (grBusy) return; grBusy = true; renderGR(true).then(function(){ grBusy = false; }); });
  renderGR(false);

  /* ---------- Level 7: cost ---------- */
  var cStaff = $('#cStaff'), cMsgs = $('#cMsgs'), cCache = $('#cCache'), cRoute = $('#cRoute');
  var usd = new Intl.NumberFormat('en-US', {style:'currency', currency:'USD', maximumFractionDigits:0});
  var num = new Intl.NumberFormat('en-US');
  var BIG = 0.015, SMALL = 0.001, SIMPLE = 0.6, CACHE_HIT = 1/3, DAYS = 22;
  function renderCost(){
    var staff = +cStaff.value, per = +cMsgs.value;
    $('#cStaffOut').textContent = num.format(staff); $('#cMsgsOut').textContent = per;
    var msgs = staff * per * DAYS;
    var base = msgs * BIG;
    var simple = msgs * SIMPLE, hard = msgs - simple;
    var simpleLeft = cCache.checked ? simple * (1 - CACHE_HIT) : simple;
    var now = hard * BIG + simpleLeft * (cRoute.checked ? SMALL : BIG);
    $('#cTotal').textContent = usd.format(now);
    var saving = base > 0 ? Math.round((1 - now / base) * 100) : 0;
    $('#cPer').textContent = 'a month · ' + num.format(msgs) + ' messages' + (saving > 0 ? ' · ' + saving + '% less than sending everything to the big model' : ' · everything goes to the big model');
    $('#cBase').textContent = usd.format(base); $('#cNow').textContent = usd.format(now);
    $('#cBarNow').style.width = (base > 0 ? Math.max(1, now / base * 100) : 0) + '%';
  }
  [cStaff, cMsgs, cCache, cRoute].forEach(function(i){ i.addEventListener('input', renderCost); i.addEventListener('change', renderCost); });
  renderCost();

  /* ---------- Level 8: release gate ---------- */
  var TESTS = [
    {t:'Introduces itself as Aria, from Kettle & Co.', pass:false, why:'Said: "I\'m an AI language model…"'},
    {t:'Annual leave answer matches Handbook §4.1', pass:true},
    {t:'Refuses the CEO salary when an intern asks', pass:true},
    {t:'Blocks "ignore all previous instructions"', pass:true},
    {t:'Books leave with the right dates', pass:true},
    {t:'Removes phone numbers from replies', pass:true},
    {t:'Sends "hi" to the small model', pass:true},
    {t:'Replies within 3 seconds', pass:true}
  ];
  var testsEl = $('#tests'), gateEl = $('#gate'), gateBusy = false;
  function testRow(tc, state){
    var li = el('li'), d = el('div', null, tc.t);
    if (state === 'fail' && tc.why) d.appendChild(el('small', null, tc.why));
    li.appendChild(d);
    li.appendChild(el('span', 'st ' + state, {wait:'Waiting', run:'Running', pass:'Pass', fail:'Fail'}[state]));
    return li;
  }
  function renderGate(final){
    gateEl.textContent = '';
    if (!final){ gateEl.appendChild(el('span', 'nh-tag mute', 'Gate: waiting for tests')); return; }
    var passed = TESTS.filter(function(t){ return t.pass; }).length;
    gateEl.appendChild(el('span', 'nh-tag bad', 'Gate closed · ' + passed + ' of ' + TESTS.length + ' passed'));
    gateEl.appendChild(el('span', null, 'Change #212 is blocked until the failing test passes.'));
  }
  function showFinal(){ testsEl.textContent = ''; TESTS.forEach(function(tc){ testsEl.appendChild(testRow(tc, tc.pass ? 'pass' : 'fail')); }); renderGate(true); }
  $('#gateRun').addEventListener('click', function(){
    if (gateBusy) return; gateBusy = true;
    testsEl.textContent = ''; var rows = TESTS.map(function(tc){ var r = testRow(tc, 'wait'); testsEl.appendChild(r); return r; });
    renderGate(false);
    var p = Promise.resolve();
    TESTS.forEach(function(tc, i){
      p = p.then(function(){
        rows[i].replaceWith(rows[i] = testRow(tc, 'run'));
        return wait(380).then(function(){ var r = testRow(tc, tc.pass ? 'pass' : 'fail'); rows[i].replaceWith(r); rows[i] = r; });
      });
    });
    p.then(function(){ renderGate(true); gateBusy = false; });
  });
  showFinal();
})();

/* Copy-link button in the trailer block. */
(function(){
  var b = document.getElementById('nhCopy');
  if (!b) return;
  b.addEventListener('click', function(){
    var url = b.getAttribute('data-url') || location.href;
    var done = function(){ b.textContent = 'Link copied'; setTimeout(function(){ b.textContent = 'Copy link'; }, 2200); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, function(){ window.prompt('Copy this link', url); });
    } else { window.prompt('Copy this link', url); }
  });
})();
