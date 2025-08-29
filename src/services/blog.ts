
'use client';

export type BlogPost = {
  id: string;
  image: string;
  category: string;
  title: string;
  date: string; // ISO 8601 format
  content: string;
}

const LOCAL_STORAGE_KEY = 'blogPosts';

const initialPosts: BlogPost[] = [
  {
    id: '1',
    image: 'https://picsum.photos/seed/uiux/600/400',
    category: 'UI/UX',
    title: 'The 10 Best UI/UX Design Books to Read in 2024 for Aspiring Designers',
    date: new Date('2024-07-19T10:00:00Z').toISOString(),
    content: 'Discover the essential books that every UI/UX designer should have on their shelf this year. From foundational principles to advanced techniques, these reads will elevate your design game. As a web developer in Bangladesh, staying updated with global UI/UX trends is crucial for creating effective and user-friendly websites. A good design is key for SEO success.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.'
  },
  {
    id: '2',
    image: 'https://picsum.photos/seed/productivity/600/400',
    category: 'Productivity',
    title: 'How to Stay Creative and Productive as a Freelance Developer',
    date: new Date('2024-07-15T14:30:00Z').toISOString(),
    content: 'Balancing creativity with productivity can be challenging for any freelance developer. This article explores practical tips and workflows to help designers and developers stay inspired and efficient, especially for a WordPress developer in Bangladesh looking to manage multiple projects.\n\nVivamus in diam turpis. In condimentum maximus tristique. Maecenas non laoreet odio. Fusce lobortis porttitor purus, vel vestibulum libero pharetra vel. Pellentesque lorem augue, fermentum nec nibh et, fringilla sollicitudin orci. Integer pharetra magna non ante blandit lobortis.'
  },
   {
    id: '3',
    image: 'https://picsum.photos/seed/webdesign/600/400',
    category: 'Web Design',
    title: 'The Future of Web Design: AI and Other Trends to Watch in Bangladesh',
    date: new Date('2024-07-10T09:00:00Z').toISOString(),
    content: 'Web design is constantly evolving. We dive into the upcoming trends that are set to shape the digital landscape, from AI-driven design to immersive 3D experiences. As an AI specialist, I see huge potential for these technologies to revolutionize web development.\n\nDonec bibendum, dui ut pretium contributory, neque neque efficitur nunc, id pharetramed sem nisl et passed. Nulla facilisi. Proin vel ligula nec felis lorditor aliquam. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.'
  },
];

export function getBlogPosts(): BlogPost[] {
  if (typeof window === 'undefined') {
    return initialPosts;
  }
  try {
    const storedPosts = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedPosts) {
      return JSON.parse(storedPosts);
    } else {
      // If no posts in local storage, set the initial posts
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialPosts));
      return initialPosts;
    }
  } catch (error) {
    console.error("Failed to read from localStorage", error);
    return initialPosts;
  }
}

export function saveBlogPosts(posts: BlogPost[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error("Failed to save to localStorage", error);
  }
}
