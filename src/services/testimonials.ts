
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, DocumentData, QueryDocumentSnapshot, serverTimestamp, orderBy, query } from 'firebase/firestore';

export type Testimonial = {
    id: string;
    image: string;
    name: string;
    position: string;
    text: string;
    createdAt: any;
}

const testimonialFromDoc = (doc: QueryDocumentSnapshot<DocumentData>): Testimonial => {
    const data = doc.data();
    return {
        id: doc.id,
        image: data.image,
        name: data.name,
        position: data.position,
        text: data.text,
        createdAt: data.createdAt,
    };
}

export const getTestimonials = async (): Promise<Testimonial[]> => {
    const testimonialsCol = collection(db, 'testimonials');
    const q = query(testimonialsCol, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty && typeof window !== 'undefined') {
        const { getAuth } = await import('firebase/auth');
        const auth = getAuth();
        if (!auth.currentUser) {
            return [];
        }
    }
    return snapshot.docs.map(testimonialFromDoc);
};

export const addTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'createdAt'>) => {
    const testimonialsCol = collection(db, 'testimonials');
    const docRef = await addDoc(testimonialsCol, {
        ...testimonial,
        createdAt: serverTimestamp(),
    });
    return docRef.id;
}

export const updateTestimonial = async (id: string, testimonial: Partial<Omit<Testimonial, 'id' | 'createdAt'>>) => {
    const testimonialDoc = doc(db, 'testimonials', id);
    await updateDoc(testimonialDoc, testimonial);
}

export const deleteTestimonial = async (id: string) => {
    const testimonialDoc = doc(db, 'testimonials', id);
    await deleteDoc(testimonialDoc);
}
