import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Toaster } from "@/components/ui/toaster"
import { Footer } from '@/components/layout/Footer';
import { Alegreya, Belleza } from 'next/font/google';

const belleza = Belleza({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-belleza',
});

const alegreya = Alegreya({
  subsets: ['latin'],
  variable: '--font-alegreya',
});

export const metadata: Metadata = {
  title: 'Mojibfolio - Professional Portfolio',
  description: 'The personal portfolio of Mojib, showcasing projects, skills, and professional achievements.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${belleza.variable} ${alegreya.variable} font-body antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
