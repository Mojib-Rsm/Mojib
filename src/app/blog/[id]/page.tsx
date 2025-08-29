
import { getBlogPosts, BlogPost } from '@/services/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const post = getBlogPosts().find(p => p.id === id);

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const previousImages = (await parent).openGraph?.images || []
  const description = post.content.substring(0, 160).replace(/\s\S*$/, '...');

  return {
    title: `${post.title} | Mojib Rsm Blog`,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      images: [post.image, ...previousImages],
      type: 'article',
      publishedTime: post.date,
      authors: ['Mojib Rsm'],
    },
    twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: description,
        images: [post.image],
    }
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPosts().find(p => p.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container max-w-screen-md mx-auto py-12 md:py-20">
      <article className="space-y-8">
        <header className="space-y-4 text-center">
          <Badge variant="secondary">{post.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{post.title}</h1>
          <p className="text-muted-foreground">
            Published on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>

        <Image
          src={post.image || 'https://placehold.co/1200x600.png'}
          alt={post.title}
          width={1200}
          height={600}
          className="rounded-lg object-cover w-full aspect-video"
          priority
        />
        
        <div 
          className="prose dark:prose-invert max-w-none text-lg mx-auto"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
        />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
 
  return posts.map((post) => ({
    id: post.id,
  }))
}
