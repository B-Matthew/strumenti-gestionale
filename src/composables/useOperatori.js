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

// 📂 Riferimento alla raccolta "operatori"
const operatoriRef = collection(db, "operatori");

export function useOperatori() {
  const operatori = ref([]);
  const loading = ref(false);

  // 🔄 Recupera i operatori in tempo reale
  const getOperatori = () => {
    loading.value = true;
    onSnapshot(operatoriRef, (snapshot) => {
      operatori.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      loading.value = false;
    });
  };

  // ➕ Aggiungi nuovo operatore
  const aggiungiOperatore = async (dati) => {
    await addDoc(operatoriRef, dati);
  };

  // ✏️ Modifica operatore
  const modificaOperatore = async (id, dati) => {
    const docRef = doc(db, "operatori", id);
    await updateDoc(docRef, dati);
  };

  // ❌ Elimina operatore
  const eliminaOperatore = async (id) => {
    const docRef = doc(db, "operatori", id);
    await deleteDoc(docRef);
  };

  return {
    operatori,
    loading,
    getOperatori,
    aggiungiOperatore,
    modificaOperatore,
    eliminaOperatore,
  };
}
