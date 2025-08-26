
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, DocumentData, QueryDocumentSnapshot, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export type Service = {
    id: string;
    icon: string;
    title: string;
    description: string;
    createdAt: any;
}

const initialServices = [
  {
    icon: 'Wand2',
    title: 'WordPress Development',
    description: 'Creating custom WordPress themes and plugins. I build responsive, fast, and user-friendly websites tailored to your specific needs.',
  },
  {
    icon: 'Bot',
    title: 'AI Integration',
    description: 'Integrating AI-powered features like chatbots and content generators into your website to enhance user engagement and automate tasks.',
  },
  {
    icon: 'Megaphone',
    title: 'Digital Marketing',
    description: 'Helping your business grow online through strategies like SEO, social media marketing, and content creation to increase your visibility and reach.',
  },
    {
    icon: 'Search',
    title: 'SEO Optimization',
    description: 'Improving your website’s ranking on search engines like Google to attract more organic traffic and potential customers.',
  },
  {
    icon: 'Palette',
    title: 'UI/UX & Graphics Design',
    description: 'Designing intuitive user interfaces and stunning graphics that provide a great user experience and make your brand stand out.',
  },
   {
    icon: 'Code',
    title: 'Basic Web Coding',
    description: 'I have a foundational understanding of coding and can assist with basic customizations using HTML, CSS, and JavaScript for your web projects.',
  },
];


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

export const getServices = async (): Promise<Service[]> => {
    const auth = getAuth();
    if (!auth.currentUser) {
        return initialServices.map((s, i) => ({ ...s, id: `service-${i}`, createdAt: new Date() }));
    }
    try {
        const servicesCol = collection(db, 'services');
        const q = query(servicesCol, orderBy('createdAt', 'asc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(serviceFromDoc);
    } catch (error) {
        console.error("Permission error fetching services, returning initial data", error);
        return initialServices.map((s, i) => ({ ...s, id: `service-${i}`, createdAt: new Date() }));
    }
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
