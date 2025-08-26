import { MetadataRoute } from 'next'
import { getPosts } from '@/services/posts';
import { getProjects } from '@/services/projects';

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

    const posts = await getPosts();
    const postRoutes = posts.map(post => ({
        url: `${baseUrl}/blog/${post.id}`, // Assuming a blog detail page exists at this URL
        lastModified: post.createdAt?.toDate() || new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    const projects = await getProjects();
    const projectRoutes = projects.map(project => ({
        url: `${baseUrl}/portfolio/${project.id}`, // Assuming a portfolio detail page exists at this URL
        lastModified: project.createdAt?.toDate() || new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    return [...staticRoutes, ...postRoutes, ...projectRoutes];
}
