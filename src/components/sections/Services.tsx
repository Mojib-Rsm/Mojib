'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PenTool, Code, Search, Megaphone, Bot, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const servicesData = [
  {
    icon: <Code className="w-10 h-10 mb-4 text-primary" />,
    title: 'service1Title',
    description: 'service1Desc',
  },
  {
    icon: <Search className="w-10 h-10 mb-4 text-primary" />,
    title: 'service2Title',
    description: 'service2Desc',
  },
  {
    icon: <PenTool className="w-10 h-10 mb-4 text-primary" />,
    title: 'service3Title',
    description: 'service3Desc',
  },
  {
    icon: <Megaphone className="w-10 h-10 mb-4 text-primary" />,
    title: 'service4Title',
    description: 'service4Desc',
  },
  {
    icon: <Bot className="w-10 h-10 mb-4 text-primary" />,
    title: 'service5Title',
    description: 'service5Desc',
  },
   {
    icon: <Code className="w-10 h-10 mb-4 text-primary" />,
    title: 'service6Title',
    description: 'service6Desc',
  },
];

export function Services() {
  const { translations } = useLanguage();
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      id="services" 
      className="bg-muted/40 py-20 md:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      <div className="container max-w-screen-xl mx-auto">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-4xl font-bold">{translations.servicesTitle}</h2>
          <p className="text-muted-foreground mt-2">
            {translations.servicesSubtitle}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="flex"
            >
              <Card
                className="flex flex-col text-left glass-card"
              >
                <CardHeader>
                  {service.icon}
                  <CardTitle>{translations[service.title]}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{translations[service.description]}</CardDescription>
                </CardContent>
                <CardFooter>
                   <Button variant="link" className="p-0">
                      {translations.getStarted} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
