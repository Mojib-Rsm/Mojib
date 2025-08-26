
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

  return (
    <section 
      id="blog" 
      className="bg-muted py-20 md:py-28"
    >
      <div className="container max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">{translations.blogTitle}</h2>
          <p className="text-muted-foreground mt-2">{translations.blogSubtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {blogData.map((post, index) => (
            <div key={index}>
              <Card className="overflow-hidden h-full flex flex-col bg-background border shadow-lg hover:shadow-primary/20">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
