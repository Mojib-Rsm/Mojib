
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, DocumentData, QueryDocumentSnapshot, serverTimestamp, orderBy, query } from 'firebase/firestore';

export type Post = {
    id: string;
    image: string;
    category: string;
    title: string;
    date: string;
    content: string;
    createdAt: any;
}

const postFromDoc = (doc: QueryDocumentSnapshot<DocumentData>): Post => {
    const data = doc.data();
    const date = data.createdAt?.toDate() ?? new Date();
    return {
        id: doc.id,
        image: data.image,
        category: data.category,
        title: data.title,
        content: data.content,
        date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        createdAt: data.createdAt
    };
}

export const getPosts = async (): Promise<Post[]> => {
    const postsCol = collection(db, 'posts');
    const q = query(postsCol, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty && typeof window !== 'undefined') {
        const { getAuth } = await import('firebase/auth');
        const auth = getAuth();
        if (!auth.currentUser) {
            // Return empty array if not logged in and collection is empty,
            // allowing the frontend to decide to seed.
            return [];
        }
    }
    return snapshot.docs.map(postFromDoc);
};

export const addPost = async (post: Omit<Post, 'id' | 'date' | 'createdAt'>) => {
    const postsCol = collection(db, 'posts');
    const docRef = await addDoc(postsCol, {
        ...post,
        createdAt: serverTimestamp(),
    });
    return docRef.id;
}

export const updatePost = async (id: string, post: Partial<Omit<Post, 'id' | 'date' | 'createdAt'>>) => {
    const postDoc = doc(db, 'posts', id);
    await updateDoc(postDoc, post);
}

export const deletePost = async (id: string) => {
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc);
}
