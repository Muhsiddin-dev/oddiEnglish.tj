import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'ODDI ENGLISH — Англисиро оддӣ омӯзед',
  description: 'Курси омӯзиши англисӣ бо забони тоҷикӣ аз Nazar Nazarov.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="tg"><body className={inter.className}>{children}</body></html>;
}
