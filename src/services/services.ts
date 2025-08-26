
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, DocumentData, QueryDocumentSnapshot, serverTimestamp, orderBy, query } from 'firebase/firestore';

export type Service = {
    id: string;
    icon: string;
    title: string;
    description: string;
    createdAt: any;
}

const serviceFromDoc = (doc: QueryDocumentSnapshot<DocumentData>): Service => {
    const data = doc.data();
    return {
        id: doc.id,
        icon: data.icon,
        title: data.title,
        description: data.description,
        createdAt: data.createdAt,
    };
}

export const getServices = async (forceFetch = false): Promise<Service[]> => {
    if (!forceFetch && typeof window === 'undefined') {
        return []; // Don't fetch during server-side build
    }
    const servicesCol = collection(db, 'services');
    const q = query(servicesCol, orderBy('createdAt', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(serviceFromDoc);
};

export const addService = async (service: Omit<Service, 'id' | 'createdAt'>) => {
    const servicesCol = collection(db, 'services');
    const docRef = await addDoc(servicesCol, {
        ...service,
        createdAt: serverTimestamp(),
    });
    return docRef.id;
}

export const updateService = async (id: string, service: Partial<Omit<Service, 'id' | 'createdAt'>>) => {
    const serviceDoc = doc(db, 'services', id);
    await updateDoc(serviceDoc, service);
}

export const deleteService = async (id: string) => {
    const serviceDoc = doc(db, 'services', id);
    await deleteDoc(serviceDoc);
}
