import type { Metadata, Viewport } from 'next';
import { Anton, Instrument_Sans, Instrument_Serif } from 'next/font/google';
import './globals.css';

const display = Anton({ weight: '400', subsets: ['latin'], variable: '--font-display', display: 'swap' });
const serif = Instrument_Serif({ weight: '400', style: ['normal', 'italic'], subsets: ['latin'], variable: '--font-serif', display: 'swap' });
const sans = Instrument_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  title: 'SEO, AEO & GEO | Kola Communications',
  description:
    'Search is evolving rapidly. We optimize your digital presence not only for traditional search engines like Google and Bing, but also for generative AI answer engines (ChatGPT, Perplexity, Google Gemini).',
  icons: {
    icon: '/icon.svg',
    shortcut: '/favicon.ico',
    apple: '/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#F3EFE4',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${sans.variable}`}>
      <body>
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
          href="#main"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
