# Homepage UX audit and hero redesign

Design working files. Nothing here is linked from the live site; every mockup page carries `noindex`.

**Status (28 Sep 2026):** concept C (editorial router) is now live on `index.html`, with scroll and pointer parallax and a PhD seal in place of the "Hi" badge. The "Start here" section is live directly under the marquee. Its thumbnails show Yasas's face in all four doors.
Open the HTML files through a local server (`python3 -m http.server`) so the relative image paths resolve.
Rendered images are in `mockups/renders/`.

| File | What it is |
|---|---|
| `mockups/hero-a-augmented.html` | Hero concept A, "Augmented" (recommended) |
| `mockups/hero-b-distance.html` | Hero concept B, "Across distance" (dark globe) |
| `mockups/hero-c-editorial.html` | Hero concept C, "Editorial router" |
| `mockups/homepage-start-here.html` | New "Start here" section: four audience doors |
| `mockups/homepage-structure.html` | Current vs proposed homepage, drawn to scale |

---

## 1. Major UI/UX issues (most severe first)

**1. The hero doesn't say what you do or who it's for.**
The name is set as pale background text that the portrait covers, so it reads "Y…as Wick…inghe". On a phone it is clipped at the right edge ("Wickramasingh"). The actual pitch sits in a small side card that repeats your name. The three roles are in spaced-out capitals, which are hard to read. On mobile the portrait fills the whole first screen, so there is no button above the fold.

**2. The homepage is very long and has no clear route through it.**
It has 16 sections: 16,570px tall on desktop and 23,125px on mobile (about 27 phone screens). It serves five audiences (organisations, event organisers, students, researchers, press) in no particular order. ICT Campus, which is for Sri Lankan A/L students, comes before your research. A full three-step postgraduate form sits in the middle of the page. A section titled "Work with me, directly" is really about the Platform app.

**3. The navigation hides the pages that bring in work.**
The desktop nav has 9 links plus a CTA, but it doesn't include Speaking, Workshops, Case Studies, Media, the Playbook or Lessons. Those appear only in the footer (Speaking is also in the mobile menu). With 10 items the nav has to collapse into a hamburger below 1140px, so iPads in landscape and small laptops lose it. The mobile menu has 13 numbered items.

**4. It feels like two websites.**
`/app` ("Platform") has its own nav (Main Site, Platform, Book, Consult, Invite Me, Blog, Lessons, Forum, Sign In), and it repeats the static pages: Blog vs Writing, Invite Me vs Speaking, Lessons vs `lessons.html`, and Consult vs Contact vs the Work With Me discovery call. On the homepage, "Read the Blog" goes to `app/#/blog`, while the nav's "Writing" goes to `blogs.html`.

**5. Too many primary buttons.**
The homepage has 15 solid-blue buttons with about 20 different labels (Get in Touch, Explore Research, See My Work, Work With Me, Explore the Platform, Invite Me to Speak, Get the Book…). Nothing stands out as the main action.

**6. The events block takes up too much of the page.**
Upcoming talks plus Just Wrapped is 2,998px, 18% of the page, for six event flyers. Both grids put three cards in two columns, which leaves a gap each time. The social-media flyers are cropped badly as card covers (VRST, NZGDC).

**7. Controls that don't do what they look like.**
Selected Work has ← → carousel arrows, but there's only one item and both arrows just link to `research.html`.

**8. Almost no social proof.**
The testimonials and the "voices" globe are hidden while they wait for consented quotes, but `testimonials.js` and `globe-voices.js` still load. The "150K+" stat is vague on the homepage ("platforms I helped build") but specific on Work With Me ("learners on the MOOC platform I led at the University of Moratuwa"). Use the specific wording everywhere.

**9. Low-contrast text fails accessibility guidelines.**
`--muted: #8a93a3` has a contrast ratio of 3.1:1 on white and 2.86:1 on the grey sections, below the WCAG AA minimum of 4.5:1 for small text. It's used for eyebrows, dates, meta lines and fine print ("Free download · sign in required"), often in 11–12px uppercase. Darkening it to about `#667085` fixes this; the mockups use that value.

