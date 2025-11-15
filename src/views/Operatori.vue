<template>
	<div class="min-h-screen bg-gray-200">
		<!-- Main Content -->
		<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<!-- Intestazione pagina -->
			<div class="px-4 py-6 sm:px-0 mb-6">
				<div class="rounded-2xl shadow-md bg-primary overflow-hidden relative">
					<div class="px-6 py-8 md:px-10 md:py-10 text-white">
						<h1 class="text-3xl font-bold tracking-tight">
							Gestione Operatori
						</h1>
						<p class="mt-2 max-w-2xl text-blue-100">
							Gestisci facilmente i tuoi operatori e i loro strumenti assegnati con funzionalità complete
							di assegnazione e trasferimento.
						</p>
						<div class="mt-6 flex space-x-4 flex-wrap gap-y-4">
							<button @click="showForm.openModal" class="btn_base_v2">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
									fill="currentColor">
									<path fill-rule="evenodd"
										d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
										clip-rule="evenodd" />
								</svg>
								Aggiungi Operatore
							</button>
							<button @click="showRiepilogoAssegnazioni.openModal()" class="btn_base_v2">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none"
									viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
								</svg>
								Riepilogo Assegnazioni
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Lista operatori con le card -->
			<div class="px-4 sm:px-0">
				<div class="bg-white shadow rounded-lg overflow-hidden">
					<div
						class="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center flex-wrap gap-2">
						<h3 class="text-lg leading-6 font-medium text-gray-900">
							Elenco Operatori
						</h3>
						<div class="space-x-2 max-md:w-full">
							<input type="text" placeholder="Cerca operatore..." v-model="filtri.ricerca"
								class="min-w-[300px] text-gray-900 shadow-sm border-[1px] block w-full sm:text-sm border-gray-300 rounded-md p-2">
						</div>
					</div>
					<div class="divide-y divide-gray-200">
						<OperatoreCard v-for="o in operatoriFiltrati" :key="o.id" :operatore="o" @modifica="onModifica"
							@elimina="onElimina" @assegna-strumento="onAssegnaStrumento"
							@libera-strumento="onLiberaStrumento" @trasferisci-strumento="onTrasferiscaStrumento" />

						<!-- Nessun risultato -->
						<div v-if="operatoriFiltrati.length === 0" class="py-10 text-center text-gray-500">
							<svg class="h-12 w-12 mx-auto text-gray-400" fill="currentColor" height="200px"
								width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"
								enable-background="new 0 0 512 512" xml:space="preserve">
								<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<path
										d="M448,362.7l-117.3-21.3C320,320,320,310.7,320,298.7c10.7-10.7,32-21.3,32-32c10.7-32,10.7-53.3,10.7-53.3 c5.5-8,21.3-21.3,21.3-42.7s-21.3-42.7-21.3-53.3C362.7,32,319.2,0,256,0c-60.5,0-106.7,32-106.7,117.3c0,10.7-21.3,32-21.3,53.3 s15.2,35.4,21.3,42.7c0,0,0,21.3,10.7,53.3c0,10.7,21.3,21.3,32,32c0,10.7,0,21.3-10.7,42.7L64,362.7C21.3,373.3,0,448,0,512h512 C512,448,490.7,373.3,448,362.7z">
									</path>
								</g>
							</svg>
							<p class="mt-2">
								{{ filtri.ricerca ? 'Nessun operatore trovato con i filtri attuali' : 'Nessun operatore presente' }}
							</p>
							<button @click="showForm.openModal" class="mt-4 btn_base">
								{{ filtri.ricerca ? 'Aggiungi operatore' : 'Aggiungi il primo operatore' }}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Form modale operatori -->
	<OperatoreForm v-if="showForm.isOpen.value" :iniziali="operatoreSelezionato" @salvato="gestisciSalvataggio"
		@annulla="chiudiForm" />

	<!-- Modal di conferma eliminazione -->
	<div v-if="mostraConfermaEliminazione.isOpen.value"
		class="fixed inset-0 bg-gradient-to-br from-primary to-green bg-opacity-75 flex items-center justify-center z-50 px-4">
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
						Sei sicuro di voler eliminare l'operatore "{{ operatoreDaEliminare?.nome }} {{
						operatoreDaEliminare?.cognome }}"?
						<span v-if="strumentiOperatoreDaEliminare.length > 0"
							class="block mt-1 font-medium text-red-600">
							⚠️ Attenzione: Ha {{ strumentiOperatoreDaEliminare.length }} strument{{
							strumentiOperatoreDaEliminare.length > 1 ? 'i' : 'o' }} assegnat{{
							strumentiOperatoreDaEliminare.length > 1 ? 'i' : 'o' }}.
							Verranno automaticamente liberati.
						</span>
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
					{{ strumentiOperatoreDaEliminare.length > 0 ? 'Elimina e libera strumenti' : 'Elimina' }}
				</button>
			</div>
		</div>
	</div>

	<!-- Modal per assegnare strumento a operatore -->
	<div v-if="showAssegnaStrumentoModal.isOpen.value"
		class="fixed inset-0 bg-gradient-to-br from-primary to-green bg-opacity-75 flex items-center justify-center z-50 px-4">
		<div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
			<div class="mb-5">
				<h3 class="text-lg font-medium text-gray-900">Assegna Strumento</h3>
				<p class="mt-1 text-sm text-gray-500">
					Seleziona uno strumento da assegnare a {{ operatorePerAssegnazione?.nome }} {{
					operatorePerAssegnazione?.cognome }}
				</p>
			</div>

			<!-- Info operatore -->
			<div class="mb-4 p-3 bg-blue-50 rounded-lg">
				<div class="flex items-center">
					<div class="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
						<svg class="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
								clip-rule="evenodd" />
						</svg>
					</div>
					<div class="ml-3">
						<p class="text-sm font-medium text-blue-900">{{ operatorePerAssegnazione?.nome }} {{
							operatorePerAssegnazione?.cognome }}</p>
						<p class="text-xs text-blue-700">{{ operatorePerAssegnazione?.ruolo }}</p>
					</div>
				</div>
			</div>

			<form @submit.prevent="eseguiAssegnazione" class="space-y-4">
				<!-- Selezione strumento -->
				<div>
					<label for="strumento" class="block text-sm font-medium text-gray-700">Seleziona Strumento</label>
					<select id="strumento" v-model="strumentoSelezionatoId" required
						class="mt-1 h-10 p-2 text-gray shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full border border-gray-300 rounded-md">
						<option value="">Seleziona strumento...</option>
						<option v-for="strumento in strumentiDisponibili" :key="strumento.id" :value="strumento.id">
							{{ strumento.nome }} ({{ strumento.codice }})
						</option>
					</select>
					<p v-if="strumentiDisponibili.length === 0" class="mt-2 text-sm text-gray-500 italic">
						Nessuno strumento disponibile per l'assegnazione
					</p>
				</div>

				<!-- Azioni -->
				<div class="pt-4 flex justify-end space-x-3">
					<button type="button" @click="chiudiAssegnaStrumentoModal"
						class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
						Annulla
					</button>
					<button type="submit" :disabled="!strumentoSelezionatoId || strumentiDisponibili.length === 0"
						:class="[
							'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white',
							strumentoSelezionatoId && strumentiDisponibili.length > 0 ? 'bg-primary' : 'bg-gray-400 cursor-not-allowed'
						]">
						Assegna Strumento
					</button>
				</div>
			</form>
		</div>
	</div>

	<!-- Modal riepilogo assegnazioni -->
	<div v-if="showRiepilogoAssegnazioni.isOpen.value"
		class="fixed inset-0 bg-gradient-to-br from-primary to-green bg-opacity-75 flex items-center justify-center z-50 px-4">
		<div class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-auto p-6 max-h-[90vh] overflow-hidden">
			<div class="mb-5 flex justify-between items-start">
				<div>
					<h3 class="text-lg font-medium text-gray-900">Riepilogo Assegnazioni</h3>
					<p class="mt-1 text-sm text-gray-500">Panoramica completa di tutti gli strumenti assegnati per
						operatore</p>
				</div>
				<button @click="showRiepilogoAssegnazioni.closeModal()" class="text-gray-400 hover:text-gray-600">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<div class="max-h-[70vh] overflow-y-auto">
				<div class="space-y-4">
					<div v-for="assegnazione in assegnazioniPerOperatore" :key="assegnazione.operatore.id"
						class="border border-gray-200 rounded-lg p-4">
						<div class="flex justify-between items-start mb-3">
							<div>
								<h4 class="font-medium text-gray-900">
									{{ assegnazione.operatore.nome }} {{ assegnazione.operatore.cognome }}
								</h4>
								<p class="text-sm text-gray-500">{{ assegnazione.operatore.ruolo }}</p>
							</div>
							<span
								class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
								{{ assegnazione.strumenti.length }} strument{{ assegnazione.strumenti.length !== 1 ? 'i'
								: 'o' }}
							</span>
						</div>
						<div v-if="assegnazione.strumenti.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-2">
							<div v-for="strumento in assegnazione.strumenti" :key="strumento.id"
								class="flex justify-between items-center py-2 bg-gray-50 rounded text-sm gap-1 flex-wrap">
								<div>
									<span class="text-gray-500 font-medium">{{ strumento.nome }}</span>
									<span class="text-gray-500 ml-2">({{ strumento.codice }})</span>
								</div>
								<span :class="[
									'text-xs px-2 py-1 rounded',
									isScaduto(strumento) ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
								]">
									{{ isScaduto(strumento) ? 'Scaduto' : 'OK' }}
								</span>
							</div>
						</div>
						<div v-else class="text-sm text-gray-500 italic">
							Nessuno strumento assegnato
						</div>
					</div>
				</div>

				<div v-if="assegnazioniPerOperatore.length === 0" class="text-center py-8 text-gray-500">
					<svg class="h-12 w-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor"
						viewBox="0 0 48 48">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M20 7L9 18l11 11m0-11h18" />
					</svg>
					<p>Nessuna assegnazione presente</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal per conferma liberazione strumento -->
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
						Vuoi liberare lo strumento "{{ strumentoDaLiberare?.nome }}"?
						Tornerà disponibile per altri operatori.
					</p>
				</div>
			</div>
			<div class="mt-5 flex justify-end space-x-3">
				<button @click="mostraConfermaLiberazione.closeModal()"
					class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
					Annulla
				</button>
				<button @click="confermaLiberazione"
					class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary ">
					Libera Strumento
				</button>
			</div>
		</div>
	</div>

	<!-- Modal trasferimento strumento (riusa AssegnazioneModal) -->
	<div v-if="showTrasferimentoModal.isOpen.value"
		class="fixed inset-0 bg-gradient-to-br from-primary to-green bg-opacity-75 flex items-center justify-center z-50">
		<div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
			<div class="mb-5">
				<h3 class="text-lg font-medium text-gray-900">Trasferisci Strumento</h3>
				<p class="mt-1 text-sm text-gray-500">
					Seleziona il nuovo operatore per "{{ strumentoDaTrasferire?.nome }}"
				</p>
			</div>

			<form @submit.prevent="eseguiTrasferimento" class="space-y-4">
				<!-- Info strumento -->
				<div class="p-3 bg-gray-50 rounded-lg">
					<div class="flex items-center">
						<div class="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
							<svg class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
							</svg>
						</div>
						<div class="ml-3">
							<p class="text-sm font-medium text-gray-900">{{ strumentoDaTrasferire?.nome }}</p>
							<p class="text-xs text-gray-500">{{ strumentoDaTrasferire?.codice }}</p>
						</div>
					</div>
				</div>

				<!-- Selezione nuovo operatore -->
				<div>
					<label for="nuovoOperatore" class="block text-sm font-medium text-gray-700">Trasferisci a:</label>
					<select id="nuovoOperatore" v-model="nuovoOperatoreId" required
						class="mt-1 h-10 p-2 text-gray shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full border border-gray-300 rounded-md">
						<option value="">Seleziona operatore...</option>
						<option v-for="operatore in altriOperatori" :key="operatore.id" :value="operatore.id">
							{{ operatore.nome }} {{ operatore.cognome }} - {{ operatore.ruolo }}
						</option>
					</select>
				</div>

				<!-- Azioni -->
				<div class="pt-4 flex justify-end space-x-3">
					<button type="button" @click="chiudiTrasferimentoModal"
						class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
						Annulla
					</button>
					<button type="submit" :disabled="!nuovoOperatoreId" :class="[
						'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500',
						nuovoOperatoreId ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-400 cursor-not-allowed'
					]">
						Trasferisci
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useOperatori } from '@/composables/useOperatori'
import { useStrumenti } from '@/composables/useStrumenti'
import { useAssegnazioni } from '@/composables/useAssegnazioni'
import OperatoreCard from '@/components/operatori/OperatoreCard.vue'
import OperatoreForm from '@/components/operatori/OperatoreForm.vue'
import { useModal } from '@/composables/modal-composable'

