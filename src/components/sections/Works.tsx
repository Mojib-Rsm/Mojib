'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const worksData = [
    {
        image: "https://placehold.co/600x400.png",
        category: "UI/UX Design",
        title: "Project One",
        hint: "abstract shapes"
    },
    {
        image: "https://placehold.co/600x400.png",
        category: "Branding",
        title: "Project Two",
        hint: "geometric pattern"
    },
     {
        image: "https://placehold.co/600x400.png",
        category: "Web Design",
        title: "Project Three",
        hint: "modern architecture"
    },
    {
        image: "https://placehold.co/600x400.png",
        category: "App Development",
        title: "Project Four",
        hint: "nature landscape"
    }
]

export function Works() {
  return (
    <section id="works" className="py-20 bg-orange-50/50">
      <div className="container max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold">My Latest Works</h2>
            <p className="text-muted-foreground mt-2">Perfect solution for digital experience</p>
          </div>
          <Button variant="link" asChild>
            <Link href="#">Explore More Works</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            {worksData.map((work, index) =>(
                <div key={index} className="group">
                    <div className="overflow-hidden rounded-lg">
                        <Image 
                            src={work.image} 
                            alt={work.title}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={work.hint}
                        />
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-muted-foreground">{work.category}</p>
                        <h3 className="text-xl font-semibold mt-1">{work.title}</h3>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
