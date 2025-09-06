
'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import { Award, Briefcase, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export function About() {
  const { translations } = useLanguage();

  const containerVariants = {
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
      transition: {
        duration: 0.5,
      },
    },
  };
  
  const imageContainerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const statCardVariants = {
    ...itemVariants,
    hover: {
      scale: 1.05,
      boxShadow: '0px 10px 30px -5px hsl(var(--primary) / 0.2)',
      y: -5,
      transition: { duration: 0.3 }
    }
  }


  return (
    <motion.section 
      id="about" 
      className="py-20 md:py-28 bg-muted"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="relative h-[450px] md:h-[550px]" 
            variants={imageContainerVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute -top-4 -right-4 w-full h-full border-2 border-primary rounded-lg z-0"
              animate={{
                x: [-5, 5, -5],
                y: [5, -5, 5],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
            <Image
              src="/uploads/about-sec.jpeg"
              alt="About Binjan"
              width={600}
              height={800}
              className="rounded-lg object-cover w-full h-full relative z-10 shadow-2xl"
              data-ai-hint="man developer"
            />
          </motion.div>
          <motion.div className="flex flex-col gap-6 items-start text-left" variants={containerVariants}>
            <motion.h2 className="text-4xl font-bold" variants={itemVariants}>{translations.aboutMe}</motion.h2>
            <motion.p className="text-lg text-muted-foreground" variants={itemVariants}>
              {translations.aboutDescription}
            </motion.p>
            <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4" variants={itemVariants}>
              <motion.div className="p-4 rounded-lg border text-center bg-background" variants={statCardVariants} whileHover="hover">
                <Award className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">{translations.experienceLabel}</h3>
                <p className="text-sm text-muted-foreground">{translations.experienceValue}</p>
              </motion.div>
              <motion.div className="p-4 rounded-lg border text-center bg-background" variants={statCardVariants} whileHover="hover">
                <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">{translations.clientsLabel}</h3>
                <p className="text-sm text-muted-foreground">{translations.clientsValue}</p>
              </motion.div>
              <motion.div className="p-4 rounded-lg border text-center bg-background" variants={statCardVariants} whileHover="hover">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">{translations.projectsLabel}</h3>
                <p className="text-sm text-muted-foreground">{translations.projectsValue}</p>
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button size="lg" className="mt-4">{translations.downloadCv}</Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
