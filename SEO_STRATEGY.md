# SEO & AI-Chatbot (GEO/AEO) Strategy — yasassri.me + /app/

Audit date: 2026-07-19. Scope: static site (GitHub Pages) + `/app/` SPA (Firebase-backed).

---

## 1. Where the site stands today

Strengths (keep doing these):
- Unique `<title>`, meta description, canonical, Open Graph and Twitter cards on every indexable page.
- JSON-LD on every page — `Person` entity on the homepage, `Event` markup on news, `SoftwareApplication` on products.
- `robots.txt` explicitly allows all major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, etc.).
- `llms.txt` following the llmstxt.org convention with key facts, pages, events, and publications.
- Clean sitemap.xml with lastmod dates; orphaned template demos correctly `noindex`ed.

## 2. Gaps found (ranked by impact)

### G1 — The /app/ SPA is invisible to search engines and AI crawlers (highest impact)
All platform routes use hash routing (`app/#/blog`, `app/#/lessons`, `app/#/invite`).
Crawlers ignore everything after `#`, and blog posts/lessons render client-side from
Firestore — so **none of the blog articles or lesson content can be indexed or cited
by ChatGPT/Claude/Perplexity**. This is the single largest untapped asset: original
educational content (10 interactive lesson decks, blog articles, SQL labs) is
exactly what AI assistants cite.

Fix: generate static HTML snapshots with real URLs.
- Build step (extend `scripts/import-lessons.js` or a new `scripts/build-seo-pages.mjs`)
  that exports each Firestore blog post and each lesson to
  `/app/blog/<slug>.html` and `/app/lessons/<slug>.html` — full text, own
  title/description/canonical, `Article`/`LearningResource` JSON-LD, and a
  "continue in the interactive app" link into the SPA.
- Add these URLs to sitemap.xml.

### G2 — All writing authority flows off-site
`blogs.html` links exclusively to Medium/bitsrc.io/readclub.me. Google and AI models
attribute that expertise to those domains, not yasassri.me.
- New long-form articles: publish on yasassri.me first; syndicate to Medium with
  `rel=canonical` back (Medium supports canonical on import).
- For the strongest existing articles, publish updated/expanded versions on-site.

### G3 — No RSS/Atom feed
Feeds are heavily used by AI crawlers and news surfaces for freshness discovery.
Generate `/feed.xml` (blog + news items) and reference it with
`<link rel="alternate" type="application/rss+xml">` on every page and in llms.txt.

### G4 — Entity graph is incomplete (matters for both Google Knowledge Panel and LLM grounding)
- Add **ORCID** (and DBLP / Semantic Scholar / ResearchGate if available) to the
  `sameAs` array in the Person JSON-LD and to llms.txt "Profiles and links".
- Add `ScholarlyArticle` JSON-LD per publication on research.html (headline,
  authors, DOI as `sameAs`, `isPartOf` venue, datePublished) — this is what lets
  AI assistants attribute the papers to you confidently.
- Add `BreadcrumbList` on every page and a `ProfilePage` type on the homepage
  wrapping the Person.

### G5 — Freshness rot in AI-facing files
llms.txt hardcodes dated events ("CODE with WIE 2026 — 11 July 2026" is already past).
Stale facts in llms.txt actively harm citation trust. Add a monthly review step (or a
small script that flags past-dated lines), and add an `llms-full.txt` containing the
full text of key pages for assistants that fetch it.

### G6 — Indexing/monitoring plumbing
- Verify the site in **Google Search Console** and **Bing Webmaster Tools**
  (Bing powers ChatGPT search and Copilot — it is disproportionately important for
  chatbot visibility) and submit the sitemap in both.
- Adopt **IndexNow** (a static key file works on GitHub Pages) so Bing/others learn
  about updates immediately.

### G7 — Performance & crawl hygiene (moderate)
- Google Fonts loaded render-blocking on every page; self-host with
  `font-display: swap`.
- Two large PDFs (12 MB thesis) at the root — fine, but link them with descriptive
  anchors and consider a `CreativeWork` JSON-LD reference rather than sitemap entries.
- Run Lighthouse/CWV pass: image `loading="lazy"`, explicit width/height,
  preload the LCP image.

## 3. Chatbot SEO (GEO / AEO) playbook — how AI assistants pick sources

AI assistants cite content that is: (a) crawlable as plain HTML, (b) factual and
self-contained per page, (c) consistent across the web, (d) fresh, and (e) hosted on
domains that other authoritative pages corroborate. Concretely for this site:

