import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#141414',
        paper: '#F3F0E8',
        sand: '#EAE6DB',
        line: '#D6D1C4',
        orange: '#FF5A36',
        muted: '#6B6860',
      },
      fontFamily: {
        sans: ['var(--font-kola)', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'],
        display: ['var(--font-kola)', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      boxShadow: {
        soft: 'none',
        float: 'none',
      },
    },
  },
  plugins: [],
};

export default config;
