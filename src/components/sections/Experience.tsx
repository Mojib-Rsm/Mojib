'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Briefcase } from "lucide-react";

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };
  
  return (
    <motion.section 
      id="experience" 
      className="bg-background py-20 md:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container max-w-screen-lg mx-auto">
        <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-4xl font-bold">{translations.experienceTitle}</h2>
            <p className="text-muted-foreground mt-2">{translations.experienceSubtitle}</p>
        </motion.div>
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 w-px h-full bg-border -translate-x-1/2"></div>
          <div className="space-y-12">
            {experienceData.map((item, index) => (
              <motion.div 
                key={index} 
                className="relative md:grid md:grid-cols-2 md:gap-8 items-center" 
                variants={itemVariants}
              >
                <div className="flex flex-col items-start md:items-end text-left md:text-right mb-4 md:mb-0">
                  <h3 className="font-semibold text-lg">{item.company}</h3>
                  <p className="text-sm text-muted-foreground">{item.dates}</p>
                </div>

                <div className="relative">
                   <div className="absolute -left-[34px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-background -translate-x-1/2 md:left-0"></div>
                   <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="md:ml-8"
                  >
                    <Card className="w-full bg-muted/50 shadow-md border transition-shadow hover:shadow-primary/20">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                              <Briefcase className="w-6 h-6 text-primary"/>
                              <div>
                                <CardTitle>{item.role}</CardTitle>
                              </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}