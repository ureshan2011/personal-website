import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Dev-only build tool, like ../lessons-src. The output is committed as
// assets/scrum-studio/scrum-studio.js; the live site never runs this build.
// lessons.html loads that file only when the studio is about to scroll into
// view, so three.js costs nothing to anyone who doesn't get that far.
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'ScrumStudioEmbed',
      formats: ['iife'],
      fileName: () => 'scrum-studio.js',
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
