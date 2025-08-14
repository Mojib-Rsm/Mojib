'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
  const { translations } = useLanguage();
  const navLinks = [
    { href: '/', label: translations.home },
    { href: '#about', label: translations.about },
    { href: '#portfolio', label: translations.portfolio },
    { href: '#gallery', label: translations.gallery },
    { href: '#blog', label: translations.blog },
    { href: '#contact', label: translations.contact },
  ];

  return (
    <footer className="bg-muted/40 py-12">
      <div className="container max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center text-center gap-6">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-3xl font-logo sm:inline-block">
              Mojib Rsm
            </span>
          </Link>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary text-foreground/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="text-sm text-muted-foreground mt-4">
            © {new Date().getFullYear()} Mojib Rsm. {translations.footerAllRightsReserved}
          </div>
        </div>
      </div>
    </footer>
  );
}
