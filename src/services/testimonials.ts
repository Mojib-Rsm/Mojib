
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, DocumentData, QueryDocumentSnapshot, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export type Testimonial = {
    id: string;
    image: string;
    name: string;
    position: string;
    text: string;
    createdAt: any;
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
    const auth = getAuth();
    if (!auth.currentUser) {
        return initialTestimonials.map((t, i) => ({ ...t, id: `testimonial-${i}`, createdAt: new Date() }));
    }
    try {
        const testimonialsCol = collection(db, 'testimonials');
        const q = query(testimonialsCol, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(testimonialFromDoc);
    } catch (error) {
        console.error("Permission error fetching testimonials, returning initial data", error);
        return initialTestimonials.map((t, i) => ({ ...t, id: `testimonial-${i}`, createdAt: new Date() }));
    }
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
