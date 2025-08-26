
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, DocumentData, QueryDocumentSnapshot, serverTimestamp, orderBy, query } from 'firebase/firestore';

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
    const projectsCol = collection(db, 'projects');
    const q = query(projectsCol, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
     if (snapshot.empty && typeof window !== 'undefined') {
        const { getAuth } = await import('firebase/auth');
        const auth = getAuth();
        if (!auth.currentUser) {
            return [];
        }
    }
    return snapshot.docs.map(projectFromDoc);
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
