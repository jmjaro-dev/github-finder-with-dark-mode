module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      darkBG: "#0D1117",
      lightHeader: "#24292E",
      darkHeader: "#161B22",
      lightText: "#24292E",
      darkText: "#C9D1D9",
      lightGray: "#24292e80",
      darkGray: "#c9d1d980",
      darkBtn: "#238636", 
      lightBtn: "#2EA44F",
      lightAccent: "#0366D9",
      darkAccent: "#39A6FF",
      lightDivider: "#24292e4d",
      darkDivider: "#c9d1d94d"
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [ 
    require('@tailwindcss/forms'),
  ],
}