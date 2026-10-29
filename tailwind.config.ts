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
        ink: '#0E0E0E',
        paper: '#F6F5F3',
        sand: '#EEECE8',
        line: '#E2E0DC',
        orange: '#FF5A1F',
        muted: '#62605C',
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
        marquee: 'marquee 32s linear infinite',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(14,14,14,0.04), 0 12px 32px -12px rgba(14,14,14,0.12)',
        float: '0 2px 4px rgba(14,14,14,0.04), 0 40px 80px -24px rgba(14,14,14,0.28)',
      },
    },
  },
  plugins: [],
};

export default config;
