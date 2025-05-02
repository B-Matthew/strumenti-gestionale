import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB8L_fHX7jnPzT8LYem1iQrV-xV4-H4weI",
    authDomain: "strumenti-gestionale.firebaseapp.com",
    projectId: "strumenti-gestionale",
    storageBucket: "strumenti-gestionale.firebasestorage.app",
    messagingSenderId: "586871589154",
    appId: "1:586871589154:web:c25a6349862f90da6cbd7b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);