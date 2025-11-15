import { ref, computed, onMounted } from "vue";
import { useStrumenti } from "./useStrumenti";
import { useOperatori } from "./useOperatori";
import { useAttivita } from "./useAttivita";

export function useAssegnazioni() {
  const { strumenti, assegnaStrumento, liberaStrumento, getStrumenti } =
    useStrumenti();
  const { operatori, getOperatori } = useOperatori();
  const { registraAttivita } = useAttivita();

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
    // Recupera info per l'attività
    const strumento = strumenti.value.find((s) => s.id === strumentoId);
    const vecchioOperatore = operatori.value.find(
      (o) => o.id === strumento?.operatoreAssegnato
    );
    const nuovoOperatore = operatori.value.find(
      (o) => o.id === nuovoOperatoreId
    );

    await assegnaStrumento(strumentoId, nuovoOperatoreId);

    // 📝 Registra attività di trasferimento
    await registraAttivita(
      "strumento_trasferito",
      `Trasferito strumento "${strumento?.nome}" da ${vecchioOperatore?.nome} ${vecchioOperatore?.cognome} a ${nuovoOperatore?.nome} ${nuovoOperatore?.cognome}`,
      {
        strumentoId,
        vecchioOperatoreId: strumento?.operatoreAssegnato,
        nuovoOperatoreId,
      },
      {
        strumentoNome: strumento?.nome,
        strumentoCodice: strumento?.codice,
        vecchioOperatoreNome: `${vecchioOperatore?.nome} ${vecchioOperatore?.cognome}`,
        nuovoOperatoreNome: `${nuovoOperatore?.nome} ${nuovoOperatore?.cognome}`,
      }
    );
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
