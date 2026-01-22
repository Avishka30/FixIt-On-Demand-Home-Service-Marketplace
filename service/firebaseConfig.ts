import { initializeApp } from 'firebase/app';
// @ts-ignore
import { initializeAuth, getReactNativePersistence, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBLZZgq0E6doBv4eJlrW67-uSU8AyNXD9k",
  authDomain: "fixit-4c3c3.firebaseapp.com",
  projectId: "fixit-4c3c3",
  storageBucket: "fixit-4c3c3.firebasestorage.app",
  messagingSenderId: "1006222008594",
  appId: "1:1006222008594:web:5e4d908aa79e30aa9353cb",
  measurementId: "G-QKT0BHQQF6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const auth: Auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db: Firestore = getFirestore(app);