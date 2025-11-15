<template>
	<div class="min-h-screen bg-gray-200">
		<!-- Main Content -->
		<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<!-- Intestazione pagina -->
			<div class="px-4 py-6 sm:px-0 mb-6">
				<div class="rounded-2xl shadow-md bg-primary overflow-hidden relative">
					<div class="px-6 py-8 md:px-10 md:py-10 text-white">
						<h1 class="text-3xl font-bold tracking-tight">
							Gestione Strumenti
						</h1>
						<p class="mt-2 max-w-2xl text-blue-100">
							Gestisci facilmente i tuoi strumenti con funzionalità di aggiunta, modifica, eliminazione e
							assegnazione operatori.
						</p>
						<div class="mt-6 flex space-x-4">
							<button @click="showForm.openModal()" class="btn_base_v2">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
									fill="currentColor">
									<path fill-rule="evenodd"
										d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
										clip-rule="evenodd" />
								</svg>
								Aggiungi Strumento
							</button>
						</div>
					</div>
				</div>
			</div>

			<StatoStrumentiBlock />

			<!-- Lista strumenti con le card -->
			<div class="px-4 sm:px-0">
				<div class="bg-white shadow rounded-lg overflow-hidden">
					<div
						class="px-4 py-5 border-b border-gray-200 sm:px-6 flex flex-col md:flex-row justify-between items-start md:items-center">
						<h3 class="text-lg leading-6 font-medium text-gray-900 mb-4 md:mb-0">
							Elenco Strumenti
						</h3>
						<div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
							<input type="text" placeholder="Cerca strumento..." v-model="filtri.ricerca"
								class="text-gray-900 min-w-[300px] shadow-sm block w-full sm:text-sm border-[1px] border-gray-300 rounded-md p-2">
							<select v-model="filtri.stato"
								class="text-gray-900 shadow-sm block w-full sm:text-sm border-[1px] border-gray-300 rounded-md p-2">
								<option value="" selected>Tutti gli stati</option>
								<option value="disponibile">Disponibile</option>
								<option value="assegnato">Assegnato</option>
								<option value="manutenzione">In Manutenzione</option>
							</select>
							<select v-model="filtri.operatore"
								class="text-gray-900 shadow-sm block w-full sm:text-sm border-[1px] border-gray-300 rounded-md p-2">
								<option value="" selected>Tutti gli operatori</option>
								<option v-for="operatore in operatori" :key="operatore.id" :value="operatore.id">
									{{ operatore.nome }} {{ operatore.cognome }}
								</option>
							</select>
						</div>
					</div>
					<div class="divide-y divide-gray-200">
						<StrumentoCard v-for="s in strumentiFiltrati" :key="s.id" :strumento="s" @modifica="onModifica"
							@elimina="onElimina" @assegna="onAssegna" @libera="onLibera" @trasferisci="onTrasferisci" />

						<!-- Esempio vuoto se non ci sono strumenti -->
						<div v-if="strumentiFiltrati.length === 0" class="py-10 text-center text-gray-500">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none"
								viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
							</svg>
							<p class="mt-2">
								{{ hasFiltriAttivi ? 'Nessuno strumento trovato con i filtri attuali' : 'Nessuno strumento trovato' }}
							</p>
							<button @click="showForm.openModal()"
								class="mt-4 btn_base">
								{{ hasFiltriAttivi ? 'Aggiungi strumento' : 'Aggiungi il primo strumento' }}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Form modale per aggiungere/modificare strumenti -->
	<StrumentoForm v-if="showForm.isOpen.value" :iniziali="strumentoSelezionato" @salvato="gestisciSalvataggio"
		@annulla="chiudiForm" />

	<!-- Modal di conferma eliminazione -->
	<div v-if="mostraConfermaEliminazione.isOpen.value"
		class="fixed inset-0 bg-gradient-to-br from-primary to-green bg-opacity-75 flex items-center justify-center z-50">
		<div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
				</div>
				<div class="ml-3">
					<h3 class="text-lg font-medium text-gray-900">Conferma eliminazione</h3>
					<p class="mt-2 text-sm text-gray-500">
						Sei sicuro di voler eliminare lo strumento "{{ strumentoDaEliminare?.nome }}"?
						Questa azione non può essere annullata.
					</p>
				</div>
			</div>
			<div class="mt-5 flex justify-end space-x-3">
				<button @click="mostraConfermaEliminazione.closeModal()"
					class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
					Annulla
				</button>
				<button @click="confermaEliminazione"
					class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700">
					Elimina
				</button>
			</div>
		</div>
	</div>

	<!-- Modal per liberare strumento -->
	<div v-if="mostraConfermaLiberazione.isOpen.value"
		class="fixed inset-0 bg-gradient-to-br from-primary to-green bg-opacity-75 flex items-center justify-center z-50">
		<div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<svg class="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none"
						viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M8 11V7a4 4 0 118 0m-4 8v2m0-6V9a2 2 0 012-2h2a2 2 0 012 2v3" />
					</svg>
				</div>
				<div class="ml-3">
					<h3 class="text-lg font-medium text-gray-900">Conferma liberazione</h3>
					<p class="mt-2 text-sm text-gray-500">
						Sei sicuro di voler liberare lo strumento "{{ strumentoDaLiberare?.nome }}" dall'operatore
						assegnato?
						Lo strumento tornerà disponibile.
					</p>
				</div>
			</div>
			<div class="mt-5 flex justify-end space-x-3">
				<button @click="mostraConfermaLiberazione.closeModal()"
					class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
					Annulla
				</button>
				<button @click="confermaLiberazione"
					class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
					Libera Strumento
				</button>
			</div>
		</div>
	</div>

	<!-- Modal per assegnazione/trasferimento -->
	<AssegnazioneModal v-if="showAssegnazioneModal.isOpen.value" :strumento="strumentoPerAssegnazione" :modal-type="tipoAssegnazione"
		@confermato="gestisciAssegnazione" @annulla="chiudiAssegnazione" />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStrumenti } from '@/composables/useStrumenti'
