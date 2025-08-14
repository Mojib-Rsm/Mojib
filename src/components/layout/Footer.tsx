'use client';

import { useLanguage } from '@/contexts/LanguageProvider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        <div className="flex flex-col gap-4">
          <h3 className="font-headline text-lg font-semibold">{t('name')}</h3>
          <p className="text-muted-foreground">{t('footerText')}</p>
          <div className="flex space-x-4 mt-2">
            <Link href="#" aria-label="Github">
              <Github className="h-6 w-6 text-muted-foreground hover:text-foreground" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-6 w-6 text-muted-foreground hover:text-foreground" />
            </Link>
            <Link href="#" aria-label="Linkedin">
              <Linkedin className="h-6 w-6 text-muted-foreground hover:text-foreground" />
            </Link>
          </div>
        </div>
        <div className="md:col-span-2">
          <h3 className="font-headline text-lg font-semibold">{t('newsletterTitle')}</h3>
          <p className="text-muted-foreground mt-2 mb-4">Stay updated with my latest projects and articles.</p>
          <form className="flex w-full max-w-md space-x-2">
            <Input type="email" placeholder={t('newsletterPlaceholder')} className="flex-1" />
            <Button type="submit">{t('newsletterButton')}</Button>
          </form>
        </div>
      </div>
      <div className="border-t">
        <div className="container flex items-center justify-center py-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t('name')}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
