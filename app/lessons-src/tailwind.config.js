/** @type {import('tailwindcss').Config} */
export default {
  // Scoped so these utilities can never leak onto the rest of the
  // (non-Tailwind) static site — every lesson's outermost element carries
  // .lessons-root, and Tailwind only "wins" inside it.
  important: '.lessons-root',
  content: ['./src/**/*.{ts,tsx}'],
  // Preflight is a global, unscoped reset (`* { box-sizing: border-box }`,
  // `body { margin: 0 }`, ...) — `important` can't scope it, so it's
  // disabled outright to guarantee lessons.css can never affect the rest
  // of the (non-Tailwind) static site even if the <link> tag is ever left
  // in the document after navigating away from a lesson route.
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
    },
  },
  plugins: [],
};
