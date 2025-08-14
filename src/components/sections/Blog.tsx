'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

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
  return (
    <section id="blog" className="bg-muted/40 py-20 md:py-28">
      <div className="container max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">From My Blog</h2>
          <p className="text-muted-foreground mt-2">Latest news, articles, and resources.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {blogData.map((post, index) => (
            <Card key={index} className="overflow-hidden animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
              <CardHeader className="p-0">
                 <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    data-ai-hint={post.hint}
                  />
              </CardHeader>
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button variant="link" className="p-0">Read More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
