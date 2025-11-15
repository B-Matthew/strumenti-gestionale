import { ref } from "vue";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
  Timestamp,
} from "firebase/firestore";
import { db, auth } from "@/firebase/firebase";

const attivitaRef = collection(db, "attivita");

export function useAttivita() {
  const attivita = ref([]);
  const loading = ref(false);

  /**
   * Registra una nuova attività
   * @param {string} tipo - Tipo di attività (es: 'strumento_aggiunto', 'strumento_assegnato')
   * @param {string} descrizione - Descrizione dell'attività
   * @param {Object} riferimenti - IDs degli oggetti coinvolti
   * @param {Object} metadata - Dati aggiuntivi (nomi, codici, etc.)
   */
  const registraAttivita = async (tipo, descrizione, riferimenti = {}, metadata = {}) => {
    try {
      const user = auth.currentUser;
      
      await addDoc(attivitaRef, {
        tipo,
        descrizione,
        timestamp: Timestamp.now(),
        userId: user?.uid || null,
        userEmail: user?.email || 'Sistema',
        riferimenti,
        metadata,
      });
    } catch (error) {
      console.error("Errore durante la registrazione dell'attività:", error);
    }
  };

  /**
   * Recupera le attività recenti (in tempo reale)
   * @param {number} numeroAttivita - Numero di attività da recuperare
   */
  const getAttivitaRecenti = (numeroAttivita = 10) => {
    loading.value = true;

    const q = query(
      attivitaRef,
      orderBy("timestamp", "desc"),
      limit(numeroAttivita)
    );

    return onSnapshot(q, (snapshot) => {
      attivita.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      loading.value = false;
    });
  };

  /**
   * Recupera tutte le attività (in tempo reale)
   */
  const getTutteAttivita = () => {
    loading.value = true;

    const q = query(attivitaRef, orderBy("timestamp", "desc"));

    return onSnapshot(q, (snapshot) => {
      attivita.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      loading.value = false;
    });
  };

  /**
   * Recupera attività filtrate per tipo
   * @param {string} tipo - Tipo di attività da filtrare
   */
  const getAttivitaPerTipo = (tipo) => {
    loading.value = true;

    const q = query(
      attivitaRef,
      where("tipo", "==", tipo),
      orderBy("timestamp", "desc")
    );

    return onSnapshot(q, (snapshot) => {
      attivita.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      loading.value = false;
    });
  };

  /**
   * Formatta il timestamp in una stringa leggibile
   * @param {Timestamp} timestamp - Timestamp Firebase
   * @returns {string} - Stringa formattata (es: "2 ore fa", "Ieri alle 14:30")
   */
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/D";

    const data = timestamp.seconds
      ? new Date(timestamp.seconds * 1000)
      : new Date(timestamp);
    const ora = new Date();
    const diff = ora - data;

    // Meno di 1 minuto
    if (diff < 60000) {
      return "Proprio ora";
    }
    // Meno di 1 ora
    if (diff < 3600000) {
      const minuti = Math.floor(diff / 60000);
      return `${minuti} minut${minuti > 1 ? "i" : "o"} fa`;
    }
    // Meno di 24 ore
    if (diff < 86400000) {
      const ore = Math.floor(diff / 3600000);
      return `${ore} or${ore > 1 ? "e" : "a"} fa`;
    }
    // Meno di 2 giorni
    if (diff < 172800000) {
      return `Ieri alle ${data.toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }
    // Più di 2 giorni
    return data.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return {
    attivita,
    loading,
    registraAttivita,
    getAttivitaRecenti,
    getTutteAttivita,
    getAttivitaPerTipo,
    formatTimestamp,
  };
}
