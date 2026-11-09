import type { Metadata, Viewport } from 'next';
import { Archivo } from 'next/font/google';
import './globals.css';

const sans = Archivo({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-kola',
  display: 'swap',
});

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
  themeColor: '#F3F0E8',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sans.variable}>
      <head>
        {/* Lets CSS hide reveal targets only when JS can bring them back */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
          href="#main"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
