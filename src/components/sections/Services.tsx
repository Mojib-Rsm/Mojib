'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PenTool, Code, Search, LineChart, LayoutTemplate, Palette } from "lucide-react";

const servicesData = [
  {
    icon: <Palette className="w-10 h-10 mb-4 text-primary" />,
    title: 'UI/UX Design',
    description: 'Crafting intuitive and beautiful user interfaces that are a joy to use.',
  },
  {
    icon: <Code className="w-10 h-10 mb-4 text-primary" />,
    title: 'Web Development',
    description: 'Building responsive, fast, and secure websites from the ground up.',
  },
  {
    icon: <LayoutTemplate className="w-10 h-10 mb-4 text-primary" />,
    title: 'Wireframing',
    description: 'Creating detailed blueprints and mockups to visualize the user flow.',
  },
   {
    icon: <PenTool className="w-10 h-10 mb-4 text-primary" />,
    title: 'Branding',
    description: 'Developing a strong brand identity that resonates with your audience.',
  },
  {
    icon: <LineChart className="w-10 h-10 mb-4 text-primary" />,
    title: 'Analytics',
    description: 'Tracking user behavior to make data-driven design decisions.',
  },
  {
    icon: <Search className="w-10 h-10 mb-4 text-primary" />,
    title: 'SEO',
    description: 'Optimizing your site to rank higher in search engine results.',
  },
];

export function Services() {
  return (
    <section id="services" className="bg-muted/40 py-20 md:py-28">
      <div className="container max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Services I Offer</h2>
          <p className="text-muted-foreground mt-2">Providing the best solutions for your digital needs.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <Card key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
              <CardHeader>
                <div className="flex justify-center">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
