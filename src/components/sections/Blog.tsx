'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const blogData = [
  {
    image: 'https://placehold.co/600x400.png',
    category: 'UI/UX',
    title: 'The 10 Best UI/UX Design Books to Read in 2024',
    date: 'July 19, 2024',
    hint: 'books stack'
  },
  {
    image: 'https://placehold.co/600x400.png',
    category: 'Productivity',
    title: 'How to Stay Creative and Productive as a Designer',
    date: 'July 15, 2024',
    hint: 'desk setup'
  },
  {
    image: 'https://placehold.co/600x400.png',
    category: 'Web Design',
    title: 'The Future of Web Design: Trends to Watch',
    date: 'July 10, 2024',
    hint: 'futuristic interface'
  },
];

export function Blog() {
  const { translations } = useLanguage();
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
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
      id="blog" 
      className="bg-muted/40 py-20 md:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container max-w-screen-xl mx-auto">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-4xl font-bold">{translations.blogTitle}</h2>
          <p className="text-muted-foreground mt-2">{translations.blogSubtitle}</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {blogData.map((post, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden h-full flex flex-col glass-card">
                <CardHeader className="p-0">
                   <Image
                      src={post.image}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                      data-ai-hint={post.hint}
                      loading="lazy"
                    />
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                  <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button variant="link" className="p-0">{translations.readMore}</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
