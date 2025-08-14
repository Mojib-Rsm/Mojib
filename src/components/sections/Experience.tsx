'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const experienceData = [
  {
    company: 'Self-Employed, Brisbane',
    dates: '2014 - 2016',
    role: 'Visual Designer',
    description: 'Created stunning visual designs for a variety of platforms including websites, games, and mobile apps. Focused on creating engaging and user-friendly interfaces.',
  },
  {
    company: 'New Man Services',
    dates: '2017 - 2018',
    role: 'UI/UX Designer',
    description: 'Designed and engineered user interfaces for machines and software. Specialized in creating intuitive experiences for complex systems.',
  },
  {
    company: 'Global Solution',
    dates: '2019 - Present',
    role: 'Sr. Product Designer',
    description: 'Lead product design initiatives from concept to launch. I specialize in creating beautiful, usable, and impactful digital products that users love.',
  },
];


export function Experience() {
  return (
    <section id="experience" className="bg-muted/40 py-20 md:py-28">
      <div className="container max-w-screen-lg mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Work Experience</h2>
            <p className="text-muted-foreground mt-2">My professional journey so far.</p>
        </div>
        <div className="relative grid gap-8 before:absolute before:inset-0 before:left-6 before:md:left-1/2 before:w-px before:bg-border before:-translate-x-1/2">
          {experienceData.map((item, index) => (
            <div key={index} className="relative flex items-start md:grid md:grid-cols-2 md:gap-8 animate-fade-in-up" style={{animationDelay: `${index * 200}ms`}}>
              <div className="hidden md:flex justify-end text-right">
                <div className="font-semibold text-primary">{item.dates}</div>
              </div>
              <div className="absolute md:relative left-6 top-1 w-3 h-3 rounded-full bg-primary -translate-x-1/2"></div>
              <div className="pl-12 md:pl-0">
                <Card className="w-full">
                    <CardHeader>
                        <div className="md:hidden font-semibold text-primary mb-1">{item.dates}</div>
                        <CardTitle>{item.role}</CardTitle>
                        <CardDescription>{item.company}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
