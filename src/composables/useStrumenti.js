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

// Importo useAttivita per registrare le attività
import { useAttivita } from "./useAttivita";

const strumentiRef = collection(db, "strumenti");

export function useStrumenti() {
  const strumenti = ref([]);
  const loading = ref(false);

  // Ottengo le funzioni per registrare le attività
  const { registraAttivita } = useAttivita();

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
      // Se lo stato è "assegnato" ma non c'è operatore, lo mettiamo disponibile
      stato:
        dati.stato === "assegnato" && !dati.operatoreAssegnato
          ? "disponibile"
          : dati.stato,
    };

    const docRef = await addDoc(strumentiRef, strumentoCompleto);

    // 📝 Registra attività
    await registraAttivita(
      "strumento_aggiunto",
      `Aggiunto nuovo strumento: ${dati.nome} (${dati.codice})`,
      { strumentoId: docRef.id },
      { strumentoNome: dati.nome, strumentoCodice: dati.codice }
    );
  };

  // ✏️ Modifica uno strumento
  const modificaStrumento = async (id, dati) => {
    const docRef = doc(db, "strumenti", id);
    await updateDoc(docRef, dati);

    // 📝 Registra attività
    await registraAttivita(
      "strumento_modificato",
      `Modificato strumento: ${dati.nome || "N/D"}`,
      { strumentoId: id },
      { strumentoNome: dati.nome, strumentoCodice: dati.codice }
    );
  };

  // 🔗 Assegna strumento a operatore
  const assegnaStrumento = async (strumentoId, operatoreId) => {
    const docRef = doc(db, "strumenti", strumentoId);

    // Recupera info strumento e operatore per l'attività
    const strumento = strumenti.value.find((s) => s.id === strumentoId);

    await updateDoc(docRef, {
      operatoreAssegnato: operatoreId,
      dataAssegnazione: new Date(),
      stato: "assegnato",
    });

    // 📝 Registra attività (l'operatoreNome verrà passato dal componente che chiama)
    await registraAttivita(
      "strumento_assegnato",
      `Assegnato strumento: ${strumento?.nome || "N/D"}`,
      { strumentoId, operatoreId },
      { strumentoNome: strumento?.nome, strumentoCodice: strumento?.codice }
    );
  };

  // 🔓 Libera strumento da operatore
  const liberaStrumento = async (strumentoId) => {
    const docRef = doc(db, "strumenti", strumentoId);

    // Recupera info strumento per l'attività
    const strumento = strumenti.value.find((s) => s.id === strumentoId);

    await updateDoc(docRef, {
      operatoreAssegnato: null,
      dataAssegnazione: null,
      stato: "disponibile",
    });

    // 📝 Registra attività
    await registraAttivita(
      "strumento_liberato",
      `Liberato strumento: ${strumento?.nome || "N/D"}`,
      { strumentoId },
      { strumentoNome: strumento?.nome, strumentoCodice: strumento?.codice }
    );
  };

  // ❌ Elimina uno strumento
  const eliminaStrumento = async (id) => {
    // Recupera info strumento prima di eliminarlo
    const strumento = strumenti.value.find((s) => s.id === id);

    const docRef = doc(db, "strumenti", id);
    await deleteDoc(docRef);

    // 📝 Registra attività
    await registraAttivita(
      "strumento_eliminato",
      `Eliminato strumento: ${strumento?.nome || "N/D"}`,
      { strumentoId: id },
      { strumentoNome: strumento?.nome, strumentoCodice: strumento?.codice }
    );
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
