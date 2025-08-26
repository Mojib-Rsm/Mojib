

'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Toaster } from "@/components/ui/toaster"
import { Footer } from '@/components/layout/Footer';
import { Alegreya, Belleza } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/hooks/useAuth';

const belleza = Belleza({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-belleza',
});

const alegreya = Alegreya({
  subsets: ['latin'],
  variable: '--font-alegreya',
});

// export const metadata: Metadata = {
//   title: 'Mojib Rsm - Professional Portfolio',
//   description: 'The professional portfolio of Mojib Rsm, showcasing software development projects, skills, and experience.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin') || pathname === '/login';

  return (
    <html lang="en" suppressHydrationWarning>
        <head>
            <title>Mojib Rsm - WordPress Developer, AI Specialist & Digital Marketer</title>
            <meta name="description" content="Welcome to the portfolio of Mojib Rsm. Discover my projects in WordPress, AI, and digital marketing. Let's build something amazing together." />
            <meta name="keywords" content="Mojib Rsm, WordPress Developer, AI Specialist, Digital Marketer, Web Developer, SEO Expert, Freelancer Bangladesh" />
            <meta property="og:title" content="Mojib Rsm - Professional Portfolio" />
            <meta property="og:description" content="Showcasing software development projects, skills, and experience in WordPress, AI, and more." />
            <meta property="og:image" content="/uploads/mojib-hero.png" />
            <meta property="og:url" content="https://www.mojib.me" />
            <meta name="twitter:card" content="summary_large_image" />
        </head>
      <body className={cn(`${belleza.variable} ${alegreya.variable} 'font-body antialiased'`, isAdminRoute && 'admin-theme')} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <AuthProvider>
              {isAdminRoute ? (
                children
              ) : (
                <div className="flex flex-col min-h-screen bg-background">
                    <Header />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                </div>
              )}
            </AuthProvider>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

