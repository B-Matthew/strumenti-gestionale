import { ref } from "vue";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

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

  // 🔄 Recupera strumenti assegnati a un operatore specifico
  const getStrumentiByOperatore = (operatoreId) => {
    const strumentiOperatore = ref([]);
    loading.value = true;

    const q = query(
      strumentiRef,
      where("operatoreAssegnato", "==", operatoreId)
    );

    onSnapshot(q, (snapshot) => {
      strumentiOperatore.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      loading.value = false;
    });

    return strumentiOperatore;
  };

  // ➕ Aggiungi nuovo strumento
  const aggiungiStrumento = async (dati) => {
    const strumentoCompleto = {
      ...dati,
      operatoreAssegnato: null,
      dataAssegnazione: null,
      // Se lo stato è "assegnato" ma non c'è operatore, lo mettiamo disponibile
      stato:
        dati.stato === "assegnato" && !dati.operatoreAssegnato
          ? "disponibile"
          : dati.stato,
    };

    await addDoc(strumentiRef, strumentoCompleto);
  };

  // ✏️ Modifica uno strumento
  const modificaStrumento = async (id, dati) => {
    const docRef = doc(db, "strumenti", id);
    await updateDoc(docRef, dati);
  };

  // 🔗 Assegna strumento a operatore
  const assegnaStrumento = async (strumentoId, operatoreId) => {
    const docRef = doc(db, "strumenti", strumentoId);
    await updateDoc(docRef, {
      operatoreAssegnato: operatoreId,
      dataAssegnazione: new Date(),
      stato: "assegnato",
    });
  };

  // 🔓 Libera strumento da operatore
  const liberaStrumento = async (strumentoId) => {
    const docRef = doc(db, "strumenti", strumentoId);
    await updateDoc(docRef, {
      operatoreAssegnato: null,
      dataAssegnazione: null,
      stato: "disponibile",
    });
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
    getStrumentiByOperatore,
    aggiungiStrumento,
    modificaStrumento,
    assegnaStrumento,
    liberaStrumento,
    eliminaStrumento,
  };
}
