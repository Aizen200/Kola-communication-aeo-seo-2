import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#121212',
        paper: '#F3EFE4',
        sand: '#E8E2D2',
        orange: '#FF5A2C',
        forest: '#0F3D2E',
        muted: '#55524A',
      },
      fontFamily: {
        sans: ['var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'],
        display: ['var(--font-display)', 'Impact', '"Arial Narrow"', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      boxShadow: {
        hard: '8px 8px 0 0 #121212',
        'hard-sm': '5px 5px 0 0 #121212',
        'hard-orange': '8px 8px 0 0 #FF5A2C',
        'hard-paper': '8px 8px 0 0 #F3EFE4',
      },
    },
  },
  plugins: [],
};

export default config;
