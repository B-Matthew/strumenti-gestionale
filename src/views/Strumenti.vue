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
							<button @click="showForm = true" class="btn_base_v2">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
									fill="currentColor">
									<path fill-rule="evenodd"
										d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
										clip-rule="evenodd" />
								</svg>
								Aggiungi Strumento
							</button>
							<button @click="showAssegnazioniRapide = true" class="btn_base">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none"
									viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
								</svg>
								Assegnazioni Rapide
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
								class="text-gray-900 min-w-[300px] shadow-sm block w-full sm:text-sm border-gray-300 rounded-md p-2">
							<select v-model="filtri.stato"
								class="text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md">
								<option value="" selected>Tutti gli stati</option>
								<option value="disponibile">Disponibile</option>
								<option value="assegnato">Assegnato</option>
								<option value="manutenzione">In Manutenzione</option>
							</select>
							<select v-model="filtri.operatore"
								class="text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md">
								<option value="">Tutti gli operatori</option>
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
							<button @click="showForm = true"
								class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
								{{ hasFiltriAttivi ? 'Aggiungi strumento' : 'Aggiungi il primo strumento' }}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Form modale per aggiungere/modificare strumenti -->
	<StrumentoForm v-if="showForm" :iniziali="strumentoSelezionato" @salvato="gestisciSalvataggio"
		@annulla="chiudiForm" />

	<!-- Modal di conferma eliminazione -->
	<div v-if="mostraConfermaEliminazione"
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
				<button @click="mostraConfermaEliminazione = false"
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
	<div v-if="mostraConfermaLiberazione"
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
				<button @click="mostraConfermaLiberazione = false"
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
	<AssegnazioneModal v-if="showAssegnazioneModal" :strumento="strumentoPerAssegnazione" :modal-type="tipoAssegnazione"
		@confermato="gestisciAssegnazione" @annulla="chiudiAssegnazione" />

	<!-- Modal assegnazioni rapide -->
	<div v-if="showAssegnazioniRapide"
		class="fixed inset-0 bg-gradient-to-br from-primary to-green bg-opacity-75 flex items-center justify-center z-50">
		<div class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-auto p-6 max-h-[90vh] overflow-hidden">
			<div class="mb-5 flex justify-between items-center">
				<div>
					<h3 class="text-lg font-medium text-gray-900">Assegnazioni Rapide</h3>
					<p class="mt-1 text-sm text-gray-500">Visualizza e gestisci rapidamente tutte le assegnazioni
						strumenti-operatori</p>
				</div>
				<button @click="showAssegnazioniRapide = false" class="text-gray-400 hover:text-gray-600">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
				<!-- Strumenti disponibili -->
				<div>
					<h4 class="text-md font-medium text-gray-900 mb-3 flex items-center">
						<svg class="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd" />
						</svg>
						Strumenti Disponibili ({{ strumentiDisponibili.length }})
					</h4>
					<div class="space-y-2">
						<div v-for="strumento in strumentiDisponibili" :key="strumento.id"
							class="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
							<div class="flex justify-between items-center">
								<div>
									<p class="font-medium text-gray-900">{{ strumento.nome }}</p>
									<p class="text-sm text-gray-500">{{ strumento.codice }}</p>
								</div>
								<button @click="onAssegna(strumento.id)"
									class="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200">
									Assegna
								</button>
							</div>
						</div>
						<div v-if="strumentiDisponibili.length === 0" class="text-center py-8 text-gray-500">
							<svg class="h-12 w-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor"
								viewBox="0 0 48 48">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M20 7L9 18l11 11m0-11h18" />
							</svg>
							<p>Nessuno strumento disponibile</p>
						</div>
					</div>
				</div>

				<!-- Strumenti assegnati -->
				<div>
					<h4 class="text-md font-medium text-gray-900 mb-3 flex items-center">
						<svg class="h-5 w-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
								clip-rule="evenodd" />
						</svg>
						Strumenti Assegnati ({{ strumentiAssegnati.length }})
					</h4>
					<div class="space-y-2">
						<div v-for="assegnazione in assegnazioniComplete" :key="assegnazione.strumento.id"
							class="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
							<div class="flex justify-between items-start">
								<div class="flex-1">
									<p class="font-medium text-gray-900">{{ assegnazione.strumento.nome }}</p>
									<p class="text-sm text-gray-500">{{ assegnazione.strumento.codice }}</p>
									<p class="text-sm text-blue-600 mt-1">
										→ {{ assegnazione.operatore?.nome }} {{ assegnazione.operatore?.cognome }}
									</p>
								</div>
								<div class="flex space-x-1">
									<button @click="onTrasferisci(assegnazione.strumento.id)"
										class="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded hover:bg-orange-200">
										Trasferisci
									</button>
									<button @click="onLibera(assegnazione.strumento.id)"
										class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
										Libera
									</button>
								</div>
							</div>
						</div>
						<div v-if="strumentiAssegnati.length === 0" class="text-center py-8 text-gray-500">
							<svg class="h-12 w-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor"
								viewBox="0 0 48 48">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
							<p>Nessuno strumento assegnato</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStrumenti } from '@/composables/useStrumenti'
