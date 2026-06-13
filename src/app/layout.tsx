import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import FunnelTracker from '@/components/FunnelTracker';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Golden Batch — Small-Batch Artisan Granola',
  description:
    'Each batch begins with a season, not a spreadsheet. Small-batch artisan granola, delivered when the ingredients are right.',
  openGraph: {
    title: 'Golden Batch',
    description: 'Small-batch. Limited run. Gone when it\'s gone.',
    images: ['/images/hero.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <SmoothScroll>
          <FunnelTracker />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
