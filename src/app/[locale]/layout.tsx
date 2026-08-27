import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/src/context/ThemeContext';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

const inter = Inter({ subsets: ['latin', 'cyrillic'], adjustFontFallback: false });

export const metadata: Metadata = {
  title: {
    default: 'ODDI ENGLISH — Англисиро амалӣ ёд гиред',
    template: '%s | ODDI ENGLISH',
  },
  description: 'Курси муосири омӯзиши забони англисӣ бо забони тоҷикӣ аз Назар Назаров. Аз B1 то сатҳи озод сухангӯӣ.',
  keywords: [
    'курси англиси',
    'курси англиси онлайн',
    'англиси онлайн',
    'забони англиси',
    'назар назаров',
    'oddi english',
    'омузиши англиси бо точики',
    'английский язык Душанбе',
    'курсы английского Таджикистан Онлайн',
    'курсы английского Таджикистан',
  ],
  authors: [{ name: 'Nazar Nazarov' }],
  creator: 'Nazar Nazarov',
  metadataBase: new URL('https://oddienglishtj.vercel.app/'),

  openGraph: {
    title: 'ODDI ENGLISH — Англисиро амалӣ ёд гиред, на танҳо назарӣ',
    description: 'Системаи муосири таълим бо таҷрибаи 10+ сол ва 500+ хонанда. Оғози қабули нави хонандагон!',
    url: 'https://oddienglishtj.vercel.app',
    siteName: 'ODDI ENGLISH',
    images: [
      {
        url: '/Logo.png',
        width: 1200,
        height: 630,
        alt: 'ODDI ENGLISH - Назар Назаров',
      },
    ],
    locale: 'tj_TJ',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ODDI ENGLISH — Англисиро амалӣ ёд гиред',
    description: 'Курсҳои муосири англисӣ бо забони тоҷикӣ аз Назар Назаров.',
    images: ['/Logo.png'],
  },

  icons: {
    icon: '/Logo.png',
    apple: '/Logo.png',
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}) {
  // Await кардани params барои пешгирии 404
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  let messages;
  try {
    messages = (await import(`@/src/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}