1. **Answer-shaped content.** Add a short FAQ section (with `FAQPage` JSON-LD) to
   the homepage/contact ("Who is Dr. Yasas Sri Wickramasinghe?", "How do I invite
   him to speak?", "What is HouseScout?"). LLMs lift these verbatim.
2. **One fact, many consistent surfaces.** Name, roles, affiliations must match
   exactly across site, llms.txt, LinkedIn, Google Scholar, ORCID, university pages.
3. **Static text mirrors of app content** (G1) — an AI can only recommend your
   lessons/consultations if the text exists at a fetchable URL.
4. **llms-full.txt + per-page freshness** (G5).
5. **Corroboration links**: get the yasassri.me URL onto your HIT Lab NZ and Yoobee
   staff pages, conference speaker pages (NZGDC), and paper author pages — these are
   the citations LLM search re-ranks by.
6. **Measure it**: check GA4 referrers for `chat.openai.com` / `perplexity.ai` /
   `claude.ai`, and periodically ask each assistant "Who is Yasas Sri
   Wickramasinghe?" / "Best AR researchers in NZ" to track citation share.

## 4. Prioritized roadmap

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 1 | Static HTML snapshots for app blog + lessons (G1) | Very high | Medium |
| 2 | GSC + Bing Webmaster verification, sitemap submit, IndexNow (G6) | High | Low |
| 3 | ORCID + ScholarlyArticle + FAQPage + BreadcrumbList schema (G4) | High | Low |
| 4 | RSS feed + `rel=alternate` links (G3) | High | Low |
| 5 | llms.txt freshness process + llms-full.txt (G5) | High | Low |
| 6 | On-site-first publishing, Medium canonicals (G2) | High | Ongoing |
| 7 | Fonts/CWV/image pass (G7) | Medium | Medium |
| 8 | Off-site corroboration links (§3.5) | High | Manual outreach |

## 5. Multi-agent execution with Claude Code (orchestrated Sonnet subagents)

Run the roadmap as an orchestrated fleet: the main Claude Code session acts as
**orchestrator** (planning, sequencing, merging, final review), delegating each
workstream to a **Sonnet subagent** defined in `.claude/agents/`. Sonnet is the
right tier for these well-scoped implementation tasks — fast and cheap; keep the
orchestrator on the stronger default model.

Agent definitions included in this repo (see `.claude/agents/`):

| Agent | File | Workstream |
|-------|------|-----------|
| `seo-tech-auditor` | seo-tech-auditor.md | Re-audit: crawlability, canonicals, sitemap, robots, redirects |
| `schema-engineer` | schema-engineer.md | All JSON-LD work (G4): ScholarlyArticle, FAQPage, Breadcrumbs, sameAs |
| `content-seo-writer` | content-seo-writer.md | On-page copy, FAQ answers, internal linking, blog snapshots text |
| `ai-visibility-engineer` | ai-visibility-engineer.md | GEO/AEO: llms.txt/llms-full.txt, feed.xml, static app snapshots (G1, G3, G5) |
| `perf-cwv-engineer` | perf-cwv-engineer.md | G7: fonts, images, Lighthouse fixes |
| `seo-verifier` | seo-verifier.md | QA gate: validates every other agent's output before merge |

### Orchestration pattern

```
Orchestrator (main session)
 ├─ Phase 1 (parallel):  seo-tech-auditor  +  schema-engineer  +  ai-visibility-engineer
 ├─ Phase 2 (parallel):  content-seo-writer  +  perf-cwv-engineer   (uses Phase 1 findings)
 ├─ Phase 3 (serial):    seo-verifier  — validates all diffs (schema validator, link check, Lighthouse)
 └─ Phase 4:             orchestrator merges, commits, pushes, opens PR
```

### Orchestrator kickoff prompt (paste into a Claude Code session at repo root)

> You are the SEO orchestrator for this repo. Read SEO_STRATEGY.md. Execute the
> roadmap in section 4 by delegating to the subagents in `.claude/agents/` per the
> phase plan in section 5: launch Phase 1 agents in parallel, wait, feed their
> findings into Phase 2, then run seo-verifier over the combined diff. Do not let
> any agent touch pages outside its workstream. After verification passes, commit
> each workstream as a separate commit with a clear message and push. Items marked
> "Manual outreach" become a checklist in TODO-offsite.md instead of code changes.

Each agent file contains its own scoped handoff prompt, allowed tools, and
acceptance criteria, so handoffs are deterministic: the orchestrator passes only
(a) the gap IDs to fix and (b) the auditor's findings, and receives back a diff
plus a self-report the verifier can check.
