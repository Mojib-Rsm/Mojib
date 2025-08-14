'use client';

import { useLanguage } from '@/contexts/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Briefcase, Star } from 'lucide-react';

export function Achievements() {
  const { t } = useLanguage();

  const achievements = [
    {
      icon: <Award className="h-8 w-8 text-accent" />,
      title: 'Best Design Award',
      description: 'Awarded for outstanding UI/UX design in the 2023 National Tech Competition.',
    },
    {
      icon: <Briefcase className="h-8 w-8 text-accent" />,
      title: '50+ Projects Completed',
      description: 'Successfully delivered over 50 projects for clients worldwide, from small startups to large enterprises.',
    },
    {
      icon: <Star className="h-8 w-8 text-accent" />,
      title: 'Top Rated Developer',
      description: 'Consistently received 5-star ratings and positive feedback on multiple freelance platforms.',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t('achievementsTitle')}</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            I'm proud of my journey and the milestones I've reached along the way.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center border-2 border-transparent hover:border-primary transition-all">
              <CardHeader>
                <div className="mx-auto bg-primary/20 p-4 rounded-full w-fit">
                    {achievement.icon}
                </div>
                <CardTitle className="mt-4">{achievement.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
