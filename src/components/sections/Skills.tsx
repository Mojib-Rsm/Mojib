
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brush, Code, Database, Server } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const skillsData = [
  {
    category: 'skillsCategory1',
    icon: <Server className="w-8 h-8 text-primary" />,
    skills: ['Node.js', 'Laravel', 'PHP', 'Express.js', 'Python'],
  },
  {
    category: 'skillsCategory2',
    icon: <Code className="w-8 h-8 text-primary" />,
    skills: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3/Sass'],
  },
  {
    category: 'skillsCategory3',
    icon: <Database className="w-8 h-8 text-primary" />,
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Redis'],
  },
  {
    category: 'skillsCategory4',
    icon: <Brush className="w-8 h-8 text-primary" />,
    skills: ['Docker', 'Git', 'CI/CD', 'AWS', 'Linux'],
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
