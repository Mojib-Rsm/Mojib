'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const faqData = [
  {
    question: 'What is your design process like?',
    answer:
      'My design process is collaborative and iterative. It starts with understanding your goals, followed by research, wireframing, prototyping, and user testing. I work closely with you to ensure the final design meets your expectations.',
  },
  {
    question: 'Do you offer website maintenance services?',
    answer:
      'Yes, I offer website maintenance packages to ensure your site remains up-to-date, secure, and performs optimally. Contact me to discuss a plan that fits your needs.',
  },
  {
    question: 'How long does it take to build a website?',
    answer:
      'The timeline for a website project varies depending on its complexity. A basic website can take 2-4 weeks, while a more complex e-commerce site could take 6-12 weeks. We can set a timeline after discussing your specific requirements.',
  },
  {
    question: 'Can you help with SEO for my existing website?',
    answer:
      "Absolutely. I can audit your current website and implement a comprehensive SEO strategy to improve your site's visibility on search engines and attract more organic traffic.",
  },
  {
    question: 'What technologies do you specialize in?',
    answer:
      'I specialize in a range of technologies including WordPress, Laravel, React, and Next.js for web development, as well as Figma for UI/UX design. I choose the best tools for the job to deliver high-quality results.',
  },
];

export function Faq() {
  const { translations } = useLanguage();
    const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      id="faq" 
      className="bg-muted py-20 md:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container max-w-screen-lg mx-auto">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-4xl font-bold">{translations.faqTitle}</h2>
          <p className="text-muted-foreground mt-2">
            {translations.faqSubtitle}
          </p>
        </motion.div>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <motion.div key={index} variants={itemVariants}>
              <AccordionItem value={`item-${index}`} className='bg-background rounded-lg px-4 mb-2 border shadow-sm'>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
}
