'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import { Code, Search, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const FloatingPill = ({ icon, text, className, delay }: { icon: React.ReactNode, text: string, className?: string, delay: number }) => (
    <motion.div 
        className={`absolute flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-card/60 backdrop-blur-sm rounded-full shadow-lg ${className}`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: [20, -10, 20], opacity: 1 }}
        transition={{ 
            delay,
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
        }}
    >
        <div className="p-2 bg-primary/10 rounded-full text-primary">
            {icon}
        </div>
        <span className="text-sm font-medium text-foreground">{text}</span>
    </motion.div>
)

export function Hero() {
  const { translations } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
        x: 0, 
        opacity: 1,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
  };
  
  const imageVariants = {
      hidden: { scale: 0.9, opacity: 0 },
      visible: {
          scale: 1,
          opacity: 1,
          transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }
      }
  }

  return (
    <section className="container max-w-screen-xl mx-auto py-16 md:py-24 overflow-hidden">
      <motion.div 
        className="grid md:grid-cols-2 gap-12 items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        
        <div className="flex flex-col gap-6 items-start text-left">
          <motion.div className="text-sm uppercase text-primary font-semibold tracking-wider" variants={itemVariants}>
            {translations.heroSubtitle}
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-6xl font-bold tracking-tight"
            variants={itemVariants}
          >
            {translations.heroTitle}
          </motion.h1>
          <motion.p className="text-lg text-muted-foreground max-w-md" variants={itemVariants}>
            {translations.heroDescription}
          </motion.p>
          <motion.div className="flex gap-4 mt-4" variants={itemVariants}>
            <Button size="lg" asChild><a href="#portfolio">{translations.myWorks}</a></Button>
            <Button size="lg" variant="outline" asChild><a href="#contact">{translations.contactMe}</a></Button>
          </motion.div>
        </div>

        <motion.div className="relative h-[450px] md:h-[550px]" variants={imageVariants}>
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <div className="relative w-[320px] h-[480px] md:w-[360px] md:h-[540px]">
              <motion.div 
                className="absolute -top-4 -left-4 w-full h-full border-2 border-primary rounded-lg z-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              ></motion.div>
              <Image
                src="/uploads/mojib-hero.png"
                alt="Portrait of Mojib, a Full-Stack Developer"
                width={400}
                height={600}
                className="rounded-lg object-cover w-full h-full relative z-10 shadow-2xl"
                data-ai-hint="man suit"
                priority
              />
               <FloatingPill icon={<Code size={20} />} text={translations.webDevelopment} className="top-20 -right-24" delay={0.5} />
               <FloatingPill icon={<Search size={20} />} text={translations.seo} className="top-40 -left-24" delay={0.8} />
               <FloatingPill icon={<TrendingUp size={20} />} text={translations.marketing} className="bottom-16 -right-20" delay={1.1} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
