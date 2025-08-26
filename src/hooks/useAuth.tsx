
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuth, signInWithEmailAndPassword, onIdTokenChanged, User, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const auth = getAuth(app);

// This function sends the ID token to a server-side endpoint to create a session cookie.
async function setSessionCookie(idToken: string | null) {
    const endpoint = '/api/auth/session';
    try {
        if (idToken) {
            // User is logging in, create a session
            await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                },
            });
        } else {
            // User is logging out, destroy the session
            await fetch(endpoint, {
                method: 'DELETE',
            });
        }
    } catch (error) {
        console.error("Failed to set session cookie:", error);
    }
}


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (newUser) => {
        setUser(newUser);
        setLoading(false); 
        
        const idToken = newUser ? await newUser.getIdToken() : null;
        await setSessionCookie(idToken);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/operation-not-allowed' || error.code === 'auth/invalid-credential') {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
            } catch (createError: any) {
                 console.error("User creation failed:", createError);
                 throw error;
            }
        } else {
            throw error;
        }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };
  
  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
