
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Database, Loader2 } from 'lucide-react';

// Import services and types
import { getPosts, addPost, Post } from '@/services/posts';
import { getMessages, addMessage, Message } from '@/services/messages';
import { getProjects, addProject, Project } from '@/services/projects';
import { getServices, addService, Service } from '@/services/services';
import { getSettings, saveSettings, Settings } from '@/services/settings';
import { getTestimonials, addTestimonial, Testimonial } from '@/services/testimonials';

// Initial Data
const initialPosts = [
  {
    image: 'https://placehold.co/600x400.png',
    category: 'UI/UX',
    title: 'The 10 Best UI/UX Design Books to Read in 2024',
    content: 'This is the full content for the blog post about UI/UX books...'
  },
  {
    image: 'https://placehold.co/600x400.png',
    category: 'Productivity',
    title: 'How to Stay Creative and Productive as a Designer',
    content: 'This is the full content for the blog post about productivity...'
  },
];

const initialMessages = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    subject: 'Inquiry about WordPress Development',
    message: 'Hello, I was wondering if you are available for a new WordPress project. We need a custom theme developed for our corporate blog. Please let me know your availability and rates. Thanks!',
    status: 'Unread',
  },
  {
    name: 'Bob Williams',
    email: 'bob@example.com',
    subject: 'Question about AI Integration',
    message: 'I am interested in your AI integration services. Can you provide more details on how you integrate chatbots into existing websites? We are looking to improve customer support on our e-commerce site.',
    status: 'Read',
  },
];

const initialProjects = [
    {
        image: "https://www.mojib.me/uploads/1754959172720-Screenshot-842.webp",
        title: "Oftern News Website",
        description: "A comprehensive news portal with a custom theme and plugins.",
        technologies: ["WordPress", "PHP", "MySQL"],
        link: "#",
        category: 'Web'
    },
    {
        image: "https://www.mojib.me/uploads/1754959260179-images.jpeg",
        title: "Oftern Shop (E-commerce)",
        description: "A full-featured e-commerce platform with a modern tech stack.",
        technologies: ["React", "Firebase", "Node.js"],
        link: "#",
        category: 'Web'
    },
];

const initialServices = [
  {
    icon: 'Wand2',
    title: 'WordPress Development',
    description: 'Creating custom WordPress themes and plugins. I build responsive, fast, and user-friendly websites tailored to your specific needs.',
  },
  {
    icon: 'Bot',
    title: 'AI Integration',
    description: 'Integrating AI-powered features like chatbots and content generators into your website to enhance user engagement and automate tasks.',
  },
  {
    icon: 'Megaphone',
    title: 'Digital Marketing',
    description: 'Helping your business grow online through strategies like SEO, social media marketing, and content creation to increase your visibility and reach.',
  },
    {
    icon: 'Search',
    title: 'SEO Optimization',
    description: 'Improving your website’s ranking on search engines like Google to attract more organic traffic and potential customers.',
  },
  {
    icon: 'Palette',
    title: 'UI/UX & Graphics Design',
    description: 'Designing intuitive user interfaces and stunning graphics that provide a great user experience and make your brand stand out.',
  },
   {
    icon: 'Code',
    title: 'Basic Web Coding',
    description: 'I have a foundational understanding of coding and can assist with basic customizations using HTML, CSS, and JavaScript for your web projects.',
  },
];

const defaultSettings: Settings = {
    profileImage: '/uploads/about-sec.jpeg',
    bio: "I am a technology enthusiast with a strong passion for WordPress development, AI, and digital marketing. My goal is to create amazing online experiences that are not only visually appealing but also smart and effective. I enjoy solving problems and constantly learning new things to stay at the forefront of technology.",
    skills: [
        { id: 1, label: 'Experience', value: '3+ Years' },
        { id: 2, label: 'Projects', value: '50+ Completed' },
        { id: 3, label: 'Happy Clients', value: '40+' },
    ]
}

const initialTestimonials = [
  {
    image: "https://placehold.co/100x100.png",
    name: "John Doe",
    position: "CEO, Tech Solutions",
    text: "Working with Mojib was a fantastic experience. He delivered a high-quality website that exceeded our expectations. Highly recommended!",
  },
  {
    image: "https://placehold.co/100x100.png",
    name: "Jane Smith",
    position: "Marketing Manager, Creative Co.",
    text: "His expertise in digital marketing helped us double our online presence in just three months. A true professional with great insights.",
  },
];


export function SeedDatabaseButton() {
    const [isSeeding, setIsSeeding] = useState(false);
    const { toast } = useToast();

    const handleSeedDatabase = async () => {
        setIsSeeding(true);
        try {
            const seedPromises = [];

            // Seed Settings
            const settings = await getSettings();
            if (!settings || (settings.skills.length === 0 && !settings.bio)) {
                seedPromises.push(saveSettings(defaultSettings));
                 toast({ title: "Seeding Settings...", description: "Default settings are being added." });
            }

            // Seed Services
            const services = await getServices();
            if (services.length === 0) {
                seedPromises.push(...initialServices.map(s => addService(s as Omit<Service, 'id'|'createdAt'>)));
                toast({ title: "Seeding Services...", description: "Initial services are being added." });
            }

            // Seed Projects
            const projects = await getProjects();
            if (projects.length === 0) {
                seedPromises.push(...initialProjects.map(p => addProject(p as Omit<Project, 'id'|'createdAt'>)));
                 toast({ title: "Seeding Projects...", description: "Initial projects are being added." });
            }
            
            // Seed Testimonials
            const testimonials = await getTestimonials();
            if(testimonials.length === 0) {
                seedPromises.push(...initialTestimonials.map(t => addTestimonial(t as Omit<Testimonial, 'id'|'createdAt'>)));
                toast({ title: "Seeding Testimonials...", description: "Initial testimonials are being added." });
            }
            
            // Seed Posts
            const posts = await getPosts();
            if(posts.length === 0) {
                seedPromises.push(...initialPosts.map(p => addPost(p as Omit<Post, 'id'|'date'|'createdAt'>)));
                toast({ title: "Seeding Posts...", description: "Initial blog posts are being added." });
            }

            // Seed Messages
            const messages = await getMessages();
            if(messages.length === 0) {
                seedPromises.push(...initialMessages.map(m => addMessage(m as Omit<Message, 'id'|'date'|'createdAt'>)));
                toast({ title: "Seeding Messages...", description: "Initial messages are being added." });
            }

            if (seedPromises.length === 0) {
                toast({
                    title: "Database already seeded!",
                    description: "Your database already contains data.",
                });
                setIsSeeding(false);
                return;
            }

            await Promise.all(seedPromises);
            
            toast({
                title: "Database Seeded Successfully!",
                description: "Your Firestore database has been populated with initial data.",
            });

        } catch (error) {
            console.error("Error seeding database: ", error);
            toast({
                title: "Error Seeding Database",
                description: "Could not seed the database. Check console for errors.",
                variant: "destructive",
            });
        } finally {
            setIsSeeding(false);
        }
    };

    return (
        <Button onClick={handleSeedDatabase} disabled={isSeeding} size="lg">
            {isSeeding ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Database className="mr-2 h-4 w-4" />
            )}
            Seed Database
        </Button>
    );
}
