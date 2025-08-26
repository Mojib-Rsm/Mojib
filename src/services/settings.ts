
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, DocumentData } from 'firebase/firestore';

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

export const getSettings = async (forceFetch = false): Promise<Settings | null> => {
    if (!forceFetch && typeof window === 'undefined') {
        return null; // Don't fetch during server-side build
    }
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
        return null;
    }
};

export const saveSettings = async (settings: Settings): Promise<void> => {
    const settingsDocRef = doc(db, 'settings', SETTINGS_DOC_ID);
    await setDoc(settingsDocRef, settings, { merge: true });
};
