/* ==========================================================================
   Academic Platform — single-page app
   Consultations · Speaking invitations · Blog · Newsletter · Forum · Admin
   Static-host friendly (GitHub Pages) — data lives in Firebase Firestore.
   ========================================================================== */

/* ---------- Firebase bootstrap (graceful preview mode when unconfigured) --
   The SDK is imported dynamically so the app still renders when Firebase
   isn't configured yet, or when the CDN is unreachable.                     */

const CFG = window.FIREBASE_CONFIG || {};
let CONFIGURED = !!(CFG.apiKey && !String(CFG.apiKey).startsWith("PASTE"));
let LOAD_ERROR = false;
const ADMIN_EMAILS = (window.PLATFORM_ADMINS || []).map(e => e.toLowerCase());

let auth = null, db = null;
let onAuthStateChanged, GoogleAuthProvider, signInWithPopup,
    signInWithRedirect, getRedirectResult,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    sendEmailVerification, sendPasswordResetEmail, signOut, updateProfile,
    collection, doc, addDoc, setDoc, getDoc, getDocs,
    updateDoc, deleteDoc, query, where, orderBy, limit,
    serverTimestamp, increment;

if (CONFIGURED) {
  try {
    const V = "10.14.1";
    const [appM, authM, fsM] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`)
    ]);
    ({ onAuthStateChanged, GoogleAuthProvider, signInWithPopup,
       signInWithRedirect, getRedirectResult,
       createUserWithEmailAndPassword, signInWithEmailAndPassword,
       sendEmailVerification, sendPasswordResetEmail, signOut, updateProfile } = authM);
    ({ collection, doc, addDoc, setDoc, getDoc, getDocs,
       updateDoc, deleteDoc, query, where, orderBy, limit,
       serverTimestamp, increment } = fsM);
    const fbApp = appM.initializeApp(CFG);
    auth = authM.getAuth(fbApp);
    db = fsM.getFirestore(fbApp);
  } catch (e) {
    console.error("Failed to load Firebase SDK:", e);
    CONFIGURED = false;
    LOAD_ERROR = true;
  }
}

let currentUser = null;
let authReady = new Promise(resolve => {
  if (!auth) { resolve(); return; }
  onAuthStateChanged(auth, user => {
    currentUser = user;
    updateNav();
    resolve();
  });
});

/* Completes a redirect sign-in when the page comes back from Google. Harmless
   on every other load — it resolves to null. Errors go to the console rather
   than a toast: the account view renders straight after and shows the state. */
if (auth && getRedirectResult) {
  getRedirectResult(auth)
    .then(cred => { if (cred && cred.user) toast("Signed in ✓"); })
    .catch(e => console.error("Redirect sign-in failed:", e));
}

const isAdmin = () =>
  !!(currentUser && currentUser.email &&
     currentUser.emailVerified &&
     ADMIN_EMAILS.includes(currentUser.email.toLowerCase()));

/* ---------- Google sign-in ------------------------------------------------
   One popup at a time. Without a guard, a second click while the first popup
   is still opening (or has opened behind the window) starts a second sign-in
   flow; Firebase then aborts the first with auth/cancelled-popup-request,
   which is what the "popup keeps appearing again" behaviour actually is.
   googleSignInPending is module-level, so it also survives the account view
   being re-rendered underneath an open popup.

   prompt=select_account makes the flow predictable: Google always shows the
   account chooser instead of silently reusing whichever session it saw last,
   which is what makes a second, unexpected-looking window appear for people
   signed into more than one Google account. */
let googleSignInPending = false;

function googleProvider() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return provider;
}

/* Redirect sign-in only completes if the browser lets the auth domain set
   cookies for this site. While authDomain is the project's *.firebaseapp.com
   address that is a third-party context — Safari and Chrome drop the state
   and the user lands back signed out. So redirect is used as the popup-blocked
   fallback only once authDomain is a same-registrable-domain host (the
   auth.yasassri.me setup described in firebase-config.js); until then a
   blocked popup gets a clear message instead of a silent failure. */
function redirectSignInUsable() {
  const authDomain = String(CFG.authDomain || "");
  if (!authDomain || !signInWithRedirect) return false;
  const site = h => h.split(".").slice(-2).join(".");
  return site(authDomain) === site(location.hostname);
}

/* ---------- Static content ------------------------------------------------ */

const CONSULT_TYPES = [
  {
    id: "education", name: "Educational Guidance", mins: 30,
    desc: "Study paths, postgraduate options, assignment or project direction, and choosing between programmes.",
    prep: "Bring your current study situation, options you're weighing, and one or two concrete questions."
  },
  {
    id: "research", name: "Research Consultation", mins: 45,
    desc: "Methodology, HCI / AR / UX study design, publishing advice, and supervision or PhD queries.",
    prep: "Share a short abstract or a description of your study, plus links to any drafts or related work."
  },
  {
    id: "career", name: "Career Mentoring", mins: 30,
    desc: "Tech careers, portfolios, CV feedback, and transitioning between industry and academia.",
    prep: "Have your CV / portfolio link ready and a sense of the role or path you're aiming for."
  },
  {
    id: "general", name: "Other / General", mins: 30,
    desc: "Anything else — collaborations, community projects, or a topic that doesn't fit the boxes above.",
    prep: "A short summary of what you'd like to discuss is enough."
  }
];

const SPEAKER_TOPICS = [
  {
    title: "Location-Based AR & Place Attachment",
    abs: "How location-based augmented reality can meaningfully connect people to real-world places — and to each other across distance — drawing on peer-reviewed research with Sony Interactive Entertainment and Niantic.",
    formats: ["Keynote", "Guest lecture"], duration: "30–60 min", audience: "Researchers · Industry · Students",
    tech: "Standard AV; optional live AR demo (needs open Wi-Fi + space to move)"
  },
  {
    title: "Designing AR Games for the Real World",
    abs: "Practical design lessons from building and evaluating multiplayer location-based AR games: playtesting in the wild, safety, spatial UX patterns, and what actually engages players outdoors.",
    formats: ["Conference talk", "Workshop"], duration: "45 min – half day", audience: "Game developers · Designers",
    tech: "Projector; workshop version needs tables and participant phones"
  },
  {
    title: "Immersive Technology in Education",
    abs: "Where AR/VR genuinely helps learning (and where it doesn't) — evidence-informed strategies for educators and institutions adopting immersive tools, with examples from tertiary teaching.",
    formats: ["Keynote", "Guest lecture", "Panel"], duration: "30–60 min", audience: "Educators · EdTech · Leadership",
    tech: "Standard AV"
  },
  {
    title: "UX Research Methods for Emerging Tech",
    abs: "Choosing and combining methods to evaluate novel interfaces: from lab studies to in-the-wild deployments, measuring presence, place attachment, and player experience.",
    formats: ["Guest lecture", "Workshop"], duration: "60 min – half day", audience: "Postgraduate students · UX teams",
    tech: "Standard AV; workshop version needs group seating"
  },
  {
    title: "Postgraduate Research Skills",
    abs: "Surviving and thriving in a research degree: framing a contribution, writing for CHI-style venues, working with industry partners, and managing supervision relationships.",
    formats: ["Guest lecture", "Workshop"], duration: "45–90 min", audience: "Honours · Master's · PhD students",
    tech: "Standard AV"
  }
];

const PAST_ENGAGEMENTS = [
  { when: "Date TBA", title: "Designing Shared Worlds Across Distance: What Multiplayer AR Research Taught Me", detail: "ICITR 2026, University of Moratuwa · Workshop 01 · Online", upcoming: true },
  { when: "Oct 2026", title: "Designing Shared Worlds Across Distance", detail: "NZGDC 2026 · Conference talk · Wellington, NZ", upcoming: true },
  { when: "Jul 2026", title: "CODE with WIE 2026 — Architecting the Augmented Tomorrow", detail: "IEEE WIE Sri Lanka · Workshop · Online" },
  { when: "Dec 2025", title: "Research Visit — Interactive Content Design Lab", detail: "Tohoku University, Japan · Invited research talk & collaboration" },
  { when: "2024", title: "Breaking the Wall of Loneliness Through Play", detail: "Falling Walls Lab Aotearoa NZ · Royal Society Te Apārangi · Pitch talk" },
  { when: "2023", title: "AR Game Development Panel", detail: "NZGDC 2023 · Panel · New Zealand Game Developers Conference" }
];

const FORUM_CATEGORIES = [
  { id: "announcements", icon: "📣", name: "Announcements", desc: "Official updates from Yasas — new articles, opportunities, events.", adminOnly: true },
  { id: "general", icon: "💬", name: "General Discussion", desc: "Introduce yourself and talk about anything loosely on-topic." },
  { id: "course-help", icon: "🎓", name: "Course Help", desc: "Questions about coursework, assignments and study skills.", membersOnly: true },
  { id: "research-postgrad", icon: "🔬", name: "Research & Postgrad", desc: "Methodology, publishing, thesis life, and postgraduate pathways." },
  { id: "careers", icon: "💼", name: "Careers & Industry", desc: "Jobs, portfolios, interviews and moving between industry and academia." },
  { id: "arvr-tech", icon: "🥽", name: "AR/VR & Tech Talk", desc: "Immersive tech, spatial computing, game design and tooling." },
  { id: "blog-discussions", icon: "📝", name: "Blog Discussions", desc: "Threads for discussing articles published on the blog." },
  { id: "feedback", icon: "💡", name: "Feedback & Ideas", desc: "Suggestions for this platform and the community." }
];

const BOOK = {
  title: "The Collaboration Reflex",
  subtitle: "Why the “right” answer to conflict is usually wrong",
  tagline: "Forty-five true stories from real workplaces",
  cover: "../assets/files/bookimg.png",
  // Gated content lives in Firestore, not as a public file in this repo —
  // chunked base64 documents under bookFile/meta/chunks/*, uploaded once via
  // scripts/upload-book.js. Reads are enforced by firestore.rules on every
  // fetch, exactly like every other collection in this app.
  fileDocPath: "bookFile/meta",
  fileName: "The-Collaboration-Reflex-Yasas-Sri-Wickramasinghe.pdf",
  pullQuote: "An answer that fits every question has stopped being an answer.",
  pitch: "Most conflict advice collapses into a single instruction: collaborate, find the win-win. This book takes that instinct apart using forty-five real, anonymised workplace conflicts — a CEO calling an internal auditor's findings “false allegations” to his face, two salespeople quietly losing one shared client, a delay blamed on the coordinator who’d flagged it in writing two days earlier — and shows why reaching for collaboration is right far less often than people assume. It restores the full range of responses to conflict, including the unfashionable ones, and gives a concrete way to tell which one a situation actually calls for.",
  why: "Almost every conflict framework ends at the same instruction: collaborate, find the win-win. This book argues that reflex is usually wrong. Read across forty-five real, anonymised workplace conflicts — and reviewed independently, story by story — the same instinct kept surfacing: recommend collaboration almost regardless of the situation, even where the evidence in the story showed forcing or walking away would have served people better. That finding is the spine of the book: a practical case for reclaiming the full menu of responses to conflict, and the judgement to know which one a moment actually calls for.",
  modes: ["Competing", "Collaborating", "Compromising", "Avoiding", "Accommodating"],
  chapters: [
    "Why Good Projects Breed Conflict",
    "The Five Moves Everyone Makes",
    "Polite but Dead: The High Cost of Avoiding",
    "Winning Battles, Losing People",
    "The Collaboration Reflex",
    "Resolved Is Not Repaired",
    "The Argument Under the Argument",
    "The Quiet Power of Receipts",
    "Communication Is a System, Not a Talent",
    "The Playbook: Eight Habits That Prevent Most Conflicts"
  ],
  about: "Yasas Sri Wickramasinghe, PhD, is a researcher in human-computer interaction and a project-management educator. This is his first book for a general audience — grounded in real workplace experience rather than theory alone. Every conflict in it is real; the names are not."
};

/* ---------- Tiny helpers -------------------------------------------------- */

const view = document.getElementById("view");
const esc = s => String(s ?? "").replace(/[&<>"']/g,
  c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 3500);
}

function openModal({ icon = "✉️", title, body, actionLabel = "Got it" }) {
  const scrim = document.getElementById("modalScrim");
  scrim.innerHTML = `
    <div class="modal-box" role="document">
      <div class="ic" aria-hidden="true">${icon}</div>
      <h3>${esc(title)}</h3>
      <p>${esc(body)}</p>
      <button class="btn btn-solid" type="button" id="modalCloseBtn">${esc(actionLabel)}</button>
    </div>`;
  scrim.hidden = false;
  requestAnimationFrame(() => scrim.classList.add("show"));
  const close = () => closeModal();
  scrim.onclick = e => { if (e.target === scrim) close(); };
  document.getElementById("modalCloseBtn").onclick = close;
}
function closeModal() {
  const scrim = document.getElementById("modalScrim");
  scrim.classList.remove("show");
  setTimeout(() => { scrim.hidden = true; scrim.innerHTML = ""; }, 250);
}

const tsDate = ts => (ts && typeof ts.toDate === "function") ? ts.toDate() : (ts ? new Date(ts) : null);
function fmtDate(ts, withTime) {
  const d = tsDate(ts);
  if (!d || isNaN(d)) return "—";
  const opts = { day: "numeric", month: "short", year: "numeric" };
  if (withTime) Object.assign(opts, { hour: "numeric", minute: "2-digit" });
  return d.toLocaleString(undefined, opts);
}
function timeAgo(ts) {
  const d = tsDate(ts);
  if (!d || isNaN(d)) return "";
  const s = (Date.now() - d.getTime()) / 1000;
  if (s < 60) return "just now";
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  if (s < 86400 * 30) return Math.floor(s / 86400) + "d ago";
  return fmtDate(d);
}
const initials = name => (name || "?").trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();
const slugify = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80) || "post";
const readingTime = md => Math.max(1, Math.round(String(md).trim().split(/\s+/).length / 200));
const badge = st => `<span class="badge ${esc(st)}">${esc(st)}</span>`;

function setupNotice() {
  if (CONFIGURED) return "";
  if (LOAD_ERROR) return `<div class="notice warn"><b>Connection problem.</b> Couldn't reach the data service —
  forms, sign-in and the forum are temporarily unavailable. Please check your connection and reload.</div>`;
  return `<div class="notice warn"><b>Preview mode.</b> Firebase isn't configured yet, so forms, sign-in and the forum are disabled.
  Site owner: follow <code>PLATFORM_SETUP.md</code> in the repository to connect Firestore.</div>`;
}

function fbError(e) {
  const m = String(e && (e.code || e.message) || e);
  if (m.includes("permission-denied")) return "Permission denied — you may not have access for this action.";
  if (m.includes("auth/invalid-credential") || m.includes("auth/wrong-password")) return "Incorrect email or password.";
  if (m.includes("auth/email-already-in-use")) return "An account with this email already exists — try signing in.";
  if (m.includes("auth/weak-password")) return "Password should be at least 6 characters.";
  if (m.includes("auth/invalid-email")) return "That email address doesn't look right.";
  if (m.includes("auth/popup-blocked")) return "Your browser blocked the Google sign-in window. Allow pop-ups for this site and try again, or use the email form below.";
  if (m.includes("auth/unauthorized-domain")) return "Google sign-in isn't enabled for this address yet. Please use the email form below.";
  if (m.includes("auth/popup")) return "The Google sign-in window closed before finishing — please try again.";
  if (m.includes("unavailable") || m.includes("network")) return "Network problem — please try again.";
  console.error(e);
  return "Something went wrong — please try again.";
}

/* ---------- Submission notifications ------------------------------------- */

/* Firestore writes are silent — nothing tells the site owner a request came in,
   and there is no backend here to run a Firestore trigger on. So each form
   also posts a plain-text summary to a form-to-email endpoint.

   Deliberately fire-and-forget: the submission itself already succeeded by the
   time this runs, so a failed or blocked notification must never surface to
   the visitor or undo their request. Failures go to the console only.

   No-ops until PLATFORM_NOTIFY_ENDPOINT is set in firebase-config.js, so the
   platform behaves exactly as before if it is left unconfigured. */
function notifyOwner(subject, fields) {
  const endpoint = window.PLATFORM_NOTIFY_ENDPOINT;
  if (!endpoint) return;
  try {
    const body = Object.entries(fields)
      .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _subject: subject, subject, message: body })
    }).catch(e => console.warn("notify failed:", e));
  } catch (e) {
    console.warn("notify failed:", e);
  }
}

/* ---------- Minimal safe Markdown renderer ------------------------------- */

function mdToHtml(src) {
  src = String(src || "").replace(/\r\n?/g, "\n");
  const NUL_MARK = String.fromCharCode(0);

  // Callouts (::: type [title] ... :::) extracted -- and recursively
  // rendered -- before code-block extraction/escaping, so each callout body
  // gets fully independent markdown handling (including its own code
  // fences, lists, etc).
  const callouts = [];
  src = src.replace(/^:::[ \t]*([\w-]+)[ \t]*(.*)\n([\s\S]*?)\n:::[ \t]*$/gm, (_, type, title, body) => {
    const titleHtml = title.trim() ? ("<div class=\"callout-title\">" + esc(title.trim()) + "</div>") : "";
    callouts.push("<div class=\"callout callout-" + esc(type.trim().toLowerCase()) + "\">" + titleHtml + mdToHtml(body) + "</div>");
    return NUL_MARK + "CALLOUT" + (callouts.length - 1) + NUL_MARK;
  });

  const codeBlocks = [];
  src = src.replace(/```([\w-]*)\n([\s\S]*?)```/g, (_, lang, code) => {
    codeBlocks.push("<pre><code" + (lang ? (" class=\"lang-" + esc(lang) + "\"") : "") + ">" + esc(code.replace(/\n$/, "")) + "</code></pre>");
    return NUL_MARK + "CODE" + (codeBlocks.length - 1) + NUL_MARK;
  });
  src = esc(src);

  const inline = t => t
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1" loading="lazy"/>')
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|\W)\*([^*\n]+)\*(?=\W|$)/g, "$1<em>$2</em>");

  const splitRow = l => {
    let s = l.trim();
    if (s.startsWith("|")) s = s.slice(1);
    if (s.endsWith("|")) s = s.slice(0, -1);
    return s.split("|").map(c => c.trim());
  };
  const isSeparatorRow = l => {
    const cells = splitRow(l);
    return cells.length > 0 && cells.every(c => /^:?-+:?$/.test(c));
  };
  const isTableRow = l => l.includes("|") && l.trim().length > 0;

  const lines = src.split("\n");
  const out = [];
  let para = [], listType = null;

  const flushPara = () => { if (para.length) { out.push("<p>" + inline(para.join(" ")) + "</p>"); para = []; } };
  const closeList = () => { if (listType) { out.push("</" + listType + ">"); listType = null; } };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trimEnd();

    const code = line.startsWith(NUL_MARK + "CODE") && line.endsWith(NUL_MARK) ? line.slice((NUL_MARK + "CODE").length, -NUL_MARK.length) : null;
    if (code !== null) { flushPara(); closeList(); out.push(codeBlocks[+code]); i++; continue; }

    const callout = line.startsWith(NUL_MARK + "CALLOUT") && line.endsWith(NUL_MARK) ? line.slice((NUL_MARK + "CALLOUT").length, -NUL_MARK.length) : null;
    if (callout !== null) { flushPara(); closeList(); out.push(callouts[+callout]); i++; continue; }

    if (!line.trim()) { flushPara(); closeList(); i++; continue; }

    if (isTableRow(line) && i + 1 < lines.length && isSeparatorRow(lines[i + 1])) {
      flushPara(); closeList();
      const header = splitRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && isTableRow(lines[i]) && lines[i].trim()) { rows.push(splitRow(lines[i])); i++; }
      out.push("<table><thead><tr>" + header.map(c => "<th>" + inline(c) + "</th>").join("") + "</tr></thead><tbody>" +
        rows.map(r => "<tr>" + r.map(c => "<td>" + inline(c) + "</td>").join("") + "</tr>").join("") +
      "</tbody></table>");
      continue;
    }

    const h = line.match(/^(#{1,4})\s+(.+)$/);
    if (h) { flushPara(); closeList(); const n = Math.min(h[1].length + 1, 4); out.push("<h" + n + ">" + inline(h[2]) + "</h" + n + ">"); i++; continue; }
    if (/^(---|\*\*\*)\s*$/.test(line)) { flushPara(); closeList(); out.push("<hr/>"); i++; continue; }
    const bq = line.match(/^&gt;\s?(.*)$/);
    if (bq) { flushPara(); closeList(); out.push("<blockquote><p>" + inline(bq[1]) + "</p></blockquote>"); i++; continue; }
    const ul = line.match(/^[-*]\s+(.+)$/);
    const ol = line.match(/^\d+\.\s+(.+)$/);
    if (ul || ol) {
      flushPara();
      const want = ul ? "ul" : "ol";
      if (listType !== want) { closeList(); out.push("<" + want + ">"); listType = want; }
      out.push("<li>" + inline((ul || ol)[1]) + "</li>");
      i++; continue;
    }
    para.push(line.trim());
    i++;
  }
  flushPara(); closeList();
  return out.join("\n");
}

/* ---------- Lesson decks (ported, interactive React content) --------------
   Rendered by a separately-built bundle (app/lessons-src/ -> app/lessons/),
   lazy-loaded only when a deck route is actually visited. See viewLessonDeck. */

const LESSON_DECKS = [
  { slug: "database-concepts", title: "Advanced Database Concepts", subtitle: "Table design, backup & restore, and a plain-English look at SQL injection.", accent: "#2563eb" },
  { slug: "er-diagrams", title: "ER Diagrams", subtitle: "Entities, attributes and relationships in Chen's notation.", accent: "#0d7a72" },
  { slug: "sql-programming", title: "SQL Programming", subtitle: "CREATE, INSERT, SELECT — one interactive slide at a time.", accent: "#2563eb" },
  { slug: "er-activities", title: "ER Diagrams in Practice", subtitle: "Model five real systems and check your diagram against a worked answer.", accent: "#1d4ed8" },
  { slug: "er-advanced", title: "Advanced ER Concepts", subtitle: "Weak entities, identifying relationships, multivalued & derived attributes.", accent: "#3b82f6" },
  { slug: "er-attributes", title: "Attributes & Participation", subtitle: "Composite/derived attributes and participation constraints, guided.", accent: "#0f766e" },
  { slug: "apa-referencing", title: "APA 7 Citations", subtitle: "A 14-slide interactive crash course with a practice quiz.", accent: "#4338ca" },
  { slug: "jira-certifications", title: "Free Jira & Agile Certifications", subtitle: "Three hand-picked, genuinely free credentials worth putting on LinkedIn.", accent: "#0052CC" },
  { slug: "sql-certifications", title: "Free SQL Certifications", subtitle: "Nine genuinely free credentials, from vendor badges to project-based certs.", accent: "#7c3aed" },
  { slug: "vibe-to-production", title: "From Vibe to Production", subtitle: "Idea to live website in one sitting: Google Stitch, Claude Code, GitHub Pages.", accent: "#7c3aed" }
];

let lessonBundleLoaded = false;
function loadLessonBundle() {
  if (window.mountLesson) { lessonBundleLoaded = true; }
  if (lessonBundleLoaded) return Promise.resolve();
  return new Promise((resolve, reject) => {
    if (!document.querySelector("link[data-lessons-css]")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "lessons/lessons.css";
      link.dataset.lessonsCss = "1";
      document.head.appendChild(link);
    }
    const script = document.createElement("script");
    script.src = "lessons/lessons.js";
    script.onload = () => { lessonBundleLoaded = true; resolve(); };
    script.onerror = () => reject(new Error("Couldn't load the lesson bundle."));
    document.body.appendChild(script);
  });
}

let lessonUnmount = null;

async function viewLessonDeck(_, slug) {
  const deck = LESSON_DECKS.find(d => d.slug === slug);
  if (!deck) {
    view.innerHTML = `<div class="empty">Lesson not found. <a href="#/lessons" style="color:var(--accent);font-weight:600">Back to all lessons →</a></div>`;
    return;
  }
  document.title = `${deck.title} — Yasas Sri Wickramasinghe`;
  try {
    await loadLessonBundle();
  } catch (e) {
    view.innerHTML = `<div class="empty">Couldn't load this lesson — please try again.</div>`;
    return;
  }
  view.classList.add("lesson-full-bleed");
  view.innerHTML = `<div id="lessonMount"></div>`;
  lessonUnmount = window.mountLesson(document.getElementById("lessonMount"), slug);
}

