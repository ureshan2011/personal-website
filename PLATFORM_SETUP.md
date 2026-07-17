# Academic Platform — Setup Guide

The interactive platform lives at **`/app/`** (e.g. `https://www.yasassri.me/app/`).
It is a fully static single-page app — it deploys with the rest of the site on
**GitHub Pages** with zero build step — and stores its data in **Firebase
(Firestore + Authentication)**.

Until Firebase is connected, the platform runs in **preview mode**: every page
renders, but forms, sign-in and the forum are disabled with a visible notice.

## What's included

| Feature | Route | Data |
|---|---|---|
| Platform hub | `app/#/` | — |
| Free consultation booking (4 types, intake form, up to 3 preferred times, status tracking, cancel) | `app/#/consult` | `consultations` |
| Speaker page + invitation form (topics catalogue, engagements, event/logistics intake) | `app/#/invite` | `invitations` |
| Blog (Markdown articles, categories, tags, reading time, "discuss in forum") | `app/#/blog` | `posts` |
| Newsletter signup (segments, CSV export for any email tool) | `app/#/newsletter` | `subscribers` |
| Community forum (8 seeded categories, threads/replies, reports, pin/lock/hide) | `app/#/forum` | `threads` + `replies` |
| Book — gated download via Firebase Storage, logged per reader | `app/#/book` | `bookDownloads` + Storage |
| Sign in (Google or email+password with email verification) | `app/#/account` | `profiles` |
| Admin dashboard (queues, blog editor, subscribers, moderation, book downloads) | `app/#/admin` | all of the above |

## One-time setup (~15 minutes)

### 1. Create the Firebase project

1. Go to <https://console.firebase.google.com> → **Add project** (e.g. `yasassri-platform`).
   Google Analytics optional. The free **Spark plan** is enough.
2. In the project, click the **Web** (`</>`) icon → register an app (name: `platform`).
   Copy the `firebaseConfig` object it shows you.

### 2. Paste the config into the site

Open [`app/js/firebase-config.js`](app/js/firebase-config.js) and replace the
`PASTE_…` placeholders with the values from step 1. Commit and push — that file
is public by design (Firebase web config is not a secret; security comes from
the rules in step 4).

### 3. Enable Authentication

Firebase console → **Build → Authentication → Get started**:

1. Enable **Email/Password**.
2. Enable **Google**.
3. Under **Settings → Authorized domains**, add `www.yasassri.me` and
   `yasassri.me` (and your `*.github.io` domain if you use it).

### 4. Create Firestore + deploy the security rules

1. **Build → Firestore Database → Create database** → production mode →
   region `australia-southeast1` (closest to NZ).
2. Open the **Rules** tab, paste the entire contents of
   [`firestore.rules`](firestore.rules) from this repository, and **Publish**.

> ⚠️ The admin email is hard-coded in two places and must match:
> `firestore.rules` (`isAdmin()` function) and `app/js/firebase-config.js`
> (`window.PLATFORM_ADMINS`). Both are currently set to
> `yasassriofficial@gmail.com`.

### 5. Enable Storage + deploy its rules, then upload the book

The book (`app/#/book`) is gated behind a verified account using **Firebase
Storage** (free on the Spark plan — 5GB storage / 1GB downloaded per day).
The PDF is deliberately **not** in this repository — a file sitting in
`assets/files/` would be publicly fetchable on GitHub Pages regardless of
any app-level gate, which would defeat the whole point. Storage Security
Rules are enforced by Google's servers on every download request, so
there's no shareable link to leak — only a signed-in, verified account can
fetch the bytes, checked fresh each time.

1. Firebase console → **Build → Storage → Get started** (accept the default
   location; production mode).
2. Open the **Rules** tab, paste the entire contents of
   [`storage.rules`](storage.rules) from this repository, and **Publish**.
3. Upload the PDF to the exact path the rules expect —
   `book/The-Collaboration-Reflex-Book.pdf` — one of two ways:
   - **Console (simplest, no credentials needed):** Storage → Files → create
     folder `book` → upload `The-Collaboration-Reflex-Book.pdf` into it.
   - **Script:** `node scripts/upload-book.js /path/to/service-account.json`
     — see the comment at the top of [`scripts/upload-book.js`](scripts/upload-book.js)
     for how to get a service account key. Delete the key file afterwards.

Prefer the CLI for both rule files at once? `firebase deploy --only firestore:rules,storage`
(`firebase.json` and `.firebaserc` in this repo are already set up for it —
just `firebase login` first).

### 6. Sign in as admin

Visit `https://www.yasassri.me/app/#/account`, sign in **with Google** using the
admin email (Google accounts are auto-verified). The nav now shows **Admin ⚙**
and `app/#/admin` unlocks the dashboard.

That's it — no servers, no build pipeline, no billing.

## How day-to-day admin works

- **Consultations** — requests arrive as *pending*. Open *Details*, pick one of
  the requester's proposed times, paste a Meet/Teams/Zoom link and **Approve**
  (the requester sees the confirmed time + link on their "My requests" list),
  or **Decline** with a courteous templated reason. Mark *completed* afterwards.
- **Invitations** — Accept / Discussing / Decline, plus a one-click
  `mailto:` reply to the organizer.
- **Blog** — write articles in Markdown (headings, bold, links, code blocks,
  lists, quotes, images by URL). Save as draft or publish; slug, reading time
  and cards are automatic. Each article gets a "Discuss in the Forum" button.
- **Subscribers** — export a CSV any time and import it into Mailchimp,
  Buttondown, Brevo, etc. to send the actual campaigns.
- **Moderation** — reported threads queue; pin/lock/hide controls on every
  thread; delete replies inline.

## Anti-abuse measures built in

- Consultation requests and forum posting require a **verified email**
  (Google sign-in counts as verified).
- Per-account limit of **2 open consultation requests**.
- **Honeypot** fields on all public forms, validated again in Firestore rules.
- Field-length validation enforced server-side by the rules.
- Announcements category is admin-post-only; owners can only *cancel* their own
  requests, never edit status.

## Known v1 limitations (by design — no server)

GitHub Pages has no backend, so anything that *sends email* needs an external
trigger. Recommended free/cheap upgrades when you want them:

| Want | Add |
|---|---|
| Email notifications on new requests | Firebase **Trigger Email** extension, or a Zapier/Make watch on Firestore |
| Calendar invites (ICS) + reminders | Create the Google Calendar event when approving (its invite email covers both) |
| Newsletter sending + double opt-in | Import CSV into Buttondown/Mailchimp — keep the platform as the signup source of truth |
| File attachments on requests | Firebase Storage (add rules first) |
| Verified-student flag / student-only categories enforced server-side | Firebase custom claims via a small Cloud Function |

The data model already matches the full specification, so none of these
upgrades require restructuring.
