'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const experienceData = [
  {
    company: 'Oftern IT & Oftern Shop',
    dates: '2023 - Present',
    role: 'Founder',
    description: 'Led the development of various web and mobile projects. Managed client relationships and project requirements. Oversaw the technical architecture and implementation.',
  },
  {
    company: 'Creative Solutions Inc.',
    dates: '2022 - 2023',
    role: 'Lead UI/UX Designer',
    description: 'Lead the design team for a major e-commerce platform redesign. Conducted user research and usability testing sessions. Created wireframes, prototypes, and high-fidelity mockups.',
  },
  {
    company: 'ThemeForest Marketplace',
    dates: '2021 - 2022',
    role: 'WordPress Theme Developer',
    description: 'Developed and maintained popular WordPress themes. Provided technical support to thousands of customers. Ensured themes meet high-quality coding standards.',
  },
  {
    company: 'Freelancer',
    dates: '2022 - Present',
    role: 'Android App Developer',
    description: 'Designed and developed native Android applications. Published apps on the Google Play Store. Integrated various APIs and third-party services.',
  },
];


export function Experience() {
  return (
    <section id="experience" className="bg-muted/40 py-20 md:py-28">
      <div className="container max-w-screen-lg mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">My Experience</h2>
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
