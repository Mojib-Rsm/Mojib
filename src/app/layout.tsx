
import './globals.css';
import { Alegreya, Belleza } from 'next/font/google';
import { Providers } from '@/components/Providers';

const belleza = Belleza({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-belleza',
});

const alegreya = Alegreya({
  subsets: ['latin'],
  variable: '--font-alegreya',
});

export const metadata = {
  title: 'Mojib Rsm - WordPress Developer, AI Specialist & Digital Marketer',
  description: "Welcome to the portfolio of Mojib Rsm. Discover my projects in WordPress, AI, and digital marketing. Let's build something amazing together.",
  keywords: "Mojib Rsm, WordPress Developer, AI Specialist, Digital Marketer, Web Developer, SEO Expert, Freelancer Bangladesh",
  openGraph: {
    title: 'Mojib Rsm - Professional Portfolio',
    description: 'Showcasing software development projects, skills, and experience in WordPress, AI, and more.',
    images: ['/uploads/mojib-hero.png'],
    url: 'https://www.mojib.me',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${belleza.variable} ${alegreya.variable} font-body antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
