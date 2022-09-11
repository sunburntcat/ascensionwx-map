module.exports = {
  content: [
    "./pages/**/*.{js,jsx}", 
    "./components/**/*.{js,jsx}",
    // './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    color:{
      magenta: {
        300: '#C416EC',
        400: 'B301D4',
        600: '#8C01AA',
        900: '#670A86',
      },
    },
    extend: {},
  },
  plugins: [
    //require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tw-elements/dist/plugin')
  ],
}
