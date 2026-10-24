import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const kolaSans = localFont({
  src: [
    {
      path: './fonts/KolaSans-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/KolaSans-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-kola-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kola Communications · Search & AI Visibility',
  description:
    'SEO, AEO & GEO by Kola Communications, Mumbai. Own search rankings across Google and AI search engines like ChatGPT, Perplexity and Google Gemini.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/favicon.ico',
    apple: '/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#203C32',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={kolaSans.variable}>
      <body className="font-sans text-ink bg-paper antialiased">
        <a className="skip" href="#main">
          Skip to content
        </a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
          aria-hidden="true"
        >
          <defs>
            <symbol id="arrow-up" viewBox="0 0 24 24">
              <path
                d="M5 19 19 5M5 5h14v14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </symbol>
            <symbol id="arrow-right" viewBox="0 0 24 24">
              <path
                d="M4 12h15M13 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </symbol>
            <symbol id="search" viewBox="0 0 24 24">
              <circle cx="10.8" cy="10.8" r="6.8" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="m16 16 5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </symbol>
            <symbol id="spark" viewBox="0 0 24 24">
              <path
                d="M12 2c0 6.2-3.8 10-10 10 6.2 0 10 3.8 10 10 0-6.2 3.8-10 10-10-6.2 0-10-3.8-10-10Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </symbol>
            <symbol id="check" viewBox="0 0 24 24">
              <path
                d="m5 12 4 4L19 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </symbol>
            <symbol id="factory" viewBox="0 0 24 24">
              <path
                d="M3 20V9l6 4V9l6 4V4h5v16H3ZM6 16h2m3 0h2m3 0h2M16 4V2h3v2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </symbol>
            <symbol id="building" viewBox="0 0 24 24">
              <path
                d="M5 21V3h14v18M3 21h18M9 7h1m4 0h1m-6 4h1m4 0h1m-6 4h1m4 0h1m-4 6v-3h2v3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </symbol>
            <symbol id="technical" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="1.3" />
              <path
                d="M9 2v4m6-4v4m-6 12v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4M10 10h4v4h-4z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            </symbol>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
