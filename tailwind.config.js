/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      emerald: colors.emerald,
      gray: colors.gray,
      white: '#ffffff',
      btc: '#f7951d',
      btcDark: '#cf7e1b',
      eth: '#686e94',
      ethDark: '#686e94',
      link: '#2a5ada',
      linkDark: '#2a5ada',
      bnb: 'rgb(240,185,11)',
      bnbDark: 'rgb(240,195,11)',
      sol: 'rgb(107,116,224)',
      solDark: 'rgb(107,130,224)',
      maticLight: 'rgb(156,107,239)',
      matic: 'rgb(128,68,222)',
      maticDark: 'rgb(103,56,184)',
      avax: 'rgb(232,65,66)',
      avaxDark: 'rgb(232,79,66)',
    },
    fontFamily: {
      display: ["Cutive Mono", "monospace"],
      body: ["Cutive Mono", "monospace"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}