/* ---------- Router --------------------------------------------------------- */

const routes = [
  [/^$/, viewHub],
  [/^consult$/, viewConsult],
  [/^invite$/, viewInvite],
  [/^blog$/, viewBlogList],
  [/^blog\/([\w-]+)$/, viewBlogPost],
  [/^lessons$/, viewLessonsIndex],
  [/^lessons\/deck\/([\w-]+)$/, viewLessonDeck],
  [/^lessons\/article\/([\w-]+)$/, viewLessonArticle],
  [/^newsletter$/, viewNewsletter],
  [/^book$/, viewBook],
  [/^forum$/, viewForum],
  [/^forum\/new$/, viewForumNew],
  [/^forum\/c\/([\w-]+)$/, viewForumCategory],
  [/^forum\/t\/([\w-]+)$/, viewForumThread],
  [/^account$/, viewAccount],
  [/^admin$/, viewAdmin],
  [/^guidelines$/, viewGuidelines]
];

function parseHash() {
  const raw = location.hash.replace(/^#\/?/, "");
  const [path, qs] = raw.split("?");
  return { path: path || "", params: new URLSearchParams(qs || "") };
}

async function route() {
  const { path, params } = parseHash();
  updateNav(path);
  document.title = "Platform — Consultations, Speaking, Blog & Community | Dr. Yasas Sri Wickramasinghe";
  window.scrollTo(0, 0);
  if (lessonUnmount) { lessonUnmount(); lessonUnmount = null; }
  view.classList.remove("lesson-full-bleed");
  view.innerHTML = `<div class="loading"><div class="spinner"></div></div>`;
  await authReady;
  for (const [re, fn] of routes) {
    const m = path.match(re);
    if (m) { try { await fn(params, ...m.slice(1)); } catch (e) { console.error(e); view.innerHTML = `<div class="empty">Something went wrong loading this page.<br/><small>${esc(fbError(e))}</small></div>`; } return; }
  }
  view.innerHTML = `<div class="app-head"><h1>Page not found</h1><p>That page doesn't exist. <a href="#/" style="color:var(--accent);font-weight:600">Back to the platform home →</a></p></div>`;
}

function updateNav(path) {
  if (path === undefined) path = parseHash().path;
  const section = path === "" ? "hub" : path.split("/")[0];
  document.querySelectorAll("[data-nav]").forEach(a => {
    a.classList.toggle("active", a.dataset.nav === section);
  });
  const label = currentUser
    ? (isAdmin() ? "Admin ⚙" : (currentUser.displayName || "My Account"))
    : "Sign In";
  const d = document.getElementById("navAccount");
  const m = document.getElementById("navAccountMobile");
  if (d) d.textContent = label;
  if (m) m.innerHTML = `<span class="idx">08</span>${esc(label)}`;
}

window.addEventListener("hashchange", route);

/* ---------- Reusable auth prompt ------------------------------------------ */

function authPrompt(reason) {
  return `<div class="notice"><b>Sign in required.</b> ${esc(reason)}
    <a href="#/account" style="font-weight:600;color:var(--accent)">Sign in or create a free account →</a></div>`;
}
function verifyPrompt() {
  return `<div class="notice warn"><b>Please verify your email.</b> We sent a verification link to
    <b>${esc(currentUser.email)}</b>. Click it, then reload this page.
    <button class="btn small" id="resendVerify" style="margin-left:8px">Resend link</button></div>`;
}
function bindResendVerify() {
  const b = document.getElementById("resendVerify");
  if (b) b.onclick = async () => {
    try { await sendEmailVerification(currentUser); toast("Verification email sent."); }
    catch (e) { toast(fbError(e)); }
  };
}

/* ==========================================================================
   VIEW: Platform hub
   ========================================================================== */

function viewHub() {
  view.innerHTML = `
  ${setupNotice()}
  <div class="app-head">
    <span class="eyebrow">Academic Platform</span>
    <h1 style="margin-top:14px">Learn, collaborate &amp; <em>stay connected.</em></h1>
    <p>Free consultations on education, research and technology · invitations for talks and workshops ·
    research writing · and a community for students and collaborators.</p>
    <p style="font-size:13.5px;color:var(--muted);margin-top:10px">No account needed to read, subscribe to the newsletter,
    or send an invitation — you'll only be asked to sign in for booking consultations and posting in the forum.</p>
  </div>

  <div class="hub-grid">
    <a class="hub-card" href="#/book" style="border-color:var(--accent)">
      <div class="ic">📘</div>
      <h3>The Collaboration Reflex</h3>
      <p>My new book on why the instinct to “collaborate” is usually the wrong answer to conflict — free, sent by email.</p>
      <span class="go">Get the book →</span>
    </a>
    <a class="hub-card" href="#/consult">
      <div class="ic">🗓</div>
      <h3>Free Consultations</h3>
      <p>Book a free 30–45 minute session on study paths, research methods, HCI/AR/UX, or tech careers.</p>
      <span class="go">Request a consultation →</span>
    </a>
    <a class="hub-card" href="#/invite">
      <div class="ic">🎤</div>
      <h3>Invite Me to Speak</h3>
      <p>Keynotes, guest lectures, workshops and panels on AR, immersive tech, HCI and education.</p>
      <span class="go">See topics &amp; invite →</span>
    </a>
    <a class="hub-card" href="#/blog">
      <div class="ic">✍️</div>
      <h3>Blog</h3>
      <p>Articles on HCI, AR/VR and immersive technologies, software engineering, and education.</p>
      <span class="go">Read articles →</span>
    </a>
    <a class="hub-card" href="#/forum">
      <div class="ic">👥</div>
      <h3>Community Forum</h3>
      <p>Ask questions, help peers, and stay in touch — a home base for students and followers.</p>
      <span class="go">Join the forum →</span>
    </a>
    <a class="hub-card" href="#/newsletter">
      <div class="ic">📬</div>
      <h3>Newsletter</h3>
      <p>A monthly digest of new articles, upcoming talks, research updates and student opportunities.</p>
      <span class="go">Subscribe →</span>
    </a>
    <a class="hub-card" href="../research.html">
      <div class="ic">📚</div>
      <h3>Research &amp; Publications</h3>
      <p>Peer-reviewed work in location-based AR, spatial computing and player experience.</p>
      <span class="go">Explore research →</span>
    </a>
  </div>

  <div class="identity-band">
    <div class="identity"><b>Educator</b><span>Senior Lecturer at Yoobee Colleges — mentoring, consultations and a student community.</span></div>
    <div class="identity"><b>Researcher</b><span>HCI, location-based AR and game design — published in venues like Entertainment Computing.</span></div>
    <div class="identity"><b>Speaker</b><span>Invited talks, guest lectures and workshops — from NZGDC to IEEE WIE.</span></div>
  </div>`;
}

/* ==========================================================================
   VIEW: Consultations
   ========================================================================== */

async function viewConsult(params) {
  const requestedType = params.get("type");
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Pacific/Auckland";
  const canSubmit = CONFIGURED && currentUser && currentUser.emailVerified;

  view.innerHTML = `
  ${setupNotice()}
  <div class="app-crumb"><a href="#/">Platform</a> / Consultations</div>
  <div class="app-head">
    <span class="eyebrow">Free Consultations</span>
    <h1 style="margin-top:14px">Book a free <em>consultation.</em></h1>
    <p>Structured, free sessions for students, researchers and professionals — on education, research and
    technology. Pick a type, tell me what you need, and propose up to three times that suit you.
    Sessions run online (Meet/Teams/Zoom) or in person in Christchurch, NZ.</p>
  </div>

  <h2 style="font-size:20px;margin-bottom:14px">1 · Choose a consultation type</h2>
  <div class="type-grid" id="typeGrid">
    ${CONSULT_TYPES.map(t => `
      <button type="button" class="type-card" data-type="${t.id}">
        <h3>${esc(t.name)} <span class="dur">${t.mins} min</span></h3>
        <p>${esc(t.desc)}</p>
        <p class="prep"><b>Prepare:</b> ${esc(t.prep)}</p>
      </button>`).join("")}
  </div>

  <h2 style="font-size:20px;margin-bottom:14px">2 · Tell me about it</h2>
  ${!CONFIGURED ? "" : !currentUser
      ? authPrompt("To prevent fake bookings, consultation requests need a verified account.")
      : (!currentUser.emailVerified ? verifyPrompt() : "")}

  <form class="form panel" id="consultForm" ${canSubmit ? "" : "style='opacity:.6;pointer-events:none'"}>
    <div class="form-row">
      <div class="field"><label>Full name *</label><input name="name" required maxlength="120" value="${esc(currentUser?.displayName || "")}"/></div>
      <div class="field"><label>Email *</label><input name="email" type="email" required maxlength="200" value="${esc(currentUser?.email || "")}"/></div>
    </div>
    <div class="form-row">
      <div class="field"><label>I am a… *</label>
        <select name="role" required>
          <option value="student">Student</option>
          <option value="researcher">Researcher / academic</option>
          <option value="professional">Industry professional</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="field"><label>Organization <small>(optional)</small></label><input name="organization" maxlength="200"/></div>
    </div>
    <div class="field">
      <label>Topic summary * <small>(min 100 characters — the more context, the better the session)</small></label>
      <textarea name="topic" required minlength="100" maxlength="3000"></textarea>
      <div class="count" id="topicCount">0 / 100 minimum</div>
    </div>
    <div class="field">
      <label>What do you hope to get out of it? *</label>
      <textarea name="goals" required maxlength="2000" style="min-height:80px"></textarea>
    </div>
    <div class="field">
      <label>Relevant links <small>(optional — drafts, portfolio, paper, one per line)</small></label>
      <textarea name="links" maxlength="1000" style="min-height:60px" placeholder="https://…"></textarea>
    </div>
    <div class="form-row">
      <div class="field"><label>Meeting mode *</label>
        <select name="mode" required>
          <option value="online">Online (Meet / Teams / Zoom)</option>
          <option value="in-person">In person — Christchurch, NZ</option>
        </select>
      </div>
      <div class="field"><label>Your timezone</label><input name="timezone" value="${esc(tz)}" maxlength="80"/>
        <div class="hint">Auto-detected — adjust if wrong.</div></div>
    </div>
    <h3 style="margin-top:6px">3 · Propose up to three preferred times</h3>
    <p class="sub" style="margin-bottom:0">In <b>your</b> timezone. I'm based in Christchurch, NZ (NZST/NZDT) — weekday late afternoons and early evenings usually work best. I'll confirm one, or suggest an alternative.</p>
    <div class="form-row">
      <div class="field"><label>Preferred time 1 *</label><input name="slot1" type="datetime-local" required/></div>
      <div class="field"><label>Preferred time 2</label><input name="slot2" type="datetime-local"/></div>
    </div>
    <div class="form-row">
      <div class="field"><label>Preferred time 3</label><input name="slot3" type="datetime-local"/></div>
      <div></div>
    </div>
    <div class="hp-field" aria-hidden="true"><label>Leave this field empty</label><input name="website" tabindex="-1" autocomplete="off"/></div>
    <div class="form-actions">
      <button class="btn btn-solid" type="submit" ${canSubmit ? "" : "disabled"}>Submit Request <span class="arrow">→</span></button>
      <span class="form-msg" id="consultMsg"></span>
    </div>
  </form>

  <div id="myRequests" style="margin-top:40px"></div>`;

  bindResendVerify();

  // Type selection (deep-linkable via #/consult?type=research etc.)
  let selectedType = CONSULT_TYPES.some(t => t.id === requestedType) ? requestedType : CONSULT_TYPES[0].id;
  const cards = view.querySelectorAll(".type-card");
  const select = id => {
    selectedType = id;
    cards.forEach(c => c.classList.toggle("selected", c.dataset.type === id));
  };
  cards.forEach(c => c.addEventListener("click", () => select(c.dataset.type)));
  select(selectedType);

  // Char counter
  const topicEl = view.querySelector("[name=topic]");
  const countEl = document.getElementById("topicCount");
  if (topicEl) topicEl.addEventListener("input", () => {
    const n = topicEl.value.length;
    countEl.textContent = n < 100 ? `${n} / 100 minimum` : `${n} characters ✓`;
  });

  // Submit
  const form = document.getElementById("consultForm");
  const msg = document.getElementById("consultMsg");
  form.addEventListener("submit", async ev => {
    ev.preventDefault();
    if (!canSubmit) return;
    const f = new FormData(form);
    msg.className = "form-msg"; msg.textContent = "";
    if (f.get("website")) return; // honeypot
    if (String(f.get("topic")).trim().length < 100) {
      msg.className = "form-msg err"; msg.textContent = "Topic summary needs at least 100 characters."; return;
    }
    const slots = ["slot1", "slot2", "slot3"].map(k => f.get(k)).filter(Boolean);
    if (!slots.length) { msg.className = "form-msg err"; msg.textContent = "Please propose at least one time."; return; }

    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    try {
      // Light rate limit: max 2 open (pending/approved) requests per account
      const mine = await getDocs(query(collection(db, "consultations"), where("uid", "==", currentUser.uid)));
      const open = mine.docs.filter(d => ["pending", "approved"].includes(d.data().status)).length;
      if (open >= 2) throw { code: "rate", message: "" };

      await addDoc(collection(db, "consultations"), {
        uid: currentUser.uid,
        type: selectedType,
        typeName: (CONSULT_TYPES.find(t => t.id === selectedType) || {}).name || selectedType,
        name: String(f.get("name")).trim(),
        email: String(f.get("email")).trim(),
        role: f.get("role"),
        organization: String(f.get("organization") || "").trim(),
        topic: String(f.get("topic")).trim(),
        goals: String(f.get("goals")).trim(),
        links: String(f.get("links") || "").trim(),
        mode: f.get("mode"),
        timezone: String(f.get("timezone") || "").trim(),
        slots,
        status: "pending",
        website: "",
        createdAt: serverTimestamp()
      });
      notifyOwner("New consultation request", {
        Type: (CONSULT_TYPES.find(t => t.id === selectedType) || {}).name || selectedType,
        Name: String(f.get("name")).trim(),
        Email: String(f.get("email")).trim(),
        Role: f.get("role"),
        Organization: String(f.get("organization") || "").trim(),
        Topic: String(f.get("topic")).trim(),
        Goals: String(f.get("goals")).trim(),
        Mode: f.get("mode"),
        Timezone: String(f.get("timezone") || "").trim(),
        Review: location.origin + location.pathname + "#/admin"
      });
      form.reset();
      msg.className = "form-msg ok";
      msg.textContent = "Request submitted — you'll hear back by email once it's reviewed.";
      toast("Consultation request submitted ✓");
      loadMyRequests();
    } catch (e) {
      msg.className = "form-msg err";
      msg.textContent = e.code === "rate"
        ? "You already have 2 open requests — please wait until they're handled."
        : fbError(e);
    } finally { btn.disabled = false; }
  });

  async function loadMyRequests() {
    if (!CONFIGURED || !currentUser) return;
    const box = document.getElementById("myRequests");
    try {
      const snap = await getDocs(query(collection(db, "consultations"), where("uid", "==", currentUser.uid)));
      if (snap.empty) { box.innerHTML = ""; return; }
      const items = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (tsDate(b.createdAt) || 0) - (tsDate(a.createdAt) || 0));
      box.innerHTML = `<h2 style="font-size:20px;margin-bottom:14px">My requests</h2>
        <div class="list">${items.map(r => `
          <div class="list-item">
            <div class="li-main">
              <h3>${esc(r.typeName)}</h3>
              <div class="meta">Submitted ${fmtDate(r.createdAt)} · ${esc(r.mode)} · ${esc(r.timezone || "")}</div>
              ${r.status === "approved" && r.scheduledAt ? `<div class="desc"><b>Confirmed:</b> ${fmtDate(r.scheduledAt, true)}${r.meetingLink ? ` · <a href="${esc(r.meetingLink)}" target="_blank" rel="noopener" style="color:var(--accent);font-weight:600">Join meeting ↗</a>` : ""}</div>` : ""}
              ${r.status === "declined" && r.declineReason ? `<div class="desc">${esc(r.declineReason)}</div>` : ""}
            </div>
            <div class="li-side">
              ${badge(r.status)}
              ${r.status === "pending" ? `<button class="btn small danger" data-cancel="${r.id}">Cancel</button>` : ""}
            </div>
          </div>`).join("")}</div>`;
      box.querySelectorAll("[data-cancel]").forEach(b => b.onclick = async () => {
        if (!confirm("Cancel this request?")) return;
        try {
          await updateDoc(doc(db, "consultations", b.dataset.cancel), { status: "cancelled" });
          toast("Request cancelled."); loadMyRequests();
        } catch (e) { toast(fbError(e)); }
      });
    } catch (e) { console.error(e); }
  }
  loadMyRequests();
}

