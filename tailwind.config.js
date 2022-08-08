const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    fontFamily: {
      sans: [
        'Inter',
        'Roboto',
        'system-ui',
        '-apple-system',
        ...defaultTheme.fontFamily.sans,
      ],
    },
    screens: {
      xs: '480px',
      ...defaultTheme.screens,
      '3xl': '1920px',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    /* eslint @typescript-eslint/no-var-requires: "off" */
    require('@tailwindcss/typography')(),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
