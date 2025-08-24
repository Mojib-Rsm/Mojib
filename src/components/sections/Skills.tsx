
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Code, Megaphone, Server, Wand2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const skillsData = [
  {
    category: 'skillsCategory1',
    icon: <Wand2 className="w-8 h-8 text-primary" />,
    skills: ['WordPress', 'PHP', 'Shopify', 'Webflow', 'Elementor', 'Divi'],
  },
  {
    category: 'skillsCategory5',
    icon: <Code className="w-8 h-8 text-primary" />,
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Laravel', 'Bootstrap', 'Tailwind'],
  },
  {
    category: 'skillsCategory2',
    icon: <Bot className="w-8 h-8 text-primary" />,
    skills: ['Genkit', 'AI Integration', 'Chatbots', 'Prompt Engineering', 'Automation', 'Gemini API'],
  },
  {
    category: 'skillsCategory3',
    icon: <Megaphone className="w-8 h-8 text-primary" />,
    skills: ['SEO', 'SEM', 'Social Media', 'Content Marketing', 'Google Analytics'],
  },
  {
    category: 'skillsCategory4',
    icon: <Server className="w-8 h-8 text-primary" />,
    skills: ['Computer Hardware', 'Networking', 'Cyber Security', 'System Admin', 'Troubleshooting'],
  },
];

export function Skills() {
  const { translations } = useLanguage();
  
  return (
    <section 
      id="skills" 
      className="py-20 md:py-28"
    >
      <div className="container max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">{translations.skillsTitle}</h2>
          <p className="text-muted-foreground mt-2">{translations.skillsSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, index) => (
            <div key={index} >
              <Card className="text-left h-full shadow-md border hover:shadow-primary/20 transition-shadow duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {category.icon}
                    <CardTitle className="text-xl">{translations[category.category]}</CardTitle>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
