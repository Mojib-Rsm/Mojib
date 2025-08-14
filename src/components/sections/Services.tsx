'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PenTool, Code, Search, Megaphone, Bot, Languages, ArrowRight } from 'lucide-react';

const servicesData = [
  {
    icon: <Code className="w-10 h-10 mb-4 text-primary" />,
    title: 'Web Development',
    description:
      'Custom WordPress, Laravel, and Frontend solutions tailored to your needs. I build responsive, fast, and secure websites from the ground up to help your business grow and succeed online.',
  },
  {
    icon: <Search className="w-10 h-10 mb-4 text-primary" />,
    title: 'SEO Optimization',
    description:
      'Comprehensive on-page and off-page SEO strategies to improve your search engine ranking. I help you connect with your target audience by making your site more visible and accessible.',
  },
  {
    icon: <PenTool className="w-10 h-10 mb-4 text-primary" />,
    title: 'UI/UX Design',
    description:
      'Clean, modern, and user-friendly interface design that provides an exceptional user experience. My goal is to create intuitive and attractive designs that are easy to navigate and use.',
  },
  {
    icon: <Megaphone className="w-10 h-10 mb-4 text-primary" />,
    title: 'Digital Marketing',
    description:
      'Effective social media management and campaign strategies to boost your online presence. I develop tailored marketing plans to help you reach your business goals and connect with customers.',
  },
  {
    icon: <Bot className="w-10 h-10 mb-4 text-primary" />,
    title: 'Content Writing',
    description:
      'Optimized and engaging content for your website and blog that captures your brand’s voice. I write to attract and retain your audience, providing value while improving your SEO.',
  },
  {
    icon: <Languages className="w-10 h-10 mb-4 text-primary" />,
    title: 'Translation',
    description:
      'High-quality translation services to help you reach a global audience. I ensure your message is accurately and effectively communicated in different languages, maintaining its original intent.',
  },
];

export function Services() {
  return (
    <section id="services" className="bg-muted/40 py-20 md:py-28">
      <div className="container max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Services I Offer</h2>
          <p className="text-muted-foreground mt-2">
            Providing the best solutions for your digital needs.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <Card
              key={index}
              className="flex flex-col text-left animate-fade-in-up transition-transform duration-300 ease-in-out hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                {service.icon}
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
              <CardFooter>
                 <Button variant="link" className="p-0">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}