'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import { Award, Briefcase, Users } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[450px] md:h-[550px] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Image
              src="https://placehold.co/600x800.png"
              alt="About Binjan"
              width={600}
              height={800}
              className="rounded-lg object-cover w-full h-full relative z-10"
              data-ai-hint="man glasses"
            />
             <div className="absolute -top-4 -right-4 w-full h-full border-2 border-primary rounded-lg z-0"></div>
          </div>
          <div className="flex flex-col gap-6 items-start text-left animate-fade-in-up">
            <h2 className="text-4xl font-bold">About Me</h2>
            <p className="text-lg text-muted-foreground">
              I am a passionate UI/UX designer and developer with over 10 years of experience creating beautiful, functional, and user-centered digital experiences. My goal is to bridge the gap between user needs and business goals, crafting solutions that are both intuitive and impactful.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4">
              <div className="p-4 rounded-lg border text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Experience</h3>
                <p className="text-sm text-muted-foreground">10+ Years</p>
              </div>
              <div className="p-4 rounded-lg border text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Clients</h3>
                <p className="text-sm text-muted-foreground">50+ Worldwide</p>
              </div>
              <div className="p-4 rounded-lg border text-center">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Projects</h3>
                <p className="text-sm text-muted-foreground">100+ Completed</p>
              </div>
            </div>
            <Button size="lg" className="mt-4">Download CV</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