/* ==========================================================================
   VIEW: Invite Me (speaker page + invitation form)
   ========================================================================== */

function viewInvite() {
  view.innerHTML = `
  ${setupNotice()}
  <div class="app-crumb"><a href="#/">Platform</a> / Invite Me</div>
  <div class="app-head">
    <span class="eyebrow">Speaking &amp; Invitations</span>
    <h1 style="margin-top:14px">Invite me to <em>speak.</em></h1>
    <p>Keynotes, guest lectures, workshops and panels on augmented reality, immersive technology, HCI and
    education. Based in Christchurch, New Zealand — available for national and international engagements,
    and remote talks worldwide. All engagements are handled personally and promptly.</p>
    <div class="form-actions" style="margin-top:18px">
      <a class="btn" href="../assets/files/cv_yasas.pdf" target="_blank">Speaker Bio / CV (PDF) <span class="arrow">→</span></a>
      <a class="btn" href="../news.html">Past Talks &amp; Media</a>
    </div>
  </div>

  <h2 style="font-size:20px;margin-bottom:14px">Talk topics</h2>
  <div class="topic-grid" style="margin-bottom:40px">
    ${SPEAKER_TOPICS.map(t => `
      <div class="topic-card">
        <h3>${esc(t.title)}</h3>
        <p>${esc(t.abs)}</p>
        <div class="tmeta">
          ${t.formats.map(f => `<span class="chip">${esc(f)}</span>`).join("")}
          <span class="chip">⏱ ${esc(t.duration)}</span>
          <span class="chip">👥 ${esc(t.audience)}</span>
        </div>
        <div class="tmeta"><span class="chip" style="background:var(--accent-soft);border-color:transparent;color:var(--accent-dark)">🔌 ${esc(t.tech)}</span></div>
      </div>`).join("")}
  </div>

  <div class="two-col">
    <div class="panel">
      <h2>Send an invitation</h2>
      <p class="sub">Tell me about your event — I typically reply within a few working days. Consultations for
      individuals are free; for speaking engagements, travel/accommodation and honorarium details help me assess fit.</p>
      <form class="form" id="inviteForm">
        <div class="form-row">
          <div class="field"><label>Your name *</label><input name="organizerName" required maxlength="120"/></div>
          <div class="field"><label>Your role *</label><input name="organizerRole" required maxlength="120" placeholder="e.g. Programme chair"/></div>
        </div>
        <div class="form-row">
          <div class="field"><label>Organization *</label><input name="organization" required maxlength="200"/></div>
          <div class="field"><label>Email *</label><input name="email" type="email" required maxlength="200"/></div>
        </div>
        <div class="form-row">
          <div class="field"><label>Phone <small>(optional)</small></label><input name="phone" maxlength="40"/></div>
          <div class="field"><label>Event type *</label>
            <select name="eventType" required>
              <option value="conference">Conference</option>
              <option value="university">University / guest lecture</option>
              <option value="corporate">Corporate / industry</option>
              <option value="meetup">Meetup / community</option>
              <option value="media">Media / podcast</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div class="field"><label>Event name *</label><input name="eventName" required maxlength="200"/></div>
        <div class="form-row">
          <div class="field"><label>Date(s) *</label><input name="eventDate" required maxlength="120" placeholder="e.g. 12–14 March 2027 (flexible)"/></div>
          <div class="field"><label>Location or online *</label><input name="location" required maxlength="200"/></div>
        </div>
        <div class="form-row">
          <div class="field"><label>Expected audience <small>(size &amp; profile)</small></label><input name="audience" maxlength="200" placeholder="e.g. ~150 game developers"/></div>
          <div class="field"><label>Requested topic *</label>
            <select name="topic" required>
              ${SPEAKER_TOPICS.map(t => `<option>${esc(t.title)}</option>`).join("")}
              <option value="custom">Custom topic (describe below)</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="field"><label>Format &amp; duration *</label><input name="format" required maxlength="120" placeholder="e.g. 45-min keynote + Q&amp;A"/></div>
          <div class="field"><label>Travel / accommodation covered?</label>
            <select name="travel"><option value="yes">Yes</option><option value="partial">Partially</option><option value="no">No</option><option value="na" selected>N/A (online)</option></select>
          </div>
        </div>
        <div class="field"><label>Honorarium offered <small>(optional, free text)</small></label><input name="honorarium" maxlength="200"/></div>
        <div class="field"><label>Anything else? <small>(custom topic, context, links)</small></label><textarea name="message" maxlength="3000"></textarea></div>
        <div class="hp-field" aria-hidden="true"><label>Leave this field empty</label><input name="website" tabindex="-1" autocomplete="off"/></div>
        <div class="form-actions">
          <button class="btn btn-solid" type="submit" ${CONFIGURED ? "" : "disabled"}>Send Invitation <span class="arrow">→</span></button>
          <span class="form-msg" id="inviteMsg"></span>
        </div>
      </form>
    </div>

    <div class="panel">
      <h2>Engagements</h2>
      <p class="sub">Selected recent and upcoming appearances.</p>
      ${PAST_ENGAGEMENTS.map(e => `
        <div class="engagement">
          <span class="when">${esc(e.when)}</span>
          <div>
            <h3>${esc(e.title)} ${e.upcoming ? '<span class="badge pending" style="vertical-align:middle">Upcoming</span>' : ""}</h3>
            <p>${esc(e.detail)}</p>
          </div>
        </div>`).join("")}
      <blockquote style="margin-top:18px;border-left:3px solid var(--accent);padding-left:16px;color:var(--ink-soft);font-size:14px;font-style:italic">
        "Yasas brings rare range — the rigour of a researcher and the instincts of a builder."
        <br/><small style="font-style:normal;color:var(--muted)">— Research &amp; industry partners, HIT Lab NZ · Sony Interactive Entertainment</small>
      </blockquote>
    </div>
  </div>`;

  const form = document.getElementById("inviteForm");
  const msg = document.getElementById("inviteMsg");
  form.addEventListener("submit", async ev => {
    ev.preventDefault();
    if (!CONFIGURED) return;
    const f = new FormData(form);
    if (f.get("website")) return; // honeypot
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true; msg.className = "form-msg"; msg.textContent = "";
    try {
      const data = { status: "pending", website: "", createdAt: serverTimestamp() };
      for (const k of ["organizerName", "organizerRole", "organization", "email", "phone", "eventType",
                       "eventName", "eventDate", "location", "audience", "topic", "format",
                       "travel", "honorarium", "message"]) {
        data[k] = String(f.get(k) || "").trim();
      }
      await addDoc(collection(db, "invitations"), data);
      notifyOwner("New speaking invitation", {
        Organizer: data.organizerName,
        Role: data.organizerRole,
        Organization: data.organization,
        Email: data.email,
        Phone: data.phone,
        Event: data.eventName,
        "Event type": data.eventType,
        Date: data.eventDate,
        Location: data.location,
        Audience: data.audience,
        Topic: data.topic,
        Format: data.format,
        Travel: data.travel,
        Honorarium: data.honorarium,
        Message: data.message,
        Review: location.origin + location.pathname + "#/admin"
      });
      form.reset();
      msg.className = "form-msg ok";
      msg.textContent = "Invitation sent — thank you! You'll get a reply by email.";
      toast("Invitation submitted ✓");
    } catch (e) { msg.className = "form-msg err"; msg.textContent = fbError(e); }
    finally { btn.disabled = false; }
  });
}

