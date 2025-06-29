/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'trust-green': '#205c40',
        'trust-green-dark': '#184b34',
        'note-yellow': '#fff9b1',
        'note-yellow-dark': '#eedc85',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        avenir: ['AvenirLTStdLight', 'Avenir', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        'ping-once': 'pingOnce 0.4s ease-out',
      },
      keyframes: {
        pingOnce: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.4)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            fontFamily: theme('fontFamily.sans').join(', '),
            h1: {
              color: theme('colors.trust-green'),
              fontWeight: '700',
              fontSize: '2rem',
              marginTop: '0',
              marginBottom: '0.7em',
            },
            h2: {
              color: theme('colors.trust-green'),
              fontWeight: '600',
              fontSize: '1.35rem',
              marginTop: '1.2em',
              marginBottom: '0.5em',
            },
            h3: {
              color: theme('colors.trust-green-dark'),
              fontWeight: '600',
              fontSize: '1.15rem',
              marginTop: '1em',
              marginBottom: '0.35em',
            },
            h4: {
              color: theme('colors.trust-green-dark'),
              fontWeight: '500',
              fontSize: '1.05rem',
              marginTop: '0.8em',
              marginBottom: '0.2em',
            },
            a: {
              color: theme('colors.trust-green'),
              textDecoration: 'underline',
              fontWeight: '500',
              '&:hover': { color: theme('colors.trust-green-dark') }
            },
            strong: { color: theme('colors.trust-green-dark') },
            code: {
              backgroundColor: theme('colors.gray.100'),
              color: theme('colors.trust-green-dark'),
              padding: '0.15em 0.4em',
              borderRadius: '0.3em',
              fontWeight: '500',
              fontSize: '0.95em',
            },
            pre: {
              backgroundColor: theme('colors.gray.100'),
              color: theme('colors.gray.800'),
              borderRadius: '0.6em',
              padding: '1em',
            },
            blockquote: {
              borderLeftColor: theme('colors.trust-green'),
              color: theme('colors.gray.700'),
              fontStyle: 'italic',
              backgroundColor: theme('colors.green.50'),
              paddingLeft: '1em',
              marginLeft: '0',
              borderRadius: '0.5em',
            },
            ul: {
              paddingLeft: '1.2em',
              marginTop: '0.3em',
              marginBottom: '0.7em',
            },
            ol: {
              paddingLeft: '1.2em',
              marginTop: '0.3em',
              marginBottom: '0.7em',
            },
            'ul > li::marker': {
              color: theme('colors.trust-green'),
            },
            'ol > li::marker': {
              color: theme('colors.trust-green'),
            },
            hr: {
              borderColor: theme('colors.trust-green'),
              marginTop: '2em',
              marginBottom: '2em',
            },
            table: {
              borderColor: theme('colors.gray.200'),
            },
            th: {
              backgroundColor: theme('colors.trust-green'),
              color: theme('colors.white'),
              fontWeight: '600',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
