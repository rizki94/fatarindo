module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'body': [
        'Inter', 
        'ui-sans-serif', 
        'system-ui',
      ],
      'sans': [
        'Inter', 
        'ui-sans-serif', 
        'system-ui',
      ]
    },
    extend: {
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)'
      },
      textColor: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)'
      },
      colors: {
        border: 'var(--color-border)',
        buttonPrimary: 'var(--color-buttonPrimary)'
      },
      width: {
        'pricetag': '10cm',
        '128': '9.5in',
      },
      height: {
        '128': '11in',
        'pricetag': '4cm',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