/* ==========================================================================
   VIEW: Blog
   ========================================================================== */

const POST_CATEGORIES = ["Research", "Teaching & Learning", "AR/VR & Immersive Tech", "Career Advice", "Announcements"];

async function fetchPublishedPosts() {
  if (!CONFIGURED) return [];
  const snap = await getDocs(query(collection(db, "posts"), where("status", "==", "published")));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (tsDate(b.publishedAt || b.createdAt) || 0) - (tsDate(a.publishedAt || a.createdAt) || 0));
}

async function viewBlogList() {
  view.innerHTML = `
  ${setupNotice()}
  <div class="app-crumb"><a href="#/">Platform</a> / Blog</div>
  <div class="app-head">
    <span class="eyebrow">Blog</span>
    <h1 style="margin-top:14px">Notes from research &amp; <em>the classroom.</em></h1>
    <p>Articles on HCI, immersive technologies, software engineering and education.
    Earlier writing also lives on <a href="../blogs.html" style="color:var(--accent);font-weight:600">the Writing page</a> and
    <a href="https://yasassri.medium.com" target="_blank" rel="noopener" style="color:var(--accent);font-weight:600">Medium ↗</a>.</p>
  </div>
  <div id="postList"><div class="loading"><div class="spinner"></div></div></div>`;

  const box = document.getElementById("postList");
  try {
    const posts = await fetchPublishedPosts();
    if (!posts.length) {
      box.innerHTML = `<div class="empty">No articles published here yet — new posts land soon.<br/>
        Meanwhile, browse <a href="../blogs.html" style="color:var(--accent);font-weight:600">existing writing →</a></div>`;
      return;
    }
    box.innerHTML = `<div class="post-grid">${posts.map(p => `
      <a class="post-card" href="#/blog/${esc(p.slug || p.id)}">
        <span class="pmeta"><span class="badge cat">${esc(p.category || "Article")}</span> &nbsp; ${fmtDate(p.publishedAt || p.createdAt)} · ${p.readingTime || readingTime(p.content)} min read</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary || "")}</p>
        <span class="go" style="color:var(--accent);font-weight:600;font-size:14px">Read article →</span>
      </a>`).join("")}</div>`;
  } catch (e) {
    box.innerHTML = `<div class="empty">${esc(fbError(e))}</div>`;
  }
}

async function viewBlogPost(_, slug) {
  if (!CONFIGURED) { view.innerHTML = setupNotice() + `<div class="empty">Blog isn't connected yet.</div>`; return; }
  let post = null;
  // Slug lookup (security rules require non-admin queries to filter on published)
  const constraints = [where("slug", "==", slug)];
  if (!isAdmin()) constraints.push(where("status", "==", "published"));
  const bySlug = await getDocs(query(collection(db, "posts"), ...constraints, limit(1)));
  if (!bySlug.empty) post = { id: bySlug.docs[0].id, ...bySlug.docs[0].data() };
  else {
    try { const d = await getDoc(doc(db, "posts", slug)); if (d.exists()) post = { id: d.id, ...d.data() }; } catch (_) {}
  }
  if (!post || (post.status !== "published" && !isAdmin())) {
    view.innerHTML = `<div class="empty">Article not found. <a href="#/blog" style="color:var(--accent);font-weight:600">Back to the blog →</a></div>`;
    return;
  }
  document.title = `${post.title} — Yasas Sri Wickramasinghe`;
  view.innerHTML = `
  <article class="article">
    <div class="app-crumb"><a href="#/">Platform</a> / <a href="#/blog">Blog</a> / ${esc(post.title)}</div>
    <header class="article-header">
      <span class="badge cat">${esc(post.category || "Article")}</span>
      <h1>${esc(post.title)}</h1>
      <div class="pmeta">By Dr. Yasas Sri Wickramasinghe · ${fmtDate(post.publishedAt || post.createdAt)} ·
        ${post.readingTime || readingTime(post.content)} min read
        ${post.status !== "published" ? " · " + badge(post.status) : ""}</div>
      ${post.summary ? `<p class="article-summary">${esc(post.summary)}</p>` : ""}
    </header>
    <div class="prose">${mdToHtml(post.content)}</div>
    ${post.tags && post.tags.length ? `<div class="tmeta" style="margin-top:28px">${post.tags.map(t => `<span class="chip">#${esc(t)}</span>`).join("")}</div>` : ""}
    <div class="panel" style="margin-top:36px">
      <h3>Discuss this post</h3>
      <p class="sub" style="margin-bottom:14px">Comments live in the community forum — one thread per article.</p>
      <div class="form-actions">
        <a class="btn btn-solid" href="#/forum/new?cat=blog-discussions&title=${encodeURIComponent("Discussion: " + post.title)}">Discuss in the Forum <span class="arrow">→</span></a>
        <a class="btn" href="#/newsletter">Get new posts by email</a>
      </div>
    </div>
  </article>`;
}

/* ==========================================================================
   VIEW: Lessons (markdown study articles)
   ========================================================================== */

async function fetchPublishedLessons() {
  if (!CONFIGURED) return [];
  const snap = await getDocs(query(collection(db, "lessons"), where("status", "==", "published")));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (tsDate(b.publishedAt || b.createdAt) || 0) - (tsDate(a.publishedAt || a.createdAt) || 0));
}

async function viewLessonArticle(_, slug) {
  if (!CONFIGURED) { view.innerHTML = setupNotice() + `<div class="empty">Lessons aren't connected yet.</div>`; return; }
  let lesson = null;
  const constraints = [where("slug", "==", slug)];
  if (!isAdmin()) constraints.push(where("status", "==", "published"));
  const bySlug = await getDocs(query(collection(db, "lessons"), ...constraints, limit(1)));
  if (!bySlug.empty) lesson = { id: bySlug.docs[0].id, ...bySlug.docs[0].data() };
  else {
    try { const d = await getDoc(doc(db, "lessons", slug)); if (d.exists()) lesson = { id: d.id, ...d.data() }; } catch (_) {}
  }
  if (!lesson || (lesson.status !== "published" && !isAdmin())) {
    view.innerHTML = `<div class="empty">Lesson not found. <a href="#/lessons" style="color:var(--accent);font-weight:600">Back to all lessons →</a></div>`;
    return;
  }
  document.title = `${lesson.title} — Yasas Sri Wickramasinghe`;
  view.innerHTML = `
  <article class="article">
    <div class="app-crumb"><a href="#/">Platform</a> / <a href="#/lessons">Lessons</a> / ${esc(lesson.title)}</div>
    <header class="article-header">
      <span class="badge cat">Article</span>
      <h1>${esc(lesson.title)}</h1>
      <div class="pmeta">By Dr. Yasas Sri Wickramasinghe · ${fmtDate(lesson.publishedAt || lesson.createdAt)} ·
        ${lesson.readingTime || readingTime(lesson.content)} min read
        ${lesson.status !== "published" ? " · " + badge(lesson.status) : ""}</div>
      ${lesson.subtitle ? `<p class="article-summary">${esc(lesson.subtitle)}</p>` : ""}
    </header>
    ${lesson.objectives && lesson.objectives.length ? `
    <div class="panel" style="margin-bottom:28px">
      <h3 style="margin-bottom:10px">What you'll learn</h3>
      <ul style="margin:0 0 0 20px">${lesson.objectives.map(o => `<li>${esc(o)}</li>`).join("")}</ul>
    </div>` : ""}
    <div class="prose">${mdToHtml(lesson.content)}</div>
    ${lesson.tags && lesson.tags.length ? `<div class="tmeta" style="margin-top:28px">${lesson.tags.map(t => `<span class="chip">#${esc(t)}</span>`).join("")}</div>` : ""}
  </article>`;
}

async function viewLessonsIndex() {
  view.innerHTML = `
  <div class="app-crumb"><a href="#/">Platform</a> / Lessons</div>
  <div class="app-head">
    <span class="eyebrow">Lessons</span>
    <h1 style="margin-top:14px">Teaching material, <em>freely reusable.</em></h1>
    <p>Interactive walkthroughs and short articles — database design, data modelling, SQL,
    referencing and a few career extras.</p>
  </div>
  <div class="post-grid">
    ${LESSON_DECKS.map(d => `
      <a class="post-card" href="#/lessons/deck/${esc(d.slug)}">
        <span class="pmeta"><span class="badge cat" style="background:${esc(d.accent)}22;color:${esc(d.accent)}">Interactive</span></span>
        <h3>${esc(d.title)}</h3>
        <p>${esc(d.subtitle)}</p>
        <span class="go" style="color:var(--accent);font-weight:600;font-size:14px">Start lesson →</span>
      </a>`).join("")}
    <span id="lessonArticleCards"></span>
  </div>`;

  const box = document.getElementById("lessonArticleCards");
  try {
    const lessons = await fetchPublishedLessons();
    box.outerHTML = lessons.map(l => `
      <a class="post-card" href="#/lessons/article/${esc(l.slug || l.id)}">
        <span class="pmeta"><span class="badge cat">Article</span> &nbsp; ${l.readingTime || readingTime(l.content)} min read</span>
        <h3>${esc(l.title)}</h3>
        <p>${esc(l.subtitle || "")}</p>
        <span class="go" style="color:var(--accent);font-weight:600;font-size:14px">Read lesson →</span>
      </a>`).join("");
  } catch (e) {
    box.outerHTML = "";
  }
}

/* ==========================================================================
   VIEW: Newsletter
   ========================================================================== */

