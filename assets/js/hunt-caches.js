/* ==========================================================================
   Cache hunt — the caches.
   Loaded when someone turns the hunt on, and by cards.html (the prize page).

   Eight caches, each tucked beside the content that matters most on its
   page, so a hunt is also a tour of what I do.

   HOW TO EDIT A CACHE
     id        Stable name. Progress is saved against it, so don't rename it.
     page      The page it's hidden on (from the site root).
     key       That page's path without ".html" ("index" for the home page).
     pageName  How the page is named in hints ("Go to Speaking").
     name      Short name shown in the cache list.
     level     Difficulty, 1 to 3: how well it's hidden.
     clue      What to look for. Point at the content, not the pixel.
     hint      Shown scrambled until the visitor chooses to decode it.
     find      The note inside the cache: one useful thing about that page.
     at, u, v  Where it hides: a CSS selector, then a spot on that element
               from 0 to 1 (u across, v down). dx / dy nudge it in pixels.
     within    Optional: a larger element around "at" that the cache may
               move about in (by default it stays inside "at" itself).
   A cache never covers words, links, buttons or pictures: at every screen
   size it takes the clear spot nearest the one asked for, so aim it at a
   spot with some room around it and it will find its own way on a phone.
   If a selector stops matching after a redesign, that cache just doesn't
   appear; the rest of the hunt keeps working.
   ========================================================================== */
window.HUNT_CACHES = [
  {
    id: "start", page: "index.html", key: "index", pageName: "Home",
    name: "The starting point", level: 1,
    clue: "Every hunt starts somewhere. Look where this site offers you four ways in.",
    hint: "On the home page, just below the four doors, beside the line about sending a message.",
    find: "Every page on this site sits behind one of those four doors, and so do the other seven caches.",
    at: "#start-here .sh-fallback", within: "#start-here", u: 1, v: 0.5, dx: 44
  },
  {
    id: "offer", page: "work-with-me.html", key: "work-with-me", pageName: "Work With Me",
    name: "The offer", level: 2,
    clue: "Organisations book their first conversation with me here, and it costs nothing.",
    hint: "Look beside the discovery-call form.",
    find: "The first discovery call is free, and every engagement has its scope and fee agreed up front.",
    at: "#discovery", u: 0.95, v: 0.1
  },
  {
    id: "stage", page: "speaking.html", key: "speaking", pageName: "Speaking",
    name: "The stage", level: 2,
    clue: "One of my talks argues that win-win is usually the wrong answer. Find it.",
    hint: "It's the third signature talk.",
    find: "Organising an event? The speaker kit on this page has short, medium and long bios, an MC introduction, headshots and a one-page PDF.",
    at: "#talk-03", u: 0.93, v: 0.64
  },
  {
    id: "lab", page: "workshops.html", key: "workshops", pageName: "Workshops",
    name: "The lab", level: 2,
    clue: "In one of my workshops, teams break into a shop on purpose.",
    hint: "Find the web-security lab.",
    find: "The SwiftShop lab is a deliberately insecure shop with twenty vulnerabilities to find.",
    at: "#security-lab", u: 0.9, v: 0.12
  },
  {
    id: "proof", page: "case-studies.html", key: "case-studies", pageName: "Case Studies",
    name: "The proof", level: 2,
    clue: "Three studies, 128 participants and an industry partner from Japan.",
    hint: "It's the first case study, on multiplayer AR research.",
    find: "That research with Sony Interactive Entertainment ran three studies with 128 participants.",
    at: "#sony-multiplayer-ar", u: 0.96, v: 0.08
  },
  {
    id: "rules", page: "playbook.html", key: "playbook", pageName: "the Playbook",
    name: "The rules", level: 2,
    clue: "Twelve questions to ask before you build a location-based AR experience.",
    hint: "Find the checklist.",
    find: "The playbook is free and citable, with a printable PDF.",
    at: "#checklist", u: 0.95, v: 0.12
  },
  {
    id: "classroom", page: "lessons.html", key: "lessons", pageName: "Lessons",
    name: "The classroom", level: 1,
    clue: "Watch a team of six build a parcel drone, one Sprint at a time.",
    hint: "Find the 3D Scrum studio.",
    find: "All 40 lessons run free in the browser, with no sign-up.",
    at: "#scrum-studio", u: 0.94, v: 0.08
  },
  {
    id: "archive", page: "research.html", key: "research", pageName: "Research",
    name: "The archive", level: 3,
    clue: "The oldest paper on my list was written in Moratuwa. Go back that far.",
    hint: "Scroll to the last entry in the publication index, from 2015.",
    find: "That 2015 paper was a mobile augmented reality app to help children learn Sinhala.",
    at: "#publications .pub-row:last-of-type", u: 0.97, v: 0.5
  }
];
