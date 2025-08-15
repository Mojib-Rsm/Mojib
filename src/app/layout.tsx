
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
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <html lang="en" suppressHydrationWarning>
        <head>
            <title>Mojib Rsm - Professional Portfolio</title>
            <meta name="description" content="The professional portfolio of Mojib Rsm, showcasing software development projects, skills, and experience." />
        </head>
      <body className={cn(`${belleza.variable} ${alegreya.variable} font-body antialiased`, isAdminRoute && 'admin-theme')} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
              {isAdminRoute ? (
                children
              ) : (
                <div className="flex flex-col min-h-screen bg-background">
                    <Header />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                </div>
              )}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

    