function viewNewsletter(params) {
  const prefill = params.get("email") || "";
  view.innerHTML = `
  ${setupNotice()}
  <div class="app-crumb"><a href="#/">Platform</a> / Newsletter</div>
  <div class="two-col">
    <div>
      <div class="app-head" style="margin-bottom:24px">
        <span class="eyebrow">Newsletter</span>
        <h1 style="margin-top:14px">Research notes &amp; <em>field insights.</em></h1>
        <p>A monthly digest — new blog posts, upcoming talks, research updates and student opportunities.
        No noise, unsubscribe anytime with one click.</p>
      </div>
      <ul style="list-style:disc;margin-left:20px;color:var(--ink-soft);font-size:14.5px;display:grid;gap:8px">
        <li>New articles on HCI, AR/VR and education</li>
        <li>Upcoming talks, workshops and where to catch them</li>
        <li>Research updates and behind-the-scenes notes</li>
        <li>Opportunities for students (segment-targeted)</li>
      </ul>
    </div>
    <div class="panel">
      <h2>Subscribe</h2>
      <p class="sub">Pick the audience that fits you best — it helps target relevant content (e.g. student-only opportunities).</p>
      <form class="form" id="nlForm">
        <div class="field"><label>Email *</label><input name="email" type="email" required maxlength="200" value="${esc(prefill)}"/></div>
        <div class="field"><label>Name <small>(optional)</small></label><input name="name" maxlength="120"/></div>
        <div class="field"><label>I'm a…</label>
          <select name="segment">
            <option value="student">Student</option>
            <option value="researcher">Researcher</option>
            <option value="professional">Professional</option>
          </select>
        </div>
        <div class="hp-field" aria-hidden="true"><label>Leave this field empty</label><input name="website" tabindex="-1" autocomplete="off"/></div>
        <div class="form-actions">
          <button class="btn btn-solid" type="submit" ${CONFIGURED ? "" : "disabled"}>Subscribe <span class="arrow">→</span></button>
          <span class="form-msg" id="nlMsg"></span>
        </div>
        <p class="hint" style="font-size:12px;color:var(--muted)">You'll receive a confirmation before any regular emails (double opt-in).
        Unsubscribe links are included in every issue.</p>
      </form>
    </div>
  </div>`;

  const form = document.getElementById("nlForm");
  const msg = document.getElementById("nlMsg");
  form.addEventListener("submit", async ev => {
    ev.preventDefault();
    if (!CONFIGURED) return;
    const f = new FormData(form);
    if (f.get("website")) return;
    const email = String(f.get("email")).trim().toLowerCase();
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true; msg.className = "form-msg"; msg.textContent = "";
    try {
      await setDoc(doc(db, "subscribers", email), {
        email,
        name: String(f.get("name") || "").trim(),
        segment: f.get("segment"),
        status: "subscribed",
        website: "",
        createdAt: serverTimestamp()
      });
      notifyOwner("New newsletter subscriber", {
        Email: email,
        Name: String(f.get("name") || "").trim(),
        Segment: f.get("segment")
      });
      form.reset();
      msg.className = "form-msg ok"; msg.textContent = "You're on the list — welcome!";
      toast("Subscribed ✓");
    } catch (e) {
      if (String(e && e.code).includes("permission-denied")) {
        msg.className = "form-msg ok"; msg.textContent = "You're already subscribed — nothing more to do!";
      } else { msg.className = "form-msg err"; msg.textContent = fbError(e); }
    } finally { btn.disabled = false; }
  });
}

/* ==========================================================================
   VIEW: The Book
   ========================================================================== */

