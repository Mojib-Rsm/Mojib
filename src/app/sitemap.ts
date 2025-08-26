import { MetadataRoute } from 'next'

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

    // NOTE: Temporarily removed dynamic routes to fix build issues due to Firebase permissions.
    // In a production environment with proper CI/CD setup, you would re-enable this.
    // const posts = await getPosts();
    // const postRoutes = posts.map(post => ({
    //     url: `${baseUrl}/blog/${post.id}`,
    //     lastModified: post.createdAt?.toDate() || new Date(),
    //     changeFrequency: 'weekly',
    //     priority: 0.7,
    // }));

    // const projects = await getProjects();
    // const projectRoutes = projects.map(project => ({
    //     url: `${baseUrl}/portfolio/${project.id}`,
    //     lastModified: project.createdAt?.toDate() || new Date(),
    //     changeFrequency: 'monthly',
    //     priority: 0.6,
    // }));

    // return [...staticRoutes, ...postRoutes, ...projectRoutes];
    return [...staticRoutes];
}
