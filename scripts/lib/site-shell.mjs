/* ==========================================================================
   site-shell.mjs — the frame every generated page sits in

   Generated pages (the lesson pages under /lessons/ and /app/lessons/, and
   the articles under /writing/) used to carry their own copy of the nav and
   footer. It had drifted from the hand-written pages — no mobile menu, no
   premium.js, so the burger did nothing and every `.reveal` element stayed
   invisible. They all take their frame from here now, so the next nav change
   is one edit.

   `depth` is how many folders below the site root the page lives
   (writing/ and lessons/ are 1, app/lessons/ is 2).
   ========================================================================== */

export const SITE_URL = 'https://www.yasassri.me';

export const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const NAV = [
  ['research.html', 'Research', 'research'],
  ['teaching.html', 'Teaching', 'teaching'],
  ['students.html', 'Students', 'students'],
  ['products.html', 'Products', 'products'],
  ['news.html', 'News', 'news'],
  ['blogs.html', 'Writing', 'writing'],
  ['about.html', 'About', 'about'],
];

const MOBILE = [
  ['index.html', 'Home', 'home'],
  ['work-with-me.html', 'Work With Me', 'work'],
  ['speaking.html', 'Speaking', 'speaking'],
  ['research.html', 'Research', 'research'],
  ['teaching.html', 'Teaching', 'teaching'],
  ['students.html', 'Students', 'students'],
  ['products.html', 'Products', 'products'],
  ['news.html', 'News', 'news'],
  ['blogs.html', 'Writing', 'writing'],
  ['about.html', 'About', 'about'],
];

export function breadcrumbLd(pairs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: pairs.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
  };
}

/* Visible breadcrumb; the last item is the current page. */
export function crumbs(depth, pairs) {
  const up = '../'.repeat(depth);
  return `<nav class="lp-crumbs" aria-label="Breadcrumb">${pairs
    .map(([name, href], i) =>
      i === pairs.length - 1
        ? `<span aria-current="page">${esc(name)}</span>`
        : `<a href="${href.startsWith('http') ? esc(href) : up + esc(href)}">${esc(name)}</a><span aria-hidden="true">/</span>`,
    )
    .join('')}</nav>`;
}

export function pageShell({
  depth,
  title,
  description,
  canonical,
  ogImage = `${SITE_URL}/assets/images/og-card.png`,
  ogType = 'article',
  jsonLd = [],
  active = 'teaching',
  body,
  bodyClass = 'lp-page',
  head = '',
  foot = '',
}) {
  const up = '../'.repeat(depth);
  const cls = (key) => (key === active ? ' class="active"' : '');
  const ld = jsonLd
    .filter(Boolean)
    .map((o) => `<script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n</script>`)
    .join('\n');
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
<meta name="theme-color" content="#2f6bff"/>
<link rel="canonical" href="${esc(canonical)}"/>
<link rel="alternate" type="application/rss+xml" href="${SITE_URL}/feed.xml"/>
<meta property="og:type" content="${ogType}"/>
<meta property="og:site_name" content="Dr. Yasas Sri Wickramasinghe"/>
<meta property="og:title" content="${esc(title)}"/>
<meta property="og:description" content="${esc(description)}"/>
<meta property="og:url" content="${esc(canonical)}"/>
<meta property="og:image" content="${esc(ogImage)}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:site" content="@sri_yasas"/>
${ld}
<link rel="preload" href="${up}assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin=""/>
<link href="${up}assets/css/fonts.css" rel="stylesheet"/>
<link href="${up}assets/css/fonts-newsreader.css" rel="stylesheet"/>
<link href="${up}assets/css/redesign.css" rel="stylesheet"/>
<link href="${up}assets/css/lesson-page.css" rel="stylesheet"/>
${head}<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-N2BH0F6SNE"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-N2BH0F6SNE');
</script>
</head>
<body class="${bodyClass}">

<div class="progress-bar"></div>

<nav class="nav">
  <div class="nav-inner">
    <a class="nav-logo" href="${up}index.html">Yasas Sri <em>Wickramasinghe</em></a>
    <div class="nav-links">
${NAV.map(([href, label, key]) => `      <a${cls(key)} href="${up}${href}">${label}</a>`).join('\n')}
      <a href="${up}app/#/">Platform <span class="nav-badge">New</span></a>
      <a href="${up}contact.html">Contact</a>
      <a class="btn btn-solid" href="${up}work-with-me.html">Work With Me <span class="arrow">→</span></a>
    </div>
    <button class="nav-toggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
  </div>
</nav>
<div class="mobile-menu">
${MOBILE.map(([href, label, key], i) => `  <a${cls(key)} href="${up}${href}"><span class="idx">${String(i + 1).padStart(2, '0')}</span>${label}</a>`).join('\n')}
  <a href="${up}app/#/"><span class="idx">11</span>Platform <span class="nav-badge">New</span></a>
  <a href="${up}contact.html"><span class="idx">12</span>Contact</a>
  <a href="${up}assets/files/cv_yasas.pdf" target="_blank"><span class="idx">13</span>Curriculum Vitae</a>
</div>

<main>
${body}
</main>

<footer>
  <div class="container footer-inner">
    <div>
      <div class="footer-name">Yasas Sri <em>Wickramasinghe</em></div>
      <div class="footer-copy">&copy; <span class="year">2026</span> Yasas Sri Wickramasinghe. All rights reserved. Not an official Yoobee College page.</div>
    </div>
    <div class="footer-links">
      <a href="https://www.linkedin.com/in/yasassri" target="_blank" rel="noopener">LinkedIn</a>
      <a href="https://www.instagram.com/yasassri.me" target="_blank" rel="noopener">Instagram</a>
      <a href="https://twitter.com/sri_yasas" target="_blank" rel="noopener">Twitter/X</a>
      <a href="https://ictcampus.lk" target="_blank" rel="noopener">ICT Campus</a>
      <a href="${up}contact.html">Contact</a>
    </div>
  </div>
</footer>

<script src="${up}assets/js/premium.js"></script>
<script src="${up}assets/js/hunt.js" defer></script>
${foot}</body>
</html>
`;
}