async function viewBook() {
  const canDownload = CONFIGURED && currentUser && currentUser.emailVerified;

  view.innerHTML = `
  ${setupNotice()}
  <div class="app-crumb"><a href="#/">Platform</a> / The Book</div>
  <div class="two-col">
    <div>
      <img src="${BOOK.cover}" alt="Book cover: ${esc(BOOK.title)} — ${esc(BOOK.subtitle)}, by Yasas Sri Wickramasinghe, PhD" style="width:100%;border-radius:var(--radius);box-shadow:var(--shadow);"/>
      <div id="bookDownloadPanel" style="margin-top:20px"></div>
    </div>
    <div>
      <span class="eyebrow">New Book</span>
      <h1 style="margin-top:14px;font-size:clamp(28px,4vw,42px)">${esc(BOOK.title)}</h1>
      <p style="font-style:italic;color:var(--ink-soft);margin-top:8px;font-size:17px">${esc(BOOK.subtitle)}</p>
      <p style="margin-top:18px">${esc(BOOK.pitch)}</p>
      <blockquote style="margin:22px 0;border-left:3px solid var(--accent);padding-left:18px;color:var(--ink-soft);font-style:italic;font-size:15.5px">${esc(BOOK.pullQuote)}</blockquote>

      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:24px 0">
        <div class="stat" style="text-align:center"><b>45</b><span>real stories</span></div>
        <div class="stat" style="text-align:center"><b>5</b><span>conflict modes</span></div>
        <div class="stat" style="text-align:center"><b>10</b><span>chapters</span></div>
      </div>

      <h3 style="margin-top:8px">Why it matters</h3>
      <p style="margin-top:8px">${esc(BOOK.why)}</p>

      <h3 style="margin-top:24px">The five modes</h3>
      <div class="tmeta" style="margin-top:10px">${BOOK.modes.map(m => `<span class="chip">${esc(m)}</span>`).join("")}</div>

      <h3 style="margin-top:24px">Inside the book</h3>
      <ol style="margin-top:10px;display:grid;gap:8px;padding-left:0;list-style:none">
        ${BOOK.chapters.map((c, i) => `<li style="font-size:14.5px;color:var(--ink-soft)"><b style="color:var(--ink)">${i + 1}.</b> ${esc(c)}</li>`).join("")}
      </ol>

      <div class="panel" style="margin-top:28px;background:var(--bg-soft)">
        <h3>About the author</h3>
        <p class="sub" style="margin-top:6px;margin-bottom:0">${esc(BOOK.about)}</p>
      </div>
    </div>
  </div>`;

  const panel = document.getElementById("bookDownloadPanel");

  // Direct download is switched off — a request just records the reader's
  // name/email in bookDownloads (rules-gated, same as before) and points
  // them to email instead, so every copy goes out personally.
  function renderDownloadCta(record) {
    const already = record && record.downloadCount > 0;
    panel.innerHTML = `
    <div class="panel">
      <h3>Get your copy</h3>
      <p class="sub" style="margin-bottom:16px">${already ? `You requested this on ${fmtDate(record.firstDownloadAt)} — I'll follow up by email.` : "Free, full PDF — sent to your inbox, not an instant download. I keep a simple record of who's asked for it — no spam, ever."}</p>
      <button class="btn btn-solid" type="button" id="bookDownloadBtn" style="width:100%;justify-content:center">${already ? "Request Again" : "Get the Book"} <span class="arrow">→</span></button>
      <span class="form-msg" id="bookDownloadMsg" style="display:block;margin-top:10px"></span>
    </div>`;
    const btn = document.getElementById("bookDownloadBtn");
    const msg = document.getElementById("bookDownloadMsg");
    btn.onclick = async () => {
      btn.disabled = true; msg.className = "form-msg"; msg.textContent = "";
      try {
        const ref = doc(db, "bookDownloads", currentUser.uid);
        const existing = await getDoc(ref);
        if (existing.exists()) {
          await updateDoc(ref, {
            downloadCount: increment(1),
            lastDownloadAt: serverTimestamp(),
            name: currentUser.displayName || existing.data().name || "",
            email: currentUser.email
          });
        } else {
          await setDoc(ref, {
            uid: currentUser.uid,
            name: currentUser.displayName || "",
            email: currentUser.email,
            downloadCount: 1,
            firstDownloadAt: serverTimestamp(),
            lastDownloadAt: serverTimestamp()
          });
        }
        // The reader is now waiting on a manual send — this is the one queue
        // where a missed notification leaves someone hanging.
        notifyOwner("Book request — send the PDF", {
          Name: currentUser.displayName || "",
          Email: currentUser.email,
          Repeat: existing.exists() ? "yes — has requested before" : "no",
          Action: "Email The Collaboration Reflex PDF to this address",
          Queue: location.origin + location.pathname + "#/admin"
        });
        openModal({
          icon: "✉️",
          title: "Keep an eye on your email",
          body: `I've got your request — I send the book out personally rather than as an instant download. It'll land at ${currentUser.email} soon.`,
          actionLabel: "Got it"
        });
        const fresh = await getDoc(ref);
        renderDownloadCta(fresh.data());
      } catch (e) {
        msg.className = "form-msg err";
        msg.textContent = String(e && e.code).includes("permission-denied")
          ? "Your account isn't authorised to request this yet — try signing out and back in."
          : fbError(e);
      } finally { btn.disabled = false; }
    };
  }

  if (!CONFIGURED) {
    panel.innerHTML = "";
  } else if (!currentUser) {
    panel.innerHTML = authPrompt("Create a free account to request the book — it takes under a minute.");
  } else if (!currentUser.emailVerified) {
    panel.innerHTML = verifyPrompt();
    bindResendVerify();
  } else {
    try {
      const ref = doc(db, "bookDownloads", currentUser.uid);
      const existing = await getDoc(ref);
      renderDownloadCta(existing.exists() ? existing.data() : null);
    } catch (e) {
      renderDownloadCta(null);
    }
  }
}

/* ==========================================================================
   VIEW: Forum
   ========================================================================== */

const catById = id => FORUM_CATEGORIES.find(c => c.id === id);

async function viewForum() {
  view.innerHTML = `
  ${setupNotice()}
  <div class="app-crumb"><a href="#/">Platform</a> / Forum</div>
  <div class="app-head">
    <span class="eyebrow">Community Forum</span>
    <h1 style="margin-top:14px">Ask, answer &amp; <em>stay in touch.</em></h1>
    <p>A community for students, researchers and followers. Browse as a guest; create a free account to post.
    Please read the <a href="#/guidelines" style="color:var(--accent);font-weight:600">community guidelines</a> before your first post.</p>
    ${CONFIGURED && !currentUser ? `<div class="form-actions" style="margin-top:16px"><a class="btn btn-solid" href="#/account">Join the community <span class="arrow">→</span></a></div>` : ""}
  </div>
  <div class="list">
    ${FORUM_CATEGORIES.map(c => `
      <a class="cat-row" href="#/forum/c/${c.id}">
        <div class="ic">${c.icon}</div>
        <div><h3>${esc(c.name)}</h3><p>${esc(c.desc)}</p></div>
        <span class="lock">${c.adminOnly ? "🔒 admin posts" : c.membersOnly ? "👤 members" : ""}</span>
      </a>`).join("")}
  </div>`;
}

async function viewForumCategory(_, catId) {
  const cat = catById(catId);
  if (!cat) { location.hash = "#/forum"; return; }
  const canPost = CONFIGURED && currentUser && currentUser.emailVerified && (!cat.adminOnly || isAdmin());

  view.innerHTML = `
  ${setupNotice()}
  <div class="app-crumb"><a href="#/">Platform</a> / <a href="#/forum">Forum</a> / ${esc(cat.name)}</div>
  <div class="app-head" style="margin-bottom:24px">
    <h1 style="font-size:clamp(26px,3.5vw,36px)">${cat.icon} ${esc(cat.name)}</h1>
    <p>${esc(cat.desc)}</p>
  </div>
  <div class="form-actions" style="margin-bottom:22px">
    ${canPost ? `<a class="btn btn-solid" href="#/forum/new?cat=${cat.id}">New Thread <span class="arrow">→</span></a>`
      : cat.adminOnly ? `<span class="form-msg">Only announcements from Yasas appear here.</span>`
      : CONFIGURED && !currentUser ? `<a class="btn" href="#/account">Sign in to post</a>` : ""}
  </div>
  <div id="threads"><div class="loading"><div class="spinner"></div></div></div>`;

  const box = document.getElementById("threads");
  if (!CONFIGURED) { box.innerHTML = `<div class="empty">Forum isn't connected yet.</div>`; return; }
  if (cat.membersOnly && !currentUser) {
    box.innerHTML = `<div class="empty">This category is members-only. <a href="#/account" style="color:var(--accent);font-weight:600">Sign in →</a></div>`;
    return;
  }
  try {
    const snap = await getDocs(query(collection(db, "threads"), where("categoryId", "==", catId)));
    const threads = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      .filter(t => !t.hidden || isAdmin())
      .sort((a, b) => (b.pinned - a.pinned) || ((tsDate(b.lastReplyAt || b.createdAt) || 0) - (tsDate(a.lastReplyAt || a.createdAt) || 0)));
    if (!threads.length) { box.innerHTML = `<div class="empty">No threads yet — start the first one!</div>`; return; }
    box.innerHTML = `<div class="list">${threads.map(t => `
      <a class="list-item" href="#/forum/t/${t.id}">
        <div class="li-main">
          <h3>${t.pinned ? "📌 " : ""}${t.locked ? "🔒 " : ""}${esc(t.title)}${t.hidden ? " " + badge("declined").replace("declined", "hidden") : ""}</h3>
          <div class="meta">by ${esc(t.authorName || "member")} · ${timeAgo(t.createdAt)} · ${t.replyCount || 0} repl${(t.replyCount || 0) === 1 ? "y" : "ies"}${t.lastReplyAt ? " · last activity " + timeAgo(t.lastReplyAt) : ""}</div>
        </div>
      </a>`).join("")}</div>`;
  } catch (e) { box.innerHTML = `<div class="empty">${esc(fbError(e))}</div>`; }
}

function viewForumNew(params) {
  const catId = params.get("cat") || "general";
  const cat = catById(catId) || catById("general");
  const prefillTitle = params.get("title") || "";
  const canPost = CONFIGURED && currentUser && currentUser.emailVerified && (!cat.adminOnly || isAdmin());

  view.innerHTML = `
  ${setupNotice()}
  <div class="app-crumb"><a href="#/">Platform</a> / <a href="#/forum">Forum</a> / New thread</div>
  <div class="app-head" style="margin-bottom:24px"><h1 style="font-size:clamp(26px,3.5vw,36px)">Start a thread</h1></div>
  ${!CONFIGURED ? "" : !currentUser ? authPrompt("You need a free account to post in the forum.")
    : !currentUser.emailVerified ? verifyPrompt()
    : cat.adminOnly && !isAdmin() ? `<div class="notice warn">Only the admin can post in ${esc(cat.name)}.</div>` : ""}
  <form class="form panel" id="threadForm" ${canPost ? "" : "style='opacity:.6;pointer-events:none'"}>
    <div class="field"><label>Category</label>
      <select name="categoryId">${FORUM_CATEGORIES.filter(c => !c.adminOnly || isAdmin()).map(c =>
        `<option value="${c.id}" ${c.id === cat.id ? "selected" : ""}>${esc(c.name)}</option>`).join("")}</select>
    </div>
    <div class="field"><label>Title *</label><input name="title" required maxlength="200" value="${esc(prefillTitle)}"/></div>
    <div class="field"><label>Body * <small>(plain text / basic Markdown)</small></label><textarea name="body" required maxlength="8000" style="min-height:160px"></textarea></div>
    <div class="form-actions">
      <button class="btn btn-solid" type="submit" ${canPost ? "" : "disabled"}>Post Thread <span class="arrow">→</span></button>
      <span class="form-msg" id="threadMsg"></span>
    </div>
  </form>`;

  bindResendVerify();
  const form = document.getElementById("threadForm");
  const msg = document.getElementById("threadMsg");
  form.addEventListener("submit", async ev => {
    ev.preventDefault();
    if (!canPost) return;
    const f = new FormData(form);
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    try {
      const ref = await addDoc(collection(db, "threads"), {
        categoryId: f.get("categoryId"),
        title: String(f.get("title")).trim(),
        body: String(f.get("body")).trim(),
        uid: currentUser.uid,
        authorName: currentUser.displayName || currentUser.email.split("@")[0],
        replyCount: 0,
        pinned: false, locked: false, hidden: false, reported: false,
        createdAt: serverTimestamp(),
        lastReplyAt: serverTimestamp()
      });
      toast("Thread posted ✓");
      location.hash = `#/forum/t/${ref.id}`;
    } catch (e) { msg.className = "form-msg err"; msg.textContent = fbError(e); btn.disabled = false; }
  });
}

async function viewForumThread(_, threadId) {
  if (!CONFIGURED) { view.innerHTML = setupNotice() + `<div class="empty">Forum isn't connected yet.</div>`; return; }
  const tDoc = await getDoc(doc(db, "threads", threadId));
  if (!tDoc.exists()) { view.innerHTML = `<div class="empty">Thread not found. <a href="#/forum" style="color:var(--accent);font-weight:600">Back to forum →</a></div>`; return; }
  const t = { id: tDoc.id, ...tDoc.data() };
  const cat = catById(t.categoryId);
  if (t.hidden && !isAdmin()) { view.innerHTML = `<div class="empty">This thread has been hidden by a moderator.</div>`; return; }
  const canReply = currentUser && currentUser.emailVerified && !t.locked;

  const postHtml = (p, isThread) => `
    <div class="thread-post" ${isThread ? "" : `data-reply="${p.id}"`}>
      <div class="tp-head">
        <div class="avatar">${esc(initials(p.authorName))}</div>
        <div class="who"><b>${esc(p.authorName || "member")}</b><span>${timeAgo(p.createdAt)}${p.reported && isAdmin() ? " · ⚠ reported" : ""}</span></div>
        <div class="tp-actions">
          ${currentUser && !isThread ? `<button class="report-btn" data-report-reply="${p.id}">Report</button>` : ""}
          ${currentUser && isThread ? `<button class="report-btn" data-report-thread>Report</button>` : ""}
          ${isAdmin() && !isThread ? `<button class="report-btn" data-del-reply="${p.id}">Delete</button>` : ""}
        </div>
      </div>
      <div class="tp-body">${mdToHtml(p.body)}</div>
    </div>`;

  view.innerHTML = `
  <div class="app-crumb"><a href="#/">Platform</a> / <a href="#/forum">Forum</a> / <a href="#/forum/c/${esc(t.categoryId)}">${esc(cat ? cat.name : t.categoryId)}</a></div>
  <div class="app-head" style="margin-bottom:20px">
    <h1 style="font-size:clamp(24px,3.2vw,34px)">${t.pinned ? "📌 " : ""}${t.locked ? "🔒 " : ""}${esc(t.title)}</h1>
    ${isAdmin() ? `<div class="form-actions" style="margin-top:12px">
      <button class="btn small" id="adminPin">${t.pinned ? "Unpin" : "Pin"}</button>
      <button class="btn small" id="adminLock">${t.locked ? "Unlock" : "Lock"}</button>
      <button class="btn small danger" id="adminHide">${t.hidden ? "Unhide" : "Hide"}</button>
    </div>` : ""}
  </div>
  ${postHtml(t, true)}
  <div id="replies" style="margin-top:12px"><div class="loading"><div class="spinner"></div></div></div>
  <div style="margin-top:24px" id="replyBox">
    ${t.locked ? `<div class="notice">This thread is locked — no new replies.</div>`
      : !currentUser ? authPrompt("Sign in to reply.")
      : !currentUser.emailVerified ? verifyPrompt()
      : `<form class="form panel" id="replyForm">
          <div class="field"><label>Reply as ${esc(currentUser.displayName || currentUser.email)}</label>
          <textarea name="body" required maxlength="6000" style="min-height:100px"></textarea></div>
          <div class="form-actions">
            <button class="btn btn-solid" type="submit">Post Reply <span class="arrow">→</span></button>
            <span class="form-msg" id="replyMsg"></span>
          </div>
        </form>`}
  </div>`;

  bindResendVerify();

  // Admin thread controls
  const flip = (id, field, cur) => {
    const b = document.getElementById(id);
    if (b) b.onclick = async () => {
      try { await updateDoc(doc(db, "threads", t.id), { [field]: !cur }); route(); }
      catch (e) { toast(fbError(e)); }
    };
  };
  flip("adminPin", "pinned", t.pinned);
  flip("adminLock", "locked", t.locked);
  flip("adminHide", "hidden", t.hidden);

  const reportThreadBtn = view.querySelector("[data-report-thread]");
  if (reportThreadBtn) reportThreadBtn.onclick = async () => {
    try { await updateDoc(doc(db, "threads", t.id), { reported: true }); toast("Reported — a moderator will take a look."); }
    catch (e) { toast(fbError(e)); }
  };

  // Replies
  async function loadReplies() {
    const box = document.getElementById("replies");
    try {
      const snap = await getDocs(query(collection(db, "threads", t.id, "replies"), orderBy("createdAt", "asc")));
      const replies = snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(r => !r.hidden || isAdmin());
      box.innerHTML = replies.length
        ? replies.map(r => postHtml(r, false)).join("")
        : `<div class="empty" style="padding:28px">No replies yet.</div>`;
      box.querySelectorAll("[data-report-reply]").forEach(b => b.onclick = async () => {
        try { await updateDoc(doc(db, "threads", t.id, "replies", b.dataset.reportReply), { reported: true }); toast("Reported ✓"); }
        catch (e) { toast(fbError(e)); }
      });
      box.querySelectorAll("[data-del-reply]").forEach(b => b.onclick = async () => {
        if (!confirm("Delete this reply?")) return;
        try {
          await deleteDoc(doc(db, "threads", t.id, "replies", b.dataset.delReply));
          await updateDoc(doc(db, "threads", t.id), { replyCount: increment(-1) });
          loadReplies();
        } catch (e) { toast(fbError(e)); }
      });
    } catch (e) { box.innerHTML = `<div class="empty">${esc(fbError(e))}</div>`; }
  }
  loadReplies();

  const replyForm = document.getElementById("replyForm");
  if (replyForm) replyForm.addEventListener("submit", async ev => {
    ev.preventDefault();
    if (!canReply) return;
    const body = String(new FormData(replyForm).get("body")).trim();
    if (!body) return;
    const btn = replyForm.querySelector("button[type=submit]");
    btn.disabled = true;
    try {
      await addDoc(collection(db, "threads", t.id, "replies"), {
        body,
        uid: currentUser.uid,
        authorName: currentUser.displayName || currentUser.email.split("@")[0],
        reported: false, hidden: false,
        createdAt: serverTimestamp()
      });
      await updateDoc(doc(db, "threads", t.id), { replyCount: increment(1), lastReplyAt: serverTimestamp() });
      replyForm.reset();
      loadReplies();
    } catch (e) {
      document.getElementById("replyMsg").className = "form-msg err";
      document.getElementById("replyMsg").textContent = fbError(e);
    } finally { btn.disabled = false; }
  });
}

/* ==========================================================================
   VIEW: Guidelines
   ========================================================================== */

function viewGuidelines() {
  view.innerHTML = `
  <div class="app-crumb"><a href="#/">Platform</a> / Community Guidelines</div>
  <article class="article">
    <div class="app-head"><span class="eyebrow">Community</span><h1 style="margin-top:14px">Community Guidelines</h1></div>
    <div class="prose">
      <p>This community exists so students, researchers and followers can learn together. Keep it useful and kind:</p>
      <ol>
        <li><strong>Be respectful.</strong> Disagree with ideas, not people. No harassment, hate speech or personal attacks.</li>
        <li><strong>Stay on topic.</strong> Use the category that fits; keep threads focused.</li>
        <li><strong>No academic misconduct.</strong> Asking for guidance is great; asking others to complete assessed work for you is not.</li>
        <li><strong>No spam or self-promotion</strong> without context. Sharing your relevant work in a discussion is fine.</li>
        <li><strong>Protect privacy.</strong> Don't post other people's personal information, or private course material.</li>
        <li><strong>Report, don't retaliate.</strong> Use the report button — a moderator will handle it.</li>
      </ol>
      <p>Posts that break these guidelines may be hidden or removed, and repeat offenders may lose posting access.
      Questions or appeals: use the <a href="../contact.html">contact page</a>.</p>
    </div>
  </article>`;
}

/* ==========================================================================
   VIEW: Account (sign in / sign up / profile)
   ========================================================================== */

function viewAccount() {
  if (!CONFIGURED) {
    view.innerHTML = setupNotice() + `<div class="empty">Accounts aren't available until Firebase is connected.</div>`;
    return;
  }

  if (currentUser) {
    view.innerHTML = `
    <div class="app-crumb"><a href="#/">Platform</a> / Account</div>
    <div class="auth-box">
      <div class="panel">
        <div class="user-chip" style="margin-bottom:18px">
          <div class="avatar" style="width:48px;height:48px;font-size:17px">${esc(initials(currentUser.displayName || currentUser.email))}</div>
          <div class="info"><b>${esc(currentUser.displayName || "No display name yet")}</b><span>${esc(currentUser.email)}
            ${currentUser.emailVerified ? " · verified ✓" : " · <b style='color:#b45309'>not verified</b>"}</span></div>
        </div>
        ${!currentUser.emailVerified ? verifyPrompt() : ""}
        <form class="form" id="profileForm">
          <div class="field"><label>Display name (shown in the forum)</label>
            <input name="displayName" maxlength="60" value="${esc(currentUser.displayName || "")}"/></div>
          <div class="form-actions">
            <button class="btn btn-solid small" type="submit">Save</button>
            <button class="btn small" type="button" id="signOutBtn">Sign out</button>
            ${isAdmin() ? `<a class="btn small" href="#/admin">Admin Dashboard ⚙</a>` : ""}
          </div>
        </form>
      </div>
      <div class="panel">
        <h3>Quick links</h3>
        <div class="form-actions" style="margin-top:12px">
          <a class="btn small" href="#/consult">My consultations</a>
          <a class="btn small" href="#/forum">Forum</a>
          <a class="btn small" href="#/newsletter">Newsletter</a>
        </div>
      </div>
    </div>`;
    bindResendVerify();
    document.getElementById("signOutBtn").onclick = async () => { await signOut(auth); toast("Signed out."); location.hash = "#/"; };
    document.getElementById("profileForm").addEventListener("submit", async ev => {
      ev.preventDefault();
      const name = String(new FormData(ev.target).get("displayName")).trim();
      try {
        await updateProfile(currentUser, { displayName: name });
        await setDoc(doc(db, "profiles", currentUser.uid), { displayName: name, updatedAt: serverTimestamp() }, { merge: true });
        toast("Profile saved ✓"); updateNav();
      } catch (e) { toast(fbError(e)); }
    });
    return;
  }

  view.innerHTML = `
  <div class="app-crumb"><a href="#/">Platform</a> / Sign In</div>
  <div class="auth-box">
    <div class="app-head" style="margin-bottom:22px;text-align:center;max-width:none">
      <h1 style="font-size:clamp(26px,3.5vw,34px)">Welcome</h1>
      <p>One free account for the high-value things — booking consultations and posting in the forum.
      Everything else (reading, newsletter, speaking invitations, contact) works without one.</p>
    </div>
    <div class="panel">
      <div class="auth-tabs">
        <button type="button" class="active" data-tab="signin">Sign In</button>
        <button type="button" data-tab="signup">Create Account</button>
      </div>
      <button class="btn btn-google" id="googleBtn" type="button">
        <svg width="17" height="17" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.5 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.2 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"/><path fill="#FBBC05" d="M10.4 28.7a14.5 14.5 0 0 1 0-9.4l-7.8-6.1a24 24 0 0 0 0 21.6l7.8-6.1z"/><path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.4-5.6l-7.5-5.8c-2.1 1.4-4.8 2.3-7.9 2.3-6.3 0-11.7-3.7-13.6-9.2l-7.8 6.1C6.5 42.6 14.6 48 24 48z"/></svg>
        Continue with Google
      </button>
      <div class="divider">or with email</div>
      <form class="form" id="authForm">
        <div class="field" id="nameField" style="display:none"><label>Display name *</label><input name="displayName" maxlength="60"/></div>
        <div class="field"><label>Email *</label><input name="email" type="email" required maxlength="200"/></div>
        <div class="field"><label>Password *</label><input name="password" type="password" required minlength="6" maxlength="100"/></div>
        <div class="form-actions">
          <button class="btn btn-solid" type="submit" id="authSubmit">Sign In</button>
          <button class="btn small" type="button" id="forgotBtn">Forgot password?</button>
        </div>
        <span class="form-msg" id="authMsg"></span>
        <p class="hint" style="font-size:12px;color:var(--muted)">By creating an account you accept the
          <a href="#/guidelines" style="color:var(--accent)">community guidelines</a>.</p>
      </form>
    </div>
  </div>`;

  let mode = "signin";
  const tabs = view.querySelectorAll(".auth-tabs button");
  tabs.forEach(b => b.onclick = () => {
    mode = b.dataset.tab;
    tabs.forEach(x => x.classList.toggle("active", x === b));
    document.getElementById("nameField").style.display = mode === "signup" ? "" : "none";
    document.getElementById("authSubmit").textContent = mode === "signup" ? "Create Account" : "Sign In";
  });

  const msg = document.getElementById("authMsg");
  const googleBtn = document.getElementById("googleBtn");
  const googleBtnHtml = googleBtn.innerHTML;
  if (googleSignInPending) {
    googleBtn.disabled = true;
    googleBtn.innerHTML = "Waiting for Google…";
  }
  googleBtn.onclick = async () => {
    if (googleSignInPending) return;           // a popup is already open
    googleSignInPending = true;
    googleBtn.disabled = true;
    googleBtn.innerHTML = "Waiting for Google…";
    msg.className = "form-msg"; msg.textContent = "";
    try {
      await signInWithPopup(auth, googleProvider());
      toast("Signed in ✓"); route();
    } catch (e) {
      const code = String(e && e.code || "");
      /* The user closing the window, or a second click superseding the first,
         is a normal outcome and not something to report as an error. */
      if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
        /* nothing to say */
      } else if (code === "auth/popup-blocked" && redirectSignInUsable()) {
        try {
          await signInWithRedirect(auth, googleProvider());   // page navigates to Google
        } catch (re) {
          msg.className = "form-msg err"; msg.textContent = fbError(re);
        }
      } else {
        msg.className = "form-msg err"; msg.textContent = fbError(e);
      }
    } finally {
      googleSignInPending = false;
      if (document.body.contains(googleBtn)) {
        googleBtn.disabled = false;
        googleBtn.innerHTML = googleBtnHtml;
      }
    }
  };
  document.getElementById("forgotBtn").onclick = async () => {
    const email = String(new FormData(document.getElementById("authForm")).get("email")).trim();
    if (!email) { msg.className = "form-msg err"; msg.textContent = "Enter your email first, then click 'Forgot password?'."; return; }
    try { await sendPasswordResetEmail(auth, email); msg.className = "form-msg ok"; msg.textContent = "Password-reset email sent."; }
    catch (e) { msg.className = "form-msg err"; msg.textContent = fbError(e); }
  };
  document.getElementById("authForm").addEventListener("submit", async ev => {
    ev.preventDefault();
    const f = new FormData(ev.target);
    const email = String(f.get("email")).trim(), pass = String(f.get("password"));
    msg.className = "form-msg"; msg.textContent = "";
    try {
      if (mode === "signup") {
        const name = String(f.get("displayName") || "").trim();
        if (!name) { msg.className = "form-msg err"; msg.textContent = "Please choose a display name."; return; }
        const cred = await createUserWithEmailAndPassword(auth, email, pass);
        await updateProfile(cred.user, { displayName: name });
        await setDoc(doc(db, "profiles", cred.user.uid), { displayName: name, createdAt: serverTimestamp() });
        await sendEmailVerification(cred.user);
        toast("Account created — check your inbox to verify your email.");
      } else {
        await signInWithEmailAndPassword(auth, email, pass);
        toast("Signed in ✓");
      }
      route();
    } catch (e) { msg.className = "form-msg err"; msg.textContent = fbError(e); }
  });
}

