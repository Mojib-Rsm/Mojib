'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from '../ThemeToggle';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageToggle } from '../LanguageToggle';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { translations } = useLanguage();

  const navLinks = [
    { href: '/', label: translations.home },
    { href: '#about', label: translations.about },
    { href: '#services', label: translations.services },
    { href: '#experience', label: translations.experience },
    { href: '#skills', label: translations.skills },
    { href: '#portfolio', label: translations.portfolio },
    { href: '#gallery', label: translations.gallery },
    { href: '#pricing', label: translations.pricing },
    { href: '#blog', label: translations.blog },
    { href: '#faq', label: translations.faq },
    { href: '#contact', label: translations.contact },
  ];

  const NavItems = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium transition-colors hover:text-primary text-foreground/80"
          onClick={() => setIsMenuOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-2xl font-logo sm:inline-block">
            {translations.logoText}
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm flex-1">
          <NavItems />
        </nav>
        <div className="flex items-center justify-end space-x-2 flex-1">
          <Button>{translations.contactMe}</Button>
          <ThemeToggle />
          <LanguageToggle />
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                 <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                    <span className="font-bold text-2xl font-logo sm:inline-block">
                    {translations.logoText}
                    </span>
                </Link>
                <nav className="flex flex-col gap-6">
                  <NavItems />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
