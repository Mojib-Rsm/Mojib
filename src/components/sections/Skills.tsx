
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Code, Megaphone, Server, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const skillsData = [
  {
    category: 'skillsCategory1',
    icon: <Wand2 className="w-8 h-8 text-primary" />,
    skills: ['WordPress', 'PHP', 'Shopify', 'Webflow', 'Elementor'],
  },
  {
    category: 'skillsCategory5',
    icon: <Code className="w-8 h-8 text-primary" />,
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Laravel'],
  },
  {
    category: 'skillsCategory2',
    icon: <Bot className="w-8 h-8 text-primary" />,
    skills: ['Genkit', 'AI Integration', 'Chatbots', 'Prompt Engineering', 'Automation'],
  },
  {
    category: 'skillsCategory3',
    icon: <Megaphone className="w-8 h-8 text-primary" />,
    skills: ['SEO', 'SEM', 'Social Media', 'Content Marketing', 'Analytics'],
  },
  {
    category: 'skillsCategory4',
    icon: <Server className="w-8 h-8 text-primary" />,
    skills: ['Computer Hardware', 'Networking', 'Security', 'System Admin', 'Troubleshooting'],
  },
];

export function Skills() {
  const { translations } = useLanguage();
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section 
      id="skills" 
      className="py-20 md:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container max-w-screen-xl mx-auto">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-4xl font-bold">{translations.skillsTitle}</h2>
          <p className="text-muted-foreground mt-2">{translations.skillsSubtitle}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, index) => (
            <motion.div key={index} variants={itemVariants} whileHover={{ y: -5 }}>
              <Card className="text-left h-full glass-card">
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
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
