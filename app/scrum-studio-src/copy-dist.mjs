#!/usr/bin/env node
// Copies the build into assets/scrum-studio/, the path lessons.html loads.
import { copyFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(here, 'dist', 'scrum-studio.js');
const out = path.join(here, '..', '..', 'assets', 'scrum-studio', 'scrum-studio.js');
if (!existsSync(src)) throw new Error('No dist/scrum-studio.js — did the build fail?');
copyFileSync(src, out);
console.log('Copied dist/scrum-studio.js -> assets/scrum-studio/scrum-studio.js');
