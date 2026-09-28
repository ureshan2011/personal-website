/* ==========================================================================
   AR Mode — content. What appears when someone puts the glasses on.
   Loaded with the engine, only when AR Mode is switched on.

   HOW TO ADD OR EDIT A PIN
   Every page has a list. A pin points at something on that page:
     at      CSS selector of the thing it points at (the first visible match).
     u, v    Where on it, from 0 to 1 (0,0 top-left · 1,1 bottom-right).
             For photos these are coordinates in the WHOLE photo, before any
             cropping, so the pin stays on the object however the photo is cut.
     kicker  Small label on the card.       title  The card's headline.
     text    One or two short lines.        href, link  Optional link + text.
     label   Text on the closed pin (defaults to the title).
     side    "left" or "right": which side the card opens on wide screens.
     open    false = stays closed until someone taps it (use for field notes).
     compact true  = always a small pin that opens on tap (busy or small photos).
     tone    "dark" for a dark card.        dx, dy  Nudge in pixels.
   Other kinds of entry:
     { chip: "…", at: "img…" }        Custom readout on a photo's brackets.
     { surface: "…", at, u, v }       A "surface detected" ellipse.
     { crystal: "<id>", at, u, v }    One of the six hidden crystals.
   If a selector stops matching after a redesign, that entry is skipped.

   FIELD NOTES
   The best AR notes are short behind-the-scenes stories only you can tell:
   what the photo doesn't show, what nearly went wrong, why a study was
   designed the way it was. The ones here are built only from facts already on
   this site; swap in your own stories whenever you like (a sentence or two).
   ========================================================================== */