import { useOperatori } from '@/composables/useOperatori'
import { useAssegnazioni } from '@/composables/useAssegnazioni'
import { useModal } from '@/composables/modal-composable'
import StrumentoCard from '@/components/strumenti/StrumentoCard.vue'
import StrumentoForm from '@/components/strumenti/StrumentoForm.vue'
import StatoStrumentiBlock from '@/components/strumenti/StatoStrumentiBlock.vue'
import AssegnazioneModal from '@/components/strumenti/AssegnazioneModal.vue'

const { strumenti, getStrumenti, eliminaStrumento } = useStrumenti()
const { operatori, getOperatori } = useOperatori()
const {
	strumentiAssegnati,
	strumentiDisponibili,
	getAssegnazioniComplete,
	liberaStrumento
} = useAssegnazioni()

// Stato del componente
const showForm = useModal()
const strumentoSelezionato = ref(null)
const mostraConfermaEliminazione = useModal()
const strumentoDaEliminare = ref(null)
const mostraConfermaLiberazione = useModal()
const strumentoDaLiberare = ref(null)
const showAssegnazioneModal = useModal()
const strumentoPerAssegnazione = ref(null)
const tipoAssegnazione = ref('assegna') // 'assegna' | 'trasferisci'

// Filtri
const filtri = ref({
	ricerca: '',
	stato: '',
	operatore: ''
})

// Computed per filtrare gli strumenti
const strumentiFiltrati = computed(() => {
	let risultato = [...strumenti.value]

	// Filtro ricerca
	if (filtri.value.ricerca) {
		const ricerca = filtri.value.ricerca.toLowerCase()
		risultato = risultato.filter(s =>
			s.nome.toLowerCase().includes(ricerca) ||
			s.codice.toLowerCase().includes(ricerca)
		)
	}

	// Filtro stato
	if (filtri.value.stato) {
		risultato = risultato.filter(s => s.stato === filtri.value.stato)
	}

	// Filtro operatore
	if (filtri.value.operatore) {
		risultato = risultato.filter(s => s.operatoreAssegnato === filtri.value.operatore)
	}

	return risultato
})

// Computed per assegnazioni complete
const assegnazioniComplete = computed(() => getAssegnazioniComplete())

// Computed per verificare se ci sono filtri attivi
const hasFiltriAttivi = computed(() => {
	return filtri.value.ricerca || filtri.value.stato || filtri.value.operatore
})

// Gestione delle azioni
const onModifica = (strumento) => {
	strumentoSelezionato.value = { ...strumento }
	showForm.openModal()
}

const onElimina = (strumentoId) => {
	const strumento = strumenti.value.find(s => s.id === strumentoId)
	if (strumento) {
		strumentoDaEliminare.value = strumento
		mostraConfermaEliminazione.openModal()
	}
}

const onAssegna = (strumentoId) => {
	const strumento = strumenti.value.find(s => s.id === strumentoId)
	if (strumento) {
		strumentoPerAssegnazione.value = strumento
		tipoAssegnazione.value = 'assegna'
		showAssegnazioneModal.openModal()
	}
}

const onLibera = (strumentoId) => {
	const strumento = strumenti.value.find(s => s.id === strumentoId)
	if (strumento) {
		strumentoDaLiberare.value = strumento
		mostraConfermaLiberazione.openModal()
	}
}

const onTrasferisci = (strumentoId) => {
	const strumento = strumenti.value.find(s => s.id === strumentoId)
	if (strumento) {
		strumentoPerAssegnazione.value = strumento
		tipoAssegnazione.value = 'trasferisci'
		showAssegnazioneModal.openModal()
	}
}

const confermaEliminazione = async () => {
	if (strumentoDaEliminare.value) {
		await eliminaStrumento(strumentoDaEliminare.value.id)
		mostraConfermaEliminazione.closeModal()
		strumentoDaEliminare.value = null
		await getStrumenti()
	}
}

const confermaLiberazione = async () => {
	if (strumentoDaLiberare.value) {
		await liberaStrumento(strumentoDaLiberare.value.id)
		mostraConfermaLiberazione.closeModal()
		strumentoDaLiberare.value = null
		await getStrumenti()
	}
}

const gestisciAssegnazione = async () => {
	await getStrumenti()
	chiudiAssegnazione()
}

const chiudiAssegnazione = () => {
	showAssegnazioneModal.closeModal()
	strumentoPerAssegnazione.value = null
	tipoAssegnazione.value = 'assegna'
}

const gestisciSalvataggio = async () => {
	await getStrumenti()
	chiudiForm()
}

const chiudiForm = () => {
	showForm.closeModal()
	strumentoSelezionato.value = null
}

onMounted(async () => {
	await getStrumenti()
	await getOperatori()
})
</script>

<style scoped>
/* Eventuali stili specifici possono essere aggiunti qui */
</style>