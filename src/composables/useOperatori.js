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

// Importo useAttivita per registrare le attività
import { useAttivita } from "./useAttivita";

// 📂 Riferimento alla raccolta "operatori"
const operatoriRef = collection(db, "operatori");

export function useOperatori() {
  const operatori = ref([]);
  const loading = ref(false);

  // Ottengo le funzioni per registrare le attività
  const { registraAttivita } = useAttivita();

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
    const docRef = await addDoc(operatoriRef, dati);

    // 📝 Registra attività
    await registraAttivita(
      "operatore_aggiunto",
      `Aggiunto nuovo operatore: ${dati.nome} ${dati.cognome}`,
      { operatoreId: docRef.id },
      {
        operatoreNome: `${dati.nome} ${dati.cognome}`,
        operatoreRuolo: dati.ruolo,
      }
    );
  };

  // ✏️ Modifica operatore
  const modificaOperatore = async (id, dati) => {
    const docRef = doc(db, "operatori", id);
    await updateDoc(docRef, dati);

    // 📝 Registra attività
    await registraAttivita(
      "operatore_modificato",
      `Modificato operatore: ${dati.nome || "N/D"} ${dati.cognome || "N/D"}`,
      { operatoreId: id },
      {
        operatoreNome: `${dati.nome} ${dati.cognome}`,
        operatoreRuolo: dati.ruolo,
      }
    );
  };

  // ❌ Elimina operatore
  const eliminaOperatore = async (id) => {
    // Recupera info operatore prima di eliminarlo
    const operatore = operatori.value.find((o) => o.id === id);

    const docRef = doc(db, "operatori", id);
    await deleteDoc(docRef);

    // 📝 Registra attività
    await registraAttivita(
      "operatore_eliminato",
      `Eliminato operatore: ${operatore?.nome || "N/D"} ${
        operatore?.cognome || "N/D"
      }`,
      { operatoreId: id },
      {
        operatoreNome: `${operatore?.nome} ${operatore?.cognome}`,
        operatoreRuolo: operatore?.ruolo,
      }
    );
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
