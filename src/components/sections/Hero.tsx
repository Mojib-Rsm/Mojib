'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Paintbrush, Palette, PenTool } from 'lucide-react';

const ServiceBadge = ({ icon, text, className }: { icon: React.ReactNode, text: string, className?: string }) => (
  <div className={`absolute flex items-center gap-2 bg-white rounded-full p-2 pr-4 shadow-lg ${className}`}>
    <div className="bg-emerald-100 text-emerald-600 rounded-full p-2">
      {icon}
    </div>
    <span className="font-medium text-sm">{text}</span>
  </div>
);

export function Hero() {
  const stats = [
    { value: '15+', label: 'years experience' },
    { value: '26K', label: 'projects success' },
    { value: '98%', label: 'satisfied rate' },
  ];

  return (
    <section className="container max-w-screen-xl mx-auto py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6 items-start">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Let's Work Together to Create Wonders with Us
          </h1>
          <p className="text-muted-foreground max-w-lg">
            A visionary creative, crafting captivating wonders through art and design. Adept at turning imagination into extraordinary reality.
          </p>
          <div className="flex gap-4">
            <Button size="lg">Let's Talk</Button>
            <Button size="lg" variant="outline">Start Project</Button>
          </div>
          <div className="flex gap-8 mt-8">
            {stats.map(stat => (
              <div key={stat.label}>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <Image
            src="https://placehold.co/500x650.png"
            alt="A man in a grey suit jacket adjusting his glasses"
            width={500}
            height={650}
            className="rounded-xl mx-auto"
            data-ai-hint="man portrait"
          />
          <ServiceBadge icon={<Paintbrush size={20} />} text="Illustration" className="top-1/4 -right-8" />
          <ServiceBadge icon={<Palette size={20} />} text="Graphic Design" className="top-1/2 -left-12 -translate-y-1/2" />
          <ServiceBadge icon={<PenTool size={20} />} text="Creative Branding" className="bottom-1/4 -right-10" />
        </div>
      </div>
    </section>
  );
}
