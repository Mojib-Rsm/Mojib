'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
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
        <div className="relative grid gap-8 before:absolute before:inset-0 before:left-1/2 before:w-px before:bg-border before:-translate-x-1/2">
          {experienceData.map((item, index) => (
             <motion.div key={index} className="relative md:grid md:grid-cols-2 md:gap-8 items-start" variants={itemVariants}>
              {index % 2 === 0 ? (
                <>
                  <div className="flex flex-col items-end text-right">
                     <div className="font-semibold text-primary">{item.dates}</div>
                  </div>
                   <div className="absolute left-1/2 top-1 w-3 h-3 rounded-full bg-primary -translate-x-1/2"></div>
                   <div>
                    <Card className="w-full bg-muted shadow-md">
                        <CardHeader>
                            <CardTitle>{item.role}</CardTitle>
                            <CardDescription>{item.company}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                    </Card>
                   </div>
                </>
              ) : (
                <>
                   <div className="md:order-last flex flex-col items-start">
                     <div className="font-semibold text-primary">{item.dates}</div>
                   </div>
                   <div className="absolute left-1/2 top-1 w-3 h-3 rounded-full bg-primary -translate-x-1/2"></div>
                   <div className="md:text-right">
                     <Card className="w-full bg-muted shadow-md">
                        <CardHeader>
                            <CardTitle>{item.role}</CardTitle>
                            <CardDescription>{item.company}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                    </Card>
                   </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}