const { operatori, getOperatori, eliminaOperatore } = useOperatori()
const { strumenti, getStrumenti } = useStrumenti()
const {
	strumentiDisponibili,
	assegnaStrumento,
	liberaStrumento,
	trasferiscaStrumento,
	getStrumentiOperatore
} = useAssegnazioni()

const showForm = useModal()
const operatoreSelezionato = ref(null)
const mostraConfermaEliminazione = useModal()
const operatoreDaEliminare = ref(null)
const showAssegnaStrumentoModal = useModal()
const operatorePerAssegnazione = ref(null)
const strumentoSelezionatoId = ref('')
const showRiepilogoAssegnazioni = useModal()
const mostraConfermaLiberazione = useModal()
const strumentoDaLiberare = ref(null)
const showTrasferimentoModal = useModal()
const strumentoDaTrasferire = ref(null)
const nuovoOperatoreId = ref('')

const filtri = ref({
	ricerca: ''
})

const operatoriFiltrati = computed(() => {
	let risultato = [...operatori.value]
	if (filtri.value.ricerca) {
		const ricerca = filtri.value.ricerca.toLowerCase()
		risultato = risultato.filter(o =>
			o.nome?.toLowerCase().includes(ricerca) ||
			o.email?.toLowerCase().includes(ricerca) ||
			o.cognome?.toLowerCase().includes(ricerca)
		)
	}
	return risultato
})

