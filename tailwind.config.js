module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    aspectRatio: { 
      'none': 0,
      'square': [1, 1],
      'landscape': [16, 9],
      'portrait': [9, 16]
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}
