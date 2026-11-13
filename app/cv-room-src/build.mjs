// Bundles src/main.js (plus three.js) into one classic script the static page loads:
//   assets/cv-room/cv-room.js
// Run `npm install` once, then `npm run build` (or `npm run watch`). The built file is committed,
// because the site deploys as plain static files with no build step.
import { build, context } from 'esbuild';

const options = {
  entryPoints: ['src/main.js'],
  bundle: true,
  minify: true,
  format: 'iife',
  target: 'es2020',
  outfile: '../../assets/cv-room/cv-room.js',
  legalComments: 'none',
  logLevel: 'info',
};

if (process.argv.includes('--watch')) {
  const ctx = await context(options);
  await ctx.watch();
} else {
  await build(options);
}
