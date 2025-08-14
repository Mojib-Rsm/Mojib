import Link from 'next/link';
import { Button } from '../ui/button';

export function Footer() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' },
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
            © {new Date().getFullYear()} Mojib Rsm. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
