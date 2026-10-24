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
        ink: 'var(--ink)',
        green: {
          DEFAULT: 'var(--green)',
          hover: '#335345',
        },
        muted: 'var(--muted)',
        paper: 'var(--paper)',
        wash: 'var(--wash)',
        sage: 'var(--sage)',
        line: 'var(--line)',
        mint: 'var(--mint)',
      },
      fontFamily: {
        sans: [
          'Kola Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      maxWidth: {
        maxWrap: 'var(--max)',
      },
    },
  },
  plugins: [],
};

export default config;
