#!/usr/bin/env node
// Copies the Vite lib-mode build output into ../lessons/ — the path the
// live (zero-build) site actually serves as a static asset. Run as the
// last step of `npm run build` (see package.json).
import { readdirSync, copyFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');
const outDir = path.join(__dirname, '..', 'lessons');

mkdirSync(outDir, { recursive: true });

const files = readdirSync(distDir);
const js = files.find(f => f.endsWith('.js'));
const css = files.find(f => f.endsWith('.css'));

if (!js) throw new Error('No .js output found in dist/ — build failed?');
copyFileSync(path.join(distDir, js), path.join(outDir, 'lessons.js'));
console.log(`Copied ${js} -> app/lessons/lessons.js`);

if (css) {
  copyFileSync(path.join(distDir, css), path.join(outDir, 'lessons.css'));
  console.log(`Copied ${css} -> app/lessons/lessons.css`);
} else {
  console.log('No CSS output produced (no Tailwind classes used?) — skipping.');
}
