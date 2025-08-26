
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export type Service = {
    id: string;
    icon: string;
    title: string;
    description: string;
}

const serviceFromDoc = (doc: QueryDocumentSnapshot<DocumentData>): Service => {
    const data = doc.data();
    return {
        id: doc.id,
        icon: data.icon,
        title: data.title,
        description: data.description,
    };
}

export const getServices = async (): Promise<Service[]> => {
    const servicesCol = collection(db, 'services');
    const snapshot = await getDocs(servicesCol);
    return snapshot.docs.map(serviceFromDoc);
};

export const addService = async (service: Omit<Service, 'id'>) => {
    const servicesCol = collection(db, 'services');
    const docRef = await addDoc(servicesCol, service);
    return docRef.id;
}

export const updateService = async (id: string, service: Partial<Omit<Service, 'id'>>) => {
    const serviceDoc = doc(db, 'services', id);
    await updateDoc(serviceDoc, service);
}

export const deleteService = async (id: string) => {
    const serviceDoc = doc(db, 'services', id);
    await deleteDoc(serviceDoc);
}
