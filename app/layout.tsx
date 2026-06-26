import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { ServiceWorkerRegistration } from '@/components/providers/ServiceWorkerRegistration';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SupportWidget } from '@/components/features/SupportWidget';
import StructuredData from '@/components/StructuredData';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://kalki.tech'),
  title: {
    default: 'KALKI INTELLIGENCE – Temple of Technology',
    template: '%s | KALKI INTELLIGENCE',
  },
  description:
    'AI‑powered digital marketing, web development, SEO, and private AI (WebLLM) services. MSME registered (UDYAM-MP-20-0113749). Guaranteed ROI.',
  keywords: [
    'KALKI INTELLIGENCE',
    'AI solutions',
    'digital marketing agency',
    'web development',
    'SEO services',
    'private AI',
    'WebLLM',
    'distributed inference',
    'MSME',
    'guaranteed ROI',
    'Temple of Technology',
  ],
  alternates: {
    languages: {
      en: '/',
      hi: '/hi',
    },
    canonical: '/',
  },
  openGraph: {
    title: 'KALKI INTELLIGENCE – Temple of Technology',
    description:
      'AI‑powered digital marketing, web development, SEO, and private AI (WebLLM). MSME registered. Guaranteed ROI.',
    url: 'https://kalki.tech',
    siteName: 'KALKI INTELLIGENCE',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'KALKI INTELLIGENCE – Temple of Technology',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KALKI INTELLIGENCE – Temple of Technology',
    description:
      'AI‑powered digital marketing, web development, SEO, and private AI (WebLLM). MSME registered. Guaranteed ROI.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'mXzGHeQy9yGNuw8JTuzgXdDUn-gUcj4C65Jt83rcK9A',
  },
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
        <link rel="manifest" href="/manifest.json" />
        {/* DNS Prefetch for critical third‑party domains */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://open.bigmodel.cn" />
        <link rel="dns-prefetch" href="https://api.groq.com" />
      </head>
      <body>
        <ThemeProvider>
          <QueryProvider>
            <StructuredData />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <SupportWidget />
            <ServiceWorkerRegistration />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
