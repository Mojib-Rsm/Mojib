
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Brush, Code, Megaphone, Server } from "lucide-react";

const skillsData = [
  {
    category: 'Digital Marketing',
    icon: <Megaphone className="w-8 h-8 text-primary" />,
    skills: ['SEO', 'Google Analytics', 'Content Strategy'],
  },
  {
    category: 'Core Development',
    icon: <Code className="w-8 h-8 text-primary" />,
    skills: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'React', 'PHP'],
  },
  {
    category: 'Design Skills',
    icon: <Brush className="w-8 h-8 text-primary" />,
    skills: ['UI/UX Design', 'Figma', 'Responsive Design', 'Branding'],
  },
  {
    category: 'Tools',
    icon: <Server className="w-8 h-8 text-primary" />,
    skills: ['Git', 'MySQL', 'Firebase', 'Canva', 'Android Studio'],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">My Skills</h2>
          <p className="text-muted-foreground mt-2">A showcase of my technical abilities.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillsData.map((category, index) => (
            <Card key={index} className="text-left animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  {category.icon}
                  <CardTitle className="text-xl">{category.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIndex) => (
                    <Badge key={sIndex} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
