'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export function Contact() {
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
      id="contact" 
      className="py-20 md:py-28 bg-muted"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container max-w-screen-xl mx-auto">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-4xl font-bold">{translations.contactTitle}</h2>
          <p className="text-muted-foreground mt-2">
            {translations.contactSubtitle}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div variants={itemVariants}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>{translations.sendMessageTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input placeholder={translations.yourName} />
                  <Input type="email" placeholder={translations.yourEmail} />
                  <Input placeholder={translations.yourPhone} />
                  <Input placeholder={translations.subject} />
                  <Textarea placeholder={translations.yourMessage} rows={5} />
                  <Button type="submit" size="lg" className="w-full">
                    {translations.sendMessage}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-2xl font-semibold">{translations.contactInformation}</h3>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold">{translations.email}</h4>
                <a href="mailto:mojibrsm@gmail.com" className="text-muted-foreground hover:text-primary">
                  mojibrsm@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold">{translations.phone}</h4>
                <a href="tel:+8801601519007" className="text-muted-foreground hover:text-primary">
                  +8801601519007
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold">{translations.location}</h4>
                <p className="text-muted-foreground">Cox's Bazar, Bangladesh</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
