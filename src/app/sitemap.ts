
import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/services/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.mojib.me';

    const staticRoutes = [
        { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ];
    
    const posts = getBlogPosts();
    const postRoutes = posts.map(post => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly',
        priority: 0.9,
    }));


    return [...staticRoutes, ...postRoutes];
}
