
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, DocumentData, QueryDocumentSnapshot, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export type Project = {
    id: string;
    image: string;
    title: string;
    description: string;
    technologies: string[];
    link: string;
    category: string;
    createdAt: any;
}

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

const projectFromDoc = (doc: QueryDocumentSnapshot<DocumentData>): Project => {
    const data = doc.data();
    return {
        id: doc.id,
        image: data.image,
        title: data.title,
        description: data.description,
        technologies: data.technologies || [],
        link: data.link,
        category: data.category,
        createdAt: data.createdAt,
    };
}

export const getProjects = async (): Promise<Project[]> => {
    const auth = getAuth();
    if (!auth.currentUser) {
        return initialProjects.map((p, i) => ({...p, id: `project-${i}`, createdAt: new Date() }));
    }
    try {
        const projectsCol = collection(db, 'projects');
        const q = query(projectsCol, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(projectFromDoc);
    } catch (error) {
        console.error("Permission error fetching projects, returning initial data", error);
        return initialProjects.map((p, i) => ({...p, id: `project-${i}`, createdAt: new Date() }));
    }
};

export const addProject = async (project: Omit<Project, 'id' | 'createdAt'>) => {
    const projectsCol = collection(db, 'projects');
    const docRef = await addDoc(projectsCol, {
        ...project,
        createdAt: serverTimestamp(),
    });
    return docRef.id;
}

export const updateProject = async (id: string, project: Partial<Omit<Project, 'id' | 'createdAt'>>) => {
    const projectDoc = doc(db, 'projects', id);
    await updateDoc(projectDoc, project);
}

export const deleteProject = async (id: string) => {
    const projectDoc = doc(db, 'projects', id);
    await deleteDoc(projectDoc);
}
