'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const worksData = [
    {
        image: "https://placehold.co/600x400.png",
        category: "UI/UX Design",
        title: "E-commerce Platform",
        hint: "abstract shapes"
    },
    {
        image: "https://placehold.co/600x400.png",
        category: "Branding",
        title: "Startup Rebranding",
        hint: "geometric pattern"
    },
     {
        image: "https://placehold.co/600x400.png",
        category: "Web Design",
        title: "Portfolio Website",
        hint: "modern architecture"
    },
    {
        image: "https://placehold.co/600x400.png",
        category: "App Development",
        title: "Mobile Banking App",
        hint: "nature landscape"
    }
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-28 bg-muted/40">
      <div className="container max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">My Latest Works</h2>
            <p className="text-muted-foreground mt-2">Perfect solutions for digital experiences.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            {worksData.map((work, index) =>(
                <div key={index} className="group rounded-lg border overflow-hidden animate-fade-in-up bg-background" style={{animationDelay: `${index * 200}ms`}}>
                    <div className="overflow-hidden">
                        <Image 
                            src={work.image} 
                            alt={work.title}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105"
                            data-ai-hint={work.hint}
                        />
                    </div>
                    <div className="p-6">
                        <p className="text-sm text-primary font-medium">{work.category}</p>
                        <h3 className="text-xl font-semibold mt-2 group-hover:text-primary transition-colors">{work.title}</h3>
                    </div>
                </div>
            ))}
        </div>
        <div className="text-center mt-12">
            <Button variant="outline" size="lg">Explore More Works</Button>
        </div>
      </div>
    </section>
  );
}
