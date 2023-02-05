/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      display: ['group-hover'],
      visibility: ['group-hover'],
      screens: {
        sm: { min: '576px' },
        // => @media (min-width: 576px) { ... }

        md: { min: '960px' },
        // => @media (min-width: 960px) { ... }

        lg: { min: '1024px' },
        // => @media (min-width: 1440px) { ... }
      },
    },
  },
  plugins: [],
};
