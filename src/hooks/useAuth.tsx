
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuth, signInWithEmailAndPassword, onIdTokenChanged, User, signOut, IdTokenResult } from 'firebase/auth';
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
}


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onIdTokenChanged is more appropriate than onAuthStateChanged for session management
    const unsubscribe = onIdTokenChanged(auth, async (newUser) => {
      setLoading(true);
      setUser(newUser);
      const idToken = newUser ? await newUser.getIdToken() : null;
      await setSessionCookie(idToken);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    // The onIdTokenChanged listener will handle the rest (setting user and cookie)
  };

  const logout = async () => {
    await signOut(auth);
     // The onIdTokenChanged listener will handle the rest (clearing user and cookie)
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
