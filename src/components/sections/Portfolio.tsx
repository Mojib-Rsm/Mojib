'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';

const worksData = [
    {
        image: "https://placehold.co/600x400.png",
        title: "Oftern News Website",
        description: "A comprehensive news portal with a custom theme and plugins.",
        technologies: ["WordPress", "PHP", "MySQL"],
        link: "#",
        hint: "news website"
    },
    {
        image: "https://placehold.co/600x400.png",
        title: "Oftern Shop (E-commerce)",
        description: "A full-featured e-commerce platform with a modern tech stack.",
        technologies: ["React", "Firebase", "Node.js"],
        link: "#",
        hint: "online store"
    },
    {
        image: "https://placehold.co/600x400.png",
        title: "Bulk SMS Platform",
        description: "A platform for sending bulk SMS messages for marketing campaigns.",
        technologies: ["PHP", "Laravel", "MySQL"],
        link: "#",
        hint: "messaging app"
    },
    {
        image: "https://placehold.co/600x400.png",
        title: "BMI Calculator",
        description: "A simple and fast BMI calculator to check your body weight category based on height and weight.",
        technologies: ["Laravel/PHP"],
        link: "#",
        hint: "health calculator"
    },
    {
        image: "https://placehold.co/600x400.png",
        title: "Oftern Telecom",
        description: "A fast and reliable platform to purchase mobile data and minutes at affordable prices.",
        technologies: ["WordPress", "Laravel/PHP"],
        link: "#",
        hint: "telecom app"
    },
    {
        image: "https://placehold.co/600x400.png",
        title: "Portfolio – Personal & Agency/Team Portfolio",
        description: "A modern, responsive portfolio website to showcase projects, skills, and achievements.",
        technologies: ["WordPress", "Customize"],
        link: "#",
        hint: "portfolio site"
    },
    {
        image: "https://placehold.co/600x400.png",
        title: "RoktoDao- Blood Donator",
        description: "A reliable online platform that connects blood donors and recipients, making it easy to find and donate blood.",
        technologies: ["NextJs", "React"],
        link: "https://roktodao.bartanow.com/",
        hint: "donation app"
    },
    {
        image: "https://placehold.co/600x400.png",
        title: "OFT Tools",
        description: "A digital tools hub offering mobile location tracking, number analysis, and various other utilities — designed for quick and easy solutions.",
        technologies: ["NextJs", "React"],
        link: "https://tools.bartanow.com/",
        hint: "utility tools"
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {worksData.map((work, index) =>(
                <Card key={index} className="group overflow-hidden animate-fade-in-up bg-background flex flex-col" style={{animationDelay: `${index * 200}ms`}}>
                    <CardHeader className="p-0">
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
                    </CardHeader>
                    <CardContent className="p-6 flex-grow">
                        <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">{work.title}</CardTitle>
                        <p className="text-muted-foreground text-sm mb-4">{work.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm font-semibold mr-2">Technologies Used:</span>
                          {work.technologies.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
                        </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 mt-auto">
                      <Button asChild className="w-full">
                        <Link href={work.link} target="_blank" rel="noopener noreferrer">{work.title.includes("Portfolio") ? "Customize" : "View Project"}</Link>
                      </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