window.AR_NOTES = {

  /* The six crystals hide on the pages the main menu doesn't show. */
  crystals: [
    { id: "speaking",  key: "speaking",     page: "speaking.html",     label: "Speaking",     hint: "Where talks and keynotes get booked" },
    { id: "workshops", key: "workshops",    page: "workshops.html",    label: "Workshops",    hint: "Where teams come to learn by doing" },
    { id: "cases",     key: "case-studies", page: "case-studies.html", label: "Case studies", hint: "Where the work is written up" },
    { id: "media",     key: "media",        page: "media.html",        label: "Media",        hint: "Where journalists come for a quote" },
    { id: "playbook",  key: "playbook",     page: "playbook.html",     label: "Playbook",     hint: "Inside the free AR design rules" },
    { id: "lessons",   key: "lessons",      page: "lessons.html",      label: "Lessons",      hint: "Where the free lessons live" }
  ],

  pages: {

    "index": [
      { chip: "43.53°S 172.63°E", at: "img.hero-portrait" },
      { at: "img.hero-portrait", u: 0.33, v: 0.52, side: "right",
        label: "Now", kicker: "Now",
        title: "Postdoctoral Researcher, HIT Lab NZ",
        text: "Also Senior Lecturer at Yoobee College and founder of ICT Campus.",
        href: "about.html", link: "My story" },
      { at: "img.hero-portrait", u: 0.3, v: 0.76, side: "right", tone: "dark", dynamic: "next-event",
        label: "Next stop", kicker: "Next stop", link: "Details" },
      { at: ".hero-byline", u: 1, v: 0.5, dx: 26, open: false,
        label: "What is this?", kicker: "You’re in AR Mode",
        title: "This is how AR sees a room",
        text: "Things get tracked and information is pinned to them. Six crystals hide across the site; find them all to unseal my holo research cards." },

      { at: "#start-here .sh-head .eyebrow", u: 1, v: 0.5, dx: 26, open: false,
        label: "Crystal hunt", kicker: "Crystal hunt",
        title: "Six crystals hide behind these doors",
        text: "One on each page the menu doesn’t show: Speaking, Workshops, Case Studies, Media, the Playbook and Lessons." },
      { at: 'img[src*="door-organisations"]', u: 0.5, v: 0.38, compact: true,
        label: "Eye-tracking glasses", kicker: "In the photo",
        title: "AR eye-tracking glasses",
        text: "They record where the wearer is looking." },
      { at: 'img[src*="door-speaking-uc-lecture"]', u: 0.44, v: 0.5, compact: true,
        label: "On stage", kicker: "On stage",
        title: "Presenting multiplayer AR research",
        text: "To a full lecture theatre at the University of Canterbury." },
      { at: 'img[src*="door-students-graduation"]', u: 0.4, v: 0.62, compact: true,
        label: "Graduation day", kicker: "PhD",
        title: "Human Interface Technology, University of Canterbury",
        text: "Fully funded by the Applied Immersive Gaming Initiative (AIGI) scholarship." },
      { at: 'img[src*="door-research-certificate"]', u: 0.52, v: 0.7, compact: true,
        label: "The thesis", kicker: "The thesis",
        title: "Multiplayer location-based AR games that connect remote players and places",
        text: "3 studies · 128 participants · 5 peer-reviewed articles",
        href: "research.html", link: "Read the research" },

      { at: 'img[src*="intro-graduation-banners"]', u: 0.5, v: 0.55, open: false,
        label: "Field note", kicker: "Field note",
        title: "From Moratuwa to Christchurch",
        text: "IT at the University of Moratuwa, an AR start-up under MIT Global Startup Labs, then a PhD at HIT Lab NZ.",
        href: "about.html", link: "The full story" },
      { at: 'img[src*="study-nz-uc-sign"]', u: 0.5, v: 0.6, compact: true,
        label: "University of Canterbury", kicker: "Where I did my PhD",
        title: "University of Canterbury, Christchurch",
        text: "Thinking of a master’s or PhD here? The form next to this photo reaches me directly." },
      { at: 'img[src*="yasas-ar-glasses"]', u: 0.2, v: 0.62, side: "right",
        label: "On the tablet", kicker: "On the tablet",
        title: "A location-based AR scene",
        text: "Game content anchored to a real place: the thread through all my research." },
      { at: 'img[src*="yasas-ar-glasses"]', u: 0.64, v: 0.25, open: false,
        label: "Eye-tracking glasses", kicker: "Wearing",
        title: "AR eye-tracking glasses",
        text: "They record where the wearer is looking." }
    ],

    "about": [
      { at: 'img[src*="yasas-sri-wickramasinghe-headshot"]', u: 0.5, v: 0.74, side: "right",
        label: "From", kicker: "From",
        title: "Sri Lanka to Aotearoa New Zealand",
        text: "University of Moratuwa, 99X and an MIT Global Startup Labs start-up, then a PhD at HIT Lab NZ." },
      { at: 'img[src*="about-graduation-quad"]', u: 0.47, v: 0.58, compact: true,
        label: "Graduation day", kicker: "Christchurch",
        title: "PhD graduation day",
        text: "Walking across a stone quadrangle in Christchurch." }
    ],

    "research": [
      { at: 'img[src*="phd-certificate-arch"]', u: 0.52, v: 0.71, side: "right",
        label: "The certificate", kicker: "Supervised by",
        title: "Prof. Stephan Lukosch, A/Prof. Heide Lukosch and James Everett",
        text: "PhD in Human Interface Technology, HIT Lab NZ, University of Canterbury." },
      { at: 'img[src*="ar-view-modes"]', u: 0.24, v: 0.4, compact: true,
        label: "Window", kicker: "Study 01 · Window",
        title: "Like the remote place extending into your own",
        text: "Frames the remote room as a portal players walk toward." },
      { at: 'img[src*="ar-view-modes"]', u: 0.51, v: 0.34, compact: true,
        label: "Overlay", kicker: "Study 01 · Overlay",
        title: "The strongest sense of “being there”",
        text: "Extends the remote room directly into the player’s own space." },
      { at: 'img[src*="ar-view-modes"]', u: 0.79, v: 0.5, compact: true,
        label: "Tabletop", kicker: "Study 01 · Tabletop",
        title: "A detached, strategic overview",
        text: "Shrinks the remote room to a miniature." },
      { at: 'img[src*="research-trust-ar"]', u: 0.5, v: 0.45, compact: true,
        label: "36 participants", kicker: "ACM SUI 2024",
        title: "Trust in shared AR",
        text: "How design choices shape trust when people exchange virtual items." },
      { at: 'img[src*="research-ar-map"]', u: 0.5, v: 0.5, compact: true,
        label: "128 participants", kicker: "The PhD in numbers",
        title: "3 studies · 128 participants",
        text: "30 in Study 01, 60 in Study 02 and 38 in Study 03." }
    ],

    "teaching": [
      { at: 'img[src*="photography_img7"]', u: 0.5, v: 0.5, side: "left",
        label: "Yoobee College", kicker: "Yoobee College",
        title: "Master of Business Informatics",
        text: "I teach MBI800, MBI802, MBI804 and MBI806B.",
        href: "lessons.html", link: "Try the lessons" }
    ],

    "speaking": [
      { at: 'img[src*="nzgdc-2023-lidar-talk"]', u: 0.62, v: 0.3, side: "left",
        label: "NZGDC 2023", kicker: "NZGDC 2023",
        title: "Creating Sharable Spaces with Lidar",
        text: "On stage at the New Zealand Game Developers Conference." },
      { at: 'img[src*="falling-walls-talk"]', u: 0.5, v: 0.5, compact: true,
        label: "Falling Walls Lab", kicker: "2024",
        title: "Falling Walls Lab Aotearoa New Zealand",
        text: "One of nineteen participants in the 2024 cohort." },
      { crystal: "speaking", at: "#talk-03", u: 0.93, v: 0.64 }
    ],

    "workshops": [
      { at: 'img[src*="security-lab-640"]', u: 0.5, v: 0.5, compact: true,
        label: "Security lab", kicker: "Workshop",
        title: "The web-security lab",
        text: "A deliberately insecure shop with twenty vulnerabilities to find." },
      { crystal: "workshops", at: "#ar-no-headset", u: 0.92, v: 0.12 }
    ],

    "case-studies": [
      { at: 'img[src*="fig2-ar-display-modes"]', u: 0.22, v: 0.45, compact: true,
        label: "Window", kicker: "Window",
        title: "A portal players walk toward",
        text: "It felt like the remote place extending into your own." },
      { at: 'img[src*="fig2-ar-display-modes"]', u: 0.5, v: 0.38, compact: true,
        label: "Overlay", kicker: "Overlay",
        title: "The remote room at full scale",
        text: "The strongest sense of “being there” in Study 01." },
      { at: 'img[src*="fig2-ar-display-modes"]', u: 0.8, v: 0.56, compact: true,
        label: "Tabletop", kicker: "Tabletop",
        title: "A miniature on the grass",
        text: "A detached, strategic overview." },
      { surface: "Surface detected", at: 'img[src*="fig2-ar-display-modes"]', u: 0.84, v: 0.87 },
      { at: 'img[src*="scrum-studio-1280"]', u: 0.5, v: 0.5, compact: true,
        label: "3D Scrum studio", kicker: "MBI804",
        title: "The 3D Scrum studio",
        text: "A Scrum team, a product backlog wall and a timeline of three Sprints." },
      { crystal: "cases", at: "#ict-campus", u: 0.95, v: 0.12 }
    ],

    "media": [
      { at: 'img[src*="nzgdc-2023-lidar-talk"]', u: 0.62, v: 0.3, compact: true,
        label: "NZGDC 2023", kicker: "On stage",
        title: "Creating Sharable Spaces with Lidar",
        text: "New Zealand Game Developers Conference, 2023." },
      { crystal: "media", at: "#press-kit", u: 0.95, v: 0.1 }
    ],

    "playbook": [
      { at: 'img[src*="fig2-ar-display-modes"]', u: 0.22, v: 0.45, compact: true,
        label: "Window", kicker: "Window",
        title: "A portal players walk toward",
        text: "Good for sharing resources between locations." },
      { at: 'img[src*="fig2-ar-display-modes"]', u: 0.5, v: 0.38, compact: true,
        label: "Overlay", kicker: "Overlay",
        title: "Real-world scale",
        text: "Prioritise it when spatial presence matters most." },
      { at: 'img[src*="fig2-ar-display-modes"]', u: 0.8, v: 0.56, compact: true,
        label: "Tabletop", kicker: "Tabletop",
        title: "A detached miniature",
        text: "An overview for strategy rather than presence." },
      { crystal: "playbook", at: "#checklist", u: 0.95, v: 0.12 }
    ],

    "lessons": [
      { at: 'img[src*="scrum-studio-1280"]', u: 0.5, v: 0.45, side: "right",
        label: "3D Scrum studio", kicker: "MBI804 · IT Project Management",
        title: "The 3D Scrum studio",
        text: "A team of six builds a parcel drone across three Sprints. It runs right on this page." },
      { crystal: "lessons", at: "#signature", u: 0.92, v: 0.03, dy: 30 }
    ],

    "products": [
      { at: 'img[src*="housescout-dashboard"]', u: 0.5, v: 0.3, compact: true,
        label: "HouseScout", kicker: "Built with Python",
        title: "HouseScout",
        text: "A buying dashboard for Christchurch home buyers, with a private local AI assistant (Gemma)." },
      { at: 'img[src*="pathfinder-programmes"]', u: 0.5, v: 0.3, compact: true,
        label: "PathFinder", kicker: "Runs in the browser",
        title: "PathFinder",
        text: "1,716 NZQF level 8 and 9 qualifications from 51 providers, searchable in one place." }
    ],

    "nzgdc": [
      { at: 'img[src*="fig5-resource-collection"]', u: 0.5, v: 0.5, compact: true,
        label: "Game 1", kicker: "Game 1",
        title: "Collect grass, wood and clouds",
        text: "With a window into your partner’s room at the side." }
    ],

    "ar": [
      { at: 'img[src*="meshing-poster"]', u: 0.5, v: 0.55, compact: true,
        label: "Scene meshing", kicker: "Niantic Lightship",
        title: "Scene meshing", text: "The phone builds a live 3D mesh of the room." },
      { at: 'img[src*="segmentation-poster"]', u: 0.5, v: 0.22, compact: true,
        label: "Segmentation", kicker: "Niantic Lightship",
        title: "Semantic segmentation", text: "The system recognises the sky and recolours it." },
      { at: 'img[src*="location-poster"]', u: 0.5, v: 0.6, compact: true,
        label: "Location-based AR", kicker: "Niantic Lightship",
        title: "Location-based AR", text: "A character and collectibles placed along a real walkway." },
      { at: 'img[src*="sharedar-poster"]', u: 0.5, v: 0.5, compact: true,
        label: "Shared AR", kicker: "Niantic Lightship",
        title: "Shared AR", text: "Two phones see the same virtual chair in the same spot." }
    ],

    "news": [
      { at: 'img[src*="tohoku-visit-1"]', u: 0.5, v: 0.5, compact: true,
        label: "Tohoku University", kicker: "Research visit",
        title: "Interactive Content Design Lab, RIEC",
        text: "Tohoku University, Japan: a collaboration visit with HIT Lab NZ researchers." }
    ],

    "contact": [
      { at: 'img[src*="campus.jpg"]', u: 0.5, v: 0.5, compact: true,
        label: "Christchurch", kicker: "Based in",
        title: "Christchurch, New Zealand",
        text: "Talks online worldwide, and in person across New Zealand." }
    ],

    "blogs": [
      { at: 'img[src*="bookimg"]', u: 0.5, v: 0.5, compact: true,
        label: "The book", kicker: "The Collaboration Reflex",
        title: "Why the “right” answer to conflict is usually wrong",
        text: "My book on why our instinct to collaborate is so often the wrong answer." }
    ]
  }
};
