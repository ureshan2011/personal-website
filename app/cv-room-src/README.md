# Find my CV — the hide-and-seek room (`/cv/`)

The interactive CV at https://www.yasassri.me/cv/. A first-person 3D room (three.js) in which
twelve parts of the CV are hidden the way players in the AR hide-and-seek studies hid things.

## Where things live

| Path | What |
| --- | --- |
| `cv/index.html` | The page: room overlay markup, plus the complete CV as plain HTML |
| `assets/cv-room/cv-room.css` | Styles for the overlay and the plain CV |
| `assets/cv-room/cv-room.js` | **Built** bundle (three.js + the code here). Committed; do not edit by hand |
| `assets/cv-room/models/`, `textures/` | CC0 furniture, surfaces and night sky from Poly Haven (see `assets/cv-room/CREDITS.md`) |
| `assets/cv-room/instagram/`, `content/cv-room/instagram.json` | The photo wall. See `content/cv-room/README.md` |
| `app/cv-room-src/src/` | Source: `main.js` (renderer, controls, loop), `world.js` (room, furniture, lights, photo wall), `torch.js`, `game.js` (rules), `ui.js`, `data.js` (the twelve items) |

## Build

```
cd app/cv-room-src
npm install
npm run build      # writes ../../assets/cv-room/cv-room.js
```

Preview with any static server from the repo root (`python3 -m http.server`) and open `/cv/`.

## Updating the CV

The CV text exists in three places that must agree: `assets/files/cv_yasas.pdf`, the plain CV in
`cv/index.html`, and the twelve hidden items in `src/data.js` (rebuild after editing).

## Useful URL switches

- `/cv/?q=low`, `?q=medium`, `?q=high` force a quality tier (otherwise chosen by device and
  stepped down automatically if frames are slow).
- In the console, `__cvroom` exposes the scene, the game state and a `sim(seconds)` helper.

## Behaviour notes

- Without JavaScript or WebGL the room stays hidden and the plain CV is the page.
- "Lights" (button, the wall switch by the door, or the `L` key) ends the hunt at any time and
  reveals everything; nobody is locked out of the CV.
- The page stops rendering when the room is scrolled off screen or the tab is hidden.