// Strumenti dell'operatore da eliminare
const strumentiOperatoreDaEliminare = computed(() => {
	if (!operatoreDaEliminare.value) return []
	return getStrumentiOperatore(operatoreDaEliminare.value.id)
})

// Assegnazioni raggruppate per operatore
const assegnazioniPerOperatore = computed(() => {
	return operatori.value.map(operatore => ({
		operatore,
		strumenti: getStrumentiOperatore(operatore.id)
	}))
})

// Altri operatori (per trasferimenti)
const altriOperatori = computed(() => {
	if (!strumentoDaTrasferire.value) return operatori.value
	return operatori.value.filter(op => op.id !== strumentoDaTrasferire.value.operatoreAssegnato)
})

// Gestori eventi
const onModifica = (operatore) => {
	operatoreSelezionato.value = { ...operatore }
	showForm.openModal()
}

const onElimina = (id) => {
	const trovato = operatori.value.find(o => o.id === id)
	if (trovato) {
		operatoreDaEliminare.value = trovato
		mostraConfermaEliminazione.openModal()
	}
}

const onAssegnaStrumento = (operatoreId) => {
	const operatore = operatori.value.find(o => o.id === operatoreId)
	if (operatore) {
		operatorePerAssegnazione.value = operatore
		strumentoSelezionatoId.value = ''
		showAssegnaStrumentoModal.openModal()
	}
}