import { useOperatori } from '@/composables/useOperatori'
import { useAssegnazioni } from '@/composables/useAssegnazioni'
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
const showForm = ref(false)
const strumentoSelezionato = ref(null)
const mostraConfermaEliminazione = ref(false)
const strumentoDaEliminare = ref(null)
const mostraConfermaLiberazione = ref(false)
const strumentoDaLiberare = ref(null)
const showAssegnazioneModal = ref(false)
const strumentoPerAssegnazione = ref(null)
const tipoAssegnazione = ref('assegna') // 'assegna' | 'trasferisci'
const showAssegnazioniRapide = ref(false)

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
	showForm.value = true
}

const onElimina = (strumentoId) => {
	const strumento = strumenti.value.find(s => s.id === strumentoId)
	if (strumento) {
		strumentoDaEliminare.value = strumento
		mostraConfermaEliminazione.value = true
	}
}

const onAssegna = (strumentoId) => {
	const strumento = strumenti.value.find(s => s.id === strumentoId)
	if (strumento) {
		strumentoPerAssegnazione.value = strumento
		tipoAssegnazione.value = 'assegna'
		showAssegnazioneModal.value = true
	}
}

const onLibera = (strumentoId) => {
	const strumento = strumenti.value.find(s => s.id === strumentoId)
	if (strumento) {
		strumentoDaLiberare.value = strumento
		mostraConfermaLiberazione.value = true
	}
}

const onTrasferisci = (strumentoId) => {
	const strumento = strumenti.value.find(s => s.id === strumentoId)
	if (strumento) {
		strumentoPerAssegnazione.value = strumento
		tipoAssegnazione.value = 'trasferisci'
		showAssegnazioneModal.value = true
	}
}

const confermaEliminazione = async () => {
	if (strumentoDaEliminare.value) {
		await eliminaStrumento(strumentoDaEliminare.value.id)
		mostraConfermaEliminazione.value = false
		strumentoDaEliminare.value = null
		await getStrumenti()
	}
}

const confermaLiberazione = async () => {
	if (strumentoDaLiberare.value) {
		await liberaStrumento(strumentoDaLiberare.value.id)
		mostraConfermaLiberazione.value = false
		strumentoDaLiberare.value = null
		await getStrumenti()
	}
}

const gestisciAssegnazione = async () => {
	await getStrumenti()
	chiudiAssegnazione()
}

const chiudiAssegnazione = () => {
	showAssegnazioneModal.value = false
	strumentoPerAssegnazione.value = null
	tipoAssegnazione.value = 'assegna'
}

const gestisciSalvataggio = async () => {
	await getStrumenti()
	chiudiForm()
}

const chiudiForm = () => {
	showForm.value = false
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