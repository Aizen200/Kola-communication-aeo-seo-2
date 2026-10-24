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
        // Hex values (mirroring :root in globals.css) so opacity modifiers like bg-sage/50 work
        ink: '#202824',
        green: {
          DEFAULT: '#203c32',
          hover: '#335345',
        },
        muted: '#65706a',
        paper: '#ffffff',
        wash: '#f5f7f3',
        sage: '#e8eee5',
        line: {
          DEFAULT: '#e6ede4',
          subtle: '#edf3eb',
        },
        mint: '#dcebcf',
      },
      fontFamily: {
        sans: [
          'var(--font-kola-sans)',
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
