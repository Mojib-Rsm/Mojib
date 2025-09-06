
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
  metadataBase: new URL('https://www.mojib.me'),
  title: {
    default: 'Mojib Rsm - Expert WordPress Developer, AI Specialist & Digital Marketer in Bangladesh',
    template: '%s | Mojib Rsm',
  },
  description: "Looking for a top-rated WordPress developer in Bangladesh? Mojib Rsm offers expert web development, AI integration, and digital marketing services to grow your business online. View my portfolio and let's build something amazing.",
  keywords: "Mojib Rsm, WordPress Developer Bangladesh, AI Specialist, Digital Marketer, Web Developer, SEO Expert, Freelance web developer in Bangladesh, top WordPress expert, AI integration services, React developer, Next.js developer",
  openGraph: {
    title: 'Mojib Rsm - Professional Portfolio | WordPress & AI Expert',
    description: 'Expert WordPress development, AI integration, and digital marketing services to help your business succeed. Based in Bangladesh.',
    images: ['/uploads/mojib-hero.png'],
    url: 'https://www.mojib.me',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mojib Rsm - Expert WordPress Developer & AI Specialist',
    description: 'Showcasing web development projects, skills, and experience in WordPress, AI, and digital marketing in Bangladesh.',
    images: ['/uploads/mojib-hero.png'],
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