**10. Heavy third-party scripts.**
Six Instagram embeds on the homepage load Instagram's script and shift the layout as they load, plus smooth-scroll and parallax scripts from a CDN.

**11. Small friction points.**
- The newsletter form appears twice, and both copies send you into the app instead of confirming on the page.
- "Get the Book" says free, but it requires signing in.
- The unused template pages (`home-agency.html`, `single-portfolio.html`, `index original.html`) and duplicate logo files are still deployed. They're noindexed but still reachable.

**The good news:** the inner pages are much stronger than the homepage. Speaking ("Talks that turn research into something people use."), Work With Me, Media and About all have clear headlines, one main action and a good structure. The homepage should borrow that clarity.

---

## 2. Showing the "hidden" pages without adding complexity

Organise the homepage by **who is visiting**, not by what you do. Put a "Start here" section right under the hero, with four doors:

| Door | Links to | Main action |
|---|---|---|
| For organisations: *Hire a researcher who ships* | Work With Me, Workshops, Case Studies, Products | Book a discovery call |
| For event organisers: *Book a talk or keynote* | **Speaking (speaker profile)**, Speaker kit PDF, Media, Events | Invite me to speak |
| For students: *Learn with me* | Lessons, Yoobee MBI guide, Study in NZ (the form moves here), ICT Campus | Try a lesson |
| For researchers & readers: *Read the research* | Research, AR Playbook, The Collaboration Reflex, Writing | Explore the research |

It uses the site's existing card style: four cards, each with four links and one button. On mobile the images drop out and the cards stack.

Then simplify the rest (see `homepage-structure.html`):

- **Nav:** Research · Teaching · **Speaking** · Products · Writing · About · [Work with me]. That's 7 items instead of 10.
  - Students moves under Teaching.
  - News moves into Speaking (events) and About.
  - Contact becomes the destination of the CTA and the footer.
  - The Platform stops being a separate site. Its features (consult, forum, book, newsletter) become actions on the pages they belong to.
- **Homepage, 16 sections → 9:** Hero, proof bar, Start here, Now (next talk, latest paper, new lessons), 3 case studies, ICT Campus band, free resources (lessons, playbook, book), contact band with the newsletter, FAQ. That's roughly 6,800px instead of 16,500px.
- **Moved to their own pages, not deleted:** the Study-in-NZ form → Students, Instagram → About, In the News and past events → News/Speaking.

---

## 3. Hero concepts

All three concepts:
- say what you do in one line
- have one primary action (**Work with me**) plus one secondary action
- keep a button above the fold on mobile
- use the real site fonts (Newsreader and Inter) and existing photos.

### A. "Augmented" (recommended)
**Headline:** *Designing shared worlds across distance.*
The photo of you in the AR eye-tracking glasses becomes an AR scene. It has tracking brackets, a "surface detected" marker, and cards pinned to points in the photo: your PhD, the Sony-partnered paper, and your next talk. Your credentials are shown in the medium you research, which no generic portfolio template can copy. The headline is the title of your NZGDC talk and the thread running through your research.
Motion: the leader lines draw in, the cards drift slightly with the cursor as if anchored in space, and everything is static when the user prefers reduced motion.

### B. "Across distance" (boldest)
**Headline:** *Making distance feel smaller.*
A dark hero with a dot-matrix globe. Arcs run from Christchurch (your photo as the pin) to Colombo (ICT Campus, 10,760 km away), Tokyo and Sendai (Sony, Tohoku, VRST) and Auckland (NZGDC). A live Christchurch clock and a "Next stops" strip of upcoming talks bring speaking into the hero. It ties your research, your own move from Sri Lanka to NZ, and teaching students 10,760 km away into one idea.

### C. "Editorial router" (safest for conversions)
**Headline:** *I turn research into things people actually use.* (the line already used on Speaking and About)
The pink studio portrait sits in an arched frame. Under the headline, a "What brings you here?" switcher shows the right pitch and buttons for each audience. The mockup shows "Booking a speaker" selected. This puts the audience routing inside the hero itself.

**Recommendation:** use A for the hero and the Start-here section directly below it. If you want the site to feel more like a brand than a portfolio, B is the stronger statement.
