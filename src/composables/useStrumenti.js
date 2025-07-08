import { ref } from "vue";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/firebase"; // Assicurati che il file firebase.js esporti `db`

const strumentiRef = collection(db, "strumenti");

export function useStrumenti() {
  const strumenti = ref([]);
  const loading = ref(false);

  // 🔄 Recupera in tempo reale tutti gli strumenti
  const getStrumenti = () => {
    loading.value = true;
	
    onSnapshot(strumentiRef, (snapshot) => {
      strumenti.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      loading.value = false;
    });
  };

  // ➕ Aggiungi nuovo strumento
  const aggiungiStrumento = async (dati) => {
    await addDoc(strumentiRef, dati);
  };

  // ✏️ Modifica uno strumento
  const modificaStrumento = async (id, dati) => {
    const docRef = doc(db, "strumenti", id);
    await updateDoc(docRef, dati);
  };

  // ❌ Elimina uno strumento
  const eliminaStrumento = async (id) => {
    const docRef = doc(db, "strumenti", id);
    await deleteDoc(docRef);
  };

  return {
    strumenti,
    loading,
    getStrumenti,
    aggiungiStrumento,
    modificaStrumento,
    eliminaStrumento,
  };
}
