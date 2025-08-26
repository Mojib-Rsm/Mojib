
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
    // During build time (SSR), there's no browser environment, so `window` is undefined.
    // We fall back to initial data to avoid Firebase permission errors during build.
    if (typeof window === 'undefined') {
        return initialPosts.map((p, i) => ({ ...p, id: `post-${i}`, date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), createdAt: new Date() }));
    }
    
    try {
        const { getAuth } = await import('firebase/auth');
        const auth = getAuth();
        if (!auth.currentUser) {
            return initialPosts.map((p, i) => ({ ...p, id: `post-${i}`, date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), createdAt: new Date() }));
        }
        const postsCol = collection(db, 'posts');
        const q = query(postsCol, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(postFromDoc);
    } catch (error) {
        console.error("Permission error fetching posts, returning initial data", error);
        return initialPosts.map((p, i) => ({ ...p, id: `post-${i}`, date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), createdAt: new Date() }));
    }
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
