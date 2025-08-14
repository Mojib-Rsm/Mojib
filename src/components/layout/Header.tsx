'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Menu, Phone } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from '../ThemeToggle';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#experience', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#blog', label: 'Blog' },
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
            Binjan
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm flex-1">
          <NavItems />
        </nav>
        <div className="flex items-center justify-end space-x-2 flex-1">
          <Button>Contact Me</Button>
          <ThemeToggle />
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
                    Binjan
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
