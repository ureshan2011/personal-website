/* Shared by sync-blended-lessons.mjs and build-lesson-pages.mjs. */

/* Each course keeps the hue it has on the lessons site (src/styles/blend.css)
   so a reader crossing between the two sites never sees a course change
   colour. `on` is the 300 step, for text and dots on the dark surfaces. */
export const ACCENTS = {
  planning: { c: '#514ca8', soft: '#eeeefb', on: '#a9a6ec' },
  default: { c: '#f4551e', soft: '#fff1ea', on: '#ff9a6b' },
  project: { c: '#ab355c', soft: '#fceef2', on: '#e889a6' },
  analytics: { c: '#0f766e', soft: '#eaf7f4', on: '#5fcfbd' },
  shared: { c: '#2f6bff', soft: '#e9f0ff', on: '#8fb0ff' },
};

export const accentVars = (a) => {
  const x = ACCENTS[a] || ACCENTS.shared;
  return `--c:${x.c};--c-soft:${x.soft};--c-on:${x.on}`;
};
