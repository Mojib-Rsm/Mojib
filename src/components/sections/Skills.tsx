'use client';

import { Progress } from "@/components/ui/progress";

const skillsData = [
  { skill: 'Figma', level: 95 },
  { skill: 'Adobe XD', level: 90 },
  { skill: 'React & Next.js', level: 85 },
  { skill: 'HTML & CSS', level: 98 },
  { skill: 'JavaScript & TypeScript', level: 80 },
  { skill: 'Tailwind CSS', level: 92 },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container max-w-screen-lg mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">My Skills</h2>
          <p className="text-muted-foreground mt-2">A showcase of my technical abilities.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {skillsData.map((skill, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="flex justify-between mb-1">
                <span className="font-medium">{skill.skill}</span>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <Progress value={skill.level} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
