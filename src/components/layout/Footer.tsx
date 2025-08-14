'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Facebook, Github, Linkedin } from 'lucide-react';

export function Footer() {
  const { translations } = useLanguage();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const navLinks = [
    { href: '/', label: translations.home },
    { href: '#about', label: translations.about },
    { href: '#portfolio', label: translations.portfolio },
    { href: '#gallery', label: translations.gallery },
    { href: '#blog', label: translations.blog },
    { href: '#contact', label: translations.contact },
  ];
  
  const socialLinks = [
    { href: 'https://github.com/mojibrsm', icon: <Github className="h-5 w-5" />, label: 'Github' },
    { href: 'https://linkedin.com/in/mojibrsm', icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn' },
    { href: 'https://facebook.com/mojibur.rsm', icon: <Facebook className="h-5 w-5" />, label: 'Facebook' },
  ];

  return (
    <footer className="py-12">
      <div className="container max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center text-center gap-6">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-3xl font-headline sm:inline-block">
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
           <div className="flex gap-2 mt-2">
            {socialLinks.map((link) => (
              <Button key={link.href} variant="ghost" size="icon" asChild>
                <Link href={link.href} target="_blank" aria-label={link.label}>
                  {link.icon}
                </Link>
              </Button>
            ))}
          </div>
          <div className="text-sm text-muted-foreground mt-4">
            © {currentYear} Mojib Rsm. {translations.footerAllRightsReserved}
          </div>
        </div>
      </div>
    </footer>
  );
}
