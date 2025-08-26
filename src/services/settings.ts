
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, DocumentData } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export type SkillHighlight = {
    id: number;
    label: string;
    value: string;
}

export type Settings = {
    profileImage: string;
    bio: string;
    skills: SkillHighlight[];
}

const SETTINGS_DOC_ID = "main-settings";

const defaultSettings: Settings = {
    profileImage: '/uploads/about-sec.jpeg',
    bio: "I am a technology enthusiast with a strong passion for WordPress development, AI, and digital marketing. My goal is to create amazing online experiences that are not only visually appealing but also smart and effective. I enjoy solving problems and constantly learning new things to stay at the forefront of technology.",
    skills: [
        { id: 1, label: 'Experience', value: '3+ Years' },
        { id: 2, label: 'Projects', value: '50+ Completed' },
        { id: 3, label: 'Happy Clients', value: '40+' },
    ]
}

export const getSettings = async (): Promise<Settings | null> => {
    const auth = getAuth();
    if (!auth.currentUser) {
        return defaultSettings;
    }

    try {
        const settingsDocRef = doc(db, 'settings', SETTINGS_DOC_ID);
        const docSnap = await getDoc(settingsDocRef);

        if (docSnap.exists()) {
            const data = docSnap.data() as DocumentData;
            return {
                profileImage: data.profileImage,
                bio: data.bio,
                skills: data.skills || [],
            };
        } else {
            return defaultSettings;
        }
    } catch (error) {
        console.error("Permission error fetching settings, returning default values.", error);
        return defaultSettings;
    }
};

export const saveSettings = async (settings: Settings): Promise<void> => {
    const settingsDocRef = doc(db, 'settings', SETTINGS_DOC_ID);
    await setDoc(settingsDocRef, settings, { merge: true });
};
