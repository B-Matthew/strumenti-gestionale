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
import { db } from "@/firebase/firebase";

// 📂 Riferimento alla raccolta "dipendenti"
const dipendentiRef = collection(db, "dipendenti");

export function useDipendenti() {
  const dipendenti = ref([]);
  const loading = ref(false);

  // 🔄 Recupera i dipendenti in tempo reale
  const getDipendenti = () => {
    loading.value = true;
    onSnapshot(dipendentiRef, (snapshot) => {
      dipendenti.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      loading.value = false;
    });
  };

  // ➕ Aggiungi nuovo dipendente
  const aggiungiDipendente = async (dati) => {
    await addDoc(dipendentiRef, dati);
  };

  // ✏️ Modifica dipendente
  const modificaDipendente = async (id, dati) => {
    const docRef = doc(db, "dipendenti", id);
    await updateDoc(docRef, dati);
  };

  // ❌ Elimina dipendente
  const eliminaDipendente = async (id) => {
    const docRef = doc(db, "dipendenti", id);
    await deleteDoc(docRef);
  };

  return {
    dipendenti,
    loading,
    getDipendenti,
    aggiungiDipendente,
    modificaDipendente,
    eliminaDipendente,
  };
}