/* ==========================================================================
   VIEW: Admin dashboard
   ========================================================================== */

async function viewAdmin() {
  if (!CONFIGURED) { view.innerHTML = setupNotice(); return; }
  if (!currentUser) { view.innerHTML = authPrompt("Admin access requires signing in."); return; }
  if (!isAdmin()) { view.innerHTML = `<div class="empty">This area is restricted to the site owner.</div>`; return; }

  view.innerHTML = `
  <div class="app-crumb"><a href="#/">Platform</a> / Admin</div>
  <div class="app-head" style="margin-bottom:22px"><h1 style="font-size:clamp(26px,3.5vw,38px)">Admin Dashboard</h1></div>
  <div class="stat-row" id="adminStats"></div>
  <div class="tabs" id="adminTabs">
    <button data-t="consult" class="active">Consultations</button>
    <button data-t="invites">Invitations</button>
    <button data-t="messages">Messages</button>
    <button data-t="book">Book Downloads</button>
    <button data-t="blog">Blog</button>
    <button data-t="lessons">Lessons</button>
    <button data-t="subs">Subscribers</button>
    <button data-t="mod">Moderation</button>
  </div>
  <div id="adminBody"><div class="loading"><div class="spinner"></div></div></div>`;

  const body = document.getElementById("adminBody");
  const tabs = document.getElementById("adminTabs").querySelectorAll("button");
  const setTab = t => {
    tabs.forEach(b => b.classList.toggle("active", b.dataset.t === t));
    ({ consult: adminConsults, invites: adminInvites, messages: adminMessages, book: adminBookDownloads, blog: adminBlog, lessons: adminLessons, subs: adminSubs, mod: adminMod })[t](body);
  };
  tabs.forEach(b => b.onclick = () => setTab(b.dataset.t));

  // Stats
  (async () => {
    try {
      const [c, i, m, bk, s, r] = await Promise.all([
        getDocs(collection(db, "consultations")),
        getDocs(collection(db, "invitations")),
        getDocs(collection(db, "messages")),
        getDocs(collection(db, "bookDownloads")),
        getDocs(collection(db, "subscribers")),
        getDocs(query(collection(db, "threads"), where("reported", "==", true)))
      ]);
      const pend = arr => arr.docs.filter(d => d.data().status === "pending").length;
      document.getElementById("adminStats").innerHTML = `
        <div class="stat"><b>${pend(c)}</b><span>pending consultations</span></div>
        <div class="stat"><b>${pend(i)}</b><span>pending invitations</span></div>
        <div class="stat"><b>${m.docs.filter(d => d.data().status === "new").length}</b><span>new messages</span></div>
        <div class="stat"><b>${bk.size}</b><span>readers who've requested the book</span></div>
        <div class="stat"><b>${s.docs.filter(d => d.data().status === "subscribed").length}</b><span>newsletter subscribers</span></div>
        <div class="stat"><b>${r.size}</b><span>reported threads</span></div>`;
    } catch (e) { console.error(e); }
  })();

  setTab("consult");
}

/* Contact-page messages (written by assets/js/contact-form.js via the
   Firestore REST API; the sender also gets a copy emailed via Formspree). */
async function adminMessages(body) {
  body.innerHTML = `<div class="loading"><div class="spinner"></div></div>`;
  const snap = await getDocs(collection(db, "messages"));
  const rank = s => (s === "new" ? 0 : s === "read" ? 1 : 2);
  const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => rank(a.status) - rank(b.status) ||
                    ((tsDate(b.createdAt) || 0) - (tsDate(a.createdAt) || 0)));
  if (!items.length) {
    body.innerHTML = `<div class="empty">No contact messages yet. Submissions from the
      <a href="../contact.html" style="color:var(--accent);font-weight:600">contact page</a> appear here
      (you also receive each one by email).</div>`;
    return;
  }

  body.innerHTML = `
  <p class="sub" style="margin-bottom:16px">Messages from the site's contact form. Each one was also emailed to you —
  this list is the working queue.</p>
  <div class="list">${items.map(r => `
    <div class="list-item" style="flex-direction:column;align-items:stretch">
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap">
        <div class="li-main">
          <h3>${esc(r.subject || "General Inquiry")} — ${esc(r.name)}</h3>
          <div class="meta">${esc(r.email)} · ${fmtDate(r.createdAt, true)}</div>
        </div>
        <div class="li-side" style="flex-direction:row;align-items:center">
          ${badge(r.status === "new" ? "pending" : r.status).replace(">pending<", ">new<")}
          <button class="btn small" data-open="${r.id}">Details</button>
        </div>
      </div>
      <div id="mdetail-${r.id}" style="display:none;border-top:1px solid var(--line);margin-top:14px;padding-top:14px">
        <p style="white-space:pre-wrap;color:var(--ink-soft);font-size:14.5px;margin-bottom:16px">${esc(r.message)}</p>
        <div class="form-actions">
          <a class="btn btn-solid small" href="mailto:${esc(r.email)}?subject=${encodeURIComponent("Re: " + (r.subject || "your message"))}">Reply by email ↗</a>
          ${r.status === "new" ? `<button class="btn small" data-mset="read:${r.id}">Mark read</button>` : ""}
          ${r.status !== "archived" ? `<button class="btn small" data-mset="archived:${r.id}">Archive</button>` : `<button class="btn small" data-mset="read:${r.id}">Unarchive</button>`}
          <button class="btn small danger" data-mdelete="${r.id}">Delete</button>
        </div>
      </div>
    </div>`).join("")}</div>`;

  body.querySelectorAll("[data-open]").forEach(b => b.onclick = () => {
    const d = document.getElementById("mdetail-" + b.dataset.open);
    d.style.display = d.style.display === "none" ? "" : "none";
    // Opening an unread message marks it read automatically.
    const item = items.find(x => x.id === b.dataset.open);
    if (item && item.status === "new" && d.style.display !== "none") {
      updateDoc(doc(db, "messages", item.id), { status: "read" }).then(() => { item.status = "read"; }).catch(() => {});
    }
  });
  body.querySelectorAll("[data-mset]").forEach(b => b.onclick = async () => {
    const [status, id] = b.dataset.mset.split(":");
    try { await updateDoc(doc(db, "messages", id), { status }); adminMessages(body); }
    catch (e) { toast(fbError(e)); }
  });
  body.querySelectorAll("[data-mdelete]").forEach(b => b.onclick = async () => {
    if (!confirm("Permanently delete this message?")) return;
    try { await deleteDoc(doc(db, "messages", b.dataset.mdelete)); adminMessages(body); }
    catch (e) { toast(fbError(e)); }
  });
}

const detailRow = (k, v) => v ? `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>` : "";

async function adminConsults(body) {
  body.innerHTML = `<div class="loading"><div class="spinner"></div></div>`;
  const snap = await getDocs(collection(db, "consultations"));
  const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.status === "pending" ? -1 : 1) - (b.status === "pending" ? -1 : 1) ||
                    ((tsDate(b.createdAt) || 0) - (tsDate(a.createdAt) || 0)));
  if (!items.length) { body.innerHTML = `<div class="empty">No consultation requests yet.</div>`; return; }

  body.innerHTML = `<div class="list">${items.map(r => `
    <div class="list-item" style="flex-direction:column;align-items:stretch">
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap">
        <div class="li-main">
          <h3>${esc(r.typeName)} — ${esc(r.name)}</h3>
          <div class="meta">${esc(r.email)} · ${esc(r.role)}${r.organization ? " · " + esc(r.organization) : ""} · ${fmtDate(r.createdAt)}</div>
        </div>
        <div class="li-side" style="flex-direction:row;align-items:center">${badge(r.status)}
          <button class="btn small" data-open="${r.id}">Details</button></div>
      </div>
      <div id="detail-${r.id}" style="display:none;border-top:1px solid var(--line);margin-top:14px;padding-top:14px">
        <dl class="detail-grid">
          ${detailRow("Topic", r.topic)}${detailRow("Goals", r.goals)}${detailRow("Links", r.links)}
          ${detailRow("Mode", r.mode)}${detailRow("Timezone", r.timezone)}
          ${detailRow("Proposed times", (r.slots || []).map(s => new Date(s).toLocaleString()).join(" · "))}
        </dl>
        ${r.status === "pending" ? `
        <div class="form" style="gap:12px">
          <div class="form-row">
            <div class="field"><label>Confirm slot</label>
              <select id="slot-${r.id}">${(r.slots || []).map(s => `<option value="${esc(s)}">${new Date(s).toLocaleString()}</option>`).join("")}</select></div>
            <div class="field"><label>Meeting link (Meet/Teams/Zoom)</label><input id="link-${r.id}" placeholder="https://…"/></div>
          </div>
          <div class="form-actions">
            <button class="btn btn-solid small" data-approve="${r.id}">Approve</button>
            <button class="btn small danger" data-decline="${r.id}">Decline…</button>
          </div>
        </div>` : `
        <div class="form-actions">
          ${r.status === "approved" ? `<button class="btn small" data-complete="${r.id}">Mark completed</button>` : ""}
          <button class="btn small danger" data-delete="${r.id}">Delete</button>
        </div>`}
      </div>
    </div>`).join("")}</div>`;

  body.querySelectorAll("[data-open]").forEach(b => b.onclick = () => {
    const d = document.getElementById("detail-" + b.dataset.open);
    d.style.display = d.style.display === "none" ? "" : "none";
  });
  body.querySelectorAll("[data-approve]").forEach(b => b.onclick = async () => {
    const id = b.dataset.approve;
    try {
      await updateDoc(doc(db, "consultations", id), {
        status: "approved",
        scheduledAt: document.getElementById("slot-" + id).value,
        meetingLink: String(document.getElementById("link-" + id).value).trim(),
        decidedAt: serverTimestamp()
      });
      toast("Approved — remember to email the requester and send a calendar invite.");
      adminConsults(body);
    } catch (e) { toast(fbError(e)); }
  });
  body.querySelectorAll("[data-decline]").forEach(b => b.onclick = async () => {
    const reason = prompt("Courteous decline reason (shown to the requester):",
      "Thanks for reaching out — I'm unable to take this one on right now, but feel free to try again next term.");
    if (reason === null) return;
    try {
      await updateDoc(doc(db, "consultations", b.dataset.decline), { status: "declined", declineReason: reason, decidedAt: serverTimestamp() });
      adminConsults(body);
    } catch (e) { toast(fbError(e)); }
  });
  body.querySelectorAll("[data-complete]").forEach(b => b.onclick = async () => {
    try { await updateDoc(doc(db, "consultations", b.dataset.complete), { status: "completed" }); adminConsults(body); }
    catch (e) { toast(fbError(e)); }
  });
  body.querySelectorAll("[data-delete]").forEach(b => b.onclick = async () => {
    if (!confirm("Permanently delete this request?")) return;
    try { await deleteDoc(doc(db, "consultations", b.dataset.delete)); adminConsults(body); }
    catch (e) { toast(fbError(e)); }
  });
}

async function adminInvites(body) {
  body.innerHTML = `<div class="loading"><div class="spinner"></div></div>`;
  const snap = await getDocs(collection(db, "invitations"));
  const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (tsDate(b.createdAt) || 0) - (tsDate(a.createdAt) || 0));
  if (!items.length) { body.innerHTML = `<div class="empty">No speaking invitations yet.</div>`; return; }

  body.innerHTML = `<div class="list">${items.map(r => `
    <div class="list-item" style="flex-direction:column;align-items:stretch">
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap">
        <div class="li-main">
          <h3>${esc(r.eventName)} <span style="font-weight:400;color:var(--muted)">(${esc(r.eventType)})</span></h3>
          <div class="meta">${esc(r.organizerName)} · ${esc(r.organization)} · ${esc(r.email)} · ${fmtDate(r.createdAt)}</div>
        </div>
        <div class="li-side" style="flex-direction:row;align-items:center">${badge(r.status)}
          <button class="btn small" data-open="${r.id}">Details</button></div>
      </div>
      <div id="idetail-${r.id}" style="display:none;border-top:1px solid var(--line);margin-top:14px;padding-top:14px">
        <dl class="detail-grid">
          ${detailRow("Topic", r.topic)}${detailRow("Format & duration", r.format)}
          ${detailRow("Date(s)", r.eventDate)}${detailRow("Location", r.location)}
          ${detailRow("Audience", r.audience)}${detailRow("Travel covered", r.travel)}
          ${detailRow("Honorarium", r.honorarium)}${detailRow("Phone", r.phone)}
          ${detailRow("Role", r.organizerRole)}${detailRow("Message", r.message)}
        </dl>
        <div class="form-actions">
          <button class="btn btn-solid small" data-set="accepted:${r.id}">Accept</button>
          <button class="btn small" data-set="discussing:${r.id}">Discussing</button>
          <button class="btn small danger" data-set="declined:${r.id}">Decline</button>
          <a class="btn small" href="mailto:${esc(r.email)}?subject=${encodeURIComponent("Re: " + r.eventName)}">Reply by email ↗</a>
          <button class="btn small danger" data-idelete="${r.id}">Delete</button>
        </div>
      </div>
    </div>`).join("")}</div>`;

  body.querySelectorAll("[data-open]").forEach(b => b.onclick = () => {
    const d = document.getElementById("idetail-" + b.dataset.open);
    d.style.display = d.style.display === "none" ? "" : "none";
  });
  body.querySelectorAll("[data-set]").forEach(b => b.onclick = async () => {
    const [status, id] = b.dataset.set.split(":");
    try { await updateDoc(doc(db, "invitations", id), { status, decidedAt: serverTimestamp() }); adminInvites(body); }
    catch (e) { toast(fbError(e)); }
  });
  body.querySelectorAll("[data-idelete]").forEach(b => b.onclick = async () => {
    if (!confirm("Permanently delete this invitation?")) return;
    try { await deleteDoc(doc(db, "invitations", b.dataset.idelete)); adminInvites(body); }
    catch (e) { toast(fbError(e)); }
  });
}

