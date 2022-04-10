module.exports = {
  purge: [
    './public/index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'spink': '#DC1FFF',
        'wspink': '#e975ff',
        'sgreen': '#13ecab',
      },
    },
  },
}