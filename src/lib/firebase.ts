

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6EMUTZfPvXE-44t7QDU0DFNzfm_S8ocU",
  authDomain: "oftern-shop.firebaseapp.com",
  databaseURL: "https://oftern-shop-default-rtdb.firebaseio.com",
  projectId: "oftern-shop",
  storageBucket: "oftern-shop.firebasestorage.app",
  messagingSenderId: "365492805811",
  appId: "1:365492805811:web:5a4483ba84d9f115a810c6",
  measurementId: "G-XQMMG3MFJH"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
