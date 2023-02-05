/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      display: ['group-hover'],
      visibility: ['group-hover'],
      screens: {
        sm: { max: '576px' },
        // => @media (min-width: 576px) { ... }

        md: { max: '960px' },
        // => @media (min-width: 960px) { ... }

        lg: { max: '1024px' },
        // => @media (min-width: 1440px) { ... }
      },
    },
  },
  plugins: [],
};
