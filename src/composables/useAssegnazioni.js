import { ref, computed, onMounted } from "vue";
import { useStrumenti } from "./useStrumenti";
import { useOperatori } from "./useOperatori";

export function useAssegnazioni() {
  const { strumenti, assegnaStrumento, liberaStrumento, getStrumenti } =
    useStrumenti();
  const { operatori, getOperatori } = useOperatori();

  // Auto-caricamento dati
  onMounted(async () => {
    await getStrumenti();
    await getOperatori();
  });

  // 📊 Statistiche computed
  const strumentiAssegnati = computed(() =>
    strumenti.value.filter(
      (s) => s.stato === "assegnato" && s.operatoreAssegnato
    )
  );

  const strumentiDisponibili = computed(() =>
    strumenti.value.filter(
      (s) => s.stato === "disponibile" || !s.operatoreAssegnato
    )
  );

  // 🔍 Trova strumenti di un operatore
  const getStrumentiOperatore = (operatoreId) => {
    return strumenti.value.filter((s) => s.operatoreAssegnato === operatoreId);
  };

  // 🔍 Trova operatore di uno strumento
  const getOperatoreStrumento = (strumentoId) => {
    const strumento = strumenti.value.find((s) => s.id === strumentoId);
    if (!strumento?.operatoreAssegnato) return null;

    return operatori.value.find((o) => o.id === strumento.operatoreAssegnato);
  };

  // 📋 Ottieni dettagli completi delle assegnazioni
  const getAssegnazioniComplete = () => {
    return strumentiAssegnati.value.map((strumento) => {
      const operatore = operatori.value.find(
        (o) => o.id === strumento.operatoreAssegnato
      );
      return {
        strumento,
        operatore,
        dataAssegnazione: strumento.dataAssegnazione,
      };
    });
  };

  // 🔄 Sposta strumento da un operatore a un altro
  const trasferiscaStrumento = async (strumentoId, nuovoOperatoreId) => {
    await assegnaStrumento(strumentoId, nuovoOperatoreId);
  };

  return {
    strumentiAssegnati,
    strumentiDisponibili,
    getStrumentiOperatore,
    getOperatoreStrumento,
    getAssegnazioniComplete,
    trasferiscaStrumento,
    assegnaStrumento,
    liberaStrumento,
  };
}
