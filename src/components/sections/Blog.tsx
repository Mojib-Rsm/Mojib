
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { useLanguage } from '@/context/LanguageContext';
import { getBlogPosts, BlogPost } from '@/services/blog';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export function Blog() {
  const { translations } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(getBlogPosts());
  }, []);

  if (posts.length === 0) {
    return null; // Don't render the section if there are no posts
  }

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
          {posts.slice(0, 3).map((post) => (
            <div key={post.id}>
              <Card className="overflow-hidden h-full flex flex-col bg-background border shadow-lg hover:shadow-primary/20">
                <CardHeader className="p-0">
                   <Image
                      src={post.image || 'https://placehold.co/600x400.png'}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover aspect-[3/2]"
                      data-ai-hint="blog post"
                      loading="lazy"
                    />
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                  <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button variant="link" className="p-0" asChild>
                    <Link href={`/blog/${post.id}`}>{translations.readMore}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
