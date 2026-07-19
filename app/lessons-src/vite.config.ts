import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Dev-only build tool. Output is committed as a static asset at
// ../lessons/lessons.js + lessons.css — the deployed site never runs this
// build itself (see PLATFORM_SETUP.md).
export default defineConfig({
  plugins: [react()],
  // Library-mode builds don't get Vite's usual process.env.NODE_ENV
  // replacement automatically -- without this, React/framer-motion throw
  // "process is not defined" the moment the bundle runs in a browser.
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'Lessons',
      formats: ['iife'],
      fileName: () => 'lessons.js',
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Everything (incl. React) inlined into one self-contained bundle —
        // it's lazy-loaded only when a lessons route is visited.
        inlineDynamicImports: true,
      },
    },
  },
});