const onLiberaStrumento = (strumentoId) => {
	const strumento = strumenti.value.find(s => s.id === strumentoId)
	if (strumento) {
		strumentoDaLiberare.value = strumento
		mostraConfermaLiberazione.openModal()
	}
}

const onTrasferiscaStrumento = (strumentoId) => {
	const strumento = strumenti.value.find(s => s.id === strumentoId)
	if (strumento) {
		strumentoDaTrasferire.value = strumento
		nuovoOperatoreId.value = '';
		console.log(showTrasferimentoModal.isOpen.value)
		showTrasferimentoModal.openModal()
	}
}

const confermaEliminazione = async () => {
	if (operatoreDaEliminare.value) {
		// Prima libera tutti gli strumenti dell'operatore
		const strumentiDaLiberare = getStrumentiOperatore(operatoreDaEliminare.value.id)
		for (const strumento of strumentiDaLiberare) {
			await liberaStrumento(strumento.id)
		}

		// Poi elimina l'operatore
		await eliminaOperatore(operatoreDaEliminare.value.id)

		mostraConfermaEliminazione.closeModal()
		operatoreDaEliminare.value = null
		await getOperatori()
	}
}

const eseguiAssegnazione = async () => {
	if (strumentoSelezionatoId.value && operatorePerAssegnazione.value) {
		await assegnaStrumento(strumentoSelezionatoId.value, operatorePerAssegnazione.value.id)
		chiudiAssegnaStrumentoModal()
		await getStrumenti() // Ricarica dati
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

const eseguiTrasferimento = async () => {
	if (strumentoDaTrasferire.value && nuovoOperatoreId.value) {
		await trasferiscaStrumento(strumentoDaTrasferire.value.id, nuovoOperatoreId.value)
		chiudiTrasferimentoModal()
		await getStrumenti()
	}
}

// Utility functions
const isScaduto = (strumento) => {
	const oggi = new Date()
	const scadenza = new Date(strumento.dataScadenza.seconds * 1000)
	return scadenza < oggi
}

// Gestione modali
const gestisciSalvataggio = async () => {
	await getOperatori()
	chiudiForm()
}

const chiudiForm = () => {
	showForm.closeModal()
	operatoreSelezionato.value = null
}

const chiudiAssegnaStrumentoModal = () => {
	showAssegnaStrumentoModal.closeModal()
	operatorePerAssegnazione.value = null
	strumentoSelezionatoId.value = ''
}

const chiudiTrasferimentoModal = () => {
	showTrasferimentoModal.closeModal()
	strumentoDaTrasferire.value = null
	nuovoOperatoreId.value = ''
}

onMounted(async () => {
	await getOperatori()
	await getStrumenti()
})
</script>

<style scoped>
/* Eventuali stili specifici */
</style>