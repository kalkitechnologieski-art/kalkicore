import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { ServiceWorkerRegistration } from '@/components/providers/ServiceWorkerRegistration';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SupportWidget } from '@/components/features/SupportWidget';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const metadata: Metadata = {
  title: 'KALKI INTELLIGENCE – Temple of Technology',
  description: 'Open‑source private AI, WebLLM, digital marketing, SEO, and distributed intelligence.',
  metadataBase: new URL('https://kalki.tech'),
  alternates: { languages: { en: '/', hi: '/hi' } },
  openGraph: {
    title: 'KALKI INTELLIGENCE – Temple of Technology',
    description: 'Open‑source private AI, WebLLM, digital marketing, SEO, and distributed intelligence.',
    url: 'https://kalki.tech',
    siteName: 'KALKI INTELLIGENCE',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KALKI INTELLIGENCE – Temple of Technology',
    description: 'Open‑source private AI, WebLLM, digital marketing, SEO, and distributed intelligence.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: { google: 'mXzGHeQy9yGNuw8JTuzgXdDUn-gUcj4C65Jt83rcK9A' },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body>
        <ThemeProvider>
          <QueryProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            {/* SupportWidget is placed AFTER Footer, but uses fixed positioning */}
            <SupportWidget />
            <ServiceWorkerRegistration />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
