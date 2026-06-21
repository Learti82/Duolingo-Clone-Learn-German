import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { PWARegister } from '@/components/PWARegister';

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: 'Lerno Gjermanisht | Learn German | Deutsch Lernen',
  description: 'Mëso gjermanisht nga A1 deri C2 - Learn German from A1 to C2',
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'LernoDE' },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'theme-color': '#58CC02',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <meta name="theme-color" content="#58CC02" />
      </head>
      <body className={nunito.className}>
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
