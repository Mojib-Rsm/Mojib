'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

const allProjects = [
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio to showcase my work and skills, built with Next.js and Tailwind CSS.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'React', 'Web'],
    link: '#',
    aiHint: 'portfolio website'
  },
  {
    title: 'E-commerce Platform',
    description: 'A feature-rich e-commerce site with product filtering, cart functionality, and a checkout process.',
    image: 'https://placehold.co/600x400.png',
    tags: ['React', 'Web', 'E-commerce'],
    link: '#',
    aiHint: 'e-commerce'
  },
  {
    title: 'Task Management App',
    description: 'A mobile-first task management application to help users stay organized and productive.',
    image: 'https://placehold.co/600x400.png',
    tags: ['React', 'Mobile', 'App'],
    link: '#',
    aiHint: 'task manager'
  },
  {
    title: 'Design System UI Kit',
    description: 'A comprehensive UI kit and design system created in Figma to ensure consistency across projects.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Figma', 'UI/UX'],
    link: '#',
    aiHint: 'design system'
  }
];

export function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('All');

  const tags = ['All', 'Web', 'Mobile', 'UI/UX', 'E-commerce'];

  const filteredProjects = filter === 'All'
    ? allProjects
    : allProjects.filter(p => p.tags.includes(filter));

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t('projectsTitle')}</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Here are some of the projects I'm proud of. Each one was a unique challenge.
          </p>
        </div>
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {tags.map(tag => (
            <Button
              key={tag}
              variant={filter === tag ? 'default' : 'outline'}
              onClick={() => setFilter(tag)}
            >
              {tag === 'All' ? t('allProjects') : tag}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <Card key={index} className="overflow-hidden group">
              <CardContent className="p-0 relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={project.aiHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold font-headline">{project.title}</h3>
                  <p className="text-white/80 mt-2 max-w-md">{project.description}</p>
                   <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-none">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-primary-foreground font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Project <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
