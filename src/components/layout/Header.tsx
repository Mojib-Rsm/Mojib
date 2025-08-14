'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Menu, Phone } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#works', label: 'Works' },
    { href: '#notes', label: 'Notes' },
    { href: '#experience', label: 'Experience' },
  ];

  const NavItems = () => (
    <>
      {navLinks.map((link, index) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm font-medium transition-colors hover:text-primary ${
            index === 0 ? 'border border-primary rounded-full px-3 py-1' : 'text-foreground'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-3xl font-logo sm:inline-block">
            Binjan
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm flex-1 justify-center">
          <NavItems />
        </nav>
        <div className="flex items-center justify-end space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-sm font-medium">+001 (313) 345 678</span>
            <Button variant="outline" size="icon" className="rounded-full">
              <Phone size={16} />
            </Button>
          </div>
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-6 mt-8">
                  <NavItems />
                   <div className="flex items-center space-x-2">
                     <span className="text-sm font-medium">+001 (313) 345 678</span>
                     <Button variant="outline" size="icon" className="rounded-full">
                       <Phone size={16} />
                     </Button>
                   </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
