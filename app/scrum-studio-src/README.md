# Scrum studio embed

The 3D Scrum studio from MBI804 Lesson 3, built as a single script so it runs
natively on yasassri.me/lessons.html instead of in an iframe.

The six files in `src/scrum/` and `src/scrum-studio.css` are copied from the
thisisnotalms repo (`src/components/public/scrum/` and
`src/styles/scrum-studio.css`, commit 118bc8d). Only three lines differ: the
stylesheet import moved to `main.tsx`, and the scene font and the narration
clips now load from `assets/scrum-studio/` (the clips from
`public/audio/scrum-studio/` are copied to `assets/scrum-studio/audio/`).
`src/tokens.css` is the part of the lessons site's
design tokens the studio reads.

To pick up changes made to the studio on the lessons site, copy those files
and the audio clips across again, then:

    npm install
    npm run build     # writes assets/scrum-studio/scrum-studio.js

The built file is committed; the live site has no build step.
