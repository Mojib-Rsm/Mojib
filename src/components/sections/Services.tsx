'use client';

import { useLanguage } from '@/contexts/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, PenTool, Smartphone } from 'lucide-react';

export function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Code className="h-8 w-8 text-accent" />,
      title: 'Web Development',
      description: 'Building responsive and high-performance websites with modern technologies.',
    },
    {
      icon: <PenTool className="h-8 w-8 text-accent" />,
      title: 'UI/UX Design',
      description: 'Creating intuitive and visually appealing user interfaces for a great user experience.',
    },
    {
      icon: <Smartphone className="h-8 w-8 text-accent" />,
      title: 'Mobile App Dev',
      description: 'Developing cross-platform mobile applications that work seamlessly on iOS and Android.',
    },
  ];

  const skills = [
    'Next.js', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Figma', 'Node.js', 'Firebase', 'Git', 'UI/UX'
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t('servicesTitle')}</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A glimpse into my professional skills and the services I offer to bring your ideas to life.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="text-center glass-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-primary/20 p-4 rounded-full w-fit">
                  {service.icon}
                </div>
                <CardTitle className="mt-4">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">My Skillset</h3>
            <div className="flex flex-wrap justify-center gap-3">
                {skills.map(skill => (
                    <Badge key={skill} variant="outline" className="text-lg py-2 px-4 border-accent text-accent-foreground bg-accent/10 hover:bg-accent/20 transition-colors cursor-pointer">
                        {skill}
                    </Badge>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
