
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, DocumentData } from 'firebase/firestore';

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

export const getSettings = async (): Promise<Settings | null> => {
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
        // You might want to return default settings or null if it doesn't exist
        return null;
    }
};

export const saveSettings = async (settings: Settings): Promise<void> => {
    const settingsDocRef = doc(db, 'settings', SETTINGS_DOC_ID);
    // Use setDoc with merge: true to create the document if it doesn't exist,
    // or update it if it does.
    await setDoc(settingsDocRef, settings, { merge: true });
};
