
'use client';

export type Project = {
    id: string;
    image: string;
    title: string;
    description: string;
    technologies: string[];
    link: string;
    category: string;
}

const LOCAL_STORAGE_KEY = 'projects';

const initialProjects: Project[] = [
    {
        id: '1',
        image: "https://www.mojib.me/uploads/1754959172720-Screenshot-842.webp",
        title: "Oftern News Website",
        description: "A comprehensive news portal with a custom theme and plugins.",
        technologies: ["WordPress", "PHP", "MySQL"],
        link: "#",
        category: 'Web'
    },
    {
        id: '2',
        image: "https://www.mojib.me/uploads/1754959260179-images.jpeg",
        title: "Oftern Shop (E-commerce)",
        description: "A full-featured e-commerce platform with a modern tech stack.",
        technologies: ["React", "Firebase", "Node.js"],
        link: "#",
        category: 'Web'
    },
];

export function getProjects(): Project[] {
  if (typeof window === 'undefined') {
    return initialProjects;
  }
  try {
    const storedProjects = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedProjects) {
      const projects = JSON.parse(storedProjects);
      return Array.isArray(projects) ? projects : initialProjects;
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialProjects));
      return initialProjects;
    }
  } catch (error) {
    console.error("Failed to read from localStorage", error);
    return initialProjects;
  }
}

export function saveProjects(projects: Project[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error("Failed to save to localStorage", error);
  }
}

    