async function adminBlog(body, editId) {
  body.innerHTML = `<div class="loading"><div class="spinner"></div></div>`;
  const snap = await getDocs(collection(db, "posts"));
  const posts = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (tsDate(b.createdAt) || 0) - (tsDate(a.createdAt) || 0));
  const editing = editId ? posts.find(p => p.id === editId) : null;

  body.innerHTML = `
  <div class="two-col">
    <form class="form panel" id="postForm">
      <h3>${editing ? "Edit article" : "New article"}</h3>
      <div class="field"><label>Title *</label><input name="title" required maxlength="200" value="${esc(editing?.title || "")}"/></div>
      <div class="form-row">
        <div class="field"><label>Category</label>
          <select name="category">${POST_CATEGORIES.map(c => `<option ${editing?.category === c ? "selected" : ""}>${esc(c)}</option>`).join("")}</select></div>
        <div class="field"><label>Tags <small>(comma-separated)</small></label><input name="tags" maxlength="200" value="${esc((editing?.tags || []).join(", "))}"/></div>
      </div>
      <div class="field"><label>Summary <small>(abstract-style, shown at top &amp; in cards)</small></label>
        <textarea name="summary" maxlength="500" style="min-height:70px">${esc(editing?.summary || "")}</textarea></div>
      <div class="field"><label>Content * <small>(Markdown: ## headings, **bold**, [links](url), \`\`\`code\`\`\`, lists, &gt; quotes, images)</small></label>
        <textarea name="content" required maxlength="60000" style="min-height:320px;font-family:ui-monospace,Menlo,monospace;font-size:13px">${esc(editing?.content || "")}</textarea></div>
      <div class="form-actions">
        <button class="btn btn-solid small" type="submit" data-status="published">${editing?.status === "published" ? "Update (published)" : "Publish"}</button>
        <button class="btn small" type="submit" data-status="draft">Save as draft</button>
        ${editing ? `<button class="btn small" type="button" id="cancelEdit">Cancel edit</button>` : ""}
        <span class="form-msg" id="postMsg"></span>
      </div>
    </form>
    <div>
      <h3 style="margin-bottom:12px">All articles (${posts.length})</h3>
      <div class="list">${posts.map(p => `
        <div class="list-item">
          <div class="li-main"><h3>${esc(p.title)}</h3>
            <div class="meta">${esc(p.category || "")} · ${fmtDate(p.publishedAt || p.createdAt)} · /${esc(p.slug || p.id)}</div></div>
          <div class="li-side" style="flex-direction:row;align-items:center">
            ${badge(p.status)}
            <button class="btn small" data-edit="${p.id}">Edit</button>
            <button class="btn small danger" data-pdel="${p.id}">✕</button>
          </div>
        </div>`).join("") || `<div class="empty" style="padding:24px">No articles yet.</div>`}</div>
    </div>
  </div>`;

  let clickedStatus = "published";
  const form = document.getElementById("postForm");
  form.querySelectorAll("button[type=submit]").forEach(b => b.addEventListener("click", () => { clickedStatus = b.dataset.status; }));
  form.addEventListener("submit", async ev => {
    ev.preventDefault();
    const f = new FormData(form);
    const title = String(f.get("title")).trim();
    const content = String(f.get("content"));
    const data = {
      title,
      slug: editing?.slug || slugify(title),
      category: f.get("category"),
      tags: String(f.get("tags") || "").split(",").map(s => s.trim()).filter(Boolean),
      summary: String(f.get("summary") || "").trim(),
      content,
      readingTime: readingTime(content),
      status: clickedStatus,
      updatedAt: serverTimestamp()
    };
    try {
      if (editing) {
        if (clickedStatus === "published" && editing.status !== "published") data.publishedAt = serverTimestamp();
        await updateDoc(doc(db, "posts", editing.id), data);
      } else {
        data.createdAt = serverTimestamp();
        if (clickedStatus === "published") data.publishedAt = serverTimestamp();
        await addDoc(collection(db, "posts"), data);
      }
      toast(clickedStatus === "published" ? "Article published ✓" : "Draft saved ✓");
      adminBlog(body);
    } catch (e) {
      document.getElementById("postMsg").className = "form-msg err";
      document.getElementById("postMsg").textContent = fbError(e);
    }
  });
  const cancel = document.getElementById("cancelEdit");
  if (cancel) cancel.onclick = () => adminBlog(body);
  body.querySelectorAll("[data-edit]").forEach(b => b.onclick = () => adminBlog(body, b.dataset.edit));
  body.querySelectorAll("[data-pdel]").forEach(b => b.onclick = async () => {
    if (!confirm("Delete this article permanently?")) return;
    try { await deleteDoc(doc(db, "posts", b.dataset.pdel)); adminBlog(body); }
    catch (e) { toast(fbError(e)); }
  });
}

async function adminLessons(body, editId) {
  body.innerHTML = `<div class="loading"><div class="spinner"></div></div>`;
  const snap = await getDocs(collection(db, "lessons"));
  const lessons = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (tsDate(b.createdAt) || 0) - (tsDate(a.createdAt) || 0));
  const editing = editId ? lessons.find(l => l.id === editId) : null;

  body.innerHTML = `
  <div class="two-col">
    <form class="form panel" id="lessonForm">
      <h3>${editing ? "Edit lesson" : "New lesson"}</h3>
      <div class="field"><label>Title *</label><input name="title" required maxlength="200" value="${esc(editing?.title || "")}"/></div>
      <div class="field"><label>Subtitle <small>(shown at top &amp; in cards)</small></label>
        <textarea name="subtitle" maxlength="500" style="min-height:70px">${esc(editing?.subtitle || "")}</textarea></div>
      <div class="field"><label>Objectives <small>(one per line — "What you'll learn")</small></label>
        <textarea name="objectives" maxlength="2000" style="min-height:90px">${esc((editing?.objectives || []).join("\n"))}</textarea></div>
      <div class="field"><label>Tags <small>(comma-separated)</small></label><input name="tags" maxlength="200" value="${esc((editing?.tags || []).join(", "))}"/></div>
      <div class="field"><label>Content * <small>(Markdown: ## headings, **bold**, [links](url), \`\`\`code\`\`\`, lists, &gt; quotes, images, tables, ::: definition :::)</small></label>
        <textarea name="content" required maxlength="60000" style="min-height:320px;font-family:ui-monospace,Menlo,monospace;font-size:13px">${esc(editing?.content || "")}</textarea></div>
      <div class="form-actions">
        <button class="btn btn-solid small" type="submit" data-status="published">${editing?.status === "published" ? "Update (published)" : "Publish"}</button>
        <button class="btn small" type="submit" data-status="draft">Save as draft</button>
        ${editing ? `<button class="btn small" type="button" id="cancelEdit">Cancel edit</button>` : ""}
        <span class="form-msg" id="lessonMsg"></span>
      </div>
    </form>
    <div>
      <h3 style="margin-bottom:12px">All lessons (${lessons.length})</h3>
      <div class="list">${lessons.map(l => `
        <div class="list-item">
          <div class="li-main"><h3>${esc(l.title)}</h3>
            <div class="meta">${fmtDate(l.publishedAt || l.createdAt)} · /${esc(l.slug || l.id)}</div></div>
          <div class="li-side" style="flex-direction:row;align-items:center">
            ${badge(l.status)}
            <button class="btn small" data-edit="${l.id}">Edit</button>
            <button class="btn small danger" data-ldel="${l.id}">✕</button>
          </div>
        </div>`).join("") || `<div class="empty" style="padding:24px">No lessons yet.</div>`}</div>
    </div>
  </div>`;

  let clickedStatus = "published";
  const form = document.getElementById("lessonForm");
  form.querySelectorAll("button[type=submit]").forEach(b => b.addEventListener("click", () => { clickedStatus = b.dataset.status; }));
  form.addEventListener("submit", async ev => {
    ev.preventDefault();
    const f = new FormData(form);
    const title = String(f.get("title")).trim();
    const content = String(f.get("content"));
    const data = {
      title,
      slug: editing?.slug || slugify(title),
      subtitle: String(f.get("subtitle") || "").trim(),
      objectives: String(f.get("objectives") || "").split("\n").map(s => s.trim()).filter(Boolean),
      tags: String(f.get("tags") || "").split(",").map(s => s.trim()).filter(Boolean),
      content,
      readingTime: readingTime(content),
      status: clickedStatus,
      updatedAt: serverTimestamp()
    };
    try {
      if (editing) {
        if (clickedStatus === "published" && editing.status !== "published") data.publishedAt = serverTimestamp();
        await updateDoc(doc(db, "lessons", editing.id), data);
      } else {
        data.createdAt = serverTimestamp();
        if (clickedStatus === "published") data.publishedAt = serverTimestamp();
        await addDoc(collection(db, "lessons"), data);
      }
      toast(clickedStatus === "published" ? "Lesson published ✓" : "Draft saved ✓");
      adminLessons(body);
    } catch (e) {
      document.getElementById("lessonMsg").className = "form-msg err";
      document.getElementById("lessonMsg").textContent = fbError(e);
    }
  });
  const cancel = document.getElementById("cancelEdit");
  if (cancel) cancel.onclick = () => adminLessons(body);
  body.querySelectorAll("[data-edit]").forEach(b => b.onclick = () => adminLessons(body, b.dataset.edit));
  body.querySelectorAll("[data-ldel]").forEach(b => b.onclick = async () => {
    if (!confirm("Delete this lesson permanently?")) return;
    try { await deleteDoc(doc(db, "lessons", b.dataset.ldel)); adminLessons(body); }
    catch (e) { toast(fbError(e)); }
  });
}

async function adminBookDownloads(body) {
  body.innerHTML = `<div class="loading"><div class="spinner"></div></div>`;
  const snap = await getDocs(collection(db, "bookDownloads"));
  const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (tsDate(b.lastDownloadAt) || 0) - (tsDate(a.lastDownloadAt) || 0));

  body.innerHTML = `
  <div class="form-actions" style="margin-bottom:18px">
    <button class="btn small btn-solid" id="bookCsvBtn" ${rows.length ? "" : "disabled"}>Export CSV (${rows.length})</button>
    <span class="form-msg">Everyone who has requested <i>${esc(BOOK.title)}</i> through the platform — email them the PDF directly.</span>
  </div>
  <div class="list">${rows.map(r => `
    <div class="list-item">
      <div class="li-main"><h3 style="font-size:14.5px">${esc(r.name || "(no name set)")}</h3>
        <div class="meta">${esc(r.email)} · first requested ${fmtDate(r.firstDownloadAt)} · last ${fmtDate(r.lastDownloadAt)}</div></div>
      <div class="li-side" style="flex-direction:row;align-items:center">
        <span class="badge">${r.downloadCount || 1} request${(r.downloadCount || 1) === 1 ? "" : "s"}</span>
      </div>
    </div>`).join("") || `<div class="empty">No requests yet — readers who sign in and request the book will appear here.</div>`}</div>`;

  const csvBtn = document.getElementById("bookCsvBtn");
  if (csvBtn) csvBtn.onclick = () => {
    const table = [["name", "email", "downloadCount", "firstDownloadAt", "lastDownloadAt"]]
      .concat(rows.map(r => [r.name || "", r.email || "", r.downloadCount || 1, fmtDate(r.firstDownloadAt), fmtDate(r.lastDownloadAt)]));
    const csv = table.map(row => row.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "book-downloads.csv";
    a.click();
  };
}

async function adminSubs(body) {
  body.innerHTML = `<div class="loading"><div class="spinner"></div></div>`;
  const snap = await getDocs(collection(db, "subscribers"));
  const subs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (tsDate(b.createdAt) || 0) - (tsDate(a.createdAt) || 0));

  body.innerHTML = `
  <div class="form-actions" style="margin-bottom:18px">
    <button class="btn small btn-solid" id="csvBtn">Export CSV (${subs.length})</button>
    <span class="form-msg">Import this into your email tool of choice for sending campaigns.</span>
  </div>
  <div class="list">${subs.map(s => `
    <div class="list-item">
      <div class="li-main"><h3 style="font-size:14.5px">${esc(s.email)}</h3>
        <div class="meta">${esc(s.name || "—")} · ${esc(s.segment || "")} · joined ${fmtDate(s.createdAt)}</div></div>
      <div class="li-side" style="flex-direction:row;align-items:center">
        ${badge(s.status)}
        <button class="btn small" data-flip="${s.id}:${s.status}">${s.status === "subscribed" ? "Unsubscribe" : "Resubscribe"}</button>
      </div>
    </div>`).join("") || `<div class="empty">No subscribers yet.</div>`}</div>`;

  document.getElementById("csvBtn").onclick = () => {
    const rows = [["email", "name", "segment", "status", "createdAt"]]
      .concat(subs.map(s => [s.email, s.name || "", s.segment || "", s.status, fmtDate(s.createdAt)]));
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "newsletter-subscribers.csv";
    a.click();
  };
  body.querySelectorAll("[data-flip]").forEach(b => b.onclick = async () => {
    const [id, status] = b.dataset.flip.split(":");
    try {
      await updateDoc(doc(db, "subscribers", id), { status: status === "subscribed" ? "unsubscribed" : "subscribed" });
      adminSubs(body);
    } catch (e) { toast(fbError(e)); }
  });
}

async function adminMod(body) {
  body.innerHTML = `<div class="loading"><div class="spinner"></div></div>`;
  const snap = await getDocs(query(collection(db, "threads"), where("reported", "==", true)));
  const reported = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  body.innerHTML = `
  <p class="sub" style="margin-bottom:16px">Reported threads appear below. Reported <b>replies</b> are flagged with ⚠ inside their thread
  (open the thread to hide/delete them). Pin/lock/hide controls also live on each thread page.</p>
  <div class="list">${reported.map(t => `
    <div class="list-item">
      <div class="li-main">
        <h3>⚠ ${esc(t.title)}</h3>
        <div class="meta">${esc(catById(t.categoryId)?.name || t.categoryId)} · by ${esc(t.authorName)} · ${timeAgo(t.createdAt)}</div>
      </div>
      <div class="li-side" style="flex-direction:row;align-items:center">
        <a class="btn small" href="#/forum/t/${t.id}">Open</a>
        <button class="btn small" data-clear="${t.id}">Dismiss report</button>
        <button class="btn small danger" data-thide="${t.id}">Hide</button>
      </div>
    </div>`).join("") || `<div class="empty">No reports — all quiet. 🎉</div>`}</div>`;

  body.querySelectorAll("[data-clear]").forEach(b => b.onclick = async () => {
    try { await updateDoc(doc(db, "threads", b.dataset.clear), { reported: false }); adminMod(body); }
    catch (e) { toast(fbError(e)); }
  });
  body.querySelectorAll("[data-thide]").forEach(b => b.onclick = async () => {
    try { await updateDoc(doc(db, "threads", b.dataset.thide), { hidden: true, reported: false }); adminMod(body); }
    catch (e) { toast(fbError(e)); }
  });
}

/* ---------- boot ----------------------------------------------------------- */
route();
