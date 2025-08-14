'use client';

import { useLanguage } from '@/contexts/LanguageProvider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-[calc(100vh-3.5rem)] flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
      >
        <source src="https://placehold.co/videos/1920x1080.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-20 container flex flex-col items-center gap-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          {t('name')}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/80 max-w-2xl">
          {t('tagline')}
        </p>
        <Link href="/#projects">
            <Button size="lg" className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                {t('heroButton')}
            </Button>
        </Link>
      </div>
    </section>
  );
}
