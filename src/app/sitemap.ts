
import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/services/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.mojib.me';

    const staticRoutes = [
        { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
        { url: `${baseUrl}/#about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/#services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/#experience`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/#skills`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/#portfolio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/#gallery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/#pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/#blog`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/#faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/#contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    ];
    
    // In a real app with a proper backend, you would fetch these from the DB.
    // For now, we use the local service.
    const posts = getBlogPosts();
    const postRoutes = posts.map(post => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly',
        priority: 0.9,
    }));


    return [...staticRoutes, ...postRoutes];
}
