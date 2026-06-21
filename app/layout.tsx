import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: 'Lerno Gjermanisht | Learn German | Deutsch Lernen',
  description: 'Mëso gjermanisht nga A1 deri C2 - Learn German from A1 to C2',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
