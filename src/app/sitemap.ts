
import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/services/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.mojib.me';

    const staticRoutes = [
        '', 
        '/#about', 
        '/#services', 
        '/#experience', 
        '/#skills', 
        '/#portfolio',
        '/#gallery', 
        '/#pricing', 
        '/#blog', 
        '/#faq', 
        '/#contact'
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));
    
    // In a real app with a proper backend, you would fetch these from the DB.
    // For now, we use the local service.
    const posts = getBlogPosts();
    const postRoutes = posts.map(post => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));


    return [...staticRoutes, ...postRoutes];
}
