'use client';

import { useLanguage } from '@/contexts/LanguageProvider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function Faq() {
  const { t } = useLanguage();

  const faqs = [
    {
      question: t('faq1_q'),
      answer: t('faq1_a'),
    },
    {
      question: t('faq2_q'),
      answer: t('faq2_a'),
    },
    {
      question: t('faq3_q'),
      answer: t('faq3_a'),
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t('faqTitle')}</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Have questions? Here are some answers to the most common ones.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="glass-card mb-4 rounded-lg px-4">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
