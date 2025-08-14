'use client';

import Image from 'next/image';
import { Button } from '../ui/button';

export function Hero() {
  return (
    <section className="container max-w-screen-xl mx-auto py-16 md:py-24 animate-fade-in-up">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        <div className="flex flex-col gap-6 items-start text-left">
          <div className="text-sm uppercase text-primary font-semibold tracking-wider">UI/UX Designer & Developer</div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
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

        <div className="relative h-[450px] md:h-[550px]">
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <div className="relative w-[320px] h-[480px] md:w-[360px] md:h-[540px]">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary rounded-lg z-0"></div>
              <Image
                src="https://placehold.co/400x600.png"
                alt="Portrait of Binjan, a UI/UX designer"
                width={400}
                height={600}
                className="rounded-lg object-cover w-full h-full relative z-10"
                data-ai-hint="man red beanie"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
