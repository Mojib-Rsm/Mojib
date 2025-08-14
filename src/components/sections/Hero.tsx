'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import { Code, Smartphone, TrendingUp } from 'lucide-react';

const FloatingPill = ({ icon, text, className, delay }: { icon: React.ReactNode, text: string, className: string, delay: string }) => (
    <div className={`absolute flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-card/60 backdrop-blur-sm rounded-full shadow-lg animate-fade-in-up ${className}`} style={{ animationDelay: delay }}>
        <div className="p-2 bg-primary/10 rounded-full text-primary">
            {icon}
        </div>
        <span className="text-sm font-medium text-foreground">{text}</span>
    </div>
)

export function Hero() {
  return (
    <section className="container max-w-screen-xl mx-auto py-16 md:py-24 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        <div className="flex flex-col gap-6 items-start text-left animate-slide-in-left">
          <div className="text-sm uppercase text-primary font-semibold tracking-wider">Wordpress Developer & SEO Marketer</div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-foreground/80">
            I'm Binjan, designing <br/>digital experiences.
          </h1>
          <p className="text-lg text-muted-foreground max-w-md">
            I design and build beautiful, accessible, and user-centered digital products. I'm passionate about creating intuitive and delightful user experiences.
          </p>
          <div className="flex gap-4 mt-4">
            <Button size="lg">My Works</Button>
            <Button size="lg" variant="outline">Contact Me</Button>
          </div>
        </div>

        <div className="relative h-[450px] md:h-[550px] animate-zoom-in" style={{animationDelay: '200ms'}}>
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <div className="relative w-[320px] h-[480px] md:w-[360px] md:h-[540px]">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary rounded-lg z-0 animate-pulse-slow"></div>
              <Image
                src="https://www.mojib.me/uploads/1752046744345-Mojibur_Rahman_sm.png"
                alt="Portrait of Binjan, a Wordpress Developer & SEO Marketer"
                width={400}
                height={600}
                className="rounded-lg object-cover w-full h-full relative z-10"
                data-ai-hint="man suit"
              />
               <FloatingPill icon={<Code size={20} />} text="Clean Code" className="top-20 -right-24 animate-float" delay="400ms" />
               <FloatingPill icon={<Smartphone size={20} />} text="Responsive Design" className="top-40 -left-24 animate-float" delay="600ms" />
               <FloatingPill icon={<TrendingUp size={20} />} text="SEO Optimized" className="bottom-16 -right-20 animate-float" delay="800ms" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
