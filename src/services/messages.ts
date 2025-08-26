
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, DocumentData, QueryDocumentSnapshot, updateDoc, serverTimestamp, orderBy, query } from 'firebase/firestore';

export type Message = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    status: 'Read' | 'Unread';
    createdAt: any;
}

const messageFromDoc = (doc: QueryDocumentSnapshot<DocumentData>): Message => {
    const data = doc.data();
    const date = data.createdAt?.toDate() ?? new Date();
    return {
        id: doc.id,
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        status: data.status,
        date: date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        createdAt: data.createdAt,
    };
}

export const getMessages = async (): Promise<Message[]> => {
    const messagesCol = collection(db, 'messages');
    const q = query(messagesCol, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(messageFromDoc);
};


export const updateMessageStatus = async (id: string, status: 'Read' | 'Unread') => {
    const messageDoc = doc(db, 'messages', id);
    await updateDoc(messageDoc, { status });
}
