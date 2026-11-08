import type { Metadata } from 'next';
import { Caveat, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { birthdayData } from '@/content/birthday';

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(birthdayData.publicUrl),
  title: `Happy Birthday, ${birthdayData.friendName}! | Magical Birthday Universe`,
  description: `An interactive birthday storybook and photo constellation universe crafted for ${birthdayData.friendName}.`,
  alternates: {
    canonical: birthdayData.publicUrl,
  },
  openGraph: {
    title: `Happy Birthday, ${birthdayData.friendName}! ✨`,
    description: `Explore 28 memories, pop flying star bubbles, and celebrate ${birthdayData.friendName}'s birthday from ${birthdayData.senderName}!`,
    url: birthdayData.publicUrl,
    siteName: `${birthdayData.friendName}'s Birthday Universe`,
    images: [
      {
        url: `${birthdayData.publicUrl}/og/preview-1200x630.jpg`,
        width: 1200,
        height: 630,
        alt: `Birthday Universe preview for ${birthdayData.friendName}`,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Happy Birthday, ${birthdayData.friendName}! ✨`,
    description: `An interactive birthday storybook and photo constellation universe for ${birthdayData.friendName}!`,
    images: [`${birthdayData.publicUrl}/og/preview-1200x630.jpg`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${caveat.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased bg-amber-50 text-slate-800 selection:bg-pink-200 selection:text-pink-900">
        {children}
      </body>
    </html>
  );
}

